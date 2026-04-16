import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
  compact?: boolean;
}

export default function CountdownTimer({ targetDate, compact }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const calculate = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return { h: 0, m: 0, s: 0 };
      return {
        h: Math.floor(diff / (1000 * 60 * 60)),
        m: Math.floor((diff / (1000 * 60)) % 60),
        s: Math.floor((diff / 1000) % 60)
      };
    };

    const timer = setInterval(() => setTimeLeft(calculate()), 1000);
    setTimeLeft(calculate());
    return () => clearInterval(timer);
  }, [targetDate]);

  const isUrgent = timeLeft.h === 0 && timeLeft.m < 60;

  if (compact) {
    return (
      <span className={`font-mono font-bold ${isUrgent ? 'text-danger' : 'text-accent'}`}>
        {timeLeft.h > 0 && `${timeLeft.h}h `}{timeLeft.m}m {timeLeft.s}s
      </span>
    );
  }

  return (
    <div className="flex gap-2">
      {[
        { label: 'H', value: timeLeft.h },
        { label: 'M', value: timeLeft.m },
        { label: 'S', value: timeLeft.s }
      ].map((t, i) => (
        <div key={i} className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg border ${isUrgent ? 'border-danger/30 bg-danger/10' : 'border-white/10 bg-black/20'}`}>
          <span className={`text-lg font-bold leading-none ${isUrgent ? 'text-danger' : 'text-white'}`}>{t.value.toString().padStart(2, '0')}</span>
          <span className="text-[8px] font-bold text-text-dim uppercase">{t.label}</span>
        </div>
      ))}
    </div>
  );
}
