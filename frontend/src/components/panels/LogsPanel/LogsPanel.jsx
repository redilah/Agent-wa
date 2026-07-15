// panels/LogsPanel/LogsPanel.jsx

import { useState, useRef, useEffect } from 'react';
import './LogsPanel.css';

const LEVELS = ['ALL', 'INFO', 'SUCCESS', 'ERROR', 'WARN'];

function escapeHTML(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

export function LogsPanel({ logs }) {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const consoleRef = useRef(null);

  useEffect(() => {
    consoleRef.current?.scrollTo({ top: 99999, behavior: 'smooth' });
  }, [logs]);

  const filteredLogs = (logs || []).filter(log => {
    const logLvl = (log.level === 'warning' || log.level === 'warn') ? 'WARN' : (log.level || 'INFO').toUpperCase();
    const matchLevel = filter === 'ALL' || logLvl === filter;
    const matchSearch = !search || log.text?.toLowerCase().includes(search.toLowerCase());
    return matchLevel && matchSearch;
  });

  const exportLogs = () => {
    const content = filteredLogs
      .map(l => `[${l.ts}] [${l.level?.toUpperCase() || 'INFO'}] ${l.text}`)
      .join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `regalia_logs_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="logs-layout-container">
      <div className="logs-console glass">
        {/* Header */}
        <div className="logs-header-bar">
          <div className="logs-filter-btns">
            {LEVELS.map(l => (
              <button
                key={l}
                className={`btn-filter ${filter === l ? 'active' : ''}`}
                onClick={() => setFilter(l)}
              >{l}</button>
            ))}
          </div>
          <div className="logs-actions">
            <div className="search-input-wrap">
              <span className="google-symbols notranslate">search</span>
              <input
                id="log-search-input"
                type="text"
                placeholder="Search logs..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <button className="btn-secondary" onClick={exportLogs}>
              <span className="google-symbols notranslate">download</span>
              Export
            </button>
            <button className="btn-icon-glass" onClick={() => setSearch('')} title="Clear filter">
              <span className="google-symbols notranslate">delete_sweep</span>
            </button>
          </div>
        </div>

        {/* Log Body */}
        <div className="logs-console-window" id="logs-console-window" ref={consoleRef}>
          {filteredLogs.length === 0 ? (
            <div className="term-info">[system] No events yet. Waiting for activity...</div>
          ) : (
            filteredLogs.map((log, i) => (
              <div key={i} className={`term-${log.level || 'info'}`}>
                <span className="log-ts">[{log.ts}]</span>{' '}
                <span className="log-level">[{(log.level || 'INFO').toUpperCase()}]</span>{' '}
                <span dangerouslySetInnerHTML={{ __html: escapeHTML(log.text) }} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
