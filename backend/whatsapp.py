"""
whatsapp.py — Modul komunikasi dengan WhatsApp Cloud API (Meta)

Menangani:
- Parsing pesan masuk dari webhook payload
- Mengirim balasan teks ke pelanggan
"""

import requests


GRAPH_API_URL = "https://graph.facebook.com/v21.0"


def parse_incoming_message(payload: dict) -> dict | None:
    """
    Mengekstrak data pesan dari webhook payload Meta.
    
    Returns dict dengan keys: phone_number_id, sender, message_text, message_id
    Atau None jika payload tidak berisi pesan teks.
    """
    try:
        entry = payload.get("entry", [])
        if not entry:
            return None

        changes = entry[0].get("changes", [])
        if not changes:
            return None

        value = changes[0].get("value", {})

        # Ambil Phone Number ID (untuk identifikasi klien mana)
        metadata = value.get("metadata", {})
        phone_number_id = metadata.get("phone_number_id", "")

        messages = value.get("messages", [])
        if not messages:
            return None

        msg = messages[0]

        # Hanya proses pesan teks untuk saat ini
        if msg.get("type") != "text":
            return None

        return {
            "phone_number_id": phone_number_id,
            "sender": msg.get("from", ""),
            "message_text": msg.get("text", {}).get("body", ""),
            "message_id": msg.get("id", ""),
        }

    except (KeyError, IndexError):
        return None


def send_text_message(phone_number_id: str, access_token: str, to: str, text: str) -> bool:
    """
    Mengirim pesan teks balasan ke pelanggan via WhatsApp Cloud API.
    
    Args:
        phone_number_id: Phone Number ID klien (dari Meta)
        access_token: Access Token WA Business klien
        to: Nomor telepon tujuan (format internasional, misal: 6281234567890)
        text: Isi pesan balasan
    
    Returns:
        True jika berhasil, False jika gagal
    """
    url = f"{GRAPH_API_URL}/{phone_number_id}/messages"

    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
    }

    data = {
        "messaging_product": "whatsapp",
        "to": to,
        "type": "text",
        "text": {"body": text},
    }

    try:
        response = requests.post(url, headers=headers, json=data, timeout=10)
        if response.status_code == 200:
            print(f"[WA] Pesan terkirim ke {to}")
            return True
        else:
            print(f"[WA] Gagal kirim pesan: {response.status_code} — {response.text}")
            return False
    except requests.RequestException as e:
        print(f"[WA] Error kirim pesan: {e}")
        return False


def mark_as_read(phone_number_id: str, access_token: str, message_id: str):
    """Tandai pesan sebagai sudah dibaca (centang biru)."""
    url = f"{GRAPH_API_URL}/{phone_number_id}/messages"

    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
    }

    data = {
        "messaging_product": "whatsapp",
        "status": "read",
        "message_id": message_id,
    }

    try:
        requests.post(url, headers=headers, json=data, timeout=5)
    except requests.RequestException:
        pass
