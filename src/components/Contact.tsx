import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { MapPin, Mail, Smartphone, Globe, Send, MessageSquare, PhoneForwarded, CalendarDays } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useLanguage } from '../lib/language';

const ownerEmail = 'siv.sann@student.passerellesnumeriques.org';
const telegramBotToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const telegramChatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

export function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'sent' | 'error' | 'missing-config'>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!telegramBotToken || !telegramChatId) {
      setSubmitStatus('missing-config');
      return;
    }

    setSubmitStatus('sending');

    const text = [
      'New portfolio message',
      `Name: ${formData.name || 'Not provided'}`,
      `Email: ${formData.email || 'Not provided'}`,
      `Subject: ${formData.subject || 'Portfolio message'}`,
      `Message: ${formData.message || 'No message provided.'}`,
    ].join('\n');

    try {
      const response = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text,
        }),
      });

      if (!response.ok) {
        throw new Error('Telegram request failed.');
      }

      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitStatus('sent');
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  const contactInfo = [
    { 
      icon: <MapPin className="text-error" style={{ fill: 'currentColor', fillOpacity: 0.2 }} />, 
      title: t('contact.location'), 
      value: '371, Sen sok, Phnom Penh', 
      linkText: t('contact.viewMap'),
      href: 'https://maps.app.goo.gl/1Ya9tCPvAR6iAciK9',
      bgColor: 'bg-error/10'
    },
    { 
      icon: <Mail className="text-primary" style={{ fill: 'currentColor', fillOpacity: 0.2 }} />, 
      title: t('contact.email'), 
      value: ownerEmail,
      linkText: t('contact.sendEmail'),
      href: `mailto:${ownerEmail}`,
      bgColor: 'bg-primary/10'
    },
    { 
      icon: <Smartphone className="text-tertiary" style={{ fill: 'currentColor', fillOpacity: 0.2 }} />, 
      title: t('contact.phone'), 
      value: '+855 879 129 05', 
      linkText: t('contact.callNow'),
      href: 'tel:+855969780938',
      bgColor: 'bg-tertiary/10'
    },
    { 
      icon: <Globe className="text-secondary" style={{ fill: 'currentColor', fillOpacity: 0.2 }} />, 
      title: t('contact.social'), 
      value: t('contact.follow'), 
      linkText: t('contact.connect'),
      href: '#',
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
          {t('contact.badge')}
        </motion.div>
        <h1 className="text-6xl md:text-7xl text-primary mb-2">{t('contact.title')}</h1>
        <p className="text-on-surface-variant text-lg md:text-xl font-sans max-w-2xl mx-auto">
          {t('contact.description')}
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
              <div className="min-w-0">
                <h3 className="font-mono text-xs uppercase tracking-widest text-primary mb-1">{info.title}</h3>
                <p className="max-w-full break-all text-on-surface mb-2 font-medium leading-relaxed">{info.value}</p>
                <a href={info.href} target={info.href.startsWith('http') ? '_blank' : undefined} rel={info.href.startsWith('http') ? 'noreferrer' : undefined} className="text-secondary text-xs font-mono uppercase tracking-widest hover:underline decoration-secondary/30">
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
              <h2 className="text-3xl text-primary mb-2">{t('contact.formTitle')}</h2>
              <p className="text-on-surface-variant text-xs font-mono uppercase tracking-widest">{t('contact.formSubtitle')}</p>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="font-mono text-xs uppercase tracking-widest text-on-surface ml-1 opacity-80">{t('contact.fullName')}</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
                    placeholder={t('contact.fullNamePlaceholder')}
                    className="w-full bg-surface-variant/10 border-outline-variant/30 rounded-2xl py-4 px-6 text-on-surface outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all placeholder:text-on-surface-variant/40"
                  />
                </div>
                <div className="space-y-3">
                  <label className="font-mono text-xs uppercase tracking-widest text-on-surface ml-1 opacity-80">{t('contact.emailAddress')}</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                    placeholder={t('contact.emailPlaceholder')}
                    className="w-full bg-surface-variant/10 border-outline-variant/30 rounded-2xl py-4 px-6 text-on-surface outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all placeholder:text-on-surface-variant/40"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="font-mono text-xs uppercase tracking-widest text-on-surface ml-1 opacity-80">{t('contact.subject')}</label>
                <select
                  value={formData.subject}
                  onChange={(event) => setFormData((current) => ({ ...current, subject: event.target.value }))}
                  className="w-full bg-surface-variant/10 border-outline-variant/30 rounded-2xl py-4 px-6 text-on-surface outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all appearance-none cursor-pointer"
                >
                  <option value="" className="bg-surface">{t('contact.selectSubject')}</option>
                  <option value="Project Inquiry" className="bg-surface">{t('contact.projectInquiry')}</option>
                  <option value="Collaboration" className="bg-surface">{t('contact.collaboration')}</option>
                  <option value="Saying Hello" className="bg-surface">{t('contact.sayingHello')}</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="font-mono text-xs uppercase tracking-widest text-on-surface ml-1 opacity-80">{t('contact.message')}</label>
                <textarea 
                  rows={5}
                  value={formData.message}
                  onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))}
                  placeholder={t('contact.messagePlaceholder')}
                  className="w-full bg-surface-variant/10 border-outline-variant/30 rounded-2xl py-4 px-6 text-on-surface outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all placeholder:text-on-surface-variant/40 resize-none"
                />
              </div>

              <button 
                type="submit"
                disabled={submitStatus === 'sending'}
                className="w-full py-5 rounded-2xl bg-gradient-to-r from-primary to-secondary text-on-primary font-bold font-mono text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(76,215,246,0.2)] hover:shadow-[0_0_30px_rgba(76,215,246,0.4)] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                <Send size={18} />
                {submitStatus === 'sending' ? t('contact.sending') : t('contact.sendMessage')}
              </button>
              {submitStatus !== 'idle' && (
                <p className="text-center text-sm font-medium text-on-surface-variant">
                  {submitStatus === 'sent' && t('contact.sent')}
                  {submitStatus === 'error' && t('contact.failed')}
                  {submitStatus === 'missing-config' && t('contact.notConfigured')}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      {/* Quick Actions */}
      <section className="mt-24 text-center">
        <h2 className="text-4xl text-primary mb-12 italic">{t('contact.quickActions')}</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { icon: <MessageSquare size={20} />, label: t('contact.emailMe'), color: 'text-tertiary', bgColor: 'bg-tertiary/10' },
            { icon: <PhoneForwarded size={20} />, label: t('contact.callMe'), color: 'text-secondary', bgColor: 'bg-secondary/10' },
            { icon: <CalendarDays size={20} />, label: t('contact.scheduleCall'), color: 'text-primary', bgColor: 'bg-primary/10' },
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
