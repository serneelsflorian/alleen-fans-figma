import { Outlet } from 'react-router';
import { UserProvider } from '@/app/contexts/UserContext';

export function RootLayout() {
  return (
    <UserProvider>
      <Outlet />
    </UserProvider>
  );
}
