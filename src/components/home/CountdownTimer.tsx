import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
}

export const CountdownTimer: React.FC = () => {
  // Target: Dec 10, 2026 09:00:00 IST
  const targetDate = new Date('2026-12-10T09:00:00+05:30').getTime();

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
      isCompleted: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {timeUnits.map((unit) => (
          <div
            key={unit.label}
            className="mdnt-card crosshair-corner flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl"
          >
            <div className="font-headline text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
              {String(unit.value).padStart(2, '0')}
            </div>
            
            <div className="font-mono text-[9px] sm:text-[11px] font-bold tracking-widest text-[#F5C451] uppercase mt-1">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
