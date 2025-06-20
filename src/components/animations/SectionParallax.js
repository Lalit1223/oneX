"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SectionParallax({
  children,
  speed = 0.5,
  className = "",
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
