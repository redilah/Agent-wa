const fs = require('fs');
const path = require('path');

const locales = ['en', 'id', 'de', 'fr', 'it', 'es', 'pt', 'ko', 'hi', 'ja'];

const newTranslations = {
  conversationsTrafficDesc: { en: 'Real-time message exchange and user interaction rate', id: 'Pertukaran pesan real-time dan tingkat interaksi pengguna', de: 'Echtzeit-Nachrichtenaustausch und Benutzerinteraktionsrate', fr: 'Échange de messages en temps réel et taux d\'interaction des utilisateurs', it: 'Scambio di messaggi in tempo reale e tasso di interazione dell\'utente', es: 'Intercambio de mensajes en tiempo real y tasa de interacción del usuario', pt: 'Troca de mensagens em tempo real e taxa de interação do usuário', ko: '실시간 메시지 교환 및 사용자 상호 작용 속도', hi: 'वास्तविक समय संदेश विनिमय और उपयोगकर्ता सहभागिता दर', ja: 'リアルタイムのメッセージ交換とユーザーの対話率' },
  orchestratorHealthDesc: { en: 'Real-time status for internal services & engines', id: 'Status real-time untuk layanan & mesin internal', de: 'Echtzeit-Status für interne Dienste & Engines', fr: 'Statut en temps réel des services et moteurs internes', it: 'Stato in tempo reale per servizi e motori interni', es: 'Estado en tiempo real para servicios y motores internos', pt: 'Status em tempo real para serviços e motores internos', ko: '내부 서비스 및 엔진의 실시간 상태', hi: 'आंतरिक सेवाओं और इंजनों के लिए वास्तविक समय की स्थिति', ja: '内部サービスとエンジンのリアルタイムステータス' }
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
console.log('Updated Overview Panel description locales!');
