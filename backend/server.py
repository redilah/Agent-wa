"""
server.py — FastAPI Server untuk Regalia WA Agent SaaS

Endpoints:
- GET  /webhook         — Verifikasi webhook Meta
- POST /webhook         — Terima pesan WA, proses via Gemini, kirim balasan
- POST /api/simulate    — Testing dari dashboard simulator (tanpa WA)
- WS   /ws              — WebSocket untuk dashboard real-time
- GET  /                — Health check
"""

import os
import sys
import json
import asyncio
from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI, Request, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import PlainTextResponse, JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
import uvicorn

# Load .env jika ada
load_dotenv()

# Import modul internal
from database import init_db, get_client_by_phone_id, get_first_client, get_any_first_client, get_client_by_id, get_connection
from whatsapp import parse_incoming_message, send_text_message, mark_as_read
from agent import get_ai_response
from pydantic import BaseModel
from typing import Optional


# Pydantic schema untuk update settings
class ClientSettingsUpdate(BaseModel):
    client_id: Optional[int] = None
    nama_bisnis: Optional[str] = None
    wa_access_token: Optional[str] = None
    wa_phone_number_id: Optional[str] = None
    knowledge_base: Optional[str] = None
    is_active: Optional[int] = None
    toggle_slang: Optional[int] = None
    toggle_java: Optional[int] = None
    toggle_ongkir: Optional[int] = None
    toggle_anger: Optional[int] = None
    toggle_fallback: Optional[int] = None


# ==========================================
# WebSocket Connection Manager
# ==========================================
class ConnectionManager:
    """Mengelola koneksi WebSocket dari dashboard."""

    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        print(f"[WS] Dashboard terhubung. Total: {len(self.active_connections)}")

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
        print(f"[WS] Dashboard terputus. Total: {len(self.active_connections)}")

    async def broadcast(self, event: dict):
        """Kirim event ke semua dashboard yang terhubung."""
        message = json.dumps(event)
        disconnected = []
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except Exception:
                disconnected.append(connection)
        for conn in disconnected:
            self.disconnect(conn)


manager = ConnectionManager()

# Set untuk deduplikasi pesan WA (hindari proses ulang)
processed_message_ids: set[str] = set()


# ==========================================
# Lifespan (startup/shutdown)
# ==========================================
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    init_db()
    print("=" * 50)
    print("[START] Regalia WA Agent Server aktif!")
    print("   Dashboard: http://localhost:8000")
    print("   API Docs:  http://localhost:8000/docs")
    print("=" * 50)
    yield
    # Shutdown
    print("[STOP] Server dimatikan.")


# ==========================================
# FastAPI App
# ==========================================
app = FastAPI(
    title="Regalia WA Agent",
    description="Backend AI Agent WhatsApp untuk SaaS UMKM",
    version="0.1.0",
    lifespan=lifespan,
)

# CORS — izinkan akses dari dashboard (file:// atau localhost)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Path ke folder frontend-dist (hasil build React)
import pathlib
from fastapi.staticfiles import StaticFiles
FRONTEND_DIR = pathlib.Path(__file__).parent.parent / "frontend-dist"


# ==========================================
# Routes
# ==========================================

@app.get("/")
async def serve_frontend():
    """Serve React dashboard frontend (index.html)."""
    index_path = FRONTEND_DIR / "index.html"
    if index_path.exists():
        return FileResponse(str(index_path), media_type="text/html")
    return {"status": "ok", "service": "Regalia WA Agent (React frontend missing)", "version": "0.1.0"}


# Mount assets folder hasil compile React untuk CSS/JS pack
if (FRONTEND_DIR / "assets").exists():
    app.mount("/assets", StaticFiles(directory=str(FRONTEND_DIR / "assets")), name="assets")


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "ok", "service": "Regalia WA Agent", "version": "0.1.0"}


# ------------------------------------------
# Configuration API
# ------------------------------------------

@app.get("/api/settings")
async def get_settings():
    """Ambil data pengaturan klien pertama."""
    client_data = get_any_first_client()
    if not client_data:
        return JSONResponse(content={"error": "Belum ada klien terdaftar"}, status_code=404)
    return JSONResponse(content=dict(client_data))


