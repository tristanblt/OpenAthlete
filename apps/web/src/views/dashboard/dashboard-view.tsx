import { Navigate } from 'react-router-dom';

export function DashboardView() {
  return <Navigate to="/dashboard/calendar" replace />; // Redirect to the calendar view
}
