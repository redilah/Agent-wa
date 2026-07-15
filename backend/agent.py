"""
agent.py — Otak AI Agent menggunakan Google GenAI SDK (Gemini)

Setiap klien punya system prompt sendiri yang dibentuk dari:
- Nama bisnis klien
- Knowledge base (info produk, FAQ, dll yang di-paste klien)

AI membaca riwayat chat agar konteks percakapan terjaga.
"""

import os
from google import genai
from google.genai import types
from database import get_chat_history, save_message


# Inisialisasi Gemini client
_api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY", "")
client = genai.Client(api_key=_api_key)

# Model yang digunakan
MODEL_ID = "gemini-2.5-flash"


import random
import string
import re

def cek_ongkir(destination: str) -> str:
    """Cek tarif ongkos kirim (ongkir) ke destinasi tertentu.
    
    Args:
        destination: Kota atau daerah tujuan pengiriman (misal: Cibadak, Sukabumi, Bandung).
    """
    print(f"[TOOL] Executing cek_ongkir for destination: {destination}")
    try:
        from server import manager
        import asyncio
        asyncio.create_task(manager.broadcast({
            "type": "tool_execution",
            "tool": "cek_ongkir",
            "arguments": {"destination": destination},
            "status": "success"
        }))
    except Exception:
        pass
        
    dest_lower = destination.lower()
    if "cibadak" in dest_lower or "sukabumi" in dest_lower:
        return "Tarif Ongkir ke Cibadak/Sukabumi: Rp 12.000, estimasi 2-3 hari via J&T COD."
    else:
        return "Tarif Ongkir ke daerah tujuan Anda: Rp 15.000 - Rp 25.000, estimasi 2-5 hari via JNE/J&T/SiCepat."


def buat_tiket_komplain(resi_number: str) -> str:
    """Membuat tiket keluhan/komplain resmi untuk nomor resi pengiriman tertentu jika pelanggan mengalami kendala.
    
    Args:
        resi_number: Nomor resi pengiriman yang bermasalah (misal: JP123456789).
    """
    print(f"[TOOL] Executing buat_tiket_komplain for resi: {resi_number}")
    ticket_id = f"TKT-{''.join(random.choices(string.digits, k=6))}"
    
    try:
        from server import manager
        import asyncio
        asyncio.create_task(manager.broadcast({
            "type": "tool_execution",
            "tool": "buat_tiket_komplain",
            "arguments": {"resi_number": resi_number},
            "status": "success",
            "ticket_id": ticket_id
        }))
    except Exception:
        pass
        
    return f"Tiket komplain berhasil dibuat dengan nomor tiket: {ticket_id} untuk nomor resi: {resi_number}. Tim customer care kami akan segera menyelidiki masalah pengiriman ini."


def detect_anger(message: str) -> bool:
    """Deteksi jika pelanggan mengekspresikan kekecewaan, kemarahan, atau keluhan."""
    angry_keywords = [
        r"kecewa", r"marah", r"lambat", r"jelek", r"penipu", r"woi", r"goblok", r"anjing", 
        r"lama\s+banget", r"lama\s+sekali", r"pecah", r"rusak", r"komplain", r"parah", 
        r"nyesel", r"rugi", r"tanggung\s*jawab", r"tidak\s+sesuai", r"kurang\s+ajar", 
        r"gimana\s+sih", r"lemot", r"kapok", r"kecewa\s+berat", r"mengecewakan"
    ]
    pattern = re.compile("|".join(angry_keywords), re.IGNORECASE)
    return bool(pattern.search(message))


def generate_random_voucher() -> str:
    """Generate voucher acak 8 karakter diawali 'REG'."""
    chars = "".join(random.choices(string.ascii_uppercase + string.digits, k=5))
    return f"REG{chars}"


