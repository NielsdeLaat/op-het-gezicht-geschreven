"use client";

export default function ThoughtOverlay({ content, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center -rotate-90 origin-center">
      <div className="bg-white p-6 rounded-2xl shadow-xl animate-fadeIn max-w-md">
        {content.text && (
          <p className="text-gray-700 text-lg mb-4">{content.text}</p>
        )}
        {content.image && (
          <img
            src={content.image}
            alt="Thought visualization"
            className="w-full h-auto mb-4 rounded-lg"
          />
        )}
        {content.video && (
          <video
            src={content.video}
            controls
            className="w-full h-auto mb-4 rounded-lg"
            playsInline
          >
            Your browser does not support the video tag.
          </video>
        )}
        {content.audio && (
          <audio src={content.audio} controls className="w-full mb-4" />
        )}
        <button
          onClick={onClose}
          className="cursor-pointer px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors duration-200"
        >
          Back
        </button>
      </div>
    </div>
  );
}
