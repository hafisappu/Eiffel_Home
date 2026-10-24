import React from 'react';
import { useInView, usePrefersReducedMotion } from '../hooks/useInView';

/**
 * 1. ISLAMIC GEOMETRIC PATTERN
 * Fine hairline 8-point Girih lattice in scalable vector SVG.
 * Supports slow continuous parallax drift, respecting prefers-reduced-motion.
 */
export const GirihLatticePattern = ({
  opacity = 0.05,
  animated = true,
  className = ""
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldAnimate = animated && !prefersReducedMotion;

  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <div className={`w-[120%] h-[120%] -top-[10%] -left-[10%] absolute ${shouldAnimate ? 'anim-pattern-drift' : ''}`}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="girih-star-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
              {/* Central 8-pointed star */}
              <polygon
                points="40,24 44,35 56,40 44,45 40,56 36,45 24,40 36,35"
                stroke="#d4b274"
                strokeWidth="0.7"
                fill="none"
              />
              {/* Corner 8-pointed star segments */}
              <polygon points="0,0 6,10 16,16 6,22 0,32 0,0" stroke="#d4b274" strokeWidth="0.5" fill="none" />
              <polygon points="80,0 74,10 64,16 74,22 80,32 80,0" stroke="#d4b274" strokeWidth="0.5" fill="none" />
              <polygon points="0,80 6,70 16,64 6,58 0,48 0,80" stroke="#d4b274" strokeWidth="0.5" fill="none" />
              <polygon points="80,80 74,70 64,64 74,58 80,48 80,80" stroke="#d4b274" strokeWidth="0.5" fill="none" />
              
              {/* Symmetrical connecting geometric lines */}
              <line x1="40" y1="0" x2="40" y2="24" stroke="#d4b274" strokeWidth="0.4" />
              <line x1="40" y1="56" x2="40" y2="80" stroke="#d4b274" strokeWidth="0.4" />
              <line x1="0" y1="40" x2="24" y2="40" stroke="#d4b274" strokeWidth="0.4" />
              <line x1="56" y1="40" x2="80" y2="40" stroke="#d4b274" strokeWidth="0.4" />
              <line x1="16" y1="16" x2="36" y2="35" stroke="#d4b274" strokeWidth="0.4" />
              <line x1="64" y1="16" x2="44" y2="35" stroke="#d4b274" strokeWidth="0.4" />
              <line x1="16" y1="64" x2="36" y2="45" stroke="#d4b274" strokeWidth="0.4" />
              <line x1="64" y1="64" x2="44" y2="45" stroke="#d4b274" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#girih-star-pattern)" />
        </svg>
      </div>
    </div>
  );
};

/**
 * 2. SOFT RADIAL LIGHT EFFECTS
 * Reusable ambient atmospheric glow giving subtle depth and luxury without visual noise.
 */
export const SoftRadialGlow = ({
  color = "champagne", // "champagne" | "emerald"
  size = "w-[500px] h-[500px]",
  className = ""
}) => {
  const isEmerald = color === "emerald";

  return (
    <div
      className={`absolute pointer-events-none select-none rounded-full blur-3xl anim-soft-glow z-0 ${size} ${className}`}
      style={{
        background: isEmerald
          ? 'radial-gradient(circle, rgba(14, 61, 50, 0.45) 0%, rgba(4, 25, 19, 0) 70%)'
          : 'radial-gradient(circle, rgba(212, 178, 116, 0.12) 0%, rgba(8, 45, 36, 0.3) 45%, rgba(4, 25, 19, 0) 75%)'
      }}
      aria-hidden="true"
    />
  );
};

/**
 * 3. SMALL CRESCENT-INSPIRED DECORATIVE SHAPES
 * Minimal, delicate architectural emblem. A clean geometric crescent cradling a subtle 8-pointed star.
 */
export const CrescentMedallion = ({ size = 28, className = "" }) => (
  <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Outer subtle guide ring */}
      <circle cx="20" cy="20" r="18" stroke="#d4b274" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4" />
      {/* Delicate geometric crescent moon */}
      <path
        d="M20 7C24.5 7 28 10.5 28 15C28 19.5 24.5 23 20 23C16.5 23 13.5 20.8 12.3 17.7C12.1 17.2 12.6 16.7 13.1 16.9C15.2 17.8 17.5 17.6 19.3 16.3C21.1 15 22.2 12.9 22.1 10.7C22 10.1 22.6 9.6 23.1 9.8C22.1 8 20.2 7 20 7Z"
        fill="url(#gold-crescent-grad)"
        opacity="0.9"
      />
      {/* Center 8-pointed star */}
      <polygon
        points="20,16 21.5,18.5 24,19 22,21 22.5,23.5 20,22 17.5,23.5 18,21 16,19 18.5,18.5"
        fill="#fcecd2"
      />
      <defs>
        <linearGradient id="gold-crescent-grad" x1="12" y1="7" x2="28" y2="23" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fcecd2" />
          <stop offset="0.5" stopColor="#d4b274" />
          <stop offset="1" stopColor="#9e7d43" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

