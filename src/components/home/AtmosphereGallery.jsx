import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../shared/SectionHeading';

const images = [
  'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=600&q=80',
  'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&q=80',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80',
  'https://images.unsplash.com/photo-1571204829887-3b8d69e4094d?w=600&q=80',
  'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=600&q=80',
];

export default function AtmosphereGallery() {
  return (
    <section className="py-20 sm:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="The Atmosphere"
          title="Feel the Night"
          subtitle="Glimpses of what awaits inside."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative overflow-hidden rounded-xl group ${
                i === 0 || i === 5 ? 'row-span-2' : ''
              }`}
            >
              <img
                src={src}
                alt="Atmosphere"
                className="w-full h-full object-cover min-h-[200px] group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}