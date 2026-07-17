// panels/OverviewPanel/OverviewPanel.jsx

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './OverviewPanel.css';

const METRICS = [
  { icon: 'chat', labelKey: 'activeChats',       value: '1',     subKey: 'plusTwoToday',         id: 'metric-active-chats' },
  { icon: 'check_circle', labelKey: 'apiSuccessRate', value: '98.7%', subKey: 'last24Hours' },
  { icon: 'timer', labelKey: 'avgResponseTime', value: '1.2s',  subKey: 'geminiPro' },
  { icon: 'data_usage', labelKey: 'modelCallCount',  value: '247',   subKey: 'thisSession' },
];

const HEALTH_ITEMS = [
  { name: 'WA Webhook',       status: 'NOMINAL', color: 'green', icon: 'link' },
  { name: 'Gemini AI Engine', status: 'NOMINAL', color: 'green', icon: 'auto_awesome' },
  { name: 'SQLite Database',  status: 'NOMINAL', color: 'green', icon: 'database' },
  { name: 'WebSocket Feed',   status: 'LIVE',    color: 'blue',  icon: 'rss_feed' },
];

export function OverviewPanel({ logs }) {
  const { t } = useTranslation();
  const [timeframe, setTimeframe] = useState('24H');

  // Build mini log dari recent WS events
  const recentLogs = (logs || []).slice(-5).reverse();

  return (
    <div>
      {/* Metric Cards */}
      <div className="metrics-grid">
        {METRICS.map(m => (
          <div key={m.labelKey} className="metric-card glass" id={m.id}>
            <div className="metric-icon">
              <span className="google-symbols notranslate">{m.icon}</span>
            </div>
            <div>
              <div className="metric-label">{t(m.labelKey)}</div>
              <div className="metric-value">{m.value}</div>
              <div className="metric-sub">{t(m.subKey)}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Health */}
      <div className="panel-row-2">
        {/* Sparkline Chart */}
        <div className="panel-card">
          <div className="panel-card-header">
            <div className="chart-header-row">
              <div className="panel-icon-circle">
                <span className="google-symbols notranslate">timeline</span>
              </div>
              <div className="panel-title-block">
                <h2 className="panel-title-text">{t('conversationsTraffic')}</h2>
                <p className="panel-desc-text">{t('conversationsTrafficDesc')}</p>
              </div>
              <div className="chart-timeframes">
                {['1H','24H','7D'].map(tVal => (
                  <button
                    key={tVal}
                    className={`btn-time ${timeframe === tVal ? 'active' : ''}`}
                    onClick={() => setTimeframe(tVal)}
                  >{tVal}</button>
                ))}
              </div>
            </div>
          </div>
          <svg className="sparkline-large" viewBox="0 0 400 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent-emerald)" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="var(--accent-emerald)" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path d="M0,90 C30,80 60,50 100,55 C140,60 160,30 200,25 C240,20 270,50 310,40 C350,30 380,20 400,15"
                  fill="none" stroke="var(--accent-emerald)" strokeWidth="2.5" />
            <path d="M0,90 C30,80 60,50 100,55 C140,60 160,30 200,25 C240,20 270,50 310,40 C350,30 380,20 400,15 L400,120 L0,120 Z"
                  fill="url(#sparkGrad)" />
            <circle cx="200" cy="25" r="4" fill="var(--accent-emerald)" className="pulse-glow-dot" />
          </svg>
        </div>

        {/* Health List */}
        <div className="panel-card">
          <div className="panel-card-header">
            <div className="panel-icon-circle">
              <span className="google-symbols notranslate">health_and_safety</span>
            </div>
            <div className="panel-title-block">
              <h2 className="panel-title-text">{t('orchestratorHealth')}</h2>
              <p className="panel-desc-text">{t('orchestratorHealthDesc')}</p>
            </div>
          </div>
          
          <div className="panel-body-content health-list">
            {HEALTH_ITEMS.map(h => (
              <div key={h.name} className="health-item">
                <div className="health-item-left">
                  <div className="panel-item-icon-box">
                    <span className="google-symbols notranslate">{h.icon}</span>
                  </div>
                  <span className="health-item-name">{h.name}</span>
                </div>
                <span className={`badge ${h.color}`}>{h.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mini Console */}
      <div className="mini-console">
        <div className="mini-console-title">{t('liveEventStream')}</div>
        <div className="mini-console-log">
          {recentLogs.length === 0
            ? <span className="term-info">{t('waitingForEvents')}</span>
            : recentLogs.map((log, i) => (
                <div key={i}><span className={`term-${log.level || 'info'}`}>{log.text}</span></div>
              ))
          }
        </div>
      </div>
    </div>
  );
}
