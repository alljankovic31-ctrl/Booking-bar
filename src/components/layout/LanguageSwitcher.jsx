import React, { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const languages = [
  { code: 'sr', label: 'Srpski', flag: '🇷🇸' },
  { code: 'src', label: 'Српски', flag: '🇷🇸' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = languages.find(l => l.code === lang);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-all duration-200 text-xs font-semibold tracking-wider"
        title="Change language"
      >
        <Globe size={14} />
        <span>{current.flag}</span>
        <span className="hidden sm:inline uppercase">{current.code}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-40 glass-gold rounded-xl overflow-hidden shadow-xl z-50 border border-primary/20">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150 ${
                lang === l.code
                  ? 'bg-primary/20 text-primary font-semibold'
                  : 'text-foreground/70 hover:bg-primary/10 hover:text-primary'
              }`}
            >
              <span>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}