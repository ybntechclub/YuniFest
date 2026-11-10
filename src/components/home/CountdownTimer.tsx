import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
}

export const CountdownTimer: React.FC = () => {
  // Target: Dec 10, 2026 10:00:00 IST
  const targetDate = new Date('2026-12-10T10:00:00+05:30').getTime();

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
    { label: 'DAYS', value: timeLeft.days, color: 'text-slate-950' },
    { label: 'HOURS', value: timeLeft.hours, color: 'text-[#2B59FF]' },
    { label: 'MINUTES', value: timeLeft.minutes, color: 'text-slate-950' },
    { label: 'SECONDS', value: timeLeft.seconds, color: 'text-slate-950' },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
        {timeUnits.map((unit) => (
          <div
            key={unit.label}
            className="bg-white border-[1.5px] border-slate-900 crosshair-corner flex flex-col items-center justify-center py-2 sm:py-3 px-2 sm:px-4 rounded-xl shadow-xs hover:shadow-solid-pop transition-all"
          >
            <div className={`font-headline text-2xl sm:text-3xl md:text-4xl font-black ${unit.color} tracking-tight leading-none`}>
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="font-mono text-[9px] sm:text-[11px] text-slate-600 font-black uppercase tracking-wider sm:tracking-widest mt-1">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
