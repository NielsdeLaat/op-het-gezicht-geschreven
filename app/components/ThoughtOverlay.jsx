"use client";

import { useState } from "react";

export default function ThoughtOverlay({ content, onClose }) {
  const [positions, setPositions] = useState({});
  const [isDragging, setIsDragging] = useState(false);

  const handleOverlayClick = (e) => {
    // Only close if clicking the overlay background, not the content
    if (e.target === e.currentTarget && !isDragging) {
      onClose();
    }
  };

  const getRandomPosition = () => {
    const x = Math.random() * 80; // Random position between 0-80%
    const y = Math.random() * 80; // Random position between 0-80%
    const rotation = Math.random() * 20 - 10; // Random rotation between -10 and 10 degrees
    return {
      left: `${x}%`,
      top: `${y}%`,
      transform: `rotate(${rotation}deg)`,
    };
  };

  const handleDragStart = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);

    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const handleDrag = (e) => {
      // Convert mouse coordinates to account for the -90 degree rotation
      const containerWidth = window.innerHeight; // Because of rotation, height becomes width
      const containerHeight = window.innerWidth; // Because of rotation, width becomes height

      // Calculate position relative to the rotated container
      const x = containerWidth - (e.clientY - offsetX); // Invert x coordinate
      const y = e.clientX - offsetY; // Keep y coordinate as is

      element.style.left = `${(x / containerWidth) * 100}%`;
      element.style.top = `${(y / containerHeight) * 100}%`;
      element.style.transform = "none";
    };

    const handleDragEnd = (e) => {
      e.stopPropagation();
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleDragEnd);

      // Save the final position
      const rect = element.getBoundingClientRect();
      setPositions((prev) => ({
        ...prev,
        [id]: {
          left: `${
            ((window.innerHeight - rect.top) / window.innerHeight) * 100
          }%`, // Invert x
          top: `${(rect.left / window.innerWidth) * 100}%`, // Keep y as is
          transform: "none",
        },
      }));

      // Reset dragging state after a small delay to prevent background click
      setTimeout(() => {
        setIsDragging(false);
      }, 100);
    };

    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleDragEnd);
  };

  return (
    <div
      className="w-[100vh] h-[100vw] fixed inset-0 m-auto z-50 -rotate-90 origin-center"
      onClick={handleOverlayClick}
      style={{
        backgroundImage: `url(${
          content.backgroundImage || "/images/default-overlay-bg.jpg"
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {content.texts
        ? content.texts.map((text, index) => (
            <div
              key={index}
              className="absolute bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl animate-fadeIn max-w-xs cursor-move"
              style={positions[index] || getRandomPosition()}
              onMouseDown={(e) => handleDragStart(e, index)}
            >
              <p className="text-gray-700 text-lg select-none">{text}</p>
            </div>
          ))
        : content.text && (
            <div
              className="absolute bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl animate-fadeIn max-w-xs cursor-move"
              style={positions[0] || getRandomPosition()}
              onMouseDown={(e) => handleDragStart(e, 0)}
            >
              <p className="text-gray-700 text-lg select-none">
                {content.text}
              </p>
            </div>
          )}
      {content.image && (
        <div
          className="absolute bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl animate-fadeIn max-w-xs cursor-move"
          style={positions["image"] || getRandomPosition()}
          onMouseDown={(e) => handleDragStart(e, "image")}
        >
          <img
            src={content.image}
            alt="Thought visualization"
            className="w-full h-auto rounded-lg select-none"
          />
        </div>
      )}
      {content.video && (
        <div
          className="absolute bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl animate-fadeIn max-w-xs cursor-move"
          style={positions["video"] || getRandomPosition()}
          onMouseDown={(e) => handleDragStart(e, "video")}
        >
          <video
            src={content.video}
            controls
            className="w-full h-auto rounded-lg select-none"
            playsInline
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      {content.audio && (
        <div
          className="absolute bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl animate-fadeIn max-w-xs cursor-move"
          style={positions["audio"] || getRandomPosition()}
          onMouseDown={(e) => handleDragStart(e, "audio")}
        >
          <audio src={content.audio} controls className="w-full select-none" />
        </div>
      )}
    </div>
  );
}
