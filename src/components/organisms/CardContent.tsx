import { AiFillPlusCircle } from 'react-icons/ai';
import LikeButton from '../atoms/LikeButton';
import { FaRegComment } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Badge, Container } from '@mantine/core';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import RepostButton from '../atoms/RepostButton';
import TimeDisplay from '../atoms/TimeDisplay';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { RootState } from '@/store';
import ModalImageProfile from '../molecules/ModalImageProfile';
import VerifiedIcon from '../atoms/VerifiedIcon';
import Link from 'next/link';
import ImageContent from '../atoms/ImageContent';
import useLinkPreview from '@/hooks/useLinkPreview';
import LinkPreview from '../molecules/LinkPreview';

export interface ContentDatas {
  id: number;
  username: string;
  imageProfile: string;
  isVerified: boolean;
  isFollowing?: boolean;
  content: {
    text: string;
    images?: string[];
    video?: string;
    hastags?: string[];
  };
  isLiked: boolean;
  isReposted: boolean;
  likeCount: number;
  replies: {
    count: number;
    imageProfile: string[];
  };
  updated_at: number;
  created_at: number;
}

type Props = {
  contentData: ContentDatas;
};

export default function CardContent({ contentData }: Props) {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isFollowing, setIsFollowing] = useState(contentData.isFollowing);
  const [isLike, setIsLike] = useState(contentData.isLiked);
  const [likeCount, setLikeCount] = useState(contentData.likeCount);
  const [isRepost, setIsRepost] = useState(contentData.isReposted);
  const [repostCount, setRepostCount] = useState(contentData.replies.count);
  const [ulr, setUlr] = useState('');
  const {
    // loading,
    // error,
    data,
  } = useLinkPreview(ulr);

  const animationRepostCount = {
    '--value': repostCount,
  } as React.CSSProperties;

  const animationLikeCount = {
    '--value': likeCount,
  } as React.CSSProperties;

  useEffect(() => {
    function extractFirstURL(text: string): string {
      const urlRegex = /(https?:\/\/[^\s]+)/;
      const match = text.match(urlRegex);
      return match ? match[0] : '';
    }
    const firstURL = extractFirstURL(contentData.content.text);
    firstURL && setUlr(extractFirstURL(contentData.content.text));
  }, [contentData.content]);

  const handleReposted = async () => {
    setIsRepost(!isRepost);
    setRepostCount(isRepost ? repostCount - 1 : repostCount + 1);
    try {
      const res = await axios.patch(
        `http://localhost:5000/contentDatas/${contentData.id}`,
        {
          isReposted: !isRepost,
          replies: {
            count: isRepost ? repostCount - 1 : repostCount + 1,
            imageProfile: [...contentData.replies.imageProfile],
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      setIsRepost(!isRepost);
      setRepostCount(isRepost ? repostCount + 1 : repostCount - 1);
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
          <ModalImageProfile imgSrc={contentData.imageProfile}>
            <Image
              src={contentData.imageProfile}
              alt={contentData.username}
              className="rounded-full w-[50px] h-[50px] object-cover bg-gray-200"
            />
          </ModalImageProfile>
          {!isFollowing && user?.username !== contentData.username && (
            <div
              className="absolute text-black transition-all duration-300 bg-white rounded-full cursor-pointer -bottom-1 -right-1 hover:scale-110"
              onClick={handleFollowed}>
              <AiFillPlusCircle size={22} />
            </div>
          )}
        </div>
        <div className="flex items-start justify-between flex-1 h-max">
          <div className="flex items-center gap-1">
            <h1 className="font-semibold">{contentData.username}</h1>
            {contentData.isVerified && <VerifiedIcon size={15} />}
          </div>
          <TimeDisplay
            time={contentData.created_at}
            className="text-gray-400 text-[14px]"
          />
        </div>
      </div>
      <div className="relative flex flex-col gap-5 ml-16 -top-6 z-20">
        <p className="whitespace-pre-line">
          {contentData.content.text.replace(ulr, '')}
        </p>
        <div className="flex gap-2">
          {contentData.content.hastags?.flatMap((value, index) => (
            <Badge key={index} color="gray" size="sm">
              {value}
            </Badge>
          ))}
        </div>
        {ulr && (
          <Link
            target="_blank"
            href={ulr}
            className="text-blue-500 hover:underline max-w-[180px] truncate">
            {ulr.replace('https://', '').replace('http://', '')}
          </Link>
        )}
        <div className="overflow-x-scroll no-scrollbar">
          <Container size="xs" mx={0} px={0}>
            <div className="flex gap-4 w-max">
              {contentData.content?.images?.map((image, index) => (
                <ImageContent key={index} image={image} />
              ))}
            </div>
          </Container>
        </div>
        {data && <LinkPreview data={data} />}

        <div className="flex items-center gap-5">
          <LikeButton isLike={isLike} onLike={handleLiked} />
          <FaRegComment size={20} />
          <RepostButton isRepost={isRepost} onRepost={handleReposted} />

          <FiSend size={20} />
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          {repostCount > 0 && (
            <div className="flex items-center">
              <span className="countdown">
                <p style={animationRepostCount}></p>
              </span>
              <p className={`relative ${repostCount > 9 ? '' : '-left-2'}`}>
                replies
              </p>
            </div>
          )}
          {repostCount > 0 && <p>∙</p>}
          {likeCount > 0 && (
            <div className="flex items-center pl-2">
              <span className="countdown">
                <p style={animationLikeCount}></p>
              </span>
              <p className={`relative ${likeCount > 9 ? '' : '-left-2'}`}>
                likes
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
