'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { FileQuestion, Database } from "lucide-react";
import { useRouter } from "next/navigation";

function HeroSection() {
  const router = useRouter();

  const handleIndexRepo = () => {
    router.push("/index-repo");
  }

  return (
    <section className="relative w-full flex items-start justify-center overflow-hidden my-25">

      <div className="relative z-10 max-w-5xl px-6 text-center flex flex-col items-center">
        {/* Badge */}
        <div className="mb-6 px-4 py-1.5 text-sm rounded-full border bg-muted/40 backdrop-blur">
          AI Codebase Assistant
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight bg-clip-text">
          Understand Any Codebase Instantly
        </h1>

        {/* Subtext */}
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
          Ask questions to any repository and get precise, context-aware answers
          powered by AI. No more endless scrolling through unfamiliar code.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Button size="lg" className="gap-2 px-8 shadow-lg" onClick={handleIndexRepo}>
            <Database className="w-5 h-5"/>
            Index Repository
          </Button>

          <Button
            size="lg"
            variant="secondary"
            className="gap-2 px-8 shadow-lg"
          >
            <FileQuestion className="w-5 h-5" />
            Ask a Question
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
