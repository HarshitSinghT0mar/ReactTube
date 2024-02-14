import React, { useState } from "react";
import { videos } from "../../data/videos";
import { useVideoConext } from "../../contexts/VideoContext";

const Playlist = () => {
  const { selectedVideo,setSelectedVideo } = useVideoConext();
  const [autoplay, setAutoplay] = useState(false);

  const handleAutoplayToggle = () => {
    setAutoplay(!autoplay);
  };

  return (
    <div className="p-4 max-h-[calc(100vh-16px)] min-w-[400px] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Playlist</h2>
        <label htmlFor="autoplay" className="flex items-center cursor-pointer">
          Autoplay
          <input
            type="checkbox"
            id="autoplay"
            checked={autoplay}
            onChange={handleAutoplayToggle}
            className="ml-2 h-4 w-4"
          />
        </label>
      </div>
      <div className="flex flex-col gap-1">
        {videos.map((video) => (
          <div
            key={video.id}
            className={`flex items-start gap-2 p-2 cursor-pointer hover:bg-gray-300 max-w-[350px] overflow-hidden ${selectedVideo?.id===video?.id && 'bg-gray-300' }`}
            onClick={() => setSelectedVideo(video)}
          >
            <img
              src={video.thumb}
              alt={video.title}
              className="w-28 h-auto rounded object-cover"
            />
            <div className="flex flex-col gap-1 flex-1">
              <span className="text-gray-800 font-bold truncate">
                {video.title}
              </span>
              <span className="text-gray-800 text-xs line-clamp-3">
                {video.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;
