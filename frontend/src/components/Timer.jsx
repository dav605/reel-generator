// frontend/src/components/Timer.jsx
import { useEffect, useState } from 'react';

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (sec) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className="mt-4 text-lg font-medium text-green-600">
      ⏳ Time Left: {formatTime(timeLeft)}
    </div>
  );
}
