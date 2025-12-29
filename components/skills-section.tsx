"use client";

import { useRef, useState } from "react";
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
      id="skills-section"
      ref={containerRef}
      className="py-24 md:py-40  px-6 border-b border-brown-dark/5"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="skills-header flex flex-col md:flex-row justify-between items-end mb-24 pb-8 border-b border-brown-dark/10">
          <div>
            <span className="text-brown-mid font-display uppercase tracking-widest text-md mb-4 block drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] [text-shadow:_0_1px_10px_rgba(0,0,0,0.5)]">
              Capability
            </span>
            <h2 className="text-6xl md:text-9xl font-display font-bold text-brown-dark uppercase leading-[0.8]">
              Tool
              <br />
              Stack
            </h2>
          </div>
          <p className="font-sans text-cream/80 max-w-md mt-8 md:mt-0 text-xl leading-relaxed  drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] [text-shadow:_0_1px_10px_rgba(0,0,0,0.5)]">
            A carefully cultivated set of technologies and methodologies
            designed for high-performance creative engineering.
          </p>
        </div>

        <div className="skills-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-px bg-brown-dark/10 border border-brown-dark/10">
          {SKILLS.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({
  skill,
}: {
  skill: { name: string; level: string; iconName?: string };
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="skill-item bg-cream hover:bg-white transition-colors duration-500 p-6 md:p-8 aspect-square flex flex-col justify-between relative overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. The Gradient Corner Blob */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-bl-full pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom right, hsl(35, 52%, 65%, 0.2), transparent)",
          transform: isHovered ? "translate(0, 0)" : "translate(48px, -48px)",
          transition: "transform 500ms ease-out",
        }}
      />

      {/* Icon Section - Large and Prominent */}
      {skill.iconName && (
        <div className="relative z-10 flex items-center justify-center mb-4 flex-1 min-h-[100px] md:min-h-[120px]">
          <div
            className="relative transition-all duration-300"
            style={{
              transform: isHovered
                ? "scale(1.15) translateY(-4px)"
                : "scale(1)",
              opacity: isHovered ? 1 : 0.85,
            }}
          >
            <img
              src={`https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${skill.iconName}.svg`}
              alt={skill.name}
              className="w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 object-contain"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                const iconName = skill.iconName?.toLowerCase();
                let attempts = parseInt(target.dataset.attempts || "0");
                attempts++;

                // Icon name alternatives mapping
                const alternatives: Record<string, string[]> = {
                  adobecreativecloud: ["adobe", "adobecreativecloud"],
                  adobephotoshop: ["adobephotoshop"],
                  adobeillustrator: ["adobeillustrator"],
                  adobeaftereffects: ["adobeaftereffects"],
                  nodedotjs: ["nodejs", "nodedotjs"],
                };

                // Try alternative names with jsDelivr
                if (
                  iconName &&
                  alternatives[iconName] &&
                  attempts <= alternatives[iconName].length
                ) {
                  const altName = alternatives[iconName][attempts - 1];
                  target.dataset.attempts = attempts.toString();
                  target.src = `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${altName}.svg`;
                } else if (iconName && attempts === 1) {
                  // Try simpleicons.org CDN as fallback
                  target.dataset.attempts = attempts.toString();
                  target.src = `https://cdn.simpleicons.org/${iconName}`;
                } else {
                  // Hide if all attempts failed
                  target.style.display = "none";
                }
              }}
            />
          </div>
        </div>
      )}

      {/* 2. The Dot Color Change */}
      <div
        className="w-2 h-2 rounded-full relative z-10"
        style={{
          backgroundColor: isHovered
            ? "hsl(35, 52%, 65%)"
            : "rgb(163, 107, 51)",
          transition: "background-color 300ms",
        }}
      />

      {/* 3. The Text Nudge */}
      <div className="relative z-10">
        <span className="text-[10px] uppercase tracking-widest text-brown-mid/60 mb-2 block">
          {skill.level}
        </span>
        <h3
          className="font-display text-lg md:text-xl lg:text-2xl font-bold text-brown-dark leading-none"
          style={{
            transform: isHovered ? "translateX(8px)" : "translateX(0)",
            transition: "transform 300ms ease-out",
          }}
        >
          {skill.name}
        </h3>
      </div>
    </div>
  );
}
