import React from 'react';
import { useGlobalContext } from '../../App';

export function LearnPage() {
  const { navigate } = useGlobalContext();

  return (
    <div className="min-h-screen bg-[#0b0e17] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate('/')} className="mb-8 px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition">← Back to Dashboard</button>
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
