"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { PORTFOLIO_INFO } from "@/lib/constants";
import { GL } from "./gl";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroSection() {
  const [hovering, setHovering] = useState<boolean>(false);

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
      ref={containerRef}
      className="min-h-screen h-dvh flex flex-col items-center justify-center relative overflow-hidden px-6 py-20 md:px-4"
    >
      <div className="max-w-7xl w-full flex flex-col items-center text-center relative z-10">
        <div
          ref={badgeRef}
          className="bg-brown-mid text-white px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-sans mb-6 md:mb-8 -rotate-3 inline-block"
        >
          {PORTFOLIO_INFO.role}
        </div>

        <h1
          ref={titleRef}
          className="general-title text-white mb-6 md:mb-8 leading-[0.8] text-5xl md:text-7xl lg:text-9xl uppercase"
        >
          {PORTFOLIO_INFO.name.split(" ")[0]}
          <br />
          {PORTFOLIO_INFO.name.split(" ")[1]}
        </h1>

        <p
          ref={descRef}
          className="font-paragraph text-white max-w-lg mb-8 md:mb-12 opacity-80 text-base md:text-lg px-4"
        >
          {PORTFOLIO_INFO.bio}
        </p>

        <div ref={buttonRef}>
          <Button className="bg-gold text-white hover:bg-gold/90 rounded-full px-6 py-5 md:px-8 md:py-6 text-base md:text-lg font-heading tracking-wider">
            VIEW MY PROJECTS
          </Button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-[1px] h-10 md:h-12 bg-brown-dark opacity-30" />
      </div>
    </section>
  );
}
