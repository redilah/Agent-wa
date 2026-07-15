// panels/AnalyticsPanel/AnalyticsPanel.jsx

import './AnalyticsPanel.css';

const TABLE_DATA = [
  { tool: 'cek_ongkir',           requests: 142, success: '99.3%', latency: '1.2s', fallbacks: 1 },
  { tool: 'translate_krama',       requests: 87,  success: '97.7%', latency: '0.8s', fallbacks: 2 },
  { tool: 'slang_matcher',         requests: 203, success: '98.5%', latency: '0.5s', fallbacks: 3 },
  { tool: 'deescalate_complaint',  requests: 34,  success: '94.1%', latency: '1.8s', fallbacks: 2 },
];

export function AnalyticsPanel() {
  return (
    <div className="analytics-layout">
      <div className="analytics-top-row">
        {/* Radial Chart */}
        <div className="analytics-box glass">
          <div className="analytics-box-title">Classification Accuracy</div>
          <div className="radial-center">
            <svg className="radial-progress-svg" viewBox="0 0 120 120" width="120" height="120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--card-border)" strokeWidth="12"/>
              <circle
                cx="60" cy="60" r="50"
                fill="none"
                stroke="var(--accent-emerald)"
                strokeWidth="12"
                strokeDasharray="314"
                strokeDashoffset="24"
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
                style={{ transition: 'stroke-dashoffset 1s ease' }}
              />
              <text x="60" y="60" textAnchor="middle" dy="0.35em"
                    fill="var(--text-primary)" fontSize="18" fontWeight="700">95.2%</text>
            </svg>
          </div>
          <div className="radial-label">Intent Detection Score</div>
        </div>

        {/* Bar Chart */}
        <div className="analytics-box glass">
          <div className="analytics-box-title">Customer Sentiment</div>
          <div className="bar-chart-vertical">
            {[
              { label: 'Satisfied', value: 72, color: 'var(--color-success)' },
              { label: 'Neutral',   value: 18, color: 'var(--color-info)' },
              { label: 'Angry',     value: 10, color: 'var(--color-danger)' },
            ].map(b => (
              <div key={b.label} className="bar-group">
                <div className="bar-wrapper">
                  <div
                    className="bar-fill"
                    style={{ height: `${b.value}%`, background: b.color }}
                  ></div>
                </div>
                <div className="bar-label">{b.label}</div>
                <div className="bar-value">{b.value}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Card */}
        <div className="analytics-box glass">
          <div className="analytics-box-title">Cost Optimization</div>
          <div className="cost-metric">
            <div className="cost-label">LLM Monthly Estimate</div>
            <div className="cost-value">$12.40</div>
            <div className="cost-sub term-success">↓ 18% vs last month</div>
          </div>
          <div style={{height:8}}/>
          <div className="cost-metric">
            <div className="cost-label">Tokens Used Today</div>
            <div className="cost-value">84,203</div>
            <div className="cost-sub term-info">Gemini 1.5 Pro</div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="analytics-table-wrap glass">
        <div className="table-header">
          <span className="analytics-box-title">Engine Trigger Frequency</span>
          <button className="btn-secondary">
            <span className="google-symbols notranslate">download</span>
            Export CSV
          </button>
        </div>
        <table className="analytics-table">
          <thead>
            <tr>
              <th>Tool Name</th>
              <th>Requests</th>
              <th>Success Rate</th>
              <th>Avg Latency</th>
              <th>Fallbacks</th>
            </tr>
          </thead>
          <tbody>
            {TABLE_DATA.map(row => (
              <tr key={row.tool}>
                <td><span className="tool-name">{row.tool}</span></td>
                <td>{row.requests}</td>
                <td><span className="term-success">{row.success}</span></td>
                <td>{row.latency}</td>
                <td>{row.fallbacks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
