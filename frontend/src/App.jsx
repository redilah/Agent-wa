// App.jsx — Root component, mengelola auth state dan WebSocket

import { useState, useCallback, useEffect } from 'react';
import { LoginPage }  from './components/LoginPage/LoginPage';
import { Dashboard }  from './components/Dashboard/Dashboard';
import { ToastContainer } from './components/Toast/Toast';
import { PrivacyPolicyPage }  from './components/Legal/PrivacyPolicyPage';
import { TermsOfServicePage } from './components/Legal/TermsOfServicePage';
import { useWebSocket } from './hooks/useWebSocket';
import { useToast }     from './hooks/useToast';
import { getSettings }  from './api/client';

function escapeHTML(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

export default function App() {
  const [user, setUser]         = useState(null);   // null = belum login
  const [settings, setSettings] = useState(null);
  const [wsLogs, setWsLogs]     = useState([]);

  // Default to dark theme on initial load
  useEffect(() => {
    document.body.classList.add('dark-theme');
  }, []);

  const { toasts, addToast } = useToast();

  // Handle incoming WebSocket events
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
      case 'ai_processing':
        logEntry = { raw: data, ts, level: 'info', text: '[ai_processing] Processing response...' };
        break;
      case 'ai_reply':
        logEntry = { raw: data, ts, level: 'success', text: `[ai_reply] ${escapeHTML(data.text?.slice(0,80))}...` };
        break;
      case 'anger_detected':
        logEntry = { raw: data, ts, level: 'warn', text: `[anger_detected] Voucher: ${data.voucher_code}` };
        addToast(`Anger detected! Voucher: ${data.voucher_code}`, 'warning');
        break;
      case 'tool_execution':
        logEntry = { raw: data, ts, level: 'success', text: `[tool] ${data.tool}: ${JSON.stringify(data.args || {})}` };
        addToast(`Tool executed: ${data.tool}`, 'success');
        break;
      default:
        logEntry = { raw: data, ts, level: 'info', text: `[ws] ${JSON.stringify(data)}` };
    }

    if (logEntry) {
      setWsLogs(prev => [...prev.slice(-200), logEntry]); // keep last 200
    }
  }, [addToast]);

  const { sendMessage: sendWsMessage } = useWebSocket(handleWsMessage);

  // Load settings when user logs in
  useEffect(() => {
    if (user) {
      getSettings()
        .then(setSettings)
        .catch(() => addToast('Gagal memuat settings dari server', 'error'));
    }
  }, [user, addToast]);

  const handleLogin = (profile) => {
    setUser(profile);
  };

  const handleLogout = () => {
    setUser(null);
    setSettings(null);
    setWsLogs([]);
  };

  // Check URL pathname for standalone Legal Document pages
  const pathname = window.location.pathname;
  if (pathname === '/privacy' || pathname === '/privacy-policy') {
    return <PrivacyPolicyPage />;
  }
  if (pathname === '/terms' || pathname === '/terms-of-service') {
    return <TermsOfServicePage />;
  }

  return (
    <>
      {/* Background ambient glow */}
      <div className="bg-glow bg-glow-1" />
      <div className="bg-glow bg-glow-2" />
      <div className="bg-glow bg-glow-3" />

      {/* Login screen */}
      {!user && (
        <LoginPage onLogin={handleLogin} addToast={addToast} />
      )}

      {/* Dashboard */}
      {user && (
        <Dashboard
          user={user}
          onLogout={handleLogout}
          addToast={addToast}
          settings={settings}
          onSettingsSave={setSettings}
          wsLogs={wsLogs}
          sendWsMessage={sendWsMessage}
        />
      )}

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} />
    </>
  );
}
