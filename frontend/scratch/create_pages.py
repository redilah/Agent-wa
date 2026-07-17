import os

pages_dir = r"c:\Users\GC\Downloads\OneDrive\Desktop\Agent AI CS\frontend\src\components\Pages"
os.makedirs(pages_dir, exist_ok=True)

pages = {
    "LearnPage.jsx": """import React from 'react';

export function LearnPage() {
  return (
    <div className="min-h-screen bg-[#0b0e17] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => window.location.href = '/'} className="mb-8 px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition">← Back to Dashboard</button>
        <h1 className="text-4xl font-bold mb-6">Pelajari lebih lanjut</h1>
        <div className="space-y-6 text-white/80 leading-relaxed">
          <p>Regalia AI adalah platform layanan pelanggan otonom tingkat enterprise. Kami membantu mengotomatisasi interaksi pelanggan di WhatsApp Business dengan menggunakan model AI generatif terkini.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
              <span className="google-symbols text-3xl mb-4 text-blue-400">quick_reference_all</span>
              <h3 className="text-xl font-semibold mb-2 text-white">Panduan Memulai</h3>
              <p className="text-sm">Pelajari cara menyambungkan WhatsApp API dan mengatur pengetahuan dasar (Knowledge Base) untuk agen Anda.</p>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
              <span className="google-symbols text-3xl mb-4 text-emerald-400">api</span>
              <h3 className="text-xl font-semibold mb-2 text-white">Dokumentasi API</h3>
              <p className="text-sm">Integrasikan Regalia dengan CRM atau sistem internal Anda menggunakan webhook dan REST API.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
""",
    "DownloadsPage.jsx": """import React from 'react';

export function DownloadsPage() {
  return (
    <div className="min-h-screen bg-[#0b0e17] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => window.location.href = '/'} className="mb-8 px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition">← Back to Dashboard</button>
        <h1 className="text-4xl font-bold mb-4">Dapatkan aplikasi dan ekstensi</h1>
        <p className="text-white/60 mb-10">Unduh aplikasi Regalia untuk pengalaman yang lebih cepat dan terintegrasi di perangkat Anda.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center text-center hover:bg-white/10 transition cursor-pointer">
            <span className="google-symbols text-5xl mb-4">desktop_windows</span>
            <h3 className="text-xl font-bold mb-2">Windows</h3>
            <p className="text-sm text-white/60 mb-6">Untuk Windows 10 & 11</p>
            <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-xl font-medium mt-auto">Unduh .exe</button>
          </div>
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center text-center hover:bg-white/10 transition cursor-pointer">
            <span className="google-symbols text-5xl mb-4">desktop_mac</span>
            <h3 className="text-xl font-bold mb-2">macOS</h3>
            <p className="text-sm text-white/60 mb-6">Apple Silicon & Intel</p>
            <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-xl font-medium mt-auto">Unduh .dmg</button>
          </div>
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center text-center hover:bg-white/10 transition cursor-pointer">
            <span className="google-symbols text-5xl mb-4">extension</span>
            <h3 className="text-xl font-bold mb-2">Ekstensi Browser</h3>
            <p className="text-sm text-white/60 mb-6">Chrome, Edge & Brave</p>
            <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-xl font-medium mt-auto">Tambahkan</button>
          </div>
        </div>
      </div>
    </div>
  );
}
""",
    "PricingPage.jsx": """import React from 'react';

export function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0b0e17] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => window.location.href = '/'} className="mb-8 px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition">← Back to Dashboard</button>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Tingkatkan paket Anda</h1>
          <p className="text-white/60">Pilih paket yang sesuai dengan kebutuhan skala bisnis Anda.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
            <h3 className="text-2xl font-bold mb-2">Free</h3>
            <div className="text-4xl font-bold mb-6">$0<span className="text-lg text-white/50 font-normal">/mo</span></div>
            <ul className="space-y-4 mb-8 text-white/80">
              <li className="flex items-center gap-2"><span className="google-symbols text-emerald-400">check</span> 100 interaksi AI per bulan</li>
              <li className="flex items-center gap-2"><span className="google-symbols text-emerald-400">check</span> 1 Agen WhatsApp</li>
              <li className="flex items-center gap-2"><span className="google-symbols text-emerald-400">check</span> Dukungan komunitas</li>
            </ul>
            <button className="w-full py-3 bg-white/10 text-white rounded-xl font-medium" disabled>Paket Anda Saat Ini</button>
          </div>
          
          <div className="p-8 bg-blue-600/20 border-2 border-blue-500 rounded-3xl relative">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Paling Populer</div>
            <h3 className="text-2xl font-bold mb-2 text-white">Pro</h3>
            <div className="text-4xl font-bold mb-6">$49<span className="text-lg text-white/50 font-normal">/mo</span></div>
            <ul className="space-y-4 mb-8 text-white/80">
              <li className="flex items-center gap-2"><span className="google-symbols text-blue-400">check</span> 5,000 interaksi AI per bulan</li>
              <li className="flex items-center gap-2"><span className="google-symbols text-blue-400">check</span> Hingga 5 Agen WhatsApp</li>
              <li className="flex items-center gap-2"><span className="google-symbols text-blue-400">check</span> Knowledge Base Lanjutan</li>
              <li className="flex items-center gap-2"><span className="google-symbols text-blue-400">check</span> Dukungan Prioritas 24/7</li>
            </ul>
            <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition">Tingkatkan ke Pro</button>
          </div>
          
          <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
            <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
            <div className="text-4xl font-bold mb-6">Custom</div>
            <ul className="space-y-4 mb-8 text-white/80">
              <li className="flex items-center gap-2"><span className="google-symbols text-purple-400">check</span> Interaksi AI tanpa batas</li>
              <li className="flex items-center gap-2"><span className="google-symbols text-purple-400">check</span> Agen tak terbatas</li>
              <li className="flex items-center gap-2"><span className="google-symbols text-purple-400">check</span> SLA 99.9%</li>
              <li className="flex items-center gap-2"><span className="google-symbols text-purple-400">check</span> Dedicated Account Manager</li>
            </ul>
            <button className="w-full py-3 bg-white text-black hover:bg-gray-200 rounded-xl font-bold transition">Hubungi Kami</button>
          </div>
        </div>
      </div>
    </div>
  );
}
""",
    "HelpPage.jsx": """import React from 'react';

export function HelpPage() {
  return (
    <div className="min-h-screen bg-[#0b0e17] text-white p-8">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => window.location.href = '/'} className="mb-8 px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition">← Back to Dashboard</button>
        <h1 className="text-4xl font-bold mb-8">Pusat Bantuan</h1>
        
        <div className="relative mb-12">
          <span className="google-symbols absolute left-4 top-1/2 -translate-y-1/2 text-white/50">search</span>
          <input type="text" placeholder="Cari panduan atau tanya sesuatu..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition" />
        </div>
        
        <h2 className="text-2xl font-semibold mb-6">Topik Populer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 cursor-pointer hover:bg-white/10 transition flex items-center justify-between">
            <span>Cara menghubungkan nomor WhatsApp</span>
            <span className="google-symbols text-white/40">chevron_right</span>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 cursor-pointer hover:bg-white/10 transition flex items-center justify-between">
            <span>Mengatur Knowledge Base</span>
            <span className="google-symbols text-white/40">chevron_right</span>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 cursor-pointer hover:bg-white/10 transition flex items-center justify-between">
            <span>Masalah penagihan & faktur</span>
            <span className="google-symbols text-white/40">chevron_right</span>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 cursor-pointer hover:bg-white/10 transition flex items-center justify-between">
            <span>Format Data Webhook</span>
            <span className="google-symbols text-white/40">chevron_right</span>
          </div>
        </div>
        
        <div className="p-6 bg-blue-600/10 border border-blue-500/30 rounded-2xl flex items-start gap-4">
          <span className="google-symbols text-blue-400 text-3xl">support_agent</span>
          <div>
            <h3 className="text-lg font-bold mb-2">Butuh bantuan lebih lanjut?</h3>
            <p className="text-sm text-white/70 mb-4">Tim dukungan kami siap membantu Anda 24/7. Buat tiket dukungan dan kami akan merespons melalui email.</p>
            <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">Kirim Tiket Bantuan</button>
          </div>
        </div>
      </div>
    </div>
  );
}
""",
    "SettingsPage.jsx": """import React from 'react';

export function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#0b0e17] text-white flex">
      <div className="w-64 border-r border-white/10 p-6">
        <button onClick={() => window.location.href = '/'} className="mb-8 px-3 py-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition text-sm flex items-center gap-2">
          <span className="google-symbols text-sm">arrow_back</span> Kembali
        </button>
        <h2 className="text-xl font-bold mb-6">Pengaturan</h2>
        <nav className="space-y-2">
          <button className="w-full text-left px-4 py-2 bg-white/10 text-white rounded-lg font-medium">Profil Akun</button>
          <button className="w-full text-left px-4 py-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition">Keamanan</button>
          <button className="w-full text-left px-4 py-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition">Tampilan</button>
          <button className="w-full text-left px-4 py-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition">Notifikasi</button>
        </nav>
      </div>
      <div className="flex-1 p-10 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Profil Akun</h1>
        <div className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Nama Lengkap</label>
            <input type="text" defaultValue="User" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Email</label>
            <input type="email" defaultValue="user@regalia.ai" disabled className="w-full bg-black/20 border border-white/5 rounded-xl py-3 px-4 text-white/50 cursor-not-allowed" />
            <p className="text-xs text-white/40 mt-2">Hubungi dukungan pelanggan untuk mengubah alamat email Anda.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Foto Profil</label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xl font-bold">U</div>
              <button className="px-4 py-2 border border-white/20 rounded-lg hover:bg-white/5 transition text-sm">Ubah Foto</button>
            </div>
          </div>
          <div className="pt-6 border-t border-white/10 flex justify-end">
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition">Simpan Perubahan</button>
          </div>
        </div>
      </div>
    </div>
  );
}
"""
}

for name, content in pages.items():
    with open(os.path.join(pages_dir, name), 'w', encoding='utf-8') as f:
        f.write(content)

print("Pages created successfully.")
