"use client";

import { useState, useRef, useEffect } from "react";
import ThoughtOverlay from "./components/ThoughtOverlay";
import TimelineHotspot from "./components/TimelineHotspot";
import SceneTransition from "./components/SceneTransition";

// Define hotspots timeline with timing, positions, and keyframes
const hotspotsTimeline = [
  {
    id: 1,
    label: "happy-man",
    startTime: 2,
    endTime: 4,
    keyframes: [
      { time: 2, top: 0, left: 50 },
      { time: 4, top: 150, left: 50 },
    ],
    thought: {
      texts: [
        "Zolang ik het druk heb, hoef ik niet te voelen hoe moe ik eigenlijk ben.",
        "Ik heb geen tijd voor rust, dat is tijdsverspilling.",
        "Ik zeg tegen anderen dat ze mild moeten zijn voor zichzelf. Maar ik weet niet hoe dat voelt.",
      ],
      image: "/images/texting.png",
      backgroundImage: "/backgrounds/still-dark.gif",
    },
  },
  {
    id: 2,
    label: "Secondary interaction point",
    startTime: 11,
    endTime: 15,
    keyframes: [
      { time: 11.5, top: 100, left: 50 },
      { time: 15, top: -50, left: 50 },
    ],
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
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Update current time using requestAnimationFrame
  const updateTime = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
    animationFrameRef.current = requestAnimationFrame(updateTime);
  };

  useEffect(() => {
    // Start tracking video time
    if (videoRef.current) {
      animationFrameRef.current = requestAnimationFrame(updateTime);
    }

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleHotspotClick = (thought) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveThought(thought);
    }, 1200);
  };

  const handleCloseThought = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveThought(null);
    }, 1200);
  };

  const handleTransitionComplete = () => {
    setIsTransitioning(false);
  };

  return (
    <>
      {/* Main content layer */}
      <main className="w-[100vh] h-[100vw] bg-gray-50 fixed inset-0 m-auto z-0">
        <div className="absolute bottom-0 w-full flex justify-center">
          {/* Video Component */}
          <div className="relative">
            <video
              ref={videoRef}
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
      <div className="fixed inset-0 z-10">
        <div className="w-full h-full relative">
          {hotspotsTimeline.map((hotspot) => (
            <TimelineHotspot
              key={hotspot.id}
              {...hotspot}
              currentTime={currentTime}
              onClick={handleHotspotClick}
            />
          ))}
        </div>
      </div>

      {/* Scene transition overlay */}
      {isTransitioning && (
        <div className="z-20">
          <SceneTransition onTransitionComplete={handleTransitionComplete} />
        </div>
      )}

      {/* Thought overlay */}
      {activeThought && (
        <div className="z-30">
          <ThoughtOverlay
            content={activeThought}
            onClose={handleCloseThought}
          />
        </div>
      )}
    </>
  );
}
