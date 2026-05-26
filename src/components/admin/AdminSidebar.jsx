import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calendar, Grid3x3, Users, ListChecks, BarChart3, ChevronLeft, GlassWater } from 'lucide-react';

const links = [
  { label: 'Overview', path: '/admin', icon: LayoutDashboard },
  { label: 'Reservations', path: '/admin/reservations', icon: ListChecks },
  { label: 'Events', path: '/admin/events', icon: Calendar },
  { label: 'Tables', path: '/admin/tables', icon: Grid3x3 },
  { label: 'Guest List', path: '/admin/guestlist', icon: Users },
  { label: 'Meni', path: '/admin/menu', icon: GlassWater },
];

export default function AdminSidebar({ collapsed, onToggle }) {
  const location = useLocation();

  return (
    <aside className={`fixed top-0 left-0 h-full z-40 bg-card border-r border-border/50 transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'}`}>
      <div className="flex items-center justify-between p-4 border-b border-border/30">
        {!collapsed && <span className="font-heading text-sm text-gold-gradient tracking-wider">ADMIN</span>}
        <button onClick={onToggle} className="text-muted-foreground hover:text-foreground p-1">
          <ChevronLeft size={16} className={`transition-transform ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>
      <nav className="p-2 space-y-1 mt-2">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              }`}
              title={collapsed ? link.label : undefined}
            >
              <link.icon size={18} />
              {!collapsed && <span>{link.label}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="absolute bottom-4 left-0 right-0 px-2">
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronLeft size={14} />
          {!collapsed && 'Back to Site'}
        </Link>
      </div>
    </aside>
  );
}