'use client'

import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export interface Species {
  id: number
  name: string
  description: string
  ImgSrc: string
  inOneName: string
  inTwoName: string
  inOneHref: string
  inTwoHref: string
}

interface FullScreenImageDialogProps {
  species: Species[]
  initialIndex: number
}

export function FullScreenImageDialog({ species, initialIndex }: FullScreenImageDialogProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const currentSpecies = species[currentIndex]

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % species.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + species.length) % species.length)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer w-full h-full">
          <Image
            src={currentSpecies.ImgSrc || "/placeholder.svg"}
            alt={currentSpecies.name}
            width={500}
            height={500}
            className="rounded-lg object-cover w-full h-full"
            priority
          />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[80vw] max-h-[80vh] w-full h-full p-0">
        <div className="relative h-full w-full flex flex-col md:flex-row">
          {/* Left side - Image with navigation arrows */}
          <div className="relative w-full md:w-1/2 h-[400px] md:h-full bg-white">
            <Image
              src={currentSpecies.ImgSrc || "/placeholder.svg"}
              alt={currentSpecies.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            
            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Right side - Content */}
          <div className="relative w-full md:w-1/2 h-full bg-background p-6">
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>

            {/* Centered content container */}
            <div className="flex flex-col justify-center h-full max-w-md mx-auto space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight">
                  {currentSpecies.name}
                </h2>
                <p className="text-muted-foreground">
                  {currentSpecies.description}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {currentSpecies.inOneHref && currentSpecies.inOneName && (
                  <Button asChild variant="outline" className="w-full h-auto min-h-[40px] whitespace-normal py-2">
                    <Link href={currentSpecies.inOneHref} className="break-words">
                      {currentSpecies.inOneName}
                    </Link>
                  </Button>
                )}
                {currentSpecies.inTwoHref && currentSpecies.inTwoName && (
                  <Button asChild variant="outline" className="w-full h-auto min-h-[40px] whitespace-normal py-2">
                    <Link href={currentSpecies.inTwoHref} className="break-words">
                      {currentSpecies.inTwoName}
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}