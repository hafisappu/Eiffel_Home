import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { GirihLatticePattern } from './GeometricPattern';
import { usePrefersReducedMotion } from '../hooks/useInView';
import { INVITATION_CONFIG } from '../invitationConfig';

export const HeroSection = ({
  residenceName = INVITATION_CONFIG.residenceName,
  tagline = INVITATION_CONFIG.tagline
}) => {
  const canvasRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Smooth scroll to the invitation section
  const handleViewInvitation = (e) => {
    e.preventDefault();
    const target = document.getElementById('invitation');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Subtle floating golden stardust particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // If reduced motion is requested, render a single delicate static constellation
    if (prefersReducedMotion) {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < 18; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(229, 203, 155, 0.25)';
        ctx.fill();
      }
      return () => window.removeEventListener('resize', handleResize);
    }

    // Keep particle count low and delicate so it feels serene, not distracting
    const particleCount = width < 768 ? 20 : 36;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.35,
      alpha: Math.random() * 0.35 + 0.1,
      targetAlpha: Math.random() * 0.35 + 0.1,
      speedY: -(Math.random() * 0.22 + 0.08),
      speedX: (Math.random() - 0.5) * 0.16,
      oscillationSpeed: Math.random() * 0.015 + 0.005,
      phase: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.phase += p.oscillationSpeed;
        p.x += Math.sin(p.phase) * 0.25 + p.speedX;

        // Wrap around smoothly
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(229, 203, 155, ${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(212, 178, 116, 0.3)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      id="hero"
      aria-label={`Welcome to ${residenceName}`}
      className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center px-4 sm:px-6 pt-24 pb-8 sm:pb-10 overflow-hidden bg-gradient-to-b from-[#031711] via-[#06241c] to-[#041913] anim-hero-bg select-none"
    >
      {/* 1. Dynamic ambient stardust canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-80"
      />

      {/* 2. Fine Geometric Islamic Girih Pattern (Subtle reveal) */}
      <GirihLatticePattern
        opacity={0.065}
        className="anim-hero-pattern"
      />

      {/* 3. Soft Radial Light / Glow behind the central arch */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[540px] md:w-[720px] h-[480px] sm:h-[680px] pointer-events-none z-0">
        <div className="w-full h-full rounded-full bg-[radial-gradient(ellipse_at_center,rgba(212,178,116,0.12)_0%,rgba(9,45,36,0.45)_50%,transparent_75%)] blur-2xl anim-soft-glow" />
      </div>

      {/* 4. Architectural Islamic Arch Silhouette behind Main Content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-[350px] sm:max-w-[560px] md:max-w-[680px] h-[78vh] max-h-[640px] sm:max-h-[720px] pointer-events-none z-0 anim-hero-arch">
        {/* Outer Arch Border with Hairline Gold */}
        <div className="relative w-full h-full arch-top border border-[#d4b274]/20 bg-gradient-to-b from-[#d4b274]/[0.04] via-[#082d24]/20 to-transparent shadow-[0_0_80px_rgba(4,25,19,0.8)] backdrop-blur-[2px]">
          {/* Inner concentric arch contour */}
          <div className="absolute inset-2 sm:inset-3 arch-top border border-[#d4b274]/10 pointer-events-none" />

          {/* Slow-moving ornamental 8-pointed star rosette at arch pinnacle */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-[#d4b274]/40 anim-slow-orbit"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
            >
              <polygon points="12,2 15,7.5 21,5 18.5,11 23,14 17.5,17 19.5,23 13.5,20.5 12,24 10.5,20.5 4.5,23 6.5,17 1,14 5.5,11 3,5 9,7.5" />
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="0.5" />
            </svg>
            <div className="absolute w-1.5 h-1.5 rounded-full bg-[#fcecd2] shadow-[0_0_8px_#d4b274]" />
          </div>

          {/* Bottom subtle baseline hairline */}
          <div className="absolute bottom-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-[#d4b274]/25 to-transparent" />
        </div>
      </div>

      {/* Empty spacer to vertically balance the navigation header */}
      <div className="w-full h-2" />

      {/* Central Content Composition (Mobile-first, centered, emotionally evocative) */}
      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center text-center px-4">
        
        {/* SEQUENCE STEP 3: Bismillah Calligraphy */}
        <div className="mb-3 sm:mb-6 anim-hero-bismillah">
          <div className="inline-flex flex-col items-center">
            {/* Arabic Decorative Accent Text */}
            <span
              className="font-arabic-calligraphy text-2xl sm:text-3xl md:text-4xl text-[#fcecd2] tracking-wider leading-relaxed drop-shadow-[0_2px_12px_rgba(212,178,116,0.25)]"
              dir="rtl"
            >
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </span>
            {/* Symmetrical fine hairline flourish */}
            <div className="flex items-center justify-center gap-2 mt-1 w-28 sm:w-44">
              <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#d4b274]/50" />
              <span className="w-1 h-1 rounded-full bg-[#d4b274]" />
              <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#d4b274]/50" />
            </div>
          </div>
        </div>

        {/* SEQUENCE STEP 4: Main Heading ("Welcome to Eiffel Home") with elegant upward reveal */}
        <div className="my-1 sm:my-3 anim-hero-heading w-full">
          <h1 className="flex flex-col items-center">
            <span className="font-serif-luxury italic text-lg sm:text-2xl md:text-3xl text-[#f3ede2]/90 font-light tracking-wide mb-1 sm:mb-2">
              Welcome to
            </span>
            <span className="font-display-regal text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.1em] sm:tracking-[0.14em] uppercase gold-gradient-text leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
              {residenceName}
            </span>
          </h1>
        </div>

        {/* SEQUENCE STEP 5: Subheading & Supporting Text */}
        <div className="space-y-3 sm:space-y-4 max-w-xl mx-auto mt-2 sm:mt-3 anim-hero-subtitle">
          {/* Subheading */}
          <div className="flex items-center justify-center gap-2.5">
            <span className="w-6 h-[1px] bg-gradient-to-r from-transparent to-[#d4b274]/60" />
            <h2 className="font-serif-luxury italic text-base sm:text-xl md:text-2xl text-[#d4b274] font-normal tracking-wide">
              {tagline}
            </h2>
            <span className="w-6 h-[1px] bg-gradient-to-l from-transparent to-[#d4b274]/60" />
          </div>

          {/* Supporting Text */}
          <p className="text-xs sm:text-sm md:text-base text-[#faf7f2]/85 font-light leading-relaxed px-3 sm:px-4">
            With gratitude to Allah, we invite you to celebrate the joy of our new home with us.
          </p>
        </div>

        {/* SEQUENCE STEP 6: CTA ("View Invitation") */}
        <div className="mt-8 sm:mt-10 anim-hero-cta">
          <a
            href="#invitation"
            onClick={handleViewInvitation}
            className="luxury-btn-primary group relative inline-flex items-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#d4b274] via-[#f5e6cc] to-[#c5a059] text-[#052019] text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase shadow-[0_4px_24px_rgba(212,178,116,0.3)] hover:shadow-[0_6px_36px_rgba(212,178,116,0.55)] cursor-pointer overflow-hidden"
            aria-label="Scroll smoothly to view the full invitation"
          >
            {/* Shimmer sweep effect across button */}
            <span className="absolute inset-0 w-1/2 h-full bg-white/25 -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />

            <span className="relative z-10 font-display-regal">
              View Invitation
            </span>
            <ChevronDown className="relative z-10 w-4 h-4 text-[#052019] group-hover:translate-y-0.5 transition-transform duration-300" />
          </a>
        </div>
      </div>

      {/* Subtle Dignified Scroll Cue at bottom (No aggressive bouncing) */}
      <div className="relative z-10 flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity duration-300 mt-2">
        <span className="text-[9px] tracking-[0.28em] uppercase text-[#d4b274]/70 font-light">
          Scroll to explore
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-[#d4b274] animate-pulse-subtle" />
      </div>
    </section>
  );
};

