import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/lib/LanguageContext';

const navLinkKeys = [
  { key: 'home', path: '/' },
  { key: 'events', path: '/events' },
  { key: 'menu', path: '/menu' },
  { key: 'reserve', path: '/reserve' },
  { key: 'vip', path: '/vip' },
  { key: 'guestlist', path: '/guestlist' },
  { key: 'contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();
  const navLinks = navLinkKeys.map(l => ({ label: t(l.key), path: l.path }));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div
              aria-hidden="true"
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary font-heading text-sm tracking-wider"
            >
              A3
            </div>
            <span className="font-heading text-lg sm:text-xl tracking-wider text-gold-gradient font-semibold hidden sm:block">
              ANANASA TRI
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm tracking-widest uppercase transition-colors duration-300 ${
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-foreground/60 hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/reserve"
              className="ml-4 px-6 py-2.5 bg-primary text-primary-foreground text-xs tracking-widest uppercase font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 glow-gold"
            >
              {t('reserveNow')}
            </Link>
            <LanguageSwitcher />
          </div>

          {/* Mobile toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-foreground/80 p-2"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl flex flex-col items-center justify-center gap-6"
          >
            <motion.div
              aria-hidden="true"
              className="h-20 w-20 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary font-heading text-xl tracking-wider mb-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              A3
            </motion.div>
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={link.path}
                  className={`text-2xl font-heading tracking-wider ${
                    location.pathname === link.path ? 'text-primary' : 'text-foreground/70'
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                to="/reserve"
                className="mt-4 px-8 py-3 bg-primary text-primary-foreground tracking-widest uppercase text-sm font-semibold rounded-full glow-gold"
              >
                Reserve Now
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}