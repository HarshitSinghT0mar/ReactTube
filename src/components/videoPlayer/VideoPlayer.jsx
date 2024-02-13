import React, { useState, useRef } from 'react';

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="p-4 rounded-lg">
      <div className="relative">
        <video
          ref={videoRef}
          className="w-full rounded-lg shadow-lg"
          controls
          src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
        ></video>
        {/* Video Controls */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100"
          onClick={togglePlay}
        >
          {/* Play/Pause Button */}
          <button className="bg-gray-300 bg-opacity-50 p-2 rounded-full shadow-lg focus:outline-none">
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isPlaying ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 4h4v12H6V4zm8 0h4v12h-4V4z"
                ></path>
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 3l14 9-14 9V3z"
                ></path>
              )}
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
