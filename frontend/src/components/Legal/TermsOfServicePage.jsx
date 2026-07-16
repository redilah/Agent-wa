// TermsOfServicePage.jsx — Full-width clean editorial layout with real 10-language translations & Claude serif brand font
import React, { useState } from 'react';
import { languages } from './privacyTranslations';
import { termsContent } from './termsTranslations';

export function TermsOfServicePage() {
  const [lang, setLang] = useState('en');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fallback to English if somehow an invalid code is selected
  const activeContent = termsContent[lang] || termsContent['en'];

  return (
    <div
      onScroll={(e) => setIsScrolled(e.currentTarget.scrollTop > 25 || window.scrollY > 25)}
      className="min-h-screen h-screen overflow-y-auto custom-scrollbar bg-[#0b0e17] text-white/85 selection:bg-blue-500/30 selection:text-white pb-24"
    >
      {/* Header With Pure Classy REGALIA Text in Claude Serif Font & Anthropic-Style Collapse Animation */}
      <header className="border-b border-white/10 bg-[#0b0e17]/90 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 sm:px-12 py-5 flex items-center justify-between">
          <div className="flex items-center">
            <span
              onClick={() => { window.location.href = '/'; }}
              style={{ fontFamily: "'Libre Caslon Text', 'Charter', 'Georgia', 'Times New Roman', serif" }}
              className="text-[22px] font-bold tracking-[-0.3px] text-white cursor-pointer select-none flex items-center group"
            >
              <span className="inline-block transition-transform duration-500 ease-out">R</span>
              <span
                className={`inline-block overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isScrolled
                    ? 'max-w-0 opacity-0 -translate-x-3 tracking-tighter pointer-events-none'
                    : 'max-w-[100px] opacity-100 translate-x-0 tracking-[-0.3px]'
                }`}
              >
                egali
              </span>
              <span className="inline-block transition-transform duration-500 ease-out">a</span>
            </span>
          </div>
          <button
            onClick={() => {
              if (window.opener) {
                window.close();
              } else {
                window.location.href = '/';
              }
            }}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 text-sm font-medium transition-all cursor-pointer"
          >
            ← Back
          </button>
        </div>
      </header>

      {/* Main Full-Width Editorial Document Content */}
      <main className="max-w-4xl mx-auto px-6 sm:px-12 pt-12 sm:pt-16">
        {/* Document Header */}
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
            {activeContent.title}
          </h1>

          {/* Subheader bar matching Image 2 (input_file_1.png) */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6 flex-wrap gap-4">
            <span className="text-sm text-white/60 font-medium">
              {activeContent.effective}
            </span>
            <div className="flex items-center gap-5">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert(lang === 'id' ? 'Ini adalah versi terbaru dan aktif dari dokumen ini.' : 'This is the current active version of this document.');
                }}
                className="text-sm text-white/70 hover:text-white underline underline-offset-4 decoration-white/30 hover:decoration-white/80 transition-colors"
              >
                {activeContent.previousVersion}
              </a>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center gap-1.5 py-1 text-white/80 hover:text-[#888e9a] text-sm font-medium transition-colors cursor-pointer border-0 border-none outline-none bg-transparent appearance-none shadow-none"
                >
                  <span>{languages.find(l => l.code === lang)?.label || 'English'}</span>
                  <svg className={`w-3.5 h-3.5 transition-transform ${showLangMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu matching pure text requirement */}
                {showLangMenu && (
                  <div className="absolute right-0 mt-2 w-max min-w-[120px] rounded-xl bg-[#141721] border-0 shadow-2xl py-2 z-50 max-h-64 overflow-y-auto custom-scrollbar animate-fadeIn">
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        type="button"
                        onClick={() => { setLang(l.code); setShowLangMenu(false); }}
                        className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors flex items-center justify-between border-0 border-none outline-none appearance-none shadow-none bg-transparent ${lang === l.code ? 'text-white font-bold' : 'text-white/80 hover:text-[#888e9a] hover:bg-transparent'}`}
                      >
                        <span>{l.label}</span>
                        {lang === l.code && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <p className="mt-8 text-base sm:text-lg text-white/70 leading-relaxed">
            {activeContent.intro}
          </p>
        </div>

        {/* Numbered Sections */}
        <div className="space-y-12 text-base leading-relaxed text-white/80">
          {activeContent.sections.map((sec, idx) => (
            <section key={idx} className={`space-y-4 ${idx === activeContent.sections.length - 1 ? 'border-t border-white/10 pt-10 mt-12' : ''}`}>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {sec.heading}
              </h2>
              <p>{sec.p}</p>
              {sec.items && (
                <div className="space-y-4 pl-4 border-l-2 border-blue-500/40 my-4">
                  {sec.items.map((item, i) => (
                    <div key={i}>
                      <h3 className="font-semibold text-white">{item.sub}</h3>
                      <p className="text-white/70 text-sm mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              )}
              {sec.list && (
                <ul className="list-disc list-inside space-y-2 text-white/75 pl-2">
                  {sec.list.map((li, i) => (
                    <li key={i}>{li}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
