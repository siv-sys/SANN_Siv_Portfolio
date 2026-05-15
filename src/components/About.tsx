import React from 'react';
import { motion } from 'motion/react';
import { FileText, Rocket, Star, Coffee, Target, Lightbulb, Users, Diamond } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { CvDownloadButton } from './CvDownloadButton';
import { useLanguage } from '../lib/language';

const profileImage = new URL('../images/Siv Sann.png', import.meta.url).href;
const resumeUrl = '/resume/siv_resume.pdf';
const resumeFileName = 'siv_resume.pdf';

export function About() {
  const { t } = useLanguage();
  const stats = [
    { icon: <Rocket size={20} />, value: '25+', label: t('about.projects'), color: 'text-primary' },
    { icon: <Star size={20} />, value: '3+', label: t('about.yearsExp'), color: 'text-secondary' },
    { icon: <Coffee size={20} />, value: '1000+', label: t('about.coffees'), color: 'text-tertiary' },
    { icon: <Target size={20} />, value: '98%', label: t('about.success'), color: 'text-error' },
  ];

  return (
    <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-1.5 rounded-full glass-panel text-secondary text-sm font-mono mb-4"
        >
          {t('about.badge')}
        </motion.div>
        <h1 className="text-6xl md:text-7xl">
          {t('about.titleA')} <span className="text-secondary italic font-serif">{t('about.titleB')}</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="md:col-span-4 glass-panel p-8 rounded-3xl flex flex-col items-center text-center hover:border-primary/40 transition-colors group"
        >
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/50 mb-6 group-hover:scale-110 transition-transform">
            <img 
               alt="Siv Sann" 
               className="w-full h-full object-cover" 
               src={profileImage} 
               referrerPolicy="no-referrer"
            />
          </div>
          <h3 className="text-2xl text-on-surface mb-1">Siv Sann</h3>
          <p className="text-primary font-mono text-sm mb-6">{t('about.role')}</p>
          <div className="flex items-center gap-2 text-secondary mb-8">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider">{t('about.available')}</span>
          </div>
          <div className="w-full text-left space-y-4">
            <h4 className="font-bold text-on-surface text-sm uppercase tracking-widest font-mono">{t('about.profileTitle')}</h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              {t('about.profileText')}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {['Vue.js', 'PHP', 'MySQL'].map(tag => (
                <span key={tag} className="px-2 py-1 rounded glass-panel text-[10px] uppercase tracking-wider font-mono text-primary">{tag}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Technical Skills Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-4 glass-panel p-8 rounded-3xl flex flex-col hover:border-secondary/40 transition-colors group"
        >
          <h3 className="text-2xl text-on-surface mb-2">{t('about.skillsTitle')}</h3>
          <p className="text-on-surface-variant text-sm mb-8 font-sans">{t('about.skillsSubtitle')}</p>
          
          <div className="space-y-6 mb-8 group">
            {[
              { label: t('about.frontend'), value: 90, color: 'bg-primary' },
              { label: t('about.backend'), value: 85, color: 'bg-secondary' },
              { label: t('about.database'), value: 75, color: 'bg-tertiary' }
            ].map(skill => (
              <div key={skill.label} className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-on-surface-variant uppercase">{skill.label}</span>
                  <span className="text-on-surface">{skill.value}%</span>
                </div>
                <div className="h-1.5 w-full bg-surface-bright/50 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.value}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={cn("h-full rounded-full group-hover:shadow-[0_0_10px_currentColor]", skill.color)} 
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto space-y-4">
            <h4 className="font-bold text-on-surface text-sm uppercase tracking-widest font-mono">{t('about.experienceTitle')}</h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              {t('about.experienceText')}
            </p>
          </div>
        </motion.div>

        {/* Achievements Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-4 glass-panel p-8 rounded-3xl flex flex-col hover:border-tertiary/40 transition-colors"
        >
          <h3 className="text-2xl text-on-surface mb-2">{t('about.achievements')}</h3>
          <p className="text-on-surface-variant text-sm mb-8 font-sans">{t('about.achievementsSubtitle')}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            {stats.map((stat, i) => (
              <div key={i} className="p-4 rounded-2xl bg-surface-variant/20 border border-white/5 flex flex-col items-center text-center">
                <span className={cn("mb-2", stat.color)}>{stat.icon}</span>
                <div className="text-xl font-bold text-on-surface font-mono">{stat.value}</div>
                <div className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-auto space-y-4">
            <h4 className="font-bold text-on-surface text-sm uppercase tracking-widest font-mono">{t('about.philosophy')}</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Lightbulb size={16} className="text-primary shrink-0" />
                <p className="text-[12px] text-on-surface-variant font-sans">{t('about.philosophyOne')}</p>
              </div>
              <div className="flex gap-3">
                <Users size={16} className="text-secondary shrink-0" />
                <p className="text-[12px] text-on-surface-variant font-sans">{t('about.philosophyTwo')}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Small Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="md:col-span-6 glass-panel p-8 rounded-3xl flex items-center justify-between group hover:border-primary/40 transition-colors"
        >
          <div className="flex items-center gap-6">
            <div className="p-4 rounded-2xl bg-primary/20 text-primary relative">
              <div className="absolute -top-1 -right-2 bg-primary text-on-primary text-[10px] px-1.5 py-0.5 rounded font-bold">2.4 MB</div>
              <FileText size={40} />
            </div>
            <div>
              <h3 className="text-xl text-on-surface mb-1">{t('about.resume')}</h3>
              <p className="text-on-surface-variant text-sm font-sans">{t('about.resumeSubtitle')}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <CvDownloadButton
              ariaLabel="Download resume"
              className="px-4 py-2 rounded-full glass-panel text-[10px] font-bold uppercase text-primary hover:bg-primary hover:text-on-primary transition-all disabled:cursor-wait disabled:opacity-70"
              fileUrl={resumeUrl}
              fileName={resumeFileName}
              title={t('download.resumeTitle')}
              iconLabel="R"
            >
              {t('common.download')}
            </CvDownloadButton>
            <a href={resumeUrl} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-full glass-panel text-[10px] font-bold uppercase text-on-surface hover:bg-white/10 transition-all">{t('common.view')}</a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="md:col-span-6 glass-panel p-8 rounded-3xl flex items-center justify-between group hover:border-tertiary/40 transition-colors"
        >
          <div className="flex items-center gap-6">
            <div className="flex -space-x-4">
              <div className="w-10 h-10 rounded-full border-2 border-surface glass-panel flex items-center justify-center"><Lightbulb size={20} className="text-tertiary" /></div>
              <div className="w-10 h-10 rounded-full border-2 border-surface glass-panel flex items-center justify-center"><Diamond size={20} className="text-secondary" /></div>
            </div>
            <div>
              <h3 className="text-xl text-on-surface mb-1">{t('about.coreValues')}</h3>
              <p className="text-on-surface-variant text-sm font-sans">{t('about.coreValuesSubtitle')}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {[t('about.innovation'), t('about.quality')].map(v => (
              <span key={v} className="px-3 py-1 rounded glass-panel text-[10px] font-mono uppercase text-tertiary">{v}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
