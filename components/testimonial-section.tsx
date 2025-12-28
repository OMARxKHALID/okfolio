"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TESTIMONIALS } from "@/lib/constants"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function TestimonialSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Giant background title parallax
      gsap.to(".bg-parallax-text", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
        xPercent: -30,
      })

      // Staggered card entry
      gsap.from(".testimonial-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        y: 150,
        opacity: 0,
        rotateX: -30,
        stagger: 0.2,
        duration: 1.2,
        ease: "power4.out",
      })
    },
    { scope: containerRef },
  )

  return (
    <section ref={containerRef} className="py-20 md:py-32 bg-cream-light relative overflow-hidden px-4">
      {/* Background Parallax Title */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap pointer-events-none opacity-[0.03] select-none">
        <h2 className="bg-parallax-text text-[40vw] md:text-[30vw] font-heading leading-none text-brown-dark">
          KIND WORDS KIND WORDS
        </h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 md:mb-20">
          <span className="text-brown-mid font-bold tracking-widest text-xs md:text-sm mb-4 block">TESTIMONIALS</span>
          <h2 className="general-title text-brown-dark leading-none text-4xl md:text-6xl">COLLABORATION</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {TESTIMONIALS.map((item, index) => (
            <div
              key={index}
              className={`testimonial-card p-6 md:p-10 rounded-[1.5rem] md:rounded-[2rem] border border-brown-dark/10 bg-gradient-to-br ${item.gradient} backdrop-blur-sm flex flex-col justify-between h-[24rem] md:h-[28rem]`}
              style={{ transform: `rotate(${item.rotation}deg)` }}
            >
              <p className="font-paragraph text-brown-dark text-lg md:text-xl italic leading-relaxed">"{item.text}"</p>
              <div>
                <h4 className="font-heading text-2xl md:text-3xl text-brown-dark mb-1">{item.name}</h4>
                <span className="text-xs md:text-sm font-bold tracking-widest text-brown-mid opacity-70 uppercase">
                  {item.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
