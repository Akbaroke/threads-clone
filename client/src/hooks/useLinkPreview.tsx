import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

export interface LinkPreview {
  description: string;
  domain: string;
  favicon: string;
  image: string;
  ogUrl: string;
  sitename: string;
  success: boolean;
  title: string;
  type: string;
}

export default function useLinkPreview(url: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<LinkPreview | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://getlinkpreview.onrender.com/?url=${url}`
        );
        console.log(res.data);
        setData(res.data);
      } catch (error) {
        const err = error as AxiosError;
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    url && fetchData();
  }, [url]);

  return {
    loading,
    error,
    data,
  };
}
