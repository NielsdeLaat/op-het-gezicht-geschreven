"use client";

import { useState, useRef } from "react";

const thoughtContainerClass =
  "absolute bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl animate-fadeIn max-w-xs cursor-move z-50";
const overlayClass =
  "w-[100vh] h-[100vw] fixed inset-0 m-auto z-40 -rotate-90 origin-center bg-cover bg-center bg-no-repeat";
const textClass = "text-gray-700 text-lg select-none";
const mediaClass = "w-full h-auto rounded-lg select-none";

export default function ThoughtOverlay({ content, onClose }) {
  const [isDragging, setIsDragging] = useState(false);
  const dragTimeoutRef = useRef(null);
  const positionsRef = useRef({});
  const overlayRef = useRef(null);

  const handleOverlayClick = (e) => {
    // Only close if clicking the background overlay, not the thoughts
    if (e.target === overlayRef.current && !isDragging) {
      onClose();
    }
  };

  const getInitialPosition = (index) => {
    // Fixed positions for thoughts
    const positions = [
      { left: "20%", top: "30%" },
      { left: "60%", top: "40%" },
      { left: "40%", top: "60%" },
    ];
    return positions[index] || { left: "50%", top: "50%" };
  };

  const handleDragStart = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);

    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const offsetX = (e.clientX || e.touches[0].clientX) - rect.left;
    const offsetY = (e.clientY || e.touches[0].clientY) - rect.top;

    const handleDrag = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const containerWidth = window.innerHeight;
      const containerHeight = window.innerWidth;

      const clientX = e.clientX || e.touches[0].clientX;
      const clientY = e.clientY || e.touches[0].clientY;

      const x = containerWidth - (clientY - offsetX);
      const y = clientX - offsetY;

      element.style.left = `${(x / containerWidth) * 100}%`;
      element.style.top = `${(y / containerHeight) * 100}%`;
      element.style.transform = "none";
    };

    const handleDragEnd = (e) => {
      e.preventDefault();
      e.stopPropagation();
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("touchmove", handleDrag);
      document.removeEventListener("touchend", handleDragEnd);

      const computedStyle = window.getComputedStyle(element);
      positionsRef.current[id] = {
        left: computedStyle.getPropertyValue("left"),
        top: computedStyle.getPropertyValue("top"),
        transform: "none",
      };

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
    document.addEventListener("touchmove", handleDrag);
    document.addEventListener("touchend", handleDragEnd);
  };

  return (
    <div
      ref={overlayRef}
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
              style={positionsRef.current[index] || getInitialPosition(index)}
              onMouseDown={(e) => handleDragStart(e, index)}
              onTouchStart={(e) => handleDragStart(e, index)}
            >
              <p className={textClass}>{text}</p>
            </div>
          ))
        : content.text && (
            <div
              className={thoughtContainerClass}
              style={positionsRef.current[0] || getInitialPosition(0)}
              onMouseDown={(e) => handleDragStart(e, 0)}
              onTouchStart={(e) => handleDragStart(e, 0)}
            >
              <p className={textClass}>{content.text}</p>
            </div>
          )}
      {content.image && (
        <div
          className={thoughtContainerClass}
          style={positionsRef.current["image"] || getInitialPosition(3)}
          onMouseDown={(e) => handleDragStart(e, "image")}
          onTouchStart={(e) => handleDragStart(e, "image")}
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
          style={positionsRef.current["video"] || getInitialPosition(4)}
          onMouseDown={(e) => handleDragStart(e, "video")}
          onTouchStart={(e) => handleDragStart(e, "video")}
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
          style={positionsRef.current["audio"] || getInitialPosition(5)}
          onMouseDown={(e) => handleDragStart(e, "audio")}
          onTouchStart={(e) => handleDragStart(e, "audio")}
        >
          <audio src={content.audio} controls className={mediaClass} />
        </div>
      )}
    </div>
  );
}
