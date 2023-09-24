import NavLink, { NavLinkProps } from '../atoms/NavLink';
import { GoHome } from 'react-icons/go';
import { FiSearch } from 'react-icons/fi';
import { TbEdit } from 'react-icons/tb';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';

export type usersType = {
  name: string;
  username: string;
  image: string;
};

export default function BottomNav() {
  const listNavigate: NavLinkProps[] = [
    {
      to: '/home',
      title: 'Home',
      icon: <GoHome />,
    },
    {
      to: '/search',
      title: 'Search',
      icon: <FiSearch />,
    },
    {
      to: '/newthread',
      title: 'New Thread',
      icon: <TbEdit />,
    },
    {
      to: '/activity',
      title: 'Activity',
      icon: <AiOutlineHeart />,
    },
    {
      to: '/profile',
      title: 'Profile',
      icon: <BiUser />,
    },
  ];

  return (
    <nav className="sm:hidden flex fixed right-0 left-0 bottom-0 border-t">
      {listNavigate.map(({ to, title, icon }, index) => (
        <NavLink to={to} title={title} icon={icon} key={index} />
      ))}
    </nav>
  );
}
