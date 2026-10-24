import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Heart,
  MessageSquare,
  Users,
  User,
  Phone,
  X,

  Sparkles
} from 'lucide-react';
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
 * RsvpSection - "We Would Love to See You"
 */
export const RsvpSection = ({
  hostWhatsAppNumber = INVITATION_CONFIG.hostWhatsAppNumber,
  rsvpDeadline = INVITATION_CONFIG.rsvpDeadline,
  formUrl = null,
  onConfirmPresence = null,
  onSendMessage = null
}) => {
  const [sectionRef, inView] = useInView({ threshold: 0.15, triggerOnce: true });
  const prefersReducedMotion = usePrefersReducedMotion();

  // Modal dialog states
  const [isRsvpModalOpen, setIsRsvpModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form states
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [attendance, setAttendance] = useState('attending'); // 'attending' | 'regret'
  const [guestCount, setGuestCount] = useState('2');
  const [duaMessage, setDuaMessage] = useState('');

  // Quick message modal state
  const [quickSender, setQuickSender] = useState('');
  const [quickMessage, setQuickMessage] = useState(
    'Assalamu Alaikum! Sending our heartfelt congratulations on your new home, Eiffel Home. May Allah bless it with endless barakah, peace, and prosperity.'
  );

  const isRevealed = inView || prefersReducedMotion;

  // Keyboard Accessibility: Close on Escape key & manage scroll lock
  useEffect(() => {
    const isAnyModalOpen = isRsvpModalOpen || isMessageModalOpen;
    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setIsRsvpModalOpen(false);
          setIsMessageModalOpen(false);
          setSubmitted(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isRsvpModalOpen, isMessageModalOpen]);

  // Handle Primary Button click ("Confirm Your Presence")
  const handlePrimaryClick = () => {
    if (formUrl) {
      window.open(formUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    if (onConfirmPresence) {
      onConfirmPresence();
      return;
    }
    // Default: Open the elegant RSVP form modal
    setIsRsvpModalOpen(true);
  };

  // Handle Secondary Button click ("Send a Message")
  const handleSecondaryClick = () => {
    if (onSendMessage) {
      onSendMessage();
      return;
    }
    setIsMessageModalOpen(true);
  };

  // Handle RSVP Submission
  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    // Gentle celebration confetti (subtle, elegant gold & emerald)
    try {
      confetti({
        particleCount: 55,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#d4b274', '#0e3d32', '#fcecd2', '#17483b', '#faf7f2']
      });
    } catch {
      // Ignore if confetti not supported
    }

    // Format WhatsApp confirmation text
    const text = encodeURIComponent(
      `Assalamu Alaikum! 🏡\n\n` +
      `RSVP Confirmation for *Eiffel Home* Housewarming Celebration:\n\n` +
      `• *Name:* ${guestName}\n` +
      `• *Attendance:* ${attendance === 'attending' ? 'Joyfully Attending ✅' : 'Regretfully Unable to Attend ❌'}\n` +
      (attendance === 'attending' ? `• *Family Members:* ${guestCount}\n` : '') +
      (guestPhone ? `• *Contact:* ${guestPhone}\n` : '') +
      (duaMessage ? `• *Dua / Wishes:* ${duaMessage}\n` : '') +
      `\nBarakallahu Feekum!`
    );

    const waLink = `https://wa.me/${hostWhatsAppNumber}?text=${text}`;

    // Open WhatsApp in a new tab if valid number provided
    if (hostWhatsAppNumber) {
      window.open(waLink, '_blank', 'noopener,noreferrer');
    }

    setSubmitted(true);
  };

  // Handle Quick Message WhatsApp send
  const handleQuickMessageSubmit = (e) => {
    e.preventDefault();
    const senderGreeting = quickSender.trim() ? ` (From: ${quickSender})` : '';
    const text = encodeURIComponent(`${quickMessage}${senderGreeting}`);
    const waLink = `https://wa.me/${hostWhatsAppNumber}?text=${text}`;
    window.open(waLink, '_blank', 'noopener,noreferrer');
    setIsMessageModalOpen(false);
  };

  return (
    <section
      id="rsvp"
      ref={sectionRef}
      className="relative py-24 sm:py-32 md:py-36 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#041913] via-[#052119] to-[#041913] overflow-hidden"
      aria-label="RSVP and Guest Wishes"
    >
      {/* =========================================================
          1. SUBTLE ISLAMIC GEOMETRIC PATTERN
          Slowly moving background pattern (respects reduced motion)
         ========================================================= */}
      <GirihLatticePattern opacity={0.045} animated={true} />

      {/* 2. Soft Ambient Atmospheric Glow */}
      <SoftRadialGlow
        size="w-[650px] h-[650px]"
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-65"
        color="champagne"
      />
      <SoftRadialGlow
        size="w-[450px] h-[450px]"
        className="bottom-10 -right-20 opacity-30"
        color="emerald"
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* =========================================================
            BEAUTIFUL CENTERED RSVP PANEL
            - Islamic arch framing
            - Fades upward on scroll entrance
            - Elegant typography & serene spacing
           ========================================================= */}
        <div
          className={`relative transition-all duration-1000 ease-out transform ${
            isRevealed
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-8 scale-[0.98]'
          }`}
        >
          {/* Outer Arch Halo Border */}
          <div className="relative p-1 sm:p-2 rounded-t-[80px] sm:rounded-t-[130px] md:rounded-t-[170px] rounded-b-2xl sm:rounded-b-[40px] bg-gradient-to-b from-[#d4b274]/40 via-[#d4b274]/15 to-[#d4b274]/30 shadow-[0_30px_90px_rgba(0,0,0,0.7)]">
            
            {/* Concentric Hairline Guide */}
            <div className="absolute inset-1.5 sm:inset-3 rounded-t-[74px] sm:rounded-t-[124px] md:rounded-t-[164px] rounded-b-[20px] sm:rounded-b-[34px] border border-[#d4b274]/25 pointer-events-none" />

            {/* Arch Apex Keystone Medallion */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
              <div className="p-1 rounded-full bg-[#052019] border border-[#d4b274]/60 shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
                <CrescentMedallion size={26} />
              </div>
            </div>

            {/* Inner Emerald Glass Panel */}
            <div className="relative overflow-hidden rounded-t-[72px] sm:rounded-t-[122px] md:rounded-t-[162px] rounded-b-[18px] sm:rounded-b-[32px] bg-gradient-to-b from-[#082f25]/95 via-[#05231c]/95 to-[#041913]/95 backdrop-blur-xl border border-[#d4b274]/20 p-6 sm:p-10 md:p-16 text-center shadow-inner">
              
              {/* Corner Arabesque Framing */}
              <CornerArabesque className="opacity-40" />

              {/* Watermark Girih Star in Center */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035]" aria-hidden="true">
                <svg width="400" height="400" viewBox="0 0 100 100" fill="none">
                  <polygon points="50,10 62,38 90,50 62,62 50,90 38,62 10,50 38,38" stroke="#d4b274" strokeWidth="1" />
                  <circle cx="50" cy="50" r="30" stroke="#d4b274" strokeWidth="0.5" strokeDasharray="2 2" />
                </svg>
              </div>

              <div className="relative z-10 max-w-xl mx-auto">
                {/* Emblem / Micro Inscription */}
                <div className="mb-4 inline-flex items-center justify-center">
                  <EiffelEmblem size={44} />
                </div>

                <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#d4b274] font-medium mb-3">
                  Housewarming Celebration
                </div>

                {/* =====================================================
                    EXACT HEADING: "We Would Love to See You"
                   ===================================================== */}
                <h2 className="font-display-regal text-2xl sm:text-4xl md:text-5xl font-bold tracking-[0.06em] sm:tracking-[0.08em] text-[#fcecd2] drop-shadow-[0_4px_20px_rgba(212,178,116,0.2)] mb-4">
                  We Would Love to See You
                </h2>

                {/* Symmetrical Arabesque Divider */}
                <ArabesqueDivider className="my-5" width="max-w-xs sm:max-w-sm" />

                {/* =====================================================
                    EXACT TEXT:
                    "Your presence and prayers mean a great deal to us.
                     Please let us know if you will be joining us."
                   ===================================================== */}
                <div className="space-y-1.5 sm:space-y-2 mb-8 sm:mb-10 max-w-lg mx-auto">
                  <p className="font-serif-luxury italic text-base sm:text-lg md:text-xl text-[#f6f1e7]/90 font-normal leading-relaxed">
                    “Your presence and prayers mean a great deal to us.
                  </p>
                  <p className="font-serif-luxury italic text-base sm:text-lg md:text-xl text-[#f6f1e7]/90 font-normal leading-relaxed">
                    Please let us know if you will be joining us.”
                  </p>
                </div>

                {/* =====================================================
                    BUTTONS WITH SUBTLE HOVER GLOW
                    - Primary: "Confirm Your Presence"
                    - Secondary: "Send a Message"
                    - No excessive bouncing or flashy animations
                   ===================================================== */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 max-w-md mx-auto">
                  {/* Primary Button */}
                  <button
                    type="button"
                    onClick={handlePrimaryClick}
                    className="luxury-btn-primary min-h-[48px] w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-full bg-gradient-to-r from-[#d4b274] via-[#f1dfbe] to-[#c7a460] text-[#041a14] font-semibold text-xs sm:text-sm tracking-[0.14em] uppercase shadow-[0_4px_20px_rgba(212,178,116,0.25)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#d4b274]/50"
                    aria-label="Confirm Your Presence for Eiffel Home"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#041a14]" />
                    <span>Confirm Your Presence</span>
                  </button>

                  {/* Secondary Button */}
                  <button
                    type="button"
                    onClick={handleSecondaryClick}
                    className="luxury-btn-secondary min-h-[48px] w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-full bg-[#031913]/70 hover:bg-[#072c21] text-[#fcecd2] border border-[#d4b274]/40 hover:border-[#d4b274]/80 text-xs sm:text-sm font-medium tracking-[0.12em] uppercase shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#d4b274]/50"
                    aria-label="Send a Message to the host"
                  >
                    <MessageSquare className="w-4 h-4 text-[#d4b274]" />
                    <span>Send a Message</span>
                  </button>
                </div>

                {/* Discreet Guidance Subtext */}
                <div className="mt-8 pt-6 border-t border-[#d4b274]/15">
                  <span className="text-[11px] sm:text-xs text-[#d4b274]/80 font-light tracking-wide">
                    Responses are gratefully requested by <strong>{rsvpDeadline}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          MODAL 1: RSVP FORM DIALOG ("Confirm Your Presence")
          Prepared to connect to WhatsApp or external form
         ========================================================= */}
      {isRsvpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020e0a]/85 backdrop-blur-md animate-fadeIn">
          <div
            className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#072d24] via-[#052119] to-[#041913] border border-[#d4b274]/40 p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.85)] max-h-[92vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="rsvp-modal-title"
          >
            {/* Corner Arabesques */}
            <CornerArabesque className="opacity-40" />

            {/* Close Button */}
            <button
              onClick={() => {
                setIsRsvpModalOpen(false);
                setSubmitted(false);
              }}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-[#031913]/80 border border-[#d4b274]/30 text-[#fcecd2] hover:bg-[#072c21] transition-colors cursor-pointer"
              aria-label="Close RSVP Dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {submitted ? (
              /* Success State */
              <div className="py-8 text-center space-y-5">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#d4b274]/20 border border-[#d4b274] flex items-center justify-center text-[#d4b274] shadow-[0_0_25px_rgba(212,178,116,0.35)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="font-arabic-calligraphy text-2xl text-[#fcecd2]" dir="rtl">
                  جَزَاكُمُ اللَّهُ خَيْرًا
                </div>
                <h3 className="font-display-regal text-2xl font-bold text-[#fcecd2]">
                  Thank You, {guestName}!
                </h3>
                <p className="text-sm text-[#f6f1e7]/85 font-light leading-relaxed max-w-md mx-auto">
                  {attendance === 'attending'
                    ? "Your presence has been gratefully recorded. We look forward to celebrating this blessed milestone together at Eiffel Home!"
                    : "Your warm wishes and prayers have been received with heartfelt gratitude. You will be warmly remembered in our gathering."}
                </p>
                <div className="pt-3">
                  <button
                    onClick={() => {
                      setIsRsvpModalOpen(false);
                      setSubmitted(false);
                    }}
                    className="min-h-[44px] px-6 py-2.5 rounded-full bg-[#d4b274] text-[#041a14] text-xs font-semibold uppercase tracking-wider hover:bg-[#fcecd2] transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* RSVP Entry Form */
              <div>
                <div className="text-center mb-6">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-[#d4b274] font-medium">
                    RSVP Response
                  </span>
                  <h3 id="rsvp-modal-title" className="font-display-regal text-2xl sm:text-3xl font-bold text-[#fcecd2] mt-1">
                    Confirm Your Presence
                  </h3>
                  <p className="font-serif-luxury italic text-xs sm:text-sm text-[#d4b274]/80 mt-1">
                    Eiffel Home • Housewarming Celebration
                  </p>
                </div>

                <form onSubmit={handleRsvpSubmit} className="space-y-4 sm:space-y-5 text-left">
                  {/* Attendance Choice */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.18em] text-[#d4b274] font-medium mb-2">
                      Will you be joining us? *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setAttendance('attending')}
                        className={`min-h-[46px] py-3 px-3 rounded-xl text-xs font-semibold tracking-wider uppercase border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          attendance === 'attending'
                            ? 'bg-gradient-to-r from-[#d4b274] to-[#c7a460] text-[#041a14] border-[#d4b274] shadow-md'
                            : 'bg-[#031913]/70 text-[#f6f1e7]/80 border-[#d4b274]/30 hover:border-[#d4b274]'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Attending</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setAttendance('regret')}
                        className={`min-h-[46px] py-3 px-3 rounded-xl text-xs font-semibold tracking-wider uppercase border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          attendance === 'regret'
                            ? 'bg-[#0f3d32] text-[#fcecd2] border-[#d4b274] shadow-md'
                            : 'bg-[#031913]/70 text-[#f6f1e7]/80 border-[#d4b274]/30 hover:border-[#d4b274]'
                        }`}
                      >
                        <Heart className="w-4 h-4" />
                        <span>Unable</span>
                      </button>
                    </div>
                  </div>

                  {/* Guest Full Name */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.18em] text-[#fcecd2] font-medium mb-1.5">
                      Your Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#d4b274] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mohammed Farhan"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full min-h-[46px] pl-10 pr-4 py-2.5 rounded-xl bg-[#031913]/90 border border-[#d4b274]/30 text-sm text-[#faf7f2] placeholder-[#faf7f2]/40 focus:outline-none focus:border-[#d4b274] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Guest Phone / WhatsApp */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.18em] text-[#fcecd2] font-medium mb-1.5">
                      Phone Number (Optional)
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#d4b274] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full min-h-[46px] pl-10 pr-4 py-2.5 rounded-xl bg-[#031913]/90 border border-[#d4b274]/30 text-sm text-[#faf7f2] placeholder-[#faf7f2]/40 focus:outline-none focus:border-[#d4b274] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Number of Family Members (If Attending) */}
                  {attendance === 'attending' && (
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.18em] text-[#fcecd2] font-medium mb-1.5">
                        Number of Family Members
                      </label>
                      <div className="relative">
                        <Users className="w-4 h-4 text-[#d4b274] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <select
                          value={guestCount}
                          onChange={(e) => setGuestCount(e.target.value)}
                          className="w-full min-h-[46px] pl-10 pr-4 py-2.5 rounded-xl bg-[#031913]/90 border border-[#d4b274]/30 text-sm text-[#faf7f2] focus:outline-none focus:border-[#d4b274] transition-colors cursor-pointer appearance-none"
                        >
                          <option value="1" className="bg-[#041913]">1 Person</option>
                          <option value="2" className="bg-[#041913]">2 Family Members</option>
                          <option value="3" className="bg-[#041913]">3 Family Members</option>
                          <option value="4" className="bg-[#041913]">4 Family Members</option>
                          <option value="5+" className="bg-[#041913]">5+ Family Members</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Dua or Warm Message */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.18em] text-[#fcecd2] font-medium mb-1.5">
                      Dua or Message for the Family (Optional)
                    </label>
                    <textarea
                      rows="2"
                      placeholder="May Allah bless this home with barakah, health, and peace..."
                      value={duaMessage}
                      onChange={(e) => setDuaMessage(e.target.value)}
                      className="w-full p-3 rounded-xl bg-[#031913]/90 border border-[#d4b274]/30 text-sm text-[#faf7f2] placeholder-[#faf7f2]/40 focus:outline-none focus:border-[#d4b274] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full min-h-[48px] py-3.5 px-6 rounded-full bg-gradient-to-r from-[#d4b274] via-[#f1dfbe] to-[#c7a460] text-[#041a14] font-semibold text-xs sm:text-sm tracking-[0.16em] uppercase shadow-[0_4px_20px_rgba(212,178,116,0.3)] hover:shadow-[0_0_25px_rgba(212,178,116,0.45)] transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
                    >
                      <Sparkles className="w-4 h-4 text-[#041a14]" />
                      <span>Submit RSVP & Connect via WhatsApp</span>
                    </button>
                    <p className="text-[10px] text-center text-[#d4b274]/70 mt-2 font-light">
                      Submitting prepares a pre-filled confirmation directly to the host's WhatsApp
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL 2: SEND A MESSAGE DIALOG ("Send a Message")
          Quick dua / blessing direct to host
         ========================================================= */}
      {isMessageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020e0a]/85 backdrop-blur-md animate-fadeIn">
          <div
            className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-[#072d24] via-[#052119] to-[#041913] border border-[#d4b274]/40 p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.85)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="message-modal-title"
          >
            <CornerArabesque className="opacity-40" />

            <button
              onClick={() => setIsMessageModalOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-[#031913]/80 border border-[#d4b274]/30 text-[#fcecd2] hover:bg-[#072c21] transition-colors cursor-pointer"
              aria-label="Close Message Dialog"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-6">
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#d4b274] font-medium">
                Heartfelt Wishes
              </span>
              <h3 id="message-modal-title" className="font-display-regal text-2xl font-bold text-[#fcecd2] mt-1">
                Send a Message
              </h3>
              <p className="font-serif-luxury italic text-xs sm:text-sm text-[#d4b274]/80 mt-1">
                Share your dua & greetings with the family
              </p>
            </div>

            <form onSubmit={handleQuickMessageSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-[11px] uppercase tracking-[0.18em] text-[#fcecd2] font-medium mb-1.5">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Uncle Rashid & Family"
                  value={quickSender}
                  onChange={(e) => setQuickSender(e.target.value)}
                  className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-[#031913]/90 border border-[#d4b274]/30 text-sm text-[#faf7f2] placeholder-[#faf7f2]/40 focus:outline-none focus:border-[#d4b274] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.18em] text-[#fcecd2] font-medium mb-1.5">
                  Your Message / Dua
                </label>
                <textarea
                  rows="4"
                  required
                  value={quickMessage}
                  onChange={(e) => setQuickMessage(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-[#031913]/90 border border-[#d4b274]/30 text-sm text-[#faf7f2] focus:outline-none focus:border-[#d4b274] transition-colors resize-none leading-relaxed"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full min-h-[48px] py-3.5 px-6 rounded-full bg-gradient-to-r from-[#d4b274] via-[#f1dfbe] to-[#c7a460] text-[#041a14] font-semibold text-xs sm:text-sm tracking-[0.16em] uppercase shadow-[0_4px_20px_rgba(212,178,116,0.3)] hover:shadow-[0_0_25px_rgba(212,178,116,0.45)] transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
                >
                  <MessageSquare className="w-4 h-4 text-[#041a14]" />
                  <span>Send via WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
