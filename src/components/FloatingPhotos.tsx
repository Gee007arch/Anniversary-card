import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, X, Sparkles } from 'lucide-react';
import { PolaroidPhoto } from '../types';
import { PolaroidCard } from './PolaroidCard';

interface FloatingPhotosProps {
  photos: PolaroidPhoto[];
  currentPage: number;
  onSelectPhoto: (photo: PolaroidPhoto) => void;
}

export const FloatingPhotos: React.FC<FloatingPhotosProps> = ({
  photos,
  currentPage,
  onSelectPhoto,
}) => {
  const [mobileTrayOpen, setMobileTrayOpen] = useState(false);
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMouseParallax({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const activePhotos = photos.filter(
    (photo) => photo.page === currentPage || (photo.page === undefined && currentPage === 0)
  );

  return (
    <>
      <div className="hidden lg:block fixed inset-0 pointer-events-none z-20 overflow-hidden">
        <AnimatePresence mode="popLayout">
          {activePhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.7, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: -30 }}
              transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="absolute pointer-events-auto"
              style={{
                top: photo.desktopPosition.top,
                bottom: photo.desktopPosition.bottom,
                left: photo.desktopPosition.left,
                right: photo.desktopPosition.right,
              }}
            >
              <PolaroidCard
                photo={photo}
                index={index}
                onClick={() => onSelectPhoto(photo)}
                isFloatingDesktop={true}
                parallaxOffset={mouseParallax}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="lg:hidden fixed bottom-3 inset-x-0 z-30 flex flex-col items-center pointer-events-none px-4">
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={() => setMobileTrayOpen(!mobileTrayOpen)}
          className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full bg-[#18141A]/95 border border-[#2E2733] hover:border-[#E91E63]/60 text-white shadow-xl backdrop-blur-md text-xs font-sans tracking-wide transition-all active:scale-95"
        >
          <ImageIcon className="w-3.5 h-3.5 text-[#E91E63]" />
          <span>{mobileTrayOpen ? 'Close Photos' : 'Meema’s Moments 📸'}</span>
          <span className="flex items-center text-[10px] bg-[#E91E63] text-white px-1.5 py-0.2 rounded-full font-bold">
            {activePhotos.length}
          </span>
        </motion.button>

        <AnimatePresence>
          {mobileTrayOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: 'spring', damping: 24, stiffness: 300 }}
              className="pointer-events-auto mt-2 w-full max-w-md bg-[#18141A]/95 border border-[#2E2733] rounded-2xl p-3 shadow-2xl backdrop-blur-lg flex flex-col gap-2"
            >
              <div className="flex items-center justify-between px-2 pt-1">
                <span className="text-xs font-serif text-[#FCE4EC] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#E91E63]" />
                  Tap any photo to view full memory
                </span>
                <button
                  onClick={() => setMobileTrayOpen(false)}
                  className="p-1 rounded-full text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-3 overflow-x-auto py-2 px-1 scrollbar-none snap-x snap-mandatory">
                {activePhotos.map((photo, index) => (
                  <div key={photo.id} className="snap-center flex-shrink-0">
                    <PolaroidCard
                      photo={photo}
                      index={index}
                      onClick={() => {
                        onSelectPhoto(photo);
                        setMobileTrayOpen(false);
                      }}
                      isFloatingDesktop={false}
                      className="w-[140px] max-w-[150px] scale-95"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
