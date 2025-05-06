"use client";

import { useState } from "react";
import ThoughtOverlay from "./components/ThoughtOverlay";
import InteractiveHotspot from "./components/InteractiveHotspot";

// Define hotspots and their corresponding thoughts
const hotspots = [
  {
    id: 1,
    position: { top: 50, left: 50 },
    label: "happy-man",
    thought: {
      text: "I barely have time to breathe.",
      text: "How long can I keep this up?",
      image: "/images/thought1.jpg",
      // video: "/videos/video1.mp4",
      // audio: "/audio/thought1.mp3",
    },
  },
  {
    id: 2,
    position: { top: 30, left: 70 },
    label: "Secondary interaction point",
    thought: {
      text: "Sometimes I wonder what's beyond...",
    },
  },
  // Add more hotspots as needed
];

export default function Home() {
  const [activeThought, setActiveThought] = useState(null);

  const handleHotspotClick = (thought) => {
    setActiveThought(thought);
  };

  const handleCloseThought = () => {
    setActiveThought(null);
  };

  return (
    <>
      {/* Main content layer */}
      <main className="w-[100vh] h-[100vw] bg-gray-50 fixed inset-0 m-auto">
        <div className="absolute bottom-0 w-full flex justify-center">
          {/* Video Component */}
          <div className="relative">
            <video
              className="cursor-pointer"
              style={{ width: "90vw", height: "auto" }}
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/main-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </main>

      {/* Overlay layer for interactions */}
      <div className="fixed inset-0 z-40">
        <div className="w-full h-full relative">
          {hotspots.map((hotspot) => (
            <InteractiveHotspot
              key={hotspot.id}
              position={hotspot.position}
              onClick={() => handleHotspotClick(hotspot.thought)}
              label={hotspot.label}
            />
          ))}
        </div>
      </div>

      {/* Thought overlay */}
      {activeThought && (
        <ThoughtOverlay content={activeThought} onClose={handleCloseThought} />
      )}
    </>
  );
}
