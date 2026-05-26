import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const categoryLabels = {
  signature: 'Signature',
  classic: 'Classic',
  mocktail: 'Mocktail',
  shots: 'Shots',
  wine_spirits: 'Wine & Spirits',
};

const fallbackImages = {
  signature: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=80',
  classic: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=80',
  mocktail: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80',
  shots: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&q=80',
  wine_spirits: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80',
};

export default function MenuCard({ item, index }) {
  const [hovered, setHovered] = useState(false);
  const imgSrc = item.image_url || fallbackImages[item.category] || fallbackImages.signature;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
      className="group relative rounded-2xl overflow-hidden cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <motion.img
          src={imgSrc}
          alt={item.name}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Badges top */}
        <div className="absolute top-3 left-3 flex gap-2">
          {item.is_featured && (
            <span className="text-[10px] tracking-widest uppercase font-semibold px-2.5 py-1 rounded-full bg-primary text-primary-foreground">
              ★ Featured
            </span>
          )}
          {item.alcohol_content === 'non_alcoholic' && (
            <span className="text-[10px] tracking-widest uppercase font-semibold px-2.5 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
              Bez alkohola
            </span>
          )}
        </div>

        {/* Category badge bottom-right */}
        <div className="absolute bottom-3 right-3">
          <span className="text-[10px] tracking-widest uppercase font-semibold px-2.5 py-1 rounded-full bg-black/50 text-primary/90 border border-primary/20 backdrop-blur-sm">
            {categoryLabels[item.category]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-heading text-lg font-semibold text-foreground leading-snug">
            {item.name}
          </h3>
          <span className="text-primary font-semibold text-base whitespace-nowrap">
            {item.price.toLocaleString('sr-RS')} din
          </span>
        </div>

        {item.description && (
          <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-2">
            {item.description}
          </p>
        )}

        {item.ingredients && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {item.ingredients.split(',').map((ing, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 rounded-full text-muted-foreground/80 border border-border/60"
              >
                {ing.trim()}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Hover gold border glow */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ boxShadow: 'inset 0 0 0 1px rgba(201,168,76,0.35), 0 0 30px rgba(201,168,76,0.08)' }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}