import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiFillHeart, AiFillPlusCircle, AiOutlineHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { PiRepeatBold } from 'react-icons/pi';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { FiSend } from 'react-icons/fi';

interface ContentDatas {
  id: string;
  username: string;
  imageProfile: string;
  isVerified: boolean;
  content: {
    text: string;
    image?: string;
    video?: string;
    hastag?: string[];
  };
  isLiked: boolean;
  likeCount: number;
  replies: {
    count: number;
    imageProfile: string[];
  };
  updated_at: number;
  created_at: number;
}

export default function Home() {
  const [contentDatas, setContentDatas] = useState<ContentDatas[]>();
  const [isLike, setIsLike] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('http://localhost:5000/contentDatas');
      setContentDatas(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      {contentDatas?.map((contentData) => (
        <div key={contentData.id} className="flex flex-col pt-6 border-b">
          <div className="flex justify-between gap-3">
            <div className="relative w-max">
              <img
                src={contentData.imageProfile}
                alt={contentData.username}
                className="rounded-full"
              />
              <div className="absolute -bottom-1 -right-1 bg-white text-black rounded-full">
                <AiFillPlusCircle size={22} />
              </div>
            </div>
            <div className="flex-1 flex justify-between items-start">
              <h1 className="font-semibold">{contentData.username}</h1>
              <div className="flex items-center gap-2">
                <p className="text-gray-400 text-[14px]">20 jam</p>
                <BiDotsHorizontalRounded size={22} />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 relative -top-6">
            <div className="pl-16">
              <p className="">{contentData.content.text}</p>
            </div>
            <div className="flex gap-5 items-center pl-16">
              {isLike ? (
                <AiFillHeart
                  size={23.5}
                  className="fill-red-600"
                  onClick={() => setIsLike(!isLike)}
                />
              ) : (
                <AiOutlineHeart
                  size={23.5}
                  onClick={() => setIsLike(!isLike)}
                />
              )}
              <FaRegComment size={20} />
              <PiRepeatBold size={20} />
              <FiSend size={20} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
