import React from 'react';
import { Share2, ArrowUp, Heart } from 'lucide-react';
import { useInView, usePrefersReducedMotion } from '../hooks/useInView';
import {
  ArabesqueDivider,
  GirihLatticePattern,
  SoftRadialGlow


} from './GeometricPattern';
import { INVITATION_CONFIG } from '../invitationConfig';

/**
 * CrescentArchMark - Small crescent / arch-inspired decorative mark
 * A delicate signature ending emblem merging a Moorish arch apex with a graceful crescent moon.
 */
const CrescentArchMark = ({ className = "w-8 h-8" }) => (
  <div className={`relative inline-flex items-center justify-center ${className}`} aria-hidden="true">
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_12px_rgba(212,178,116,0.45)]">
      {/* Outer subtle guide arch */}
      <path
        d="M 10 32 V 18 C 10 12, 15 8, 20 5 C 25 8, 30 12, 30 18 V 32"
        stroke="#d4b274"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.45"
      />
      {/* Delicate inner crescent */}
      <path
        d="M20 9C23.5 9 26 11.5 26 15C26 18.5 23.5 21 20 21C17.2 21 15 19.2 14.2 16.8C14 16.4 14.4 16 14.8 16.2C16.4 16.8 18.1 16.6 19.4 15.6C20.8 14.6 21.6 13 21.5 11.3C21.4 10.8 21.9 10.4 22.3 10.6C21.5 9.4 20.2 9 20 9Z"
        fill="url(#crescentArchGrad)"
      />
      {/* Micro 8-pointed star at the base of the arch */}
      <polygon
        points="20,24 21,26 23,26 21.5,27.5 22,29.5 20,28.5 18,29.5 18.5,27.5 17,26 19,26"
        fill="#fcecd2"
        opacity="0.9"
      />
      {/* Arch base hairline */}
      <line x1="14" y1="32" x2="26" y2="32" stroke="#d4b274" strokeWidth="0.8" opacity="0.6" />
      <defs>
        <linearGradient id="crescentArchGrad" x1="14" y1="9" x2="26" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fcecd2" />
          <stop offset="0.6" stopColor="#d4b274" />
          <stop offset="1" stopColor="#9e7d43" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

/**
 * BlessingSection - Final Closing Section for Eiffel Home
 *
 * Requirements:
 * - Peaceful dark emerald background
 * - Content:
 *     * “Alhamdulillah”
 *     * “May this home be filled with
 *        peace, love, faith and countless blessings.”
 *     * Then:
 *       “Eiffel Home”
 *     * “Thank you for being part of our new beginning.”
 *     * Small elegant Arabic-inspired decorative element
 *     * At the bottom:
 *       “With love & gratitude”
 * - Emotional and memorable atmosphere
 * - Animation:
 *     * Background slowly transitions into view
 *     * Decorative pattern fades in
 *     * Text reveals gradually
 *     * Final “Eiffel Home” has a subtle glow/reveal
 * - Ends with a small crescent/arch-inspired decorative mark
 */
