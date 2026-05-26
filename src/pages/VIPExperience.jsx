import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Gem, Wine, Sparkles, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/shared/SectionHeading';

const packages = [
  {
    name: 'Gold Experience',
    price: '15,000 RSD',
    icon: Star,
    features: ['Reserved VIP table for 4', 'Premium bottle of choice', 'Priority entry', 'Dedicated server'],
  },
  {
    name: 'Platinum Experience',
    price: '30,000 RSD',
    icon: Crown,
    features: ['Premium VIP booth for 6', '2 premium bottles', 'Private area access', 'Personal host', 'Custom cocktail menu'],
    featured: true,
  },
  {
    name: 'Diamond Experience',
    price: '50,000 RSD',
    icon: Gem,
    features: ['Exclusive private area for 10', '3 premium bottles + champagne', 'Private DJ request', 'Full concierge service', 'Complimentary appetizers', 'Priority everything'],
  },
];

const galleryImages = [
  'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=80',
  'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=600&q=80',
  'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&q=80',
];

export default function VIPExperience() {
  return (
    <div className="pt-28 pb-20">
      {/* Hero */}
      <section className="px-4 mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-primary text-xs tracking-[0.4em] uppercase font-semibold block mb-4">
              <Sparkles size={14} className="inline mr-2" /> Exclusive Access
            </span>
            <h1 className="font-heading text-4xl sm:text-6xl font-bold mb-6">
              The <span className="text-gold-gradient">VIP</span> Experience
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Elevate your night beyond the ordinary. Our VIP packages deliver an unmatched level of
              luxury, privacy, and personalized service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Packages */}
      <section className="px-4 mb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className={`rounded-3xl p-6 sm:p-8 transition-all duration-500 ${
                  pkg.featured
                    ? 'glass-gold glow-gold'
                    : 'glass hover:glass-gold'
                }`}
              >
                <pkg.icon size={28} className="text-primary mb-4" />
                <h3 className="font-heading text-2xl mb-1">{pkg.name}</h3>
                <p className="text-primary font-semibold text-lg mb-6">{pkg.price}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Wine size={12} className="text-primary mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/reserve"
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs tracking-widest uppercase font-semibold transition-all duration-300 ${
                    pkg.featured
                      ? 'bg-primary text-primary-foreground hover:bg-primary/85'
                      : 'border border-primary/30 text-primary hover:bg-primary/10'
                  }`}
                >
                  Book Now <ArrowRight size={12} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="Gallery" title="A Glimpse of Luxury" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {galleryImages.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="aspect-[4/3] rounded-2xl overflow-hidden group"
              >
                <img
                  src={src}
                  alt="VIP"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}