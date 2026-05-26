import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

import PageLayout from './components/layout/PageLayout';
import AdminLayout from './components/admin/AdminLayout';
import { LanguageProvider } from './lib/LanguageContext';

import Home from './pages/Home';
import Events from './pages/Events';
import TableReservations from './pages/TableReservations';
import VIPExperience from './pages/VIPExperience';
import GuestList from './pages/GuestList';
import Contact from './pages/Contact';

import Menu from './pages/Menu';
import AdminOverview from './pages/admin/AdminOverview';
import AdminReservations from './pages/admin/AdminReservations';
import AdminEvents from './pages/admin/AdminEvents';
import AdminTables from './pages/admin/AdminTables';
import AdminGuestList from './pages/admin/AdminGuestList';
import AdminMenu from './pages/admin/AdminMenu';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">Loading</span>
        </div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/reserve" element={<TableReservations />} />
        <Route path="/vip" element={<VIPExperience />} />
        <Route path="/guestlist" element={<GuestList />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/menu" element={<Menu />} />
      </Route>
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminOverview />} />
        <Route path="/admin/reservations" element={<AdminReservations />} />
        <Route path="/admin/events" element={<AdminEvents />} />
        <Route path="/admin/tables" element={<AdminTables />} />
        <Route path="/admin/guestlist" element={<AdminGuestList />} />
        <Route path="/admin/menu" element={<AdminMenu />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </QueryClientProvider>
      </LanguageProvider>
    </AuthProvider>
  )
}

export default App