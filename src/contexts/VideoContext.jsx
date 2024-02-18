import { createContext, useContext, useState } from "react";
import { videos } from "../data/videos";

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState(videos);
  const [selectedVideo, setSelectedVideo] = useState(playlist[0]);
  const [autoplay, setAutoplay] = useState(false);


  return (
    <VideoContext.Provider
      value={{
        selectedVideo,
        setSelectedVideo,
        playlist,
        setPlaylist,
        autoplay,
        setAutoplay,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoConext = () => {
  return useContext(VideoContext);
};
