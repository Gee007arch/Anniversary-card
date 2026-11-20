import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { WaxSeal } from './WaxSeal';
import { anniversaryData } from '../data/anniversaryData';
import { romanticAudio } from '../utils/audio';

interface EnvelopeProps {
  onOpenComplete: () => void;
  onSealClick: () => void;
}

export const Envelope: React.FC<EnvelopeProps> = ({ onOpenComplete, onSealClick }) => {
  const [animationStep, setAnimationStep] = useState<'idle' | 'breaking' | 'opening' | 'sliding' | 'done'>('idle');

  const handleSealClick = () => {
    if (animationStep !== 'idle') return;

    onSealClick();
    romanticAudio.playEnvelopeOpenSound();
    setAnimationStep('breaking');

    setTimeout(() => {
      setAnimationStep('opening');
    }, 500);

    setTimeout(() => {
      setAnimationStep('sliding');
    }, 1200);

    setTimeout(() => {
      setAnimationStep('done');
      onOpenComplete();
    }, 2600);
  };

  const isFlapOpen = animationStep === 'opening' || animationStep === 'sliding' || animationStep === 'done';
  const isBookletSliding = animationStep === 'sliding' || animationStep === 'done';

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[75vh] w-full px-4 select-none perspective-1000">
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#E91E63]/18 blur-3xl pointer-events-none -z-10" />

      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 50 }}
        animate={{
          scale: animationStep === 'sliding' ? 1.03 : animationStep === 'done' ? 0.9 : 1,
          opacity: animationStep === 'done' ? 0 : 1,
          y: animationStep === 'done' ? 20 : animationStep === 'idle' ? [0, -14, 0] : 0,
          filter: animationStep === 'done' ? 'blur(8px)' : 'blur(0px)',
        }}
        transition={
          animationStep === 'idle'
            ? {
                scale: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1.0] },
                opacity: { duration: 0.75 },
                filter: { duration: 0.75 },
                y: {
                  duration: 2.8,
                  repeat: Infinity,
                  ease: [0.45, 0, 0.55, 1],
                  delay: 0.8,
                },
              }
            : animationStep === 'done'
            ? { duration: 0.55, ease: [0.25, 0.1, 0.25, 1.0] }
            : { duration: 0.75, ease: [0.25, 0.1, 0.25, 1.0] }
        }
        className="relative w-[315px] h-[215px] sm:w-[425px] sm:h-[285px] bg-[#18141A] rounded-xl shadow-envelope border border-[#2E2733] preserve-3d"
      >
        <div className="absolute inset-0 rounded-xl overflow-hidden bg-gradient-to-b from-[#131016] to-[#1C161F]">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E91E63_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#E91E63]/60 to-transparent" />
        </div>

        <motion.div
          initial={{ y: 10, scale: 0.96, opacity: 0.7 }}
          animate={
            animationStep === 'done'
              ? { y: -260, scale: 1.12, opacity: 0, rotate: 1 }
              : isBookletSliding
              ? { y: -195, scale: 1.08, opacity: 1, rotate: 0 }
              : { y: 0, scale: 0.97, opacity: 0.85, rotate: 0 }
          }
          transition={
            animationStep === 'done'
              ? { duration: 0.55, ease: [0.55, 0, 1, 0.45] }
              : isBookletSliding
              ? { duration: 0.9, ease: [0.22, 1.2, 0.36, 1] }
              : { duration: 0.4 }
          }
          className="absolute left-4 right-4 sm:left-6 sm:right-6 top-3 bottom-3 rounded-lg paper-texture paper-edge-shadow border border-[#E8DFD1] p-4 flex flex-col items-center justify-center text-center shadow-md z-10"
        >
          <div className="w-full h-full border border-dashed border-[#E91E63]/30 rounded p-3 flex flex-col items-center justify-between">
            <div className="flex items-center gap-1.5 text-[#E91E63] text-xs font-serif tracking-widest uppercase">
              <Sparkles className="w-3 h-3" />
              <span>{anniversaryData.envelope.stampSubtext}</span>
              <Sparkles className="w-3 h-3" />
            </div>

            <div className="my-auto">
              <h2 className="font-serif text-xl sm:text-2xl text-[#1F1A1D] font-bold">
                {anniversaryData.couple.milestone}
              </h2>
              <p className="font-handwriting text-lg sm:text-xl text-[#AD1457] mt-0.5">
                For {anniversaryData.couple.partnerName}
              </p>
            </div>

            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-sans">
              From {anniversaryData.couple.senderName}
            </span>
          </div>
        </motion.div>

        <div 
          className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-xl"
        >
          <div 
            className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-br from-[#1C171F] to-[#141016] border-r border-[#2E2733]/50 shadow-[5px_0_15px_rgba(0,0,0,0.5)]"
            style={{
              clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
            }}
          />
          <div 
            className="absolute top-0 bottom-0 right-0 w-1/2 bg-gradient-to-bl from-[#1C171F] to-[#141016] border-l border-[#2E2733]/50 shadow-[-5px_0_15px_rgba(0,0,0,0.5)]"
            style={{
              clipPath: 'polygon(100% 0, 0 50%, 100% 100%)',
            }}
          />
          <div 
            className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-[#18141A] to-[#201A24] border-t border-[#2E2733]/60 shadow-[0_-5px_15px_rgba(0,0,0,0.6)]"
            style={{
              clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
            }}
          />
        </div>

        <div
          className={`absolute top-0 inset-x-0 h-[105px] sm:h-[142px] preserve-3d z-30 ${
            isFlapOpen ? 'flap-open' : 'flap-closed'
          }`}
        >
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#221D26] to-[#18141A] border-b border-[#2E2733] shadow-lg backface-hidden"
            style={{
              clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
          </div>

          <div
            className="absolute inset-0 bg-gradient-to-b from-[#141016] to-[#1C161F] border-b border-[#2E2733] shadow-inner"
            style={{
              clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
              transform: 'rotateX(180deg)',
              backfaceVisibility: 'hidden',
            }}
          />
        </div>

        <AnimatePresence>
          {animationStep !== 'sliding' && animationStep !== 'done' && (
            <div className="absolute top-[80px] sm:top-[112px] left-1/2 -translate-x-1/2 z-40">
              <WaxSeal
                sealText={anniversaryData.envelope.sealText}
                onClick={handleSealClick}
                isBreaking={animationStep === 'breaking' || animationStep === 'opening'}
              />
            </div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ 
          opacity: animationStep === 'idle' ? 1 : 0, 
          y: animationStep === 'idle' ? 0 : 15 
        }}
        transition={{ delay: 0.85, duration: 0.6 }}
        className="mt-8 flex flex-col items-center gap-2 select-none pointer-events-none"
      >
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18141A]/90 border border-[#2E2733] shadow-sm">
          <Heart className="w-3.5 h-3.5 text-[#E91E63] animate-pulse" fill="#E91E63" />
          <span className="text-xs sm:text-sm font-sans tracking-wide text-zinc-200">
            {anniversaryData.envelope.promptText}
          </span>
          <Heart className="w-3.5 h-3.5 text-[#E91E63] animate-pulse" fill="#E91E63" />
        </div>
        <span className="text-[11px] text-zinc-500 font-sans tracking-widest uppercase">
          {anniversaryData.couple.anniversaryDate} • {anniversaryData.couple.partnerNickname}
        </span>
      </motion.div>
    </div>
  );
};
