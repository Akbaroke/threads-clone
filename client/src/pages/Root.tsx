import LOGO from '@/assets/threads-logo.png';
import { Progress } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Root() {
  const navigate = useNavigate();
  const [loadPercent, setLoadPercent] = useState(0);

  useEffect(() => {
    const increaseLoad = (limit?: number) => {
      const limitPercent = limit ? limit : 100;
      const interval = setInterval(() => {
        setLoadPercent((prev) => {
          if (prev < limitPercent) {
            return prev + 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 30);
    };

    if (loadPercent === 0) {
      increaseLoad(50);
    }
    if (loadPercent === 50) {
      setTimeout(() => {
        increaseLoad(70);
      }, 1000);
    }
    if (loadPercent === 70) {
      setTimeout(() => {
        setLoadPercent(100);
      }, 1500);
    }
    if (loadPercent === 100) {
      setTimeout(() => {
        navigate('/home');
      }, 500);
    }
  }, [loadPercent, navigate]);

  return (
    <div className="grid place-items-center w-screen h-screen">
      <div className="flex flex-col gap-8 items-center">
        <img src={LOGO} alt="logo" className="w-[50px]" />
        <Progress color="dark" value={loadPercent} size="sm" w={100} />
      </div>
    </div>
  );
}
