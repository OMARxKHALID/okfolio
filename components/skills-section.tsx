"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SKILLS } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SkillsSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".skill-item", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 85%",
        },
      });

      gsap.from(".skills-header", {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-40 bg-cream px-6 border-b border-brown-dark/5"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="skills-header flex flex-col md:flex-row justify-between items-end mb-24 pb-8 border-b border-brown-dark/10">
          <div>
            <span className="text-brown-mid font-display uppercase tracking-widest text-sm mb-4 block">
              Capability
            </span>
            <h2 className="text-6xl md:text-8xl font-display font-bold text-brown-dark uppercase leading-[0.8]">
              Tool
              <br />
              Stack
            </h2>
          </div>
          <p className="font-sans text-brown-dark/70 max-w-md mt-8 md:mt-0 text-lg leading-relaxed">
            A carefully cultivated set of technologies and methodologies
            designed for high-performance creative engineering.
          </p>
        </div>

        <div className="skills-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-px bg-brown-dark/10 border border-brown-dark/10">
          {SKILLS.map((skill) => (
            <div
              key={skill.name}
              className="skill-item bg-cream hover:bg-white transition-colors duration-500 p-8 aspect-square flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gold/20 to-transparent rounded-bl-full translate-x-12 -translate-y-12 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>

              <div className="w-2 h-2 rounded-full bg-brown-mid group-hover:bg-gold transition-colors"></div>

              <div className="relative z-10">
                <span className="text-[10px] uppercase tracking-widest text-brown-mid/60 mb-2 block">
                  {skill.category}
                </span>
                <h3 className="font-display text-2xl font-bold text-brown-dark leading-none group-hover:translate-x-2 transition-transform duration-300">
                  {skill.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
