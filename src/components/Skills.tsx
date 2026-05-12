import React from 'react';
import { motion } from 'motion/react';
import { Palette, Terminal, Database, Wrench, Layout, Cpu, Database as DbIcon, Code2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function Skills() {
  const categories = [
    { name: 'All', icon: <Terminal size={18} />, count: 8 },
    { name: 'Frontend', icon: <Palette size={18} />, count: 4 },
    { name: 'Backend', icon: <Cpu size={18} />, count: 2 },
    { name: 'Database', icon: <Database size={18} />, count: 1 },
    { name: 'Tools', icon: <Wrench size={18} />, count: 1 },
  ];

  const skillCards = [
    {
      title: 'HTML5',
      category: 'Frontend',
      expertise: 95,
      icon: <Layout className="text-white" size={48} />,
      gradient: 'from-[#FF6B35] to-[#0b1326]',
      tags: ['Semantic', 'Accessibility', 'SEO'],
      exp: '3 years exp.'
    },
    {
      title: 'CSS3 & SCSS',
      category: 'Frontend',
      expertise: 90,
      icon: <Palette className="text-white" size={48} />,
      gradient: 'from-[#2D9CDB] to-[#0b1326]',
      tags: ['Responsive', 'Animations', 'Flexbox'],
      exp: '4 years exp.'
    },
    {
      title: 'JavaScript',
      category: 'Frontend',
      expertise: 88,
      icon: <Code2 className="text-white" size={48} />,
      gradient: 'from-[#F2C94C] to-[#0b1326]',
      tags: ['ES6+', 'DOM', 'Async'],
      exp: '3 years exp.'
    },
    {
      title: 'Vue.js',
      category: 'Frontend',
      expertise: 92,
      icon: <Layout className="text-white" size={48} />,
      gradient: 'from-[#27AE60] to-[#0b1326]',
      tags: ['Reactive', 'SPA', 'Vuex'],
      exp: '3 years exp.'
    },
    {
      title: 'PHP',
      category: 'Backend',
      expertise: 85,
      icon: <Terminal className="text-white" size={48} />,
      gradient: 'from-[#9B51E0] to-[#0b1326]',
      tags: ['Laravel', 'APIs', 'MVC'],
      exp: '2 years exp.'
    },
    {
      title: 'MySQL',
      category: 'Database',
      expertise: 80,
      icon: <DbIcon className="text-white" size={48} />,
      gradient: 'from-[#00758F] to-[#0b1326]',
      tags: ['Relational', 'Optimization', 'SQL'],
      exp: '2 years exp.'
    },
  ];

  return (
    <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
      <header className="text-center mb-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-mono text-xs mb-6"
        >
          Technical Expertise
        </motion.div>
        <h1 className="text-6xl md:text-7xl text-on-surface mb-4">My Skills</h1>
        <p className="text-on-surface-variant max-w-2xl mx-auto text-lg md:text-xl font-sans">
          A collection of technologies I've mastered to build high-performance, accessible, and beautiful digital experiences.
        </p>
      </header>

      {/* Filter Tabs */}
      <section className="mb-16 overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex flex-nowrap justify-center gap-4 min-w-max">
          {categories.map((cat, i) => (
            <button 
              key={cat.name}
              className={cn(
                "flex flex-col items-center gap-2 px-8 py-4 rounded-2xl border transition-all duration-300 min-w-[120px]",
                i === 0 
                  ? "border-primary/50 bg-surface-container-high text-primary" 
                  : "border-outline-variant/30 bg-surface-container-low text-on-surface-variant hover:border-primary/50 hover:text-on-surface"
              )}
            >
              {cat.icon}
              <span className="font-mono text-sm uppercase tracking-wider">{cat.name}</span>
              <span className="text-[10px] opacity-60">{cat.count} skills</span>
            </button>
          ))}
        </div>
      </section>

      {/* Skill Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCards.map((skill, index) => (
          <motion.article 
            key={skill.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-panel rounded-3xl overflow-hidden group hover:border-primary/40 transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
          >
            <div className={cn("h-48 bg-gradient-to-br p-8 flex flex-col justify-center items-center relative", skill.gradient)}>
              <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-white uppercase tracking-widest">{skill.category}</div>
              <div className="group-hover:scale-110 transition-transform duration-500">
                {skill.icon}
              </div>
              <div className="w-full max-w-[220px] mt-8">
                <div className="flex justify-between text-[10px] font-mono text-white/80 mb-2 uppercase tracking-widest">
                  <span>Expertise</span>
                  <span>{skill.expertise}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.expertise}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                    className="h-full bg-white shadow-[0_0_10px_white] rounded-full" 
                  />
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <h3 className="text-2xl text-on-surface mb-2 tracking-tight">{skill.title}</h3>
              <p className="text-on-surface-variant text-sm mb-6 leading-relaxed font-sans">
                Mastering modern web architectural principles to deliver clean and maintainable code bases.
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
