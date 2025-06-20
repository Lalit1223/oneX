"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Mouse parallax hook for background
function useMouseParallaxLayers() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
      const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;

      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return {
    subtle: { x: mousePosition.x * 20, y: mousePosition.y * 20 },
    medium: { x: mousePosition.x * 50, y: mousePosition.y * 50 },
    strong: { x: mousePosition.x * 100, y: mousePosition.y * 100 },
    extreme: { x: mousePosition.x * 200, y: mousePosition.y * 200 },
  };
}

export default function ParallaxBackground() {
  const ref = useRef(null);

  // Mouse parallax layers
  const mouseLayers = useMouseParallaxLayers();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // EXTREME parallax transforms - much more dramatic like NK Studio
  const ultraFastUp = useTransform(scrollYProgress, [0, 1], [0, -2000]); // Super fast upward
  const ultraFastDown = useTransform(scrollYProgress, [0, 1], [0, 1500]); // Super fast downward
  const fastLeft = useTransform(scrollYProgress, [0, 1], [0, -1200]); // Fast leftward
  const fastRight = useTransform(scrollYProgress, [0, 1], [0, 1000]); // Fast rightward
  const mediumUp = useTransform(scrollYProgress, [0, 1], [0, -800]); // Medium upward
  const slowDown = useTransform(scrollYProgress, [0, 1], [0, 400]); // Slow downward

  // Extreme rotations like NK Studio
  const rotate360 = useTransform(scrollYProgress, [0, 1], [0, 720]); // 2 full rotations
  const rotateReverse = useTransform(scrollYProgress, [0, 1], [0, -540]); // 1.5 reverse rotations

  // Dramatic scale changes
  const scaleGrow = useTransform(scrollYProgress, [0, 1], [1, 4]); // Grows 4x
  const scaleShrink = useTransform(scrollYProgress, [0, 1], [1, 0.2]); // Shrinks to 20%
  const scaleWave = useTransform(scrollYProgress, [0, 0.5, 1], [1, 3, 0.1]); // Wave effect

  // Opacity changes for depth
  const fadeOut = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const fadeIn = useTransform(scrollYProgress, [0.2, 1], [0, 1]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      {/* Layer 1 - ULTRA FAST BACKGROUND with SMOOTH MOUSE PARALLAX */}
      <motion.div
        className="absolute inset-0 -top-[100vh]"
        style={{
          y: ultraFastUp,
          x: fastLeft,
          opacity: fadeOut,
        }}
        animate={{
          x: fastLeft.get() + mouseLayers.extreme.x * 0.3, // Reduced intensity
          y: ultraFastUp.get() + mouseLayers.extreme.y * 0.2,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }} // Smoother spring
      >
        <motion.div
          className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/50 to-purple-500/50 rounded-full filter blur-3xl"
          style={{
            rotate: rotate360,
            scale: scaleGrow,
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/40 to-pink-500/40 rounded-full filter blur-3xl"
          style={{
            rotate: rotateReverse,
            scale: scaleWave,
          }}
        />
      </motion.div>

      {/* Layer 2 - FAST MOVING ELEMENTS with SMOOTH MOUSE PARALLAX */}
      <motion.div
        className="absolute inset-0 -bottom-[100vh]"
        style={{
          y: ultraFastDown,
          x: fastRight,
          opacity: fadeIn,
        }}
        animate={{
          x: fastRight.get() + mouseLayers.strong.x * 0.4,
          y: ultraFastDown.get() + mouseLayers.strong.y * 0.3,
        }}
        transition={{ type: "spring", stiffness: 60, damping: 35 }}
      >
        <motion.div
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-indigo-500/40 to-cyan-500/40 rounded-full filter blur-2xl"
          style={{
            scale: scaleShrink,
            rotate: rotate360,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-[700px] h-[700px] bg-gradient-to-r from-cyan-500/35 to-teal-500/35 rounded-full filter blur-2xl"
          style={{
            rotate: rotateReverse,
            scale: scaleGrow,
          }}
        />
      </motion.div>

      {/* Layer 3 - MEDIUM SPEED with GENTLE MOUSE PARALLAX */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: mediumUp,
          x: useTransform(scrollYProgress, [0, 1], [0, -600]),
        }}
        animate={{
          x: -600 * scrollYProgress.get() + mouseLayers.medium.x * 0.2,
          y: mediumUp.get() + mouseLayers.medium.y * 0.2,
        }}
        transition={{ type: "spring", stiffness: 40, damping: 40 }}
      >
        <motion.div
          className="absolute top-1/3 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-pink-500/30 to-rose-500/30 rounded-full filter blur-xl"
          style={{
            rotate: rotateReverse,
            scale: scaleWave,
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-[350px] h-[350px] bg-gradient-to-r from-emerald-500/30 to-green-500/30 rounded-full filter blur-xl"
          style={{
            rotate: rotate360,
            scale: scaleShrink,
          }}
        />
      </motion.div>

      {/* Layer 4 - SLOW BACKGROUND with MINIMAL MOUSE PARALLAX */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: slowDown,
          x: useTransform(scrollYProgress, [0, 1], [0, 200]),
        }}
        animate={{
          x: 200 * scrollYProgress.get() + mouseLayers.subtle.x * 0.1,
          y: slowDown.get() + mouseLayers.subtle.y * 0.1,
        }}
        transition={{ type: "spring", stiffness: 30, damping: 50 }}
      >
        <motion.div
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-400/20 rounded-full filter blur-lg"
          style={{
            rotate: rotate360,
            scale: scaleGrow,
          }}
        />
        <motion.div
          className="absolute bottom-1/2 right-1/4 w-80 h-80 bg-purple-400/20 rounded-full filter blur-lg"
          style={{
            rotate: rotateReverse,
          }}
        />
      </motion.div>

      {/* GEOMETRIC SHAPES with INTERACTIVE MOUSE PARALLAX */}
      <motion.div
        style={{
          y: ultraFastUp,
          x: fastRight,
        }}
        className="absolute inset-0"
        animate={{
          x: fastRight.get() + mouseLayers.strong.x * 0.8,
          y: ultraFastUp.get() + mouseLayers.strong.y * 0.8,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 25 }}
      >
        {/* Large Triangle */}
        <motion.div
          className="absolute top-1/6 left-1/3 w-32 h-32 bg-gradient-to-r from-blue-400/30 to-purple-400/30"
          style={{
            rotate: rotate360,
            scale: scaleGrow,
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          }}
        />

        {/* Hexagon */}
        <motion.div
          className="absolute bottom-1/4 right-1/6 w-24 h-24 bg-gradient-to-r from-cyan-400/30 to-teal-400/30"
          style={{
            rotate: rotateReverse,
            scale: scaleWave,
            clipPath:
              "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
          }}
        />

        {/* Diamond */}
        <motion.div
          className="absolute top-1/2 right-1/4 w-20 h-20 bg-gradient-to-r from-pink-400/25 to-rose-400/25 transform rotate-45"
          style={{
            rotate: rotate360,
            scale: scaleShrink,
          }}
        />
      </motion.div>

      {/* FLOATING PARTICLES with EXTREME movement */}
      {[
        { left: 15, top: 20, delay: 0, size: "w-3 h-3" },
        { left: 85, top: 30, delay: 0.5, size: "w-2 h-2" },
        { left: 25, top: 60, delay: 1, size: "w-4 h-4" },
        { left: 75, top: 80, delay: 1.5, size: "w-2 h-2" },
        { left: 45, top: 15, delay: 0.3, size: "w-3 h-3" },
        { left: 65, top: 45, delay: 0.8, size: "w-2 h-2" },
        { left: 35, top: 75, delay: 1.2, size: "w-3 h-3" },
        { left: 55, top: 35, delay: 0.6, size: "w-4 h-4" },
        { left: 80, top: 65, delay: 1.8, size: "w-2 h-2" },
        { left: 20, top: 85, delay: 0.9, size: "w-3 h-3" },
      ].map((particle, i) => (
        <motion.div
          key={i}
          className={`absolute ${particle.size} bg-white/50 rounded-full`}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            y:
              i % 3 === 0
                ? ultraFastUp
                : i % 3 === 1
                ? ultraFastDown
                : mediumUp,
            x: i % 2 === 0 ? fastLeft : fastRight,
            opacity: i % 2 === 0 ? fadeOut : fadeIn,
          }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.3, 1, 0.3],
            rotate: [0, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* MOVING GRID PATTERN REMOVED - was causing visual clutter */}

      {/* DIAGONAL LINES moving in opposite direction */}
      <motion.div
        style={{
          y: ultraFastDown,
          x: fastRight,
          rotate: useTransform(scrollYProgress, [0, 1], [0, 180]),
        }}
        className="absolute inset-0 opacity-5"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-white to-transparent"
            style={{
              width: "300%",
              top: `${i * 12.5}%`,
              left: "-100%",
              transform: "rotate(45deg)",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
