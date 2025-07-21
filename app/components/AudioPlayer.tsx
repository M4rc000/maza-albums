// app/src/components/AudioPlayer.tsx
'use client'

import { Play, Music } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface Track {
  title: string
  src: string
}

export default function AudioPlayer() {
  const playlist: Track[] = [
    { title: 'Weird Genius - Sweet Scar', src: './assets/music/WeirdGenius-SweetScar.mp3' },
    { title: 'Lany - You', src: './assets/music/LANY-You.mp3' },
    { title: 'Through The Dark - One Direction', src: './assets/music/ThroughTheDark-OneDirection.mp3' },
    { title: 'Adrianne Lenker - Anything', src: './assets/music/AdrianneLenker-Anything.mp3' },
  ]

  const [currentTrack, setCurrentTrack] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [showControls, setShowControls] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.src = playlist[currentTrack].src
    audio.muted = isMuted
    audio.load()
    audio
      .play()
      .catch(err => console.warn('Autoplay ditolak, butuh interaksi', err))
  }, [currentTrack, isMuted])

  const handleEnded = () => {
    setCurrentTrack((idx) => (idx + 1) % playlist.length)
  }

  const toggleMute = () => {
    setIsMuted((m) => !m)
  }

  const toggleControls = () => {
    setShowControls((prev) => !prev)
  }

  return (
    <>
      <audio
        ref={audioRef}
        loop={false}
        onEnded={handleEnded}
        style={{
          position: 'fixed',
          bottom: '1rem',
          left: '1rem',
          width: '200px',
          zIndex: 9999,
        }}
      />

      {/* Tombol Utama untuk menampilkan/menyembunyikan kontrol */}
      <button
        onClick={toggleControls}
        style={{
          position: 'fixed',
          bottom: '20px', // Sedikit lebih ke atas dari sebelumnya
          left: '20px', // Sedikit lebih ke kanan dari sebelumnya
          zIndex: 10000,
          background: 'rgba(0,0,0,0.7)', // Sedikit lebih gelap
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '1.5rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)', // Tambahkan bayangan
          transition: 'all 0.3s ease', // Transisi untuk hover
          backdropFilter: 'blur(5px)', // Efek blur latar belakang
        }}
        title={showControls ? 'Sembunyikan Kontrol Audio' : 'Tampilkan Kontrol Audio'}
      >
        <Music size={24} />
      </button>

      {/* Kontrol Audio (Tombol Mute/Unmute & Playlist) */}
      {showControls && (
        <>
          {/* Tombol Mute/Unmute */}
          <button
            onClick={toggleMute}
            style={{
              position: 'fixed',
              bottom: '90px', // Di atas tombol utama
              left: '20px', // Sesuaikan posisi
              zIndex: 10000,
              background: 'rgba(0,0,0,0.7)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '1.2rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(5px)',
            }}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>

          {/* Playlist UI */}
          <ul
            className='border-1 rounded-md border-gray-100 shadow-lg'
            style={{
              position: 'fixed',
              bottom: '140px', // Di atas tombol mute/unmute
              zIndex: 10000,
              left: '20px', // Sesuaikan posisi
              listStyle: 'none',
              margin: 0,
              height: '13rem',
              padding: '1rem',
              background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(30,30,30,0.6) 100%)', // Gradien latar belakang
              color: '#E0E0E0', // Warna teks sedikit lebih terang
              maxHeight: 'auto',
              overflowY: 'auto',
              width: '400px',
              borderRadius: '12px', // Sudut lebih membulat
              boxShadow: '0 8px 24px rgba(0,0,0,0.6)', // Bayangan lebih dalam
              backdropFilter: 'blur(10px)', // Efek blur latar belakang yang lebih kuat
              border: '1px solid rgba(255,255,255,0.1)', // Garis tepi tipis
            }}
          >
            {playlist.map((track, idx) => (
              <li
                key={track.src}
                onClick={() => setCurrentTrack(idx)}
                style={{
                  padding: '0.5rem 0.75rem', // Padding lebih besar
                  cursor: 'pointer',
                  fontWeight: idx === currentTrack ? 'bold' : 'normal',
                  color: idx === currentTrack ? '#87CEEB' : '#E0E0E0', // Warna teks untuk lagu aktif
                  backgroundColor: idx === currentTrack ? 'rgba(255,255,255,0.1)' : 'transparent', // Latar belakang untuk lagu aktif
                  borderRadius: '8px', // Sudut membulat pada setiap item
                  marginBottom: '5px', // Jarak antar item
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'background-color 0.2s ease, color 0.2s ease', // Transisi untuk hover
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
                onMouseEnter={(e) => {
                  if (idx !== currentTrack) {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; // Efek hover
                  }
                }}
                onMouseLeave={(e) => {
                  if (idx !== currentTrack) {
                    e.currentTarget.style.backgroundColor = 'transparent'; // Hilangkan efek hover
                  }
                }}
              >
                {idx === currentTrack && <Play className='absolute' style={{ width: '12px', marginRight: '8px', color: '#87CEEB' }} />} {/* Ikon play lebih besar & berwarna */}
                <span style={{ marginLeft: idx === currentTrack ? '20px' : '0' }}>{track.title}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}