import { useEffect, useState } from 'react';
import { Sun, Moon, Languages, Download } from 'lucide-react';
import { CvDownloadButton } from './CvDownloadButton';
import { useLanguage, type Language } from '../lib/language';

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') {
      return true;
    }

    return localStorage.getItem('theme') !== 'light';
  });

  const navLinks = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.projects'), href: '#projects' },
    { name: t('nav.skills'), href: '#skills' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  useEffect(() => {
    document.documentElement.classList.toggle('light', !isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const chooseLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    setIsLanguageMenuOpen(false);
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl rounded-full border border-white/10 bg-surface/70 backdrop-blur-xl z-50 shadow-[0_0_40px_rgba(76,215,246,0.1)] transition-all duration-300">
      <nav className="flex justify-between items-center px-6 md:px-8 py-3 w-full">
        <span className="font-serif text-xl md:text-2xl font-bold text-primary tracking-tight">
          Siv Sann
        </span>
        
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-on-surface-variant transition-colors duration-300 font-sans hover:text-primary"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button
            type="button"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={isDark}
            onClick={() => setIsDark((current) => !current)}
            className="p-2 text-primary border border-white/80 hover:bg-surface-bright/20 rounded-full transition-all duration-300"
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            {isDark ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <div className="relative">
            <button
              type="button"
              aria-label={t('nav.switchLanguage')}
              aria-expanded={isLanguageMenuOpen}
              aria-haspopup="menu"
              onClick={() => setIsLanguageMenuOpen((current) => !current)}
              title={t('nav.switchLanguage')}
              className="relative p-2 text-primary hover:bg-surface-bright/20 rounded-full transition-all duration-300"
            >
              <Languages size={20} />
              <span className="absolute -bottom-1 -right-1 rounded-full bg-primary px-1 text-[9px] font-bold text-on-primary">
                {language === 'en' ? 'EN' : 'KM'}
              </span>
            </button>

            {isLanguageMenuOpen && (
              <div
                role="menu"
                className="absolute right-0 top-12 w-36 rounded-2xl border border-white/10 bg-surface-container-high p-2 shadow-[0_16px_40px_rgba(0,0,0,0.32)]"
              >
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={language === 'en'}
                  onClick={() => chooseLanguage('en')}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-bold text-on-surface transition-colors hover:bg-primary/10"
                >
                  English
                  <span className="text-primary">EN</span>
                </button>
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={language === 'km'}
                  onClick={() => chooseLanguage('km')}
                  className="mt-1 flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-bold text-on-surface transition-colors hover:bg-primary/10"
                >
                  Khmer
                  <span className="text-primary">KM</span>
                </button>
              </div>
            )}
          </div>
          <CvDownloadButton
            aria-label="Download CV"
            className="p-2 text-primary hover:bg-surface-bright/20 rounded-full transition-all duration-300 disabled:cursor-wait disabled:opacity-70"
          >
            <Download size={20} />
          </CvDownloadButton>
        </div>
      </nav>
    </header>
  );
}
