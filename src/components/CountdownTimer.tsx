"use client";

import React, { useEffect, useState } from "react";

const CountdownTimer: React.FC = () => {
  const targetDate = new Date("2023-12-31T00:00:00"); // Replace with your specific target date

  interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDate.getTime() - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Countdown Timer</h1>
      <div>
        <p>Days: {timeLeft.days}</p>
        <p>Hours: {timeLeft.hours}</p>
        <p>Minutes: {timeLeft.minutes}</p>
        <p>Seconds: {timeLeft.seconds}</p>
      </div>
    </div>
  );
};

export default CountdownTimer;
