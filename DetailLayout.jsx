import { Outlet, useLocation, useParams } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import { mockUsers } from "../data/mockUsers.js";

export default function DetailLayout() {
  const { pathname } = useLocation();
  const { userId, threadId } = useParams();
  
  const getTitle = () => {
    if (userId) return mockUsers.find(u => u.id === userId)?.name || 'Profile';
    if (threadId) return 'Chat';
    if (pathname.includes('location')) return 'Location';
    if (pathname.includes('checkin')) return 'Check In';
    return 'Details';
  };

  return (
    <div>
      <AppHeader title={getTitle()} showBack />
      <Outlet />
    </div>
  );
}