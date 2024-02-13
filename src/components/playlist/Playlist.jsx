import React from 'react';
import { videos } from '../../data/videos';

const Playlist = () => {
  return (
    <div className="p-4 max-h-[calc(100vh-20px)] overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Playlist</h2>
      <div className="flex flex-col gap-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="flex items-start gap-2 cursor-pointer hover:bg-slate-300 max-w-[350px] overflow-hidden"
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
