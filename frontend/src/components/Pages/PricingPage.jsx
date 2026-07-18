import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGlobalContext } from '../../App';

export function PricingPage() {
  const { t } = useTranslation();
  const { navigate } = useGlobalContext();

  return (
    <div className="min-h-screen bg-[#0e0f11] text-white p-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        <button onClick={() => navigate('/')} className="btn-secondary self-start flex items-center justify-center gap-2">
          <span className="google-symbols notranslate text-lg font-bold">arrow_back</span>
          <span>Back</span>
        </button>

        <div className="text-center my-6">
          <h1 className="text-3xl font-bold tracking-tight mb-2">{t('upgradePlanTitle')}</h1>
          <p className="text-white/60 text-sm">{t('upgradePlanSub')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Card 1: Free */}
          <div className="panel-card !p-8 justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">{t('freePlan')}</h3>
                <span className="google-symbols text-white/40 notranslate">person</span>
              </div>
              <div className="text-4xl font-bold mb-6">$0<span className="text-lg text-white/50 font-normal">/mo</span></div>
              <ul className="space-y-4 mb-8 text-white/70 text-sm">
                <li className="flex items-center gap-2"><span className="google-symbols text-emerald-400 notranslate text-base">check</span> 100 interaksi AI per bulan</li>
                <li className="flex items-center gap-2"><span className="google-symbols text-emerald-400 notranslate text-base">check</span> 1 Agen WhatsApp</li>
                <li className="flex items-center gap-2"><span className="google-symbols text-emerald-400 notranslate text-base">check</span> Dukungan komunitas</li>
              </ul>
            </div>
            <button className="w-full py-3 bg-white/10 text-white/50 rounded-xl font-medium cursor-not-allowed text-sm" disabled>{t('currentPlanBtn')}</button>
          </div>

          {/* Card 2: Pro */}
          <div className="panel-card !p-8 justify-between !border-2 !border-blue-500/50 relative bg-blue-950/10">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Paling Populer</div>
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-blue-400">{t('proPlan')}</h3>
                <span className="google-symbols text-blue-400 notranslate">workspace_premium</span>
              </div>
              <div className="text-4xl font-bold mb-6">$49<span className="text-lg text-white/50 font-normal">/mo</span></div>
              <ul className="space-y-4 mb-8 text-white/80 text-sm">
                <li className="flex items-center gap-2"><span className="google-symbols text-blue-400 notranslate text-base">check</span> 5,000 interaksi AI per bulan</li>
                <li className="flex items-center gap-2"><span className="google-symbols text-blue-400 notranslate text-base">check</span> Hingga 5 Agen WhatsApp</li>
                <li className="flex items-center gap-2"><span className="google-symbols text-blue-400 notranslate text-base">check</span> Knowledge Base Lanjutan</li>
                <li className="flex items-center gap-2"><span className="google-symbols text-blue-400 notranslate text-base">check</span> Dukungan Prioritas 24/7</li>
              </ul>
            </div>
            <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition text-sm">{t('upgradeToProBtn')}</button>
          </div>

          {/* Card 3: Enterprise */}
          <div className="panel-card !p-8 justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">{t('enterprisePlan')}</h3>
                <span className="google-symbols text-white/40 notranslate">business</span>
              </div>
              <div className="text-4xl font-bold mb-6">Custom</div>
              <ul className="space-y-4 mb-8 text-white/70 text-sm">
                <li className="flex items-center gap-2"><span className="google-symbols text-purple-400 notranslate text-base">check</span> Interaksi AI tanpa batas</li>
                <li className="flex items-center gap-2"><span className="google-symbols text-purple-400 notranslate text-base">check</span> Agen tak terbatas</li>
                <li className="flex items-center gap-2"><span className="google-symbols text-purple-400 notranslate text-base">check</span> SLA 99.9%</li>
                <li className="flex items-center gap-2"><span className="google-symbols text-purple-400 notranslate text-base">check</span> Dedicated Account Manager</li>
              </ul>
            </div>
            <button className="w-full py-3 bg-white text-black hover:bg-gray-200 rounded-xl font-bold transition text-sm">{t('contactUsBtn')}</button>
          </div>

        </div>
      </div>
    </div>
  );
}
