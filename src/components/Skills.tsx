import React, { type CSSProperties, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Palette, Terminal, Database, Wrench, Layout, Cpu, Database as DbIcon, Code2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useLanguage } from '../lib/language';

export function Skills() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');

  const skillCards = [
    {
      title: 'HTML5',
      category: 'Frontend',
      expertise: 95,
      logoLabel: 'HTML',
      logoSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      accent: '#ff6b35',
      accentStrong: '#e34f26',
      icon: <Code2 size={24} />,
      tags: [t('skills.semantic'), t('skills.accessibility'), 'SEO'],
      exp: t('skills.years3')
    },
    {
      title: 'CSS3 & SCSS',
      category: 'Frontend',
      expertise: 90,
      logoLabel: 'CSS',
      logoSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      accent: '#2d9cdb',
      accentStrong: '#1572b6',
      icon: <Palette size={24} />,
      tags: [t('skills.responsive'), t('skills.animations'), 'Flexbox'],
      exp: t('skills.years4')
    },
    {
      title: 'JavaScript',
      category: 'Frontend',
      expertise: 88,
      logoLabel: 'JS',
      logoSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      accent: '#f2c94c',
      accentStrong: '#f0b90b',
      icon: <Code2 size={24} />,
      tags: ['ES6+', 'DOM', 'Async'],
      exp: t('skills.years3')
    },
    {
      title: 'Vue.js',
      category: 'Frontend',
      expertise: 92,
      logoLabel: 'VUE',
      logoSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
      accent: '#42d392',
      accentStrong: '#27ae60',
      icon: <Layout size={24} />,
      tags: ['Reactive', 'SPA', 'Vuex'],
      exp: t('skills.years3')
    },
    {
      title: 'React',
      category: 'Frontend',
      expertise: 88,
      logoLabel: 'REACT',
      logoSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      accent: '#61dafb',
      accentStrong: '#149eca',
      icon: <Layout size={24} />,
      tags: ['Components', 'Hooks', 'SPA'],
      exp: t('skills.years3')
    },
    {
      title: 'PHP',
      category: 'Backend',
      expertise: 85,
      logoLabel: 'PHP',
      logoSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
      accent: '#9b51e0',
      accentStrong: '#6f42c1',
      icon: <Terminal size={24} />,
      tags: ['Laravel', 'APIs', 'MVC'],
      exp: t('skills.years2')
    },
    {
      title: 'Laravel',
      category: 'Backend',
      expertise: 84,
      logoLabel: 'LARAVEL',
      logoSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg',
      accent: '#ff5a45',
      accentStrong: '#ff2d20',
      icon: <Terminal size={24} />,
      tags: ['MVC', 'Eloquent', 'APIs'],
      exp: t('skills.years2')
    },
    {
      title: 'Node.js',
      category: 'Backend',
      expertise: 82,
      logoLabel: 'NODE',
      logoSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      accent: '#6cc24a',
      accentStrong: '#3c873a',
      icon: <Cpu size={24} />,
      tags: ['Express', 'REST', 'Services'],
      exp: t('skills.years2')
    },
    {
      title: 'MySQL',
      category: 'Database',
      expertise: 80,
      logoLabel: 'SQL',
      logoSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      accent: '#00a6c8',
      accentStrong: '#00758f',
      icon: <DbIcon size={24} />,
      tags: [t('skills.relational'), t('skills.optimization'), 'SQL'],
      exp: t('skills.years2')
    },
    {
      title: 'SQLite',
      category: 'Database',
      expertise: 78,
      logoLabel: 'SQLITE',
      logoSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg',
      accent: '#3f9ad6',
      accentStrong: '#0f80cc',
      icon: <DbIcon size={24} />,
      tags: ['Embedded', 'Local DB', 'SQL'],
      exp: t('skills.years2')
    },
    {
      title: 'Git & GitHub',
      category: 'Tools',
      expertise: 86,
      logoLabel: 'GIT',
      logoSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      accent: '#f06a3f',
      accentStrong: '#f1502f',
      icon: <Wrench size={24} />,
      tags: ['Versioning', 'Branches', 'Workflow'],
      exp: t('skills.years3')
    },
    {
      title: 'Docker',
      category: 'Tools',
      expertise: 78,
      logoLabel: 'DOCKER',
      logoSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      accent: '#2496ed',
      accentStrong: '#0db7ed',
      icon: <Wrench size={24} />,
      tags: ['Containers', 'Images', 'Deploy'],
      exp: t('skills.years2')
    },
    {
      title: 'Jira',
      category: 'Tools',
      expertise: 82,
      logoLabel: 'JIRA',
      logoSrc: 'https://cdn.simpleicons.org/jira/0052CC',
      accent: '#2684ff',
      accentStrong: '#0052cc',
      icon: <Wrench size={24} />,
      tags: ['Agile', 'Sprints', 'Tracking'],
      exp: t('skills.years2')
    },
    {
      title: 'Power BI',
      category: 'Tools',
      expertise: 76,
      logoLabel: 'POWER BI',
      logoSrc: '/logos/power-bi.svg',
      accent: '#f2c811',
      accentStrong: '#d9a300',
      icon: <Wrench size={24} />,
      tags: ['Reports', 'Dashboards', 'Data'],
      exp: t('skills.years2')
    },
  ];

  const categories = useMemo(() => {
    const categoryMeta = [
      { key: 'All', name: t('skills.all'), icon: <Terminal size={18} /> },
      { key: 'Frontend', name: t('about.frontend'), icon: <Palette size={18} /> },
      { key: 'Backend', name: t('about.backend'), icon: <Cpu size={18} /> },
      { key: 'Database', name: t('about.database'), icon: <Database size={18} /> },
      { key: 'Tools', name: t('skills.tools'), icon: <Wrench size={18} /> },
    ];

    return categoryMeta.map((category) => ({
      ...category,
      count: category.key === 'All'
        ? skillCards.length
        : skillCards.filter((skill) => skill.category === category.key).length,
    }));
  }, [skillCards, t]);

  const filteredSkills = activeCategory === 'All'
    ? skillCards
    : skillCards.filter((skill) => skill.category === activeCategory);

  return (
    <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
      <header className="text-center mb-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-mono text-xs mb-6"
        >
          {t('skills.badge')}
        </motion.div>
        <h1 className="text-6xl md:text-7xl text-on-surface mb-4">{t('skills.title')}</h1>
        <p className="text-on-surface-variant max-w-2xl mx-auto text-lg md:text-xl font-sans">
          {t('skills.description')}
        </p>
      </header>

      {/* Filter Tabs */}
      <section className="mb-16 overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex flex-nowrap justify-center gap-4 min-w-max">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;

            return (
            <button 
              key={cat.key}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveCategory(cat.key)}
              className={cn(
                "flex flex-col items-center gap-2 px-8 py-4 rounded-2xl border transition-all duration-200 min-w-[120px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                isActive 
                  ? "border-primary/50 bg-surface-container-high text-primary shadow-[0_0_24px_rgba(76,215,246,0.12)]" 
                  : "border-outline-variant/30 bg-surface-container-low text-on-surface-variant hover:border-primary/50 hover:text-on-surface"
              )}
            >
              {cat.icon}
              <span className="font-mono text-sm uppercase tracking-wider">{cat.name}</span>
              <span className="text-[10px] opacity-60">{cat.count} {t('skills.skills')}</span>
            </button>
          )})}
        </div>
      </section>

      {/* Skill Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSkills.map((skill, index) => (
          <motion.article 
            key={skill.title}
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25, delay: index * 0.04 }}
            className="glass-panel rounded-3xl overflow-hidden group hover:border-primary/40 transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
          >
            <div
              className="h-52 overflow-hidden p-6 flex flex-col justify-end relative"
              style={{
                background: `linear-gradient(135deg, ${skill.accent} 0%, ${skill.accentStrong} 48%, #ffd166 130%)`,
                '--skill-accent': skill.accent,
                '--skill-accent-strong': skill.accentStrong,
              } as CSSProperties}
            >
              <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_12px_12px,white_1.5px,transparent_2px)] bg-[length:18px_18px]" />
              <div className="absolute -left-12 bottom-2 h-36 w-36 rounded-full bg-white/20" />
              <div className="absolute right-[-36px] top-10 h-40 w-40 rounded-full bg-white/10" />
              <div className="absolute left-24 top-10 h-16 w-44 rounded-2xl bg-white/20 blur-sm" />
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-mono font-bold text-white uppercase tracking-widest shadow-sm">
                {skill.category}
              </div>

              <div className="absolute left-8 top-12 flex items-center gap-4 transition-transform duration-500 group-hover:-translate-y-1">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-white shadow-[0_14px_28px_rgba(15,23,42,0.22)]">
                  <img
                    src={skill.logoSrc}
                    alt={`${skill.title} logo`}
                    className="h-16 w-16 object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="max-w-[150px]">
                  <span className="mb-2 inline-flex rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-white backdrop-blur-md">
                    {skill.logoLabel}
                  </span>
                  <h3 className="font-sans text-2xl font-black leading-tight text-white drop-shadow-[0_2px_8px_rgba(15,23,42,0.24)]">
                    {skill.title}
                  </h3>
                </div>
              </div>

              <div className="absolute right-8 top-28 hidden h-20 w-32 rounded-xl bg-surface-container/70 p-3 shadow-[0_14px_28px_rgba(15,23,42,0.2)] backdrop-blur-md sm:block">
                <div className="mb-3 flex gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
                </div>
                <div className="space-y-2">
                  <span className="block h-1.5 w-16 rounded-full bg-white/70" />
                  <span className="block h-1.5 w-24 rounded-full bg-white/45" />
                  <span className="block h-1.5 w-12 rounded-full bg-white/55" />
                </div>
              </div>

              <div className="absolute right-16 top-16 flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-md">
                {skill.icon}
              </div>

              <div className="relative z-10 w-full max-w-[230px]">
                <div className="flex justify-between text-[10px] font-mono text-white/80 mb-2 uppercase tracking-widest">
                  <span>{t('skills.expertise')}</span>
                  <span>{skill.expertise}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.expertise}%` }}
                    transition={{ duration: 0.45, delay: index * 0.04 + 0.15 }}
                    className="h-full bg-white shadow-[0_0_10px_white] rounded-full" 
                  />
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <h3 className="text-2xl text-on-surface mb-2 tracking-tight">{skill.title}</h3>
              <p className="text-on-surface-variant text-sm mb-6 leading-relaxed font-sans">
                {t('skills.cardText')}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {skill.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-surface-variant/40 text-[10px] font-mono font-medium text-on-surface uppercase tracking-wider">{tag}</span>
                ))}
              </div>
              <div className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest">{skill.exp}</div>
            </div>
          </motion.article>
        ))}
      </section>
    </div>
  );
}