/**
 * 4. SUBTLE ARABESQUE LINE DECORATIONS (Self-Drawing when entering viewport)
 * Elegant symmetrical hairline divider with center 8-pointed star and arabesque curls.
 */
export const ArabesqueDivider = ({
  className = "my-6",
  width = "max-w-md"
}) => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const prefersReducedMotion = usePrefersReducedMotion();
  const isDrawn = inView || prefersReducedMotion;

  return (
    <div ref={ref} className={`flex items-center justify-center gap-3 w-full mx-auto ${width} ${className}`}>
      {/* Left self-drawing arabesque wing */}
      <svg className="flex-1 h-3 overflow-visible" preserveAspectRatio="none" viewBox="0 0 160 12" fill="none">
        <path
          d="M0,6 C40,6 70,6 110,6 C125,6 135,1 145,1 C152,1 156,5 160,6"
          stroke="url(#line-gold-left)"
          strokeWidth="0.8"
          strokeLinecap="round"
          className={`svg-draw-path ${isDrawn ? 'is-drawn' : ''}`}
        />
        <defs>
          <linearGradient id="line-gold-left" x1="0" y1="0" x2="160" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#d4b274" stopOpacity="0" />
            <stop offset="0.7" stopColor="#d4b274" stopOpacity="0.5" />
            <stop offset="1" stopColor="#fcecd2" stopOpacity="0.9" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center 8-pointed geometric star medallion */}
      <div className="relative flex items-center justify-center shrink-0 px-1">
        <svg className="w-5 h-5 text-[#d4b274]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L14.5 7.5L20 5L17.5 10.5L23 13L17.5 15.5L20 21L14.5 18.5L12 24L9.5 18.5L4 21L6.5 15.5L1 13L6.5 10.5L4 5L9.5 7.5L12 2Z" opacity="0.9" />
        </svg>
        <div className="absolute w-1.5 h-1.5 rounded-full bg-[#faf7f2] shadow-[0_0_6px_#d4b274]" />
      </div>

      {/* Right self-drawing arabesque wing */}
      <svg className="flex-1 h-3 overflow-visible" preserveAspectRatio="none" viewBox="0 0 160 12" fill="none">
        <path
          d="M160,6 C120,6 90,6 50,6 C35,6 25,1 15,1 C8,1 4,5 0,6"
          stroke="url(#line-gold-right)"
          strokeWidth="0.8"
          strokeLinecap="round"
          className={`svg-draw-path ${isDrawn ? 'is-drawn' : ''}`}
        />
        <defs>
          <linearGradient id="line-gold-right" x1="0" y1="0" x2="160" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fcecd2" stopOpacity="0.9" />
            <stop offset="0.3" stopColor="#d4b274" stopOpacity="0.5" />
            <stop offset="1" stopColor="#d4b274" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// Aliased for backwards compatibility
export const GoldDivider = ArabesqueDivider;

/**
 * 5. ELEGANT ARCH FRAMES (Fades and scales gently on viewport entry)
 * Reusable Moorish / parabolic modern Islamic arch wrapper.
 */
export const ModernArchWrapper = ({
  children,
  className = "",
  innerClassName = "p-6 sm:p-12"
}) => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldAnimate = inView && !prefersReducedMotion;

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-t-[120px] md:rounded-t-[170px] rounded-b-3xl border border-[#d4b274]/25 p-0.5 bg-gradient-to-b from-[#d4b274]/35 via-[#d4b274]/10 to-transparent shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-all duration-1000 ${
        shouldAnimate ? 'opacity-100 scale-100 translate-y-0' : inView ? 'opacity-100' : 'opacity-0 scale-[0.97] translate-y-4'
      } ${className}`}
    >
      <div className={`w-full h-full rounded-t-[118px] md:rounded-t-[168px] rounded-b-[22px] bg-[#07261d]/90 backdrop-blur-md overflow-hidden relative ${innerClassName}`}>
        {/* Subtle inner concentric arch line */}
        <div className="absolute inset-2 sm:inset-3 rounded-t-[112px] md:rounded-t-[162px] rounded-b-[18px] border border-[#d4b274]/15 pointer-events-none" />
        
        {/* Arch Apex Keystone Ornament */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
          <CrescentMedallion size={24} />
        </div>

        {children}
      </div>
    </div>
  );
};

/**
 * 6. SECTION HEADER DECORATOR
 * Uniform, refined header layout for all sections.
 */
