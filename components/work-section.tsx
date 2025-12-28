"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, PORTFOLIO_CONTENT } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function WorkSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const pin = gsap.fromTo(
        scrollContainerRef.current,
        { x: 0 },
        {
          x: "-420vw", // 6 categories * 70vw = 420vw total (larger images)
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            pin: true,
            scrub: 1,
            end: () => `+=${scrollContainerRef.current?.offsetWidth}`,
            invalidateOnRefresh: true,
          },
        }
      );

      return () => {
        pin.kill();
      };
    },
    { scope: triggerRef, dependencies: [] }
  );

  return (
    <div
      id="work-section"
      ref={triggerRef}
      className="overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-cream" />

      <div
        ref={scrollContainerRef}
        className="hidden md:flex h-screen w-[490vw] flex-row relative z-10"
      >
        {/* Editorial Title Card */}
        <div className="h-screen w-[70vw] md:w-[40vw] flex flex-col justify-center px-6 md:px-12 lg:px-16 flex-shrink-0">
          <div className="max-w-xl">
            <span className="text-brown-mid font-bold tracking-widest text-xs md:text-sm mb-4 block">
              {PORTFOLIO_CONTENT.work.badge}
            </span>
            <h2 className="general-title text-brown-dark leading-[0.85] mb-6 md:mb-8 text-3xl md:text-5xl lg:text-7xl">
              CRAFTING
              <br />
              DIGITAL
              <br />
              LEGACIES
            </h2>
            <p className="font-paragraph text-brown-dark/70 max-w-sm text-sm md:text-base">
              A collection of work across multiple creative disciplines. Select
              a category to explore.
            </p>
          </div>
        </div>

        <div className="flex flex-row">
          {CATEGORIES.map((category, index) => (
            <div
              key={index}
              className="h-screen w-[70vw] flex items-center justify-center px-4 md:px-8 flex-shrink-0"
            >
              <Link
                href={`/work/${category.slug}`}
                className="group relative w-full h-[75vh] overflow-hidden rounded-2xl md:rounded-3xl transition-all duration-500 hover:scale-[1.02] cursor-pointer"
              >
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                  sizes="70vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute bottom-8 left-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-xs font-bold tracking-[0.2em] opacity-90 uppercase block mb-2">
                    CATEGORY
                  </span>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight">
                    {category.title}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div
        id="work-section-mobile"
        className="md:hidden min-h-screen bg-cream px-4 py-16"
      >
        <div className="mb-12">
          <span className="text-brown-mid font-bold tracking-widest text-xs mb-4 block">
            {PORTFOLIO_CONTENT.work.badge}
          </span>
          <h2 className="general-title text-brown-dark leading-[0.85] mb-6 text-3xl">
            CRAFTING
            <br />
            DIGITAL
            <br />
            LEGACIES
          </h2>
          <p className="font-paragraph text-brown-dark/70 text-sm">
            A collection of work across multiple creative disciplines. Select a
            category to explore.
          </p>
        </div>

        <div className="space-y-8">
          {CATEGORIES.map((category, index) => (
            <Link
              key={index}
              href={`/work/${category.slug}`}
              className="block relative w-4/5 aspect-[4/3] mx-auto overflow-hidden rounded-2xl"
            >
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
              <div className="absolute bottom-6 left-6 text-white">
                <span className="text-[9px] font-bold tracking-[0.2em] opacity-90 uppercase block mb-1">
                  CATEGORY
                </span>
                <h3 className="text-2xl font-heading tracking-tight">
                  {category.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
