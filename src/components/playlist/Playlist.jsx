import React, { useState } from "react";
import { videos } from "../../data/videos";
import { useVideoConext } from "../../contexts/VideoContext";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";


const Playlist = () => {
  const { selectedVideo, setSelectedVideo } = useVideoConext();
  const [autoplay, setAutoplay] = useState(false);
  const [playlist, setPlaylist] = useState(videos);

  const handleAutoplayToggle = () => {
    setAutoplay(!autoplay);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return; 
    const items = Array.from(playlist);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPlaylist(items);
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
      <DragDropContext  onDragEnd={handleDragEnd}>
        <Droppable droppableId="playlist">
          {(provided) => (
            <div
              className="flex flex-col gap-1"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {playlist.map((video, index) => (
                <Draggable key={video.id} draggableId={video.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => setSelectedVideo(video)}
                      className={`flex items-start gap-2 p-2 cursor-pointer hover:bg-gray-300 max-w-[350px] overflow-hidden ${
                        selectedVideo?.id === video?.id && "bg-gray-300"
                      }`}
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
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Playlist;
