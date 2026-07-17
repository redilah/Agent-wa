const fs = require('fs');
const path = require('path');

const locales = ['en', 'id', 'de', 'fr', 'it', 'es', 'pt', 'ko', 'hi', 'ja'];

const newTranslations = {
  classificationAccuracyTitle: { en: 'Classification Accuracy', id: 'Akurasi Klasifikasi', de: 'Klassifizierungsgenauigkeit', fr: 'Précision de la classification', it: 'Accuratezza della Classificazione', es: 'Precisión de la Clasificación', pt: 'Precisão da Classificação', ko: '분류 정확도', hi: 'वर्गीकरण सटीकता', ja: '分類精度' },
  classificationAccuracyDesc: { en: 'Intent detection model accuracy score', id: 'Skor akurasi model deteksi niat', de: 'Genauigkeitswert des Intent-Erkennungsmodells', fr: 'Score de précision du modèle de détection d\'intention', it: 'Punteggio di accuratezza del modello di rilevamento degli intenti', es: 'Puntuación de precisión del modelo de detección de intenciones', pt: 'Pontuação de precisão do modelo de detecção de intenções', ko: '의도 감지 모델 정확도 점수', hi: 'इरादा पहचान मॉडल सटीकता स्कोर', ja: '意図検出モデルの精度スコア' },
  customerSentimentTitle: { en: 'Customer Sentiment', id: 'Sentimen Pelanggan', de: 'Kundensentiment', fr: 'Sentiment des clients', it: 'Sentimento dei Clienti', es: 'Sentimiento del Cliente', pt: 'Sentimento do Cliente', ko: '고객 감정', hi: 'ग्राहक भावना', ja: '顧客の感情' },
  customerSentimentDesc: { en: 'Analysis of user message sentiment states', id: 'Analisis kondisi sentimen pesan pengguna', de: 'Analyse der Stimmungszustände von Benutzernachrichten', fr: 'Analyse des états de sentiment des messages des utilisateurs', it: 'Analisi degli stati di sentimento dei messaggi degli utenti', es: 'Análisis de los estados de sentimiento de los mensajes de los usuarios', pt: 'Análise dos estados de sentimento das mensagens dos usuários', ko: '사용자 메시지 감정 상태 분석', hi: 'उपयोगकर्ता संदेश भावना स्थितियों का विश्लेषण', ja: 'ユーザーメッセージの感情状態の分析' },
  costOptimizationTitle: { en: 'Cost Optimization', id: 'Optimalisasi Biaya', de: 'Kostenoptimierung', fr: 'Optimisation des coûts', it: 'Ottimizzazione dei Costi', es: 'Optimización de Costes', pt: 'Otimização de Custos', ko: '비용 최적화', hi: 'लागत अनुकूलन', ja: 'コストの最適化' },
  costOptimizationDesc: { en: 'Monthly LLM budget and token allocation', id: 'Anggaran LLM bulanan dan alokasi token', de: 'Monatliches LLM-Budget und Token-Zuweisung', fr: 'Budget LLM mensuel et allocation de jetons', it: 'Budget mensile LLM e allocazione token', es: 'Presupuesto mensual de LLM y asignación de tokens', pt: 'Orçamento mensal de LLM e alocação de tokens', ko: '월간 LLM 예산 및 토큰 할당', hi: 'मासिक एलएलएम बजट और टोकन आवंटन', ja: '月間LLM予算とトークン割り当て' },
  engineTriggerFreqTitle: { en: 'Engine Trigger Frequency', id: 'Frekuensi Pemicu Mesin', de: 'Engine-Triggerfrequenz', fr: 'Fréquence de déclenchement du moteur', it: 'Frequenza di Attivazione del Motore', es: 'Frecuencia de Activación del Motor', pt: 'Frequência de Acionamento do Motor', ko: '엔진 트리거 빈도', hi: 'इंजन ट्रिगर आवृत्ति', ja: 'エンジントリガーの頻度' },
  engineTriggerFreqDesc: { en: 'Detailed breakdown of tool execution calls', id: 'Rincian panggilan eksekusi alat secara mendetail', de: 'Detaillierte Aufschlüsselung der Tool-Ausführungsaufrufe', fr: 'Répartition détaillée des appels d\'exécution des outils', it: 'Scomposizione dettagliata delle chiamate di esecuzione degli strumenti', es: 'Desglose detallado de las llamadas de ejecución de herramientas', pt: 'Detalhamento detalhado das chamadas de execução de ferramentas', ko: '도구 실행 호출의 상세 내역', hi: 'टूल निष्पादन कॉल का विस्तृत विवरण', ja: 'ツール実行呼び出しの詳細な内訳' },
  exportCsvBtn: { en: 'Export CSV', id: 'Ekspor CSV', de: 'CSV exportieren', fr: 'Exporter en CSV', it: 'Esporta CSV', es: 'Exportar CSV', pt: 'Exportar CSV', ko: 'CSV 내보내기', hi: 'सीएसवी निर्यात करें', ja: 'CSVエクスポート' }
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
console.log('Updated Analytics Panel locales!');
