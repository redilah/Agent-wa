"""
database.py — Multi-Tenant Database Manager untuk Regalia WA Agent SaaS
Mendukung Supabase (PostgreSQL) sebagai database utama dan SQLite sebagai fallback.

Tabel:
- clients: Data klien UMKM (nama bisnis, knowledge base, WA credentials)
- active_sessions: Sesi aktif pengguna dashboard
- conversations: Riwayat percakapan per-pelanggan per-klien
"""

import os
import sqlite3
from datetime import datetime
from dotenv import load_dotenv

load_dotenv(override=True)

SUPABASE_URL = os.environ.get("SUPABASE_URL", "https://ycmoudwdcihfdxqorwex.supabase.co")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljbW91ZHdkY2loZmR4cW9yd2V4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQzNzMyMjAsImV4cCI6MjA5OTk0OTIyMH0.76iSaqXxHHg-uODifE3oJIJ9mrZ2fENoyaVJjPC_Nfs")

supabase_client = None
if SUPABASE_URL and SUPABASE_KEY:
    try:
        from supabase import create_client
        supabase_client = create_client(SUPABASE_URL, SUPABASE_KEY)
        print(f"[DB] Terhubung ke Supabase: {SUPABASE_URL}")
    except Exception as e:
        print(f"[DB] Gagal menghubungkan Supabase Client ({e}), menggunakan SQLite fallback.")
        supabase_client = None

DB_PATH = os.path.join(os.path.dirname(__file__), "regalia.db")


def get_connection():
    """Membuat koneksi ke database SQLite (fallback)."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    return conn


def init_db():
    """Inisialisasi database (SQLite fallback)."""
    if supabase_client:
        print("[DB] Supabase aktif — melewati init_db SQLite.")
        return

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS clients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nama_bisnis TEXT NOT NULL,
            knowledge_base TEXT NOT NULL DEFAULT '',
            wa_phone_number_id TEXT DEFAULT '',
            wa_access_token TEXT DEFAULT '',
            is_active INTEGER DEFAULT 1,
            toggle_slang INTEGER DEFAULT 1,
            toggle_java INTEGER DEFAULT 1,
            toggle_ongkir INTEGER DEFAULT 1,
            toggle_anger INTEGER DEFAULT 1,
            toggle_fallback INTEGER DEFAULT 1,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS active_sessions (
            session_id TEXT PRIMARY KEY,
            ip_address TEXT NOT NULL,
            device_info TEXT NOT NULL,
            location TEXT NOT NULL,
            last_active TEXT DEFAULT CURRENT_TIMESTAMP
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS conversations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            client_id INTEGER NOT NULL,
            customer_phone TEXT NOT NULL,
            role TEXT NOT NULL,
            content TEXT NOT NULL,
            timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (client_id) REFERENCES clients(id)
        )
    """)

    cursor.execute("SELECT COUNT(*) FROM clients")
    if cursor.fetchone()[0] == 0:
        cursor.execute("""
            INSERT INTO clients (nama_bisnis, knowledge_base, wa_phone_number_id, wa_access_token, toggle_slang, toggle_java, toggle_ongkir, toggle_anger, toggle_fallback)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            "Regalia Skincare",
            """Kami adalah Regalia Skincare, toko skincare lokal Indonesia.

Produk kami:
- Acne Clear Serum (salicylic acid 2% + niacinamide) — Rp 89.000 — untuk kulit berjerawat
- Glow Moisturizer (hyaluronic acid + vitamin C) — Rp 120.000 — untuk melembabkan dan mencerahkan
- Sunscreen SPF 50 PA++++ — Rp 95.000 — perlindungan UV harian
- Gentle Cleanser (low pH) — Rp 65.000 — pembersih wajah lembut

Info pengiriman:
- Pengiriman dari Jakarta
- Kurir: JNE, J&T, SiCepat
- Gratis ongkir untuk pembelian di atas Rp 200.000
- Estimasi pengiriman: Jabodetabek 1-2 hari, Luar Jawa 3-5 hari

Jam operasional: Senin-Sabtu, 09:00-21:00 WIB
WhatsApp: Aktif 24 jam (dibalas oleh AI)

Promo bulan ini: Beli 2 produk diskon 15%!""",
            "1248259298367387",
            "",
            1, 1, 1, 1, 1
        ))

    conn.commit()
    conn.close()


def get_client_by_phone_id(phone_number_id: str) -> dict | None:
    """Cari klien berdasarkan WhatsApp Phone Number ID."""
    if supabase_client:
        try:
            res = supabase_client.table("clients").select("*").eq("wa_phone_number_id", phone_number_id).eq("is_active", 1).execute()
            return res.data[0] if res.data else None
        except Exception as e:
            print(f"[DB Error] get_client_by_phone_id via Supabase: {e}")

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM clients WHERE wa_phone_number_id = ? AND is_active = 1", (phone_number_id,))
    row = cursor.fetchone()
    conn.close()
    return dict(row) if row else None


def get_client_by_id(client_id: int) -> dict | None:
    """Ambil data klien berdasarkan ID."""
    if supabase_client:
        try:
            res = supabase_client.table("clients").select("*").eq("id", client_id).execute()
            return res.data[0] if res.data else None
        except Exception as e:
            print(f"[DB Error] get_client_by_id via Supabase: {e}")

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM clients WHERE id = ?", (client_id,))
    row = cursor.fetchone()
    conn.close()
    return dict(row) if row else None


def get_first_client() -> dict | None:
    """Ambil klien pertama yang aktif (untuk testing/simulator)."""
    if supabase_client:
        try:
            res = supabase_client.table("clients").select("*").eq("is_active", 1).limit(1).execute()
            return res.data[0] if res.data else None
        except Exception as e:
            print(f"[DB Error] get_first_client via Supabase: {e}")

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM clients WHERE is_active = 1 LIMIT 1")
    row = cursor.fetchone()
    conn.close()
    return dict(row) if row else None


def get_any_first_client() -> dict | None:
    """Ambil klien pertama tanpa memedulikan status is_active."""
    if supabase_client:
        try:
            res = supabase_client.table("clients").select("*").limit(1).execute()
            return res.data[0] if res.data else None
        except Exception as e:
            print(f"[DB Error] get_any_first_client via Supabase: {e}")

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM clients LIMIT 1")
    row = cursor.fetchone()
    conn.close()
    return dict(row) if row else None


def update_client_settings(client_id: int, updates: dict) -> dict | None:
    """Update settings klien ke Supabase atau SQLite."""
    if supabase_client:
        try:
            res = supabase_client.table("clients").update(updates).eq("id", client_id).execute()
            return res.data[0] if res.data else None
        except Exception as e:
            print(f"[DB Error] update_client_settings via Supabase: {e}")

    conn = get_connection()
    cursor = conn.cursor()
    fields = [f"{k} = ?" for k in updates.keys()]
    values = list(updates.values()) + [client_id]
    cursor.execute(f"UPDATE clients SET {', '.join(fields)} WHERE id = ?", values)
    conn.commit()
    conn.close()
    return get_client_by_id(client_id)


def save_message(client_id: int, customer_phone: str, role: str, content: str):
    """Simpan pesan ke riwayat percakapan."""
    timestamp = datetime.now().isoformat()
    if supabase_client:
        try:
            supabase_client.table("conversations").insert({
                "client_id": client_id,
                "customer_phone": customer_phone,
                "role": role,
                "content": content,
                "timestamp": timestamp
            }).execute()
            return
        except Exception as e:
            print(f"[DB Error] save_message via Supabase: {e}")

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO conversations (client_id, customer_phone, role, content, timestamp)
        VALUES (?, ?, ?, ?, ?)
    """, (client_id, customer_phone, role, content, timestamp))
    conn.commit()
    conn.close()


