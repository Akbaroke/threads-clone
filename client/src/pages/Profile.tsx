import Button from '@/components/atoms/Button';
import VerifedIcon from '@/components/atoms/VerifedIcon';
import ModalProfilePicture from '@/components/molecules/ModalProfilePicture';
import CardContent from '@/components/organisms/CardContent';
import TabProfile from '@/components/templates/TabProfile';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContentDatas } from './Home';

interface ProfileResponse {
  id: string;
  name: string;
  username: string;
  imageProfile: string;
  isVerified: boolean;
  bio: string;
  linkWebsite: string;
  followersCount: number;
}

export default function Profile() {
  const [profile, setProfile] = useState<ProfileResponse>();
  const [threads, setThreads] = useState<ContentDatas[]>();
  const [reposts, setReposts] = useState<ContentDatas[]>();

  const getDataProfile = async () => {
    const res = await axios.get('http://localhost:5000/userProfile');
    setProfile(res.data);
  };

  const getDataThreads = async () => {
    const res = await axios.get('http://localhost:5000/userThreds');
    setThreads(res.data);
  };

  const getDataReposts = async () => {
    const { data } = await axios.get('http://localhost:5000/contentDatas');
    setReposts(data);
  };

  useEffect(() => {
    getDataProfile();
    getDataThreads();
    getDataReposts();
  }, []);

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="flex justify-between sm:items-center">
          <div className="flex flex-col gap-1">
            <h1 className="font-bold text-[18px] sm:text-[22px]">
              {profile.name}
            </h1>
            <h2 className="font-semibold text-[14px] sm:text-[16px]">
              @{profile.username}
            </h2>
            <p className="text-[12px] sm:text-[14px] my-1">{profile.bio}</p>
            <div className="flex gap-2 text-gray-400 text-[12px] sm:text-[14px]">
              <Link to="/">{profile.followersCount} followers</Link>
              {profile.linkWebsite && <p>∙</p>}
              <Link to={profile.linkWebsite} target="_blank">
                {profile.linkWebsite
                  .replace('https://', '')
                  .replace('http://', '')}
              </Link>
            </div>
          </div>
          <div className="relative w-max h-max">
            <ModalProfilePicture imgSrc={profile.imageProfile}>
              <img
                src={profile.imageProfile}
                alt={profile.username}
                className="rounded-full w-[80px] h-[80px] object-cover bg-gray-400"
              />
            </ModalProfilePicture>
            {profile.isVerified && (
              <div className="absolute -bottom-1 left-1 bg-white rounded-full p-[2px]">
                <VerifedIcon size={20} />
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <Button variant="outline">Edit profile</Button>
          <Button variant="outline">Share profile</Button>
        </div>
      </div>
      <TabProfile
        PageThreads={threads?.map((thread) => (
          <CardContent key={thread.id} contentData={thread} />
        ))}
        PageReplies={<h1>Replies</h1>}
        PageReposts={reposts
          ?.filter((repost) => repost.isReposted === true)
          .map((repost) => (
            <CardContent key={repost.id} contentData={repost} />
          ))}
      />
    </div>
  );
}
