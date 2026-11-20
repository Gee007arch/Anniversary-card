import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, RotateCcw, PartyPopper, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { anniversaryData } from '../data/anniversaryData';

interface AnniversaryCardProps {
  onReadAgain: () => void;
  onClose: () => void;
}

export const AnniversaryCard: React.FC<AnniversaryCardProps> = ({ onReadAgain, onClose }) => {
  const [hasCelebrated, setHasCelebrated] = useState(false);

  const triggerConfetti = () => {
    setHasCelebrated(true);
    try {
      const fire = (opts: confetti.Options) => confetti({ ...opts });
      fire({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#E91E63', '#FF4081', '#FCE4EC', '#FFFDF9', '#C2185B', '#FF80AB'],
        scalar: 1.1,
        gravity: 0.9,
        drift: 0.5,
      });
      setTimeout(() => {
        fire({
          particleCount: 60,
          angle: 60,
          spread: 60,
          origin: { x: 0, y: 0.6 },
          colors: ['#E91E63', '#FF4081', '#FCE4EC'],
          scalar: 0.9,
        });
        fire({
          particleCount: 60,
          angle: 120,
          spread: 60,
          origin: { x: 1, y: 0.6 },
          colors: ['#E91E63', '#FF4081', '#FCE4EC'],
          scalar: 0.9,
        });
      }, 300);
      setTimeout(() => {
        fire({
          particleCount: 40,
          spread: 100,
          origin: { y: 0.3 },
          colors: ['#FFFDF9', '#FCE4EC', '#FF80AB'],
          scalar: 0.7,
          ticks: 180,
        });
      }, 700);
    } catch {}
  };

  return (
    <AnimatePresence>
      <motion.div
        key="card-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        style={{ backdropFilter: 'blur(2.5px)', background: 'rgba(13,11,14,0.2)' }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          key="card-body"
          initial={{ opacity: 0, scale: 0.72, y: 60, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: -40 }}
          transition={{ type: 'spring', damping: 20, stiffness: 240, mass: 0.8 }}
          className="relative w-full max-w-sm bg-[#18141A] border border-[#2E2733] rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.9),0_0_60px_rgba(233,30,99,0.18)] overflow-hidden select-none"
          aria-modal="true"
          aria-label="Anniversary Card"
        >
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#E91E63] to-transparent" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-[#E91E63]/12 blur-3xl pointer-events-none" />

          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="p-6 flex flex-col items-center gap-5">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E91E63]/15 border border-[#E91E63]/40 shadow-[0_0_20px_rgba(233,30,99,0.25)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E91E63]" />
              <span className="font-serif text-[11px] font-bold uppercase tracking-[0.18em] text-[#E91E63]">
                1 Month • 30 Days
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#E91E63]" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, type: 'spring', damping: 18 }}
              className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border-4 border-[#E91E63]/50 shadow-[0_0_30px_rgba(233,30,99,0.35),0_12px_40px_rgba(0,0,0,0.6)]"
            >
              <img
                src="/anniversayCardPhoto.jpeg"
                alt="Jemimah"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B0E]/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-center">
                <span className="font-handwriting text-sm text-white/90 drop-shadow-lg">
                  My Gorgeous Meema ✨
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="text-center space-y-1"
            >
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFFDF9] leading-tight">
                Happy 1 Month Anniversary, Jemimah
              </h2>
              <p className="font-handwriting text-xl sm:text-2xl text-[#E91E63]">
                {anniversaryData.couple.partnerNickname} 🌹
              </p>
              <p className="text-[13px] font-sans text-zinc-400 mt-1 max-w-[260px] leading-relaxed">
                Thirty days of you — the most beautiful chapter so far in 2026.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex flex-col gap-2.5 w-full"
            >
              <button
                onClick={triggerConfetti}
                className="relative w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-[#E91E63] hover:bg-[#D81B60] text-white font-sans font-bold text-sm tracking-wide shadow-[0_0_30px_rgba(233,30,99,0.5)] hover:shadow-[0_0_45px_rgba(233,30,99,0.8)] transition-all duration-300 active:scale-[0.97] overflow-hidden"
                aria-label="Celebrate"
              >
                <motion.div
                  animate={{ scale: hasCelebrated ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-2.5"
                >
                  <PartyPopper className="w-4.5 h-4.5" />
                  <span>Celebrate</span>
                  <Heart className="w-4 h-4 fill-white" />
                </motion.div>
                {hasCelebrated && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-[#E91E63] via-[#FF4081] to-[#E91E63] animate-[shimmer_1.5s_ease_infinite] bg-[length:200%]"
                    style={{ mixBlendMode: 'screen', opacity: 0.3 }}
                  />
                )}
              </button>

              <button
                onClick={onReadAgain}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-[#1F1922] hover:bg-[#2C2130] border border-[#36273B] hover:border-[#E91E63]/50 text-zinc-200 hover:text-white font-sans font-semibold text-sm tracking-wide transition-all duration-300 active:scale-[0.97]"
                aria-label="Read Again"
              >
                <RotateCcw className="w-4 h-4 text-[#E91E63]" />
                <span>Read Again</span>
              </button>
            </motion.div>

            {hasCelebrated && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-handwriting text-[#E91E63] text-center"
              >
                ✨ Sealed in our hearts , Suki!
              </motion.p>
            )}
          </div>

          <div className="px-6 pb-5 flex items-center justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Heart
                  className="text-[#E91E63]"
                  style={{ width: 8 + i * 2, height: 8 + i * 2 }}
                  fill="#E91E63"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
