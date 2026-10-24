import React, { useState } from 'react';
import { Navigation, MapPin, Copy, Check } from 'lucide-react';
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
 * LocationSection - "Find Your Way to Eiffel Home"
 */
export const LocationSection = ({
  venue = INVITATION_CONFIG.venueName,
  address = INVITATION_CONFIG.fullAddress,
  googleMapsUrl = INVITATION_CONFIG.googleMapsUrl
}) => {
  const [sectionRef, inView] = useInView({ threshold: 0.15, triggerOnce: true });
  const prefersReducedMotion = usePrefersReducedMotion();
  const [copied, setCopied] = useState(false);

  const isRevealed = inView || prefersReducedMotion;

  const handleCopyAddress = () => {
    const textToCopy = address === "[FULL ADDRESS]" ? `${venue}, Calicut, Kerala` : address;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="location"
      ref={sectionRef}
      className="relative py-24 sm:py-32 md:py-36 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#041913] via-[#052119] to-[#041913] overflow-hidden"
      aria-label="Find Your Way to Eiffel Home"
    >
      {/* 1. Background Subtle Parallax Geometric Pattern */}
      <GirihLatticePattern opacity={0.04} animated={true} />

      {/* 2. Soft Ambient Radial Glow Behind Card */}
      <SoftRadialGlow
        size="w-[650px] h-[650px]"
        className="top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-65"
        color="champagne"
      />
      <SoftRadialGlow
        size="w-[500px] h-[500px]"
        className="bottom-10 -left-20 opacity-35"
        color="emerald"
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* =========================================================
            SECTION HEADER
            - Heading: "Find Your Way to Eiffel Home"
            - Staggered Upward Entrance Animation
           ========================================================= */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          {/* Eyebrow Tag */}
          <div
            className={`transition-all duration-700 ease-out transform ${
              isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#072c21]/80 border border-[#d4b274]/30 text-[#d4b274] shadow-md mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4b274] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.26em] font-medium text-[#fcecd2]">
                Location & Directions
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4b274] animate-pulse" />
            </div>
          </div>

          {/* Heading: "Find Your Way to Eiffel Home" */}
          <h2
            className={`font-display-regal text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.1em] text-[#fcecd2] drop-shadow-[0_4px_20px_rgba(212,178,116,0.18)] transition-all duration-800 delay-150 ease-out transform ${
              isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Find Your Way to {venue}
          </h2>

          {/* Subtitle */}
          <p
            className={`font-serif-luxury italic text-base sm:text-lg text-[#d4b274]/90 mt-2 font-normal transition-all duration-700 delay-300 ease-out transform ${
              isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            We eagerly await your presence to fill our new home with blessings and joy
          </p>

          {/* Self-drawing Arabesque Divider */}
          <div
            className={`transition-all duration-1000 delay-400 ease-out ${
              isRevealed ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <ArabesqueDivider className="my-5" width="max-w-xs sm:max-w-sm" />
          </div>
        </div>

        {/* =========================================================
            PREMIUM LOCATION & MAP CARD
            Design:
            - Islamic arch frame
            - Soft cream / ivory background
            - Emerald typography (high contrast, luxurious)
            - Champagne accents (borders, keystone, hairlines)
            - Minimal map-style visual (understated, does NOT dominate)
            - Small location pin
            - "Get Directions" button (prepared for Google Maps URL)
            - Subtle entrance animation: scale 0.97 -> 1.0 + fade in
           ========================================================= */}
        <div
          className={`relative transition-all duration-1000 ease-out transform ${
            isRevealed
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-[0.97] translate-y-8'
          }`}
        >
          {/* Outer Islamic Arch Frame Border */}
          <div className="relative p-1 sm:p-2 rounded-t-[80px] sm:rounded-t-[130px] md:rounded-t-[170px] rounded-b-2xl sm:rounded-b-[40px] bg-gradient-to-b from-[#d4b274]/40 via-[#d4b274]/15 to-[#d4b274]/30 shadow-[0_30px_90px_rgba(0,0,0,0.65)]">
            
            {/* Concentric Hairline Guide */}
            <div className="absolute inset-1.5 sm:inset-3 rounded-t-[74px] sm:rounded-t-[124px] md:rounded-t-[164px] rounded-b-[20px] sm:rounded-b-[34px] border border-[#d4b274]/30 pointer-events-none" />

            {/* Arch Apex Keystone Ornament */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
              <div className="p-1 rounded-full bg-[#052019] border border-[#d4b274]/60 shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
                <CrescentMedallion size={26} />
              </div>
            </div>

            {/* =========================================================
                SOFT CREAM / IVORY BACKGROUND
                Tactile letterpress finish with emerald typography
               ========================================================= */}
            <div className="luxury-card-ivory relative overflow-hidden rounded-t-[72px] sm:rounded-t-[122px] md:rounded-t-[162px] rounded-b-[18px] sm:rounded-b-[32px] bg-[#faf6ef] text-[#062b21] shadow-inner p-5 sm:p-10 md:p-12">
              
              {/* Subtle Ivory Texture & Micro Star Watermark */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20 select-none"
                style={{
                  backgroundImage: `radial-gradient(rgba(174, 139, 71, 0.25) 1px, transparent 1px), radial-gradient(rgba(14, 61, 50, 0.08) 1px, #faf6ef 1px)`,
                  backgroundSize: '24px 24px',
                  backgroundPosition: '0 0, 12px 12px'
                }}
                aria-hidden="true"
              />

              {/* Corner Arabesque Framing on the Cream Card */}
              <CornerArabesque className="opacity-50" />

              <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center text-center">
                
                {/* Micro Eiffel Emblem */}
                <div className="mb-4">
                  <EiffelEmblem size={38} />
                </div>

                {/* Venue Block */}
                <div className="mb-2">
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.26em] text-[#8a6b32] font-semibold block mb-1">
                    VENUE
                  </span>
                  <h3 className="font-display-regal text-2xl sm:text-4xl md:text-5xl font-bold tracking-[0.08em] sm:tracking-[0.1em] text-[#062e24]">
                    {venue}
                  </h3>
                </div>

                {/* Islamic decorative champagne hairline */}
                <div className="flex items-center justify-center gap-3 w-40 my-3">
                  <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#d4b274]/60" />
                  <span className="w-1.5 h-1.5 rotate-45 bg-[#9e7d43]" />
                  <span className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#d4b274]/60" />
                </div>

                {/* Address Block */}
                <div className="mb-8 max-w-lg">
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[#8a6b32] font-semibold block mb-1.5">
                    ADDRESS
                  </span>
                  <p className="font-serif-luxury text-base sm:text-lg md:text-xl text-[#0c392d] font-normal leading-relaxed italic px-2">
                    {address}
                  </p>
                </div>

                {/* =====================================================
                    MINIMAL MAP-STYLE VISUAL
                    - Islamic Arch Frame
                    - Small Location Pin
                    - Understated & refined (does NOT visually dominate)
                   ===================================================== */}
                <div className="w-full max-w-md mb-8">
                  <div className="relative overflow-hidden rounded-t-[70px] sm:rounded-t-[90px] rounded-b-2xl border border-[#d4b274]/40 bg-gradient-to-b from-[#f3ede0] via-[#f7f2e7] to-[#ede4d2] shadow-md h-[180px] sm:h-[210px] flex items-center justify-center">
                    
                    {/* Inner Arch Hairline */}
                    <div className="absolute inset-2 rounded-t-[64px] sm:rounded-t-[84px] rounded-b-xl border border-[#d4b274]/30 pointer-events-none" />

                    {/* Minimalist Topographic & Grid Lines */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="minimal-map-grid" width="28" height="28" patternUnits="userSpaceOnUse">
                            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#8a6b32" strokeWidth="0.5" strokeDasharray="1 3" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#minimal-map-grid)" />
                      </svg>
                    </div>

                    {/* Stylized Minimalist Roads & Contour Paths */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-35" preserveAspectRatio="none">
                      {/* Secondary road */}
                      <path d="M-20,120 Q120,60 220,100 T460,80" stroke="#c4a56a" strokeWidth="3" fill="none" strokeLinecap="round" />
                      {/* Main avenue */}
                      <path d="M80,-20 Q160,90 220,105 T380,240" stroke="#8a6b32" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                      {/* Subtle curved contour */}
                      <path d="M-10,180 Q140,140 240,190 T480,160" stroke="#0e4b3c" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.4" />
                    </svg>

                    {/* Radial Soft Champagne Glow behind pin */}
                    <div className="absolute w-28 h-28 rounded-full bg-[#d4b274]/20 blur-xl pointer-events-none" />

                    {/* Small Location Pin */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="relative flex items-center justify-center">
                        {/* Soft subtle radar pulse */}
                        <span className="absolute -inset-2.5 rounded-full bg-[#d4b274]/25 animate-ping opacity-60" style={{ animationDuration: '3s' }} />
                        <span className="absolute -inset-4 rounded-full bg-[#d4b274]/15 animate-pulse" />

                        {/* Small Location Pin */}
                        <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#062e24] via-[#094133] to-[#062e24] border border-[#d4b274] text-[#fcecd2] flex items-center justify-center shadow-lg transform transition-transform hover:scale-105">
                          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#d4b274]" />
                        </div>
                      </div>

                      {/* Small Destination Pill */}
                      <div className="mt-2.5 px-3 py-1 rounded-full bg-[#062e24]/90 border border-[#d4b274]/40 text-[#fcecd2] shadow-md flex items-center gap-1.5 backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d4b274]" />
                        <span className="font-display-regal text-[10px] sm:text-[11px] font-semibold tracking-wider text-[#fcecd2]">
                          {venue}
                        </span>
                      </div>
                    </div>

                    {/* Subtle GPS Watermark */}
                    <div className="absolute bottom-2.5 right-3 text-[9px] font-mono tracking-wider text-[#8a6b32]/70 uppercase">
                      GPS • Navigation Ready
                    </div>
                  </div>
                </div>

                {/* =====================================================
                    ACTION BUTTONS: "Get Directions"
                    Prepared for easy Google Maps URL replacement
                   ===================================================== */}
                <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                  {/* Primary CTA: "Get Directions" */}
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="luxury-btn-primary min-h-[48px] w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#062e24] via-[#094133] to-[#062e24] text-[#fcecd2] hover:text-white border border-[#d4b274]/60 text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase shadow-[0_6px_20px_rgba(6,46,36,0.35)] cursor-pointer group active:scale-98"
                    aria-label={`Get Directions to ${venue} on Google Maps`}
                  >
                    <Navigation className="w-4 h-4 text-[#d4b274] group-hover:rotate-12 transition-transform duration-300" />
                    <span>Get Directions</span>
                  </a>

                  {/* Secondary Helper: Copy Address */}
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="luxury-btn-secondary min-h-[48px] w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-transparent border border-[#062e24]/20 hover:border-[#062e24]/40 text-[#062e24] text-xs sm:text-sm font-medium tracking-wide cursor-pointer active:scale-98"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-700" />
                        <span className="font-semibold text-emerald-800">Address Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#8a6b32]" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Small Guidance Note */}
                <div className="mt-6 text-center">
                  <span className="text-[10px] sm:text-[11px] text-[#8a6b32] font-light italic">
                    Tap “Get Directions” to open turn-by-turn route guidance on your device
                  </span>
                </div>
              </div>

              {/* Bottom Champagne Accent Glow */}
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#d4b274]/40 to-transparent mt-8" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
