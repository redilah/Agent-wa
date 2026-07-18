// App.jsx — Root component, mengelola auth state, WebSocket, dan Global Context
import React, { useState, useCallback, useEffect, createContext, useContext } from 'react';
import { LoginPage }  from './components/LoginPage/LoginPage';
import { Dashboard }  from './components/Dashboard/Dashboard';
import { ToastContainer } from './components/Toast/Toast';
import { PrivacyPolicyPage }  from './components/Legal/PrivacyPolicyPage';
import { TermsOfServicePage } from './components/Legal/TermsOfServicePage';
import { LearnPage } from './components/Pages/LearnPage';
import { DownloadsPage } from './components/Pages/DownloadsPage';
import { PricingPage } from './components/Pages/PricingPage';
import { HelpPage } from './components/Pages/HelpPage';
import { SettingsPage } from './components/Pages/SettingsPage';
import { useWebSocket } from './hooks/useWebSocket';
import { useToast }     from './hooks/useToast';
import { getSettings, registerSession }  from './api/client';
import i18n from './i18n';

export const GlobalContext = createContext(null);

export const useGlobalContext = () => useContext(GlobalContext);

function escapeHTML(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

export default function App() {
  const [user, setUser] = useState(null);
  
  const [settings, setSettings] = useState(null);
  const [wsLogs, setWsLogs]     = useState([]);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('regalia_language') || 'en';
  });

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('regalia_theme');
    return saved !== 'light'; // default to true
  });

  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDark);
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev;
      localStorage.setItem('regalia_theme', next ? 'dark' : 'light');
      return next;
    });
  };

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('regalia_language', lang);
    i18n.changeLanguage(lang);
  };
  
  const updateUser = (newUserData) => {
    const updated = { ...user, ...newUserData };
    setUser(updated);
  };

  const { toasts, addToast } = useToast();

  const handleWsMessage = useCallback((data) => {
    const ts = new Date().toLocaleTimeString();
    let logEntry = null;

    switch (data.type) {
      case 'config_updated':
        setSettings(data.client);
        logEntry = { raw: data, ts, level: 'info', text: '[config_updated] Konfigurasi diperbarui.' };
        break;
      case 'message_in':
        logEntry = { raw: data, ts, level: 'info', text: `[message_in] ${escapeHTML(data.sender)}: ${escapeHTML(data.text)}` };
        break;
      case 'ai_reply':
        logEntry = { raw: data, ts, level: 'success', text: `[ai_reply] ${escapeHTML(data.text?.slice(0,80))}...` };
        break;
      default:
        logEntry = { raw: data, ts, level: 'info', text: `[ws] ${JSON.stringify(data)}` };
    }

    if (logEntry) {
      setWsLogs(prev => [...prev.slice(-200), logEntry]);
    }
  }, [addToast]);

  const { sendMessage: sendWsMessage } = useWebSocket(handleWsMessage);

  useEffect(() => {
    if (user) {
      getSettings()
        .then(setSettings)
        .catch(() => addToast('Gagal memuat settings dari server', 'error'));
        
      if (!localStorage.getItem('regalia_session_id')) {
        registerSession()
          .then(data => {
            if (data.session_id) localStorage.setItem('regalia_session_id', data.session_id);
          })
          .catch(err => console.error('Failed to register session:', err));
      }
    }
  }, [user, addToast]);

  // Block Ctrl+A
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogin = (profile) => {
    setUser(profile);
  };

  const handleLogout = () => {
    setUser(null);
    setSettings(null);
    setWsLogs([]);
    navigate('/');
  };

  // Provide everything to the app
  const contextValue = {
    user,
    updateUser,
    language,
    changeLanguage,
    navigate,
    addToast,
    isDark,
    toggleTheme
  };

  let pageContent;
  
  if (currentPath === '/privacy' || currentPath === '/privacy-policy') {
    pageContent = <PrivacyPolicyPage />;
  } else if (currentPath === '/terms' || currentPath === '/terms-of-service') {
    pageContent = <TermsOfServicePage />;
  } else if (!user) {
    pageContent = <LoginPage onLogin={handleLogin} addToast={addToast} />;
  } else if (currentPath === '/learn') {
    pageContent = <LearnPage />;
  } else if (currentPath === '/downloads') {
    pageContent = <DownloadsPage />;
  } else if (currentPath === '/pricing' || currentPath === '/billing') {
    pageContent = <PricingPage />;
  } else if (currentPath === '/help') {
    pageContent = <HelpPage />;
  } else if (currentPath === '/settings') {
    pageContent = <SettingsPage />;
  } else {
    pageContent = (
      <Dashboard
        user={user}
        onLogout={handleLogout}
        addToast={addToast}
        settings={settings}
        onSettingsSave={setSettings}
        wsLogs={wsLogs}
        sendWsMessage={sendWsMessage}
      />
    );
  }

  return (
    <GlobalContext.Provider value={contextValue}>
      <div className="bg-glow bg-glow-1" />
      <div className="bg-glow bg-glow-2" />
      <div className="bg-glow bg-glow-3" />
      
      {pageContent}

      <ToastContainer toasts={toasts} />
    </GlobalContext.Provider>
  );
}
