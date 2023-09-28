import React, { useState, useEffect } from 'react';

interface Props {
  time: number;
  className?: string;
}

const TimeDisplay: React.FC<Props> = ({ time, className }) => {
  const [formattedTime, setFormattedTime] = useState<string>('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = Math.floor(Date.now() / 1000);
      const difference = currentTime - time;

      if (difference >= 31536000) {
        // Lebih dari 1 tahun
        const years = Math.floor(difference / 31536000);
        setFormattedTime(`${years}y`);
      } else if (difference >= 2592000) {
        // Lebih dari 1 bulan (30 hari)
        const months = Math.floor(difference / 2592000);
        setFormattedTime(`${months}mo`);
      } else if (difference >= 604800) {
        // Lebih dari 1 minggu
        const weeks = Math.floor(difference / 604800);
        setFormattedTime(`${weeks}w`);
      } else if (difference >= 86400) {
        // Lebih dari 1 hari
        const days = Math.floor(difference / 86400);
        setFormattedTime(`${days}d`);
      } else if (difference >= 3600) {
        const hours = Math.floor(difference / 3600);
        setFormattedTime(`${hours}h`);
      } else if (difference >= 60) {
        const minutes = Math.floor(difference / 60);
        setFormattedTime(`${minutes}m`);
      } else {
        setFormattedTime(`${difference}s`);
      }
    }, 1000); // Update every second

    return () => clearInterval(intervalId);
  }, [time]);

  return <div className={className}>{formattedTime}</div>;
};

export default TimeDisplay;
