"use client";

type ModeToggleButtonProps = {
  isBreak: boolean;
  onToggle: () => void;
};

export default function ModeToggleButton({
  isBreak,
  onToggle,
}: ModeToggleButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="text-xs px-3 py-1 bg-blue-400 hover:bg-blue-500 text-white  rounded-md shadow-sm transition cursor-pointer"
    >
      Przełącz na {isBreak ? "pracę" : "przerwę"}
    </button>
  );
}
