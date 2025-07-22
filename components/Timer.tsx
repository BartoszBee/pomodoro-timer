"use client";

import { useEffect, useRef, useState } from "react";
import SettingsModal from "./SettingsModal";
import ModeToggleButton from "./ModeToggleButton";

export default function Timer() {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [secondsLeft, setSecondsLeft] = useState(workTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

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
            alarm.current.play().catch((e) =>
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

  const minutes = Math.floor(secondsLeft / 60).toString().padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative px-4">
      {/* 🔊 Przycisk dźwięku */}
      <button
        onClick={() => setIsSoundOn((prev) => !prev)}
        className="mb-4 text-2xl"
        aria-label="Przełącz dźwięk"
      >
        {isSoundOn ? "🔊" : "🔇"}
      </button>

      {/* 🧠 Nagłówek */}
      <h1 className="text-4xl font-bold mb-6">Pomodoro Timer</h1>

      {/* 🕒 Zegar */}
      <div className="text-6xl font-mono mb-4">
        {minutes}:{seconds}
      </div>

      {/* 🎮 Kontrola czasu */}
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
            setSecondsLeft(isBreak ? breakTime * 60 : workTime * 60);
          }}
        >
          Reset
        </button>
      </div>

      {/* 🧾 Status */}
      <div
        className={`mt-8 px-4 py-2 rounded-full border-2 font-bold text-xl text-black w-full text-center ${
          isBreak ? "border-red-600" : "bg-green-500"
        }`}
      >
        {isBreak ? "Przerwa" : "Praca"}
      </div>

      {/* 🧭 Przyciski na dole */}
      <div className="mt-12 flex gap-3">
        <button
          onClick={() => setShowSettings(true)}
          className="text-xs px-3 py-1 bg-white/70 hover:bg-white text-blue-600 border border-blue-300 rounded-md shadow-sm transition"
        >
          ⚙️ Zmień ustawienia
        </button>

        <ModeToggleButton
          isBreak={isBreak}
          onToggle={() => {
            setIsBreak(!isBreak);
            setIsRunning(false);
            setSecondsLeft(!isBreak ? breakTime * 60 : workTime * 60);
          }}
        />
      </div>

      {/* ⚙️ Modal ustawień */}
      <SettingsModal
        show={showSettings}
        workTime={workTime}
        breakTime={breakTime}
        onChangeWork={setWorkTime}
        onChangeBreak={setBreakTime}
        onClose={() => setShowSettings(false)}
        onSave={() => {
          setShowSettings(false);
          setSecondsLeft(isBreak ? breakTime * 60 : workTime * 60);
        }}
      />
    </div>
  );
}
