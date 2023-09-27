import NavLink, { NavLinkProps } from '../atoms/NavLink';
import { GoHome } from 'react-icons/go';
import { FiSearch } from 'react-icons/fi';
import { TbEdit } from 'react-icons/tb';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import LOGO from '@/assets/threads-logo.png';
import UserInfo from '../molecules/UserInfo';
import { useNavigate } from 'react-router-dom';

export type usersType = {
  name: string;
  username: string;
  image: string;
};

export default function SideNav() {
  const navigate = useNavigate();
  const users = {
    name: 'Ubay Ramadhan',
    username: 'ubayrmd',
    image: '',
  };

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
    <nav className="hidden sm:flex flex-col justify-between h-screen p-5 border-r max-w-[300px] lg:max-w-none lg:min-w-[300px] sticky top-0">
      <div className="flex flex-col gap-5">
        <div
          className="p-4 hover:bg-gray-100 w-max rounded-full cursor-pointer m-auto"
          onClick={() => navigate('/')}>
          <img src={LOGO} alt="logo" className="w-[30px]" />
        </div>
        <div className="flex flex-col gap-2 items-center lg:items-start">
          {listNavigate.map(({ to, title, icon }, index) => (
            <NavLink to={to} title={title} icon={icon} key={index} />
          ))}
        </div>
      </div>
      <UserInfo users={users} />
    </nav>
  );
}
