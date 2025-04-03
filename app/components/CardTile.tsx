import Image from "next/image"
import { useRef, useState, useEffect } from "react"

const cardImages = [
  '/assets/images/photos/1.webp',
  '/assets/images/photos/2.webp',
  '/assets/images/photos/3.webp',
  '/assets/images/photos/4.webp',
  '/assets/images/photos/5.webp',
  '/assets/images/photos/6.webp',
  '/assets/images/photos/7.webp',
  '/assets/images/photos/8.webp',
  '/assets/images/photos/9.webp',
  '/assets/images/photos/10.webp',
]

export default function CardTile() {
    const [loaded, setLoaded] = useState(false)
    const gridRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setLoaded(true)
                observer.unobserve(entry.target)
              }
            })
          },
          {
            threshold: 0.9, 
          }
        )
    
        if (gridRef.current) observer.observe(gridRef.current)
    
        return () => {
          observer.disconnect()
        }
    }, [])
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Summer styles are finally here
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              This year, our new summer collection will shelter you from the harsh elements of a world that does not care
              if you live or die.
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:top-0 sm:left-1/2 sm:translate-x-8 lg:top-1/2 lg:left-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        {cardImages.map((src, index) => {
                            // Determine the row (assuming 5 cards per row)
                            const row = Math.floor(index / 5)
                            // For first row, animate from left; second row, animate from right.
                            const initialTranslate = row === 0 ? '-translate-x-10' : 'translate-x-10'
                            // When not loaded, card is invisible and offset to the side.
                            // When loaded, card translates to its proper position.
                            const animatedClasses = loaded
                            ? 'opacity-100 translate-x-0'
                                : `opacity-0 ${initialTranslate}`
                            return (          
                                <div className={`h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 ${animatedClasses}`} key={index}>
                                    <Image
                                        alt="Card"
                                        src={src}
                                        className="size-full object-cover" width={100} height={250} />
                                </div>
                            )              
                        })}
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="#"
                className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
              >
                Shop Collection
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}