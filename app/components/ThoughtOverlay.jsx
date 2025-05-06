"use client";

import { useState, useRef } from "react";

const thoughtContainerClass =
  "absolute bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl animate-fadeIn max-w-xs cursor-move";
const overlayClass =
  "w-[100vh] h-[100vw] fixed inset-0 m-auto z-50 -rotate-90 origin-center bg-cover bg-center bg-no-repeat";
const textClass = "text-gray-700 text-lg select-none";
const mediaClass = "w-full h-auto rounded-lg select-none";

export default function ThoughtOverlay({ content, onClose }) {
  const [positions, setPositions] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const dragTimeoutRef = useRef(null);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !isDragging) {
      onClose();
    }
  };

  const getRandomPosition = () => {
    const x = Math.random() * 80; // Random position between 0-80%
    const y = Math.random() * 80; // Random position between 0-80%
    return {
      left: `${x}%`,
      top: `${y}%`,
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
      e.preventDefault();
      e.stopPropagation();
      const containerWidth = window.innerHeight;
      const containerHeight = window.innerWidth;

      const x = containerWidth - (e.clientY - offsetX);
      const y = e.clientX - offsetY;

      element.style.left = `${(x / containerWidth) * 100}%`;
      element.style.top = `${(y / containerHeight) * 100}%`;
      element.style.transform = "none";
    };

    const handleDragEnd = (e) => {
      e.preventDefault();
      e.stopPropagation();
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleDragEnd);

      const computedStyle = window.getComputedStyle(element);
      setPositions((prev) => ({
        ...prev,
        [id]: {
          left: computedStyle.getPropertyValue("left"),
          top: computedStyle.getPropertyValue("top"),
          transform: "none",
        },
      }));

      if (dragTimeoutRef.current) {
        clearTimeout(dragTimeoutRef.current);
      }

      dragTimeoutRef.current = setTimeout(() => {
        setIsDragging(false);
        dragTimeoutRef.current = null;
      }, 100);
    };

    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleDragEnd);
  };

  return (
    <div
      className={overlayClass}
      onClick={handleOverlayClick}
      style={{
        backgroundImage: `url(${
          content.backgroundImage || "/images/default-overlay-bg.jpg"
        })`,
      }}
    >
      {content.texts
        ? content.texts.map((text, index) => (
            <div
              key={index}
              className={thoughtContainerClass}
              style={positions[index] || getRandomPosition()}
              onMouseDown={(e) => handleDragStart(e, index)}
            >
              <p className={textClass}>{text}</p>
            </div>
          ))
        : content.text && (
            <div
              className={thoughtContainerClass}
              style={positions[0] || getRandomPosition()}
              onMouseDown={(e) => handleDragStart(e, 0)}
            >
              <p className={textClass}>{content.text}</p>
            </div>
          )}
      {content.image && (
        <div
          className={thoughtContainerClass}
          style={positions["image"] || getRandomPosition()}
          onMouseDown={(e) => handleDragStart(e, "image")}
        >
          <img
            src={content.image}
            alt="Thought visualization"
            className={mediaClass}
          />
        </div>
      )}
      {content.video && (
        <div
          className={thoughtContainerClass}
          style={positions["video"] || getRandomPosition()}
          onMouseDown={(e) => handleDragStart(e, "video")}
        >
          <video
            src={content.video}
            controls
            className={mediaClass}
            playsInline
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      {content.audio && (
        <div
          className={thoughtContainerClass}
          style={positions["audio"] || getRandomPosition()}
          onMouseDown={(e) => handleDragStart(e, "audio")}
        >
          <audio src={content.audio} controls className={mediaClass} />
        </div>
      )}
    </div>
  );
}
