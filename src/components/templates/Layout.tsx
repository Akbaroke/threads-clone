import SideNav from '../organisms/SideNav';
import BottomNav from '../organisms/BottomNav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex max-w-[1300px] m-auto flex-col sm:flex-row overflow-x-clip">
      <SideNav />
      <div className="flex-1 p-5">{children}</div>
      <BottomNav />
    </main>
  );
}
