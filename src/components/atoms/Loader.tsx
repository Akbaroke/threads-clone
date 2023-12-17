import { Loader as LoaderCom } from '@mantine/core';

type Props = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

export default function Loader({ size = 'sm', className }: Props) {
  return (
    <LoaderCom color="dark" size={size} variant="oval" className={className} />
  );
}
