// components/Sidebar/Sidebar.jsx

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGlobalContext } from '../../App';
import './Sidebar.css';

const NAV_ITEMS = [
  { id: 'overview',   icon: 'dashboard',    labelKey: 'overview' },
  { id: 'config',     icon: 'tune',         labelKey: 'agentConfig' },
  { id: 'sandbox',    icon: 'terminal',     labelKey: 'interactiveSandbox' },
  { id: 'analytics',  icon: 'trending_up',  labelKey: 'analytics' },
  { id: 'logs',       icon: 'article',      labelKey: 'systemLogs' },
];

export function Sidebar({ activePanel, onPanelChange, user, onLogout }) {
  const { navigate, language, changeLanguage } = useGlobalContext();
  const { t } = useTranslation();

  const [collapsed, setCollapsed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  

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
                {!collapsed && <span className="nav-label">{t(item.labelKey)}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <button 
          className="user-profile-btn" 
          onClick={() => { setIsDropdownOpen(!isDropdownOpen); setActiveSubMenu(null); }}
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
            <div className="dropdown-item" onClick={() => { navigate('/settings'); setIsDropdownOpen(false); }}>
              <span className="google-symbols notranslate dropdown-icon">settings</span>
              {t('settings')}
            </div>
            
            {/* Language item with submenu */}
            <div 
              className="dropdown-item has-submenu" 
              onMouseEnter={() => setActiveSubMenu('language')}
              onMouseLeave={() => setActiveSubMenu(null)}
            >
              <div className="submenu-trigger">
                <span className="google-symbols notranslate dropdown-icon">language</span>
                <span style={{flex: 1}}>{t('language')}</span>
                <span className="google-symbols notranslate chevron">chevron_right</span>
              </div>
              
              {activeSubMenu === 'language' && (
                <div className="submenu-dropdown">
                  {[
                    { id: 'en', label: 'English' },
                    { id: 'id', label: 'Indonesia' },
                    { id: 'de', label: 'Deutsch' },
                    { id: 'fr', label: 'Français' },
                    { id: 'it', label: 'Italiano' },
                    { id: 'es', label: 'Español' },
                    { id: 'pt', label: 'Português' },
                    { id: 'ko', label: 'Korea' },
                    { id: 'hi', label: 'Hindi' },
                    { id: 'ja', label: 'Japanese' },
                  ].map(lang => (
                    <div 
                      key={lang.id} 
                      className="dropdown-item language-item" 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        changeLanguage(lang.id);
                        setTimeout(() => setIsDropdownOpen(false), 200);
                      }}
                    >
                      <span>{lang.label}</span>
                      {language === lang.id && (
                        <span className="google-symbols notranslate check-icon text-blue-500">check</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="dropdown-item" onClick={() => { navigate('/help'); setIsDropdownOpen(false); }}>
              <span className="google-symbols notranslate dropdown-icon">help</span>
              {t('getHelp')}
            </div>
            <div className="dropdown-divider"></div>
            <div className="dropdown-item" onClick={() => { navigate('/pricing'); setIsDropdownOpen(false); }}>
              <span className="google-symbols notranslate dropdown-icon">upgrade</span>
              {t('upgradePlan')}
            </div>

            <div className="dropdown-item" onClick={() => { navigate('/learn'); setIsDropdownOpen(false); }}>
              <span className="google-symbols notranslate dropdown-icon">info</span>
              {t('learnMore')}
            </div>
            <div className="dropdown-divider"></div>
            <div className="dropdown-item dropdown-item-danger" onClick={onLogout}>
              <span className="google-symbols notranslate dropdown-icon">logout</span>
              {t('logout')}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
