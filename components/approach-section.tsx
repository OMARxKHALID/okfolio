"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const lines = [
  { text: "STRATEGY MEETS", color: "text-cream" },
  { text: "CREATIVE MOTION", color: "text-gold" },
  { text: "ENGINEERED FOR", color: "text-cream" },
  { text: "LASTING IMPACT", color: "text-gold" },
];

export function ApproachSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Staggered lines reveal
      gsap.from(".approach-line", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
        y: 100,
        opacity: 0,
        rotateX: -45,
        stagger: 0.2,
        duration: 1.5,
        ease: "power4.out",
      });

      // Paragraph fade
      gsap.from(".approach-desc", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.8,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-surface-dark flex flex-col justify-center px-6 md:px-4 py-20 md:py-24 relative"
    >
      <div ref={containerRef} className="max-w-7xl mx-auto w-full">
        <div className="mb-12 md:mb-20">
          {lines.map((line, index) => (
            <div key={index} className="overflow-hidden">
              <h2
                className={`general-title approach-line ${line.color} leading-[0.85] text-4xl md:text-6xl lg:text-8xl`}
              >
                {line.text}
              </h2>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-end">
          <p className="approach-desc font-paragraph text-cream/60 text-lg md:text-xl lg:text-2xl max-w-xl leading-relaxed">
            I believe that every pixel should serve a purpose. My approach
            combines rigorous technical architecture with experimental design
            thinking to create interfaces that feel alive.
          </p>
        </div>
      </div>
    </section>
  );
}
