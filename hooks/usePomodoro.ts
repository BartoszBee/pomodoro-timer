"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UsePomodoroReturn {
  secondsLeft: number;
  isRunning: boolean;
  isBreak: boolean;
  workTime: number;
  breakTime: number;
  isSoundOn: boolean;
  formattedTime: string;
  start: () => void;
  pause: () => void;
  reset: () => void;
  toggleMode: () => void;
  toggleSound: () => void;
  setWorkTime: (minutes: number) => void;
  setBreakTime: (minutes: number) => void;
}

export function usePomodoro(): UsePomodoroReturn {
  const [workTime, setWorkTimeState] = useState(25);
  const [breakTime, setBreakTimeState] = useState(5);
  const [secondsLeft, setSecondsLeft] = useState(workTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);

  const alarm = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    alarm.current = new Audio("/alarm.mp3");
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          const nextIsBreak = !isBreak;
          setIsBreak(nextIsBreak);
          setIsRunning(false);

          if (isSoundOn && alarm.current) {
            alarm.current.currentTime = 0;
            alarm.current
              .play()
              .catch((e) =>
                console.warn("Nie udało się odtworzyć dźwięku:", e)
              );
          }

          return nextIsBreak ? breakTime * 60 : workTime * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isBreak, isSoundOn, workTime, breakTime]);

  const minutes = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");
  const formattedTime = `${minutes}:${seconds}`;

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setSecondsLeft(isBreak ? breakTime * 60 : workTime * 60);
  }, [isBreak, breakTime, workTime]);

  const toggleMode = useCallback(() => {
    const nextIsBreak = !isBreak;
    setIsBreak(nextIsBreak);
    setIsRunning(false);
    setSecondsLeft(nextIsBreak ? breakTime * 60 : workTime * 60);
  }, [isBreak, breakTime, workTime]);

  const toggleSound = useCallback(() => setIsSoundOn((prev) => !prev), []);

  const setWorkTime = useCallback((minutes: number) => {
    setWorkTimeState(minutes);
  }, []);

  const setBreakTime = useCallback((minutes: number) => {
    setBreakTimeState(minutes);
  }, []);

  return {
    secondsLeft,
    isRunning,
    isBreak,
    workTime,
    breakTime,
    isSoundOn,
    formattedTime,
    start,
    pause,
    reset,
    toggleMode,
    toggleSound,
    setWorkTime,
    setBreakTime,
  };
}
