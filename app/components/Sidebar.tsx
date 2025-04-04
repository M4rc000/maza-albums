"use client";

import { useState } from "react";
import SongCard from "./SongCard"; // Import the SongCard component
import songData from "../sources/songData";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`h-screen bg-gray-900 text-white transition-all duration-300 ${collapsed ? "w-16" : "w-64"} p-4`}>
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mb-4 text-gray-300 hover:text-white">
        {collapsed ? "🎵 Show Songs" : "✖ Hide"}
      </button>

      {/* Song Cards */}
      <div className="space-y-4">
        {songData.map((song, index) => (
          <SongCard
            key={index}
            title={song.title}
            artist={song.artist}
            imageUrl={song.imageUrl}
            audioUrl={song.audioUrl}
          />
        ))}
      </div>
    </div>
  );
}
