import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import cardImages from '../sources/cardImages'

interface CardProps {
  src: string
  index: number
  columnCount: number
}

function Card({ src, index, columnCount }: CardProps) {
  const [visible, setVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

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

  const row = Math.floor(index / columnCount)
  const initialTranslate = row === 0 ? '-translate-x-10' : 'translate-x-10'
  const animatedClasses = visible
    ? 'opacity-100 translate-x-0'
    : `opacity-0 ${initialTranslate}`

  return (
    <div
      ref={cardRef}
      className={`w-full max-w-[300px] text-center mt-1 transition-all duration-1000 cursor-pointer ${animatedClasses}`}
    >
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
  const [columnCount, setColumnCount] = useState(5)

  const getColumnCount = () => {
    const width = window.innerWidth
    if (width < 640) return 1      // mobile: 1 kolom
    if (width < 768) return 2      // layar kecil: 2 kolom
    if (width < 1024) return 3     // layar menengah: 3 kolom
    return 5                     // layar besar: 5 kolom
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
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-center mx-18 mt-5 space-x-3 gap-x-2 gap-y-2 items-start">
        {cardImages.map((src, index) => (
          <Card
            key={index}
            src={src}
            index={index}
            columnCount={columnCount}
          />
        ))}
      </div>
    </>
  )
}