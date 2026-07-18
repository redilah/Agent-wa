import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGlobalContext } from '../../App';
import { getSessions, revokeSession } from '../../api/client';
import { useEffect } from 'react';

export function SettingsPage() {
  const { t } = useTranslation();
  const { 
    navigate, 
    user, 
    updateUser, 
    addToast, 
    isDark, 
    toggleTheme 
  } = useGlobalContext();

  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState(user?.name || '');
  const [sessions, setSessions] = useState([]);
  
  useEffect(() => {
    if (activeTab === 'security') {
      getSessions()
        .then(data => setSessions(data.sessions || []))
        .catch(err => console.error("Failed to fetch sessions", err));
    }
  }, [activeTab]);

  const handleRevokeSession = async (sessionId) => {
    try {
      await revokeSession(sessionId);
      setSessions(prev => prev.filter(s => s.session_id !== sessionId));
      addToast('Session revoked', 'success');
      if (sessionId === localStorage.getItem('regalia_session_id')) {
          localStorage.removeItem('regalia_session_id');
      }
    } catch(err) {
      addToast('Failed to revoke session', 'error');
    }
  };

  const handleSaveProfile = () => {
    updateUser({ name });
    addToast(t('profileAkun') + ' ' + t('savedStatusText').toLowerCase(), 'success');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-dark)] text-[var(--text-primary)] flex transition-colors duration-200">
      {/* Settings Navigation Sidebar */}
      <div className="w-64 border-r border-[var(--card-border)] p-6 flex flex-col gap-6">
        <button onClick={() => navigate('/')} className="btn-secondary flex items-center justify-center gap-2 self-start">
          <span className="google-symbols notranslate text-lg font-bold">arrow_back</span>
          <span>Back</span>
        </button>
        
        <h2 className="text-xl font-bold tracking-tight px-3">{t('settingsTitle')}</h2>
        
        <nav className="flex flex-col gap-1">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-4 py-2.5 rounded-lg font-medium transition-all ${
              activeTab === 'profile' 
                ? 'text-[var(--text-primary)] border-l-2 border-[#60a5fa] pl-3 bg-[var(--accent-blue-glow)]' 
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-border)] pl-3 border-l-2 border-transparent'
            }`}
          >
            {t('profileAkun')}
          </button>
          
          <button 
            onClick={() => setActiveTab('security')}
            className={`w-full text-left px-4 py-2.5 rounded-lg font-medium transition-all ${
              activeTab === 'security' 
                ? 'text-[var(--text-primary)] border-l-2 border-[#60a5fa] pl-3 bg-[var(--accent-blue-glow)]' 
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-border)] pl-3 border-l-2 border-transparent'
            }`}
          >
            {t('keamanan')}
          </button>
          
          <button 
            onClick={() => setActiveTab('appearance')}
            className={`w-full text-left px-4 py-2.5 rounded-lg font-medium transition-all ${
              activeTab === 'appearance' 
                ? 'text-[var(--text-primary)] border-l-2 border-[#60a5fa] pl-3 bg-[var(--accent-blue-glow)]' 
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-border)] pl-3 border-l-2 border-transparent'
            }`}
          >
            {t('tampilan')}
          </button>
          
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`w-full text-left px-4 py-2.5 rounded-lg font-medium transition-all ${
              activeTab === 'notifications' 
                ? 'text-[var(--text-primary)] border-l-2 border-[#60a5fa] pl-3 bg-[var(--accent-blue-glow)]' 
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-border)] pl-3 border-l-2 border-transparent'
            }`}
          >
            {t('notifikasi')}
          </button>
        </nav>
      </div>

      {/* Main Settings Form Container */}
      <div className="flex-1 p-10 max-w-3xl flex flex-col gap-8">
        
        {/* Profile Tab Panel */}
        {activeTab === 'profile' && (
          <div className="panel-card animate-[fadeIn_0.3s_ease]">
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
                  className="cfg-input !bg-[var(--bg-dark)]/40 !cursor-not-allowed !text-[var(--text-muted)]" 
                />
                <p className="text-xs text-[var(--text-muted)] mt-1">{t('emailChangeNotice')}</p>
              </div>

              <div className="form-field">
                <label className="field-label">{t('profilePhotoLabel')}</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xl font-bold text-white">
                    {name ? name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <button className="btn-test-connection">{t('changePhotoBtn')}</button>
                </div>
              </div>

              <div className="pt-6 border-t border-[var(--card-border)] flex justify-end">
                <button onClick={handleSaveProfile} className="btn-save-config glow-button !py-2.5 !px-6">
                  {t('saveChangesBtn')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Security Tab Panel */}
        {activeTab === 'security' && (
          <div className="panel-card animate-[fadeIn_0.3s_ease]">
            <div className="panel-card-header">
              <div className="panel-icon-circle">
                <span className="google-symbols notranslate">security</span>
              </div>
              <div className="panel-title-block">
                <h1 className="panel-title-text !text-2xl">{t('keamanan')}</h1>
                <p className="panel-desc-text">Manage your password, login credentials, and session security.</p>
              </div>
            </div>

            <div className="panel-body-content !gap-6">
              <div className="form-field">
                <label className="field-label">Current Password</label>
                <input type="password" placeholder="••••••••" className="cfg-input" />
              </div>
              <div className="form-field">
                <label className="field-label">New Password</label>
                <input type="password" placeholder="••••••••" className="cfg-input" />
              </div>
              <div className="form-field">
                <label className="field-label">Confirm New Password</label>
                <input type="password" placeholder="••••••••" className="cfg-input" />
              </div>

              <div className="pt-4 border-t border-[var(--card-border)]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">Two-Factor Authentication (2FA)</div>
                    <p className="text-xs text-[var(--text-muted)] mt-1">Secure your account with an extra verification layer.</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--card-border)]">
                <div className="text-sm font-semibold mb-3">Active Sessions</div>
                <div className="flex flex-col gap-3">
                  {sessions.map(sess => {
                    const isCurrent = sess.session_id === localStorage.getItem('regalia_session_id');
                    return (
                      <div key={sess.session_id} className="flex justify-between items-center bg-[var(--bg-dark)]/50 p-3 rounded-lg border border-[var(--card-border)]">
                        <div>
                          <div className="text-xs font-semibold">{sess.device_info || 'Unknown Device'}</div>
                          <div className="text-[10px] text-[var(--text-muted)] mt-0.5">
                            {sess.location} • {sess.ip_address} {isCurrent && '• Current Session'}
                          </div>
                        </div>
                        {isCurrent ? (
                           <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-medium">Active</span>
                        ) : (
                           <button className="text-[10px] text-red-400 hover:text-red-300 font-medium" onClick={() => handleRevokeSession(sess.session_id)}>Revoke</button>
                        )}
                      </div>
                    );
                  })}
                  {sessions.length === 0 && (
                    <div className="text-xs text-[var(--text-muted)]">No active sessions found.</div>
                  )}
                </div>
              </div>

              <div className="pt-6 border-t border-[var(--card-border)] flex justify-end">
                <button onClick={() => addToast('Security settings saved!', 'success')} className="btn-save-config glow-button !py-2.5 !px-6">
                  {t('saveChangesBtn')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Appearance Tab Panel */}
        {activeTab === 'appearance' && (
          <div className="panel-card animate-[fadeIn_0.3s_ease]">
            <div className="panel-card-header">
              <div className="panel-icon-circle">
                <span className="google-symbols notranslate">palette</span>
              </div>
              <div className="panel-title-block">
                <h1 className="panel-title-text !text-2xl">{t('tampilan')}</h1>
                <p className="panel-desc-text">Customize the system theme, layout, and visual styles.</p>
              </div>
            </div>

            <div className="panel-body-content !gap-6">
              <div className="form-field">
                <label className="field-label">Theme Mode</label>
                <div className="grid grid-cols-2 gap-4 mt-1">
                  <div 
                    className={`p-4 rounded-xl border flex flex-col items-center gap-3 cursor-pointer transition ${!isDark ? 'border-[#60a5fa] bg-[var(--accent-blue-glow)] text-[var(--text-primary)]' : 'border-[var(--card-border)] text-[var(--text-secondary)] hover:border-[var(--card-border-hover)] hover:text-[var(--text-primary)]'}`}
                    onClick={() => { if (isDark) toggleTheme(); }}
                  >
                    <span className="google-symbols notranslate text-2xl">light_mode</span>
                    <span className="text-sm font-semibold">Light Mode</span>
                  </div>
                  <div 
                    className={`p-4 rounded-xl border flex flex-col items-center gap-3 cursor-pointer transition ${isDark ? 'border-[#60a5fa] bg-[var(--accent-blue-glow)] text-[var(--text-primary)]' : 'border-[var(--card-border)] text-[var(--text-secondary)] hover:border-[var(--card-border-hover)] hover:text-[var(--text-primary)]'}`}
                    onClick={() => { if (!isDark) toggleTheme(); }}
                  >
                    <span className="google-symbols notranslate text-2xl">dark_mode</span>
                    <span className="text-sm font-semibold">Dark Mode</span>
                  </div>
                </div>
              </div>

              <div className="form-field">
                <label className="field-label">Font Size</label>
                <div className="flex gap-3 mt-1">
                  {['Small', 'Medium', 'Large'].map(size => (
                    <button 
                      key={size}
                      className="btn-test-connection !py-2 !px-4 hover:border-white/20 cursor-pointer"
                      onClick={() => addToast(`Font size changed to ${size}`, 'info')}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab Panel */}
        {activeTab === 'notifications' && (
          <div className="panel-card animate-[fadeIn_0.3s_ease]">
            <div className="panel-card-header">
              <div className="panel-icon-circle">
                <span className="google-symbols notranslate">notifications</span>
              </div>
              <div className="panel-title-block">
                <h1 className="panel-title-text !text-2xl">{t('notifikasi')}</h1>
                <p className="panel-desc-text">Configure notification sources and warning thresholds.</p>
              </div>
            </div>

            <div className="panel-body-content !gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between p-3 bg-[var(--bg-dark)]/50 rounded-lg border border-[var(--card-border)]">
                  <div>
                    <div className="text-sm font-semibold">Browser Notifications</div>
                    <p className="text-xs text-[var(--text-muted)] mt-1">Show desktop warnings on incoming chats.</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="flex items-center justify-between p-3 bg-[var(--bg-dark)]/50 rounded-lg border border-[var(--card-border)]">
                  <div>
                    <div className="text-sm font-semibold">Audio Alerts</div>
                    <p className="text-xs text-[var(--text-muted)] mt-1">Play sound alert on new replies.</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="flex items-center justify-between p-3 bg-[var(--bg-dark)]/50 rounded-lg border border-[var(--card-border)]">
                  <div>
                    <div className="text-sm font-semibold">Email Digest Reports</div>
                    <p className="text-xs text-[var(--text-muted)] mt-1">Send daily activity summary to email.</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>

              <div className="pt-6 border-t border-[var(--card-border)] flex justify-end">
                <button onClick={() => addToast('Notification preferences saved!', 'success')} className="btn-save-config glow-button !py-2.5 !px-6">
                  {t('saveChangesBtn')}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
