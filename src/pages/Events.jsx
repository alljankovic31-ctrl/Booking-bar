import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Music, Ticket, Users } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { format, differenceInDays, differenceInHours } from 'date-fns';
import SectionHeading from '../components/shared/SectionHeading';
import { Badge } from '@/components/ui/badge';

const sampleEvents = [
  { id: 1, title: 'Midnight Gold', description: 'An evening drenched in golden elegance. Premium cocktails, deep house, and an atmosphere that glows.', dj_name: 'DJ Luka', date: '2026-06-07', time: '23:00', event_type: 'dj_night', ticket_price: 1500, capacity: 120, status: 'upcoming', image_url: 'https://images.unsplash.com/photo-1571204829887-3b8d69e4094d?w=800&q=80' },
  { id: 2, title: 'Velvet Sessions', description: 'Where smooth R&B meets sophisticated nightlife. Dress code: effortless elegance.', dj_name: 'DJ Marko', date: '2026-06-14', time: '22:00', event_type: 'themed_party', ticket_price: 2000, capacity: 100, status: 'upcoming', image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80' },
  { id: 3, title: 'Black Diamond Night', description: 'The most exclusive night of the month. Limited entry. Maximum experience.', dj_name: 'DJ Stefan', date: '2026-06-21', time: '23:00', event_type: 'vip_event', ticket_price: 3000, capacity: 80, status: 'upcoming', image_url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80' },
  { id: 4, title: 'Sunday Ritual', description: 'Wind down the week with deep electronic sounds and artisan cocktails.', dj_name: 'DJ Nina', date: '2026-06-28', time: '21:00', event_type: 'dj_night', ticket_price: 1000, capacity: 150, status: 'upcoming', image_url: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=800&q=80' },
];

function CountdownBadge({ date }) {
  const eventDate = new Date(date);
  const now = new Date();
  const days = differenceInDays(eventDate, now);
  const hours = differenceInHours(eventDate, now) % 24;

  if (days < 0) return null;

  return (
    <Badge className="bg-primary/20 text-primary border-primary/30 text-xs tracking-wider">
      {days > 0 ? `${days}d ${hours}h` : `${hours}h`} left
    </Badge>
  );
}

function EventCard({ event, index }) {
  const typeLabels = { dj_night: 'DJ Night', themed_party: 'Themed Party', vip_event: 'VIP Event', special: 'Special' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      className="group glass rounded-2xl overflow-hidden hover:glass-gold transition-all duration-500"
    >
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={event.image_url || 'https://images.unsplash.com/photo-1571204829887-3b8d69e4094d?w=800&q=80'}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className="bg-background/60 backdrop-blur-md text-foreground text-xs tracking-wider border-0">
            {typeLabels[event.event_type] || 'Event'}
          </Badge>
          {event.date && <CountdownBadge date={event.date} />}
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-heading text-2xl mb-2 group-hover:text-primary transition-colors">{event.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2">{event.description}</p>

        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
          {event.date && (
            <span className="flex items-center gap-1.5">
              <Calendar size={12} className="text-primary/70" />
              {format(new Date(event.date), 'MMM d, yyyy')}
            </span>
          )}
          {event.time && (
            <span className="flex items-center gap-1.5">
              <Clock size={12} className="text-primary/70" />
              {event.time}
            </span>
          )}
          {event.dj_name && (
            <span className="flex items-center gap-1.5">
              <Music size={12} className="text-primary/70" />
              {event.dj_name}
            </span>
          )}
          {event.capacity && (
            <span className="flex items-center gap-1.5">
              <Users size={12} className="text-primary/70" />
              {event.capacity} spots
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border/30">
          {event.ticket_price && (
            <span className="text-primary font-semibold text-sm flex items-center gap-1">
              <Ticket size={14} /> {event.ticket_price} RSD
            </span>
          )}
          <button className="text-xs tracking-widest uppercase text-foreground/60 hover:text-primary transition-colors">
            Reserve Spot →
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Events() {
  const { data: events = [] } = useQuery({
    queryKey: ['events'],
    queryFn: () => base44.entities.Event.filter({ status: 'upcoming' }, '-date'),
    initialData: [],
  });

  const displayEvents = events.length > 0 ? events : sampleEvents;

  return (
    <div className="pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Calendar"
          title="Upcoming Events"
          subtitle="Curated nights designed to transcend the ordinary. Choose your experience."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {displayEvents.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}