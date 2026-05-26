import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import MenuCard from '@/components/menu/MenuCard';
import MenuFilter from '@/components/menu/MenuFilter';
import SectionHeading from '@/components/shared/SectionHeading';

const sampleItems = [
  { id: '1', name: 'Ananasa Sour', category: 'signature', description: 'Naš zaštitni znak — svež ananas, limun i pjenušavi gin finish.', ingredients: 'Gin, Sok ananasa, Limun, Egg white, Angostura', price: 1200, is_featured: true, alcohol_content: 'alcoholic', image_url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=80' },
  { id: '2', name: 'Flamingo Spritz', category: 'signature', description: 'Ružičast, svež i prefinjen — savršen za letnje noći.', ingredients: 'Aperol, Prosecco, Grenadine, Narandža', price: 1100, is_featured: true, alcohol_content: 'alcoholic', image_url: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=80' },
  { id: '3', name: 'Dark Shark', category: 'signature', description: 'Moćan, taman i intrigantan. Za one koji znaju šta hoće.', ingredients: 'Dark Rum, Blackberry, Lime, Ginger beer', price: 1300, is_featured: false, alcohol_content: 'alcoholic', image_url: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&q=80' },
  { id: '4', name: 'Mojito', category: 'classic', description: 'Klasik koji nikad ne izlazi iz mode.', ingredients: 'White Rum, Mentol, Limeta, Šećer, Soda', price: 950, is_featured: false, alcohol_content: 'alcoholic', image_url: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80' },
  { id: '5', name: 'Old Fashioned', category: 'classic', description: 'Elegancija u čaši. Whiskey na način na koji treba biti.', ingredients: 'Bourbon, Angostura, Šećer, Narandža', price: 1400, is_featured: false, alcohol_content: 'alcoholic', image_url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80' },
  { id: '6', name: 'Negroni', category: 'classic', description: 'Gorko, slatko, savršeno. Ikona italiana.', ingredients: 'Gin, Campari, Sweet Vermouth', price: 1350, is_featured: false, alcohol_content: 'alcoholic', image_url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=80' },
  { id: '7', name: 'Tropical Paradise', category: 'mocktail', description: 'Osvežavajuća egzotična mešavina bez alkohola.', ingredients: 'Mango, Kokos, Ananas, Limun, Soda', price: 750, is_featured: false, alcohol_content: 'non_alcoholic', image_url: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80' },
  { id: '8', name: 'Gold Rush Shot', category: 'shots', description: 'Jedan gutljaj zlata.', ingredients: 'Tequila Gold, Limun, Sol', price: 600, is_featured: false, alcohol_content: 'alcoholic', image_url: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&q=80' },
  { id: '9', name: 'Champagne Rosé', category: 'wine_spirits', description: 'Ružičasto šampanjsko za posebne trenutke.', ingredients: 'Moët Rosé', price: 2500, is_featured: true, alcohol_content: 'alcoholic', image_url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80' },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('all');

  const { data: dbItems = [] } = useQuery({
    queryKey: ['menu-items'],
    queryFn: () => base44.entities.MenuItem.list('-created_date', 100),
    initialData: [],
  });

  const items = dbItems.length > 0 ? dbItems : sampleItems;

  const filtered = activeCategory === 'all'
    ? items.filter(i => i.is_available !== false)
    : items.filter(i => i.category === activeCategory && i.is_available !== false);

  const featured = items.filter(i => i.is_featured && i.is_available !== false);

  return (
    <div className="min-h-screen bg-background pt-8 pb-20">
      {/* Header */}
      <div className="relative overflow-hidden py-16 sm:py-24 px-4">
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.1) 0%, transparent 60%)' }} className="absolute inset-0" />
        </div>

        {/* Floating emoji decorations */}
        <motion.div
          className="absolute top-8 right-8 sm:right-20 text-5xl pointer-events-none select-none"
          animate={{ y: [0, -12, 0], rotate: [0, 8, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          🍹
        </motion.div>
        <motion.div
          className="absolute bottom-4 left-6 sm:left-20 text-4xl pointer-events-none select-none"
          animate={{ y: [0, 10, 0], rotate: [0, -5, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          🍸
        </motion.div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-primary/80 text-xs tracking-[0.4em] uppercase mb-4 block font-semibold"
          >
            Ananasa Tri
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold mb-4"
          >
            <span className="text-gold-gradient">Koktel Meni</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto"
          >
            Svaki koktel je priča za sebe. Odaberi svoju.
          </motion.p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">

        {/* Featured row */}
        {activeCategory === 'all' && featured.length > 0 && (
          <div className="mb-16">
            <SectionHeading eyebrow="Preporučujemo" title="Naši Specijaliteti" align="center" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((item, i) => (
                <MenuCard key={item.id} item={item} index={i} />
              ))}
            </div>
            <div className="mt-12 border-t border-border/30" />
          </div>
        )}

        {/* Filter */}
        <MenuFilter active={activeCategory} onChange={setActiveCategory} />

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground text-sm">
            Nema stavki u ovoj kategoriji.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((item, i) => (
              <MenuCard key={item.id} item={item} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}