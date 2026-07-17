const fs = require('fs');
const path = require('path');

const locales = ['en', 'id', 'de', 'fr', 'it', 'es', 'pt', 'ko', 'hi', 'ja'];

const newTranslations = {
  agentInfoTitle: { en: 'Agent Information', id: 'Informasi Agen', de: 'Agenteninformationen', fr: 'Informations sur l\'agent', it: 'Informazioni Agente', es: 'Información del Agente', pt: 'Informações do Agente', ko: '에이전트 정보', hi: 'एजेंट जानकारी', ja: 'エージェント情報' },
  agentInfoDesc: { en: 'Basic information and model configuration.', id: 'Informasi dasar dan konfigurasi model.', de: 'Grundlegende Informationen und Modellkonfiguration.', fr: 'Informations de base et configuration du modèle.', it: 'Informazioni di base e configurazione del modello.', es: 'Información básica y configuración del modelo.', pt: 'Informações básicas e configuração do modelo.', ko: '기본 정보 및 모델 구성.', hi: 'बुनियादी जानकारी और मॉडल कॉन्फ़िगरेशन।', ja: '基本情報とモデル構成。' },
  agentNameLabel: { en: 'Agent Name', id: 'Nama Agen', de: 'Agentenname', fr: 'Nom de l\'agent', it: 'Nome Agente', es: 'Nombre del Agente', pt: 'Nome do Agente', ko: '에이전트 이름', hi: 'एजेंट का नाम', ja: 'エージェント名' },
  foundationModelLabel: { en: 'Foundation Model', id: 'Model Fondasi', de: 'Basis-Modell', fr: 'Modèle de fondation', it: 'Modello di Fondazione', es: 'Modelo de Fundación', pt: 'Modelo de Fundação', ko: '기초 모델', hi: 'फाउंडेशन मॉडल', ja: '基盤モデル' },
  knowledgeBaseTitle: { en: 'Knowledge Base', id: 'Basis Pengetahuan', de: 'Wissensdatenbank', fr: 'Base de connaissances', it: 'Knowledge Base', es: 'Base de Conocimiento', pt: 'Base de Conhecimento', ko: '지식 기반', hi: 'ज्ञान आधार', ja: 'ナレッジベース' },
  knowledgeBaseDesc: { en: 'System prompt and knowledge context for your agent.', id: 'Instruksi sistem dan konteks pengetahuan untuk agen Anda.', de: 'System-Prompt und Wissenskontext für Ihren Agenten.', fr: 'Prompt système et contexte de connaissances pour votre agent.', it: 'Prompt di sistema e contesto di conoscenza per l\'agente.', es: 'Instrucciones del sistema y contexto de conocimiento para su agente.', pt: 'Prompt do sistema e contexto de conhecimento para o seu agente.', ko: '에이전트의 시스템 프롬프트 및 지식 컨텍스트.', hi: 'आपके एजेंट के लिए सिस्टम प्रॉम्प्ट और ज्ञान संदर्भ।', ja: 'エージェntのシステムプロンプトとナレッジコンテキスト。' },
  systemPromptLabel: { en: 'System Prompt / Knowledge Base', id: 'Instruksi Sistem / Basis Pengetahuan', de: 'System-Prompt / Wissensdatenbank', fr: 'Prompt système / Base de connaissances', it: 'Prompt di Sistema / Knowledge Base', es: 'Instrucciones del Sistema / Base de Conocimiento', pt: 'Prompt do Sistema / Base de Conhecimento', ko: '시스템 프롬프트 / 지식 기반', hi: 'सिस्टम प्रॉम्प्ट / ज्ञान आधार', ja: 'システムプロンプト / ナレッジベース' },
  integrationsTitle: { en: 'Integrations', id: 'Integrasi', de: 'Integrationen', fr: 'Intégrations', it: 'Integrazioni', es: 'Integraciones', pt: 'Integrações', ko: '연동', hi: 'एकीकरण', ja: '統合' },
  integrationsDesc: { en: 'Connect external services and tools.', id: 'Hubungkan layanan dan alat eksternal.', de: 'Verbinden Sie externe Dienste und Tools.', fr: 'Connecter des services et outils externes.', it: 'Connetti servizi e strumenti esterni.', es: 'Conecte servicios y herramientas externos.', pt: 'Conecte serviços e ferramentas externas.', ko: '외부 서비스 및 도구 연결.', hi: 'बाहरी सेवाओं और उपकरणों को कनेक्ट करें।', ja: '外部サービスやツールとの接続。' },
  testConnectionBtn: { en: 'Test Connection', id: 'Uji Koneksi', de: 'Verbindung testen', fr: 'Tester la connexion', it: 'Testa Connessione', es: 'Probar Conexión', pt: 'Testar Conexão', ko: '연결 테스트', hi: 'कनेक्शन का परीक्षण करें', ja: '接続テスト' },
  aiFeatureTogglesTitle: { en: 'AI Feature Toggles', id: 'Toggle Fitur AI', de: 'KI-Funktions-Toggles', fr: 'Options de fonctionnalités IA', it: 'Toggle Funzionalità IA', es: 'Interruptores de Funciones de IA', pt: 'Alternadores de Recursos de IA', ko: 'AI 기능 토글', hi: 'एआई फीचर टॉगल', ja: 'AI機能の切り替え' },
  aiFeatureTogglesDesc: { en: 'Enable or disable AI capabilities.', id: 'Aktifkan atau nonaktifkan kemampuan AI.', de: 'Aktivieren oder deaktivieren Sie KI-Funktionen.', fr: 'Activer ou désactiver les capacités d\'IA.', it: 'Abilita o disabilita le funzionalità IA', es: 'Activar o desactivar capacidades de IA.', pt: 'Ative ou desative recursos de IA.', ko: 'AI 기능을 활성화 또는 비활성화합니다.', hi: 'एआई क्षमताओं को सक्षम या अक्षम करें।', ja: 'AI機能を有効または無効にします。' },
  saveConfigurationBtn: { en: 'Save Configuration', id: 'Simpan Konfigurasi', de: 'Konfiguration speichern', fr: 'Sauvegarder la configuration', it: 'Salva Configurazione', es: 'Guardar Configuración', pt: 'Salvar Configuração', ko: '설정 저장', hi: 'कॉन्फ़िगरेशन सहेजें', ja: '設定を保存' },
  allChangesSavedText: { en: 'All changes will be saved and applied to your agent.', id: 'Semua perubahan akan disimpan dan diterapkan ke agen Anda.', de: 'Alle Änderungen werden gespeichert und auf Ihren Agenten angewendet.', fr: 'Toutes les modifications seront sauvegardées et appliquées à votre agent.', it: 'Tutte le modifiche verranno salvate e applicate all\'agente.', es: 'Todos los cambios se guardarán y se aplicarán a su agente.', pt: 'Todas as alterações serão salvas e aplicadas ao seu agente.', ko: '모든 변경 사항이 저장되고 에이전트에 적용됩니다.', hi: 'सभी बदलाव सहेजे जाएंगे और आपके एजेंट पर लागू किए जाएंगे।', ja: 'すべての変更が保存され、エージェントに適用されます。' },
  savedStatusText: { en: 'Saved', id: 'Disimpan', de: 'Gespeichert', fr: 'Enregistré', it: 'Salvataggio completato', es: 'Guardado', pt: 'Salvo', ko: '저장됨', hi: 'सहेजा गया', ja: '保存済み' },
  justNowText: { en: 'Just now', id: 'Baru saja', de: 'Gerade eben', fr: 'À l\'instant', it: 'Adesso', es: 'Ahora mismo', pt: 'Agora mesmo', ko: '방금 전', hi: 'अभी-अभी', ja: 'たった今' }
};

locales.forEach(lang => {
  const file = path.join(__dirname, `src/locales/${lang}.json`);
  let data = {};
  if(fs.existsSync(file)) {
    data = JSON.parse(fs.readFileSync(file, 'utf8'));
  }
  for (const key in newTranslations) {
    data[key] = newTranslations[key][lang] || newTranslations[key]['en'];
  }
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
});
console.log('Updated Config Panel locales!');
