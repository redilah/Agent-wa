// components/Sidebar/Sidebar.jsx

import './Sidebar.css';

const NAV_ITEMS = [
  { id: 'overview',   icon: 'dashboard',    label: 'Overview' },
  { id: 'config',     icon: 'tune',         label: 'Agent Config' },
  { id: 'sandbox',    icon: 'terminal',     label: 'Interactive Sandbox' },
  { id: 'analytics',  icon: 'trending_up',  label: 'Analytics' },
  { id: 'logs',       icon: 'article',      label: 'System Logs' },
];

export function Sidebar({ activePanel, onPanelChange, user, onLogout }) {
  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <aside className="sidebar glass">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="brand-row">
          <div className="brand-icon">
            <span className="google-symbols notranslate">smart_toy</span>
          </div>
          <div>
            <div className="brand-name">Regalia Agent</div>
            <div className="brand-sub">WA SaaS Platform</div>
          </div>
        </div>
        <div className="agent-status-badge">
          <span className="pulse-dot"></span>
          AGENT ONLINE
        </div>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        <ul>
          {NAV_ITEMS.map(item => (
            <li key={item.id}>
              <button
                className={`nav-item ${activePanel === item.id ? 'active' : ''}`}
                onClick={() => onPanelChange(item.id)}
              >
                <span className="nav-glow"></span>
                <span className="google-symbols notranslate">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">
            {user?.picture
              ? <img src={user.picture} alt={user.name} referrerPolicy="no-referrer" />
              : initials
            }
          </div>
          <div className="user-info">
            <div className="user-name">{user?.name || 'User'}</div>
            <div className="user-email">{user?.email || ''}</div>
          </div>
        </div>
        <button className="btn-logout" onClick={onLogout}>
          <span className="google-symbols notranslate">logout</span>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
