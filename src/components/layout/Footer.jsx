import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Phone, MapPin, Star } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                aria-hidden="true"
                className="w-10 h-10 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary font-heading text-sm tracking-wider"
              >
                A3
              </div>
              <h3 className="font-heading text-2xl text-gold-gradient">Ananasa Tri</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A premium nightlife booking demo showing event discovery, reservations, guest list flows, and VIP concepts.
            </p>
          </div>
          <div>
            <h4 className="text-xs tracking-widest uppercase text-primary mb-4 font-semibold">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: 'Events', path: '/events' },
                { label: 'Reservations', path: '/reserve' },
                { label: 'VIP Experience', path: '/vip' },
                { label: 'Guest List', path: '/guestlist' },
              ].map((l) => (
                <Link key={l.path} to={l.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs tracking-widest uppercase text-primary mb-4 font-semibold">Connect</h4>
            <div className="flex flex-col gap-3">
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Instagram size={16} /> @ananasa.demo
              </span>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone size={16} /> Demo booking channel
              </span>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={16} /> Demo venue, Belgrade
              </span>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star size={16} /> Portfolio demo reviews
              </span>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground/50 tracking-wider">
            Demo project. No private customer data included.
          </p>
        </div>
      </div>
    </footer>
  );
}