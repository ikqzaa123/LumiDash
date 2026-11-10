import { Navigate, Route, Routes } from 'react-router-dom';
import { GuestRoute, ProtectedRoute } from '@/components/auth/RouteGuards';
import DashboardLayout from '@/components/layout/DashboardLayout';
import EventsPage from '@/pages/EventsPage';
import LoginPage from '@/pages/LoginPage';
import LogoutPage from '@/pages/LogoutPage';
import MembersPage from '@/pages/MembersPage';
import OverviewPage from '@/pages/OverviewPage';
import RegisterPage from '@/pages/RegisterPage';

function App() {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route path="/logout" element={<LogoutPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<OverviewPage />} />
          <Route path="/dashboard/members" element={<MembersPage />} />
          <Route path="/dashboard/events" element={<EventsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
