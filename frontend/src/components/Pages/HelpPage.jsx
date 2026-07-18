import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGlobalContext } from '../../App';

export function HelpPage() {
  const { t } = useTranslation();
  const { navigate } = useGlobalContext();

  return (
    <div className="min-h-screen bg-[#0e0f11] text-white p-8">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        <button onClick={() => navigate('/')} className="btn-secondary self-start flex items-center justify-center gap-2">
          <span className="google-symbols notranslate text-lg font-bold">arrow_back</span>
          <span>Back</span>
        </button>

        <div className="panel-card">
          <div className="panel-card-header">
            <div className="panel-icon-circle">
              <span className="google-symbols notranslate">help_center</span>
            </div>
            <div className="panel-title-block">
              <h1 className="panel-title-text !text-2xl">{t('helpCenterTitle')}</h1>
              <p className="panel-desc-text">Browse documentation, tutorials, or contact developer support.</p>
            </div>
          </div>

          <div className="panel-body-content !gap-6">
            {/* Search Box */}
            <div className="relative">
              <span className="google-symbols absolute left-4 top-1/2 -translate-y-1/2 text-white/40">search</span>
              <input 
                type="text" 
                placeholder={t('searchPlaceholder')} 
                className="cfg-input !pl-12 !py-3.5" 
              />
            </div>

            {/* Popular Topics Section */}
            <div>
              <h2 className="text-lg font-semibold mb-4 text-white/80">{t('popularTopicsTitle')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  t('topic1Text'),
                  t('topic2Text'),
                  t('topic3Text'),
                  t('topic4Text')
                ].map((topic, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-black/35 hover:bg-black/50 border border-white/5 hover:border-white/10 rounded-xl cursor-pointer transition">
                    <span className="text-sm font-medium text-white/90">{topic}</span>
                    <span className="google-symbols text-white/40 notranslate">chevron_right</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Card */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl flex items-start gap-4 mt-2">
              <span className="google-symbols text-blue-400 text-3xl notranslate">support_agent</span>
              <div className="flex-1">
                <h3 className="text-base font-bold mb-1">{t('moreHelpTitle')}</h3>
                <p className="text-sm text-white/60 mb-4">{t('moreHelpDesc')}</p>
                <button className="btn-save-config glow-button !py-2 !px-4 text-sm">{t('submitTicketBtn')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
