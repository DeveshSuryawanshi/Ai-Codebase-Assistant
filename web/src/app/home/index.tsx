import React from "react";
import HeroSection from "./components/hero-section";
import LanguageSupport from "./components/language-support";
import HowItWorks from "./components/how-it-works";

export default function Hero() {
  return (
    <div>
      <div className="inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_50%)] opacity-12" />
        <HeroSection />
        <LanguageSupport />
        <HowItWorks />
      </div>
    </div>
  );
}
