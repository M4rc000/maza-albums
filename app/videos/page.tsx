'use client'
import { useState, useEffect, useRef } from 'react'
import { Play, Volume2, Maximize } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// Definisikan interface untuk bentuk data video
interface Video {
  id: number;
  title: string;
  duration: string;
  thumbnail: string;
}

const videoData: Video[] = [
  { id: 1, title: "TimeZone 24 July 2024 Part 1", duration: "2:15", thumbnail: "/assets/videos/video/1.mp4" },
  { id: 2, title: "TimeZone 24 July 2024 Part 2", duration: "2:15", thumbnail: "/assets/videos/video/2.mp4" },
]

// Static background elements to avoid hydration issues
const backgroundElements = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: (i * 23.7) % 100, // Deterministic positioning
  top: (i * 41.3) % 100,
  size: 20 + (i * 7) % 80,
  delay: (i * 0.3) % 2,
  duration: 3 + (i * 0.5) % 4
}))


// Hero Component
function VideosHero() {
  const [isMounted, setIsMounted] = useState(true)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-slate-900 to-blue-900/20"></div>
      
      {/* Animated Background Elements - Only render after mount to avoid hydration mismatch */}
      {isMounted && (
        <div className="absolute inset-0">
          {backgroundElements.map((element) => (
            <div
              key={element.id}
              className="absolute rounded-full bg-gradient-to-r from-purple-400/10 to-pink-400/10 animate-pulse"
              style={{
                left: `${element.left}%`,
                top: `${element.top}%`,
                width: `${element.size}px`,
                height: `${element.size}px`,
                animationDelay: `${element.delay}s`,
                animationDuration: `${element.duration}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 text-center px-2 max-w-4xl mx-auto">
        <div>
          {/* <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 animate-bounce">
            <Play className="text-white" size={32} />
          </div> */}
        </div>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Discover breathtaking moments captured in stunning detail. Each video tells a unique story waiting to unfold.
        </p>
        {/* <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Immerse yourself in our curated collection of stunning visual experiences
        </p> */}
        
        {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25">
            Start Watching
          </button>
          <button className="px-8 py-4 border-2 border-purple-400 text-purple-400 rounded-full font-semibold hover:bg-purple-400 hover:text-white transition-all duration-300">
            Browse Collection
          </button>
        </div> */}
      </div>
      
      {/* Static Floating Elements */}
      <div className="absolute bottom-10 left-10 w-4 h-4 bg-purple-400 rounded-full animate-ping"></div>
      <div className="absolute top-20 right-20 w-6 h-6 bg-pink-400 rounded-full animate-pulse"></div>
      <div className="absolute bottom-40 right-10 w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
    </div>
  )
}

// Definisikan interface untuk props VideoCard
interface VideoCardProps {
  video: Video;
  index: number;
}

function VideoCard({ video, index }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className={`group cursor-pointer transition-all duration-700 ease-out`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-2xl hover:shadow-purple-500/20 transform hover:scale-105 transition-all duration-500">
        {/* Video Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <video
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            controls
            preload="metadata"
            onMouseEnter={(e) => {
              // Type assertion: Memberitahu TypeScript bahwa e.target adalah HTMLVideoElement
              (e.target as HTMLVideoElement).play()
            }}
            onMouseLeave={(e) => {
              // Type assertion: Memberitahu TypeScript bahwa e.target adalah HTMLVideoElement
              const videoElement = e.target as HTMLVideoElement;
              videoElement.pause();
              videoElement.currentTime = 0;
            }}
          >
            <source src={video.thumbnail} type="video/mp4" />
            {/* Fallback gradient background */}
            <div className="w-full h-full bg-gradient-to-br from-purple-600/20 via-slate-700 to-blue-600/20 flex items-center justify-center">
              <Play className="text-white/40" size={48} />
            </div>
          </video>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
          
          {/* Play Button */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-200">
              <Play className="text-white ml-1" size={24} />
            </div>
          </div>
          
          {/* Duration Badge */}
          <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-sm font-medium">
            {video.duration}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
            {video.title}
          </h3>
          
          <div className="flex items-center justify-between text-gray-400 text-sm">
            <div className="flex space-x-2">
              <Volume2 size={16} className="hover:text-purple-400 transition-colors cursor-pointer" />
              <Maximize size={16} className="hover:text-purple-400 transition-colors cursor-pointer" />
            </div>
          </div>
          
          {/* Progress Bar Effect */}
          <div className="mt-4 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-1000"
            ></div>
          </div>
        </div>
        
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_20px_rgba(168,85,247,0.3)]"></div>
        </div>
      </div>
    </div>
  )
}

// Video Grid Component
function VideoGrid() {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {videoData.map((video, index) => (
          <VideoCard 
            key={video.id} 
            video={video} 
            index={index} 
          />
        ))}
      </div>
    </div>
  )
}

export default function Videos() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* HERO & NAVBAR SECTION */}
      <section className="relative bg-slate-950">
        <Navbar />    
        <VideosHero />
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#0a0a0a" fillOpacity="1" d="M0,192L24,197.3C48,203,96,213,144,192C192,171,240,117,288,112C336,107,384,149,432,154.7C480,160,528,128,576,133.3C624,139,672,181,720,202.7C768,224,816,224,864,197.3C912,171,960,117,1008,96C1056,75,1104,85,1152,106.7C1200,128,1248,160,1296,154.7C1344,149,1392,107,1416,85.3L1440,64L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* VIDEOS SECTION */}
      <section className="bg-[#0a0a0a] relative">
        <VideoGrid />
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, purple 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <section className="bg-[#030619]">
        <Footer />
      </section>
    </div>
  )
}