import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import {
  SectionHeader,
  SoftRadialGlow,
  CornerArabesque,
  GirihLatticePattern
} from './GeometricPattern';
import { useInView, usePrefersReducedMotion } from '../hooks/useInView';
import { INVITATION_CONFIG } from '../invitationConfig';

export const ArchitectureGallery = ({
  residenceName = INVITATION_CONFIG.residenceName
}) => {
  const [sectionRef, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const prefersReducedMotion = usePrefersReducedMotion();
  const isRevealed = inView || prefersReducedMotion;
  const [activeItem, setActiveItem] = useState(0);

  const spaces = [
    {
      title: "The Grand Arch Portal",
      arabic: "البَابُ الرَّئِيسِيّ",
      concept: "Entrance & Threshold",
      desc: "A bespoke modern Moorish archway crafted in solid Kerala teak wood, brushed champagne brass accents, and subtle girih star details welcoming every visitor into serenity.",
      tag: "Architectural Feature",
      gradient: "from-[#083025] to-[#041a14]"
    },
    {
      title: "The Sunlit Nadumuttam",
      arabic: "الفِنَاءُ المُنِير",
      concept: "Central Open Courtyard",
      desc: "A reinterpretation of traditional Kerala domestic architecture: an open-to-sky central atrium bathing the family living area in diffuse morning light and cross breezes.",
      tag: "Heart of the Home",
      gradient: "from-[#0c382c] to-[#07241c]"
    },
    {
      title: "The Serene Musalla",
      arabic: "المُصَلَّى",
      concept: "Prayer & Reflection Alcove",
      desc: "An intimate sanctuary designed with soft acoustic geometry, oriented precisely toward the Qibla, framed by fine wooden mashrabiya lattice that casts meditative shadows.",
      tag: "Sanctuary",
      gradient: "from-[#093227] to-[#051c15]"
    },
    {
      title: "The Horizon Verandah",
      arabic: "الشُّرْفَةُ العُلْيَا",
      concept: "Rooftop Garden & Majlis",
      desc: "An elevated terrace framing panoramic views of Calicut’s swaying coconut canopies and twilight sunsets, curated for peaceful tea and warm family conversations.",
      tag: "Open Living",
      gradient: "from-[#0d3f32] to-[#082920]"
    }
  ];

  return (
    <section
      id="spaces"
      ref={sectionRef}
      className="relative py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-b from-[#041913] via-[#072920] to-[#041913] overflow-hidden"
      aria-label="Architectural Vignettes of Eiffel Home"
    >
      {/* 1. Subtle parallax geometric pattern */}
      <GirihLatticePattern opacity={0.045} animated={true} />

      {/* 2. Soft radial glow */}
      <SoftRadialGlow size="w-[600px] h-[600px]" className="top-10 -right-24 opacity-50" color="champagne" />
      <SoftRadialGlow size="w-[500px] h-[500px]" className="bottom-10 -left-24 opacity-40" color="emerald" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Uniform Section Header with self-drawing arabesque divider */}
        <div
          className={`transition-all duration-700 ease-out transform ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <SectionHeader
            tag="Design & Atmosphere"
            title="Architectural Vignettes"
            subtitle={`A glimpse into the thoughtful spaces and tranquil craftsmanship of ${residenceName}`}
            className="mb-14"
          />
        </div>

        {/* Gallery Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {spaces.map((space, idx) => (
            <div
              key={idx}
              onClick={() => setActiveItem(idx)}
              style={{
                transitionDelay: prefersReducedMotion ? '0ms' : `${idx * 130 + 150}ms`
              }}
              className={`luxury-card-interactive group relative p-7 sm:p-8 rounded-3xl cursor-pointer overflow-hidden transition-all duration-700 ease-out transform ${
                isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } ${
                activeItem === idx
                  ? 'bg-[#09392d] border-2 border-[#d4b274] shadow-[0_0_30px_rgba(212,178,116,0.25)]'
                  : 'emerald-glass gold-card-border hover:bg-[#083025]'
              }`}
            >
              <CornerArabesque />

              {/* Modern Arch silhouette outline watermark */}
              <div className="absolute -bottom-10 -right-6 w-44 h-56 arch-top border border-[#d4b274]/10 pointer-events-none group-hover:scale-105 transition-transform duration-500" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-[#d4b274] font-semibold bg-[#d4b274]/15 px-3 py-1 rounded-full border border-[#d4b274]/25">
                    {space.tag}
                  </span>
                  <span className="font-arabic-calligraphy text-base sm:text-lg text-[#fcecd2]/70" dir="rtl">
                    {space.arabic}
                  </span>
                </div>

                <h3 className="font-display-regal text-xl sm:text-2xl font-bold text-[#fcecd2] mb-1">
                  {space.title}
                </h3>
                <div className="text-xs text-[#d4b274] font-medium tracking-wide mb-3">
                  {space.concept}
                </div>

                <p className="text-xs sm:text-sm text-[#f6f1e7]/80 font-light leading-relaxed mb-4">
                  {space.desc}
                </p>

                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#d4b274] font-medium group-hover:translate-x-1 transition-transform">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Curated for Peaceful Living</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
