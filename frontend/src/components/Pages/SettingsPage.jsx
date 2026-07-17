import React, { useState } from 'react';
import { useGlobalContext } from '../../App';

export function SettingsPage() {
  const { navigate, user, updateUser, addToast } = useGlobalContext();
  const [name, setName] = useState(user?.name || '');

  const handleSave = () => {
    updateUser({ name });
    addToast('Profil berhasil diperbarui!', 'success');
  };

  return (
    <div className="min-h-screen bg-[#0b0e17] text-white flex">
      <div className="w-64 border-r border-white/10 p-6">
        <button onClick={() => navigate('/')} className="mb-8 px-3 py-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition text-sm flex items-center gap-2">
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
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Email</label>
            <input 
              type="email" 
              defaultValue={user?.email || "user@regalia.ai"} 
              disabled 
              className="w-full bg-black/20 border border-white/5 rounded-xl py-3 px-4 text-white/50 cursor-not-allowed" 
            />
            <p className="text-xs text-white/40 mt-2">Hubungi dukungan pelanggan untuk mengubah alamat email Anda.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Foto Profil</label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xl font-bold">
                {name ? name.charAt(0).toUpperCase() : 'U'}
              </div>
              <button className="px-4 py-2 border border-white/20 rounded-lg hover:bg-white/5 transition text-sm">Ubah Foto</button>
            </div>
          </div>
          <div className="pt-6 border-t border-white/10 flex justify-end">
            <button onClick={handleSave} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition">
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
