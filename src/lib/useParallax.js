"use client";
import { useState, useEffect } from "react";

export function useMouseParallax(intensity = 1) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Get mouse position relative to viewport center
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

export function useMouseParallaxLayers() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate mouse position as percentage from center
      const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
      const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;

      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Return different intensities for different layers
  return {
    subtle: { x: mousePosition.x * 20, y: mousePosition.y * 20 },
    medium: { x: mousePosition.x * 50, y: mousePosition.y * 50 },
    strong: { x: mousePosition.x * 100, y: mousePosition.y * 100 },
    extreme: { x: mousePosition.x * 200, y: mousePosition.y * 200 },
  };
}
