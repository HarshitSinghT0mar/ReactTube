import React, { useEffect, useRef, useState } from "react";
import { formatTime } from "../../utils/formatTime";
import { useVideoConext } from "../../contexts/VideoContext";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const { selectedVideo, setSelectedVideo, playlist, autoplay } =
    useVideoConext();

  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();

      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    togglePlayPause();
  }, [selectedVideo]);

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleProgressBarClick = (event) => {
    event.stopPropagation();
    const progressBarRect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - progressBarRect.left;
    const width = progressBarRect.width;
    const seekTime = (offsetX / width) * duration;
    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    {
      autoplay && playNextVideo();
    }
  };

  const playNextVideo = () => {
    const nextIndex = currentVideoIndex + 1;
    if (nextIndex < playlist.length) {
      setCurrentVideoIndex(nextIndex);
      setSelectedVideo(playlist[nextIndex]);
    }
  };

  return (
    <div
      className="rounded-lg relative w-full bg-black py-8"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <video
        ref={videoRef}
        src={selectedVideo?.sources}
        poster={selectedVideo?.thumb}
        className="w-full shadow-lg h-full object-contain"
        onClick={() => togglePlayPause()}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleVideoEnd}
        controls={false}
        muted={!isPlaying}
      >
        Your browser does not support the video tag.
      </video>
      <div
        className={`absolute left-0 right-0 bottom-8 z-10 bg-gray-200 h-2 cursor-pointer ${
          isHovering ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleProgressBarClick}
      >
        <div
          className="bg-[#4F2485] h-full"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        ></div>
      </div>

      {isHovering && (
        <button
          className="absolute inset-0 w-full h-full flex items-center justify-center"
          onClick={togglePlayPause}
        >
          {!videoRef.current.paused || isPlaying ? (
            <svg
              className="w-16 h-16 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 6h4v12H6zm8 0h4v12h-4z" />
            </svg>
          ) : (
            <svg
              className="w-16 h-16 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      )}
      <div className="flex justify-between items-center px-4 absolute bottom-1">
        <span className="text-white">{`${formatTime(
          currentTime
        )} / ${formatTime(duration)}`}</span>
      </div>
    </div>
  );
};

export default VideoPlayer;
