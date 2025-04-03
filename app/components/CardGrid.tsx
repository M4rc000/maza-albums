import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import cardImages from '../sources/cardImages'

interface CardProps {
  src: string;
  index: number;
  columnCount: number;
}

function Card({ src, index, columnCount }: CardProps) {
  const [visible, setVisible] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.4 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  // compute the row based on the current column count
  const row = Math.floor(index / columnCount)
  const initialTranslate = row === 0 ? '-translate-x-10' : 'translate-x-10'
  const animatedClasses = visible
    ? 'opacity-100 translate-x-0'
    : `opacity-0 ${initialTranslate}`

  return (
    <div
      ref={cardRef}
      className={`w-full max-w-[300px] text-center mt-1 transition-all duration-1000 ${animatedClasses}`}>
      <div className="relative h-[180px] bg-red-400 rounded-xl overflow-visible">
        <Image
          src={src}
          alt={`Card ${index + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 500px"
          className="object-cover rounded-xl"
        />
      </div>
    </div>
  )
}

export default function CardGrid() {
  // Dynamically compute the number of columns based on window width
  const [columnCount, setColumnCount] = useState(5)

  const getColumnCount = () => {
    const width = window.innerWidth;
    if (width < 640) return 1      // mobile: single column
    if (width < 768) return 2      // small screens: 2 cols
    if (width < 1024) return 3     // medium screens: 3 cols
    return 5                     // large screens: 5 cols
  }

  useEffect(() => {
    const updateColumns = () => {
      setColumnCount(getColumnCount())
    }
    updateColumns()
    window.addEventListener('resize', updateColumns)
    return () => window.removeEventListener('resize', updateColumns)
  }, [])

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-center mx-18 mt-5 space-x-3 gap-x-2 gap-y-2 items-start">
      {cardImages.map((src, index) => (
        <Card key={index} src={src} index={index} columnCount={columnCount} />
      ))}
    </div>
  )
}