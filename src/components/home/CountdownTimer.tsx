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
    { label: 'DAYS', value: timeLeft.days, color: 'text-[#0A367B]' },
    { label: 'HOURS', value: timeLeft.hours, color: 'text-blue-600' },
    { label: 'MINUTES', value: timeLeft.minutes, color: 'text-[#0A367B]' },
    { label: 'SECONDS', value: timeLeft.seconds, color: 'text-[#0A367B]' },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
        {timeUnits.map((unit) => (
          <div
            key={unit.label}
            className="bg-white border border-slate-200/90 rounded-2xl shadow-xs hover:shadow-md transition-shadow flex flex-col items-center justify-center py-2 sm:py-2.5 px-2 sm:px-4"
          >
            <div className={`font-sourceserif text-2xl sm:text-3xl md:text-4xl font-bold ${unit.color} tracking-tight leading-none`}>
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="font-roboto text-[9px] sm:text-[11px] text-[#3869A6] font-bold uppercase tracking-wider mt-1">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
