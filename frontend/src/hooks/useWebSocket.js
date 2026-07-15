// hooks/useWebSocket.js — Custom hook untuk koneksi WebSocket real-time

import { useEffect, useRef, useCallback } from 'react';

export function useWebSocket(onMessage) {
  const wsRef = useRef(null);
  const reconnectTimer = useRef(null);
  const onMessageRef = useRef(onMessage);
  onMessageRef.current = onMessage;

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    const wsUrl = `ws://${window.location.host}/ws`;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('[WS] Connected to ws://' + window.location.host + '/ws');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessageRef.current?.(data);
      } catch {
        // ignore non-JSON
      }
    };

    ws.onclose = () => {
      console.warn('[WS] Disconnected. Reconnecting in 5s...');
      reconnectTimer.current = setTimeout(connect, 5000);
    };

    ws.onerror = (err) => {
      console.error('[WS] Error:', err);
    };
  }, []);

  const sendMessage = useCallback((data) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
      return true;
    }
    return false;
  }, []);

  useEffect(() => {
    connect();
    return () => {
      clearTimeout(reconnectTimer.current);
      wsRef.current?.close();
    };
  }, [connect]);

  return { sendMessage };
}
