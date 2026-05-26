import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Šank — barske stolice duž šanka (kao na slici)
const SANK_SEATS = [
  { id: 'S1',  x: 18, y: 38, capacity: 1, minSpend: 3000, isVip: false },
  { id: 'S2',  x: 27, y: 38, capacity: 1, minSpend: 3000, isVip: false },
  { id: 'S3',  x: 36, y: 38, capacity: 1, minSpend: 3000, isVip: false },
  { id: 'S4',  x: 45, y: 38, capacity: 1, minSpend: 3000, isVip: false },
  { id: 'S5',  x: 54, y: 38, capacity: 1, minSpend: 3000, isVip: false },
  { id: 'S6',  x: 63, y: 38, capacity: 1, minSpend: 3000, isVip: false },
  { id: 'S7',  x: 72, y: 38, capacity: 1, minSpend: 3000, isVip: false },
  { id: 'S8',  x: 81, y: 38, capacity: 1, minSpend: 5000, isVip: true },
];

// Sprat — stolovi sa stolicama (kao na slici, grid raspored)
const SPRAT_TABLES = [
  { id: 'SP1', x: 18, y: 22, capacity: 4, minSpend: 10000, isVip: false },
  { id: 'SP2', x: 38, y: 22, capacity: 4, minSpend: 10000, isVip: false },
  { id: 'SP3', x: 58, y: 22, capacity: 4, minSpend: 10000, isVip: false },
  { id: 'SP4', x: 78, y: 22, capacity: 4, minSpend: 10000, isVip: false },
  { id: 'SP5', x: 18, y: 55, capacity: 3, minSpend: 8000, isVip: false },
  { id: 'SP6', x: 38, y: 55, capacity: 3, minSpend: 8000, isVip: false },
  { id: 'SP7', x: 58, y: 55, capacity: 4, minSpend: 12000, isVip: true },
  { id: 'SP8', x: 78, y: 55, capacity: 4, minSpend: 15000, isVip: true },
  { id: 'SP9', x: 28, y: 80, capacity: 3, minSpend: 8000, isVip: false },
  { id: 'SP10', x: 58, y: 80, capacity: 3, minSpend: 8000, isVip: false },
];

// Bar stool SVG icon
function BarStoolIcon({ color = '#4ade80', size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Seat (round top) */}
      <ellipse cx="20" cy="10" rx="13" ry="7" fill={color} fillOpacity="0.85" stroke={color} strokeWidth="1.5" />
      {/* Center pole */}
      <rect x="18.5" y="17" width="3" height="18" rx="1.5" fill={color} fillOpacity="0.6" />
      {/* Footrest */}
      <rect x="10" y="30" width="20" height="3" rx="1.5" fill={color} fillOpacity="0.5" />
      {/* Legs */}
      <line x1="14" y1="33" x2="10" y2="46" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.7" />
      <line x1="26" y1="33" x2="30" y2="46" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.7" />
    </svg>
  );
}

// Table with chairs SVG icon
function TableIcon({ capacity = 4, color = '#4ade80', size = 52 }) {
  const chairCount = Math.min(capacity, 4);
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Table top */}
      <rect x="15" y="20" width="30" height="20" rx="4" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" />
      {/* Chairs top */}
      {chairCount >= 1 && <rect x="20" y="10" width="8" height="10" rx="3" fill={color} fillOpacity="0.5" />}
      {chairCount >= 2 && <rect x="32" y="10" width="8" height="10" rx="3" fill={color} fillOpacity="0.5" />}
      {/* Chairs bottom */}
      {chairCount >= 3 && <rect x="20" y="40" width="8" height="10" rx="3" fill={color} fillOpacity="0.5" />}
      {chairCount >= 4 && <rect x="32" y="40" width="8" height="10" rx="3" fill={color} fillOpacity="0.5" />}
      {/* Table legs */}
      <line x1="19" y1="38" x2="17" y2="46" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
      <line x1="41" y1="38" x2="43" y2="46" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
    </svg>
  );
}

