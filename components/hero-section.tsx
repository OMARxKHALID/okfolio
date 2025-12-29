"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { PORTFOLIO_INFO } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(containerRef.current, { backgroundColor: "#ffffff", duration: 1 })
        .from(titleRef.current, { y: 200, opacity: 0, duration: 1.5 }, "-=0.5")
        .from(
          badgeRef.current,
          {
            clipPath: "inset(0 100% 0 0)",
            rotation: 0,
            opacity: 0,
            duration: 1,
          },
          "-=1"
        )
        .from(descRef.current, { y: 30, opacity: 0, duration: 1 }, "-=0.8")
        .from(
          buttonRef.current,
          { scale: 0.8, opacity: 0, duration: 0.8 },
          "-=0.6"
        );

      // Scroll Parallax
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        scale: 0.9,
        rotation: -2,
        y: -100,
        opacity: 0,
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="root"
      ref={containerRef}
      className="min-h-screen h-dvh flex flex-col items-center justify-center relative overflow-hidden px-6 py-20 md:px-4"
    >
      {/* Subtle backdrop overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 z-10 pointer-events-none" />
      <div className="max-w-7xl w-full flex flex-col items-center text-center relative z-20">
        <div
          ref={badgeRef}
          className="bg-brown-mid text-cream-light px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-sans mb-6 md:mb-8 -rotate-3 inline-block drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
        >
          {PORTFOLIO_INFO.role}
        </div>

        <h1
          ref={titleRef}
          className="general-title text-cream mb-6 md:mb-8 leading-[1] text-6xl md:text-8xl lg:text-10xl uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] [text-shadow:_0_2px_20px_rgba(0,0,0,0.6)]"
        >
          {PORTFOLIO_INFO.name.split(" ")[0]}
          <br />
          {PORTFOLIO_INFO.name.split(" ")[1]}
        </h1>

        <p
          ref={descRef}
          className="font-paragraph text-cream-light max-w-lg mb-8 md:mb-12 text-base md:text-lg px-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] [text-shadow:_0_1px_10px_rgba(0,0,0,0.5)]"
        >
          {PORTFOLIO_INFO.bio}
        </p>

        <div ref={buttonRef}>
          <Button className="bg-gold text-brown-dark hover:bg-gold/90 rounded-full px-6 py-5 md:px-8 md:py-6 text-base md:text-lg font-heading tracking-wider drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)] shadow-lg">
            VIEW MY PROJECTS
          </Button>
        </div>
      </div>
    </section>
  );
}
