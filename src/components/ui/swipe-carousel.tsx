'use client'

import { useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type SwipeCarouselProps = {
  image: string
  imageAlt?: string
  slides: ReactNode[]
  className?: string
}

export function SwipeCarousel({
  image,
  imageAlt = '',
  slides,
  className,
}: SwipeCarouselProps) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const goTo = (next: number) => {
    const n = (next + slides.length) % slides.length
    setDirection(next > index ? 1 : -1)
    setIndex(n)
  }

  return (
    <div
      className={cn(
        'relative h-[26rem] w-full overflow-hidden rounded-3xl shadow-xl md:h-[32rem]',
        className
      )}
    >
      {/* Hình cố định */}
      <img
        src={image}
        alt={imageAlt}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Lớp tối để chữ dễ đọc */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />

      {/* Vùng chữ: kéo ngang hoặc vuốt để đổi */}
      <motion.div
        className="absolute inset-0 flex cursor-grab touch-pan-y items-end p-6 active:cursor-grabbing md:p-12"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          if (info.offset.x < -60) goTo(index + 1)
          else if (info.offset.x > 60) goTo(index - 1)
        }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="w-full select-none pb-10 text-white md:max-w-xl"
          >
            {slides[index]}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Nút trái / phải */}
      <button
        onClick={() => goTo(index - 1)}
        aria-label="Previous"
        className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow md:flex"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => goTo(index + 1)}
        aria-label="Next"
        className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow md:flex"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Chấm tròn */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className={cn(
              'h-2 rounded-full transition-all',
              i === index ? 'w-6 bg-white' : 'w-2 bg-white/50'
            )}
          />
        ))}
      </div>
    </div>
  )
}
