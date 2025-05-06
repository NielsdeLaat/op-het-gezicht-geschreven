"use client";

import { useState } from "react";
import ThoughtOverlay from "./components/ThoughtOverlay";
import InteractiveHotspot from "./components/InteractiveHotspot";
import SceneTransition from "./components/SceneTransition";

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
    label: "calm-man",
    thought: {
      texts: [
        "Als ik zou verdwijnen, zou iemand het merken?",
        "Soms kijk ik naar mezelf in de spiegel en zie ik iemand die ik niet meer herken.",
        "Ik weet niet meer wanneer ik me voor het laatst écht blij voelde.",
      ],
      image: "/images/child-alone.png",
      backgroundImage: "/backgrounds/still-dark.gif",
    },
  },
];

export default function Home() {
  const [activeThought, setActiveThought] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleHotspotClick = (thought) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveThought(thought);
    }, 1200); // Half transition duration
  };

  const handleCloseThought = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveThought(null);
    }, 1200); // Half transition duration
  };

  const handleTransitionComplete = () => {
    setIsTransitioning(false);
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

      {/* Scene transition overlay */}
      {isTransitioning && (
        <SceneTransition onTransitionComplete={handleTransitionComplete} />
      )}

      {/* Thought overlay */}
      {activeThought && (
        <ThoughtOverlay content={activeThought} onClose={handleCloseThought} />
      )}
    </>
  );
}
