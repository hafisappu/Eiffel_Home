import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { EiffelEmblem } from './GeometricPattern';
import { AudioAmbience } from './AudioAmbience';
import { INVITATION_CONFIG } from '../invitationConfig';

export const Navbar = ({
  residenceName = INVITATION_CONFIG.residenceName
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on Escape and prevent body scroll
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Invitation", href: "#invitation" },
    { name: "Eiffel Home", href: "#showcase" },
    { name: "Celebration", href: "#schedule" },
    { name: "Location", href: "#location" },
    { name: "RSVP", href: "#rsvp" },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 px-4 md:px-8 py-3 md:py-4 ${
          scrolled ? 'bg-[#041913]/90 backdrop-blur-xl border-b border-[#d4b274]/20 shadow-2xl py-2.5' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo Brand */}
          <a
            href="#invitation"
            className="flex items-center gap-2 sm:gap-3 group focus:outline-none shrink-0"
            aria-label="Eiffel Home Housewarming Home"
          >
            <EiffelEmblem size={30} className="sm:w-[34px] sm:h-[34px] group-hover:scale-105 transition-transform duration-300 shrink-0" />
            <div className="flex flex-col text-left">
              <span className="font-display-regal text-sm sm:text-base md:text-lg font-semibold tracking-[0.16em] sm:tracking-[0.18em] text-[#faf7f2] group-hover:text-[#fcecd2] transition-colors leading-tight">
                {residenceName}
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.2em] sm:tracking-[0.25em] text-[#d4b274] uppercase font-light">
                Housewarming Celebration
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-[0.18em] font-medium text-[#f6f1e7]/80 hover:text-[#d4b274] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[1px] after:bg-[#d4b274] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Controls: Audio Ambience & Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <AudioAmbience />

            <a
              href="#rsvp"
              className="luxury-btn-primary hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#c9a86a] via-[#e5cb9b] to-[#bfa063] text-[#052019] text-xs font-semibold tracking-wider uppercase shadow hover:shadow-[0_0_15px_rgba(212,178,116,0.4)] cursor-pointer"
            >
              <span>RSVP</span>
            </a>

            {/* Mobile Menu Hamburger (44px min touch target) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl emerald-glass gold-card-border text-[#fcecd2] focus:outline-none cursor-pointer active:scale-95 transition-transform"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden bg-[#041913]/95 backdrop-blur-2xl flex flex-col justify-center px-6 sm:px-8 py-20 animate-fadeIn"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="flex flex-col items-center gap-5 text-center max-w-sm mx-auto w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <EiffelEmblem size={56} />
            <h2 className="font-display-regal text-xl text-[#fcecd2] tracking-[0.2em] uppercase">
              {residenceName}
            </h2>
            <div className="w-16 h-[1px] bg-[#d4b274]/50" />

            <nav className="flex flex-col gap-2 w-full">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="min-h-[48px] flex items-center justify-center py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#f6f1e7] active:bg-[#0e3d32] active:text-[#d4b274] transition-colors border border-transparent active:border-[#d4b274]/30"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="flex flex-col items-center gap-3 pt-3 w-full">
              <a
                href="#rsvp"
                onClick={handleLinkClick}
                className="luxury-btn-primary min-h-[46px] w-full flex items-center justify-center px-6 py-2.5 rounded-full bg-gradient-to-r from-[#d4b274] to-[#c7a460] text-[#052019] text-xs font-semibold tracking-wider uppercase cursor-pointer"
              >
                RSVP Now
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
