"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import MotionPathPlugin from "gsap/MotionPathPlugin"

gsap.registerPlugin(MotionPathPlugin)

export default function HomeSmileAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const timeline = gsap.timeline()

    // Animate letters dropping in
    const letters = containerRef.current.querySelectorAll(".smile-letter")
    timeline.to(
      letters,
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
      },
      0,
    )

    // After letters land, animate the tracer
    timeline.to(
      ".tracer-particle",
      {
        motionPath: {
          path: "path.smile-path",
          align: "path.smile-path",
          autoRotate: true,
        },
        duration: 2,
        ease: "power1.inOut",
      },
      1.5,
    )

    // Fade in subtext
    timeline.to(
      ".subtext",
      {
        opacity: 1,
        duration: 0.8,
      },
      3.5,
    )
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center relative">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
        {/* Smile path */}
        <path className="smile-path" d="M 200 400 Q 500 250 800 400" stroke="none" fill="none" />
        {/* Smile line */}
        <path d="M 200 400 Q 500 250 800 400" stroke="#00BFFF" strokeWidth="3" fill="none" filter="url(#glow)" />
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Letters */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-6xl font-black text-center" style={{ textShadow: "0 0 20px #00BFFF" }}>
          {"HARSHAVARDHAN".split("").map((letter, i) => (
            <span
              key={i}
              className="smile-letter inline-block"
              style={{
                transform: "translateY(-100px)",
                opacity: 0,
                color: "#00BFFF",
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>

      {/* Tracer particle */}
      <div
        className="tracer-particle absolute w-3 h-3 rounded-full"
        style={{
          background: "#00BFFF",
          boxShadow: "0 0 10px #00BFFF",
          top: "400px",
          left: "200px",
        }}
      />

      {/* Subtext */}
      <div className="subtext absolute bottom-20 text-center text-white text-2xl font-black" style={{ opacity: 0 }}>
        Embedded Systems Developer
      </div>
    </div>
  )
}
