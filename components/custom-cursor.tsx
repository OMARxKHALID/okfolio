"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current

    if (!cursor || !follower) return

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" })
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" })

    const fxTo = gsap.quickTo(follower, "x", { duration: 0.4, ease: "power3" })
    const fyTo = gsap.quickTo(follower, "y", { duration: 0.4, ease: "power3" })

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
      fxTo(e.clientX)
      fyTo(e.clientY)
    }

    const onMouseDown = () => {
      gsap.to([cursor, follower], { scale: 0.8, duration: 0.3 })
    }

    const onMouseUp = () => {
      gsap.to([cursor, follower], { scale: 1, duration: 0.3 })
    }

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mouseup", onMouseUp)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mousedown", onMouseDown)
      window.removeEventListener("mouseup", onMouseUp)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-gold rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-gold/30 rounded-full pointer-events-none z-[9998] mix-blend-difference -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
    </>
  )
}
