import { usersType } from '../organisms/SideNav';
import { BiDotsHorizontalRounded } from 'react-icons/bi';

type Props = {
  users: usersType;
};

export default function UserInfo({ users }: Props) {
  return (
    <div className="flex gap-10 justify-between items-center p-3 hover:bg-gray-100 rounded-xl w-full">
      <div className="flex gap-2 items-center">
        <img
          src={
            users.image ||
            `https://avatars.dicebear.com/api/open-peeps/${users.username}.svg`
          }
          alt=""
          className="w-12 rounded-full bg-white"
        />
        <div>
          <h1 className="text-[14px] font-semibold text-black">{users.name}</h1>
          <p className="text-[12px] text-gray-400">@{users.username}</p>
        </div>
      </div>
      <BiDotsHorizontalRounded size={22} className="text-gray-400" />
    </div>
  );
}
