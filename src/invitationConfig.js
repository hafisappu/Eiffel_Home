/**
 * =============================================================================
 * EIFFEL HOME — DIGITAL INVITATION CONFIGURATION
 * =============================================================================
 *
 * Easily customize all event details, dates, times, locations, contact info,
 * and navigation links here in one central location.
 *
 * All components across the website automatically reflect these values.
 *
 * QUICK PLACEHOLDER REPLACEMENT GUIDE:
 * -----------------------------------------------------------------------------
 * • [DATE]         -> Update `date`, `islamicDate`, and `isoTargetDate`
 * • [TIME]         -> Update `time` and `timeDetail`
 * • [LOCATION]     -> Update `locationName`, `venueName`, and `city`
 * • [FULL ADDRESS] -> Update `fullAddress`
 * -----------------------------------------------------------------------------
 */

export const INVITATION_CONFIG = {
  // ---------------------------------------------------------------------------
  // HOUSE / RESIDENCE IDENTITY
  // ---------------------------------------------------------------------------
  residenceName: "EIFFEL HOME",
  tagline: "A New Beginning, A New Blessing",
  familySignature: "The Eiffel Family",
  city: "Calicut, Kerala",

  // ---------------------------------------------------------------------------
  // 1. [DATE] & ISLAMIC CALENDAR
  // Replace with your exact celebration date:
  // ---------------------------------------------------------------------------
  date: "Tuesday, 22 December 2026",
  islamicDate: "13 Rajab 1448",
  isoTargetDate: "2026-12-22T10:30:00+05:30", // ISO string for live countdown timer

  // ---------------------------------------------------------------------------
  // 2. [TIME] & PROGRAM DETAILS
  // Replace with your exact celebration start time:
  // ---------------------------------------------------------------------------
  time: "10:30 AM Onwards",
  timeDetail: "Dua & Reception",

  // ---------------------------------------------------------------------------
  // 3. [LOCATION] & VENUE
  // Replace with your venue and city details:
  // ---------------------------------------------------------------------------
  venueName: "Eiffel Home",
  venueType: "New Residence",
  locationName: "Calicut, Kerala",
  locationDetail: "Green Valley Avenue",

  // ---------------------------------------------------------------------------
  // 4. [FULL ADDRESS]
  // Replace with your full postal address:
  // ---------------------------------------------------------------------------
  fullAddress: "Eiffel Home, Green Valley Avenue, Near Mini Bypass, Calicut, Kerala 673014",

  // ---------------------------------------------------------------------------
  // 5. GOOGLE MAPS NAVIGATION URL
  // Replace with your exact Google Maps pin link:
  // ---------------------------------------------------------------------------
  googleMapsUrl: "https://maps.google.com/?q=Eiffel+Home+Calicut",

  // ---------------------------------------------------------------------------
  // 6. HOST WHATSAPP CONTACT
  // Enter host country code + phone number with no spaces, plus, or dashes:
  // ---------------------------------------------------------------------------
  hostWhatsAppNumber: "919876543210",

  // ---------------------------------------------------------------------------
  // 7. RSVP DEADLINE
  // ---------------------------------------------------------------------------
  rsvpDeadline: "18 December 2026",

  // ---------------------------------------------------------------------------
  // 8. CELEBRATION SCHEDULE / ORDER OF EVENTS
  // ---------------------------------------------------------------------------
  schedule: [
    {
      time: "10:30 AM",
      title: "Dua & House Blessing",
      desc: "Sacred Quran recitation and invocation of barakah, seeking peace and divine protection for the new home.",
      badge: "Spiritual Opening"
    },
    {
      time: "11:30 AM",
      title: "Welcome & House Tour",
      desc: "Formal reception of family and guests, opening of the portal, and discovering the home’s sunlit spaces.",
      badge: "Reception"
    },
    {
      time: "12:30 PM",
      title: "Grand Malabar Feast",
      desc: "A rich culinary feast featuring traditional Malabar dum biriyani, slow-cooked delicacies, and accompaniments.",
      badge: "Dawat"
    },
    {
      time: "04:30 PM",
      title: "Evening Tea & Halwa Gathering",
      desc: "Warm Sulaimani chai, Kozhikodan halwa, light savouries, and tranquil conversations under the courtyard sky.",
      badge: "Fellowship"
    }
  ]
};
