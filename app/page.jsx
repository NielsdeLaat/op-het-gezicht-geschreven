"use client";

import { useState, useRef, useEffect } from "react";
import ThoughtOverlay from "./components/ThoughtOverlay";
import TimelineHotspot from "./components/TimelineHotspot";
import SceneTransition from "./components/SceneTransition";
import { hotspotsTimeline } from "./data/hotspots";

export default function Home() {
  const [activeThought, setActiveThought] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const videoRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Video time tracking system

  const updateTime = () => {
    if (videoRef.current) {
      setCurrentVideoTime(videoRef.current.currentTime);
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

  // Event handlers for hotspot interactions
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
    console.log("Transition complete, unmounting");
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
              currentTime={currentVideoTime}
              onClick={handleHotspotClick}
            />
          ))}
        </div>
      </div>

      {/* Scene transition overlay */}
      {isTransitioning && (
        <div className="z-20">
          <SceneTransition
            onTransitionComplete={handleTransitionComplete}
            isTransitioning={isTransitioning}
          />
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
