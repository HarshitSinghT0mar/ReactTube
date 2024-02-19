import React, { useEffect, useRef, useState } from "react";
import { formatTime } from "../../utils/formatTime";
import { useVideoConext } from "../../contexts/VideoContext";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [playbackSpeed, setPlaybackspeed] = useState(1);
  const [volume, setVolume] = useState(1);
  const { selectedVideo, setSelectedVideo, playlist, autoplay } =
    useVideoConext();

  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();

      setIsPlaying(true);
      videoRef.current.playbackRate = playbackSpeed;
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };
  useEffect(() => {
    if (selectedVideo) {
      videoRef.current.playbackRate = playbackSpeed;
      setIsPlaying(true);
    }
  }, [selectedVideo, playbackSpeed]);

  useEffect(() => {
    const newIndex = playlist.findIndex(
      (video) => video.id === selectedVideo.id
    );
    setCurrentVideoIndex(newIndex);
  }, [selectedVideo, playlist]);

  useEffect(() => {
    togglePlayPause();

    videoRef.current.playbackRate = playbackSpeed;
  }, [selectedVideo]);

  const handleProgressBarClick = (event) => {
    event.stopPropagation();
    const progressBarRect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - progressBarRect.left;
    const width = progressBarRect.width;
    const seekTime = (offsetX / width) * duration;
    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const playNextVideo = () => {
    const nextIndex = currentVideoIndex + 1;
    if (nextIndex < playlist.length) {
      setCurrentVideoIndex(nextIndex);
      setSelectedVideo(playlist[nextIndex]);
    }
  };

  const handleVideoEnd = () => {
    if (autoplay) {
      playNextVideo();
    } else {
      setIsPlaying(false);
    }
  };
  const handleKeyUp = (e) => {
    if (e.code === "space") {
      togglePlayPause();
    }
  };

  return (
    <div
      className="rounded-lg relative w-full group outline-none border-none bg-black py-8"
      onKeyUp={handleKeyUp}
      tabIndex={0}
    >
      <video
        ref={videoRef}
        src={selectedVideo?.sources}
        poster={selectedVideo?.thumb}
        className="w-full shadow-lg h-full object-contain"
        onClick={togglePlayPause}
        onTimeUpdate={() => setCurrentTime(videoRef.current.currentTime)}
        onLoadedMetadata={() => setDuration(videoRef.current.duration)}
        onEnded={handleVideoEnd}
        controls={false}
        muted={!isPlaying}
      >
        Your browser does not support the video tag.
      </video>
      <div
        className={`absolute hidden group-hover:block left-0 right-0 bottom-8 z-10 bg-gray-200 h-2 cursor-pointer `}
        onClick={handleProgressBarClick}
      >
        <div
          className="bg-rigiTheme h-full"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        ></div>
      </div>
      (
      <button
        className="absolute hidden group-hover:flex inset-0 w-full h-full items-center justify-center"
        onClick={togglePlayPause}
      >
        {!videoRef.current?.paused || isPlaying ? (
          <svg
            className="w-16 h-16 text-white "
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
      )
      <div className="flex justify-between items-center my-1 px-4 absolute bottom-1 w-full">
        <div className="flex justify-between w-full">
          <span className="text-white text-sm">{`${formatTime(
            currentTime
          )} / ${formatTime(duration)}`}</span>
        </div>
        <div className="flex gap-4 items-center text-white text-xs">
          <label className="text-white ">Volume</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => {
              const newVolume = parseFloat(e.target.value);
              setVolume(newVolume);
              videoRef.current.volume = newVolume;
            }}
            className="w-24 h-4 outline-none bg-gray-800 rounded-full overflow-hidden appearance-none slider"
            style={{
              background: `linear-gradient(to right, #4F2485 ${
                volume * 100
              }%, #ccc ${volume * 100}%)`,
            }}
          />
          <label className="text-white whitespace-nowrap">
            Playback Speed:
          </label>
          <select
            className=" bg-gray-800 border text-xs border-gray-700 text-white rounded-sm focus:outline-none"
            value={playbackSpeed}
            onChange={(e) => {
              setPlaybackspeed(parseFloat(e.target.value));
            }}
          >
            {[0.5, 1, 1.5, 2, 2.5, 3].map((speed) => {
              return (
                <option key={speed} value={speed}>
                  {speed}x
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
