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

  return (
    <main className="w-[100vh] h-[100vw] bg-gray-50 fixed inset-0 m-auto">
      <div className="absolute right-0 h-full flex items-center">
        {/* Avatar Image */}
        <img
          src={imageSrc}
          alt="Avatar"
          className="cursor-pointer"
          style={{ width: imageWidth, height: imageHeight }}
          onClick={() => setShowThought(true)}
        />

        {/* Thought Bubble */}
        {showThought && (
          <div className="absolute left-0 -translate-x-full bg-white p-4 rounded-2xl shadow-lg animate-fadeIn">
            <p className="text-gray-700">Today everything feels a bit heavy…</p>

            {/* Back Button */}
            <button
              onClick={() => setShowThought(false)}
              className="mt-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors duration-200"
            >
              Back
            </button>

            {/* TODO: Add sound effect or sensory feedback when thought bubble appears */}
            {/* TODO: Add haptic feedback for mobile devices */}
          </div>
        )}
      </div>
    </main>
  );
}
