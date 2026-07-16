// components/Dashboard/Dashboard.jsx

import { useState, useEffect, useRef } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import { OverviewPanel }   from '../panels/OverviewPanel/OverviewPanel';
import { ConfigPanel }     from '../panels/ConfigPanel/ConfigPanel';
import { SandboxPanel }    from '../panels/SandboxPanel/SandboxPanel';
import { AnalyticsPanel }  from '../panels/AnalyticsPanel/AnalyticsPanel';
import { LogsPanel }       from '../panels/LogsPanel/LogsPanel';
import { PanelSkeleton }   from './PanelSkeleton';
import './Dashboard.css';

const PANEL_META = {
  overview:  { title: 'System Overview',        subtitle: 'Real-time orchestration monitoring & performance metrics' },
  config:    { title: 'Agent Configuration',    subtitle: 'LLM parameters, knowledge base & feature toggles' },
  sandbox:   { title: 'Interactive Sandbox',    subtitle: 'Simulate customer interactions & test AI responses' },
  analytics: { title: 'Analytics & Costs',      subtitle: 'Usage statistics, cost analysis & performance insights' },
  logs:      { title: 'System Event Logs',      subtitle: 'Real-time diagnostic feed & event timeline' },
};

const SKELETON_DURATION = 500; // ms to show skeleton before revealing panel

export function Dashboard({
  user, onLogout, addToast,
  settings, onSettingsSave,
  wsLogs, sendWsMessage,
}) {
  const [activePanel, setActivePanel] = useState('overview');
  const [isDark, setIsDark] = useState(true); // default dark
  const [isLoading, setIsLoading] = useState(false);
  const [displayPanel, setDisplayPanel] = useState('overview');
  const timerRef = useRef(null);

  const handlePanelChange = (panelId) => {
    if (panelId === activePanel) return;

    // Start skeleton
    setIsLoading(true);
    setActivePanel(panelId);

    // Clear any existing timer
    if (timerRef.current) clearTimeout(timerRef.current);

    // After delay, reveal the real panel
    timerRef.current = setTimeout(() => {
      setDisplayPanel(panelId);
      setIsLoading(false);
    }, SKELETON_DURATION);
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev;
      document.body.classList.toggle('dark-theme', next);
      return next;
    });
  };

  const meta = PANEL_META[activePanel];

  return (
    <div className="dashboard-container" id="main-dashboard">
      <Sidebar
        activePanel={activePanel}
        onPanelChange={handlePanelChange}
        user={user}
        onLogout={onLogout}
      />

      <main className="main-content">
        <header className="main-header glass">
          <div className="header-left">
            <h1 className="header-title">{meta.title}</h1>
            <p className="header-subtitle">{meta.subtitle}</p>
          </div>
          <div className="header-actions">
            <div className="connection-status">
              <span className="pulse-indicator green"></span>
              WS LIVE
            </div>
            <button className="btn-icon-glass" onClick={toggleTheme} title="Toggle Theme">
              <span className="google-symbols notranslate">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            <button className="btn-icon-glass" onClick={() => addToast('Refreshing data...', 'info')} title="Refresh">
              <span className="google-symbols notranslate">refresh</span>
            </button>
          </div>
        </header>

        <div className="panel-viewport">
          {isLoading ? (
            <PanelSkeleton panelId={activePanel} />
          ) : (
            <div className="panel-fade-in" key={displayPanel}>
              {displayPanel === 'overview'  && <OverviewPanel logs={wsLogs} />}
              {displayPanel === 'config'    && <ConfigPanel settings={settings} onSave={onSettingsSave} addToast={addToast} />}
              {displayPanel === 'sandbox'   && <SandboxPanel addToast={addToast} sendWsMessage={sendWsMessage} wsLogs={wsLogs} settings={settings} />}
              {displayPanel === 'analytics' && <AnalyticsPanel />}
              {displayPanel === 'logs'      && <LogsPanel logs={wsLogs} />}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
