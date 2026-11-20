import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { PolaroidPhoto } from '../types';

interface LightboxModalProps {
  photo: PolaroidPhoto | null;
  photos: PolaroidPhoto[];
  onClose: () => void;
  onSelectPhoto: (photo: PolaroidPhoto) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photo,
  photos,
  onClose,
  onSelectPhoto,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!photo) return;
      const currentIndex = photos.findIndex((p) => p.id === photo.id);
      if (e.key === 'ArrowRight' && currentIndex < photos.length - 1) {
        onSelectPhoto(photos[currentIndex + 1]);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onSelectPhoto(photos[currentIndex - 1]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photo, photos, onClose, onSelectPhoto]);

  if (!photo) return null;

  const currentIndex = photos.findIndex((p) => p.id === photo.id);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) onSelectPhoto(photos[currentIndex - 1]);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < photos.length - 1) onSelectPhoto(photos[currentIndex + 1]);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 select-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#0D0B0E]/90 backdrop-blur-md"
        />

        <motion.div
          initial={{ scale: 0.88, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.88, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          className="relative max-w-lg w-full bg-[#FFFDF9] text-[#1F1A1D] rounded-xl p-4 sm:p-6 shadow-2xl border border-[#E8DFD1] z-10 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#E91E63]/20 border-b border-white/40 shadow-sm" />

          <button
            onClick={onClose}
            aria-label="Close photo preview"
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/10 hover:bg-[#E91E63] hover:text-white transition-colors duration-200 text-zinc-700 z-20"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-zinc-900 shadow-inner group">
            {photo.type === 'video' || photo.url.endsWith('.mp4') ? (
              <video
                src={photo.url}
                poster={photo.poster}
                autoPlay
                loop
                muted
                playsInline
                controls
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}

            {currentIndex > 0 && (
              <button
                onClick={handlePrev}
                aria-label="Previous photo"
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-[#E91E63] text-white backdrop-blur-sm transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            {currentIndex < photos.length - 1 && (
              <button
                onClick={handleNext}
                aria-label="Next photo"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-[#E91E63] text-white backdrop-blur-sm transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-zinc-500 font-sans">
              <div className="flex items-center gap-1 text-[#E91E63] font-medium">
                <Calendar className="w-3.5 h-3.5" />
                <span>{photo.date}</span>
              </div>
              {photo.location && (
                <div className="flex items-center gap-1 text-zinc-500">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{photo.location}</span>
                </div>
              )}
            </div>

            <h3 className="font-handwriting text-2xl sm:text-3xl text-[#1F1A1D] leading-tight">
              {photo.caption}
            </h3>

            {photo.story && (
              <p className="font-serif text-xs sm:text-sm text-zinc-600 italic leading-relaxed pt-1 border-t border-[#E8DFD1]/80">
                "{photo.story}"
              </p>
            )}

            <div className="flex items-center justify-between pt-2 text-[11px] text-zinc-400 font-sans">
              <span className="flex items-center gap-1 text-[#E91E63]">
                <Heart className="w-3 h-3 fill-[#E91E63]" />
                Memory {currentIndex + 1} of {photos.length}
              </span>
              <span>Click backdrop or press Esc to close</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
