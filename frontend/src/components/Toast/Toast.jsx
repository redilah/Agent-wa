// components/Toast/Toast.jsx

import './Toast.css';

export function ToastContainer({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type} ${t.hiding ? 'hiding' : ''}`}>
          <span className="google-symbols notranslate">
            {t.type === 'success' ? 'check_circle' :
             t.type === 'error'   ? 'error' :
             t.type === 'warning' ? 'warning' : 'info'}
          </span>
          {t.message}
        </div>
      ))}
    </div>
  );
}
