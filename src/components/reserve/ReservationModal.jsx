import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, DollarSign, Phone, Instagram } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';
import GoldButton from '../shared/GoldButton';

export default function ReservationModal({ table, onClose, onSuccess }) {
  const [form, setForm] = useState({
    guest_name: '',
    phone: '',
    email: '',
    date: '',
    time: '22:00',
    party_size: table?.capacity || 2,
    special_requests: '',
  });
  const [loading, setLoading] = useState(false);

  if (!table) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await base44.entities.Reservation.create({
      ...form,
      table_id: table.id,
      table_zone: table.x < 50 && table.y < 45 ? 'sank' : 'sprat',
      is_vip: table.isVip,
      minimum_spend: table.minSpend,
      status: 'pending',
    });
    setLoading(false);
    toast.success('Reservation request submitted! We will confirm shortly.');
    onSuccess?.();
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-gold rounded-3xl p-6 sm:p-8 w-full max-w-md max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-heading text-2xl">Table {table.id}</h3>
              <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Users size={12} /> {table.capacity} guests</span>
                <span className="flex items-center gap-1"><DollarSign size={12} /> Min. {table.minSpend?.toLocaleString()} RSD</span>
              </div>
              {table.isVip && (
                <span className="inline-block mt-2 text-xs tracking-widest uppercase text-primary font-semibold">
                  ✦ VIP Table
                </span>
              )}
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Your Name"
              value={form.guest_name}
              onChange={(e) => setForm({ ...form, guest_name: e.target.value })}
              required
              className="bg-secondary/50 border-border/50"
            />
            <Input
              placeholder="Phone Number"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
              className="bg-secondary/50 border-border/50"
            />
            <Input
              placeholder="Email (optional)"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-secondary/50 border-border/50"
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
                className="bg-secondary/50 border-border/50"
              />
              <Input
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="bg-secondary/50 border-border/50"
              />
            </div>
            <Input
              type="number"
              placeholder="Party Size"
              min={1}
              max={table.capacity}
              value={form.party_size}
              onChange={(e) => setForm({ ...form, party_size: parseInt(e.target.value) || 1 })}
              className="bg-secondary/50 border-border/50"
            />
            <Textarea
              placeholder="Special Requests"
              value={form.special_requests}
              onChange={(e) => setForm({ ...form, special_requests: e.target.value })}
              className="bg-secondary/50 border-border/50 h-20"
            />
            <GoldButton type="submit" className="w-full justify-center">
              {loading ? 'Submitting...' : 'Request Reservation'}
            </GoldButton>
          </form>

          <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-border/20">
            <a
              href="https://example.com/ananasa-tri-demo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone size={12} /> Demo WhatsApp
            </a>
            <a
              href="https://example.com/ananasa-tri-demo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram size={12} /> Demo DM
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}