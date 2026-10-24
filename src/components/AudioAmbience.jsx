import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioAmbience = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const oscillatorsRef = useRef([]);

  const startAmbience = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Master gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.07, ctx.currentTime + 3);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Soft low-pass filter to give warm, intimate acoustic space
      const filter = ctx.createFilter ? ctx.createBiquadFilter() : null;
      if (filter) {
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, ctx.currentTime);
        masterGain.disconnect();
        masterGain.connect(filter);
        filter.connect(ctx.destination);
      }

      const oscs = [];
      // 3 subtle soothing sine waves
      [146.83, 220.00, 293.66].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // subtle frequency wobble for organic warmth
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.1 + idx * 0.05, ctx.currentTime);
        lfoGain.gain.setValueAtTime(0.8, ctx.currentTime);
        lfo.connect(osc.frequency);
        lfo.start();

        oscGain.gain.setValueAtTime(0.25 / (idx + 1), ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
        oscs.push(osc, lfo);
      });

      oscillatorsRef.current = oscs;
      setIsPlaying(true);
    } catch (e) {
      console.warn('Web Audio not allowed or error:', e);
    }
  };

  const stopAmbience = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
      setTimeout(() => {
        oscillatorsRef.current.forEach(osc => {
          try { osc.stop(); } catch {}
        });
        oscillatorsRef.current = [];
        setIsPlaying(false);
      }, 1200);
    } else {
      setIsPlaying(false);
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopAmbience();
    } else {
      startAmbience();
    }
  };

  useEffect(() => {
    return () => {
      stopAmbience();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        try { audioCtxRef.current.close(); } catch {}
      }
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      title={isPlaying ? "Mute serene atmosphere" : "Play serene ambient tones"}
      className="group relative flex items-center gap-2.5 px-3 py-2 min-h-[38px] rounded-full emerald-glass gold-card-border hover:bg-[#0e3d32] transition-all duration-300 text-xs text-[#faf7f2] shadow-lg cursor-pointer active:scale-95"
      aria-label="Toggle serene ambience sound"
    >
      <div className="relative flex items-center justify-center">
        {isPlaying ? (
          <Volume2 className="w-3.5 h-3.5 text-[#d4b274] animate-pulse" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-[#faf7f2]/60 group-hover:text-[#d4b274]" />
        )}
      </div>

      <span className="hidden sm:inline font-light tracking-wider text-[11px] text-[#faf7f2]/80 group-hover:text-[#fcecd2]">
        {isPlaying ? "Atmosphere Playing" : "Peaceful Ambience"}
      </span>

      {isPlaying && (
        <span className="flex items-center gap-0.5 ml-1">
          <span className="w-1 h-2.5 bg-[#d4b274] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1 h-3.5 bg-[#fcecd2] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1 h-2 bg-[#d4b274] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </span>
      )}
    </button>
  );
};
