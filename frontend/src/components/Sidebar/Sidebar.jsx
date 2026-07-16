// components/Sidebar/Sidebar.jsx

import { useState } from 'react';
import './Sidebar.css';

const NAV_ITEMS = [
  { id: 'overview',   icon: 'dashboard',    label: 'Overview' },
  { id: 'config',     icon: 'tune',         label: 'Agent Config' },
  { id: 'sandbox',    icon: 'terminal',     label: 'Interactive Sandbox' },
  { id: 'analytics',  icon: 'trending_up',  label: 'Analytics' },
  { id: 'logs',       icon: 'article',      label: 'System Logs' },
];

export function Sidebar({ activePanel, onPanelChange, user, onLogout }) {
  const [collapsed, setCollapsed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <aside className={`sidebar glass ${collapsed ? 'collapsed' : ''}`}>
      {/* Brand */}
      <div className="sidebar-brand">
        {!collapsed && <div className="brand-name">Regalia</div>}
        <button
          className="sidebar-toggle-btn"
          onClick={() => setCollapsed(prev => !prev)}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <span className="google-symbols notranslate">
            side_navigation
          </span>
        </button>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        <ul>
          {NAV_ITEMS.map(item => (
            <li key={item.id}>
              <button
                className={`nav-item ${activePanel === item.id ? 'active' : ''}`}
                onClick={() => onPanelChange(item.id)}
                title={collapsed ? item.label : undefined}
              >
                <span className="nav-icon google-symbols notranslate">{item.icon}</span>
                {!collapsed && <span className="nav-label">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <button 
          className="user-profile-btn" 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          title={collapsed ? 'Profile options' : undefined}
        >
          <div className="user-profile-content">
            <div className="user-avatar">
              {user?.picture
                ? <img src={user.picture} alt={user.name} referrerPolicy="no-referrer" />
                : initials
              }
            </div>
            {!collapsed && (
              <div className="user-info">
                <div className="user-name">{user?.name || 'User'}</div>
                <div className="user-subtitle">Paket gratis</div>
              </div>
            )}
          </div>
          {!collapsed && (
            <span className="google-symbols notranslate unfold-icon">unfold_more</span>
          )}
        </button>

        {isDropdownOpen && (
          <div className="profile-dropdown">
            <div className="dropdown-item">
              <span className="google-symbols notranslate dropdown-icon">settings</span>
              Pengaturan
            </div>
            <div className="dropdown-item">
              <span className="google-symbols notranslate dropdown-icon">language</span>
              Bahasa
            </div>
            <div className="dropdown-item">
              <span className="google-symbols notranslate dropdown-icon">help</span>
              Dapatkan bantuan
            </div>
            <div className="dropdown-divider"></div>
            <div className="dropdown-item">
              <span className="google-symbols notranslate dropdown-icon">upgrade</span>
              Tingkatkan paket
            </div>
            <div className="dropdown-item">
              <span className="google-symbols notranslate dropdown-icon">extension</span>
              Dapatkan aplikasi dan ekstensi
            </div>
            <div className="dropdown-item">
              <span className="google-symbols notranslate dropdown-icon">info</span>
              Pelajari lebih lanjut
            </div>
            <div className="dropdown-divider"></div>
            <div className="dropdown-item dropdown-item-danger" onClick={onLogout}>
              <span className="google-symbols notranslate dropdown-icon">logout</span>
              Keluar
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