function SeatMarker({ seat, status, isSelected, onClick, type = 'stool' }) {
  const isAvailable = status === 'available';
  const isReserved = status === 'reserved' || status === 'occupied';

  const iconColor = isSelected
    ? '#C9A84C'
    : isReserved
    ? '#f87171'
    : seat.isVip
    ? '#C9A84C'
    : '#4ade80';

  const glowStyle = isSelected
    ? { filter: 'drop-shadow(0 0 8px rgba(201,168,76,0.8))' }
    : isReserved
    ? { filter: 'drop-shadow(0 0 5px rgba(248,113,113,0.5))' }
    : seat.isVip
    ? { filter: 'drop-shadow(0 0 6px rgba(201,168,76,0.5))' }
    : { filter: 'drop-shadow(0 0 4px rgba(74,222,128,0.4))' };

  return (
    <motion.button
      onClick={() => isAvailable && onClick(seat)}
      whileHover={isAvailable ? { scale: 1.18, y: -2 } : {}}
      whileTap={isAvailable ? { scale: 0.92 } : {}}
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-0.5 ${
        isAvailable ? 'cursor-pointer' : 'cursor-not-allowed'
      }`}
      style={{ left: `${seat.x}%`, top: `${seat.y}%`, opacity: isReserved ? 0.45 : 1 }}
    >
      <div style={glowStyle}>
        {type === 'stool'
          ? <BarStoolIcon color={iconColor} size={34} />
          : <TableIcon capacity={seat.capacity} color={iconColor} size={46} />
        }
      </div>
      <span className="text-[9px] font-bold tracking-wider" style={{ color: iconColor, textShadow: '0 0 6px rgba(0,0,0,0.8)' }}>
        {seat.id}
      </span>
      {seat.isVip && (
        <span className="text-[7px] tracking-widest uppercase font-bold text-primary leading-none">VIP</span>
      )}
    </motion.button>
  );
}

export default function VenueMap({ tableStatuses, selectedTable, onSelectTable }) {
  const [activeZone, setActiveZone] = useState('sank');

  const getStatus = (tableId) => {
    const found = tableStatuses.find(t => t.table_id === tableId);
    return found ? found.status : 'available';
  };

  return (
    <div className="relative w-full glass rounded-3xl overflow-hidden">
      {/* Zone Tabs */}
      <div className="flex border-b border-border/30">
        {['sank', 'sprat'].map((zone) => (
          <button
            key={zone}
            onClick={() => setActiveZone(zone)}
            className={`flex-1 py-4 text-sm tracking-[0.2em] uppercase font-semibold transition-all duration-300 ${
              activeZone === zone
                ? 'text-primary border-b-2 border-primary bg-primary/5'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {zone === 'sank' ? '🍹 Šank' : '🪑 Sprat'}
          </button>
        ))}
      </div>

      <div className="p-4 sm:p-6">
        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-5 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500/60 border border-green-500" />
            <span className="text-muted-foreground">Slobodno</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/60 border border-red-400" />
            <span className="text-muted-foreground">Rezervisano</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary/60 border border-primary" />
            <span className="text-muted-foreground">VIP</span>
          </div>
          {selectedTable && (
            <div className="ml-auto text-primary font-semibold">
              Izabrano: {selectedTable.id}
            </div>
          )}
        </div>

        {/* Map area */}
        {activeZone === 'sank' && (
          <div className="relative w-full rounded-2xl overflow-hidden border border-border/30"
            style={{
              aspectRatio: '16/7',
              background: 'linear-gradient(180deg, rgba(10,5,0,0.95) 0%, rgba(20,12,5,0.9) 100%)',
            }}
          >
            {/* Bar counter visual */}
            <div className="absolute top-[14%] left-[8%] right-[8%] h-[22%] rounded-2xl border border-primary/20"
              style={{ background: 'linear-gradient(180deg, rgba(201,168,76,0.08) 0%, rgba(80,50,10,0.25) 100%)' }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] tracking-[0.4em] uppercase text-primary/40 font-semibold">
                Šank — Bar Counter
              </div>
              {/* Bottle silhouettes */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 flex gap-3 opacity-30">
                {['▮','▮','▮','▮'].map((b, i) => (
                  <span key={i} className="text-primary text-xs" style={{ transform: `scaleY(${1.4 - i * 0.1})` }}>▮</span>
                ))}
              </div>
            </div>

            {/* Barske stolice duž šanka */}
            {SANK_SEATS.map((seat) => (
              <SeatMarker
                key={seat.id}
                seat={seat}
                status={getStatus(seat.id)}
                isSelected={selectedTable?.id === seat.id}
                onClick={onSelectTable}
                type="stool"
              />
            ))}

            {/* Floor label */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.3em] uppercase text-muted-foreground/30">
              Prizemlje
            </div>
          </div>
        )}

        {activeZone === 'sprat' && (
          <div className="relative w-full rounded-2xl overflow-hidden border border-border/30"
            style={{
              aspectRatio: '16/9',
              background: 'linear-gradient(135deg, rgba(8,5,2,0.95) 0%, rgba(15,10,3,0.9) 100%)',
            }}
          >
            {/* Decorative walls */}
            <div className="absolute inset-x-4 top-4 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
            <div className="absolute inset-x-4 bottom-4 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
            <div className="absolute left-4 inset-y-4 w-px bg-gradient-to-b from-transparent via-border/30 to-transparent" />
            <div className="absolute right-4 inset-y-4 w-px bg-gradient-to-b from-transparent via-border/30 to-transparent" />

            {/* Stolovi sa stolicama */}
            {SPRAT_TABLES.map((seat) => (
              <SeatMarker
                key={seat.id}
                seat={seat}
                status={getStatus(seat.id)}
                isSelected={selectedTable?.id === seat.id}
                onClick={onSelectTable}
                type="table"
              />
            ))}

            {/* Floor label */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.3em] uppercase text-muted-foreground/30">
              Sprat
            </div>
          </div>
        )}
      </div>
    </div>
  );
}