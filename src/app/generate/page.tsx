"use client"
import { useState, type ChangeEvent } from "react"
import { Typography, Button } from "@mui/material"
import { Upload } from "lucide-react"
import PageContainer from "@/app/components/container/PageContainer"
import DashboardCard from "@/app/components/shared/DashboardCard"
import ModelGenerator from "@/app/components/generate/model-generator"

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
    <PageContainer title="Image Upload" description="Upload an image">
      <DashboardCard title="Image Upload">
        <ModelGenerator />
      </DashboardCard>
    </PageContainer>
  )
}

export default SamplePage

