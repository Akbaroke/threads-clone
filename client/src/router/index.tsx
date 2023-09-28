import { Route, Routes } from 'react-router';
import Layout from '../components/templates/Layout';
import Home from '../pages/Home';
import Search from '@/pages/Search';
import NewThread from '@/pages/NewThread';
import Activity from '@/pages/Activity';
import Profile from '@/pages/Profile';
import Root from '@/pages/Root';

export default function root() {
  return (
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/" element={<Layout />}>
        <Route index path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/newthread" element={<NewThread />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}
