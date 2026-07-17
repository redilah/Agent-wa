import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import id from './locales/id.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import it from './locales/it.json';
import es from './locales/es.json';
import pt from './locales/pt.json';
import ko from './locales/ko.json';
import hi from './locales/hi.json';
import ja from './locales/ja.json';

const resources = {
  en: { translation: en },
  id: { translation: id },
  de: { translation: de },
  fr: { translation: fr },
  it: { translation: it },
  es: { translation: es },
  pt: { translation: pt },
  ko: { translation: ko },
  hi: { translation: hi },
  ja: { translation: ja }
};

const savedLanguage = localStorage.getItem('regalia_language') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
