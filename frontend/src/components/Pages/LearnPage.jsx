import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGlobalContext } from '../../App';

export function LearnPage() {
  const { t } = useTranslation();
  const { navigate } = useGlobalContext();

  return (
    <div className="min-h-screen bg-[#0e0f11] text-white p-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <button onClick={() => navigate('/')} className="btn-secondary self-start flex items-center justify-center gap-2">
          <span className="google-symbols notranslate text-lg font-bold">arrow_back</span>
          <span>Back</span>
        </button>

        <div className="panel-card">
          <div className="panel-card-header">
            <div className="panel-icon-circle">
              <span className="google-symbols notranslate">school</span>
            </div>
            <div className="panel-title-block">
              <h1 className="panel-title-text !text-2xl">{t('learnMoreTitle')}</h1>
              <p className="panel-desc-text">Learn about the AI core platform features and capabilities.</p>
            </div>
          </div>

          <div className="panel-body-content !gap-6">
            <p className="text-white/70 leading-relaxed text-sm">{t('learnMoreDesc')}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition">
                <span className="google-symbols text-3xl mb-4 text-white/80 notranslate">quick_reference_all</span>
                <h3 className="text-lg font-bold mb-2 text-white">{t('gettingStartedGuide')}</h3>
                <p className="text-sm text-white/60">{t('gettingStartedDesc')}</p>
              </div>

              <div className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition">
                <span className="google-symbols text-3xl mb-4 text-white/80 notranslate">api</span>
                <h3 className="text-lg font-bold mb-2 text-white">{t('apiDocumentation')}</h3>
                <p className="text-sm text-white/60">{t('apiDocDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