@app.post("/api/settings")
async def update_settings(settings: ClientSettingsUpdate):
    """Update settings dan toggles untuk klien."""
    client_id = settings.client_id
    if not client_id:
        first_client = get_any_first_client()
        if not first_client:
            return JSONResponse(content={"error": "Belum ada klien terdaftar untuk di-update"}, status_code=404)
        client_id = first_client["id"]
        current = first_client
    else:
        current = get_client_by_id(client_id)
        if not current:
            return JSONResponse(content={"error": f"Klien dengan ID {client_id} tidak ditemukan"}, status_code=404)

    # Gabungkan data input dengan data saat ini jika ada field None
    nama_bisnis = settings.nama_bisnis if settings.nama_bisnis is not None else current["nama_bisnis"]
    wa_access_token = settings.wa_access_token if settings.wa_access_token is not None else current["wa_access_token"]
    wa_phone_number_id = settings.wa_phone_number_id if settings.wa_phone_number_id is not None else current["wa_phone_number_id"]
    knowledge_base = settings.knowledge_base if settings.knowledge_base is not None else current["knowledge_base"]
    is_active = settings.is_active if settings.is_active is not None else current["is_active"]
    
    toggle_slang = settings.toggle_slang if settings.toggle_slang is not None else current.get("toggle_slang", 1)
    toggle_java = settings.toggle_java if settings.toggle_java is not None else current.get("toggle_java", 1)
    toggle_ongkir = settings.toggle_ongkir if settings.toggle_ongkir is not None else current.get("toggle_ongkir", 1)
    toggle_anger = settings.toggle_anger if settings.toggle_anger is not None else current.get("toggle_anger", 1)
    toggle_fallback = settings.toggle_fallback if settings.toggle_fallback is not None else current.get("toggle_fallback", 1)

    # Lakukan update ke database
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE clients
        SET nama_bisnis = ?,
            wa_access_token = ?,
            wa_phone_number_id = ?,
            knowledge_base = ?,
            is_active = ?,
            toggle_slang = ?,
            toggle_java = ?,
            toggle_ongkir = ?,
            toggle_anger = ?,
            toggle_fallback = ?
        WHERE id = ?
    """, (nama_bisnis, wa_access_token, wa_phone_number_id, knowledge_base, is_active,
          toggle_slang, toggle_java, toggle_ongkir, toggle_anger, toggle_fallback, client_id))
    conn.commit()
    conn.close()

    updated_client = get_client_by_id(client_id)
    client_dict = dict(updated_client)

    # Broadcast event pembaruan konfigurasi
    await manager.broadcast({
        "type": "config_updated",
        "client": client_dict
    })

    return JSONResponse(content={"status": "success", "client": client_dict})


# ------------------------------------------
# WhatsApp Webhook
# ------------------------------------------

@app.get("/webhook")
async def verify_webhook(request: Request):
    """Verifikasi webhook Meta (saat mendaftarkan URL webhook)."""
    mode = request.query_params.get("hub.mode")
    token = request.query_params.get("hub.verify_token")
    challenge = request.query_params.get("hub.challenge")

    verify_token = os.environ.get("WA_VERIFY_TOKEN", "regalia_verify_2026")

    if mode == "subscribe" and token == verify_token:
        print("[Webhook] Verifikasi berhasil ✅")
        return PlainTextResponse(content=challenge, status_code=200)

    print("[Webhook] Verifikasi gagal ❌")
    return PlainTextResponse(content="Forbidden", status_code=403)


@app.post("/webhook")
async def handle_webhook(request: Request):
    """Terima dan proses pesan masuk dari WhatsApp."""
    payload = await request.json()

    # Cek apakah ini event WhatsApp
    if payload.get("object") != "whatsapp_business_account":
        return JSONResponse(content={"status": "ignored"}, status_code=200)

    # Parse pesan
    message_data = parse_incoming_message(payload)
    if not message_data:
        return JSONResponse(content={"status": "no_message"}, status_code=200)

    # Deduplikasi
    msg_id = message_data["message_id"]
    if msg_id in processed_message_ids:
        return JSONResponse(content={"status": "duplicate"}, status_code=200)
    processed_message_ids.add(msg_id)

    # Batasi ukuran set deduplikasi
    if len(processed_message_ids) > 1000:
        processed_message_ids.clear()

    # Cari klien berdasarkan Phone Number ID
    client_data = get_client_by_phone_id(message_data["phone_number_id"])
    if not client_data:
        print(f"[Webhook] Klien tidak ditemukan atau tidak aktif untuk phone_id: {message_data['phone_number_id']}")
        return JSONResponse(content={"status": "unknown_or_inactive_client"}, status_code=200)

    sender = message_data["sender"]
    user_text = message_data["message_text"]

    print(f"[Webhook] Pesan dari {sender}: {user_text}")

    # Broadcast event ke dashboard: pesan masuk
    await manager.broadcast({
        "type": "message_in",
        "sender": sender,
        "text": user_text,
    })

    # Broadcast: AI sedang memproses
    await manager.broadcast({"type": "ai_processing"})

    # Proses via AI
    ai_reply = await get_ai_response(client_data, sender, user_text)

    # Broadcast: AI selesai
    await manager.broadcast({
        "type": "ai_reply",
        "text": ai_reply,
        "sender": sender,
    })

    # Kirim balasan via WhatsApp
    if client_data.get("wa_access_token"):
        send_text_message(
            phone_number_id=client_data["wa_phone_number_id"],
            access_token=client_data["wa_access_token"],
            to=sender,
            text=ai_reply,
        )
        # Tandai pesan asli sebagai dibaca
        mark_as_read(
            phone_number_id=client_data["wa_phone_number_id"],
            access_token=client_data["wa_access_token"],
            message_id=msg_id,
        )

    return JSONResponse(content={"status": "ok"}, status_code=200)


# ------------------------------------------
# Dashboard Simulator API
# ------------------------------------------

@app.post("/api/simulate")
async def simulate_chat(request: Request):
    """
    Endpoint untuk testing dari dashboard simulator.
    Tidak perlu WhatsApp — pesan dikirim langsung ke AI.
    """
    body = await request.json()
    user_message = body.get("message", "").strip()

    if not user_message:
        return JSONResponse(content={"error": "Pesan kosong"}, status_code=400)

    # Gunakan klien pertama (dummy) untuk testing
    client_data = get_any_first_client()
    if not client_data:
        return JSONResponse(content={"error": "Belum ada klien terdaftar"}, status_code=500)

    if not client_data.get("is_active", 1):
        return JSONResponse(content={"error": "Agen saat ini dinonaktifkan (is_active = 0). Silakan aktifkan di pengaturan."}, status_code=400)

    # Pakai nomor simulasi
    sim_phone = "simulator_dashboard"

    # Broadcast ke dashboard: pesan masuk
    await manager.broadcast({
        "type": "message_in",
        "sender": sim_phone,
        "text": user_message,
    })

    # Broadcast: AI memproses
    await manager.broadcast({"type": "ai_processing"})

    # Proses via Gemini AI
    ai_reply = await get_ai_response(client_data, sim_phone, user_message)

    # Broadcast: balasan AI
    await manager.broadcast({
        "type": "ai_reply",
        "text": ai_reply,
        "sender": sim_phone,
    })

    return JSONResponse(content={
        "reply": ai_reply,
        "client": client_data["nama_bisnis"],
    })


# ------------------------------------------
# WebSocket untuk Dashboard Real-Time
# ------------------------------------------

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """Koneksi WebSocket untuk mengirim event real-time ke dashboard."""
    await manager.connect(websocket)
    try:
        while True:
            # Terima ping/pesan dari dashboard (keep-alive)
            data = await websocket.receive_text()
            # Jika dashboard mengirim pesan via WS (alternatif ke /api/simulate)
            try:
                msg = json.loads(data)
                if msg.get("type") == "chat" and msg.get("text"):
                    client_data = get_any_first_client()
                    if not client_data:
                        await manager.broadcast({
                            "type": "ai_reply",
                            "text": "Error: Belum ada klien terdaftar.",
                            "sender": "simulator_dashboard",
                        })
                    elif not client_data.get("is_active", 1):
                        await manager.broadcast({
                            "type": "ai_reply",
                            "text": "Error: Agen saat ini dinonaktifkan (is_active = 0).",
                            "sender": "simulator_dashboard",
                        })
                    else:
                        sim_phone = "simulator_dashboard"

                        await manager.broadcast({
                            "type": "message_in",
                            "sender": sim_phone,
                            "text": msg["text"],
                        })
                        await manager.broadcast({"type": "ai_processing"})

                        ai_reply = await get_ai_response(
                            client_data, sim_phone, msg["text"]
                        )

                        await manager.broadcast({
                            "type": "ai_reply",
                            "text": ai_reply,
                            "sender": sim_phone,
                        })
            except json.JSONDecodeError:
                pass

    except WebSocketDisconnect:
        manager.disconnect(websocket)


# ==========================================
# Run Server
# ==========================================
if __name__ == "__main__":
    uvicorn.run(
        "server:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
    )
