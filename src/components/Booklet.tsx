import React, { useRef, useState, useEffect, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { CoverPage, HandwrittenPage, KeepsakePage } from './PageComponents';
import { anniversaryData } from '../data/anniversaryData';
import { PageFlipRef } from 'react-pageflip';
import { romanticAudio } from '../utils/audio';

interface BookletProps {
  onPageChange?: (pageIndex: number) => void;
  onFinishLetter?: () => void;
}

export const Booklet: React.FC<BookletProps> = ({ onPageChange, onFinishLetter }) => {
  const bookRef = useRef<PageFlipRef | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(anniversaryData.pages.length);
  const [dimensions, setDimensions] = useState({
    width: 360,
    height: 520,
    isMobile: false,
  });

  const updateDimensions = useCallback(() => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (screenWidth < 768) {
      const bookWidth = Math.min(screenWidth - 36, 360);
      const bookHeight = Math.min(screenHeight - 180, 520);
      setDimensions({
        width: Math.max(bookWidth, 290),
        height: Math.max(bookHeight, 460),
        isMobile: true,
      });
    } else {
      const bookWidth = Math.min(Math.floor((screenWidth - 140) / 2), 400);
      const bookHeight = Math.min(screenHeight - 160, 560);
      setDimensions({
        width: Math.max(bookWidth, 340),
        height: Math.max(bookHeight, 500),
        isMobile: false,
      });
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [updateDimensions]);

  const handleFlip = (e: { data: number }) => {
    setCurrentPage(e.data);
    romanticAudio.playPageFlipSound();
    if (onPageChange) {
      onPageChange(e.data);
    }
  };

  const handlePrev = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  const handleNext = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-2 sm:px-4 py-2 z-20 select-none">
      <div className="relative flex items-center justify-center">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          aria-label="Previous page"
          className={`hidden md:flex items-center justify-center w-11 h-11 rounded-full bg-[#18141A]/90 hover:bg-[#221D25] border border-[#2E2733] hover:border-[#E91E63]/60 text-white shadow-lg backdrop-blur-md transition-all duration-300 absolute -left-14 top-1/2 -translate-y-1/2 z-30 ${
            currentPage === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-90 hover:scale-105 hover:shadow-[0_0_15px_rgba(233,30,99,0.4)]'
          }`}
        >
          <ChevronLeft className="w-5 h-5 text-zinc-200" />
        </button>

        <div className="flip-book-wrapper overflow-visible">
          <HTMLFlipBook
            ref={bookRef}
            width={dimensions.width}
            height={dimensions.height}
            size="fixed"
            minWidth={280}
            maxWidth={450}
            minHeight={440}
            maxHeight={620}
            maxShadowOpacity={0.45}
            showCover={true}
            mobileScrollSupport={true}
            usePortrait={dimensions.isMobile}
            flippingTime={700}
            onFlip={handleFlip}
            onInit={() => {
              if (bookRef.current) {
                setTotalPages(bookRef.current.pageFlip().getPageCount());
              }
            }}
            className="flip-book rounded-lg shadow-book"
            style={{ margin: '0 auto' }}
          >
            <CoverPage pageData={anniversaryData.pages[0]} />
            <HandwrittenPage pageData={anniversaryData.pages[1]} pageNumber={2} />
            <HandwrittenPage pageData={anniversaryData.pages[2]} pageNumber={3} />
            <HandwrittenPage pageData={anniversaryData.pages[3]} pageNumber={4} />
            <HandwrittenPage pageData={anniversaryData.pages[4]} pageNumber={5} />
            <HandwrittenPage pageData={anniversaryData.pages[5]} pageNumber={6} />
            <HandwrittenPage pageData={anniversaryData.pages[6]} pageNumber={7} />
            <KeepsakePage pageData={anniversaryData.pages[7]} pageNumber={8} onFinishLetter={onFinishLetter} />
          </HTMLFlipBook>
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages - 1}
          aria-label="Next page"
          className={`hidden md:flex items-center justify-center w-11 h-11 rounded-full bg-[#18141A]/90 hover:bg-[#221D25] border border-[#2E2733] hover:border-[#E91E63]/60 text-white shadow-lg backdrop-blur-md transition-all duration-300 absolute -right-14 top-1/2 -translate-y-1/2 z-30 ${
            currentPage >= totalPages - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-90 hover:scale-105 hover:shadow-[0_0_15px_rgba(233,30,99,0.4)]'
          }`}
        >
          <ChevronRight className="w-5 h-5 text-zinc-200" />
        </button>
      </div>

      <div className="mt-4 sm:mt-6 flex items-center justify-center gap-3 sm:gap-6 bg-[#18141A]/85 border border-[#2E2733] px-4 py-2 rounded-full shadow-md backdrop-blur-md">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          aria-label="Previous Page"
          className={`p-1.5 rounded-full hover:bg-white/10 text-zinc-300 transition-colors ${
            currentPage === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100 hover:text-[#E91E63]'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => bookRef.current?.pageFlip().turnToPage(idx)}
              aria-label={`Jump to page ${idx + 1}`}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                currentPage === idx
                  ? 'w-5 sm:w-6 bg-[#E91E63] shadow-[0_0_8px_rgba(233,30,99,0.7)]'
                  : 'w-1.5 sm:w-2 bg-zinc-600 hover:bg-zinc-400'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-zinc-300 font-sans tracking-wide">
          <BookOpen className="w-3.5 h-3.5 text-[#E91E63]" />
          <span>
            {currentPage === 0
              ? 'Cover'
              : currentPage === totalPages - 1
              ? 'Keepsake'
              : `Page ${currentPage + 1} of ${totalPages}`}
          </span>
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages - 1}
          aria-label="Next Page"
          className={`p-1.5 rounded-full hover:bg-white/10 text-zinc-300 transition-colors ${
            currentPage >= totalPages - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-100 hover:text-[#E91E63]'
          }`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <span className="mt-2 text-[11px] text-zinc-400 font-sans tracking-wider hidden sm:block">
        Drag page corners to curl or use arrow buttons to flip
      </span>
    </div>
  );
};
