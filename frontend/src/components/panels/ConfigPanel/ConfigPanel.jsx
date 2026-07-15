// panels/ConfigPanel/ConfigPanel.jsx

import { useState, useEffect } from 'react';
import { updateSettings } from '../../../api/client';
import './ConfigPanel.css';

const TOGGLES = [
  { id: 'toggle_slang',    label: 'Slang Engine',                   desc: 'Mendeteksi dan merespons bahasa gaul/slang' },
  { id: 'toggle_java',     label: 'Javanese Translation Router',    desc: 'Terjemahan otomatis bahasa Jawa krama' },
  { id: 'toggle_ongkir',   label: 'CekOngkir Tool Integration',    desc: 'Integrasi cek ongkos kirim real-time' },
  { id: 'toggle_anger',    label: 'Sentiment & Anger De-escalation', desc: 'Deteksi emosi dan de-eskalasi otomatis' },
  { id: 'toggle_fallback', label: 'Human Fallback Protocol',        desc: 'Eskalasi ke agen manusia jika diperlukan' },
];

export function ConfigPanel({ settings, onSave, addToast }) {
  const [form, setForm] = useState({
    nama_bisnis: '',
    model: 'Gemini 1.5 Pro',
    knowledge_base: '',
    toggle_slang: 1,
    toggle_java: 1,
    toggle_ongkir: 1,
    toggle_anger: 1,
    toggle_fallback: 1,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      setForm({
        nama_bisnis:      settings.nama_bisnis    || '',
        model:            settings.model          || 'Gemini 1.5 Pro',
        knowledge_base:   settings.knowledge_base || '',
        toggle_slang:     settings.toggle_slang    ?? 1,
        toggle_java:      settings.toggle_java     ?? 1,
        toggle_ongkir:    settings.toggle_ongkir   ?? 1,
        toggle_anger:     settings.toggle_anger    ?? 1,
        toggle_fallback:  settings.toggle_fallback ?? 1,
      });
    }
  }, [settings]);

  const handleToggle = async (key, val) => {
    const next = { ...form, [key]: val ? 1 : 0 };
    setForm(next);
    try {
      const result = await updateSettings(next);
      onSave(result.client ?? result);
    } catch (e) {
      addToast('Gagal menyimpan toggle: ' + e.message, 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const result = await updateSettings(form);
      onSave(result.client ?? result);
      addToast('Konfigurasi berhasil disimpan!', 'success');
    } catch (err) {
      addToast('Gagal menyimpan: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const webhookUrl = `${window.location.protocol}//${window.location.hostname}:8000/webhook`;

  const copyWebhook = () => {
    navigator.clipboard.writeText(webhookUrl);
    addToast('Webhook URL disalin!', 'success');
  };

  return (
    <form className="config-grid" id="agent-config-form" onSubmit={handleSubmit}>
      {/* Left — Settings */}
      <div className="config-settings-card glass">
        <div className="config-section-title">Agent Settings</div>

        <div className="form-field">
          <label>Agent Name</label>
          <input
            id="cfg-agent-name"
            type="text"
            className="cfg-input"
            value={form.nama_bisnis}
            onChange={e => setForm({...form, nama_bisnis: e.target.value})}
            placeholder="e.g. Regalia Concierge WA"
            required
          />
        </div>

        <div className="form-field">
          <label>Foundation Model</label>
          <select
            id="cfg-model"
            className="cfg-input"
            value={form.model}
            onChange={e => setForm({...form, model: e.target.value})}
          >
            <option>Gemini 1.5 Pro</option>
            <option>GPT-4o</option>
            <option>Claude 3.5 Sonnet</option>
            <option>Llama 3.1 70B</option>
          </select>
        </div>

        <div className="form-field">
          <label>System Prompt / Knowledge Base</label>
          <textarea
            id="cfg-system-prompt"
            className="cfg-input cfg-textarea"
            rows={8}
            value={form.knowledge_base}
            onChange={e => setForm({...form, knowledge_base: e.target.value})}
            placeholder="Masukkan instruksi sistem dan knowledge base untuk AI agent..."
          />
        </div>

        <div className="form-field">
          <label>Webhook URL</label>
          <div className="webhook-row">
            <input
              id="cfg-webhook"
              type="text"
              className="cfg-input"
              value={webhookUrl}
              readOnly
            />
            <button type="button" className="btn-icon-glass" onClick={copyWebhook} title="Copy">
              <span className="google-symbols notranslate">content_copy</span>
            </button>
          </div>
        </div>

        <button type="submit" className="btn-primary glow-button" disabled={saving}>
          <span className="google-symbols notranslate">save</span>
          {saving ? 'Menyimpan...' : 'Save Configuration'}
        </button>
      </div>

      {/* Right — Toggles */}
      <div className="config-features-card glass">
        <div className="config-section-title">AI Feature Toggles</div>
        <div className="toggle-list">
          {TOGGLES.map(t => (
            <div key={t.id} className="toggle-card">
              <div className="toggle-info">
                <div className="toggle-label">{t.label}</div>
                <div className="toggle-desc">{t.desc}</div>
              </div>
              <label className="switch">
                <input
                  id={t.id}
                  type="checkbox"
                  checked={form[t.id] === 1}
                  onChange={e => handleToggle(t.id, e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}
