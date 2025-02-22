import { NextResponse } from "next/server"
import axios from "axios"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const image = formData.get("image") as File
    const textureResolution = formData.get("texture_resolution") || "1024"
    const foregroundRatio = formData.get("foreground_ratio") || "0.85"
    const remesh = formData.get("remesh") || "none"
    const vertexCount = formData.get("vertex_count") || "-1"

    // Create form data for the Stability AI API
    const apiFormData = new FormData()
    apiFormData.append("image", image)
    apiFormData.append("texture_resolution", textureResolution.toString())
    apiFormData.append("foreground_ratio", foregroundRatio.toString())
    apiFormData.append("remesh", remesh.toString())
    apiFormData.append("vertex_count", vertexCount.toString())

    const response = await axios.post("https://api.stability.ai/v2beta/3d/stable-fast-3d", apiFormData, {
      headers: {
        Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
      },
      responseType: "arraybuffer",
    })

    if (response.status === 200) {
      return new NextResponse(response.data, {
        status: 200,
        headers: {
          "Content-Type": "model/gltf-binary",
          "Content-Disposition": 'attachment; filename="model.glb"',
        },
      })
    } else {
      return NextResponse.json({ error: "Generation failed" }, { status: response.status })
    }
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}