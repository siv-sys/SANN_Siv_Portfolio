import React from 'react';
import { useLanguage } from '../lib/language';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/sann-siv-5a9153376/' },
    { name: 'GitHub', href: 'https://github.com/siv-sys' },
    { name: 'Twitter', href: '#' },
    { name: 'Email', href: '#' },
    { name: t('footer.privacy'), href: '#' },
  ];

  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/30 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8 md:py-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-serif text-2xl text-primary font-bold">Siv Sann</span>
          <p className="text-on-surface-variant text-sm md:text-base text-center md:text-left font-sans">
            &copy; {currentYear} Siv Sann. {t('footer.built')}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-on-surface-variant hover:text-secondary transition-colors duration-300 text-sm font-medium font-sans"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
