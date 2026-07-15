// hooks/useToast.js — Toast notification system

import { useState, useCallback, useRef } from 'react';

export function useToast() {
  const [toasts, setToasts] = useState([]);
  const idCounter = useRef(0);

  const addToast = useCallback((message, type = 'info') => {
    const id = ++idCounter.current;
    setToasts(prev => [...prev, { id, message, type, hiding: false }]);

    // Auto-remove after 4s
    setTimeout(() => {
      setToasts(prev =>
        prev.map(t => t.id === id ? { ...t, hiding: true } : t)
      );
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 300);
    }, 4000);
  }, []);

  return { toasts, addToast };
}
