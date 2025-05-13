"use client";

export default function InteractiveHotspot({ position, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className="absolute w-[100vw] h-150 rounded-full cursor-pointer transition-colors duration-200"
      style={{
        top: `${position.top}%`,
        left: `${position.left}%`,
        transform: "translate(-50%, -50%)",
      }}
      aria-label={label}
    />
  );
}
