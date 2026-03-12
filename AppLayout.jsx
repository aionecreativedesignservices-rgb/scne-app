import { Outlet, useLocation } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import BottomNav from '../components/BottomNav';

export default function AppLayout() {
  const { pathname } = useLocation();
  const getTitle = () => {
    if (pathname.includes('/feed')) return 'Feed';
    if (pathname.includes('/messages')) return 'Messages';
    if (pathname.includes('/requests')) return 'Requests';
    if (pathname.includes('/profile/me')) return 'My Profile';
    return 'App';
  };

  return (
    <div className="pb-20">
      <AppHeader title={getTitle()} />
      <Outlet />
      <BottomNav />
    </div>
  );
}