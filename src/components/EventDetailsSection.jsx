import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  Home,
  MapPin,
  Utensils,
  BookOpen,
  Sunset,
  HeartHandshake
} from 'lucide-react';
import {
  GirihLatticePattern,
  SoftRadialGlow,
  CornerArabesque,
  ArabesqueDivider,
  CrescentMedallion
} from './GeometricPattern';
import { useInView, usePrefersReducedMotion } from '../hooks/useInView';
import { INVITATION_CONFIG } from '../invitationConfig';

export const EventDetailsSection = ({
  date = INVITATION_CONFIG.date,
  islamicDate = INVITATION_CONFIG.islamicDate,
  time = INVITATION_CONFIG.time,
  timeDetail = INVITATION_CONFIG.timeDetail,
  venue = INVITATION_CONFIG.venueName,
  venueDetail = INVITATION_CONFIG.venueType,
  location = INVITATION_CONFIG.locationName,
  locationDetail = INVITATION_CONFIG.locationDetail,
  isoTargetDate = INVITATION_CONFIG.isoTargetDate,
  schedule = INVITATION_CONFIG.schedule
}) => {
  const [sectionRef, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const prefersReducedMotion = usePrefersReducedMotion();
  const isRevealed = inView || prefersReducedMotion;

  // Countdown timer to event date
  const targetDate = new Date(isoTargetDate).getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      if (isNaN(targetDate)) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  // Compute dynamic ISO calendar string with safe fallback
  const getCalendarTimes = () => {
    try {
      const d = new Date(isoTargetDate);
      if (!isNaN(d.getTime())) {
        const startStr = d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        const endD = new Date(d.getTime() + 6 * 3600 * 1000);
        const endStr = endD.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        return { dtStart: startStr, dtEnd: endStr };
      }
    } catch {
      // fallback
    }
    return { dtStart: '20261114T050000Z', dtEnd: '20261114T143000Z' };
  };

  const { dtStart, dtEnd } = getCalendarTimes();

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `${venue} Housewarming Celebration`
  )}&dates=${dtStart}/${dtEnd}&details=${encodeURIComponent(
    `Housewarming celebration & house blessing at ${venue}, ${location}. Join us for prayers, fellowship, and a traditional Malabar feast.`
  )}&location=${encodeURIComponent(`${venue}, ${location}`)}`;

  // 4 Primary Information Cards
  const infoCards = [
    {
      label: "DATE",
      value: date,
      detail: islamicDate,
      icon: Calendar,
      ariaLabel: "Event Date"
    },
    {
      label: "TIME",
      value: time,
      detail: timeDetail,
      icon: Clock,
      ariaLabel: "Event Time"
    },
    {
      label: "VENUE",
      value: venue,
      detail: venueDetail,
      icon: Home,
      ariaLabel: "Event Venue"
    },
    {
      label: "LOCATION",
      value: location,
      detail: locationDetail,
      icon: MapPin,
      ariaLabel: "Event Location"
    }
  ];

  // Schedule items mapped with icons
  const iconMap = [BookOpen, HeartHandshake, Utensils, Sunset];
  const scheduleItems = (schedule || []).map((item, idx) => ({
    ...item,
    icon: iconMap[idx % iconMap.length]
  }));

  return (
    <section
      id="schedule"
      ref={sectionRef}
      aria-label="Event Details and Schedule for Eiffel Home Celebration"
      className="relative py-24 sm:py-32 px-4 sm:px-6 bg-[#041913] overflow-hidden"
    >
      {/* 1. Subtle parallax geometric pattern */}
      <GirihLatticePattern opacity={0.045} animated={true} />

      {/* 2. Soft radial glow */}
      <SoftRadialGlow size="w-[650px] h-[650px]" className="top-1/4 left-1/2 -translate-x-1/2 opacity-60" color="champagne" />

      {/* 3. Gentle Animated Decorative Islamic Arch behind the section */}
      <div className="absolute top-28 sm:top-36 left-1/2 -translate-x-1/2 w-[92vw] max-w-[880px] h-[520px] sm:h-[460px] pointer-events-none z-0">
        <div className="relative w-full h-full arch-top border border-[#d4b274]/20 bg-gradient-to-b from-[#d4b274]/[0.05] via-[#082d24]/15 to-transparent anim-soft-glow">
          {/* Inner concentric arch line */}
          <div className="absolute inset-2 sm:inset-3 arch-top border border-[#d4b274]/10 pointer-events-none" />
          
          {/* Subtle Arch Peak Keystone */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <CrescentMedallion size={24} />
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Heading */}
        <div
          className={`text-center max-w-2xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ease-out transform ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4b274]" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.26em] text-[#d4b274] font-medium">
              Event Details
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4b274]" />
          </div>

          <h2 className="font-display-regal text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.1em] text-[#fcecd2]">
            Join Us for the Celebration
          </h2>

          <ArabesqueDivider className="my-5" />
        </div>

        {/* 4 Elegant Information Cards (Stacked on mobile, 4-col on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {infoCards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <div
                key={idx}
                style={{
                  transitionDelay: prefersReducedMotion ? '0ms' : `${idx * 120 + 200}ms`
                }}
                className={`luxury-card-interactive group relative p-6 sm:p-7 rounded-2xl emerald-glass gold-card-border shadow-xl overflow-hidden flex flex-col items-center text-center transition-all duration-700 ease-out transform ${
                  isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {/* Hairline Corner Arabesques */}
                <CornerArabesque className="opacity-40 group-hover:opacity-80 transition-opacity" />

                {/* Minimalist Monochrome/Champagne Icon */}
                <div className="w-12 h-12 rounded-full bg-[#031913]/90 border border-[#d4b274]/35 flex items-center justify-center text-[#d4b274] mb-4 group-hover:scale-110 group-hover:border-[#d4b274]/70 transition-all duration-300 shadow-inner shrink-0">
                  <IconComponent className="w-5 h-5 text-[#d4b274]" strokeWidth={1.35} />
                </div>

                {/* Card Label */}
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.26em] text-[#d4b274] font-semibold mb-1.5">
                  {card.label}
                </span>

                {/* Card Main Value */}
                <h3 className="font-display-regal text-base sm:text-lg font-bold text-[#fcecd2] mb-1 leading-snug">
                  {card.value}
                </h3>

                {/* Card Subtle Detail */}
                <span className="text-xs text-[#faf7f2]/65 font-light">
                  {card.detail}
                </span>
              </div>
            );
          })}
        </div>

        {/* Small Elegant Line Underneath */}
        <div className="mt-10 sm:mt-12 text-center max-w-xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent to-[#d4b274]/50" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4b274]" />
            <span className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-transparent to-[#d4b274]/50" />
          </div>

          <p className="font-serif-luxury italic text-base sm:text-xl md:text-2xl text-[#d4b274] font-normal leading-relaxed">
            “Your presence will make our celebration even more special.”
          </p>
        </div>

        {/* Calendar Quick Actions & Live Countdown Card */}
        <div
          className={`mt-14 p-6 sm:p-8 rounded-3xl emerald-glass gold-card-border shadow-2xl relative overflow-hidden luxury-card-interactive transition-all duration-700 ease-out transform ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: prefersReducedMotion ? '0ms' : '650ms' }}
        >
          <CornerArabesque />
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4b274] font-semibold bg-[#d4b274]/15 px-3 py-1 rounded-full border border-[#d4b274]/30">
                Save The Date
              </span>
              <h4 className="font-display-regal text-xl sm:text-2xl font-bold text-[#fcecd2] mt-2 mb-1">
                {date}
              </h4>
              <p className="text-xs sm:text-sm text-[#f6f1e7]/75 font-light">
                Add the housewarming celebration to your calendar to receive timely reminders.
              </p>
            </div>

            {/* Calendar Quick Action */}
            <div className="flex items-center justify-center w-full md:w-auto">
              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="luxury-btn-primary min-h-[46px] w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#d4b274] via-[#f1dfbe] to-[#bfa063] text-[#052019] text-xs font-semibold tracking-wider uppercase shadow hover:shadow-lg cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Add to Google Calendar</span>
              </a>
            </div>
          </div>

          {/* Countdown timer */}
          <div className="mt-6 pt-6 border-t border-[#d4b274]/20">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#d4b274]/80 mb-3 text-center md:text-left font-medium">
              Countdown to the Gathering
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg">
              {[
                { label: 'Days', val: timeLeft.days },
                { label: 'Hours', val: timeLeft.hours },
                { label: 'Minutes', val: timeLeft.minutes },
                { label: 'Seconds', val: timeLeft.seconds },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl bg-[#031913]/80 border border-[#d4b274]/25"
                >
                  <span className="font-display-regal text-lg sm:text-xl font-bold text-[#fcecd2]">
                    {String(item.val).padStart(2, '0')}
                  </span>
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.14em] text-[#faf7f2]/60 mt-0.5">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Schedule Timeline */}
        <div className="relative mt-16">
          <div className="text-center mb-10">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4b274] font-medium">
              Order of Events
            </span>
            <h3 className="font-display-regal text-2xl sm:text-3xl font-bold text-[#fcecd2] mt-1">
              Celebration Schedule
            </h3>
          </div>

          {/* Vertical gold center line on desktop */}
          <div className="hidden md:block absolute left-1/2 top-16 bottom-4 w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-[#d4b274]/30 to-transparent" />

          <div className="space-y-6 sm:space-y-8">
            {scheduleItems.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className={`flex flex-col md:flex-row items-center gap-4 md:gap-8 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Card */}
                  <div className="w-full md:w-1/2">
                    <div
                      className={`p-6 sm:p-7 rounded-2xl emerald-glass gold-card-border hover:bg-[#093529]/80 transition-all duration-300 shadow-xl ${
                        isEven ? 'md:text-left' : 'md:text-right'
                      }`}
                    >
                      <div className={`flex items-center gap-2 mb-2 ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4b274] font-semibold bg-[#d4b274]/15 px-2.5 py-0.5 rounded-full border border-[#d4b274]/30">
                          {item.badge}
                        </span>
                        <span className="text-xs font-display-regal text-[#fcecd2] font-semibold">
                          {item.time}
                        </span>
                      </div>

                      <h4 className="font-display-regal text-lg sm:text-xl font-semibold text-[#fcecd2] mb-1.5">
                        {item.title}
                      </h4>

                      <p className="text-xs sm:text-sm text-[#f6f1e7]/75 font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Center Node on Timeline */}
                  <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-[#052019] border border-[#d4b274] text-[#d4b274] shadow-[0_0_15px_rgba(212,178,116,0.3)] z-10 shrink-0">
                    <IconComp className="w-5 h-5" strokeWidth={1.35} />
                  </div>

                  {/* Empty Spacer column for alignment */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

