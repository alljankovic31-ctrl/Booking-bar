import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, Crown } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
export default function HeroSection() {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background z-10" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 30% 20%, rgba(201,168,76,0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(201,168,76,0.08) 0%, transparent 50%)',
          }}
        />
        {/* Floating orbs */}
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-primary/3 blur-3xl"
        />
      </div>

      {/* ── Decorative floating images ── */}

      {/* Flamingo – top right */}
      <motion.div
        className="absolute top-20 right-4 sm:right-12 lg:right-20 z-20 pointer-events-none select-none"
        animate={{ y: [0, -18, 0], rotate: [0, 6, -6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{ fontSize: '7rem', lineHeight: 1 }}
      >
        🦩
      </motion.div>

      {/* Shark – bottom left */}
      <motion.div
        className="absolute bottom-24 left-4 sm:left-12 lg:left-20 z-20 pointer-events-none select-none"
        animate={{ y: [0, 14, 0], x: [0, 8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        style={{ fontSize: '7rem', lineHeight: 1 }}
      >
        🦈
      </motion.div>

      {/* Pineapple – bottom right */}
      <motion.div
        className="absolute bottom-16 right-4 sm:right-14 lg:right-24 z-20 pointer-events-none select-none"
        animate={{ y: [0, -14, 0], rotate: [0, -5, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{ fontSize: '6rem', lineHeight: 1 }}
      >
        🍍
      </motion.div>

      {/* ── Main content ── */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto pt-24 sm:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h1 className="font-heading font-bold mb-2 leading-none" style={{ fontSize: 'clamp(3rem, 10vw, 7rem)' }}>
            <span className="text-gold-gradient">Ananasa Tri</span>
          </h1>
          <h2 className="font-heading font-light mb-3 text-primary/80 tracking-[0.2em] uppercase" style={{ fontSize: 'clamp(1rem, 2.5vw, 2rem)' }}>
            {t('heroSubtitle')}
          </h2>
          <p className="text-muted-foreground/60 tracking-[0.35em] uppercase mb-8 font-light" style={{ fontSize: 'clamp(0.65rem, 1vw, 0.85rem)' }}>
            {t('heroLocation')}
          </p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto mb-10 leading-relaxed"
          >
            {t('heroDesc')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/reserve"
              className="px-8 py-3.5 bg-primary text-primary-foreground text-xs tracking-[0.2em] uppercase font-semibold rounded-full hover:bg-primary/85 transition-all duration-300 glow-gold flex items-center gap-2"
            >
              <Sparkles size={14} /> {t('heroBtn1')}
            </Link>
            <Link
              to="/events"
              className="px-8 py-3.5 border border-primary/30 text-primary text-xs tracking-[0.2em] uppercase font-semibold rounded-full hover:bg-primary/10 transition-all duration-300 flex items-center gap-2"
            >
              <Calendar size={14} /> {t('heroBtn2')}
            </Link>
            <Link
              to="/vip"
              className="px-8 py-3.5 border border-foreground/10 text-foreground/70 text-xs tracking-[0.2em] uppercase font-semibold rounded-full hover:border-primary/30 hover:text-primary transition-all duration-300 flex items-center gap-2"
            >
              <Crown size={14} /> {t('heroBtn3')}
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-5 h-8 border border-primary/30 rounded-full flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 bg-primary/60 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}