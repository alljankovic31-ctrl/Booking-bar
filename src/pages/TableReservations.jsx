import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import SectionHeading from '../components/shared/SectionHeading';
import VenueMap from '../components/reserve/VenueMap';
import ReservationModal from '../components/reserve/ReservationModal';

export default function TableReservations() {
  const [selectedTable, setSelectedTable] = useState(null);
  const queryClient = useQueryClient();

  const { data: venueTables = [] } = useQuery({
    queryKey: ['venue-tables'],
    queryFn: () => base44.entities.VenueTable.list(),
    initialData: [],
  });

  return (
    <div className="pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Your Table Awaits"
          title="Reserve Your Spot"
          subtitle="Choose your table from our interactive venue map. Tap on any available table to begin your reservation."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <VenueMap
            tableStatuses={venueTables}
            selectedTable={selectedTable}
            onSelectTable={setSelectedTable}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-muted-foreground text-sm">
            Tap a table to view details and make a reservation request.
          </p>
          <p className="text-muted-foreground/60 text-xs mt-1">
            VIP tables are marked with gold. Minimum spend applies.
          </p>
        </motion.div>
      </div>

      {selectedTable && (
        <ReservationModal
          table={selectedTable}
          onClose={() => setSelectedTable(null)}
          onSuccess={() => queryClient.invalidateQueries({ queryKey: ['venue-tables'] })}
        />
      )}
    </div>
  );
}