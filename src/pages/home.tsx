import axios from '@/axios';
import { HeadMetaData } from '@/components/HeadMetaData';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const getMe = async () => {
      try {
        const response = await axios.get('/auth/me');
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    getMe();
  }, []);

  return (
    <main>
      <HeadMetaData title="Home" />
      <p>Hallo Sobat</p>
    </main>
  );
}
