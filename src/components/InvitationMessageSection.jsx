import React from 'react';
import { useInView, usePrefersReducedMotion } from '../hooks/useInView';
import {
  EiffelEmblem,
  GirihLatticePattern,
  SoftRadialGlow,
  CornerArabesque,
  CrescentMedallion
} from './GeometricPattern';
import { INVITATION_CONFIG } from '../invitationConfig';

export const InvitationMessageSection = ({
  residenceName = INVITATION_CONFIG.residenceName,
  familySignature = INVITATION_CONFIG.familySignature,
  city = INVITATION_CONFIG.city
}) => {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });
  const prefersReducedMotion = usePrefersReducedMotion();

  // Instant display if user prefers reduced motion
  const isAnimated = inView || prefersReducedMotion;

  return (
    <section
      id="invitation"
      ref={ref}
      aria-label="Formal Invitation to Eiffel Home"
      className="relative py-24 sm:py-32 md:py-40 px-4 sm:px-6 bg-gradient-to-b from-[#041913] via-[#06241c] to-[#041913] overflow-hidden"
    >
      {/* 1. Background Continuous Parallax Pattern */}
      <GirihLatticePattern opacity={0.045} animated={true} />

      {/* 2. Soft Ambient Radial Glow Behind the Arch */}
      <SoftRadialGlow
        size="w-[700px] h-[700px]"
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-70"
        color="champagne"
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* 3. Outer Islamic Arch Shape Surrounding the Card */}
        <div className="relative p-1 sm:p-2 rounded-t-[80px] sm:rounded-t-[140px] md:rounded-t-[198px] rounded-b-[28px] sm:rounded-b-[40px] md:rounded-b-[56px] bg-gradient-to-b from-[#d4b274]/35 via-[#d4b274]/15 to-[#d4b274]/5 shadow-[0_30px_90px_rgba(0,0,0,0.7)]">
          {/* Outer Arch Hairline Outline */}
          <div className="absolute inset-1.5 sm:inset-2.5 rounded-t-[74px] sm:rounded-t-[134px] md:rounded-t-[192px] rounded-b-[24px] sm:rounded-b-[36px] md:rounded-b-[52px] border border-[#d4b274]/20 pointer-events-none" />

          {/* Arch Apex Keystone Ornament */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
            <div className="p-1 rounded-full bg-[#052019] border border-[#d4b274]/40 shadow-lg">
              <CrescentMedallion size={28} />
            </div>
          </div>

          {/* 4. Elegant Centered Card (Printed Invitation Translation) */}
          <div
            className={`luxury-card-ivory relative ivory-invitation-card text-[#1c2824] rounded-t-[76px] sm:rounded-t-[136px] md:rounded-t-[194px] rounded-b-[26px] sm:rounded-b-[38px] md:rounded-b-[52px] p-6 sm:p-12 md:p-20 text-center overflow-hidden transition-all duration-1000 ${
              isAnimated
                ? 'opacity-100 scale-100 translate-y-0'
                : 'opacity-0 scale-[0.97] translate-y-6'
            }`}
          >
            {/* Concentric Islamic Arch Inner Hairline Guide */}
            <div className="absolute inset-2 sm:inset-3 rounded-t-[70px] sm:rounded-t-[130px] md:rounded-t-[188px] rounded-b-[20px] sm:rounded-b-[32px] md:rounded-b-[46px] border border-[#a78345]/30 pointer-events-none" />

            {/* Corner Arabesque Line Ornaments */}
            <CornerArabesque className="text-[#a78345]/50 m-2 sm:m-3" />

            {/* Inner Content with Staggered Entrance */}
            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              
              {/* Stagger Step 1: Small Royal House Monogram */}
              <div
                className={`mb-4 sm:mb-5 transition-all duration-1000 ${
                  isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: prefersReducedMotion ? '0ms' : '200ms' }}
              >
                <EiffelEmblem size={52} className="sm:w-[68px] sm:h-[68px]" />
              </div>

              {/* Stagger Step 2: Main Heading */}
              <div
                className={`transition-all duration-1000 ${
                  isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: prefersReducedMotion ? '0ms' : '400ms' }}
              >
                <h2 className="font-display-regal text-2xl sm:text-4xl md:text-5xl font-bold tracking-[0.08em] sm:tracking-[0.14em] text-[#082d24] uppercase drop-shadow-sm leading-snug sm:leading-tight">
                  You Are Cordially Invited
                </h2>
              </div>

              {/* Stagger Step 3: Decorative Islamic Divider */}
              <div
                className={`w-full max-w-xs sm:max-w-sm my-5 sm:my-8 transition-all duration-1000 ${
                  isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: prefersReducedMotion ? '0ms' : '600ms' }}
              >
                <div className="flex items-center justify-center gap-3 w-full mx-auto">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#a78345]/40 to-[#a78345]" />
                  <div className="relative flex items-center justify-center px-1">
                    <svg className="w-5 h-5 text-[#a78345]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L14.5 7.5L20 5L17.5 10.5L23 13L17.5 15.5L20 21L14.5 18.5L12 24L9.5 18.5L4 21L6.5 15.5L1 13L6.5 10.5L4 5L9.5 7.5L12 2Z" opacity="0.9" />
                    </svg>
                    <div className="absolute w-1.5 h-1.5 rounded-full bg-[#faf6ef] shadow-sm" />
                  </div>
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#a78345]/40 to-[#a78345]" />
                </div>
              </div>

              {/* Stagger Step 4: Main Message Paragraphs */}
              <div className="space-y-6 sm:space-y-7 text-[#263732] leading-relaxed">
                {/* Paragraph 1 */}
                <p
                  className={`font-serif-luxury text-lg sm:text-2xl md:text-[26px] text-[#0b3329] font-normal leading-snug transition-all duration-1000 ${
                    isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: prefersReducedMotion ? '0ms' : '800ms' }}
                >
                  Alhamdulillah, with the blessings of Allah, we are delighted to open the doors of our new home,{' '}
                  <span className="font-semibold text-[#8b6527] tracking-wide whitespace-nowrap">
                    {residenceName}
                  </span>
                  .
                </p>

                {/* Paragraph 2 */}
                <p
                  className={`font-sans text-sm sm:text-base md:text-lg font-light text-[#344641] leading-relaxed px-2 transition-all duration-1000 ${
                    isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: prefersReducedMotion ? '0ms' : '1000ms' }}
                >
                  A home is more than walls and rooms — it is a place where memories are created, prayers are made, and blessings are shared.
                </p>

                {/* Paragraph 3 */}
                <p
                  className={`font-sans text-sm sm:text-base md:text-lg font-light text-[#344641] leading-relaxed px-2 transition-all duration-1000 ${
                    isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: prefersReducedMotion ? '0ms' : '1200ms' }}
                >
                  We would be honored to have you with us as we celebrate this beautiful new beginning.
                </p>
              </div>

              {/* Stagger Step 5: Elegant Card Sign-off */}
              <div
                className={`mt-10 sm:mt-12 pt-6 border-t border-[#a78345]/25 w-full max-w-md flex flex-col items-center transition-all duration-1000 ${
                  isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: prefersReducedMotion ? '0ms' : '1400ms' }}
              >
                <span className="font-serif-luxury italic text-xs sm:text-sm text-[#7e5c24]">
                  With warm regards & prayers,
                </span>
                <span className="font-display-regal text-base sm:text-lg md:text-xl font-bold tracking-[0.2em] text-[#082d24] uppercase mt-1">
                  {familySignature}
                </span>
                <span className="text-[10px] tracking-[0.24em] text-[#a78345] uppercase mt-0.5 font-medium">
                  {city}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


