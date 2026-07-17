const fs = require('fs');
const path = require('path');

const locales = ['en', 'id', 'de', 'fr', 'it', 'es', 'pt', 'ko', 'hi', 'ja'];

const newTranslations = {
  systemOverviewTitle: { en: 'System Overview', id: 'Ikhtisar Sistem', de: 'Systemübersicht', fr: 'Aperçu du système', it: 'Panoramica Sistema', es: 'Resumen del Sistema', pt: 'Visão Geral do Sistema', ko: '시스템 개요', hi: 'सिस्टम अवलोकन', ja: 'システム概要' },
  systemOverviewSub: { en: 'Real-time orchestration monitoring & performance metrics', id: 'Pemantauan orkestrasi real-time & metrik kinerja', de: 'Echtzeit-Überwachung & Leistungsmetriken', fr: 'Surveillance et métriques en temps réel', it: 'Monitoraggio e metriche in tempo reale', es: 'Monitorización y métricas en tiempo real', pt: 'Monitoramento e métricas em tempo real', ko: '실시간 오케스트레이션 모니터링 및 성능 지표', hi: 'रीयल-टाइम ऑर्केस्ट्रेशन निगरानी और प्रदर्शन मेट्रिक्स', ja: 'リアルタイムのオーケストレーション監視とパフォーマンス指標' },
  agentConfigTitle: { en: 'Agent Configuration', id: 'Konfigurasi Agen', de: 'Agenten-Konfiguration', fr: 'Configuration de l\'agent', it: 'Configurazione Agente', es: 'Configuración del Agente', pt: 'Configuração do Agente', ko: '에이전트 구성', hi: 'एजेंट कॉन्फ़िगरेशन', ja: 'エージェント設定' },
  agentConfigSub: { en: 'LLM parameters, knowledge base & feature toggles', id: 'Parameter LLM, basis pengetahuan & toggle fitur', de: 'LLM-Parameter, Wissensdatenbank & Funktionen', fr: 'Paramètres LLM, base de connaissances et options', it: 'Parametri LLM, knowledge base e toggle', es: 'Parámetros LLM, base de conocimiento y opciones', pt: 'Parâmetros LLM, base de conhecimento e opções', ko: 'LLM 매개변수, 지식 기반 및 기능 토글', hi: 'LLM पैरामीटर, ज्ञान आधार और फीचर टॉगल', ja: 'LLMパラメータ、ナレッジベース、機能トグル' },
  interactiveSandboxTitle: { en: 'Interactive Sandbox', id: 'Sandbox Interaktif', de: 'Interaktive Sandbox', fr: 'Bac à sable interactif', it: 'Sandbox Interattiva', es: 'Sandbox Interactivo', pt: 'Sandbox Interativo', ko: '대화형 샌드박스', hi: 'इंटरएक्टिव सैंडबॉक्स', ja: 'インタラクティブ・サンドボックス' },
  interactiveSandboxSub: { en: 'Simulate customer interactions & test AI responses', id: 'Simulasikan interaksi pelanggan & uji respons AI', de: 'Kundeninteraktionen simulieren & KI testen', fr: 'Simuler des interactions et tester l\'IA', it: 'Simula interazioni e testa l\'IA', es: 'Simula interacciones y prueba la IA', pt: 'Simule interações e teste a IA', ko: '고객 상호 작용 시뮬레이션 및 AI 응답 테스트', hi: 'ग्राहक इंटरैक्शन का अनुकरण करें और AI प्रतिक्रियाओं का परीक्षण करें', ja: '顧客との対話をシミュレートし、AIの応答をテストする' },
  analyticsCostsTitle: { en: 'Analytics & Costs', id: 'Analitik & Biaya', de: 'Analytik & Kosten', fr: 'Analytique et Coûts', it: 'Analitica e Costi', es: 'Analítica y Costes', pt: 'Análise e Custos', ko: '분석 및 비용', hi: 'एनालिटिक्स और लागत', ja: '分析とコスト' },
  analyticsCostsSub: { en: 'Usage statistics, cost analysis & performance insights', id: 'Statistik penggunaan, analisis biaya & wawasan kinerja', de: 'Nutzungsstatistiken, Kostenanalyse & Einblicke', fr: 'Statistiques d\'utilisation, analyse des coûts', it: 'Statistiche utilizzo, analisi costi', es: 'Estadísticas de uso, análisis de costes', pt: 'Estatísticas de uso, análise de custos', ko: '사용 통계, 비용 분석 및 성능 인사이트', hi: 'उपयोग के आँकड़े, लागत विश्लेषण और प्रदर्शन अंतर्दृष्टि', ja: '使用統計、コスト分析、パフォーマンスの洞察' },
  systemEventLogsTitle: { en: 'System Event Logs', id: 'Log Peristiwa Sistem', de: 'Systemereignisprotokolle', fr: 'Journaux d\'événements système', it: 'Log Eventi di Sistema', es: 'Registros de Eventos del Sistema', pt: 'Logs de Eventos do Sistema', ko: '시스템 이벤트 로그', hi: 'सिस्टम इवेंट लॉग', ja: 'システムイベントログ' },
  systemEventLogsSub: { en: 'Real-time diagnostic feed & event timeline', id: 'Umpan diagnostik real-time & garis waktu peristiwa', de: 'Echtzeit-Diagnose-Feed & Ereignis-Zeitleiste', fr: 'Flux de diagnostic en temps réel', it: 'Feed diagnostico in tempo reale', es: 'Flujo de diagnóstico en tiempo real', pt: 'Feed de diagnóstico em tempo real', ko: '실시간 진단 피드 및 이벤트 타임라인', hi: 'रीयल-टाइम डायग्नोस्टिक फ़ीड और इवेंट टाइमलाइन', ja: 'リアルタイムの診断フィードとイベントタイムライン' },
  wsLive: { en: 'WS LIVE', id: 'WS LANGSUNG', de: 'WS LIVE', fr: 'WS EN DIRECT', it: 'WS LIVE', es: 'WS EN VIVO', pt: 'WS AO VIVO', ko: 'WS 라이브', hi: 'डब्ल्यूएस लाइव', ja: 'WS ライブ' },
  refreshingData: { en: 'Refreshing data...', id: 'Menyegarkan data...', de: 'Daten werden aktualisiert...', fr: 'Actualisation des données...', it: 'Aggiornamento dati...', es: 'Actualizando datos...', pt: 'Atualizando dados...', ko: '데이터 새로 고침...', hi: 'डेटा रीफ्रेश किया जा रहा है...', ja: 'データを更新しています...' }
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
console.log('Updated Dashboard locales!');
