// panels/SandboxPanel/SandboxPanel.jsx

import { useState, useRef, useEffect } from 'react';
import { simulateChat } from '../../../api/client';
import './SandboxPanel.css';

function escapeHTML(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/'/g,'&#39;').replace(/"/g,'&quot;');
}

const PRESETS = [
  { type: 'slang',     icon: 'chat_bubble', tag: 'SLANG',    text: 'halo gan, ready ga barangnya? sabi kali diskon dikit...' },
  { type: 'javanese',  icon: 'translate',   tag: 'JAVANESE', text: 'Kirim dhateng Surabaya pinten nggih ongkiripun?' },
  { type: 'complaint', icon: 'warning',     tag: 'ANGER',    text: 'WOI! Barang saya pecah nih! Tanggung jawab dong!' },
];

export function SandboxPanel({ addToast, sendWsMessage, wsLogs, settings }) {
  const [customMsg, setCustomMsg] = useState('');
  const [latency, setLatency] = useState(1.2);
  const [chatBubbles, setChatBubbles] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [termLogs, setTermLogs] = useState([
    { text: '[system] Terminal initialized. Ready for input.', level: 'info', ts: new Date().toLocaleTimeString() }
  ]);
  const [waInput, setWaInput] = useState('');
  const chatBoxRef = useRef(null);
  const termRef = useRef(null);

  // Listen WS events
  useEffect(() => {
    if (!wsLogs || wsLogs.length === 0) return;
    const last = wsLogs[wsLogs.length - 1];
    if (!last) return;

    if (last.raw?.type === 'ai_processing') {
      setIsTyping(true);
      addTermLog('[AI] Processing response...', 'info');
    }
    if (last.raw?.type === 'ai_reply') {
      setIsTyping(false);
      setChatBubbles(prev => [...prev, { sender: 'agent', text: last.raw.text, ts: new Date().toLocaleTimeString() }]);
      addTermLog(`[AI] Reply: ${last.raw.text.slice(0, 60)}...`, 'success');
    }
    if (last.raw?.type === 'anger_detected') {
      addTermLog(`[EMOTION ENGINE] Anger detected! Voucher: ${last.raw.voucher_code}`, 'warning');
    }
    if (last.raw?.type === 'tool_execution') {
      addTermLog(`[TOOL RUNNER] ${last.raw.tool}: ${JSON.stringify(last.raw.args || {})}`, 'success');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wsLogs]);

  // Auto-scroll
  useEffect(() => { chatBoxRef.current?.scrollTo({ top: 99999, behavior: 'smooth' }); }, [chatBubbles, isTyping]);
  useEffect(() => { termRef.current?.scrollTo({ top: 99999, behavior: 'smooth' }); }, [termLogs]);

  const addTermLog = (text, level = 'info') => {
    setTermLogs(prev => [...prev, { text, level, ts: new Date().toLocaleTimeString() }]);
  };

  const sendMessage = async (msg) => {
    if (!msg.trim()) return;
    const text = msg.trim();

    setChatBubbles(prev => [...prev, { sender: 'customer', text, ts: new Date().toLocaleTimeString() }]);
    addTermLog(`[IN] ${text} (Latency set: ${latency}s)`, 'info');

    // Try WebSocket first
    const sent = sendWsMessage({ type: 'chat', text });
    if (!sent) {
      // Fallback to HTTP
      try {
        setIsTyping(true);
        // Simulasi visual latency slider sebelum hit API
        await new Promise(resolve => setTimeout(resolve, latency * 1000));
        await simulateChat(text);
      } catch (e) {
        setIsTyping(false);
        setChatBubbles(prev => [...prev, { sender: 'agent', text: `Error: ${e.message}`, ts: new Date().toLocaleTimeString() }]);
        addTermLog(`[ERROR] ${e.message}`, 'error');
        addToast(`Gagal mengirim pesan: ${e.message}`, 'error');
      }
    }
  };

  const handleSendCustom = async () => {
    if (!customMsg.trim()) return;
    await sendMessage(customMsg);
    setCustomMsg('');
  };

  const handleWaKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage(waInput);
      setWaInput('');
    }
  };

  const agentName = settings?.nama_bisnis || 'Regalia AI';

  return (
    <div className="sandbox-layout">
      {/* Left: Controls */}
      <div className="sandbox-controls glass">
        <div className="sandbox-section-title">Preset Messages</div>
        {PRESETS.map(p => (
          <button
            key={p.type}
            className="btn-preset emerald-glow-box"
            onClick={() => setCustomMsg(p.text)}
          >
            <div className="preset-header">
              <span className="google-symbols notranslate">{p.icon}</span>
              <span className={`preset-tag ${p.type}`}>{p.tag}</span>
            </div>
            <div className="preset-text">{p.text}</div>
          </button>
        ))}

        <div className="sandbox-divider" />

        <div className="sandbox-section-title">Custom Inject</div>
        <textarea
          id="custom-input-message"
          className="custom-input"
          rows={3}
          placeholder="Ketik pesan kustom..."
          value={customMsg}
          onChange={e => setCustomMsg(e.target.value)}
        />

        <div className="latency-row">
          <label className="latency-label">Delay: <strong>{latency}s</strong></label>
          <input
            id="latency-val"
            type="range"
            min="0.5" max="4.0" step="0.1"
            value={latency}
            onChange={e => setLatency(Number(e.target.value))}
          />
        </div>

        <button className="btn-primary glow-button" style={{width:'100%'}} onClick={handleSendCustom}>
          <span className="google-symbols notranslate">send</span>
          Inject Message
        </button>
      </div>

      {/* Right: WhatsApp + Terminal */}
      <div className="sandbox-displays">
        {/* WA Mockup */}
        <div className="wa-mockup glass">
          <div className="wa-header">
            <div className="wa-avatar-ring">
              <div className="wa-avatar">
                <span className="google-symbols notranslate" style={{color:'#fff',fontSize:16}}>smart_toy</span>
              </div>
            </div>
            <div className="wa-header-info">
              <div className="wa-name" id="wa-name">{agentName}</div>
              <div className="wa-typing-status" id="wa-typing-status">
                {isTyping ? 'typing...' : 'online'}
              </div>
            </div>
            <div className="wa-header-actions">
              {['videocam','call','more_vert'].map(icon => (
                <button key={icon} className="wa-icon-btn">
                  <span className="google-symbols notranslate">{icon}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="wa-chat-body" id="chat-box" ref={chatBoxRef}>
            <div className="wa-system-time">Today, {new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</div>

            {chatBubbles.map((b, i) => (
              <div key={i} className={`wa-bubble ${b.sender}`}>
                <div dangerouslySetInnerHTML={{__html: escapeHTML(b.text)}} />
                <div className="bubble-time">{b.ts}</div>
              </div>
            ))}

            {isTyping && (
              <div className="typing-indicator-bubble" id="typing-indicator">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            )}
          </div>

          <div className="wa-footer">
            <button className="wa-icon-btn"><span className="google-symbols notranslate">sentiment_satisfied</span></button>
            <button className="wa-icon-btn"><span className="google-symbols notranslate">attach_file</span></button>
            <input
              id="wa-user-typing-field"
              className="wa-type-input"
              type="text"
              placeholder="Type a message"
              value={waInput}
              onChange={e => setWaInput(e.target.value)}
              onKeyDown={handleWaKeyDown}
            />
            <button className="btn-wa-send" onClick={() => { sendMessage(waInput); setWaInput(''); }}>
              <span className="google-symbols notranslate">send</span>
            </button>
          </div>
        </div>

        {/* API Terminal */}
        <div className="api-terminal glass">
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="dot-red"></span>
              <span className="dot-yellow"></span>
              <span className="dot-green"></span>
            </div>
            <span className="terminal-title">API Terminal</span>
            <button className="btn-icon-glass" onClick={() => setTermLogs([{text:'[system] Terminal cleared.', level:'info', ts: new Date().toLocaleTimeString()}])} title="Clear">
              <span className="google-symbols notranslate">delete_sweep</span>
            </button>
          </div>
          <div className="terminal-body" id="terminal-logs" ref={termRef}>
            {termLogs.map((log, i) => (
              <div key={i} className={`term-${log.level}`}>
                <span className="term-ts">[{log.ts}] </span>{log.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
