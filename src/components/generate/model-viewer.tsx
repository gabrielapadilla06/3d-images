"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

interface ModelViewerProps {
  glbUrl: string
}

export default function ModelViewer({ glbUrl }: ModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Setup scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })

    renderer.setSize(500, 500)
    renderer.setClearColor(0xffffff) // Set to white
    containerRef.current.appendChild(renderer.domElement)

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7) // Increased intensity
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8) // Increased intensity
    directionalLight.position.set(0.5, 1, -1.5)
    scene.add(directionalLight)

    // Add a subtle fill light from the opposite direction
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3)
    fillLight.position.set(-0.5, -1, 1.5)
    scene.add(fillLight)

    // Add a shadow plane
    const planeGeometry = new THREE.PlaneGeometry(10, 10)
    const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.1 })
    const shadowPlane = new THREE.Mesh(planeGeometry, planeMaterial)
    shadowPlane.rotation.x = -Math.PI / 2
    shadowPlane.position.y = -0.5
    scene.add(shadowPlane)

    // Enable shadows
    renderer.shadowMap.enabled = true
    directionalLight.castShadow = true
    shadowPlane.receiveShadow = true

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.25
    controls.enableZoom = true

    // Load model
    const loader = new GLTFLoader()
    loader.load(glbUrl, (gltf) => {
      gltf.scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh
          mesh.castShadow = true
          mesh.receiveShadow = true
        }
      })
      scene.add(gltf.scene)

      // Center and frame the model
      const box = new THREE.Box3().setFromObject(gltf.scene)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)

      const fov = camera.fov * (Math.PI / 180)
      const cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2))
      camera.position.z = cameraZ * -1.5
      camera.lookAt(center)

      controls.target.copy(center)
      controls.update()
    })

    // Animation loop
    function animate() {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Cleanup
    return () => {
      renderer.dispose()
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [glbUrl])

  return <div ref={containerRef} className="w-[500px] h-[500px]" />
}

