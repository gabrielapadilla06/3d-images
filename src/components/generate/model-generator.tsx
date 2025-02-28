"use client"

import type React from "react"

import { useState } from "react"
import {
  Button,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
} from "@mui/material"
import { Upload } from "lucide-react"
import ModelViewer from "./model-viewer"

export default function ModelGenerator() {
  const [isLoading, setIsLoading] = useState(false)
  const [modelUrl, setModelUrl] = useState<string | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(event.currentTarget)
      const response = await fetch("/api/generate3d", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        setModelUrl(url)
      } else {
        throw new Error("Generation failed")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to generate 3D model")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box className="max-w-4xl mx-auto p-6">
      <Card elevation={2} className="mb-6">
        <CardContent>
          <Typography variant="h5" component="h2" className="mb-6">
            3D Model Generator
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              {/* Image Upload Section */}
              <Box className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                <input
                  type="file"
                  name="image"
                  id="image-upload"
                  onChange={handleImageChange}
                  accept="image/jpeg,image/png,image/webp"
                  required
                  className="hidden"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <Typography variant="subtitle1" className="mb-2">
                    Drop your image here or click to browse
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Supports: JPEG, PNG, WEBP
                  </Typography>
                </label>
                {previewImage && (
                  <Box className="mt-4">
                    <img
                      src={previewImage || "/placeholder.svg"}
                      alt="Preview"
                      className="max-h-48 mx-auto rounded-lg"
                    />
                  </Box>
                )}
              </Box>

              {/* Model Parameters */}
              <FormControl fullWidth>
                <InputLabel>Texture Resolution</InputLabel>
                <Select name="texture_resolution" defaultValue="1024" label="Texture Resolution">
                  <MenuItem value="512">512</MenuItem>
                  <MenuItem value="1024">1024 (Default)</MenuItem>
                  <MenuItem value="2048">2048</MenuItem>
                </Select>
              </FormControl>

              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Foreground Ratio
                </Typography>
                <Slider
                  name="foreground_ratio"
                  defaultValue={0.85}
                  step={0.05}
                  min={0.1}
                  max={1.0}
                  valueLabelDisplay="auto"
                  marks={[
                    { value: 0.1, label: "0.1" },
                    { value: 1, label: "1.0" },
                  ]}
                />
              </Box>

              <FormControl fullWidth>
                <InputLabel>Remesh</InputLabel>
                <Select name="remesh" defaultValue="none" label="Remesh">
                  <MenuItem value="none">None</MenuItem>
                  <MenuItem value="quad">Quad</MenuItem>
                  <MenuItem value="triangle">Triangle</MenuItem>
                </Select>
              </FormControl>

              <TextField
                name="vertex_count"
                label="Vertex Count"
                type="number"
                defaultValue={-1}
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: -1,
                }}
              />

              <Button type="submit" variant="contained" disabled={isLoading} size="large" className="mt-6">
                {isLoading ? "Generating..." : "Generate 3D Model"}
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>

      {modelUrl && (
        <Card elevation={2}>
          <CardContent>
            <Typography variant="h6" className="mb-4">
              Generated 3D Model
            </Typography>
            <ModelViewer glbUrl={modelUrl} />
          </CardContent>
        </Card>
      )}
    </Box>
  )
}

