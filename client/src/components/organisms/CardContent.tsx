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
      const res = await axios.patch(`http://localhost:5000/contentDatas/${contentData.id}`, {
        isLiked: !contentData.isLiked,
        likeCount: contentData.likeCount + 1
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollowed = async () => {
    try {
      setIsFollowing(!isFollowing);
      const res = await axios.patch(`http://localhost:5000/contentDatas/${contentData.id}`, {
        isFollowing: !contentData.isFollowing,
      });
      console.log(res.data);
    } catch (error) {
      setIsFollowing(!isFollowing);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col pt-6 border-b">
      <div className="relative z-30 flex justify-between gap-3 overflow-x-hidden">
        <div className="relative w-max">
          <ModalProfilePicture imgSrc={contentData.imageProfile}>
            <img src={contentData.imageProfile} alt={contentData.username} className="rounded-full w-[50px] h-[50px] object-cover bg-gray-400" />
          </ModalProfilePicture>
          {!isFollowing && (
            <div className="absolute text-black transition-all duration-300 bg-white rounded-full cursor-pointer -bottom-1 -right-1 hover:scale-110" onClick={handleFollowed}>
              <AiFillPlusCircle size={22} />
            </div>
          )}
        </div>
        <div className="flex items-start justify-between flex-1">
          <div className="flex items-center gap-2">
            <h1 className="font-semibold">{contentData.username}</h1>
            {contentData.isVerified && (
              <svg className="x1lliihq x1n2onr6" color="rgb(0, 149, 246)" fill="rgb(0, 149, 246)" height="18" role="img" viewBox="0 0 40 40" width="18">
                <title>Account Verified</title>
                <path
                  d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
                  fill-rule="evenodd"></path>
              </svg>
            )}
          </div>
          <div className="flex items-center gap-2">
            <p className="text-gray-400 text-[14px]">20h</p>
            <BiDotsHorizontalRounded size={22} />
          </div>
        </div>
      </div>
      <div className="relative flex flex-col gap-5 pl-16 -top-6">
        <p>{contentData.content.text}</p>
        <div className="flex gap-2">
          {contentData.content.hastags?.flatMap((value, index) => (
            <p key={index}>{value}</p>
          ))}
        </div>
        <div className="relative max-w-xl gap-4 overflow-x-scroll no-scrollbar">
          <div className="flex gap-4 w-max">
            {contentData.content?.images?.map((image, index) => (
              <Skeleton visible={isLoadedContent} className="max-w-[200px] sm:max-w-[300px] rounded-lg h-max max-h-fit" key={index}>
                {isLoadedContent && <img src={IMG_PLACE} alt="" className="w-full" />}
                <LazyLoad>
                  <Image ref={preview} src={image} alt="" className="w-full overflow-hidden rounded-lg shadow-md" preview onLoad={() => setIsLoadedContent(false)} />
                </LazyLoad>
              </Skeleton>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-5">
          <LikeButton onClick={handleLiked} isLiked={contentData.isLiked} />
          <FaRegComment size={20} />
          <PiRepeatBold size={20} />
          <FiSend size={20} />
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <p>{contentData.replies.count} replies</p>
          <p>•</p>
          <p>{contentData.likeCount} likes</p>
        </div>
      </div>
    </div>
  );
}
