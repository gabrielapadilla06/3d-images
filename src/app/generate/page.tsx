"use client"
import { useState, type ChangeEvent } from "react"

import ModelGenerator from "@/components/generate/model-generator"

const SamplePage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setSelectedImage(imageUrl)
    }
  }

  return (
        <ModelGenerator />
  )
}

export default SamplePage

