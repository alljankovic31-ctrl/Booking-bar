import React from 'react';
import { motion } from 'framer-motion';

const categories = [
  { key: 'all', label: 'Sve' },
  { key: 'signature', label: 'Signature' },
  { key: 'classic', label: 'Classic' },
  { key: 'mocktail', label: 'Mocktail' },
  { key: 'shots', label: 'Shots' },
  { key: 'wine_spirits', label: 'Wine & Spirits' },
];

export default function MenuFilter({ active, onChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-10">
      {categories.map((cat) => (
        <motion.button
          key={cat.key}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(cat.key)}
          className={`px-5 py-2 text-xs tracking-[0.18em] uppercase font-semibold rounded-full transition-all duration-300 ${
            active === cat.key
              ? 'bg-primary text-primary-foreground glow-gold'
              : 'border border-border/50 text-muted-foreground hover:border-primary/40 hover:text-primary'
          }`}
        >
          {cat.label}
        </motion.button>
      ))}
    </div>
  );
}