export const SectionHeader = ({
  tag = "",
  title = "",
  subtitle = "",
  arabic = "",
  className = "mb-14"
}) => {
  return (
    <div className={`text-center max-w-2xl mx-auto relative ${className}`}>
      {/* Background soft ambient glow */}
      <SoftRadialGlow size="w-[380px] h-[380px]" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-75" />

      {/* Arabic Badge / Micro Inscription if provided */}
      {arabic && (
        <div className="font-arabic-calligraphy text-xl sm:text-2xl text-[#fcecd2] mb-1.5 drop-shadow-[0_2px_10px_rgba(212,178,116,0.2)]" dir="rtl">
          {arabic}
        </div>
      )}

      {/* Eyebrow Tag */}
      {tag && (
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4b274]" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.26em] text-[#d4b274] font-medium">
            {tag}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4b274]" />
        </div>
      )}

      {/* Title */}
      <h2 className="font-display-regal text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.1em] text-[#fcecd2]">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="font-serif-luxury italic text-base sm:text-xl text-[#d4b274]/90 mt-2 font-normal">
          {subtitle}
        </p>
      )}

      {/* Symmetrical Arabesque self-drawing divider */}
      <ArabesqueDivider className="my-5" />
    </div>
  );
};

/**
 * 7. CORNER ARABESQUE FRAME BRACKETS
 * Hairline decorative corners for luxury card borders.
 */
export const CornerArabesque = ({ className = "" }) => (
  <div className={`absolute pointer-events-none select-none inset-0 ${className}`} aria-hidden="true">
    {/* Top-Left */}
    <svg className="absolute top-2 left-2 w-4 h-4 text-[#d4b274]/40" viewBox="0 0 20 20" fill="none">
      <path d="M1,19 V5 C1,2.8 2.8,1 5,1 H19" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="5" cy="5" r="1.5" fill="currentColor" />
    </svg>
    {/* Top-Right */}
    <svg className="absolute top-2 right-2 w-4 h-4 text-[#d4b274]/40" viewBox="0 0 20 20" fill="none">
      <path d="M19,19 V5 C19,2.8 17.2,1 15,1 H1" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="15" cy="5" r="1.5" fill="currentColor" />
    </svg>
    {/* Bottom-Left */}
    <svg className="absolute bottom-2 left-2 w-4 h-4 text-[#d4b274]/40" viewBox="0 0 20 20" fill="none">
      <path d="M1,1 V15 C1,17.2 2.8,19 5,19 H19" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="5" cy="15" r="1.5" fill="currentColor" />
    </svg>
    {/* Bottom-Right */}
    <svg className="absolute bottom-2 right-2 w-4 h-4 text-[#d4b274]/40" viewBox="0 0 20 20" fill="none">
      <path d="M19,1 V15 C19,17.2 17.2,19 15,19 H1" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="15" cy="15" r="1.5" fill="currentColor" />
    </svg>
  </div>
);

/**
 * 8. EIFFEL ROYAL EMBLEM
 * Architectural spire and modern Islamic arch silhouette with small crescent.
 */
export const EiffelEmblem = ({ size = 64, className = "" }) => (
  <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_15px_rgba(212,178,116,0.3)]">
      <circle cx="50" cy="50" r="46" stroke="#d4b274" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.4" />
      <circle cx="50" cy="50" r="42" stroke="#d4b274" strokeWidth="0.5" opacity="0.3" />
      <path d="M26 80V52C26 38 36 28 50 20C64 28 74 38 74 52V80" stroke="#d4b274" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M32 80V54C32 42 40 34 50 28C60 34 68 42 68 54V80" stroke="#fcecd2" strokeWidth="1" opacity="0.6" />
      <line x1="50" y1="14" x2="50" y2="38" stroke="#d4b274" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="42" y1="62" x2="58" y2="62" stroke="#d4b274" strokeWidth="1" opacity="0.8" />
      <line x1="40" y1="72" x2="60" y2="72" stroke="#d4b274" strokeWidth="1" opacity="0.8" />
      <path d="M44 80L50 64L56 80" stroke="#d4b274" strokeWidth="1" opacity="0.7" />
      <path d="M50 14C53 14 55.5 12 56 9C54 9.5 51.5 9 50 7C48.5 9 46 9.5 44 9C44.5 12 47 14 50 14Z" fill="#fcecd2" />
      <circle cx="50" cy="6" r="1.5" fill="#d4b274" />
    </svg>
  </div>
);

/**
 * 9. BISMILLAH CALLIGRAPHY & MASHAALLAH BADGE
 */
export const BismillahCalligraphy = ({ className = "w-64 max-w-full" }) => (
  <div className={`mx-auto text-center ${className}`}>
    <div className="font-arabic-calligraphy text-2xl md:text-3xl lg:text-4xl gold-gradient-text tracking-wide leading-relaxed py-1" dir="rtl">
      بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
    </div>
    <div className="text-[10px] md:text-xs font-light tracking-[0.25em] uppercase text-[#d4b274]/80 mt-1">
      In the name of God, the Most Gracious, the Most Merciful
    </div>
  </div>
);

export const MashaAllahBadge = ({ className = "" }) => (
  <div className={`inline-flex flex-col items-center justify-center px-6 py-2.5 rounded-full emerald-glass gold-card-border ${className}`}>
    <span className="font-arabic-calligraphy text-lg md:text-xl text-[#fcecd2] tracking-wider" dir="rtl">
      مَا شَاءَ اللَّهُ لَا قُوَّةَ إِلَّا بِاللَّهِ
    </span>
    <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4b274]/90 font-medium">
      Barakah & Gratitude
    </span>
  </div>
);

