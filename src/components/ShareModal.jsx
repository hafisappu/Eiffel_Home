import React, { useState, useEffect } from 'react';
import { X, Copy, Check, MessageCircle, Send, Share2 } from 'lucide-react';
import { EiffelEmblem, GoldDivider } from './GeometricPattern';
import { INVITATION_CONFIG } from '../invitationConfig';

export const ShareModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentUrl = window.location.href;
  const shareTitle = `${INVITATION_CONFIG.venueName} — Housewarming Invitation`;
  const shareText = `Assalamu Alaikum! You are warmly invited to the housewarming celebration of ${INVITATION_CONFIG.venueName} in ${INVITATION_CONFIG.city} on ${INVITATION_CONFIG.date}. Please join us with your prayers and blessings.`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: currentUrl,
        });
      } catch (err) {
        console.log('User cancelled share or share error', err);
      }
    } else {
      handleCopyLink();
    }
  };

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `🏡 *${shareTitle}*\n\n${shareText}\n\nView Invitation & RSVP here:\n${currentUrl}`
  )}`;

  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareTitle + " - " + shareText)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#041913]/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md rounded-3xl emerald-glass gold-card-border p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full emerald-glass border border-[#d4b274]/30 text-[#fcecd2] hover:bg-[#0e3d32] transition-colors cursor-pointer"
          aria-label="Close Share Dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="mb-4 flex justify-center">
          <EiffelEmblem size={52} />
        </div>

        <h3 className="font-display-regal text-xl sm:text-2xl font-bold text-[#fcecd2] mb-1">
          Share This Invitation
        </h3>
        <p className="text-xs text-[#d4b274] font-medium mb-4">
          Send the Eiffel Home invitation to friends & family
        </p>

        <GoldDivider className="my-4" />

        {/* Share Options Grid */}
        <div className="grid grid-cols-1 gap-3 my-6">
          {/* WhatsApp Direct Share */}
          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] flex items-center justify-between p-3.5 rounded-2xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#fcecd2] transition-colors active:scale-98"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#25D366] text-[#041913] flex items-center justify-center font-bold">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold tracking-wider uppercase">
                Share via WhatsApp
              </span>
            </div>
            <Send className="w-4 h-4 text-[#25D366]" />
          </a>

          {/* Telegram Share */}
          <a
            href={telegramShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] flex items-center justify-between p-3.5 rounded-2xl bg-[#0088cc]/15 hover:bg-[#0088cc]/25 border border-[#0088cc]/40 text-[#fcecd2] transition-colors active:scale-98"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0088cc] text-white flex items-center justify-center font-bold">
                <Send className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold tracking-wider uppercase">
                Share via Telegram
              </span>
            </div>
            <Send className="w-4 h-4 text-[#0088cc]" />
          </a>

          {/* Native Web Share */}
          {navigator.share && (
            <button
              onClick={handleNativeShare}
              className="min-h-[48px] flex items-center justify-between p-3.5 rounded-2xl emerald-glass hover:bg-[#0e3d32] border border-[#d4b274]/30 text-[#fcecd2] transition-colors cursor-pointer active:scale-98"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#d4b274] text-[#052019] flex items-center justify-center font-bold">
                  <Share2 className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold tracking-wider uppercase">
                  More Share Options
                </span>
              </div>
              <Share2 className="w-4 h-4 text-[#d4b274]" />
            </button>
          )}
        </div>

        {/* Copy Link Input Bar */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#031913] border border-[#d4b274]/30">
          <input
            type="text"
            readOnly
            value={currentUrl}
            className="flex-1 min-h-[40px] px-3 py-1.5 bg-transparent text-xs text-[#faf7f2]/80 font-mono truncate focus:outline-none"
          />
          <button
            onClick={handleCopyLink}
            className="min-h-[42px] px-4 py-2 rounded-xl bg-gradient-to-r from-[#d4b274] to-[#bfa063] text-[#052019] text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-1.5 shrink-0 active:scale-98"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
