import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { toast } from 'sonner';

const statusColors = {
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  approved: 'bg-green-500/20 text-green-400 border-green-500/30',
  denied: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export default function AdminGuestList() {
  const queryClient = useQueryClient();

  const { data: entries = [] } = useQuery({
    queryKey: ['admin-guestlist'],
    queryFn: () => base44.entities.GuestListEntry.list('-created_date'),
    initialData: [],
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.GuestListEntry.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-guestlist'] });
      toast.success('Updated');
    },
  });

  return (
    <div>
      <h1 className="font-heading text-3xl mb-8">Guest List</h1>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left p-4 text-xs tracking-widest uppercase text-muted-foreground">Name</th>
                <th className="text-left p-4 text-xs tracking-widest uppercase text-muted-foreground">Phone</th>
                <th className="text-left p-4 text-xs tracking-widest uppercase text-muted-foreground">Guests</th>
                <th className="text-left p-4 text-xs tracking-widest uppercase text-muted-foreground">Date</th>
                <th className="text-left p-4 text-xs tracking-widest uppercase text-muted-foreground">Status</th>
                <th className="text-left p-4 text-xs tracking-widest uppercase text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No guest list entries</td></tr>
              ) : entries.map((e) => (
                <tr key={e.id} className="border-b border-border/10 hover:bg-secondary/20 transition-colors">
                  <td className="p-4 font-medium">{e.name}</td>
                  <td className="p-4 text-muted-foreground">{e.phone}</td>
                  <td className="p-4">{e.number_of_guests}</td>
                  <td className="p-4 text-muted-foreground">{e.preferred_date ? format(new Date(e.preferred_date), 'MMM d') : '—'}</td>
                  <td className="p-4"><Badge className={statusColors[e.status] || statusColors.pending}>{e.status}</Badge></td>
                  <td className="p-4">
                    {e.status === 'pending' && (
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-green-400 hover:bg-green-500/10" onClick={() => updateMutation.mutate({ id: e.id, data: { status: 'approved' } })}>
                          <Check size={14} />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-red-400 hover:bg-red-500/10" onClick={() => updateMutation.mutate({ id: e.id, data: { status: 'denied' } })}>
                          <X size={14} />
                        </Button>
                      </div>
                    )}
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