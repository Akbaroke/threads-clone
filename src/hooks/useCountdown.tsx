import { useState, useEffect } from 'react';

const useCountdown = (initialValue: number) => {
  const [countdown, setCountdown] = useState(initialValue);

  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  return { countdown, setCountdown };
};

export default useCountdown;
