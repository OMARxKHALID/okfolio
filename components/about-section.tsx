"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      // Headline color scrub
      gsap.to(headlineRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: true,
        },
        color: "hsl(35, 62%, 95%)", // exact cream from original palette
        opacity: 1,
      });

      // Badge reveal
      gsap.from(badgeRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
        clipPath: "inset(0 100% 0 0)",
        rotation: -15,
        duration: 1.2,
        ease: "power4.out",
      });

      // Paragraph fade up
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="min-h-screen h-dvh flex flex-col items-center justify-center bg-brown-red px-6 md:px-4 py-16 md:py-0 relative z-10"
    >
      <div className="max-w-6xl text-center">
        <div
          ref={badgeRef}
          className="bg-brown-mid text-cream px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-sans mb-6 md:mb-8 inline-block rotate-3"
        >
          ABOUT OMAR
        </div>

        <h2
          ref={headlineRef}
          className="general-title text-cream/10 mb-8 md:mb-12 lowercase leading-none text-3xl md:text-5xl lg:text-7xl px-4"
        >
          Design is the silent ambassador of your brand.
          <br />I make it speak volumes.
        </h2>

        <p
          ref={textRef}
          className="font-paragraph text-cream max-w-2xl mx-auto text-base md:text-lg lg:text-xl opacity-90 px-4"
        >
          I bridge the gap between complex engineering and poetic design. With a
          decade of experience in the industry, I help brands tell their stories
          through meaningful interactions and performant, scalable front-end
          architectures.
        </p>
      </div>
    </section>
  );
}
