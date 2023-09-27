import { Outlet } from 'react-router-dom';
import SideNav from '../organisms/SideNav';
import BottomNav from '../organisms/BottomNav';

export default function Layout() {
  return (
    <main className="flex max-w-[1000px] m-auto flex-col sm:flex-row">
      <SideNav />
      <div className="flex-1 p-5">
        <Outlet />
      </div>
      <BottomNav />
    </main>
  );
}
