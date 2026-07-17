// panels/ConfigPanel/ConfigPanel.jsx

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { updateSettings } from '../../../api/client';
import './ConfigPanel.css';

const TOGGLES = [
  { id: 'toggle_slang',    label: 'Slang Engine',                   desc: 'Mendeteksi dan merespons bahasa gaul/slang', icon: 'chat' },
  { id: 'toggle_java',     label: 'Javanese Translation Router',    desc: 'Terjemahan otomatis bahasa Jawa krama', icon: 'translate' },
  { id: 'toggle_ongkir',   label: 'CekOngkir Tool Integration',    desc: 'Integrasi cek ongkos kirim real-time', icon: 'local_shipping' },
  { id: 'toggle_anger',    label: 'Sentiment & Anger De-escalation', desc: 'Deteksi emosi dan de-eskalasi otomatis', icon: 'favorite' },
  { id: 'toggle_fallback', label: 'Human Fallback Protocol',        desc: 'Eskalasi ke agen manusia jika diperlukan', icon: 'person' },
];

export function ConfigPanel({ settings, onSave, addToast }) {
  const { t } = useTranslation();
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
  const [lastSaved, setLastSaved] = useState(null);

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
      // Set simple timestamp for mock "last saved" display
      setLastSaved(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  }, [settings]);

  const handleToggle = async (key, val) => {
    const next = { ...form, [key]: val ? 1 : 0 };
    setForm(next);
    try {
      const result = await updateSettings(next);
      onSave(result.client ?? result);
      setLastSaved(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
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
      setLastSaved(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (err) {
      addToast('Gagal menyimpan: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const webhookUrl = `${window.location.protocol}//${window.location.hostname}:8000/webhook`;

  return (
    <form className="config-form-container" id="agent-config-form" onSubmit={handleSubmit}>
      <div className="config-grid">
        {/* Left Column — Multi Cards */}
        <div className="config-left-column">
          
          {/* Card 1: Agent Information */}
          <div className="config-card glass">
            <div className="card-header-with-icon">
              <div className="header-icon-circle">
                <span className="google-symbols notranslate">smart_toy</span>
              </div>
              <div className="header-title-block">
                <h2 className="card-title-text">{t('agentInfoTitle')}</h2>
                <p className="card-desc-text">{t('agentInfoDesc')}</p>
              </div>
            </div>
            
            <div className="card-body-content">
              <div className="form-field">
                <label className="field-label">{t('agentNameLabel')}</label>
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
                <label className="field-label">{t('foundationModelLabel')}</label>
                <div className="model-select-wrapper">
                  <span className="google-symbols model-select-icon notranslate">auto_awesome</span>
                  <select
                    id="cfg-model"
                    className="cfg-input select-with-icon"
                    value={form.model}
                    onChange={e => setForm({...form, model: e.target.value})}
                  >
                    <option>Gemini 1.5 Pro</option>
                    <option>GPT-4o</option>
                    <option>Claude 3.5 Sonnet</option>
                    <option>Llama 3.1 70B</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Knowledge Base */}
          <div className="config-card glass">
            <div className="card-header-with-icon">
              <div className="header-icon-circle">
                <span className="google-symbols notranslate">book</span>
              </div>
              <div className="header-title-block">
                <h2 className="card-title-text">{t('knowledgeBaseTitle')}</h2>
                <p className="card-desc-text">{t('knowledgeBaseDesc')}</p>
              </div>
            </div>

            <div className="card-body-content">
              <div className="form-field">
                <label className="field-label">{t('systemPromptLabel')}</label>
                <textarea
                  id="cfg-system-prompt"
                  className="cfg-input cfg-textarea"
                  rows={8}
                  value={form.knowledge_base}
                  onChange={e => setForm({...form, knowledge_base: e.target.value})}
                  placeholder="Masukkan instruksi sistem dan knowledge base untuk AI agent..."
                />
              </div>
            </div>
          </div>

          {/* Card 3: Integrations */}
          <div className="config-card glass">
            <div className="card-header-with-icon">
              <div className="header-icon-circle">
                <span className="google-symbols notranslate">link</span>
              </div>
              <div className="header-title-block">
                <h2 className="card-title-text">{t('integrationsTitle')}</h2>
                <p className="card-desc-text">{t('integrationsDesc')}</p>
              </div>
            </div>

            <div className="card-body-content">
              <div className="form-field">
                <label className="field-label">{t('webhookUrl')}</label>
                <div className="webhook-row">
                  <input
                    id="cfg-webhook"
                    type="text"
                    className="cfg-input"
                    value={webhookUrl}
                    readOnly
                  />
                  <button 
                    type="button" 
                    className="btn-test-connection" 
                    onClick={() => addToast('Connection test simulation successful!', 'success')}
                  >
                    {t('testConnectionBtn')}
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column — Feature Toggles */}
        <div className="config-right-column">
          <div className="config-card glass">
            <div className="card-header-with-icon">
              <div className="header-icon-circle">
                <span className="google-symbols notranslate">auto_awesome</span>
              </div>
              <div className="header-title-block">
                <h2 className="card-title-text">{t('aiFeatureTogglesTitle')}</h2>
                <p className="card-desc-text">{t('aiFeatureTogglesDesc')}</p>
              </div>
            </div>

            <div className="card-body-content toggle-list">
              {TOGGLES.map(tData => (
                <div key={tData.id} className="toggle-card">
                  <div className="toggle-left-side">
                    <div className="toggle-icon-container">
                      <span className="google-symbols notranslate">{tData.icon}</span>
                    </div>
                    <div className="toggle-info">
                      <div className="toggle-label">{tData.label}</div>
                      <div className="toggle-desc">{tData.desc}</div>
                    </div>
                  </div>
                  <label className="switch">
                    <input
                      id={tData.id}
                      type="checkbox"
                      checked={form[tData.id] === 1}
                      onChange={e => handleToggle(tData.id, e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Footer Bar */}
      <div className="config-footer-bar glass">
        <div className="footer-left">
          <button type="submit" className="btn-save-config glow-button" disabled={saving}>
            <span className="google-symbols notranslate">save</span>
            <span>{saving ? 'Saving...' : t('saveConfigurationBtn')}</span>
          </button>
          <span className="footer-desc-text">{t('allChangesSavedText')}</span>
        </div>
        <div className="footer-right">
          <span className="google-symbols success-icon notranslate">check_circle</span>
          <div className="status-text-box">
            <span className="status-title">{t('savedStatusText')}</span>
            <span className="status-time">{lastSaved ? lastSaved : t('justNowText')}</span>
          </div>
        </div>
      </div>
    </form>
  );
}

