import axios from '@/axios';
import { HeadMetaData } from '@/components/HeadMetaData';
import Button from '@/components/atoms/Button';
import CardContent from '@/components/organisms/CardContent';
import Layout from '@/components/templates/Layout';
import TabHome from '@/components/templates/TabHome';
import { useEffect } from 'react';
import useSWRInfinite from 'swr/infinite';

const Home = () => {
  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher);
  console.log({ data, error });

  return (
    <Layout>
      <HeadMetaData title="Home" />
      <Button onClick={() => setSize(size + 1)}>Next Page</Button>
      <TabHome
        PageForYou={data?.flat().map((content) => (
          <CardContent key={content.id} contentData={content} />
        ))}
        PageFollowing={data
          ?.flat()
          .filter((content) => content.isFollowing === true)
          .map((content) => (
            <CardContent key={content.id} contentData={content} />
          ))}
      />
    </Layout>
  );
};

const fetcher = (path: string) =>
  axios.get(path).then((res) => res.data.filter_data);

const getKey = (pageIndex: number, previousPageData: any) => {
  if (pageIndex === 0) {
    return '/content/get?page=1&limit=2';
  }
  if (previousPageData && !previousPageData.length) {
    return null;
  }
  return `/content/get?page=${pageIndex + 1}&limit=2`;
};

export default Home;