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
      texts: [
        "Zolang ik het druk heb, hoef ik niet te voelen hoe moe ik eigenlijk ben.",
        "Ik heb geen tijd voor rust, dat is tijdsverspilling.",
        "Ik zeg tegen anderen dat ze mild moeten zijn voor zichzelf. Maar ik weet niet hoe dat voelt.",
      ],
      image: "/images/texting.png",
      backgroundImage: "/backgrounds/still-dark.gif",
      // video: "/videos/video1.mp4",
      // audio: "/audio/thought1.mp3",
    },
  },
  {
    id: 2,
    position: { top: 30, left: 70 },
    label: "Secondary interaction point",
    thought: {
      text: "Ik heb geen tijd voor rust, dat is tijdsverspilling.",
      backgroundImage: "/images/overlay-bg2.jpg",
    },
  },
  {
    id: 3,
    position: { top: 70, left: 30 },
    label: "Third interaction point",
    thought: {
      text: "Ik zeg tegen anderen dat ze mild moeten zijn voor zichzelf. Maar ik weet niet hoe dat voelt.",
      backgroundImage: "/images/overlay-bg3.jpg",
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
