"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

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
      {/* Logo */}
      <a
        href="#root"
        onClick={(e) => handleScrollTo(e, "#root")}
        className="pointer-events-auto group"
      >
        <span className="font-display font-bold text-3xl tracking-tighter leading-none block transition-transform duration-300 origin-top-left group-hover:scale-90">
          OK
        </span>
      </a>

      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-col items-end space-y-1 pointer-events-auto">
        <span className="font-sans text-[10px] uppercase tracking-widest opacity-80 mb-2">
          Navigation
        </span>

        <div className="flex flex-col items-end space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.label}
              item={item}
              handleScrollTo={handleScrollTo}
            />
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      <button className="md:hidden pointer-events-auto font-display uppercase text-md">
        Menu
      </button>
    </nav>
  );
}

function NavLink({
  item,
  handleScrollTo,
}: {
  item: { label: string; href: string };
  handleScrollTo: (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={item.href}
      onClick={(e) => handleScrollTo(e, item.href)}
      className="font-display uppercase text-md tracking-tight leading-none relative group overflow-hidden inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        className="inline-block"
        style={{
          transform: isHovered ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 300ms cubic-bezier(0.6, 0, 0.4, 1)",
        }}
      >
        {item.label}
      </span>
      <span
        className="absolute top-0 left-0 inline-block text-gold"
        style={{
          transform: isHovered ? "translateY(0)" : "translateY(100%)",
          transition: "transform 300ms cubic-bezier(0.6, 0, 0.4, 1)",
        }}
        aria-hidden="true"
      >
        {item.label}
      </span>
    </a>
  );
}
