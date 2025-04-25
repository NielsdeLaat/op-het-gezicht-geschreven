"use client";

import { useState } from "react";

// Default values for the avatar
const defaultProps = {
  imageSrc: "/avatars/avatar1.png",
  imageWidth: "auto",
  imageHeight: "90vw",
};

export default function Home({
  imageSrc = defaultProps.imageSrc,
  imageWidth = defaultProps.imageWidth,
  imageHeight = defaultProps.imageHeight,
}) {
  const [showThought, setShowThought] = useState(false);

  const handleAvatarClick = () => {
    setShowThought(true);
  };

  const handleBackClick = () => {
    setShowThought(false);
  };

  return (
    <>
      {/* Main content layer */}
      <main className="w-[100vh] h-[100vw] bg-gray-50 fixed inset-0 m-auto">
        <div className="absolute bottom-0 w-full flex justify-center">
          {/* Avatar Image */}
          <div className="relative">
            <img
              src={imageSrc}
              alt="Avatar"
              className="cursor-pointer"
              style={{ width: imageWidth, height: imageHeight }}
              onClick={handleAvatarClick}
            />
          </div>
        </div>
      </main>

      {/* Overlay layer for interactions */}
      {showThought && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
        >
          <div className="bg-white p-6 rounded-2xl shadow-xl animate-fadeIn max-w-md">
            <p className="text-gray-700 text-lg mb-4">
              Today everything feels a bit heavy…
            </p>

            <button
              onClick={handleBackClick}
              className="cursor-pointer px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors duration-200"
            >
              Back
            </button>

            {/* TODO: Add sound effect or sensory feedback when thought bubble appears */}
            {/* TODO: Add haptic feedback for mobile devices */}
          </div>
        </div>
      )}
    </>
  );
}
