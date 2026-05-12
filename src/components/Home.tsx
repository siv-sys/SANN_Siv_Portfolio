import React from 'react';
import { motion } from 'motion/react';
import { Code, Terminal, Globe, Share2 } from 'lucide-react';
import { CvDownloadButton } from './CvDownloadButton';

const profileImage = new URL('../images/Siv Sann.png', import.meta.url).href;

export function Home() {
  const techStack = ['TypeScript', 'React.js', 'Tailwind', 'Node.js'];

  return (
    <div className="relative min-h-screen pt-32 overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 order-2 lg:order-1 text-center lg:text-left"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass-panel text-primary text-sm font-mono mb-6 border-primary/20">
            Hi, I'm
          </span>
          <h1 className="text-6xl md:text-8xl text-on-surface mb-2">
            Siv Sann
          </h1>
          <h2 className="text-3xl md:text-4xl text-primary mb-8 font-serif">
            Web Developer
          </h2>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-xl mb-10 mx-auto lg:mx-0 leading-relaxed">
            Crafting high-performance web applications with precision. I build fast, scalable, and secure full-stack solutions using modern technologies.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
            {techStack.map((tech) => (
              <div key={tech} className="px-4 py-1.5 rounded-lg glass-panel border-outline-variant/30 text-sm font-mono text-secondary">
                {tech}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
            <a href="#projects" className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-on-primary font-bold shadow-[0_0_20px_rgba(76,215,246,0.3)] hover:shadow-[0_0_30px_rgba(76,215,246,0.5)] transition-all duration-300 transform hover:scale-105 active:scale-95">
              View My Work
            </a>
            <CvDownloadButton className="px-8 py-3 rounded-full border border-primary/40 hover:bg-primary/10 transition-all duration-300 text-primary font-bold disabled:cursor-wait disabled:opacity-70">
              Download CV
            </CvDownloadButton>
            <div className="flex gap-4 ml-0 lg:ml-6 mt-4 sm:mt-0">
              <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full glass-panel border-outline-variant/30 text-on-surface-variant hover:text-primary transition-all">
                <Globe size={20} />
              </a>
              <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full glass-panel border-outline-variant/30 text-on-surface-variant hover:text-primary transition-all">
                <Share2 size={20} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Profile Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="order-1 lg:order-2 flex justify-center lg:justify-end relative"
        >
          <div className="relative w-80 h-80 md:w-[500px] md:h-[500px]">
            {/* Aurora Frame */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary via-secondary/20 to-tertiary animate-pulse blur-md opacity-30" />
            <div className="absolute inset-2 rounded-full border-2 border-white/20 z-0 shadow-[0_0_80px_10px_rgba(76,215,246,0.2)]" />
            
            {/* Main Image */}
            <div className="absolute inset-6 rounded-full overflow-hidden border-4 border-white/5 z-10">
              <img 
                alt="Siv Sann" 
                className="w-full h-full object-cover" 
                src={profileImage} 
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Floating Tech Icons */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-10 right-0 w-16 h-16 rounded-2xl glass-panel flex items-center justify-center z-20 shadow-xl border-white/10"
            >
              <Code className="text-primary" size={32} />
            </motion.div>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute bottom-10 -left-4 w-14 h-14 rounded-2xl glass-panel flex items-center justify-center z-20 shadow-xl border-white/10"
            >
              <Terminal className="text-secondary" size={28} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
