import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGlobalContext } from '../../App';

export function SettingsPage() {
  const { t } = useTranslation();
  const { navigate, user, updateUser, addToast } = useGlobalContext();
  const [name, setName] = useState(user?.name || '');

  const handleSave = () => {
    updateUser({ name });
    addToast(t('profilAkun') + ' ' + t('savedStatusText').toLowerCase(), 'success');
  };

  return (
    <div className="min-h-screen bg-[#0e0f11] text-white flex">
      {/* Settings Navigation Sidebar */}
      <div className="w-64 border-r border-white/10 p-6 flex flex-col gap-6">
        <button onClick={() => navigate('/')} className="btn-secondary flex items-center justify-center gap-2">
          <span className="google-symbols notranslate text-sm">arrow_back</span>
          <span>{t('backToDashboard')}</span>
        </button>
        <h2 className="text-xl font-bold tracking-tight">{t('settingsTitle')}</h2>
        <nav className="flex flex-col gap-2">
          <button className="w-full text-left px-4 py-2.5 bg-white/10 text-white rounded-lg font-medium transition">{t('profileAkun')}</button>
          <button className="w-full text-left px-4 py-2.5 bg-transparent text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition">{t('keamanan')}</button>
          <button className="w-full text-left px-4 py-2.5 bg-transparent text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition">{t('tampilan')}</button>
          <button className="w-full text-left px-4 py-2.5 bg-transparent text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition">{t('notifikasi')}</button>
        </nav>
      </div>

      {/* Main Settings Form Container */}
      <div className="flex-1 p-10 max-w-3xl flex flex-col gap-8">
        <div className="panel-card">
          <div className="panel-card-header">
            <div className="panel-icon-circle">
              <span className="google-symbols notranslate">manage_accounts</span>
            </div>
            <div className="panel-title-block">
              <h1 className="panel-title-text !text-2xl">{t('profileAkun')}</h1>
              <p className="panel-desc-text">Manage your personal profile and display preferences.</p>
            </div>
          </div>

          <div className="panel-body-content !gap-6">
            <div className="form-field">
              <label className="field-label">{t('fullNameLabel')}</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="cfg-input" 
              />
            </div>

            <div className="form-field">
              <label className="field-label">{t('emailLabel')}</label>
              <input 
                type="email" 
                defaultValue={user?.email || "user@regalia.ai"} 
                disabled 
                className="cfg-input !bg-black/40 !cursor-not-allowed !text-white/40" 
              />
              <p className="text-xs text-white/40 mt-1">{t('emailChangeNotice')}</p>
            </div>

            <div className="form-field">
              <label className="field-label">{t('profilePhotoLabel')}</label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xl font-bold">
                  {name ? name.charAt(0).toUpperCase() : 'U'}
                </div>
                <button className="btn-test-connection">{t('changePhotoBtn')}</button>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex justify-end">
              <button onClick={handleSave} className="btn-save-config glow-button !py-2.5 !px-6">
                {t('saveChangesBtn')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
