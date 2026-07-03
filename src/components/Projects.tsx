import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Star, Calendar, Zap, CheckCircle2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useLanguage } from '../lib/language';

interface Project {
  id: number;
  titleKey: string;
  descriptionKey: string;
  category: string;
  type: string;
  image: string;
  projectUrl?: string;
  sourceUrl?: string;
  tags: string[];
  stars: number;
  year: number;
  score: number;
  status: 'Completed' | 'In Progress';
}

const projects: Project[] = [
  {
    id: 1,
    titleKey: 'projects.uniqueRing.title',
    descriptionKey: 'projects.uniqueRing.description',
    category: "Full Stack",
    type: "Full Stack",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
    sourceUrl: "https://github.com/siv-sys/Service_Selling_Unique_Ring.git",
    tags: ['Node.js', 'Express.js', 'React.js', 'Redis', 'MySQL', 'JavaScript', 'Git', 'Jira', 'Bootstrap', 'Figma'],
    stars: 47,
    year: 2024,
    score: 98,
    status: 'Completed'
  },
  {
    id: 2,
    titleKey: 'projects.weatherDashboard.title',
    descriptionKey: 'projects.weatherDashboard.description',
    category: "Frontend",
    type: "Frontend",
    image: "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?auto=format&fit=crop&q=80&w=800",
    projectUrl: "https://mapweather.vercel.app/",
    sourceUrl: "https://github.com/sreyroth1/Weather-Project-C8.git",
    tags: ['JavaScript', 'HTML/CSS', 'SASS', 'Bootstrap', 'Git', 'Figma', 'API'],
    stars: 32,
    year: 2024,
    score: 95,
    status: 'Completed'
  },
  {
    id: 3,
    titleKey: 'projects.computerShop.title',
    descriptionKey: 'projects.computerShop.description',
    category: "Full Stack",
    type: "Full Stack",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=800",
    sourceUrl: "https://github.com/leak1415/computer-shop.git",
    tags: ['PHP', 'MySQL', 'OOP', 'HTML/CSS', 'SASS', 'API'],
    stars: 28,
    year: 2023,
    score: 92,
    status: 'Completed'
  },
  {
    id: 5,
    titleKey: 'projects.inventoryManagement.title',
    descriptionKey: 'projects.inventoryManagement.description',
    category: "Full Stack",
    type: "Full Stack",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
    sourceUrl: "https://github.com/siv-sys/Inventory_Management_System.git",
    tags: [ 'HTML/CSS', 'SASS', 'MySQL', 'Git', 'Python'],
    stars: 20,
    year: 2026,
    score: 98,
    status: 'Completed'
  },
  {
    id: 6,
    titleKey: 'projects.ecommerceStorage.title',
    descriptionKey: 'projects.ecommerceStorage.description',
    category: "Backend",
    type: "Backend",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
    sourceUrl: "https://github.com/siv-sys/Full_Stack_Laravel",
    tags: [ 'PHP', 'Laravel', 'MySQL', 'Git',],
    stars: 20,
    year: 2026,
    score: 98,
    status: 'Completed'
  }
];

const categories = ["All","UX/UI Design",  "Frontend", "Backend", "Full Stack", "Mobile"];

export function Projects() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");
  const categoryLabels: Record<string, string> = {
    All: t('projects.all'),
    'Web Apps': t('projects.webApps'),
    'Chatbot Algorithms': t('projects.chatbotAlgorithms'),
    'UX/UI Design': t('projects.uxUiDesign'),
    Frontend: t('about.frontend'),
    'Full Stack': 'Full Stack',
    Mobile: t('projects.mobile'),
  };

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory || p.type === activeCategory);

  return (
    <div className="pt-32 pb-16 px-6 max-w-[1600px] mx-auto">
      {/* Category Filter */}
      <section className="mb-12 overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex flex-nowrap justify-center gap-3 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2.5 rounded-full border text-sm font-medium transition-all duration-300",
                activeCategory === cat
                  ? "bg-primary text-on-primary border-primary shadow-[0_0_15px_rgba(76,215,246,0.4)]"
                  : "bg-surface-container-low border-outline-variant/30 text-on-surface-variant hover:border-primary/50 hover:text-on-surface"
              )}
            >
              {categoryLabels[cat] ?? cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="glass-panel rounded-3xl overflow-hidden flex flex-col hover:border-primary/30 transition-all border-white/5"
            >
              {/* Image Header */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={t(project.titleKey)}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-secondary/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 text-[10px] font-bold text-on-secondary-container">
                  <CheckCircle2 size={12} />
                  {project.status === 'Completed' ? t('projects.completed') : t('projects.inProgress')}
                </div>
                {project.type && (
                  <div className="absolute bottom-4 right-4 bg-primary/20 backdrop-blur-md px-3 py-1 rounded-lg border border-primary/30 text-[10px] font-bold text-primary italic">
                    {project.type}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl text-on-surface mb-4 font-serif">{t(project.titleKey)}</h3>
                <p className="text-on-surface-variant text-xs leading-relaxed mb-6 line-clamp-5 font-sans">
                  {t(project.descriptionKey)}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg bg-surface-variant/30 border border-white/5 text-[9px] font-mono text-on-surface uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-8 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-1.5 text-secondary">
                    <Star size={14} className="fill-secondary" />
                    <span className="text-xs font-bold text-on-surface">{project.stars}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-primary">
                    <Calendar size={14} />
                    <span className="text-xs font-bold text-on-surface">{project.year}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-tertiary">
                    <Zap size={14} className="fill-tertiary" />
                    <span className="text-xs font-bold text-on-surface">{project.score}/100</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-auto">
                  <a
                    href={project.projectUrl ?? undefined}
                    target={project.projectUrl ? "_blank" : undefined}
                    rel={project.projectUrl ? "noreferrer" : undefined}
                    aria-disabled={!project.projectUrl}
                    className={cn(
                      "flex-1 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-on-primary font-bold text-xs flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(76,215,246,0.3)]",
                      !project.projectUrl && "pointer-events-none opacity-70"
                    )}
                  >
                    <ExternalLink size={14} />
                    {t('projects.viewProject')}
                  </a>
                  <a
                    href={project.sourceUrl ?? undefined}
                    target={project.sourceUrl ? "_blank" : undefined}
                    rel={project.sourceUrl ? "noreferrer" : undefined}
                    aria-disabled={!project.sourceUrl}
                    className={cn(
                      "flex-1 py-2.5 rounded-xl border border-outline-variant/30 text-on-surface font-bold text-xs flex items-center justify-center gap-2 hover:bg-white/5 transition-all",
                      !project.sourceUrl && "pointer-events-none opacity-70"
                    )}
                  >
                    <Github size={14} />
                    {t('projects.sourceCode')}
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </section>
    </div>
  );
}
