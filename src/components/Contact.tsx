import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Mail, Smartphone, Globe, Send, MessageSquare, PhoneForwarded, CalendarDays } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function Contact() {
  const contactInfo = [
    { 
      icon: <MapPin className="text-error" style={{ fill: 'currentColor', fillOpacity: 0.2 }} />, 
      title: 'Location', 
      value: '371, Sen sok, Phnom Penh', 
      linkText: 'View on Map',
      bgColor: 'bg-error/10'
    },
    { 
      icon: <Mail className="text-primary" style={{ fill: 'currentColor', fillOpacity: 0.2 }} />, 
      title: 'Email', 
      value: 'neaksinu752@email.com', 
      linkText: 'Send Email',
      bgColor: 'bg-primary/10'
    },
    { 
      icon: <Smartphone className="text-tertiary" style={{ fill: 'currentColor', fillOpacity: 0.2 }} />, 
      title: 'Phone', 
      value: '+855 969780938', 
      linkText: 'Call Now',
      bgColor: 'bg-tertiary/10'
    },
    { 
      icon: <Globe className="text-secondary" style={{ fill: 'currentColor', fillOpacity: 0.2 }} />, 
      title: 'Social Media', 
      value: 'Follow my journey', 
      linkText: 'Connect',
      bgColor: 'bg-secondary/10'
    },
  ];

  return (
    <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
      <header className="text-center mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-mono mb-4"
        >
          Get In Touch
        </motion.div>
        <h1 className="text-6xl md:text-7xl text-primary mb-2">Contact Me</h1>
        <p className="text-on-surface-variant text-lg md:text-xl font-sans max-w-2xl mx-auto">
          Let's discuss your next project and bring your ideas to life.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Info Cards */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          {contactInfo.map((info, i) => (
            <motion.div 
              key={info.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel inner-glow p-8 rounded-3xl flex items-start gap-6 hover:border-primary/30 transition-all group"
            >
              <div className={cn("p-4 rounded-2xl shrink-0", info.bgColor)}>
                {info.icon}
              </div>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-primary mb-1">{info.title}</h3>
                <p className="text-on-surface mb-2 font-medium">{info.value}</p>
                <a href="#" className="text-secondary text-xs font-mono uppercase tracking-widest hover:underline decoration-secondary/30">
                  {info.linkText}
                </a>
              </div>
            </motion.div>
          ))}
        </aside>

        {/* Contact Form */}
        <div className="lg:col-span-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass-panel inner-glow p-10 md:p-12 rounded-[2.5rem]"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl text-primary mb-2">Send me a message</h2>
              <p className="text-on-surface-variant text-xs font-mono uppercase tracking-widest">I'll get back to you within 24 hours</p>
            </div>

            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="font-mono text-xs uppercase tracking-widest text-on-surface ml-1 opacity-80">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your full name"
                    className="w-full bg-surface-variant/10 border-outline-variant/30 rounded-2xl py-4 px-6 text-on-surface outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all placeholder:text-on-surface-variant/40"
                  />
                </div>
                <div className="space-y-3">
                  <label className="font-mono text-xs uppercase tracking-widest text-on-surface ml-1 opacity-80">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="Enter your email address"
                    className="w-full bg-surface-variant/10 border-outline-variant/30 rounded-2xl py-4 px-6 text-on-surface outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all placeholder:text-on-surface-variant/40"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="font-mono text-xs uppercase tracking-widest text-on-surface ml-1 opacity-80">Subject</label>
                <select className="w-full bg-surface-variant/10 border-outline-variant/30 rounded-2xl py-4 px-6 text-on-surface outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all appearance-none cursor-pointer">
                  <option className="bg-surface">Select a subject</option>
                  <option className="bg-surface">Project Inquiry</option>
                  <option className="bg-surface">Collaboration</option>
                  <option className="bg-surface">Saying Hello</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="font-mono text-xs uppercase tracking-widest text-on-surface ml-1 opacity-80">Message</label>
                <textarea 
                  rows={5}
                  placeholder="Tell me about your project or how I can help you..."
                  className="w-full bg-surface-variant/10 border-outline-variant/30 rounded-2xl py-4 px-6 text-on-surface outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all placeholder:text-on-surface-variant/40 resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-5 rounded-2xl bg-gradient-to-r from-primary to-secondary text-on-primary font-bold font-mono text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(76,215,246,0.2)] hover:shadow-[0_0_30px_rgba(76,215,246,0.4)] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Quick Actions */}
      <section className="mt-24 text-center">
        <h2 className="text-4xl text-primary mb-12 italic">Quick Actions</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { icon: <MessageSquare size={20} />, label: 'Email Me', color: 'text-tertiary', bgColor: 'bg-tertiary/10' },
            { icon: <PhoneForwarded size={20} />, label: 'Call Me', color: 'text-secondary', bgColor: 'bg-secondary/10' },
            { icon: <CalendarDays size={20} />, label: 'Schedule Call', color: 'text-primary', bgColor: 'bg-primary/10' },
          ].map((action, i) => (
            <motion.button 
              key={action.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel inner-glow px-10 py-5 rounded-3xl flex items-center gap-4 hover:bg-surface-variant/30 transition-all duration-300 min-w-[220px] justify-center group"
            >
              <div className={cn("p-2.5 rounded-xl transition-transform group-hover:scale-110", action.bgColor, action.color)}>
                {action.icon}
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-on-surface">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  );
}
