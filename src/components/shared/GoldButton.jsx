import React from 'react';
import { motion } from 'framer-motion';

export default function GoldButton({ children, onClick, className = '', variant = 'filled', type = 'button' }) {
  const base = 'px-8 py-3 text-xs tracking-[0.2em] uppercase font-semibold rounded-full transition-all duration-300 inline-flex items-center gap-2';
  const variants = {
    filled: `${base} bg-primary text-primary-foreground hover:bg-primary/85 glow-gold`,
    outline: `${base} border border-primary/40 text-primary hover:bg-primary/10`,
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      type={type}
      className={`${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}