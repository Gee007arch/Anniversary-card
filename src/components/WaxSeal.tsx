import React from 'react';
import { motion } from 'framer-motion';

interface WaxSealProps {
  sealText?: string;
  onClick?: () => void;
  isBreaking?: boolean;
  className?: string;
}

export const WaxSeal: React.FC<WaxSealProps> = ({
  sealText = 'I',
  onClick,
  isBreaking = false,
  className = '',
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      animate={
        isBreaking
          ? {
              scale: [1, 1.25, 0],
              opacity: [1, 0.8, 0],
              rotate: [0, 15, 30],
              filter: ['brightness(1)', 'brightness(1.8)', 'brightness(2)'],
            }
          : {
              boxShadow: [
                '0 0 15px rgba(233, 30, 99, 0.4), inset 0 0 10px rgba(0,0,0,0.4)',
                '0 0 28px rgba(233, 30, 99, 0.8), inset 0 0 12px rgba(0,0,0,0.5)',
                '0 0 15px rgba(233, 30, 99, 0.4), inset 0 0 10px rgba(0,0,0,0.4)',
              ],
            }
      }
      transition={
        isBreaking
          ? { duration: 0.6, ease: 'easeOut' }
          : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
      }
      onClick={onClick}
      className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full cursor-pointer flex items-center justify-center select-none ${className}`}
      style={{
        background: 'radial-gradient(circle at 35% 30%, #FF4081 0%, #E91E63 45%, #C2185B 75%, #880E4F 100%)',
      }}
    >
      <div className="absolute inset-[-4px] rounded-full border-4 border-[#AD1457]/40 pointer-events-none blur-[0.5px]" />
      
      <svg
        className="absolute inset-[-6px] w-[calc(100%+12px)] h-[calc(100%+12px)] pointer-events-none fill-[#C2185B]/30"
        viewBox="0 0 100 100"
      >
        <path d="M50 0 C60 2 70 8 78 15 C88 24 95 36 98 50 C96 64 88 76 78 85 C68 93 56 98 42 98 C28 97 16 88 8 78 C1 68 -1 54 2 40 C6 26 16 14 28 7 C35 2 43 0 50 0 Z" />
      </svg>

      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[#880E4F] flex items-center justify-center shadow-[inset_0_2px_6px_rgba(0,0,0,0.6),0_1px_2px_rgba(255,255,255,0.3)] bg-gradient-to-br from-[#D81B60] via-[#C2185B] to-[#880E4F]">
        <div className="absolute inset-1 rounded-full border border-dashed border-[#F8BBD0]/30 pointer-events-none" />

        <span
          className="font-serif text-2xl sm:text-3xl font-bold tracking-widest text-[#FCE4EC] drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)]"
          style={{ textShadow: '0 2px 4px rgba(74, 5, 34, 0.9), 0 -1px 1px rgba(255, 255, 255, 0.4)' }}
        >
          {sealText}
        </span>
      </div>

      <div className="absolute top-2.5 left-4 w-4 h-2 rounded-full bg-white/40 blur-[1px] transform -rotate-45 pointer-events-none" />
    </motion.div>
  );
};
