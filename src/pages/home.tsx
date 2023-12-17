import { HeadMetaData } from '@/components/HeadMetaData';
import Loader from '@/components/atoms/Loader';
import CardContent from '@/components/organisms/CardContent';
import Layout from '@/components/templates/Layout';
import TabHome from '@/components/templates/TabHome';
import useSWRContent from '@/hooks/useSWRContent';
import InfiniteScroll from 'react-infinite-scroll-component';

const Home = () => {
  const { data, error, size, setSize } = useSWRContent();

  const handleOnScroll = () => {
    console.log('Next Page');
    setSize(size + 1);
  };
  console.log({ data, error, size });

  const isEndContent = data ? data[size - 1]?.length === 0 : true;

  return (
    <Layout>
      <HeadMetaData title="Home" />
      {!data ? (
        <h1>Content is Empty</h1>
      ) : (
        <InfiniteScroll
          dataLength={data ? data.length : 0}
          next={handleOnScroll}
          hasMore={!isEndContent}
          loader={<Loader className="m-auto my-8 md:mb-8 mb-20" />}
          endMessage={<p>No more content to load.</p>}>
          <TabHome
            PageForYou={data?.flat().map((content) => (
              <CardContent contentData={content} key={content.id} />
            ))}
            PageFollowing={data
              ?.flat()
              .filter((content) => content.isFollowing === true)
              .map((content) => (
                <CardContent key={content.id} contentData={content} />
              ))}
          />
        </InfiniteScroll>
      )}
    </Layout>
  );
};

export default Home;
