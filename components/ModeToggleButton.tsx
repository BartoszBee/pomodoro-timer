"use client";

type ModeToggleButtonProps = {
  isBreak: boolean;
  onToggle: () => void;
};

export default function ModeToggleButton({ isBreak, onToggle }: ModeToggleButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="text-xs px-3 py-1 bg-white/70 hover:bg-white text-purple-600 border border-purple-300 rounded-md shadow-sm transition"
    >
      🔁 Przełącz na {isBreak ? "pracę" : "przerwę"}
    </button>
  );
}
