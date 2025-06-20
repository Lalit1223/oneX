"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // ⚙️ LOADING DURATION SETTINGS - Adjust these values
  const LOADING_SETTINGS = {
    minLoadingTime: 8000, // Minimum 8 seconds total
    progressSpeed: 400, // Progress update every 400ms
    incrementSize: 3, // Smaller increments (3-8%)
    completeDelay: 3000, // Stay at 100% for 3 seconds
    fadeOutDuration: 1000, // Fade out time
  };

  useEffect(() => {
    let startTime = Date.now();

    const interval = setInterval(() => {
      setProgress((prev) => {
        const elapsedTime = Date.now() - startTime;
        const increment =
          LOADING_SETTINGS.incrementSize + Math.floor(Math.random() * 5);
        const newProgress = Math.min(prev + increment, 100);

        // Don't complete until minimum time has passed
        if (
          newProgress >= 100 &&
          elapsedTime >= LOADING_SETTINGS.minLoadingTime
        ) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), LOADING_SETTINGS.completeDelay);
          return 100;
        } else if (
          newProgress >= 95 &&
          elapsedTime < LOADING_SETTINGS.minLoadingTime
        ) {
          // Slow down progress if we're reaching 100% too quickly
          return prev + 1;
        }

        return newProgress;
      });
    }, LOADING_SETTINGS.progressSpeed);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="loading-screen"
          style={{
            background:
              "linear-gradient(135deg, #1e3a8a 0%, #7c3aed 50%, #1e40af 100%)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="text-center text-white px-8">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.3, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-12"
            >
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
                style={{
                  background:
                    "linear-gradient(45deg, #60a5fa, #a78bfa, #34d399, #fbbf24)",
                  backgroundSize: "400% 400%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                OneConnectX
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-blue-200 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Innovation Through Technology
              </motion.p>
            </motion.div>

            {/* Progress Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="w-full max-w-md mx-auto"
            >
              {/* Progress Bar Container */}
              <div className="relative mb-6">
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, #60a5fa, #a78bfa, #34d399)",
                      boxShadow: "0 0 20px rgba(96, 165, 250, 0.5)",
                    }}
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>

                {/* Progress Text */}
                <motion.div
                  className="absolute -top-8 left-0 text-sm font-semibold text-blue-200"
                  animate={{ x: `${Math.max(0, Math.min(progress - 5, 95))}%` }}
                  transition={{ duration: 0.3 }}
                >
                  {progress}%
                </motion.div>
              </div>

              {/* Loading Status */}
              <motion.p
                className="text-lg mb-8 text-blue-100 font-medium"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {progress < 30 && "Initializing..."}
                {progress >= 30 && progress < 60 && "Loading Components..."}
                {progress >= 60 && progress < 90 && "Building Innovation..."}
                {progress >= 90 && "Almost Ready!"}
              </motion.p>

              {/* Animated Dots */}
              <div className="flex justify-center gap-3 mb-8">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: "linear-gradient(45deg, #60a5fa, #a78bfa)",
                      boxShadow: "0 0 10px rgba(96, 165, 250, 0.5)",
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Background Animated Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Floating Orbs */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`orb-${i}`}
                  className="absolute rounded-full"
                  style={{
                    width: `${20 + (i % 3) * 20}px`,
                    height: `${20 + (i % 3) * 20}px`,
                    background: `radial-gradient(circle, rgba(${
                      i % 2 === 0 ? "96, 165, 250" : "167, 139, 250"
                    }, 0.3) 0%, transparent 70%)`,
                    left: `${10 + ((i * 8) % 80)}%`,
                    top: `${10 + ((i * 13) % 80)}%`,
                  }}
                  animate={{
                    y: [0, -100, 0],
                    x: [0, 50, 0],
                    opacity: [0, 0.6, 0],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 6 + (i % 3),
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut",
                  }}
                />
              ))}

              {/* Geometric Shapes */}
              <motion.div
                className="absolute top-1/4 left-1/4 w-16 h-16 border-2 border-blue-400/30"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
              />

              <motion.div
                className="absolute bottom-1/4 right-1/4 w-12 h-12 border-2 border-purple-400/30 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
