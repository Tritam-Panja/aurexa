import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, ChevronDown } from "lucide-react";
import { scrollToId } from "@/lib/scroll";
import { EASE } from "./reveal";
import heroBg from "@/assets/aurexahero2.jpg";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.06]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <div ref={containerRef} data-testid="hero-section" className="relative bg-ink">
      {/* =========================================================================
          SCREEN 1: COVER / INTRO SPLASH SECTION (Aurora Art & Sculpture Centered)
          ========================================================================= */}
      <section
        id="hero-intro"
        data-testid="hero-intro-screen"
        className="relative flex h-[100svh] w-full flex-col justify-between items-center overflow-hidden px-6 text-center select-none"
      >
        {/* Fullscreen Background Artwork */}
        <motion.div
          style={{ scale: imgScale, y: imgY }}
          className="absolute inset-0 z-0"
        >
          <img
            src={heroBg}
            alt="Aurora Art & Sculpture Gallery"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-center filter brightness-[0.95]"
          />
          {/* Subtle Ambient Vignette & Lighting Gradients */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-radial-vignette opacity-60"
            style={{
              background:
                "radial-gradient(circle at center, transparent 35%, rgba(7, 16, 29, 0.75) 100%)",
            }}
          />
        </motion.div>

        {/* Top spacer to perfectly center the logo */}
        <div className="relative z-10 pt-16 md:pt-20 opacity-0 pointer-events-none">
          <span className="text-[10px] tracking-[0.4em]">AUREXA</span>
        </div>

        {/* Center: Radiant AUREXA Logo with Sparkle in 'X' & ART & SCULPTURE */}
        <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl mx-auto my-auto">
          {/* Main Brand Title with Sparkling X */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.4, ease: EASE }}
            className="relative"
          >
            <h1 className="font-cinzel text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-[0.24em] pl-[0.24em] text-[#F1ECE1] drop-shadow-[0_4px_28px_rgba(0,0,0,0.85)] flex items-center justify-center">
              AUREXA
            </h1>

          </motion.div>

          {/* Subtitle: ART & SCULPTURE */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
            className="mt-4 sm:mt-6 flex items-center justify-center gap-3 sm:gap-6 w-full"
          >
            <div className="h-px flex-1 max-w-[40px] sm:max-w-[70px] bg-gradient-to-r from-transparent to-[#F1ECE1]/60" />
            <p className="font-sans text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.55em] text-[#F1ECE1]/90 font-light pl-[0.55em]">
              ART &amp; SCULPTURE
            </p>
            <div className="h-px flex-1 max-w-[40px] sm:max-w-[70px] bg-gradient-to-l from-transparent to-[#F1ECE1]/60" />
          </motion.div>
        </div>

        {/* Bottom Cue: SCROLL TO EXPLORE with Down Arrow */}
        <motion.button
          onClick={() => scrollToId("hero-main")}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.9 }}
          className="group relative z-10 mb-10 flex flex-col items-center gap-3.5 focus:outline-none transition-transform hover:scale-105"
          aria-label="Scroll to explore main hero"
        >
          <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.45em] text-ivory/60 transition-colors duration-300 group-hover:text-champagne pl-[0.45em]">
            SCROLL TO EXPLORE
          </span>
          <div className="relative flex flex-col items-center">
            {/* Animated vertical guide line */}
            <motion.div
              className="h-10 sm:h-12 w-[1.5px] bg-gradient-to-b from-champagne/80 via-champagne/40 to-transparent"
              animate={{ scaleY: [0.7, 1.2, 0.7], y: [0, 5, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2.4,
                ease: "easeInOut",
              }}
            />
            <ArrowDown className="h-3 w-3 -mt-1 text-champagne/80 transition-transform duration-300 group-hover:translate-y-1" />
          </div>
        </motion.button>
      </section>

      {/* =========================================================================
          SCREEN 2: MAIN HERO / ART BEYOND THE ORDINARY
          ========================================================================= */}
      <section
        id="hero-main"
        data-testid="hero-main-screen"
        className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden bg-ink pt-28 pb-12 px-6 sm:px-12 md:px-16 lg:px-24"
      >
        {/* Gallery Background continuing the atmospheric scene */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="Art Beyond the Ordinary"
            fetchPriority="low"
            decoding="async"
            className="h-full w-full object-cover object-center filter brightness-[0.88]"
          />
          {/* Left-to-Right Dark Gradient Mask for pristine text contrast */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/75 to-ink/20 lg:via-ink/65 lg:to-transparent"
          />
          {/* Subtle Top & Bottom Blends */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink"
          />
        </div>

        {/* Top spacer for breathing room below the sticky/fixed Navbar */}
        <div className="relative z-10 h-4" />

        {/* Left-Aligned Hero Content Block (Matching Screen 2 in Reference) */}
        <div className="relative z-10 max-w-2xl my-auto">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mb-4 text-[10.5px] sm:text-xs uppercase tracking-[0.45em] text-champagne font-medium"
          >
            EXTRAORDINARY ART, TIMELESS BEAUTY.
          </motion.p>

          {/* Main Display Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            className="font-cinzel text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.06em] text-ivory leading-[1.08] mb-6 drop-shadow-md"
          >
            ART BEYOND<br />
            THE ORDINARY
          </motion.h2>

          {/* Paragraph Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className="text-sm sm:text-base text-ivory/80 max-w-lg font-sans font-light leading-relaxed mb-9"
          >
            Discover a curated collection of exceptional artworks and sculptures
            from around the world.
          </motion.p>

          {/* Primary CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
            className="flex items-center gap-6"
          >
            <button
              data-testid="hero-enter-collection-btn"
              onClick={() => scrollToId("collection")}
              className="group relative inline-flex items-center gap-4 border border-ivory/40 hover:border-champagne bg-ink/30 hover:bg-champagne/15 px-8 py-3.5 text-[10.5px] uppercase tracking-[0.32em] text-ivory transition-all duration-300 backdrop-blur-sm"
            >
              <span>EXPLORE COLLECTION</span>
              <ArrowRight className="h-3.5 w-3.5 text-champagne transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>
          </motion.div>
        </div>

        {/* Bottom Center Indicator: Mouse / Chevron */}
        <div className="relative z-10 flex justify-center pt-8">
          <motion.button
            onClick={() => scrollToId("collection")}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="group flex flex-col items-center gap-2 p-2 text-ivory/50 transition-colors hover:text-champagne focus:outline-none"
            aria-label="Scroll down to collection"
          >
            <div className="flex h-8 w-5 items-start justify-center rounded-full border border-ivory/30 p-1 group-hover:border-champagne transition-colors">
              <motion.div
                className="h-1.5 w-1 rounded-full bg-champagne"
                animate={{ y: [0, 8, 0], opacity: [1, 0.4, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.8,
                  ease: "easeInOut",
                }}
              />
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-ivory/40 group-hover:text-champagne transition-colors" />
          </motion.button>
        </div>
      </section>
    </div>
  );
};
