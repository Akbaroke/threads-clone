import { Route, Routes } from 'react-router';
import Layout from '../components/templates/Layout';
import Home from '../pages/Home';
import Search from '@/pages/Search';
import NewThread from '@/pages/NewThread';
import Activity from '@/pages/Activity';
import Profile from '@/pages/Profile';
import Root from '@/pages/Root';
import EditProfile from '@/pages/EditProfile';
import Register from '@/pages/Register';
import Login from '@/pages/Login';
import User from '@/middlewares/User';

export default function root() {
  return (
    <Routes>
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/" element={<Root />} />
      <Route
        path="/"
        element={
          <User>
            <Layout />
          </User>
        }>
        <Route index path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/newthread" element={<NewThread />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
      </Route>
    </Routes>
  );
}
