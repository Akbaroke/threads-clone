import { AiFillPlusCircle } from 'react-icons/ai';
import LikeButton from '../atoms/LikeButton';
import { FaRegComment } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { ContentDatas } from '@/pages/Home';
import ModalProfilePicture from '../molecules/ModalProfilePicture';
import axios from 'axios';
import { useState } from 'react';
import { Badge, Skeleton } from '@mantine/core';
import { Image } from 'primereact/image';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import LazyLoad from 'react-lazy-load';
import RepliesButton from '../atoms/RepliesButton';
import TimeDisplay from '../atoms/TimeDisplay';

type Props = {
  contentData: ContentDatas;
};

export default function CardContent({ contentData }: Props) {
  const [isFollowing, setIsFollowing] = useState(contentData.isFollowing);
  const [isLike, setIsLike] = useState(contentData.isLiked);
  const [likeCount, setLikeCount] = useState(contentData.likeCount);
  const [isReplies, setIsReplies] = useState(contentData.isRepliesed);
  const [repliesCount, setRepliesCount] = useState(contentData.replies.count);

  const animationRepliesCount = {
    '--value': repliesCount,
  } as React.CSSProperties;

  const animationLikeCount = {
    '--value': likeCount,
  } as React.CSSProperties;

  const handleRepliesed = async () => {
    setIsReplies(!isReplies);
    setRepliesCount(isReplies ? repliesCount - 1 : repliesCount + 1);
    try {
      const res = await axios.patch(
        `http://localhost:5000/contentDatas/${contentData.id}`,
        {
          isRepliesed: !isReplies,
          replies: {
            count: isReplies ? repliesCount - 1 : repliesCount + 1,
            imageProfile: [...contentData.replies.imageProfile],
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      setIsReplies(!isReplies);
      setRepliesCount(isReplies ? repliesCount + 1 : repliesCount - 1);
      console.log(error);
    }
  };

  const handleLiked = async () => {
    setIsLike(!isLike);
    setLikeCount(isLike ? likeCount - 1 : likeCount + 1);
    try {
      const res = await axios.patch(
        `http://localhost:5000/contentDatas/${contentData.id}`,
        {
          isLiked: !isLike,
          likeCount: isLike ? likeCount - 1 : likeCount + 1,
        }
      );
      console.log(res.data);
    } catch (error) {
      setIsLike(!isLike);
      setLikeCount(isLike ? likeCount + 1 : likeCount - 1);
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
      <div className="relative z-10 flex justify-between gap-3">
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
              className="absolute text-black transition-all duration-300 bg-white rounded-full cursor-pointer -bottom-1 -right-1 hover:scale-110"
              onClick={handleFollowed}>
              <AiFillPlusCircle size={22} />
            </div>
          )}
        </div>
        <div className="flex items-start justify-between flex-1 h-max">
          <div className="flex items-center gap-2">
            <h1 className="font-semibold">{contentData.username}</h1>
            {contentData.isVerified && (
              <svg
                className="x1lliihq x1n2onr6"
                color="rgb(0, 149, 246)"
                fill="rgb(0, 149, 246)"
                height="18"
                role="img"
                viewBox="0 0 40 40"
                width="18">
                <title>Account Verified</title>
                <path
                  d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
                  fill-rule="evenodd"></path>
              </svg>
            )}
          </div>
          <TimeDisplay
            time={contentData.created_at}
            className="text-gray-400 text-[14px]"
          />
        </div>
      </div>
      <div className="relative flex flex-col gap-5 ml-16 -top-6 z-20">
        <p>{contentData.content.text}</p>
        <div className="flex gap-2">
          {contentData.content.hastags?.flatMap((value, index) => (
            <Badge key={index} color="gray" size="sm">
              {value}
            </Badge>
          ))}
        </div>
        <div className="relative sm:max-w-xl lg:max-w-2xl w-full gap-4 overflow-x-scroll no-scrollbar">
          <div className="flex gap-4 w-max">
            {contentData.content?.images?.map((image, index) => (
              <ImageContent key={index} image={image} />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-5">
          <LikeButton isLike={isLike} onLike={handleLiked} />
          <FaRegComment size={20} />
          <RepliesButton isReplies={isReplies} onReplies={handleRepliesed} />

          <FiSend size={20} />
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <div className="flex items-center">
            <span className="countdown">
              <p style={animationRepliesCount}></p>
            </span>
            <p className={`relative ${repliesCount > 9 ? '' : '-left-2'}`}>
              replies
            </p>
          </div>
          {repliesCount > 0 && <p>∙</p>}
          <div className="flex items-center pl-2">
            <span className="countdown">
              <p style={animationLikeCount}></p>
            </span>
            <p className={`relative ${likeCount > 9 ? '' : '-left-2'}`}>
              likes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImageContent({ image }: { image: string }) {
  const [isLoadedContent, setIsLoadedContent] = useState(true);

  return (
    <div
      className={`max-w-[200px] md:max-w-[250px] lg:max-w-[300px] rounded-lg relative border${
        !isLoadedContent ? 'h-max' : 'max-h-[200px]'
      }`}>
      <Skeleton
        height={200}
        width={200}
        className={`rounded-lg ${!isLoadedContent && 'hidden absolute z-0'}`}
      />
      <LazyLoad>
        <Image
          src={image}
          alt=""
          className="w-full overflow-hidden rounded-lg shadow-md relative z-10"
          preview
          loading="lazy"
          onLoad={() => setIsLoadedContent(false)}
        />
      </LazyLoad>
    </div>
  );
}
