"use client";

import { useEffect, useState, useRef } from "react";

const WORK_DURATION = 0.5 * 60;
const BREAK_DURATION = 0.25 * 60;

export default function Timer() {
  const [secondsLeft, setSecondsLeft] = useState(WORK_DURATION);
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

          // 🔔 Odtwórz dźwięk jeśli włączony
          if (isSoundOn && alarm.current) {
            alarm.current.currentTime = 0;
            alarm.current.play().catch((e) =>
              console.warn("Nie udało się odtworzyć dźwięku:", e)
            );
          }

          return nextIsBreak ? BREAK_DURATION : WORK_DURATION;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isBreak, isSoundOn]);

  const minutes = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center">
      <div className="text-6xl font-mono mb-4">
        {minutes}:{seconds}
      </div>

      {/* 🔊 Przycisk przełączania dźwięku */}
      <button
        onClick={() => setIsSoundOn((prev) => !prev)}
        className="mb-4 text-2xl"
        aria-label="Przełącz dźwięk"
      >
        {isSoundOn ? "🔊" : "🔇"}
      </button>

      <div className="space-x-4">
        <button
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded cursor-pointer"
          onClick={() => setIsRunning(true)}
        >
          Start
        </button>
        <button
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded cursor-pointer"
          onClick={() => setIsRunning(false)}
        >
          Pause
        </button>
        <button
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded cursor-pointer"
          onClick={() => {
            setIsRunning(false);
            setSecondsLeft(isBreak ? BREAK_DURATION : WORK_DURATION);
          }}
        >
          Reset
        </button>
      </div>

      <div
        className={`mt-8 px-4 py-2 rounded-full border-2 font-bold text-xl text-black w-full text-center ${
          isBreak ? "border-red-600" : "bg-green-500"
        }`}
      >
        {isBreak ? "Przerwa" : "Praca"}
      </div>
    </div>
  );
}
