import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

export default function User({ children }: Props) {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/signin" state={{ from: location }} replace={true} />;
  }

  return children;
}
