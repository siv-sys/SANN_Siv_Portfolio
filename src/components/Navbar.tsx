import { useEffect, useState } from 'react';
import { Sun, Moon, Languages, Download } from 'lucide-react';
import { CvDownloadButton } from './CvDownloadButton';

export function Navbar() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') {
      return true;
    }

    return localStorage.getItem('theme') !== 'light';
  });

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    document.documentElement.classList.toggle('light', !isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

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
          <button className="p-2 text-primary hover:bg-surface-bright/20 rounded-full transition-all duration-300">
            <Languages size={20} />
          </button>
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
