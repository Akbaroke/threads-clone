import cn from '@/utils/cn';
import Link from 'next/link';
import { useRouter } from 'next/router';

export type NavLinkProps = {
  to: string;
  title: string;
  icon: React.ReactNode;
};

export default function NavLink({ to, title, icon }: NavLinkProps) {
  const { pathname } = useRouter();
  
  return (
    <Link
      href={to}
      className={cn(
        'flex items-center justify-center sm:justify-start gap-2 [&>svg]:text-[24px] sm:[&>svg]:text-[22px] sm:p-3 p-5 rounded-xl sm:hover:bg-gray-100 text-gray-400 w-max lg:w-full',
        {
          'text-black sm:bg-gray-100': pathname
            .split('/')
            .includes(to.replace('/', '')),
        }
      )}>
      {icon}
      <p
        className={cn('text-[16px] font-normal hidden lg:inline', [
          {
            'font-medium': pathname === to,
          },
        ])}>
        {title}
      </p>
    </Link>
  );
}
