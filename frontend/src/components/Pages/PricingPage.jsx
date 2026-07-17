import React from 'react';
import { useGlobalContext } from '../../App';

export function PricingPage() {
  const { navigate } = useGlobalContext();

  return (
    <div className="min-h-screen bg-[#0b0e17] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => navigate('/')} className="mb-8 px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition">← Back to Dashboard</button>
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
