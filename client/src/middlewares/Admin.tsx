import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

export default function Admin({ children }: Props) {
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);

  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/signin" state={{ from: location }} replace={true} />;
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/" replace={true} />;
  }

  return children;
}
