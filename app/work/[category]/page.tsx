"use client";

import { useParams, useRouter } from "next/navigation";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, PROJECTS } from "@/lib/constants";
import { ChevronLeft } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const categorySlug = params.category as string;
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const category = CATEGORIES.find((cat) => cat.slug === categorySlug);
  const categoryProjects = PROJECTS.filter(
    (project) => project.categorySlug === categorySlug
  );

  useGSAP(() => {
    if (!heroRef.current) return;

    // Hero title animation
    gsap.from(".category-hero-title", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    });

    gsap.from(".category-hero-description", {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
    });

    // Project cards stagger animation
    gsap.from(".project-card", {
      y: 80,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 80%",
      },
    });
  });

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream ">
        <div className="text-center">
          <h1 className="general-title text-brown-dark mb-4 text-4xl md:text-6xl">
            404
          </h1>
          <p className="font-paragraph text-brown-dark/70 mb-8">
            Category not found
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brown-dark text-cream rounded-lg hover:bg-brown-red transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream relative z-10">
      {/* Back Button */}
      <div className="fixed top-6 left-6 md:top-10 md:left-10 z-50">
        <button
          onClick={() => router.push("/#work")}
          className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-brown-dark/90 backdrop-blur-sm text-cream rounded-full hover:bg-brown-red transition-all hover:scale-105 text-sm md:text-base"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          <span className="font-bold">BACK</span>
        </button>
      </div>

      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center px-6 md:px-12 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10 flex items-center justify-center py-8 md:py-12">
          <div className="relative w-full max-w-3xl h-full max-h-[60vh] md:max-h-[65vh]">
            <Image
              src={category.image || "/placeholder.svg"}
              alt={category.title}
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="relative z-10 text-center max-w-5xl">
          <div className="category-hero-title mb-6 md:mb-8">
            <span className="text-brown-mid font-bold tracking-widest text-xs md:text-sm mb-4 block">
              CATEGORY
            </span>
            <h1 className="general-title text-brown-dark leading-[0.85] text-5xl md:text-7xl lg:text-9xl">
              {category.title}
            </h1>
          </div>
          <p className="category-hero-description font-paragraph text-brown-dark/75 text-base md:text-xl max-w-2xl mx-auto">
            {category.description}
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div
        ref={gridRef}
        className="container mx-auto px-6 md:px-12 py-12 md:py-20"
      >
        {categoryProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {categoryProjects.map((project, index) => (
              <div
                key={index}
                className="project-card group relative aspect-[3/4] overflow-hidden rounded-xl md:rounded-2xl shadow-2xl transition-transform duration-500 hover:scale-[1.03]"
                style={{ transform: `rotate(${project.rotation}deg)` }}
              >
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white">
                  {project.year && (
                    <span className="text-[9px] md:text-xs font-bold tracking-[0.2em] opacity-80 uppercase block mb-1">
                      {project.year}
                    </span>
                  )}
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading tracking-tighter mb-2">
                    {project.title}
                  </h3>
                  {project.description && (
                    <p className="text-xs md:text-sm text-white/80 max-w-xs">
                      {project.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-paragraph text-brown-dark/50 text-lg md:text-xl">
              No projects in this category yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
