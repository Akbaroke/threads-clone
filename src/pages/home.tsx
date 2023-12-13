import { HeadMetaData } from '@/components/HeadMetaData';
import CardContent from '@/components/organisms/CardContent';
import Layout from '@/components/templates/Layout';
import TabHome from '@/components/templates/TabHome';
import useSWRContent from '@/hooks/useSWRContent';
import InfiniteScroll from 'react-infinite-scroll-component';

const Home = () => {
  const { data, error, size, setSize } = useSWRContent();
  const handleOnScroll = (): void => {
    console.log('Next Page');
    setSize(size + 1);
  };

  console.log('last data :', data ? data?.flat().length : null);
  console.log({ data: data?.flat() });

  return (
    <Layout>
      <HeadMetaData title="Home" />
      <TabHome
        PageForYou={
          <InfiniteScroll
            dataLength={5}
            next={handleOnScroll}
            hasMore={true}
            inverse={false}
            loader={<h4>Loading...</h4>}>
            {data?.flat().map((content) => (
              <CardContent contentData={content} key={content.id} />
            ))}
          </InfiniteScroll>
        }
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

export default Home;
