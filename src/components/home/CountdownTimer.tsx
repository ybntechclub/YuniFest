import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
}

export const CountdownTimer: React.FC = () => {
  // Target: Dec 10, 2026 09:00:00 IST (UTC+05:30)
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
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {timeUnits.map((unit) => (
          <div
            key={unit.label}
            className="relative flex flex-col items-center justify-center p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#0D2345]/90 to-[#07152F]/90 border border-[#F5C451]/30 shadow-card-elevated backdrop-blur-sm group hover:border-[#F5C451]/60 transition-colors"
          >
            {/* Ambient gold glow */}
            <div className="absolute inset-0 bg-[#F5C451]/5 rounded-xl sm:rounded-2xl pointer-events-none group-hover:bg-[#F5C451]/10 transition-colors" />

            <div className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#FFF3C4] to-[#F5C451] tracking-tight">
              {String(unit.value).padStart(2, '0')}
            </div>
            
            <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-slate-300 mt-1">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
