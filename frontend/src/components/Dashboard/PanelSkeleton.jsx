// components/Dashboard/PanelSkeleton.jsx

import './PanelSkeleton.css';

/* ── Generic shimmer block ── */
function B({ className, style }) {
  return <div className={`skel-block ${className || ''}`} style={style} />;
}

/* ══════════════════════════════════════
   Overview — 4 stat cards + 2-col bottom
   ══════════════════════════════════════ */
function OverviewSkeleton() {
  return (
    <div className="panel-skeleton">
      <div className="skel-stat-grid">
        <B className="skel-stat-card" />
        <B className="skel-stat-card" />
        <B className="skel-stat-card" />
        <B className="skel-stat-card" />
      </div>
      <div className="skel-two-col">
        <B className="skel-tall-card" />
        <B className="skel-tall-card" />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   Config — form fields, toggles, save btn
   ══════════════════════════════════════ */
function ConfigSkeleton() {
  return (
    <div className="panel-skeleton">
      {/* Section title */}
      <B className="skel-section-title" />
      {/* Form rows */}
      <div className="skel-form-grid">
        <div className="skel-form-field">
          <B className="skel-label" />
          <B className="skel-input" />
        </div>
        <div className="skel-form-field">
          <B className="skel-label" />
          <B className="skel-input" />
        </div>
      </div>
      <B className="skel-section-title" style={{ width: '30%' }} />
      <div className="skel-form-field">
        <B className="skel-label" />
        <B className="skel-textarea" />
      </div>
      <B className="skel-section-title" style={{ width: '25%' }} />
      <div className="skel-toggle-rows">
        <B className="skel-toggle-row" />
        <B className="skel-toggle-row" />
        <B className="skel-toggle-row" />
      </div>
      <B className="skel-save-btn" />
    </div>
  );
}

/* ══════════════════════════════════════
   Sandbox — WA chat mockup + sidebar
   ══════════════════════════════════════ */
function SandboxSkeleton() {
  return (
    <div className="panel-skeleton">
      <div className="skel-sandbox-layout">
        {/* Phone mockup */}
        <div className="skel-phone">
          <B className="skel-phone-header" />
          <div className="skel-chat-area">
            <B className="skel-bubble skel-bubble-left" />
            <B className="skel-bubble skel-bubble-right" />
            <B className="skel-bubble skel-bubble-left skel-bubble-long" />
            <B className="skel-bubble skel-bubble-right" />
          </div>
          <B className="skel-chat-input" />
        </div>
        {/* Side info */}
        <div className="skel-sandbox-side">
          <B className="skel-side-card" />
          <B className="skel-side-card skel-side-card-short" />
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   Analytics — stat cards + charts + table
   ══════════════════════════════════════ */
function AnalyticsSkeleton() {
  return (
    <div className="panel-skeleton">
      <div className="skel-stat-grid">
        <B className="skel-stat-card" />
        <B className="skel-stat-card" />
        <B className="skel-stat-card" />
        <B className="skel-stat-card" />
      </div>
      <div className="skel-two-col">
        <B className="skel-chart-card" />
        <B className="skel-chart-card" />
      </div>
      <B className="skel-table-card" />
    </div>
  );
}

/* ══════════════════════════════════════
   Logs — toolbar + log entry rows
   ══════════════════════════════════════ */
function LogsSkeleton() {
  return (
    <div className="panel-skeleton">
      <B className="skel-toolbar" />
      <div className="skel-log-list">
        <B className="skel-log-row" />
        <B className="skel-log-row" />
        <B className="skel-log-row" />
        <B className="skel-log-row" />
        <B className="skel-log-row" />
        <B className="skel-log-row" />
        <B className="skel-log-row" />
        <B className="skel-log-row" />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   Exported wrapper — picks the right skeleton
   ══════════════════════════════════════ */
const SKELETON_MAP = {
  overview:  OverviewSkeleton,
  config:    ConfigSkeleton,
  sandbox:   SandboxSkeleton,
  analytics: AnalyticsSkeleton,
  logs:      LogsSkeleton,
};

export function PanelSkeleton({ panelId }) {
  const Comp = SKELETON_MAP[panelId] || OverviewSkeleton;
  return <Comp />;
}
