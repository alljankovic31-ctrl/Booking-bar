import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import SectionHeading from '../shared/SectionHeading';

const testimonials = [
  { name: 'Milica S.', text: 'The most exclusive experience in the city. Incredible atmosphere and service.', stars: 5 },
  { name: 'Nikola D.', text: 'VIP table was worth every dinar. The cocktails and vibe were absolutely premium.', stars: 5 },
  { name: 'Ana M.', text: 'Felt like stepping into a movie. The booking process was seamless and elegant.', stars: 5 },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      {/* Flamingo – right side float */}
      <motion.div
        className="absolute top-10 right-4 sm:right-10 pointer-events-none z-0 select-none"
        animate={{ y: [0, -16, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        style={{ fontSize: '5rem' }}
      >
        🦩
      </motion.div>

      {/* Shark – left side float */}
      <motion.div
        className="absolute bottom-10 left-4 sm:left-10 pointer-events-none z-0 select-none"
        animate={{ y: [0, 12, 0], x: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        style={{ fontSize: '5rem' }}
      >
        🦈
      </motion.div>

      <div className="max-w-5xl mx-auto relative">
        <SectionHeading eyebrow="Reviews" title="What They Say" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <div className="flex justify-center gap-1 mb-4">
                {Array(t.stars).fill(0).map((_, j) => (
                  <Star key={j} size={14} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground italic mb-4 leading-relaxed">"{t.text}"</p>
              <p className="text-xs tracking-widest uppercase text-primary/70 font-semibold">{t.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}