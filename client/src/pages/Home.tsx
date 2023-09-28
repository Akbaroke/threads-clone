import CardContent from '@/components/organisms/CardContent';
import TabTop from '@/components/templates/TabTop';
import axios from 'axios';
import { useEffect, useState } from 'react';

export interface ContentDatas {
  id: string;
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

export default function Home() {
  const [contentDatas, setContentDatas] = useState<ContentDatas[]>();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('http://localhost:5000/contentDatas');
      setContentDatas(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <TabTop
        PageForYou={contentDatas?.map((contentData) => (
          <CardContent key={contentData.id} contentData={contentData} />
        ))}
        PageFollowing={contentDatas
          ?.filter((contentData) => contentData.isFollowing === true)
          .map((contentData) => (
            <CardContent key={contentData.id} contentData={contentData} />
          ))}
      />
    </div>
  );
}
