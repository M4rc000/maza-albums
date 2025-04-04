"use client";
import { useState } from "react";
import Image from 'next/image'

interface SongCardProps {
  title: string;
  artist: string;
  imageUrl: string;
  audioUrl: string;
}

export default function SongCard({ title, artist, imageUrl, audioUrl }: SongCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="max-w-sm rounded-xl overflow-hidden bg-gray-800 shadow-lg p-4">
      {/* Gambar Lagu */}
      <Image className="w-full h-48 object-cover rounded-lg" src={imageUrl} alt={title} width={40} height={40} />

      {/* Informasi Lagu */}
      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-400">{artist}</p>
      </div>

      {/* Audio Player */}
      <div className="mt-4">
        <audio 
          controls 
          src={audioUrl} 
          className="w-full"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </div>

      {/* Status Lagu */}
      <p className="mt-2 text-sm text-gray-400 text-center">
        {isPlaying ? "🎵 Sedang diputar..." : ""}
      </p>
    </div>
  );
}
