import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { InvitationCover } from './components/InvitationCover';
import { InvitationMessageSection } from './components/InvitationMessageSection';
import { HouseShowcaseSection } from './components/HouseShowcaseSection';
import { EventDetailsSection } from './components/EventDetailsSection';
import { LocationSection } from './components/LocationSection';
import { RsvpSection } from './components/RsvpSection';
import { BlessingSection } from './components/BlessingSection';

function App() {
  const [isUnveiled, setIsUnveiled] = useState(false);

  const handleOpenInvitation = () => {
    setIsUnveiled(true);
    // Smoothly ensure page begins at the top of the formal invitation card
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen bg-[#041913] text-[#faf7f2] relative selection:bg-[#d4b274]/30 selection:text-[#faf7f2]">
      {/* 1. Full-Screen Cinematic Invitation Cover / Unveiling Opening */}
      {!isUnveiled && (
        <InvitationCover onOpenInvitation={handleOpenInvitation} />
      )}

      {/* 2. Navigation Bar (Only visible once the invitation has been unveiled) */}
      {isUnveiled && (
        <Navbar />
      )}

      {/* 3. Main Digital Invitation Content (Begins at "You Are Cordially Invited") */}
      {isUnveiled && (
        <main className="anim-page-load">
          {/* Section 1: Formal Invitation Card ("You Are Cordially Invited") */}
          <InvitationMessageSection />

          {/* Section 2: Eiffel Home Dedicated Showcase */}
          <HouseShowcaseSection />

          {/* Section 3: Event Details & Celebration Schedule */}
          <EventDetailsSection />

          {/* Section 4: Location & Turn-by-Turn Directions */}
          <LocationSection />

          {/* Section 5: RSVP & Guest Wishes */}
          <RsvpSection />

          {/* Section 6: Closing Blessing & Footer */}
          <BlessingSection />
        </main>
      )}
    </div>
  );
}

export default App;
