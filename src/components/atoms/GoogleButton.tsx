import Button from './Button';
import { FcGoogle } from 'react-icons/fc';

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function GoogleButton({ children, onClick }: Props) {
  return (
    <Button
      variant="outline"
      className="flex items-center justify-center gap-2"
      onClick={onClick}>
      <FcGoogle size={18} />
      {children}
    </Button>
  );
}
