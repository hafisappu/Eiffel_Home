import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { GirihLatticePattern } from './GeometricPattern';
import { usePrefersReducedMotion } from '../hooks/useInView';
import { INVITATION_CONFIG } from '../invitationConfig';

/**
 * InvitationCover — Full-Screen Cinematic Invitation Unveiling Opening
 *
 * Sequence:
 * 1. Initial State: Peaceful darkness with subtle geometric pattern & soft radial glow
 * 2. Bismillah appears: Sacred Arabic typography with gentle fade-in & upward float
 * 3. Islamic Arch reveals itself: Soaring architectural arch drawn from the bottom upward
 * 4. Eiffel Home reveal: Title emerges from the light with blur-to-sharp resolution
 * 5. Subtitle: Thin decorative hairline divider and "A New Beginning, A New Blessing"
 * 6. Invitation message: 3 clean, centered lines of gratitude & invitation
 * 7. View Invitation CTA: Translucent emerald glass button with champagne border & subtle arrow
 *
 * Click Experience:
 * When "View Invitation" is clicked, the arch expands, center light blooms, and the
 * cover smoothly dissolves as if opening the physical doors of Eiffel Home.
 */
export const InvitationCover = ({
  onOpenInvitation,
  residenceName = INVITATION_CONFIG.residenceName,
  tagline = INVITATION_CONFIG.tagline
}) => {
  const [isOpening, setIsOpening] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleOpen = () => {
    if (isOpening) return;

    if (prefersReducedMotion) {
      onOpenInvitation();
      return;
    }

    setIsOpening(true);

    // Allow the door-opening animation (arch expansion & light bloom) to complete
    setTimeout(() => {
      onOpenInvitation();
    }, 850);
  };

  return (
    <div
      role="region"
      aria-label="Eiffel Home Invitation Cover"
      className={`fixed inset-0 z-50 w-full h-[100dvh] flex flex-col justify-between items-center px-4 sm:px-6 pt-10 sm:pt-14 pb-8 sm:pb-10 overflow-hidden bg-gradient-to-b from-[#02130d] via-[#041a13] to-[#02110c] select-none transition-opacity duration-700 ${
        isOpening ? 'pointer-events-none' : 'anim-cover-bg'
      }`}
    >
      {/* =====================================================================
          1. BACKGROUND ATMOSPHERE: Subtle Girih lattice & warm radial light
         ===================================================================== */}
      <GirihLatticePattern
        opacity={0.032}
        className="transition-opacity duration-1000"
      />

      {/* Center Soft Radial Glow (Blooms during door-opening) */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[560px] md:w-[760px] h-[480px] sm:h-[680px] pointer-events-none z-0 ${
          isOpening ? 'door-glow-bloom' : ''
        }`}
      >
        <div className="w-full h-full rounded-full bg-[radial-gradient(ellipse_at_center,rgba(212,178,116,0.16)_0%,rgba(9,45,36,0.4)_45%,transparent_75%)] blur-3xl anim-soft-glow" />
      </div>

      {/* =====================================================================
          3. ARCHITECTURAL ISLAMIC ARCH: Reveals from bottom-up; expands on click
         ===================================================================== */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-[340px] sm:max-w-[520px] md:max-w-[640px] h-[86vh] max-h-[640px] sm:max-h-[720px] pointer-events-none z-0 ${
          isOpening ? 'door-arch-expand' : 'anim-cover-arch'
        }`}
      >
        {/* Outer Arch Border with Hairline Champagne Outline */}
        <div className="relative w-full h-full arch-top border border-[#d4b274]/30 bg-gradient-to-b from-[#d4b274]/[0.05] via-[#062920]/25 to-transparent shadow-[0_0_90px_rgba(2,19,13,0.85)] backdrop-blur-[2px]">
          {/* Inner concentric arch contour */}
          <div className="absolute inset-2 sm:inset-3 arch-top border border-[#d4b274]/15 pointer-events-none" />

          {/* Symmetrical 8-pointed star rosette at arch pinnacle */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-[#d4b274]/50 anim-slow-orbit"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              aria-hidden="true"
            >
              <polygon points="12,2 15,7.5 21,5 18.5,11 23,14 17.5,17 19.5,23 13.5,20.5 12,24 10.5,20.5 4.5,23 6.5,17 1,14 5.5,11 3,5 9,7.5" />
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="0.5" />
            </svg>
            <div className="absolute w-1.5 h-1.5 rounded-full bg-[#fcecd2] shadow-[0_0_8px_#d4b274]" />
          </div>

          {/* Bottom baseline hairline */}
          <div className="absolute bottom-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-[#d4b274]/30 to-transparent" />
        </div>
      </div>

      {/* Top spacer to balance the composition */}
      <div className="w-full flex items-center justify-end px-2 sm:px-4 z-20">
        <button
          onClick={handleOpen}
          className="text-[10px] tracking-[0.22em] uppercase text-[#d4b274]/50 hover:text-[#fcecd2] transition-colors py-1 px-3 rounded-full hover:bg-[#072c21]/40 cursor-pointer"
          aria-label="Skip cover intro"
        >
          Skip Intro
        </button>
      </div>

      {/* =====================================================================
          CENTRAL CONTENT COMPOSITION: Choreographed Reveal Sequence
         ===================================================================== */}
      <div
        className={`relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center text-center px-4 my-auto ${
          isOpening ? 'door-content-disperse' : ''
        }`}
      >
        {/* SEQUENCE STEP 2: Sacred Bismillah */}
        <div className="mb-4 sm:mb-6 anim-cover-bismillah">
          <div className="inline-flex flex-col items-center">
            <span
              className="font-arabic-calligraphy text-2xl sm:text-3xl md:text-4xl text-[#fcecd2] tracking-wider leading-relaxed drop-shadow-[0_2px_14px_rgba(212,178,116,0.3)]"
              dir="rtl"
            >
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </span>
            {/* Symmetrical fine hairline flourish */}
            <div className="flex items-center justify-center gap-2 mt-1 w-24 sm:w-36">
              <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#d4b274]/50" />
              <span className="w-1 h-1 rounded-full bg-[#d4b274]" />
              <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#d4b274]/50" />
            </div>
          </div>
        </div>

        {/* SEQUENCE STEP 4: "Eiffel Home" (Emerging from light with blur-to-sharp) */}
        <div className="my-1 sm:my-2 anim-cover-title w-full">
          <h1 className="font-display-regal text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.12em] sm:tracking-[0.16em] uppercase gold-gradient-text leading-tight drop-shadow-[0_4px_30px_rgba(212,178,116,0.22)]">
            {residenceName}
          </h1>
        </div>

        {/* SEQUENCE STEP 5: Subtitle & Thin Decorative Divider */}
        <div className="anim-cover-subtitle flex flex-col items-center mt-2 sm:mt-3">
          {/* Thin decorative hairline divider */}
          <div className="flex items-center justify-center gap-3 w-36 sm:w-48 my-1.5 sm:my-2">
            <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#d4b274]/60" />
            <span className="w-1.5 h-1.5 rotate-45 bg-[#d4b274]" />
            <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#d4b274]/60" />
          </div>

          <h2 className="font-serif-luxury italic text-base sm:text-xl md:text-2xl text-[#d4b274] font-normal tracking-wide">
            {tagline}
          </h2>
        </div>

        {/* SEQUENCE STEP 6: Invitation Message */}
        <div className="anim-cover-message mt-4 sm:mt-6 max-w-md mx-auto">
          <p className="font-sans text-xs sm:text-sm md:text-base text-[#faf7f2]/85 font-light leading-relaxed px-4">
            With gratitude to Allah,<br />
            we invite you to celebrate<br />
            the joy of our new home with us.
          </p>
        </div>

        {/* SEQUENCE STEP 7: View Invitation CTA Button */}
        <div className="mt-8 sm:mt-11 anim-cover-btn">
          <button
            type="button"
            onClick={handleOpen}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#05261d]/70 hover:bg-[#08382b]/85 border border-[#d4b274]/55 hover:border-[#d4b274] text-[#fcecd2] hover:text-white text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase backdrop-blur-md shadow-[0_0_24px_rgba(212,178,116,0.18)] hover:shadow-[0_0_36px_rgba(212,178,116,0.35)] transition-all duration-300 cursor-pointer active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#d4b274]/40"
            aria-label="Open and view the Eiffel Home digital invitation"
          >
            <span className="font-display-regal">
              View Invitation
            </span>
            <ChevronDown className="w-4 h-4 text-[#d4b274] group-hover:translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Bottom Subtle Inscription */}
      <div className="relative z-10 flex flex-col items-center gap-1 opacity-50 text-center">
        <span className="text-[9px] tracking-[0.28em] uppercase text-[#d4b274]/70 font-light">
          Housewarming Celebration • Tap to Open
        </span>
      </div>
    </div>
  );
};
