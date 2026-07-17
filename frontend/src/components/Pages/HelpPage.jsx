import React from 'react';
import { useGlobalContext } from '../../App';

export function HelpPage() {
  const { navigate } = useGlobalContext();

  return (
    <div className="min-h-screen bg-[#0b0e17] text-white p-8">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => navigate('/')} className="mb-8 px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition">← Back to Dashboard</button>
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
