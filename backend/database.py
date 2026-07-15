"""
database.py — SQLite Multi-Tenant Database untuk Regalia WA Agent SaaS

Tabel:
- clients: Data klien UMKM (nama bisnis, knowledge base, WA credentials)
- conversations: Riwayat percakapan per-pelanggan per-klien
"""

import sqlite3
import os
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), "regalia.db")


def get_connection():
    """Membuat koneksi ke database SQLite."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    return conn


def init_db():
    """Inisialisasi tabel database dan seed data dummy klien pertama."""
    conn = get_connection()
    cursor = conn.cursor()

    # Tabel Klien (multi-tenant)
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

    # Check if existing table needs migration for the new toggle columns
    cursor.execute("PRAGMA table_info(clients)")
    columns = [row["name"] for row in cursor.fetchall()]
    
    new_columns = {
        "toggle_slang": "INTEGER DEFAULT 1",
        "toggle_java": "INTEGER DEFAULT 1",
        "toggle_ongkir": "INTEGER DEFAULT 1",
        "toggle_anger": "INTEGER DEFAULT 1",
        "toggle_fallback": "INTEGER DEFAULT 1"
    }
    
    for col, col_type in new_columns.items():
        if col not in columns:
            try:
                cursor.execute(f"ALTER TABLE clients ADD COLUMN {col} {col_type}")
                print(f"[DB] Migrasi: Kolom {col} berhasil ditambahkan.")
            except Exception as e:
                print(f"[DB] Gagal menambahkan kolom {col}: {e}")

    # Tabel Percakapan (riwayat chat per pelanggan)
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

    # Seed: Klien dummy pertama untuk testing
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
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "SELECT * FROM clients WHERE wa_phone_number_id = ? AND is_active = 1",
        (phone_number_id,)
    )
    row = cursor.fetchone()
    conn.close()
    return dict(row) if row else None


def get_client_by_id(client_id: int) -> dict | None:
    """Ambil data klien berdasarkan ID."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM clients WHERE id = ?", (client_id,))
    row = cursor.fetchone()
    conn.close()
    return dict(row) if row else None


def get_first_client() -> dict | None:
    """Ambil klien pertama yang aktif (untuk testing/simulator)."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM clients WHERE is_active = 1 LIMIT 1")
    row = cursor.fetchone()
    conn.close()
    return dict(row) if row else None


def get_any_first_client() -> dict | None:
    """Ambil klien pertama tanpa memedulikan status is_active."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM clients LIMIT 1")
    row = cursor.fetchone()
    conn.close()
    return dict(row) if row else None


def save_message(client_id: int, customer_phone: str, role: str, content: str):
    """Simpan pesan ke riwayat percakapan."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO conversations (client_id, customer_phone, role, content, timestamp)
        VALUES (?, ?, ?, ?, ?)
    """, (client_id, customer_phone, role, content, datetime.now().isoformat()))
    conn.commit()
    conn.close()


def get_chat_history(client_id: int, customer_phone: str, limit: int = 20) -> list[dict]:
    """Ambil riwayat percakapan terbaru untuk konteks AI."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT role, content FROM conversations
        WHERE client_id = ? AND customer_phone = ?
        ORDER BY timestamp DESC LIMIT ?
    """, (client_id, customer_phone, limit))
    rows = cursor.fetchall()
    conn.close()
    # Balik urutannya agar kronologis (dari lama ke baru)
    return [{"role": row["role"], "content": row["content"]} for row in reversed(rows)]


# Auto-init saat module di-import
init_db()
