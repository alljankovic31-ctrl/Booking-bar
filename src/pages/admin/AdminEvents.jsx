import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import GoldButton from '../../components/shared/GoldButton';

export default function AdminEvents() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', date: '', time: '22:00', dj_name: '', event_type: 'dj_night', ticket_price: 0, capacity: 100 });

  const { data: events = [] } = useQuery({
    queryKey: ['admin-events'],
    queryFn: () => base44.entities.Event.list('-date'),
    initialData: [],
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Event.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-events'] });
      setShowForm(false);
      setForm({ title: '', description: '', date: '', time: '22:00', dj_name: '', event_type: 'dj_night', ticket_price: 0, capacity: 100 });
      toast.success('Event created');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Event.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-events'] });
      toast.success('Event deleted');
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-3xl">Events</h1>
        <Button onClick={() => setShowForm(!showForm)} className="bg-primary text-primary-foreground hover:bg-primary/85">
          <Plus size={14} className="mr-1" /> Add Event
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={(e) => { e.preventDefault(); createMutation.mutate({ ...form, status: 'upcoming' }); }}
          className="glass rounded-2xl p-6 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <Input placeholder="Event Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="bg-secondary/50" />
          <Input placeholder="DJ Name" value={form.dj_name} onChange={(e) => setForm({ ...form, dj_name: e.target.value })} className="bg-secondary/50" />
          <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required className="bg-secondary/50" />
          <Input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="bg-secondary/50" />
          <Input type="number" placeholder="Ticket Price (RSD)" value={form.ticket_price} onChange={(e) => setForm({ ...form, ticket_price: parseInt(e.target.value) || 0 })} className="bg-secondary/50" />
          <Input type="number" placeholder="Capacity" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: parseInt(e.target.value) || 100 })} className="bg-secondary/50" />
          <Select value={form.event_type} onValueChange={(v) => setForm({ ...form, event_type: v })}>
            <SelectTrigger className="bg-secondary/50"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="dj_night">DJ Night</SelectItem>
              <SelectItem value="themed_party">Themed Party</SelectItem>
              <SelectItem value="vip_event">VIP Event</SelectItem>
              <SelectItem value="special">Special</SelectItem>
            </SelectContent>
          </Select>
          <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="bg-secondary/50 sm:col-span-2" />
          <div className="sm:col-span-2">
            <GoldButton type="submit">Create Event</GoldButton>
          </div>
        </form>
      )}

      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left p-4 text-xs tracking-widest uppercase text-muted-foreground">Title</th>
                <th className="text-left p-4 text-xs tracking-widest uppercase text-muted-foreground">Date</th>
                <th className="text-left p-4 text-xs tracking-widest uppercase text-muted-foreground">Type</th>
                <th className="text-left p-4 text-xs tracking-widest uppercase text-muted-foreground">DJ</th>
                <th className="text-left p-4 text-xs tracking-widest uppercase text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No events</td></tr>
              ) : events.map((e) => (
                <tr key={e.id} className="border-b border-border/10 hover:bg-secondary/20 transition-colors">
                  <td className="p-4 font-medium">{e.title}</td>
                  <td className="p-4 text-muted-foreground">{e.date ? format(new Date(e.date), 'MMM d, yyyy') : '—'}</td>
                  <td className="p-4"><Badge className="bg-primary/10 text-primary border-primary/20">{e.event_type}</Badge></td>
                  <td className="p-4 text-muted-foreground">{e.dj_name || '—'}</td>
                  <td className="p-4">
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-red-400 hover:bg-red-500/10" onClick={() => deleteMutation.mutate(e.id)}>
                      <Trash2 size={14} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}