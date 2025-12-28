"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, Github, Twitter, Linkedin, Instagram } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function FooterSection() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      // CTA Title Slide Up
      gsap.from(".footer-title", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      })

      // Content Fade In
      gsap.from(".footer-content", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
      })

      // Social Icons Scale
      gsap.from(".social-icon", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
        },
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)",
      })
    },
    { scope: containerRef },
  )

  return (
    <footer ref={containerRef} className="bg-surface-dark py-16 md:py-24 px-6 md:px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24 text-center">
          <h2 className="footer-title general-title text-cream mb-2 md:mb-4 text-4xl md:text-6xl lg:text-8xl">
            LET'S START A
          </h2>
          <h2 className="footer-title general-title text-gold text-4xl md:text-6xl lg:text-8xl">PROJECT TOGETHER</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Glassmorphic Contact Card */}
          <div className="footer-content bg-cream/5 backdrop-blur-xl border border-white/10 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold/10 rounded-full blur-[80px]" />

            <h3 className="text-2xl md:text-3xl font-heading text-cream mb-6 md:mb-8">GET IN TOUCH</h3>

            <div className="relative mb-8 md:mb-12">
              <input
                type="email"
                placeholder="YOUR EMAIL"
                className="w-full bg-transparent border-b border-cream/20 py-3 md:py-4 text-cream focus:outline-none focus:border-gold transition-colors font-heading text-lg md:text-xl placeholder:text-cream/20"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-gold rounded-full flex-center hover:scale-110 transition-transform">
                <ArrowRight className="text-brown-dark w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>

            <div className="flex gap-6 md:gap-8">
              <div className="social-icon">
                <Github className="text-cream/50 hover:text-gold transition-colors cursor-pointer w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="social-icon">
                <Twitter className="text-cream/50 hover:text-gold transition-colors cursor-pointer w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="social-icon">
                <Linkedin className="text-cream/50 hover:text-gold transition-colors cursor-pointer w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="social-icon">
                <Instagram className="text-cream/50 hover:text-gold transition-colors cursor-pointer w-5 h-5 md:w-6 md:h-6" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-content grid grid-cols-2 gap-6 md:gap-8">
            <div>
              <h4 className="text-gold font-bold text-[10px] md:text-xs tracking-[0.3em] uppercase mb-6 md:mb-8">
                NAVIGATION
              </h4>
              <ul className="space-y-3 md:space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-cream/60 hover:text-cream transition-colors font-heading text-lg md:text-xl"
                  >
                    HOME
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-cream/60 hover:text-cream transition-colors font-heading text-lg md:text-xl"
                  >
                    WORK
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-cream/60 hover:text-cream transition-colors font-heading text-lg md:text-xl"
                  >
                    ABOUT
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-cream/60 hover:text-cream transition-colors font-heading text-lg md:text-xl"
                  >
                    SERVICES
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-gold font-bold text-[10px] md:text-xs tracking-[0.3em] uppercase mb-6 md:mb-8">
                LOCATION
              </h4>
              <p className="text-cream/60 font-paragraph text-base md:text-lg leading-relaxed">
                Berlin, Germany
                <br />
                Available Worldwide
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 md:mt-32 pt-6 md:pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-cream/20 text-[10px] md:text-xs font-bold tracking-widest uppercase">
            © 2025 OMAR KHALID. ALL RIGHTS RESERVED.
          </p>
          <p className="text-cream/20 text-[10px] md:text-xs font-bold tracking-widest uppercase cursor-pointer hover:text-cream/40 transition-colors">
            PRIVACY POLICY
          </p>
        </div>
      </div>
    </footer>
  )
}
