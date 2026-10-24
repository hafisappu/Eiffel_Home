import React from 'react';
import { Compass, Sun, Heart, Feather } from 'lucide-react';
import {
  GirihLatticePattern,
  SectionHeader,
  SoftRadialGlow,
  CornerArabesque
} from './GeometricPattern';
import { useInView, usePrefersReducedMotion } from '../hooks/useInView';
import { INVITATION_CONFIG } from '../invitationConfig';

export const HouseIntroSection = ({
  residenceName = INVITATION_CONFIG.residenceName
}) => {
  const [sectionRef, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const prefersReducedMotion = usePrefersReducedMotion();
  const isRevealed = inView || prefersReducedMotion;

  const pillars = [
    {
      title: "Architectural Homage",
      subtitle: "The Eiffel Inception",
      desc: "Named in tribute to structural grace, poise, and soaring aspiration — reimagined with contemporary lines and understated luxury in Kerala.",
      icon: Compass,
      tag: "Design Philosophy"
    },
    {
      title: "Light & Serenity",
      subtitle: "Modern Islamic Elements",
      desc: "Gentle archways, subtle geometric lattice screens, and sun-drenched courtyards designed to invite peace, gentle winds, and natural light.",
      icon: Sun,
      tag: "Sanctuary"
    },
    {
      title: "Malabar Hospitality",
      subtitle: "Open Doors & Warm Hearts",
      desc: "Crafted around family fellowship, heartfelt conversations, and the timeless Kerala tradition of welcoming every guest as an honored blessing.",
      icon: Heart,
      tag: "Hospitality"
    },
    {
      title: "Barakah & Foundation",
      subtitle: "Built with Prayer",
      desc: "Every stone laid with dua and gratitude, dedicating this space as a haven of barakah, remembrance, and joyful lifelong memories.",
      icon: Feather,
      tag: "Blessing"
    }
  ];

  return (
    <section
      id="about-home"
      ref={sectionRef}
      className="relative py-20 sm:py-28 px-4 sm:px-6 bg-[#041913] overflow-hidden"
      aria-label="The Story and Sanctuary of Eiffel Home"
    >
      {/* 1. Subtle parallax geometric pattern */}
      <GirihLatticePattern opacity={0.045} animated={true} />

      {/* 2. Soft radial light effect */}
      <SoftRadialGlow size="w-[600px] h-[600px]" className="top-10 -right-20 opacity-60" color="champagne" />
      <SoftRadialGlow size="w-[500px] h-[500px]" className="bottom-10 -left-20 opacity-40" color="emerald" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Uniform Section Header with self-drawing arabesque divider */}
        <div
          className={`transition-all duration-700 ease-out transform ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <SectionHeader
            arabic="مَا شَاءَ اللَّهُ لَا قُوَّةَ إِلَّا بِاللَّهِ"
            tag="The Story & Sanctuary"
            title={`Welcome to ${residenceName}`}
            subtitle="A harmonious synthesis of modern Kerala living and serene Islamic elegance"
            className="mb-10"
          />

          {/* Narrative Intro */}
          <p className="text-center max-w-2xl mx-auto text-sm sm:text-base text-[#f6f1e7]/80 font-light leading-relaxed mb-12">
            More than just walls and roofs, <span className="text-[#fcecd2] font-medium">{residenceName}</span> is a dream realized through perseverance, faith, and patience. Rooted in the rich cultural warmth of Malabar and framed by contemporary architectural poise, it is built to be a haven of solace, celebration, and spiritual peace.
          </p>
        </div>

        {/* Feature Architectural Pillars Grid with corner arabesque accents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {pillars.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                style={{
                  transitionDelay: prefersReducedMotion ? '0ms' : `${idx * 140 + 200}ms`
                }}
                className={`luxury-card-interactive group relative p-6 sm:p-8 rounded-2xl emerald-glass gold-card-border shadow-xl overflow-hidden transition-all duration-700 ease-out transform ${
                  isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {/* Reusable Corner Arabesque line brackets */}
                <CornerArabesque />

                {/* Subtle Arch watermark in card corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#d4b274]/10 to-transparent pointer-events-none rounded-bl-3xl" />
                
                <div className="relative z-10 flex items-start gap-4 sm:gap-5">
                  <div className="p-3.5 rounded-xl bg-[#031913]/90 border border-[#d4b274]/30 text-[#d4b274] group-hover:scale-105 group-hover:border-[#d4b274]/60 transition-all duration-300 shadow-inner shrink-0">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4b274]/80 font-medium">
                        {item.tag}
                      </span>
                      <span className="text-[11px] font-serif-luxury text-[#fcecd2]/40">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="font-display-regal text-lg sm:text-xl font-semibold text-[#fcecd2] mb-1">
                      {item.title}
                    </h3>
                    <div className="text-xs text-[#d4b274] font-medium mb-3">
                      {item.subtitle}
                    </div>

                    <p className="text-xs sm:text-sm text-[#f6f1e7]/75 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Architectural Quote Card with Arched Frame */}
        <div
          className={`mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#07261d] via-[#0c362b] to-[#07261d] border border-[#d4b274]/25 text-center shadow-2xl relative overflow-hidden luxury-card-interactive transition-all duration-700 ease-out transform ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: prefersReducedMotion ? '0ms' : '600ms' }}
        >
          <CornerArabesque />
          <div className="font-arabic-calligraphy text-xl sm:text-2xl text-[#fcecd2] mb-2" dir="rtl">
            رَبِّ أَنْزِلْنِي مُنْزَلًا مُبَارَكًا وَأَنْتَ خَيْرُ الْمُنْزِلِينَ
          </div>
          <p className="font-serif-luxury italic text-sm sm:text-base text-[#d4b274] font-normal">
            "My Lord, let my landing be blessed, and You are the best of those who bring to land."
          </p>
          <span className="text-[10px] tracking-[0.2em] text-[#f6f1e7]/60 uppercase mt-1 block">
            Surah Al-Mu'minun • 23:29
          </span>
        </div>
      </div>
    </section>
  );
};

