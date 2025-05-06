"use client";

export default function ThoughtOverlay({ content, onClose }) {
  const handleOverlayClick = (e) => {
    // Only close if clicking the overlay background, not the content
    if (e.target === e.currentTarget) {
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
      {content.text && (
        <div
          className="absolute bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl animate-fadeIn max-w-xs"
          style={getRandomPosition()}
        >
          <p className="text-gray-700 text-lg">{content.text}</p>
        </div>
      )}
      {content.image && (
        <div
          className="absolute bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl animate-fadeIn max-w-xs"
          style={getRandomPosition()}
        >
          <img
            src={content.image}
            alt="Thought visualization"
            className="w-full h-auto rounded-lg"
          />
        </div>
      )}
      {content.video && (
        <div
          className="absolute bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl animate-fadeIn max-w-xs"
          style={getRandomPosition()}
        >
          <video
            src={content.video}
            controls
            className="w-full h-auto rounded-lg"
            playsInline
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      {content.audio && (
        <div
          className="absolute bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl animate-fadeIn max-w-xs"
          style={getRandomPosition()}
        >
          <audio src={content.audio} controls className="w-full" />
        </div>
      )}
    </div>
  );
}
