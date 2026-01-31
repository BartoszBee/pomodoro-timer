"use client";

import { useState } from "react";
import { usePomodoro } from "../hooks/usePomodoro";
import SettingsModal from "./SettingsModal";
import ModeToggleButton from "./ModeToggleButton";

export default function Timer() {
  const {
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
  } = usePomodoro();

  const [showSettings, setShowSettings] = useState(false);

  const handleSave = () => {
    setShowSettings(false);
    reset();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative px-4">
      <button
        onClick={toggleSound}
        className="mb-4 text-2xl"
        aria-label={isSoundOn ? "Wyłącz dźwięk" : "Włącz dźwięk"}
      >
        {isSoundOn ? "🔊" : "🔇"}
      </button>

      <h1 className="text-4xl font-bold mb-6">Pomodoro Timer</h1>

      <div
        className="text-6xl font-mono mb-4"
        aria-label={`Pozostały czas: ${formattedTime}`}
        aria-live="polite"
      >
        {formattedTime}
      </div>

      <div className="space-x-4">
        <button
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded cursor-pointer"
          onClick={start}
          aria-label="Rozpocznij timer"
        >
          Start
        </button>
        <button
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded cursor-pointer"
          onClick={pause}
          aria-label="Wstrzymaj timer"
        >
          Pause
        </button>
        <button
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded cursor-pointer"
          onClick={reset}
          aria-label="Zresetuj timer"
        >
          Reset
        </button>
      </div>

      <div
        role="status"
        aria-live="polite"
        className={`mt-8 px-4 py-2 rounded-full border-2 font-bold text-xl text-black w-full text-center ${
          isBreak ? "border-red-600" : "bg-green-500"
        }`}
      >
        {isBreak ? "Przerwa" : "Praca"}
      </div>

      <div className="mt-12 flex gap-3">
        <button
          onClick={() => setShowSettings(true)}
          className="text-xs px-3 py-1 cursor-pointer text-blue-500 border border-blue-500 hover:bg-gray-200/70 rounded-md shadow-sm transition"
          aria-label="Otwórz ustawienia timera"
        >
          Zmień ustawienia
        </button>

        <ModeToggleButton isBreak={isBreak} onToggle={toggleMode} />
      </div>

      <SettingsModal
        show={showSettings}
        workTime={workTime}
        breakTime={breakTime}
        onChangeWork={setWorkTime}
        onChangeBreak={setBreakTime}
        onClose={() => setShowSettings(false)}
        onSave={handleSave}
      />
    </div>
  );
}
