const fs = require('fs');
const path = require('path');

const locales = ['en', 'id', 'de', 'fr', 'it', 'es', 'pt', 'ko', 'hi', 'ja'];

const newTranslations = {
  activeChats: { en: 'Active Chats', id: 'Obrolan Aktif', de: 'Aktive Chats', fr: 'Chats Actifs', it: 'Chat Attive', es: 'Chats Activos', pt: 'Chats Ativos', ko: '활성 채팅', hi: 'सक्रिय चैट', ja: 'アクティブなチャット' },
  plusTwoToday: { en: '+2 today', id: '+2 hari ini', de: '+2 heute', fr: '+2 aujourd\'hui', it: '+2 oggi', es: '+2 hoy', pt: '+2 hoje', ko: '오늘 +2', hi: 'आज +2', ja: '今日 +2' },
  apiSuccessRate: { en: 'API Success Rate', id: 'Tingkat Keberhasilan API', de: 'API-Erfolgsrate', fr: 'Taux de succès API', it: 'Tasso di Successo API', es: 'Tasa de Éxito API', pt: 'Taxa de Sucesso API', ko: 'API 성공률', hi: 'API सफलता दर', ja: 'API成功率' },
  last24Hours: { en: 'Last 24 hours', id: '24 jam terakhir', de: 'Letzte 24 Stunden', fr: 'Dernières 24 heures', it: 'Ultime 24 ore', es: 'Últimas 24 horas', pt: 'Últimas 24 horas', ko: '지난 24시간', hi: 'पिछले 24 घंटे', ja: '過去24時間' },
  avgResponseTime: { en: 'Avg. Response Time', id: 'Rata-rata Waktu Respons', de: 'Durchschn. Antwortzeit', fr: 'Temps de réponse moyen', it: 'Tempo Medio di Risposta', es: 'Tiempo Medio de Respuesta', pt: 'Tempo Médio de Resposta', ko: '평균 응답 시간', hi: 'औसत प्रतिक्रिया समय', ja: '平均応答時間' },
  geminiPro: { en: 'Gemini 1.5 Pro', id: 'Gemini 1.5 Pro', de: 'Gemini 1.5 Pro', fr: 'Gemini 1.5 Pro', it: 'Gemini 1.5 Pro', es: 'Gemini 1.5 Pro', pt: 'Gemini 1.5 Pro', ko: 'Gemini 1.5 Pro', hi: 'Gemini 1.5 Pro', ja: 'Gemini 1.5 Pro' },
  modelCallCount: { en: 'Model Call Count', id: 'Jumlah Panggilan Model', de: 'Modellaufrufanzahl', fr: 'Nombre d\'appels du modèle', it: 'Conteggio Chiamate Modello', es: 'Recuento de Llamadas del Modelo', pt: 'Contagem de Chamadas do Modelo', ko: '모델 호출 수', hi: 'मॉडल कॉल संख्या', ja: 'モデル呼び出し回数' },
  thisSession: { en: 'This session', id: 'Sesi ini', de: 'Diese Sitzung', fr: 'Cette session', it: 'Questa sessione', es: 'Esta sesión', pt: 'Esta sessão', ko: '이번 세션', hi: 'यह सत्र', ja: 'このセッション' },
  conversationsTraffic: { en: 'Conversations Traffic', id: 'Lalu Lintas Percakapan', de: 'Unterhaltungsverkehr', fr: 'Trafic des conversations', it: 'Traffico Conversazioni', es: 'Tráfico de Conversaciones', pt: 'Tráfego de Conversas', ko: '대화 트래픽', hi: 'बातचीत ट्रैफ़िक', ja: '会話のトラフィック' },
  orchestratorHealth: { en: 'Orchestrator Health', id: 'Kesehatan Orkestrator', de: 'Orchestrator-Gesundheit', fr: 'Santé de l\'Orchestrateur', it: 'Stato Orchestratore', es: 'Salud del Orquestador', pt: 'Saúde do Orquestrador', ko: '오케스트레이터 상태', hi: 'ऑर्केस्ट्रेटर स्वास्थ्य', ja: 'オーケストレーターの健全성' },
  liveEventStream: { en: '⬡ Live Event Stream', id: '⬡ Aliran Acara Langsung', de: '⬡ Live-Ereignis-Stream', fr: '⬡ Flux d\'événements en direct', it: '⬡ Flusso Eventi Live', es: '⬡ Flujo de Eventos en Vivo', pt: '⬡ Fluxo de Eventos ao Vivo', ko: '⬡ 라이브 이벤트 스트림', hi: '⬡ लाइव इवेंट स्ट्रीम', ja: '⬡ ライブイベントストリーム' },
  waitingForEvents: { en: '[system] Waiting for events...', id: '[sistem] Menunggu acara...', de: '[system] Warten auf Ereignisse...', fr: '[système] En attente d\'événements...', it: '[sistema] In attesa di eventi...', es: '[sistema] Esperando eventos...', pt: '[sistema] Aguardando eventos...', ko: '[시스템] 이벤트 대기 중...', hi: '[सिस्टम] इवेंट की प्रतीक्षा की जा रही है...', ja: '[システム] イベントを待機しています...' }
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
console.log('Updated Overview Panel locales!');
