"use client";

export default function InteractiveHotspot({ position, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className="absolute w-24 h-24 rounded-full bg-red-500/30 hover:bg-red-500/40 cursor-pointer transition-colors duration-200"
      style={{
        top: `${position.top}%`,
        left: `${position.left}%`,
        transform: "translate(-50%, -50%)",
      }}
      aria-label={label}
    />
  );
}
