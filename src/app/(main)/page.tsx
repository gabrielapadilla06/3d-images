"use client"

import { TextBentoRight, StarIcon } from "@/components/ui/right-image"
import { TextBentoLeft, ClockIcon } from "@/components/ui/left-image"
import { HeroSection } from "@/components/ui/hero-section"

import tortugaImage from "@/images/nature/tortuga.png"
import step1Image from "@/images/main/image1.png"
import step2Image from "@/images/main/image2.png"

export default function Home() {
  return (
    <>
      <div className="mx-auto w-full max-w-screen-xl xl:pb-2">
        <HeroSection
          title="Image3D: transform any image into a 3D model"
          subtitle=""
          buttonText="Explore"
          heroImage={tortugaImage.src}
        />

        <div className="gap-10 p-4 py-10 sm:pb-4 md:flex md:justify-between">
          <TextBentoRight
            title="Upload"
            subtitle="Step 1"
            description="Upload your image  and change the parameters to generate your model"
            bentoCard={{
              name: "Advanced Analytics",
              description: "Gain insights into your work patterns and optimize your performance.",
              backgroundSrc: step1Image.src,
              Icon: StarIcon,
              href: "#",
              cta: "Explore Analytics",
            }}
            reversed={true}
          />
        </div>

        <div className="gap-4 p-4 sm:pb-4 md:flex md:justify-between">
          <TextBentoLeft
            bentoCard={{
              name: "Smart Time Blocking",
              description: "Automatically block time for focused work and personal activities.",
              backgroundSrc: step2Image.src,
              Icon: ClockIcon,
              href: "#",
              cta: "Learn More",
            }}
            title="Generate"
            subtitle="Step 2"
            description="Clisk on the generate button and wait to see your model!"
          />
        </div>

      </div>
    </>
  )
}

