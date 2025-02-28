'use client'

import Image from 'next/image'
import { useState } from 'react'

type Species = {
  id: number
  name: string
  description: string
  ImgSrc: string
  inOneName: string
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function BlurImage({ species }: { species: Species }) {
  const [isLoading, setLoading] = useState(true)

  return (
    <div className="group">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
        <Image
          alt={`Image of ${species.name}`}
          src={species.ImgSrc || "/placeholder.svg"}
          className={cn(
            'object-cover duration-700 ease-in-out group-hover:opacity-75',
            isLoading
              ? 'scale-110 blur-2xl grayscale'
              : 'scale-100 blur-0 grayscale-0'
          )}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <p className="mt-1 text-lg font-medium dark:text-gray-400">{species.name}</p>
    </div>
  )
}