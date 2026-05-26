import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Grid3x3, ListChecks, TrendingUp } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

function StatCard({ icon: Icon, label, value, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={18} />
        </div>
        <TrendingUp size={14} className="text-green-500" />
      </div>
      <p className="text-3xl font-bold mb-1">{value}</p>
      <p className="text-xs tracking-widest uppercase text-muted-foreground">{label}</p>
    </motion.div>
  );
}

export default function AdminOverview() {
  const { data: reservations = [] } = useQuery({
    queryKey: ['admin-reservations'],
    queryFn: () => base44.entities.Reservation.list(),
    initialData: [],
  });

  const { data: events = [] } = useQuery({
    queryKey: ['admin-events'],
    queryFn: () => base44.entities.Event.list(),
    initialData: [],
  });

  const { data: guestList = [] } = useQuery({
    queryKey: ['admin-guestlist'],
    queryFn: () => base44.entities.GuestListEntry.list(),
    initialData: [],
  });

  const { data: tables = [] } = useQuery({
    queryKey: ['admin-tables'],
    queryFn: () => base44.entities.VenueTable.list(),
    initialData: [],
  });

  const pending = reservations.filter(r => r.status === 'pending').length;
  const confirmed = reservations.filter(r => r.status === 'confirmed').length;

  return (
    <div>
      <h1 className="font-heading text-3xl mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={ListChecks} label="Total Reservations" value={reservations.length} color="bg-primary/20 text-primary" delay={0} />
        <StatCard icon={Calendar} label="Upcoming Events" value={events.length} color="bg-blue-500/20 text-blue-400" delay={0.1} />
        <StatCard icon={Users} label="Guest List Requests" value={guestList.length} color="bg-green-500/20 text-green-400" delay={0.2} />
        <StatCard icon={Grid3x3} label="Total Tables" value={tables.length} color="bg-purple-500/20 text-purple-400" delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6">
          <h3 className="font-heading text-lg mb-4">Reservation Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Pending</span>
              <span className="text-sm font-semibold text-yellow-400">{pending}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Confirmed</span>
              <span className="text-sm font-semibold text-green-400">{confirmed}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="text-sm font-semibold">{reservations.length}</span>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="font-heading text-lg mb-4">Recent Activity</h3>
          {reservations.length === 0 ? (
            <p className="text-sm text-muted-foreground">No reservations yet.</p>
          ) : (
            <div className="space-y-3">
              {reservations.slice(0, 5).map((r) => (
                <div key={r.id} className="flex justify-between items-center text-sm">
                  <span>{r.guest_name} — Table {r.table_id}</span>
                  <span className={`text-xs tracking-wider uppercase ${
                    r.status === 'confirmed' ? 'text-green-400' : r.status === 'pending' ? 'text-yellow-400' : 'text-muted-foreground'
                  }`}>{r.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}