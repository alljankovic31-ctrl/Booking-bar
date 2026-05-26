import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import GoldButton from '../../components/shared/GoldButton';

const statusColors = {
  available: 'bg-green-500/20 text-green-400 border-green-500/30',
  reserved: 'bg-red-500/20 text-red-400 border-red-500/30',
  occupied: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
};

export default function AdminTables() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ table_id: '', zone: 'sank', capacity: 4, minimum_spend: 5000, is_vip: false });

  const { data: tables = [] } = useQuery({
    queryKey: ['admin-tables'],
    queryFn: () => base44.entities.VenueTable.list(),
    initialData: [],
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.VenueTable.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-tables'] });
      setShowForm(false);
      toast.success('Table created');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.VenueTable.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-tables'] });
      toast.success('Table updated');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.VenueTable.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-tables'] });
      toast.success('Table deleted');
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-3xl">Tables</h1>
        <Button onClick={() => setShowForm(!showForm)} className="bg-primary text-primary-foreground hover:bg-primary/85">
          <Plus size={14} className="mr-1" /> Add Table
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={(e) => { e.preventDefault(); createMutation.mutate({ ...form, status: 'available' }); }}
          className="glass rounded-2xl p-6 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <Input placeholder="Table ID (e.g. S1)" value={form.table_id} onChange={(e) => setForm({ ...form, table_id: e.target.value })} required className="bg-secondary/50" />
          <Select value={form.zone} onValueChange={(v) => setForm({ ...form, zone: v })}>
            <SelectTrigger className="bg-secondary/50"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="sank">Šank</SelectItem>
              <SelectItem value="sprat">Sprat</SelectItem>
            </SelectContent>
          </Select>
          <Input type="number" placeholder="Capacity" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: parseInt(e.target.value) || 2 })} className="bg-secondary/50" />
          <Input type="number" placeholder="Min Spend (RSD)" value={form.minimum_spend} onChange={(e) => setForm({ ...form, minimum_spend: parseInt(e.target.value) || 0 })} className="bg-secondary/50" />
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={form.is_vip} onChange={(e) => setForm({ ...form, is_vip: e.target.checked })} className="accent-primary" />
            <label className="text-sm text-muted-foreground">VIP Table</label>
          </div>
          <GoldButton type="submit">Add Table</GoldButton>
        </form>
      )}

      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left p-4 text-xs tracking-widest uppercase text-muted-foreground">ID</th>
                <th className="text-left p-4 text-xs tracking-widest uppercase text-muted-foreground">Zone</th>
                <th className="text-left p-4 text-xs tracking-widest uppercase text-muted-foreground">Capacity</th>
                <th className="text-left p-4 text-xs tracking-widest uppercase text-muted-foreground">Min Spend</th>
                <th className="text-left p-4 text-xs tracking-widest uppercase text-muted-foreground">Status</th>
                <th className="text-left p-4 text-xs tracking-widest uppercase text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tables.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No tables configured</td></tr>
              ) : tables.map((t) => (
                <tr key={t.id} className="border-b border-border/10 hover:bg-secondary/20 transition-colors">
                  <td className="p-4 font-medium">{t.table_id} {t.is_vip && <span className="text-primary text-xs">VIP</span>}</td>
                  <td className="p-4 text-muted-foreground capitalize">{t.zone === 'sank' ? 'Šank' : 'Sprat'}</td>
                  <td className="p-4">{t.capacity}</td>
                  <td className="p-4 text-muted-foreground">{t.minimum_spend?.toLocaleString()} RSD</td>
                  <td className="p-4">
                    <Badge className={statusColors[t.status] || statusColors.available}>{t.status}</Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <Select value={t.status} onValueChange={(v) => updateMutation.mutate({ id: t.id, data: { status: v } })}>
                        <SelectTrigger className="h-8 w-28 bg-secondary/50 text-xs"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="available">Available</SelectItem>
                          <SelectItem value="reserved">Reserved</SelectItem>
                          <SelectItem value="occupied">Occupied</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-red-400 hover:bg-red-500/10" onClick={() => deleteMutation.mutate(t.id)}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
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