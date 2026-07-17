import React from 'react';
import { useGlobalContext } from '../../App';

export function DownloadsPage() {
  const { navigate } = useGlobalContext();

  return (
    <div className="min-h-screen bg-[#0b0e17] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => navigate('/')} className="mb-8 px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition">← Back to Dashboard</button>
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
