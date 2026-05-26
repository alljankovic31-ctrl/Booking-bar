import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';
import SectionHeading from '../components/shared/SectionHeading';
import GoldButton from '../components/shared/GoldButton';

export default function GuestList() {
  const [form, setForm] = useState({ name: '', phone: '', number_of_guests: 2, preferred_date: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await base44.entities.GuestListEntry.create({ ...form, status: 'pending' });
    setLoading(false);
    setSubmitted(true);
    toast.success('Guest list request submitted!');
  };

  return (
    <div className="pt-28 pb-20 px-4">
      <div className="max-w-lg mx-auto">
        <SectionHeading
          eyebrow="Be Our Guest"
          title="Guest List"
          subtitle="Request a spot on our exclusive guest list for priority entry."
        />

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-gold rounded-3xl p-10 text-center"
          >
            <CheckCircle size={48} className="text-primary mx-auto mb-4" />
            <h3 className="font-heading text-2xl mb-2">You're on the List</h3>
            <p className="text-muted-foreground text-sm">We'll confirm your spot shortly. See you there.</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="glass rounded-3xl p-6 sm:p-8 space-y-4"
          >
            <div>
              <label className="text-xs tracking-widest uppercase text-muted-foreground mb-1.5 block">Full Name</label>
              <Input
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="bg-secondary/50 border-border/50"
              />
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase text-muted-foreground mb-1.5 block">Phone Number</label>
              <Input
                placeholder="Phone number"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
                className="bg-secondary/50 border-border/50"
              />
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase text-muted-foreground mb-1.5 block">Number of Guests</label>
              <Input
                type="number"
                min={1}
                max={20}
                value={form.number_of_guests}
                onChange={(e) => setForm({ ...form, number_of_guests: parseInt(e.target.value) || 1 })}
                required
                className="bg-secondary/50 border-border/50"
              />
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase text-muted-foreground mb-1.5 block">Preferred Date</label>
              <Input
                type="date"
                value={form.preferred_date}
                onChange={(e) => setForm({ ...form, preferred_date: e.target.value })}
                required
                className="bg-secondary/50 border-border/50"
              />
            </div>
            <GoldButton type="submit" className="w-full justify-center mt-2">
              <Users size={14} /> {loading ? 'Submitting...' : 'Request Guest List Spot'}
            </GoldButton>
          </motion.form>
        )}
      </div>
    </div>
  );
}