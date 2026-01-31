"use client";

import { useEffect, useRef } from "react";

type SettingsModalProps = {
  show: boolean;
  workTime: number;
  breakTime: number;
  onChangeWork: (val: number) => void;
  onChangeBreak: (val: number) => void;
  onClose: () => void;
  onSave: () => void;
};

export default function SettingsModal({
  show,
  workTime,
  breakTime,
  onChangeWork,
  onChangeBreak,
  onClose,
  onSave,
}: SettingsModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!show) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-modal-title"
        className="bg-white rounded-lg p-6 w-80 shadow-lg"
      >
        <h2 id="settings-modal-title" className="text-xl font-bold mb-4">
          Ustawienia
        </h2>

        <label htmlFor="work-time-input" className="block mb-2">
          Czas pracy (min):
          <input
            id="work-time-input"
            type="number"
            min={1}
            value={workTime}
            onChange={(e) => onChangeWork(Number(e.target.value))}
            className="w-full mt-1 p-2 border rounded"
          />
        </label>

        <label htmlFor="break-time-input" className="block mb-4">
          Czas przerwy (min):
          <input
            id="break-time-input"
            type="number"
            min={1}
            value={breakTime}
            onChange={(e) => onChangeBreak(Number(e.target.value))}
            className="w-full mt-1 p-2 border rounded"
          />
        </label>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-500 text-white rounded"
            aria-label="Zapisz ustawienia"
          >
            Zapisz
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
            aria-label="Anuluj i zamknij ustawienia"
          >
            Anuluj
          </button>
        </div>
      </div>
    </div>
  );
}
