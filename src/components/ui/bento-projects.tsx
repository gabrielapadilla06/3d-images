'use client'

import { ArrowRightIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import pinguino from "@/images/nature/pinguino.png"

interface BentoCardProps {
  name: string
  description: string
  background: React.ReactNode
  Icon: React.ElementType
  href: string
  cta: string
}

const BentoCard = ({
  name,
  description,
  background,
  Icon,
  href,
  cta,
}: BentoCardProps) => (
  <div
    className={cn(
      "group relative flex flex-col justify-between overflow-hidden rounded-xl",
      "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      "h-[400px]"
    )}
  >
    <div>{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
      <Icon className="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75 dark:text-neutral-300" />
      <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
        {name}
      </h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        {description}
      </p>
    </div>

    <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
      <Button variant="ghost" asChild size="sm" className="pointer-events-auto">
        <a href={href}>
          {cta}
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
  </div>
)

export default function BentoProjects() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Right Column - Bento Card */}
        <div className="w-full lg:w-1/2">
          <BentoCard
            name="Nectarium"
            description="Automatically block time for focused work and personal activities."
            Icon={ClockIcon}
            href="/animals"
            cta="Learn More"
            background={
              <img 
                src={pinguino.src}
                alt="Time Blocking"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
            }
          />
        </div>

        {/* Right Column - Bento Card */}
        <div className="w-full lg:w-1/2">
          <BentoCard
            name="Food AI"
            description="Automatically block time for focused work and personal activities."
            Icon={ClockIcon}
            href="/animals"
            cta="Learn More"
            background={
              <img 
                src={pinguino.src}
                alt="Time Blocking"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
            }
          />
        </div>

        {/* Right Column - Bento Card */}
        <div className="w-full lg:w-1/2">
          <BentoCard
            name="Fruits and Flowers"
            description="Automatically block time for focused work and personal activities."
            Icon={ClockIcon}
            href="/fruits_flowers"
            cta="Learn More"
            background={
              <img 
                src={pinguino.src}
                alt="Time Blocking"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
            }
          />
        </div>

        {/* Right Column - Bento Card */}
        <div className="w-full lg:w-1/2">
          <BentoCard
            name="Landscapes"
            description="Automatically block time for focused work and personal activities."
            Icon={ClockIcon}
            href="/scenes"
            cta="Learn More"
            background={
              <img 
                src={pinguino.src}
                alt="Time Blocking"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
            }
          />
        </div>
      </div>
    </div>
  )
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export{ BentoProjects }