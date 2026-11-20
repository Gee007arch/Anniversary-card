import React, { useState } from 'react';
import { Heart, Sparkles, CheckCircle2, Circle, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LetterPage, PromiseItem } from '../types';
import { anniversaryData } from '../data/anniversaryData';

export const CoverPage = React.forwardRef<HTMLDivElement, { pageData: LetterPage }>(
  ({ pageData }, ref) => {
    return (
      <div
        ref={ref}
        className="page w-full h-full p-6 sm:p-10 flex flex-col justify-between rounded-lg select-none shadow-book border border-[#2E2733] bg-gradient-to-br from-[#1C1720] via-[#161218] to-[#0E0B10] text-[#FFFDF9] overflow-hidden relative"
      >
        <div className="absolute inset-3 sm:inset-4 rounded border border-[#E91E63]/30 pointer-events-none" />
        <div className="absolute inset-4 sm:inset-5 rounded border border-dashed border-[#FCE4EC]/15 pointer-events-none" />
        <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[#E91E63]/15 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between text-xs tracking-widest uppercase text-[#FCE4EC]/70 font-sans">
          <span>{anniversaryData.couple.startDate}</span>
          <span className="flex items-center gap-1 text-[#E91E63]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Vol. I</span>
          </span>
        </div>

        <div className="relative z-10 my-auto text-center flex flex-col items-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#E91E63]/60 bg-gradient-to-br from-[#E91E63]/20 to-transparent flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(233,30,99,0.25)]">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#FCE4EC] drop-shadow-sm">
              J &amp; A
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-[#FFFDF9] font-bold tracking-tight mb-2 leading-tight">
            {pageData.title}
          </h1>

          <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-[#E91E63] to-transparent my-3" />

          <p className="font-handwriting text-xl sm:text-2xl text-[#F8BBD0] max-w-xs leading-relaxed">
            {pageData.subtitle}
          </p>

          <p className="mt-4 text-xs font-serif italic text-zinc-400 max-w-[280px]">
            {pageData.decorativeQuote}
          </p>
        </div>

        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-zinc-300 font-sans tracking-wide">
            <span>Swipe or click Next to read</span>
            <span className="text-[#E91E63]">→</span>
          </div>
        </div>
      </div>
    );
  }
);
CoverPage.displayName = 'CoverPage';

export const HandwrittenPage = React.forwardRef<
  HTMLDivElement,
  { pageData: LetterPage; pageNumber: number }
>(({ pageData, pageNumber }, ref) => {
  return (
    <div
      ref={ref}
      className="page w-full h-full p-6 sm:p-9 flex flex-col justify-between paper-texture paper-edge-shadow rounded-lg select-none text-[#1F1A1D] border border-[#E8DFD1] overflow-hidden relative"
    >
      <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-[1px] bg-[#E91E63]/20 pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-[#E8DFD1]/80">
        <div>
          <span className="text-[10px] sm:text-xs font-serif uppercase tracking-widest text-[#880E4F] font-semibold">
            {pageData.date}
          </span>
          <h2 className="font-serif text-lg sm:text-2xl font-bold text-[#1F1A1D]">
            {pageData.title}
          </h2>
          {pageData.subtitle && (
            <p className="text-xs sm:text-sm font-serif italic text-zinc-600">
              {pageData.subtitle}
            </p>
          )}
        </div>
        <Heart className="w-4 h-4 text-[#E91E63]/60 fill-[#E91E63]/20" />
      </div>

      <div className="relative z-10 my-auto py-2 sm:py-3 flex flex-col gap-2.5 sm:gap-3.5">
        {pageData.salutation && (
          <p className="font-handwriting text-xl sm:text-2xl font-semibold text-[#880E4F]">
            {pageData.salutation}
          </p>
        )}

        {pageData.content?.map((paragraph, idx) => (
          <p
            key={idx}
            className="font-handwriting text-lg sm:text-[21px] leading-[1.4] sm:leading-[1.45] text-[#241F22] tracking-wide"
          >
            {paragraph}
          </p>
        ))}
      </div>

      <div className="relative z-10 pt-2 border-t border-[#E8DFD1]/60 flex items-end justify-between">
        <div>
          {pageData.signoff && (
            <p className="font-handwriting text-base sm:text-lg text-[#880E4F]">
              {pageData.signoff}
            </p>
          )}
          <p className="font-serif text-sm font-bold text-[#1F1A1D] tracking-wide">
            {pageData.signature || anniversaryData.couple.senderName}
          </p>
        </div>

        <span className="font-serif text-[11px] text-zinc-500 font-medium">
          {pageNumber}
        </span>
      </div>
    </div>
  );
});
HandwrittenPage.displayName = 'HandwrittenPage';

export const KeepsakePage = React.forwardRef<
  HTMLDivElement,
  { pageData: LetterPage; pageNumber: number; onFinishLetter?: () => void }
>(({ pageData, pageNumber, onFinishLetter }, ref) => {
  const [promises, setPromises] = useState<PromiseItem[]>(anniversaryData.promises);
  const [hasCelebrated, setHasCelebrated] = useState(false);

  const togglePromise = (id: number) => {
    setPromises((prev: PromiseItem[]) =>
      prev.map((p) => (p.id === id ? { ...p, checked: !p.checked } : p))
    );
  };

  const triggerConfetti = () => {
    setHasCelebrated(true);
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#E91E63', '#FF4081', '#FCE4EC', '#FFFDF9', '#C2185B'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#E91E63', '#FF80AB', '#FFFFFF'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#E91E63', '#FF80AB', '#FFFFFF'],
        });
      }, 250);
    } catch {
    }
  };

  return (
    <div
      ref={ref}
      className="page w-full h-full p-5 sm:p-8 flex flex-col justify-between paper-texture paper-edge-shadow rounded-lg select-none text-[#1F1A1D] border border-[#E8DFD1] overflow-hidden relative"
    >
      <div className="relative z-10 text-center pb-2 border-b border-[#E8DFD1]">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#E91E63]/10 text-[#E91E63] text-[10px] font-serif font-bold uppercase tracking-widest mb-1">
          <Sparkles className="w-3 h-3" />
          <span>Jemimah &amp; Ayanfe • 30 Days</span>
          <Sparkles className="w-3 h-3" />
        </div>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1F1A1D]">
          {pageData.title}
        </h2>
        <p className="font-handwriting text-base text-[#AD1457]">
          {pageData.subtitle}
        </p>
      </div>

      <div className="relative z-10 my-auto py-1 flex flex-col gap-2">
        <span className="text-[11px] font-serif uppercase tracking-wider text-zinc-500 font-semibold mb-0.5">
          Promises for Meema baby:
        </span>
        {promises.map((promise: PromiseItem) => (
          <div
            key={promise.id}
            onClick={() => togglePromise(promise.id)}
            className="flex items-start gap-2.5 p-1.5 rounded-md hover:bg-[#E91E63]/5 cursor-pointer transition-colors"
          >
            {promise.checked ? (
              <CheckCircle2 className="w-4 h-4 text-[#E91E63] mt-0.5 flex-shrink-0" />
            ) : (
              <Circle className="w-4 h-4 text-zinc-400 mt-0.5 flex-shrink-0" />
            )}
            <span
              className={`font-handwriting text-lg sm:text-xl leading-tight transition-all ${
                promise.checked
                  ? 'text-[#1F1A1D] font-medium'
                  : 'text-zinc-400 line-through'
              }`}
            >
              {promise.text}
            </span>
          </div>
        ))}
      </div>

      <div className="relative z-10 pt-2 border-t border-[#E8DFD1] flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={triggerConfetti}
            className="group relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#E91E63] hover:bg-[#D81B60] text-white text-xs font-sans font-semibold tracking-wide shadow-md hover:shadow-[0_0_15px_rgba(233,30,99,0.5)] transition-all duration-300 transform active:scale-95"
          >
            <PartyPopper className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
            <span>Celebrate Us</span>
            <Heart className="w-3.5 h-3.5 fill-white" />
          </button>

          {onFinishLetter && (
            <button
              onClick={onFinishLetter}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#18141A] hover:bg-[#251F29] border border-[#2E2733] text-zinc-200 hover:text-white text-xs font-sans font-semibold tracking-wide shadow-md transition-all active:scale-95"
            >
              <span>Finish Letter</span>
              <Sparkles className="w-3 h-3 text-[#E91E63]" />
            </button>
          )}
        </div>

        {hasCelebrated && (
          <span className="text-[11px] font-handwriting text-[#E91E63] animate-pulse">
            ✨ Sealed in our hearts forever, Suki!
          </span>
        )}

        <div className="w-full flex items-center justify-between text-[11px] text-zinc-500 font-serif pt-1">
          <span>{anniversaryData.couple.anniversaryDate}</span>
          <span>{pageNumber}</span>
        </div>
      </div>
    </div>
  );
});
KeepsakePage.displayName = 'KeepsakePage';