def get_chat_history(client_id: int, customer_phone: str, limit: int = 20) -> list[dict]:
    """Ambil riwayat percakapan terbaru untuk konteks AI."""
    if supabase_client:
        try:
            res = supabase_client.table("conversations")\
                .select("role, content")\
                .eq("client_id", client_id)\
                .eq("customer_phone", customer_phone)\
                .order("timestamp", desc=True)\
                .limit(limit)\
                .execute()
            return list(reversed(res.data)) if res.data else []
        except Exception as e:
            print(f"[DB Error] get_chat_history via Supabase: {e}")

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT role, content FROM conversations
        WHERE client_id = ? AND customer_phone = ?
        ORDER BY timestamp DESC LIMIT ?
    """, (client_id, customer_phone, limit))
    rows = cursor.fetchall()
    conn.close()
    return [{"role": row["role"], "content": row["content"]} for row in reversed(rows)]


def get_active_sessions() -> list[dict]:
    """Ambil semua sesi aktif."""
    if supabase_client:
        try:
            res = supabase_client.table("active_sessions").select("*").order("last_active", desc=True).execute()
            return res.data if res.data else []
        except Exception as e:
            print(f"[DB Error] get_active_sessions via Supabase: {e}")

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM active_sessions ORDER BY last_active DESC")
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]


def save_active_session(session_id: str, ip_address: str, device_info: str, location: str):
    """Simpan atau perbarui sesi aktif."""
    timestamp = datetime.now().isoformat()
    if supabase_client:
        try:
            supabase_client.table("active_sessions").upsert({
                "session_id": session_id,
                "ip_address": ip_address,
                "device_info": device_info,
                "location": location,
                "last_active": timestamp
            }).execute()
            return
        except Exception as e:
            print(f"[DB Error] save_active_session via Supabase: {e}")

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO active_sessions (session_id, ip_address, device_info, location, last_active)
        VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(session_id) DO UPDATE SET
            ip_address=excluded.ip_address,
            device_info=excluded.device_info,
            location=excluded.location,
            last_active=CURRENT_TIMESTAMP
    """, (session_id, ip_address, device_info, location))
    conn.commit()
    conn.close()


def revoke_active_session(session_id: str):
    """Hapus sesi aktif."""
    if supabase_client:
        try:
            supabase_client.table("active_sessions").delete().eq("session_id", session_id).execute()
            return
        except Exception as e:
            print(f"[DB Error] revoke_active_session via Supabase: {e}")

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM active_sessions WHERE session_id = ?", (session_id,))
    conn.commit()
    conn.close()


# Auto-init saat module di-import
init_db()