export const BlessingSection = ({
  onOpenShare,
  residenceName = INVITATION_CONFIG.residenceName,
  city = INVITATION_CONFIG.city
}) => {
  const [sectionRef, inView] = useInView({ threshold: 0.15, triggerOnce: true });
  const prefersReducedMotion = usePrefersReducedMotion();

  const isRevealed = inView || prefersReducedMotion;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="blessing"
      ref={sectionRef}
      className={`relative pt-24 sm:pt-32 md:pt-40 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#041913] via-[#02140f] to-[#010c09] text-[#f6f1e7] overflow-hidden border-t border-[#d4b274]/20 transition-all duration-1000 ease-out ${
        isRevealed ? 'opacity-100' : 'opacity-90'
      }`}
      aria-label="Closing Gratitude & Blessings"
    >
      {/* =========================================================
          1. DECORATIVE PATTERN FADES IN
          Islamic Girih lattice with smooth fade-in and slow movement
         ========================================================= */}
      <div
        className={`transition-opacity duration-1000 ease-out ${
          isRevealed ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <GirihLatticePattern opacity={0.035} animated={true} />
      </div>

      {/* 2. Soft Ambient Radial Glow Behind Text */}
      <SoftRadialGlow
        size="w-[700px] h-[700px]"
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50"
        color="champagne"
      />
      <SoftRadialGlow
        size="w-[500px] h-[500px]"
        className="bottom-10 left-1/2 -translate-x-1/2 opacity-30"
        color="emerald"
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        
        {/* =========================================================
            LAYER 1: "Alhamdulillah"
            Arabic calligraphy inscription + Roman title
            Reveals with gentle delay
           ========================================================= */}
        <div
          className={`transition-all duration-800 ease-out transform ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Sacred Arabic Calligraphy: الْحَمْدُ لِلَّهِ */}
          <div
            className="font-arabic-calligraphy text-4xl sm:text-5xl md:text-6xl gold-gradient-text tracking-wide leading-relaxed drop-shadow-[0_4px_24px_rgba(212,178,116,0.35)] select-none mb-1"
            dir="rtl"
          >
            الْحَمْدُ لِلَّهِ
          </div>

          {/* Heading: “Alhamdulillah” */}
          <h3 className="font-display-regal text-base sm:text-lg md:text-xl text-[#d4b274] font-medium tracking-[0.24em] uppercase mb-6">
            Alhamdulillah
          </h3>
        </div>

        {/* =========================================================
            LAYER 2: DUA & PRAYER
            “May this home be filled with
             peace, love, faith and countless blessings.”
           ========================================================= */}
        <div
          className={`transition-all duration-800 delay-200 ease-out transform ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="max-w-xl mx-auto mb-8 px-4">
            <p className="font-serif-luxury italic text-xl sm:text-2xl md:text-3xl text-[#f6f1e7]/90 font-normal leading-relaxed tracking-wide">
              “May this home be filled with<br />
              peace, love, faith and countless blessings.”
            </p>
          </div>
        </div>

        {/* =========================================================
            LAYER 3: SMALL ELEGANT ARABIC-INSPIRED DECORATIVE ELEMENT
            Self-drawing arabesque divider with 8-pointed star
           ========================================================= */}
        <div
          className={`transition-all duration-1000 delay-350 ease-out transform ${
            isRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <ArabesqueDivider className="my-8" width="max-w-xs sm:max-w-sm" />
        </div>

        {/* =========================================================
            LAYER 4: "Eiffel Home"
            With subtle glow and regal reveal animation
           ========================================================= */}
        <div
          className={`relative transition-all duration-1000 delay-500 ease-out transform ${
            isRevealed ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-[0.97]'
          }`}
        >
          {/* Radiant Subtle Glow Behind "Eiffel Home" */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-20 bg-gradient-to-r from-transparent via-[#d4b274]/20 to-transparent blur-2xl pointer-events-none transition-opacity duration-1000 delay-700 ${
              isRevealed ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden="true"
          />

          {/* Final "Eiffel Home" Title */}
          <h2 className="relative font-display-regal text-3xl sm:text-5xl md:text-6xl font-bold tracking-[0.16em] uppercase text-[#fcecd2] drop-shadow-[0_0_30px_rgba(212,178,116,0.35)] py-2">
            {residenceName}
          </h2>
        </div>

        {/* =========================================================
            LAYER 5: "Thank you for being part of our new beginning."
           ========================================================= */}
        <div
          className={`transition-all duration-800 delay-650 ease-out transform ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="font-serif-luxury italic text-base sm:text-lg md:text-xl text-[#d4b274] font-normal tracking-wide mt-2 mb-10 max-w-lg mx-auto px-4">
            Thank you for being part of our new beginning.
          </p>
        </div>

        {/* =========================================================
            LAYER 6: "With love & gratitude"
            At the bottom of the emotional message
           ========================================================= */}
        <div
          className={`transition-all duration-800 delay-800 ease-out transform ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-[0.28em] text-[#fcecd2]/80 font-medium mb-5">
            <Heart className="w-3.5 h-3.5 text-[#d4b274] fill-[#d4b274]/30" />
            <span>With love & gratitude</span>
            <Heart className="w-3.5 h-3.5 text-[#d4b274] fill-[#d4b274]/30" />
          </div>
        </div>

        {/* =========================================================
            LAYER 7: SMALL CRESCENT / ARCH-INSPIRED DECORATIVE MARK
            The signature ending emblem
           ========================================================= */}
        <div
          className={`transition-all duration-1000 delay-950 ease-out transform ${
            isRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <div className="inline-flex flex-col items-center justify-center my-3">
            <CrescentArchMark className="w-9 h-9" />
          </div>
        </div>

        {/* =========================================================
            UNOBTRUSIVE UTILITY ACTIONS: SHARE & BACK TO TOP
            Discreetly positioned below the emotional crescendo
           ========================================================= */}
        <div
          className={`pt-10 mt-6 border-t border-[#d4b274]/15 flex flex-wrap items-center justify-center gap-4 transition-all duration-1000 delay-1000 ease-out ${
            isRevealed ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {onOpenShare && (
            <button
              type="button"
              onClick={onOpenShare}
              className="luxury-btn-secondary inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#072d24]/80 hover:bg-[#0b3e32] border border-[#d4b274]/30 text-[#fcecd2] text-xs font-medium tracking-wider uppercase cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-[#d4b274]" />
              <span>Share Invitation</span>
            </button>
          )}

          <button
            type="button"
            onClick={scrollToTop}
            className="luxury-btn-secondary inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#031913]/70 hover:bg-[#072c21] border border-[#d4b274]/25 text-[#fcecd2]/80 hover:text-[#fcecd2] text-xs font-medium tracking-wider uppercase cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5 text-[#d4b274]" />
            <span>Back to Top</span>
          </button>
        </div>

        {/* Micro Colophon */}
        <div className="pt-8 text-[11px] text-[#faf7f2]/40 tracking-wider">
          {residenceName} • {city} • Built with Barakah & Grace
        </div>
      </div>
    </footer>
  );
};
