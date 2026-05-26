import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import SectionHeading from '../shared/SectionHeading';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

export default function FeaturedEvents() {
  const { data: events = [] } = useQuery({
    queryKey: ['featured-events'],
    queryFn: () => base44.entities.Event.filter({ status: 'upcoming' }, '-date', 3),
    initialData: [],
  });

  const sampleEvents = events.length > 0 ? events : [
    { id: 1, title: 'Midnight Gold', dj_name: 'DJ Luka', date: '2026-05-30', time: '23:00', event_type: 'dj_night' },
    { id: 2, title: 'Velvet Sessions', dj_name: 'DJ Marko', date: '2026-06-06', time: '22:00', event_type: 'themed_party' },
    { id: 3, title: 'Black Diamond Night', dj_name: 'DJ Stefan', date: '2026-06-13', time: '23:00', event_type: 'vip_event' },
  ];

  return (
    <section className="py-20 sm:py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />


      <div className="max-w-7xl mx-auto relative">
        <SectionHeading
          eyebrow="What's Next"
          title="Upcoming Events"
          subtitle="Every night tells a different story. Find yours."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleEvents.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group glass rounded-2xl p-6 hover:glass-gold transition-all duration-500 cursor-pointer"
            >
              <div className="flex items-center gap-2 text-primary/70 text-xs tracking-widest uppercase mb-4">
                <Calendar size={12} />
                {event.date ? format(new Date(event.date), 'MMM d, yyyy') : 'TBA'}
              </div>
              <h3 className="font-heading text-2xl mb-2 group-hover:text-primary transition-colors">
                {event.title}
              </h3>
              {event.dj_name && (
                <p className="text-muted-foreground text-sm mb-4">feat. {event.dj_name}</p>
              )}
              <div className="flex items-center gap-2 text-muted-foreground text-xs">
                <Clock size={12} />
                <span>{event.time || '22:00'} onwards</span>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-primary text-sm tracking-widest uppercase hover:gap-4 transition-all duration-300"
          >
            All Events <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}