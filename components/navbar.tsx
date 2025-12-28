"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const NAV_ITEMS = [
    { label: "Home", href: "#root" },
    { label: "About", href: "#about-section" },
    { label: "Work", href: "#work-section" },
    { label: "Skills", href: "#skills-section" },
    { label: "Approach", href: "#approach-section" },
    { label: "Testimonials", href: "#testimonial-section" },
  ];
  useGSAP(
    () => {
      gsap.from(navRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2,
      });
    },
    { scope: navRef }
  );

  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 md:py-8 flex justify-between items-start mix-blend-difference text-white pointer-events-none"
    >
      <a
        href="#"
        onClick={(e) => handleScrollTo(e, "#root")}
        className="pointer-events-auto group"
      >
        <span className="font-display font-bold text-4xl tracking-tighter leading-none block group-hover:scale-90 transition-transform duration-300 origin-top-left">
          OK
        </span>
      </a>

      <div className="hidden md:flex flex-col items-end space-y-1 pointer-events-auto">
        <span className="font-sans text-[10px] uppercase tracking-widest opacity-80 mb-2">
          Navigation
        </span>
        <div className="flex flex-col items-end space-y-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleScrollTo(e, item.href)}
              className="font-display uppercase text-2xl tracking-tight leading-none hover:text-gold transition-colors relative group overflow-hidden"
            >
              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                {item.label}
              </span>
              <span className="absolute top-0 left-0 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-gold">
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Menu Icon (Simple placeholder) */}
      <button className="md:hidden pointer-events-auto font-display uppercase text-xl">
        Menu
      </button>
    </nav>
  );
}
