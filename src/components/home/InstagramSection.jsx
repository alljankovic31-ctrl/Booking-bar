import React from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import SectionHeading from '../shared/SectionHeading';

const posts = [
  'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=400&q=80',
  'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=400&q=80',
  'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=400&q=80',
  'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&q=80',
];

export default function InstagramSection() {
  return (
    <section className="py-20 sm:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Follow Us"
          title="@ananasa.demo"
          subtitle="Tag us in your moments. Be part of the story."
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {posts.map((src, i) => (
            <motion.a
              key={i}
              href="https://example.com/ananasa-tri-demo"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative aspect-square overflow-hidden rounded-xl group cursor-pointer"
            >
              <img src={src} alt="Instagram" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram className="text-primary" size={32} />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}