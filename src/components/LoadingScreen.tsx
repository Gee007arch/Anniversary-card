import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { anniversaryData } from '../data/anniversaryData';
import { romanticAudio } from '../utils/audio';

interface LoadingScreenProps {
  onLoaded: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Preparing 30 days of sweet memories...');

  useEffect(() => {
    const imageUrls = anniversaryData.photos.map((p) => p.url);
    let loadedCount = 0;

    imageUrls.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => {
        loadedCount++;
      };
    });

    const statusMessages = [
      'Preparing 30 days of sweet memories...',
      'Polishing handwritten letters for Meema baby...',
      'Tuning acoustic melodies & romantic ambient vibes...',
      'Stamping wax seal with love from Ayanfe...',
      'Ready for you, my darling...',
    ];

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 4;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onLoaded();
          }, 400);
          return 100;
        }

        const msgIndex = Math.min(
          Math.floor((next / 100) * statusMessages.length),
          statusMessages.length - 1
        );
        setStatusText(statusMessages[msgIndex]);
        return next;
      });
    }, 85);

    return () => clearInterval(timer);
  }, [onLoaded]);

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        onClick={() => romanticAudio.playTrack('initial')}
        onTouchStart={() => romanticAudio.playTrack('initial')}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0D0B0E] text-[#FFFDF9] select-none p-6"
      >
        <div className="absolute w-80 h-80 rounded-full bg-[#E91E63]/20 blur-3xl pointer-events-none" />

        <motion.div
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#E91E63]/60 bg-gradient-to-br from-[#18141A] to-[#221D25] flex items-center justify-center shadow-[0_0_35px_rgba(233,30,99,0.4)] mb-8"
        >
          <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-[#E91E63] fill-[#E91E63]" />
          <div className="absolute -top-1 -right-1">
            <Sparkles className="w-5 h-5 text-[#FF80AB] animate-spin" style={{ animationDuration: '4s' }} />
          </div>
        </motion.div>

        <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-center text-[#FFFDF9] mb-1">
          {anniversaryData.couple.milestone}
        </h1>
        <p className="font-handwriting text-lg sm:text-xl text-[#F8BBD0] mb-6 text-center">
          For {anniversaryData.couple.partnerName}
        </p>

        <div className="w-64 sm:w-80 h-2 bg-[#18141A] rounded-full border border-[#2E2733] overflow-hidden p-0.5 shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-[#D81B60] via-[#E91E63] to-[#FF4081] rounded-full shadow-[0_0_12px_rgba(233,30,99,0.8)]"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut', duration: 0.1 }}
          />
        </div>

        <div className="mt-3 flex flex-col items-center gap-1 text-center">
          <span className="font-sans text-xs tracking-widest text-[#E91E63] font-semibold">
            {progress}%
          </span>
          <span className="font-serif italic text-xs text-zinc-400 min-h-[20px] transition-all">
            {statusText}
          </span>
        </div>

        <span className="absolute bottom-6 text-[10px] tracking-widest uppercase text-zinc-500 font-sans">
          From {anniversaryData.couple.senderName} • Handcrafted with love
        </span>
      </motion.div>
    </AnimatePresence>
  );
};
