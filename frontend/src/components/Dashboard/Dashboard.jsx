// components/Dashboard/Dashboard.jsx

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useGlobalContext } from '../../App';
import { Sidebar } from '../Sidebar/Sidebar';
import { OverviewPanel }   from '../panels/OverviewPanel/OverviewPanel';
import { ConfigPanel }     from '../panels/ConfigPanel/ConfigPanel';
import { SandboxPanel }    from '../panels/SandboxPanel/SandboxPanel';
import { AnalyticsPanel }  from '../panels/AnalyticsPanel/AnalyticsPanel';
import { LogsPanel }       from '../panels/LogsPanel/LogsPanel';
import { PanelSkeleton }   from './PanelSkeleton';
import './Dashboard.css';

const PANEL_META = {
  overview:  { titleKey: 'systemOverviewTitle',        subtitleKey: 'systemOverviewSub' },
  config:    { titleKey: 'agentConfigTitle',    subtitleKey: 'agentConfigSub' },
  sandbox:   { titleKey: 'interactiveSandboxTitle',    subtitleKey: 'interactiveSandboxSub' },
  analytics: { titleKey: 'analyticsCostsTitle',      subtitleKey: 'analyticsCostsSub' },
  logs:      { titleKey: 'systemEventLogsTitle',      subtitleKey: 'systemEventLogsSub' },
};

const SKELETON_DURATION = 500; // ms to show skeleton before revealing panel

export function Dashboard({
  user, onLogout, addToast,
  settings, onSettingsSave,
  wsLogs, sendWsMessage,
}) {
  const { t } = useTranslation();
  const { isDark, toggleTheme } = useGlobalContext();
  const [activePanel, setActivePanel] = useState('overview');
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
            <h1 className="header-title">{t(meta.titleKey)}</h1>
            <p className="header-subtitle">{t(meta.subtitleKey)}</p>
          </div>
          <div className="header-actions">
            <div className="connection-status">
              <span className="pulse-indicator green"></span>
              {t('wsLive')}
            </div>
            <button className="btn-icon-glass" onClick={() => addToast(t('refreshingData'), 'info')} title="Refresh">
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
