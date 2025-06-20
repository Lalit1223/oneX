"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Mouse parallax hook for interactive elements
function useMouseParallax(intensity = 1) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX - window.innerWidth / 2) * intensity;
      const y = (e.clientY - window.innerHeight / 2) * intensity;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [intensity]);

  return mousePosition;
}

export default function InteractiveElements() {
  const mouseParallax = useMouseParallax(0.05); // Reduced intensity for smoother feel

  const floatingElements = [
    {
      id: 1,
      left: "10%",
      top: "20%",
      size: "w-16 h-16",
      color: "from-blue-400 to-purple-400",
      shape: "rounded-full",
      intensity: 0.15,
    },
    {
      id: 2,
      left: "85%",
      top: "15%",
      size: "w-12 h-12",
      color: "from-cyan-400 to-teal-400",
      shape: "rounded-lg rotate-45",
      intensity: 0.25,
    },
    {
      id: 3,
      left: "15%",
      top: "70%",
      size: "w-20 h-20",
      color: "from-pink-400 to-rose-400",
      shape: "rounded-full",
      intensity: 0.08,
    },
    {
      id: 4,
      left: "90%",
      top: "60%",
      size: "w-8 h-8",
      color: "from-yellow-400 to-orange-400",
      shape: "rounded-lg rotate-12",
      intensity: 0.3,
    },
    {
      id: 5,
      left: "50%",
      top: "10%",
      size: "w-6 h-6",
      color: "from-emerald-400 to-green-400",
      shape: "rounded-full",
      intensity: 0.2,
    },
    {
      id: 6,
      left: "70%",
      top: "80%",
      size: "w-14 h-14",
      color: "from-indigo-400 to-purple-400",
      shape: "rounded-xl rotate-45",
      intensity: 0.12,
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute ${element.size} bg-gradient-to-r ${element.color} ${element.shape} opacity-20 backdrop-blur-sm`}
          style={{
            left: element.left,
            top: element.top,
          }}
          animate={{
            x: mouseParallax.x * element.intensity * 0.5, // Reduced influence
            y: mouseParallax.y * element.intensity * 0.5,
            rotate: mouseParallax.x * 0.05, // Reduced rotation
          }}
          transition={{
            type: "spring",
            stiffness: 60, // Smoother spring
            damping: 30, // More damping
            mass: 0.8, // More mass for stability
          }}
          whileHover={{ scale: 1.2, opacity: 0.4 }}
        />
      ))}

      {/* Interactive cursor follower - more subtle */}
      <motion.div
        className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-blue-500/5 to-purple-500/5 backdrop-blur-sm border border-white/5 pointer-events-none"
        animate={{
          x: mouseParallax.x * 1.5, // Reduced movement
          y: mouseParallax.y * 1.5,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 40, // More damping for smoother movement
        }}
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Magnetic grid points */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`grid-${i}`}
          className="absolute w-2 h-2 bg-white/30 rounded-full"
          style={{
            left: `${15 + (i % 4) * 25}%`,
            top: `${20 + Math.floor(i / 4) * 30}%`,
          }}
          animate={{
            x: mouseParallax.x * (0.05 + (i % 3) * 0.02),
            y: mouseParallax.y * (0.05 + (i % 3) * 0.02),
            scale: [1, 1.5, 1],
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 25,
            scale: {
              duration: 2 + (i % 3),
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
      ))}
    </div>
  );
}
