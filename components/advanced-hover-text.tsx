"use client";

import type React from "react";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface AdvancedHoverTextProps {
  text: string;
  className?: string;
  minWeight?: number;
  maxWeight?: number;
  influenceRadius?: number;
}

export default function AdvancedHoverText({
  text,
  className = "",
  minWeight = 100,
  maxWeight = 900,
  influenceRadius = 100,
}: AdvancedHoverTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [letterWeights, setLetterWeights] = useState<number[]>(
    Array(text.length).fill(minWeight)
  );
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [letterPositions, setLetterPositions] = useState<
    { x: number; y: number }[]
  >([]);

  // Calculate letter positions once and store them
  useEffect(() => {
    if (!containerRef.current) return;

    // Wait a bit to ensure all refs are populated and layout is stable
    const timer = setTimeout(() => {
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect) return;

      const positions = letterRefs.current.map((ref) => {
        if (!ref) return { x: 0, y: 0 };
        const rect = ref.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.top + rect.height / 2 - containerRect.top,
        };
      });

      setLetterPositions(positions);
      setIsInitialized(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [text]);

  // Throttled mouse move handler
  const lastUpdateTime = useRef(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (
        !containerRef.current ||
        !isInitialized ||
        letterPositions.length === 0
      )
        return;

      // Throttle updates to every 16ms (roughly 60fps)
      const now = Date.now();
      if (now - lastUpdateTime.current < 16) return;
      lastUpdateTime.current = now;

      // Get container position
      const containerRect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - containerRect.left;
      const mouseY = e.clientY - containerRect.top;

      // Calculate new weights based on cached positions
      const newWeights = letterPositions.map((pos, index) => {
        // Calculate distance from mouse to letter center
        const distance = Math.sqrt(
          Math.pow(mouseX - pos.x, 2) + Math.pow(mouseY - pos.y, 2)
        );

        // Calculate weight based on distance (closer = heavier)
        if (distance > influenceRadius) return minWeight;

        const weightRange = maxWeight - minWeight;
        // Use a smoother falloff curve
        const falloff = Math.pow(
          1 - Math.min(distance / influenceRadius, 1),
          2
        );
        return Math.round(minWeight + falloff * weightRange);
      });

      setLetterWeights(newWeights);
    },
    [isInitialized, letterPositions, minWeight, maxWeight, influenceRadius]
  );

  // Reset weights when mouse leaves
  const handleMouseLeave = useCallback(() => {
    setLetterWeights(Array(text.length).fill(minWeight));
  }, [text.length, minWeight]);

  return (
    <div
      ref={containerRef}
      className={`inline-block cursor-default ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {text.split("").map((letter, index) => (
        <motion.span
          layout
          key={index}
          ref={(el) => {
            letterRefs.current[index] = el;
          }}
          className="inline-block cursor-default select-none text-lg"
          animate={{
            fontWeight: letterWeights[index],
            // Removed scale effect completely
          }}
          transition={{
            duration: 0.2, // Slightly longer for smoother transitions
            ease: "easeOut", // Using a built-in easing function for reliability
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </div>
  );
}
