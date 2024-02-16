import { createContext, useContext, useState } from "react";
import { videos } from "../data/videos";

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState(videos);
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  return (
    <VideoContext.Provider value={{ selectedVideo, setSelectedVideo , playlist,setPlaylist}}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoConext = () => {
  return useContext(VideoContext);
};
