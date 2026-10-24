import React, { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { useInView, usePrefersReducedMotion } from '../hooks/useInView';
import {
  ArabesqueDivider,
  CrescentMedallion,
  GirihLatticePattern,
  SoftRadialGlow,
  CornerArabesque,
  EiffelEmblem
} from './GeometricPattern';
import { INVITATION_CONFIG } from '../invitationConfig';

/**
 * HouseShowcaseSection - Dedicated Showcase Section for "Eiffel Home"
 *
 * Requirements:
 * - Heading: "Where New Memories Begin"
 * - Large title: "Eiffel Home"
 * - Premium visual composition representing the new home
 * - Easily replaceable house image via `imageSrc` prop
 * - Elegant placeholder architectural vector composition when no image is provided
 * - Islamic arch framing
 * - Soft cream background card
 * - Decorative geometric pattern watermark
 * - Small champagne accent lines
 * - Short text:
 *     "Every home begins with a dream.
 *      Every memory begins with a place.
 *      Welcome to ours."
 * - Subtle parallax movement to the house image on scroll
 * - Viewport entrance:
 *     * Image gently scales from 0.96 to 1
 *     * Text slides upward with staggered delay
 *     * Decorative elements reveal slowly
 * - Respects prefers-reduced-motion
 */
export const HouseShowcaseSection = ({
  imageSrc = null,
  imageAlt = "Eiffel Home Architectural Residence",
  residenceName = INVITATION_CONFIG.residenceName
}) => {
  const [sectionRef, inView] = useInView({ threshold: 0.15, triggerOnce: true });
  const prefersReducedMotion = usePrefersReducedMotion();
  const [parallaxY, setParallaxY] = useState(0);
  const showcaseCardRef = useRef(null);

  // Subtle parallax scroll effect on the architectural image layer
  useEffect(() => {
    if (prefersReducedMotion) return;

    let rafId;
    const handleScroll = () => {
      if (!showcaseCardRef.current) return;
      const rect = showcaseCardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only calculate when card is within or near viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Distance from the center of the screen
        const centerOffset = rect.top + rect.height / 2 - windowHeight / 2;
        // Subtle translation coefficient (-16px to +16px max)
        const computedY = Math.max(-20, Math.min(20, -centerOffset * 0.05));
        setParallaxY(computedY);
      }
    };

    const onScrollThrottled = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScrollThrottled, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', onScrollThrottled);
      cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  // Entrance animation trigger
  const isRevealed = inView || prefersReducedMotion;

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="relative py-24 sm:py-32 md:py-40 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#041913] via-[#06241c] to-[#041913] overflow-hidden"
      aria-label="Eiffel Home Showcase"
    >
      {/* 1. Background Subtle Parallax Geometric Girih Lattice */}
      <GirihLatticePattern opacity={0.04} animated={true} />

      {/* 2. Soft Atmospheric Radial Glow Behind Showcase */}
      <SoftRadialGlow
        size="w-[700px] h-[700px]"
        className="top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-65"
        color="champagne"
      />
      <SoftRadialGlow
        size="w-[600px] h-[600px]"
        className="bottom-10 -right-20 opacity-35"
        color="emerald"
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* =========================================================
            SECTION HEADER AREA
            - Heading: "Where New Memories Begin"
            - Large Title: "Eiffel Home"
            - Staggered Upward Entrance Animation
           ========================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Subtle Islamic Inscription Badge */}
          <div
            className={`transition-all duration-700 ease-out transform ${
              isRevealed
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#072c21]/80 border border-[#d4b274]/30 text-[#d4b274] shadow-md mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4b274] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.26em] font-medium text-[#fcecd2]">
                The Sanctuary & Residence
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4b274] animate-pulse" />
            </div>
          </div>

          {/* Heading: "Where New Memories Begin" */}
          <h3
            className={`font-serif-luxury italic text-lg sm:text-2xl md:text-3xl text-[#d4b274] font-normal tracking-wide transition-all duration-700 delay-150 ease-out transform ${
              isRevealed
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
          >
            Where New Memories Begin
          </h3>

          {/* Large Title: "Eiffel Home" */}
          <h2
            className={`font-display-regal text-3xl sm:text-5xl md:text-7xl font-bold tracking-[0.1em] sm:tracking-[0.14em] text-[#fcecd2] mt-2 mb-4 drop-shadow-[0_4px_24px_rgba(212,178,116,0.22)] transition-all duration-800 delay-300 ease-out transform ${
              isRevealed
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            {residenceName}
          </h2>

          {/* Self-drawing Arabesque Divider */}
          <div
            className={`transition-all duration-1000 delay-450 ease-out ${
              isRevealed ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <ArabesqueDivider className="my-4" width="max-w-xs sm:max-w-md" />
          </div>
        </div>

        {/* =========================================================
            CINEMATIC ARCHITECTURAL SHOWCASE CARD
            - Islamic arch framing
            - Soft cream background card
            - Decorative geometric pattern
            - Small champagne accent lines
            - Gently scales from 0.96 to 1 on scroll
           ========================================================= */}
        <div
          ref={showcaseCardRef}
          className={`relative transition-all duration-1000 ease-out transform ${
            isRevealed
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-[0.96] translate-y-8'
          }`}
        >
          {/* Outer Arch Glow & Border Halo */}
          <div className="relative p-1 sm:p-2 rounded-t-[84px] sm:rounded-t-[160px] md:rounded-t-[220px] rounded-b-[28px] sm:rounded-b-[40px] bg-gradient-to-b from-[#d4b274]/40 via-[#d4b274]/15 to-[#d4b274]/30 shadow-[0_30px_100px_rgba(0,0,0,0.7)]">
            
            {/* Outer Concentric Hairline Guide */}
            <div className="absolute inset-1.5 sm:inset-3 rounded-t-[78px] sm:rounded-t-[154px] md:rounded-t-[214px] rounded-b-[24px] sm:rounded-b-[36px] border border-[#d4b274]/30 pointer-events-none" />

            {/* Arch Apex Keystone Medallion */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
              <div className="p-1.5 rounded-full bg-[#052019] border border-[#d4b274]/60 shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
                <CrescentMedallion size={28} />
              </div>
            </div>

            {/* =========================================================
                SOFT CREAM BACKGROUND CONTAINER
                Luxury warm ivory / cream foundation with subtle texture
               ========================================================= */}
            <div className="luxury-card-ivory relative overflow-hidden rounded-t-[76px] sm:rounded-t-[152px] md:rounded-t-[212px] rounded-b-[24px] sm:rounded-b-[34px] bg-[#faf6ef] text-[#172420] shadow-inner">
              
              {/* Subtle Cream Card Texture & Subtle Gold Geometric Watermark */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20 select-none"
                style={{
                  backgroundImage: `radial-gradient(rgba(174, 139, 71, 0.25) 1px, transparent 1px), radial-gradient(rgba(14, 61, 50, 0.08) 1px, #faf6ef 1px)`,
                  backgroundSize: '24px 24px',
                  backgroundPosition: '0 0, 12px 12px'
                }}
                aria-hidden="true"
              />

              {/* Vector Star Pattern Overlay on Cream Background */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.045]" aria-hidden="true">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="cream-showcase-girih" width="60" height="60" patternUnits="userSpaceOnUse">
                      <polygon points="30,18 33,26 42,30 33,34 30,42 27,34 18,30 27,26" stroke="#9e7d43" strokeWidth="0.8" fill="none" />
                      <line x1="30" y1="0" x2="30" y2="18" stroke="#9e7d43" strokeWidth="0.5" />
                      <line x1="30" y1="42" x2="30" y2="60" stroke="#9e7d43" strokeWidth="0.5" />
                      <line x1="0" y1="30" x2="18" y2="30" stroke="#9e7d43" strokeWidth="0.5" />
                      <line x1="42" y1="30" x2="60" y2="30" stroke="#9e7d43" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#cream-showcase-girih)" />
                </svg>
              </div>

              {/* Corner Arabesque Framing on the Cream Card */}
              <CornerArabesque className="opacity-60" />

              {/* Top Accent Champagne Bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-[#d4b274] to-transparent opacity-60" />

              {/* =====================================================
                  MAIN ARCHITECTURAL IMAGE / COMPOSITION FRAME
                  With subtle parallax movement & Islamic arch window
                 ===================================================== */}
              <div className="p-4 sm:p-7 md:p-10">
                <div className="relative overflow-hidden rounded-t-[68px] sm:rounded-t-[132px] md:rounded-t-[170px] rounded-b-2xl border border-[#d4b274]/40 bg-[#062018] shadow-2xl">
                  
                  {/* Subtle Inner Arch Framing Hairline */}
                  <div className="absolute inset-2 sm:inset-3 rounded-t-[62px] sm:rounded-t-[124px] md:rounded-t-[162px] rounded-b-xl border border-[#d4b274]/25 z-20 pointer-events-none" />

                  {/* Corner Accent Brackets on Image Window */}
                  <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#fcecd2]/40 z-20 pointer-events-none rounded-tl" />
                  <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[#fcecd2]/40 z-20 pointer-events-none rounded-tr" />

                  {/* The Parallax Movement Layer */}
                  <div
                    className="relative w-full h-[260px] sm:h-[400px] md:h-[540px] overflow-hidden will-change-transform"
                    style={{
                      transform: prefersReducedMotion ? 'none' : `translateY(${parallaxY}px)`,
                      transition: prefersReducedMotion ? 'none' : 'transform 0.15s ease-out'
                    }}
                  >
                    {imageSrc ? (
                      /* USER / DEVELOPER CUSTOM IMAGE (Easy replacement) */
                      <div className="relative w-full h-full">
                        <img
                          src={imageSrc}
                          alt={imageAlt}
                          className="w-full h-full object-cover object-center scale-105"
                          loading="lazy"
                        />
                        {/* Soft atmospheric gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#041913]/80 via-transparent to-[#041913]/30 pointer-events-none" />
                      </div>
                    ) : (
                      /* PREMIUM PLACEHOLDER ARCHITECTURAL COMPOSITION
                         Crafted with modern Kerala-Islamic architectural elements:
                         - Towering Moorish entrance portal with ambient warm backlight
                         - Teakwood vertical louvers
                         - Modern geometric Islamic mashrabiya/jali screens
                         - Clean cantilevered rooflines with warm champagne soffit lighting
                         - Silhouetted Malabar tropical greenery
                         - Solid brass entrance nameplate engraved with "EIFFEL HOME"
                      */
                      <div className="relative w-full h-full bg-gradient-to-b from-[#092b21] via-[#061e16] to-[#03130d] select-none flex items-center justify-center">
                        
                        {/* Night Sky / Atmospheric Radial Light */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(212,178,116,0.18)_0%,transparent_70%)]" />

                        {/* Architectural Vector Illustration */}
                        <svg
                          viewBox="0 0 1000 700"
                          className="w-full h-full object-cover opacity-95"
                          preserveAspectRatio="xMidYMid slice"
                          xmlns="http://www.w3.org/2000/svg"
                          role="img"
                          aria-label="Architectural visual of Eiffel Home"
                        >
                          <defs>
                            {/* Warm Golden Glow Grad for Portal */}
                            <linearGradient id="portalGlow" x1="50%" y1="0%" x2="50%" y2="100%">
                              <stop offset="0%" stopColor="#fcecd2" stopOpacity="0.9" />
                              <stop offset="45%" stopColor="#d4b274" stopOpacity="0.7" />
                              <stop offset="100%" stopColor="#9e7d43" stopOpacity="0.4" />
                            </linearGradient>

                            {/* Interior Illumination Warmth */}
                            <radialGradient id="interiorWarmth" cx="50%" cy="55%" r="45%">
                              <stop offset="0%" stopColor="#fff2dc" stopOpacity="0.8" />
                              <stop offset="40%" stopColor="#e5cb9b" stopOpacity="0.45" />
                              <stop offset="85%" stopColor="#082b20" stopOpacity="0.9" />
                              <stop offset="100%" stopColor="#041712" stopOpacity="1" />
                            </radialGradient>

                            {/* Kerala Teak Louver Gradient */}
                            <linearGradient id="teakGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#5c381c" />
                              <stop offset="50%" stopColor="#805128" />
                              <stop offset="100%" stopColor="#482b15" />
                            </linearGradient>

                            {/* Soft Shadow Filter */}
                            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                              <feGaussianBlur stdDeviation="8" result="blur" />
                              <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                          </defs>

                          {/* 1. Backdrop Stars / Ambient Sparkles in Twilight */}
                          <g opacity="0.4">
                            <circle cx="150" cy="80" r="1.5" fill="#fcecd2" />
                            <circle cx="280" cy="120" r="1" fill="#fcecd2" />
                            <circle cx="820" cy="90" r="1.5" fill="#fcecd2" />
                            <circle cx="720" cy="140" r="1" fill="#fcecd2" />
                            <circle cx="490" cy="50" r="2" fill="#d4b274" opacity="0.8" />
                            <circle cx="620" cy="95" r="1" fill="#fcecd2" />
                          </g>

                          {/* 2. Main Villa Structural Mass (Modern Architecture) */}
                          {/* Left Wing */}
                          <rect x="180" y="240" width="220" height="340" fill="#07241c" stroke="#d4b274" strokeWidth="0.8" opacity="0.95" />
                          {/* Right Wing */}
                          <rect x="600" y="240" width="220" height="340" fill="#07241c" stroke="#d4b274" strokeWidth="0.8" opacity="0.95" />

                          {/* Cantilevered Floating Roof Canopy */}
                          <polygon points="120,240 880,240 850,225 150,225" fill="#0d3d30" stroke="#d4b274" strokeWidth="1" />
                          {/* Warm Recessed Soffit Downlight Strip */}
                          <line x1="160" y1="240" x2="840" y2="240" stroke="#fcecd2" strokeWidth="3" filter="url(#softGlow)" opacity="0.8" />

                          {/* 3. Central Grand Moorish Arch Entrance Portal */}
                          {/* Portal Outer Frame */}
                          <path
                            d="M 370 580 V 310 C 370 230, 440 180, 500 150 C 560 180, 630 230, 630 310 V 580 Z"
                            fill="#041b14"
                            stroke="#d4b274"
                            strokeWidth="2.5"
                          />
                          {/* Concentric Inner Arch Inset */}
                          <path
                            d="M 388 580 V 320 C 388 250, 448 200, 500 172 C 552 200, 612 250, 612 320 V 580 Z"
                            fill="url(#interiorWarmth)"
                            stroke="#fcecd2"
                            strokeWidth="1.2"
                            opacity="0.9"
                          />

                          {/* Islamic Geometric Jali Transom over Arch Portal */}
                          <g opacity="0.35" stroke="#d4b274" strokeWidth="0.8">
                            <line x1="430" y1="240" x2="570" y2="240" />
                            <line x1="440" y1="270" x2="560" y2="270" />
                            <line x1="450" y1="215" x2="550" y2="215" />
                            <polygon points="500,210 515,230 535,230 520,245 525,265 500,250 475,265 480,245 465,230 485,230" fill="none" />
                          </g>

                          {/* Warm Double Door Entrance in Teak Wood with Brass Accents */}
                          <rect x="440" y="380" width="58" height="200" fill="url(#teakGrad)" stroke="#d4b274" strokeWidth="1" />
                          <rect x="502" y="380" width="58" height="200" fill="url(#teakGrad)" stroke="#d4b274" strokeWidth="1" />
                          {/* Vertical brass handle bars */}
                          <line x1="492" y1="450" x2="492" y2="510" stroke="#fcecd2" strokeWidth="2.5" strokeLinecap="round" />
                          <line x1="508" y1="450" x2="508" y2="510" stroke="#fcecd2" strokeWidth="2.5" strokeLinecap="round" />

                          {/* 4. Architectural Teak Louvers & Large Glass Windows */}
                          {/* Left Wing Windows with Warm Interior Glow */}
                          <rect x="210" y="280" width="160" height="110" fill="#fff5e6" opacity="0.12" stroke="#d4b274" strokeWidth="0.8" />
                          <g stroke="#805128" strokeWidth="3" opacity="0.85">
                            <line x1="230" y1="280" x2="230" y2="390" />
                            <line x1="250" y1="280" x2="250" y2="390" />
                            <line x1="270" y1="280" x2="270" y2="390" />
                            <line x1="290" y1="280" x2="290" y2="390" />
                            <line x1="310" y1="280" x2="310" y2="390" />
                            <line x1="330" y1="280" x2="330" y2="390" />
                            <line x1="350" y1="280" x2="350" y2="390" />
                          </g>

                          {/* Right Wing Mashrabiya Balcony Screen */}
                          <rect x="630" y="280" width="160" height="110" fill="#041b14" stroke="#d4b274" strokeWidth="0.8" />
                          <g stroke="#d4b274" strokeWidth="0.75" opacity="0.5">
                            <line x1="640" y1="280" x2="780" y2="390" />
                            <line x1="640" y1="390" x2="780" y2="280" />
                            <line x1="680" y1="280" x2="780" y2="360" />
                            <line x1="640" y1="360" x2="740" y2="280" />
                            <line x1="640" y1="310" x2="740" y2="390" />
                            <line x1="680" y1="390" x2="780" y2="310" />
                          </g>

                          {/* 5. Plinth, Paved Threshold & Steps */}
                          <polygon points="80,640 920,640 870,580 130,580" fill="#061c14" stroke="#d4b274" strokeWidth="0.6" />
                          <line x1="260" y1="600" x2="740" y2="600" stroke="#d4b274" strokeWidth="0.6" opacity="0.6" />
                          <line x1="220" y1="620" x2="780" y2="620" stroke="#d4b274" strokeWidth="0.6" opacity="0.6" />

                          {/* 6. Solid Brass Residence Nameplate "EIFFEL HOME" at Threshold */}
                          <g transform="translate(420, 520)">
                            {/* Plate Shadow & Bevel */}
                            <rect x="0" y="0" width="160" height="34" rx="4" fill="#1b1208" stroke="#9e7d43" strokeWidth="0.5" />
                            <rect x="2" y="2" width="156" height="30" rx="3" fill="#d4b274" opacity="0.9" />
                            <rect x="4" y="4" width="152" height="26" rx="2" fill="#1b1208" />
                            {/* Plate Engraved Text */}
                            <text
                              x="80"
                              y="21"
                              fontFamily="Cinzel, Georgia, serif"
                              fontSize="12"
                              fontWeight="bold"
                              letterSpacing="3"
                              fill="#fcecd2"
                              textAnchor="middle"
                            >
                              {residenceName}
                            </text>
                            {/* Subtle brass screw heads */}
                            <circle cx="8" cy="17" r="1.5" fill="#d4b274" />
                            <circle cx="152" cy="17" r="1.5" fill="#d4b274" />
                          </g>

                          {/* 7. Foreground Silhouetted Kerala Tropical Foliage */}
                          {/* Left Tropical Palm Fronds */}
                          <path
                            d="M 50 700 Q 110 520, 200 480 Q 140 560, 110 700 Z"
                            fill="#020e0a"
                            opacity="0.9"
                          />
                          <path
                            d="M 10 700 Q 80 460, 180 430 Q 100 530, 60 700 Z"
                            fill="#031610"
                            opacity="0.95"
                          />
                          <path
                            d="M 80 700 Q 150 560, 260 520 Q 190 600, 150 700 Z"
                            fill="#041d15"
                            opacity="0.75"
                          />

                          {/* Right Tropical Monstera & Fronds */}
                          <path
                            d="M 950 700 Q 890 520, 800 480 Q 860 560, 890 700 Z"
                            fill="#020e0a"
                            opacity="0.9"
                          />
                          <path
                            d="M 990 700 Q 920 460, 820 430 Q 900 530, 940 700 Z"
                            fill="#031610"
                            opacity="0.95"
                          />
                          <path
                            d="M 920 700 Q 850 560, 740 520 Q 810 600, 850 700 Z"
                            fill="#041d15"
                            opacity="0.75"
                          />

                          {/* Soft Bottom Fog / Vignette Gradient */}
                          <rect x="0" y="580" width="1000" height="120" fill="url(#bottomMist)" opacity="0.8" />
                          <defs>
                            <linearGradient id="bottomMist" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#041913" stopOpacity="0" />
                              <stop offset="100%" stopColor="#041913" stopOpacity="0.9" />
                            </linearGradient>
                          </defs>
                        </svg>

                        {/* Architectural Placeholder Badge */}
                        <div className="absolute top-4 right-4 z-20">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#041913]/85 border border-[#d4b274]/35 text-[10px] uppercase tracking-[0.18em] text-[#d4b274] backdrop-blur-md">
                            <Sparkles className="w-3 h-3 text-[#d4b274]" />
                            <span>Architectural Conception</span>
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* =====================================================
                    THE SHORT POETIC TEXT
                    "Every home begins with a dream.
                     Every memory begins with a place.
                     Welcome to ours."
                    - Slides upward on scroll entrance
                   ===================================================== */}
                <div
                  className={`mt-8 sm:mt-12 text-center transition-all duration-800 delay-500 ease-out transform ${
                    isRevealed
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-6'
                  }`}
                >
                  {/* Decorative Islamic Star Divider Above Text */}
                  <div className="flex items-center justify-center gap-3 max-w-xs mx-auto mb-5 sm:mb-6">
                    <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#9e7d43]/40 to-[#9e7d43]" />
                    <EiffelEmblem size={24} />
                    <span className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#9e7d43]/40 to-[#9e7d43]" />
                  </div>

                  {/* The exact 3 poetic lines requested by the user */}
                  <div className="space-y-1 sm:space-y-2 max-w-xl mx-auto px-4">
                    <p className="font-serif-luxury italic text-lg sm:text-2xl md:text-3xl text-[#182a23] font-normal leading-relaxed tracking-wide">
                      “Every home begins with a dream.
                    </p>
                    <p className="font-serif-luxury italic text-lg sm:text-2xl md:text-3xl text-[#182a23] font-normal leading-relaxed tracking-wide">
                      Every memory begins with a place.
                    </p>
                    <p className="font-display-regal text-xl sm:text-3xl md:text-4xl text-[#9e7d43] font-bold tracking-[0.08em] pt-2">
                      Welcome to ours.”
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Champagne Accent Glow Line */}
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#d4b274]/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
