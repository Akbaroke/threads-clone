import { useSelector } from 'react-redux';
import { usersType } from '../organisms/SideNav';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import Image from 'next/image';
import { RootState } from '@/store';
import isImageEmpty from '@/utils/isImageEmpty';

type Props = {
  users: usersType;
};

export default function UserInfo({ users }: Props) {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex gap-10 justify-between items-center p-3 hover:bg-gray-100 rounded-xl w-full">
      <div className="flex gap-2 items-center">
        <Image
          src={isImageEmpty(user?.image)}
          alt="foto"
          width={100}
          height={100}
          className="w-12 rounded-full bg-white"
        />
        <div className="hidden lg:block">
          <h1 className="text-[14px] font-semibold text-black">{users.name}</h1>
          <p className="text-[12px] text-gray-400">@{user?.username}</p>
        </div>
      </div>
      <BiDotsHorizontalRounded
        size={22}
        className="text-gray-400 hidden lg:block"
      />
    </div>
  );
}
