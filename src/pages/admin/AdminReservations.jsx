import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X, Clock } from 'lucide-react';
import { toast } from 'sonner';

const statusColors = {
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  confirmed: 'bg-green-500/20 text-green-400 border-green-500/30',
  cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
  completed: 'bg-muted text-muted-foreground border-border',
};

export default function AdminReservations() {
  const queryClient = useQueryClient();
  const { data: reservations = [], isLoading } = useQuery({
    queryKey: ['admin-reservations'],
    queryFn: () => base44.entities.Reservation.list('-created_date'),
    initialData: [],
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Reservation.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reservations'] });
      toast.success('Reservation updated');
    },
  });

  return (
    <div>
      <h1 className="font-heading text-3xl mb-8">Reservations</h1>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left p-4 text-xs tracking-widest uppercase text-muted-foreground font-semibold">Guest</th>
                <th className="text-left p-4 text-xs tracking-widest uppercase text-muted-foreground font-semibold">Table</th>
                <th className="text-left p-4 text-xs tracking-widest uppercase text-muted-foreground font-semibold">Date</th>
                <th className="text-left p-4 text-xs tracking-widest uppercase text-muted-foreground font-semibold">Party</th>
                <th className="text-left p-4 text-xs tracking-widest uppercase text-muted-foreground font-semibold">Status</th>
                <th className="text-left p-4 text-xs tracking-widest uppercase text-muted-foreground font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">Loading...</td></tr>
              ) : reservations.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No reservations yet</td></tr>
              ) : (
                reservations.map((r) => (
                  <tr key={r.id} className="border-b border-border/10 hover:bg-secondary/20 transition-colors">
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{r.guest_name}</p>
                        <p className="text-xs text-muted-foreground">{r.phone}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-medium">{r.table_id}</span>
                      {r.is_vip && <span className="text-primary text-xs ml-1">VIP</span>}
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {r.date ? format(new Date(r.date), 'MMM d') : '—'}
                      {r.time && <span className="ml-1 text-xs">@ {r.time}</span>}
                    </td>
                    <td className="p-4">{r.party_size || '—'}</td>
                    <td className="p-4">
                      <Badge className={statusColors[r.status] || statusColors.pending}>
                        {r.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1">
                        {r.status === 'pending' && (
                          <>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-green-400 hover:text-green-300 hover:bg-green-500/10"
                              onClick={() => updateMutation.mutate({ id: r.id, data: { status: 'confirmed' } })}
                            >
                              <Check size={14} />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                              onClick={() => updateMutation.mutate({ id: r.id, data: { status: 'cancelled' } })}
                            >
                              <X size={14} />
                            </Button>
                          </>
                        )}
                        {r.status === 'confirmed' && (
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            onClick={() => updateMutation.mutate({ id: r.id, data: { status: 'completed' } })}
                          >
                            <Clock size={14} />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}