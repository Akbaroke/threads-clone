import { AiFillPlusCircle } from 'react-icons/ai';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import LikeButton from '../atoms/LikeButton';
import { FaRegComment } from 'react-icons/fa';
import { PiRepeatBold } from 'react-icons/pi';
import { FiSend } from 'react-icons/fi';
import { ContentDatas } from '@/pages/Home';
import ModalProfilePicture from '../molecules/ModalProfilePicture';
import axios from 'axios';
import { useRef, useState } from 'react';
import { Skeleton } from '@mantine/core';
import IMG_PLACE from '@/assets/image-place.jpg';
import { Image } from 'primereact/image';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import LazyLoad from 'react-lazy-load';

type Props = {
  contentData: ContentDatas;
};

export default function CardContent({ contentData }: Props) {
  const [isFollowing, setIsFollowing] = useState(contentData.isFollowing);
  const [isLoadedContent, setIsLoadedContent] = useState(true);
  const preview = useRef(null);

  const handleLiked = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/contentDatas/${contentData.id}`,
        {
          isLiked: !contentData.isLiked,
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollowed = async () => {
    try {
      setIsFollowing(!isFollowing);
      const res = await axios.patch(
        `http://localhost:5000/contentDatas/${contentData.id}`,
        {
          isFollowing: !contentData.isFollowing,
        }
      );
      console.log(res.data);
    } catch (error) {
      setIsFollowing(!isFollowing);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col pt-6 border-b">
      <div className="flex justify-between gap-3 relative z-30">
        <div className="relative w-max">
          <ModalProfilePicture imgSrc={contentData.imageProfile}>
            <img
              src={contentData.imageProfile}
              alt={contentData.username}
              className="rounded-full w-[50px] h-[50px] object-cover bg-gray-400"
            />
          </ModalProfilePicture>
          {!isFollowing && (
            <div
              className="absolute -bottom-1 -right-1 bg-white text-black rounded-full cursor-pointer hover:scale-110 transition-all duration-300"
              onClick={handleFollowed}>
              <AiFillPlusCircle size={22} />
            </div>
          )}
        </div>
        <div className="flex-1 flex justify-between items-start">
          <h1 className="font-semibold">{contentData.username}</h1>
          <div className="flex items-center gap-2">
            <p className="text-gray-400 text-[14px]">20 jam</p>
            <BiDotsHorizontalRounded size={22} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 relative -top-6 pl-16">
        <p>{contentData.content.text}</p>

        <div className="flex w-full gap-4">
          {contentData.content?.images?.map((image, index) => (
            <Skeleton
              visible={isLoadedContent}
              className="w-8/12 sm:w-1/2 h-max rounded-lg"
              key={index}>
              {isLoadedContent && (
                <img src={IMG_PLACE} alt="" className="w-full" />
              )}
              <LazyLoad threshold={0.95}>
                <Image
                  ref={preview}
                  src={image}
                  alt=""
                  className="w-full rounded-lg shadow-md overflow-hidden"
                  preview
                  onLoad={() => setIsLoadedContent(false)}
                />
              </LazyLoad>
            </Skeleton>
          ))}
        </div>

        <div className="flex gap-5 items-center">
          <LikeButton onClick={handleLiked} isLiked={contentData.isLiked} />
          <FaRegComment size={20} />
          <PiRepeatBold size={20} />
          <FiSend size={20} />
        </div>
      </div>
    </div>
  );
}
