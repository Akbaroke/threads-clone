import useSWRInfinite from 'swr/infinite';
import axios from '@/axios';

const fetcher = (path: string) =>
  axios.get(path).then((res) => res.data.filter_data);

const useSWRContent = () => {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (pageIndex === 0) {
      return '/content/get?page=1&limit=3';
    }
    if (previousPageData && !previousPageData.length) {
      return null;
    }
    return `/content/get?page=${pageIndex + 1}&limit=3`;
  };

  const { data, error, size, setSize, isLoading } = useSWRInfinite(
    getKey,
    fetcher
  );

  return { data, error, size, setSize, isLoading };
};

export default useSWRContent;
