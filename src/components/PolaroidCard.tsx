import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { PolaroidPhoto } from '../types';

interface PolaroidCardProps {
  photo: PolaroidPhoto;
  index: number;
  onClick: () => void;
  className?: string;
  isFloatingDesktop?: boolean;
  parallaxOffset?: { x: number; y: number };
}

export const PolaroidCard: React.FC<PolaroidCardProps> = ({
  photo,
  index,
  onClick,
  className = '',
  isFloatingDesktop = true,
  parallaxOffset = { x: 0, y: 0 },
}) => {
  const rot = photo.initialRotation;
  const floatDuration = 5.2 + (index % 3) * 0.9;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 40 }}
      animate={
        isFloatingDesktop
          ? {
              opacity: 1,
              scale: 1,
              x: parallaxOffset.x * (index % 2 === 0 ? 1 : -1) * (15 + index * 4),
              y: [0, -12, 0],
              rotate: [rot - 1.5, rot + 1.5, rot - 1.5],
            }
          : {
              opacity: 1,
              scale: 1,
              y: 0,
              rotate: rot,
            }
      }
      transition={
        isFloatingDesktop
          ? {
              opacity: { duration: 0.8 },
              scale: { duration: 0.8 },
              x: { type: 'spring', damping: 20, stiffness: 100 },
              y: {
                duration: floatDuration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.25,
              },
              rotate: {
                duration: floatDuration + 1.2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.25,
              },
            }
          : { duration: 0.4, delay: index * 0.1 }
      }
      whileHover={{
        scale: 1.08,
        rotate: 0,
        zIndex: 45,
        boxShadow: '0 20px 45px rgba(0,0,0,0.75), 0 0 25px rgba(233,30,99,0.35)',
      }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`relative cursor-pointer select-none bg-[#FFFDF9] text-[#1F1A1D] p-2.5 sm:p-3 rounded shadow-polaroid border border-[#E8DFD1] transition-shadow duration-300 ${className}`}
      style={{
        width: '170px',
        maxWidth: '190px',
      }}
    >
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-3.5 bg-[#E91E63]/25 backdrop-blur-[1px] border-b border-white/40 shadow-xs z-10 transform -rotate-1" />

      <div className="relative aspect-square w-full rounded-sm overflow-hidden bg-zinc-800 shadow-inner">
        {photo.type === 'video' || photo.url.endsWith('.mp4') ? (
          <video
            src={photo.url}
            poster={photo.poster}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <img
            src={photo.url}
            alt={photo.caption}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        )}
        {(photo.type === 'video' || photo.url.endsWith('.mp4')) && (
          <div className="absolute top-1.5 right-1.5 z-10 w-5 h-5 rounded-full bg-black/60 backdrop-blur-xs flex items-center justify-center text-white">
            <Play className="w-2.5 h-2.5 fill-white ml-0.5" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="pt-2 text-center flex flex-col justify-between min-h-[44px]">
        <p className="font-handwriting text-sm sm:text-base text-[#1F1A1D] leading-tight line-clamp-2">
          {photo.caption}
        </p>
        <span className="text-[10px] text-zinc-500 font-serif uppercase tracking-wider mt-1">
          {photo.date}
        </span>
      </div>
    </motion.div>
  );
};
