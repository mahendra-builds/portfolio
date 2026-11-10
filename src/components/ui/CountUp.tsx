'use client';

import React, { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  value: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

const CountUp: React.FC<CountUpProps> = ({
  value,
  suffix = '',
  duration = 1600,
  className = '',
}) => {
  const numeric = Number(value);
  const isNumeric = Number.isFinite(numeric);

  const [display, setDisplay] = useState(isNumeric ? numeric : 0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isNumeric) return;

    const element = ref.current;
    if (!element) return;

    started.current = false;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(numeric);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || started.current) return;
          started.current = true;

          const startTime = performance.now();

          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * numeric));
            frameRef.current = progress < 1 ? requestAnimationFrame(tick) : null;
          };

          setDisplay(0);
          frameRef.current = requestAnimationFrame(tick);
          observer.disconnect();
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [isNumeric, numeric, duration]);

  if (!isNumeric) {
    return (
      <span className={className}>
        {value}
        {suffix}
      </span>
    );
  }

  return (
    <span className={className} ref={ref}>
      {display}
      {suffix}
    </span>
  );
};

export default CountUp;
