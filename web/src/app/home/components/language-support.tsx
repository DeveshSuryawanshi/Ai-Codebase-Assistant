"use client";

import React, { useRef } from "react";
import { SUPPORTED_LANGUAGES } from "../constants";
import Image from "next/image";
import { motion, useAnimationControls, useMotionValue } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type Direction = "left" | "right";

function MarqueeTrack({
  items,
  direction = "left",
}: {
  items: (typeof SUPPORTED_LANGUAGES)[number][];
  direction?: Direction;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const controls = useAnimationControls();

  // "left"  → 0 to -halfWidth   (moves left)
  // "right" → -halfWidth to 0   (moves right, starts offset so loop is seamless)
  const getKeyframes = React.useCallback(
    (halfWidth: number): [number, number] =>
      direction === "left" ? [0, -halfWidth] : [-halfWidth, 0],
    [direction],
  );

  const startAnimation = React.useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const halfWidth = track.scrollWidth / 2;

    controls.start({
      x: getKeyframes(halfWidth),
      transition: {
        duration: 30,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  }, [controls, getKeyframes]);

  React.useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  const handleHoverEnd = React.useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const halfWidth = track.scrollWidth / 2;
    const current = x.get();
    const totalDuration = 30;

    if (direction === "left") {
      // How far through the -halfWidth journey are we?
      const progress = Math.abs(current) / halfWidth;
      const remainingDuration = totalDuration * (1 - progress);

      controls.start({
        x: [current, -halfWidth],
        transition: {
          duration: remainingDuration,
          ease: "linear",
          onComplete: () => startAnimation(),
        },
      });
    } else {
      // "right": journey is -halfWidth → 0
      // Distance already covered = current - (-halfWidth) = current + halfWidth
      const progress = (current + halfWidth) / halfWidth;
      const remainingDuration = totalDuration * (1 - progress);

      controls.start({
        x: [current, 0],
        transition: {
          duration: remainingDuration,
          ease: "linear",
          onComplete: () => startAnimation(),
        },
      });
    }
  }, [controls, direction, startAnimation, x]);

  return (
    <motion.div
      ref={trackRef}
      animate={controls}
      style={{ x }}
      className="flex w-max gap-4 px-4"
      onHoverStart={() => controls.stop()}
      onHoverEnd={handleHoverEnd}
    >
      {items.map((lang, idx) => (
        <motion.div
          key={`${lang.name}-${idx}`}
          whileHover={{ scale: 1.06, y: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="shrink-0"
        >
          <div className="bg-muted border border-input rounded-md flex items-center gap-3 px-8 py-6 w-44 cursor-default">
            <Image
              src={lang.icon}
              alt={`${lang.name} icon`}
              width={24}
              height={24}
              className="w-8 h-8 rounded-sm shrink-0 dark:invert dark:sepia dark:saturate-500 dark:hue-rotate-200"
            />
            <span className="text-sm font-medium truncate">{lang.name}</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function LanguageSupport() {
  const doubled = [...SUPPORTED_LANGUAGES, ...SUPPORTED_LANGUAGES];

  return (
    <div className="flex flex-col justify-center items-center gap-6 py-12 overflow-hidden">
      <h2 className="text-3xl font-bold mx-auto">Supported Languages</h2>
      <p className="text-lg text-center text-muted-foreground w-[80%] max-w-2xl">
        Our AI Codebase Assistant supports a wide range of programming languages,
        making it easier for you to understand and navigate any codebase,
        regardless of the technology stack.
      </p>

      {/* Row 1 — scrolls left */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <MarqueeTrack items={doubled} direction="left" />
      </div>

      {/* Row 2 — scrolls right */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <MarqueeTrack items={doubled} direction="right" />
      </div>

      <div className="mt-3">
        <Button className="w-md font-extrabold hover:scale-105 transition-all">Get Started <ArrowRight className="ml-2 w-4 h-4 font-extrabold" /></Button>
      </div>
    </div>
  );
}

export default LanguageSupport;