def build_system_prompt(client_data: dict) -> str:
    """
    Membuat system prompt berdasarkan data klien.
    Klien cukup paste info bisnis mereka, dan AI langsung paham konteks.
    """
    nama_bisnis = client_data.get("nama_bisnis", "Bisnis")
    knowledge_base = client_data.get("knowledge_base", "")

    prompt = f"""Kamu adalah asisten customer service AI untuk "{nama_bisnis}".

PERAN:
- Kamu mewakili {nama_bisnis} dan bertugas melayani pelanggan via WhatsApp.
- Jawab dengan ramah, natural, dan profesional dalam Bahasa Indonesia.
- Gunakan bahasa santai tapi sopan (boleh pakai "kak", "kamu", dll).
- Jawab singkat dan to the point, jangan terlalu panjang kecuali diminta.

INFORMASI BISNIS:
{knowledge_base}

ATURAN PENTING:
1. Jika pelanggan bertanya sesuatu yang TIDAK ada di informasi bisnis di atas, jawab dengan jujur bahwa kamu belum punya info tersebut dan sarankan menghubungi admin langsung.
2. JANGAN mengarang informasi harga, produk, atau kebijakan yang tidak ada di atas.
3. Jika pelanggan ingin melakukan pemesanan, arahkan mereka ke langkah selanjutnya sesuai info yang tersedia.
4. Jika pelanggan hanya menyapa (halo, hi, p, dll), balas dengan sapaan hangat dan tawarkan bantuan.
5. Selalu akhiri jawaban dengan pertanyaan follow-up jika sesuai (misal: "Ada lagi yang mau ditanya, kak?").
"""

    # Slang Engine Toggle
    if client_data.get("toggle_slang", 1):
        prompt += """
6. BAHASA GAUL/SLANG & SINGKATAN (SLANG ENGINE ACTIVE):
   - Deteksi jika pelanggan menggunakan bahasa gaul, slang, atau singkatan khas Indonesia (seperti "sabi", "mager", "kuy", "gan", "sis", "ready ga", "ongkir", "yg", "dgn", "gaes", dll).
   - Tanggapi dengan gaya bahasa kasual/santai yang senada agar akrab, namun tetap sopan, menghormati pelanggan, dan profesional.
"""

    # Javanese Dialect Toggle
    if client_data.get("toggle_java", 1):
        prompt += """
7. DIALEK BAHASA JAWA (JAVANESE ROUTER ACTIVE):
   - Deteksi jika pelanggan menggunakan bahasa Jawa (terutama tingkat halus/Krama Alus seperti "pinten nggih", "ongkiripun", "dhateng", "matur nuwun", dll).
   - Jika pelanggan bertanya dalam bahasa Jawa, kamu harus menjawabnya menggunakan bahasa Jawa yang sopan dan ramah (Krama Alus). Terjemahkan informasi dari knowledge base ke bahasa Jawa dengan baik.
"""

    return prompt


async def get_ai_response(client_data: dict, customer_phone: str, user_message: str) -> str:
    """
    Memproses pesan pelanggan dan menghasilkan respons AI.
    
    Args:
        client_data: Data klien dari database (nama_bisnis, knowledge_base, dll)
        customer_phone: Nomor telepon pelanggan
        user_message: Pesan dari pelanggan
    
    Returns:
        Teks respons AI
    """
    client_id = client_data["id"]

    # Simpan pesan masuk ke database
    save_message(client_id, customer_phone, "user", user_message)

    # Ambil riwayat percakapan untuk konteks
    history = get_chat_history(client_id, customer_phone, limit=20)

    # Bangun contents untuk Gemini
    contents = []
    for msg in history:
        role = "user" if msg["role"] == "user" else "model"
        contents.append(types.Content(
            role=role,
            parts=[types.Part(text=msg["content"])]
        ))

    # System prompt berdasarkan data klien
    system_prompt = build_system_prompt(client_data)

    # Sentiment & Anger De-escalation
    is_angry = False
    voucher_code = None
    if client_data.get("toggle_anger", 1):
        if detect_anger(user_message):
            is_angry = True
            voucher_code = generate_random_voucher()
            
            # Broadcast anger detection to dashboard for visual feedback
            try:
                from server import manager
                import asyncio
                asyncio.create_task(manager.broadcast({
                    "type": "anger_detected",
                    "voucher_code": voucher_code,
                    "customer_phone": customer_phone
                }))
            except Exception:
                pass
            
            # Inject instructions for anger de-escalation
            system_prompt += f"""
\n[SISTEM DETEKSI EMOSI AKTIF]
Pelanggan terdeteksi mengekspresikan keluhan, kemarahan, kekecewaan, atau frustrasi.
Kamu WAJIB:
1. Menanggapi dengan empati yang mendalam, tulus, dan meminta maaf atas ketidaknyamanan tersebut.
2. Memberikan kode voucher kompensasi khusus ini: {voucher_code} sebagai bentuk permohonan maaf dan penyesalan kami.
3. Menjelaskan bahwa voucher ini dapat digunakan untuk diskon/potongan harga (misalnya diskon 15% atau potongan harga spesial) pada pembelian berikutnya.
"""

    # Konfigurasi tools (cek_ongkir & buat_tiket_komplain) jika toggle_ongkir aktif
    tools_list = []
    if client_data.get("toggle_ongkir", 1):
        tools_list = [cek_ongkir, buat_tiket_komplain]

    config_args = {
        "system_instruction": system_prompt,
        "temperature": 0.7,
        "max_output_tokens": 500,
    }
    if tools_list:
        config_args["tools"] = tools_list

    try:
        # Panggil Gemini API
        response = client.models.generate_content(
            model=MODEL_ID,
            contents=contents,
            config=types.GenerateContentConfig(**config_args),
        )

        ai_reply = response.text.strip() if response.text else "Maaf, saya sedang mengalami gangguan. Silakan coba lagi nanti."

    except Exception as e:
        print(f"[AI] Error dari Gemini: {e}")
        ai_reply = "Maaf kak, sistem kami sedang ada gangguan sementara. Mohon coba beberapa saat lagi ya. 🙏"

    # Simpan respons AI ke database
    save_message(client_id, customer_phone, "model", ai_reply)

    return ai_reply
