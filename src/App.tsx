import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, RotateCcw, MessageCircleHeart } from 'lucide-react';
import { LoadingScreen } from './components/LoadingScreen';
import { PetalBackground } from './components/PetalBackground';
import { AudioToggle } from './components/AudioToggle';
import { Envelope } from './components/Envelope';
import { InteractiveChat } from './components/InteractiveChat';
import { Booklet } from './components/Booklet';
import { FloatingPhotos } from './components/FloatingPhotos';
import { LightboxModal } from './components/LightboxModal';
import { AnniversaryCard } from './components/AnniversaryCard';
import { anniversaryData } from './data/anniversaryData';
import { romanticAudio } from './utils/audio';
import { PolaroidPhoto } from './types';

type AppFlowState = 'loading' | 'chat' | 'envelope' | 'opening' | 'book';

export const App: React.FC = () => {
  const [viewState, setViewState] = useState<AppFlowState>('loading');
  const [currentBookPage, setCurrentBookPage] = useState<number>(0);
  const [selectedPhoto, setSelectedPhoto] = useState<PolaroidPhoto | null>(null);
  const [showAnniversaryCard, setShowAnniversaryCard] = useState<boolean>(false);

  useEffect(() => {
    romanticAudio.playTrack('initial');

    const handleFirstTouch = () => {
      romanticAudio.playTrack('initial');
    };
    window.addEventListener('pointerdown', handleFirstTouch, { once: true });
    window.addEventListener('click', handleFirstTouch, { once: true });
    window.addEventListener('touchstart', handleFirstTouch, { once: true });
    return () => {
      window.removeEventListener('pointerdown', handleFirstTouch);
      window.removeEventListener('click', handleFirstTouch);
      window.removeEventListener('touchstart', handleFirstTouch);
    };
  }, []);

  const handleLoadingComplete = () => {
    setViewState('chat');
  };

  const handleChatComplete = () => {
    setViewState('envelope');
  };

  const handleSealClick = () => {
    setViewState('opening');
  };

  const handleEnvelopeOpenComplete = () => {
    romanticAudio.transitionToOpening();
    setViewState('book');
  };

  const handleRevisitChat = () => {
    setViewState('chat');
  };

  const handleResetToEnvelope = () => {
    romanticAudio.transitionToInitial();
    setViewState('envelope');
  };

  const handleBookPageChange = (pageIdx: number) => {
    setCurrentBookPage(pageIdx);
    if (pageIdx === anniversaryData.pages.length - 1) {
      romanticAudio.transitionToKeepsake();
      setTimeout(() => setShowAnniversaryCard(true), 1800);
    }
  };

  const handleCardClose = () => {
    setShowAnniversaryCard(false);
  };

  const handleReadAgain = () => {
    setShowAnniversaryCard(false);
    setCurrentBookPage(0);
    romanticAudio.transitionToInitial();
    setViewState('chat');
  };

  return (
    <main className="relative min-h-screen w-full bg-[#0D0B0E] text-[#FFFDF9] overflow-x-hidden flex flex-col items-center justify-between selection:bg-[#E91E63] selection:text-white">
      <AnimatePresence>
        {viewState === 'loading' && (
          <LoadingScreen onLoaded={handleLoadingComplete} />
        )}
      </AnimatePresence>

      <PetalBackground />

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#E91E63]/10 blur-[130px]" />
        <div className="absolute -top-32 -right-32 w-[450px] h-[450px] rounded-full bg-[#E91E63]/12 blur-[100px]" />
        <div className="absolute -bottom-32 -left-32 w-[450px] h-[450px] rounded-full bg-[#E91E63]/10 blur-[100px]" />
      </div>

      <header className="relative w-full z-40 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 max-w-7xl select-none">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2"
        >
          <div className="w-9 h-9 rounded-full bg-[#18141A] border border-[#2E2733] flex items-center justify-center shadow-md">
            <Heart className="w-4 h-4 text-[#E91E63] fill-[#E91E63]/40" />
          </div>
          <div>
            <h1 className="font-serif text-sm sm:text-base font-bold text-[#FFFDF9] tracking-wide">
              {anniversaryData.couple.milestone}
            </h1>
            <p className="font-sans text-[11px] text-[#F8BBD0]/80 tracking-wider">
              {anniversaryData.couple.partnerNickname} &amp; Ayanfe
            </p>
          </div>
        </motion.div>

        <div className="hidden sm:flex items-center gap-2">
          {viewState === 'book' && (
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleRevisitChat}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#18141A]/80 hover:bg-[#221D25] border border-[#2E2733] hover:border-[#E91E63]/50 text-xs text-zinc-300 hover:text-white transition-all shadow-sm"
            >
              <MessageCircleHeart className="w-3.5 h-3.5 text-[#E91E63]" />
              <span>Ayanfe’s Q&amp;A</span>
            </motion.button>
          )}

          {(viewState === 'book' || viewState === 'chat') && (
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleResetToEnvelope}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#18141A]/80 hover:bg-[#221D25] border border-[#2E2733] hover:border-[#E91E63]/50 text-xs text-zinc-300 hover:text-white transition-all shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#E91E63]" />
              <span>Re-seal Envelope</span>
            </motion.button>
          )}
        </div>

        <AudioToggle />
      </header>

      <AnimatePresence>
        {showAnniversaryCard && (
          <motion.div
            key="bg-video-trio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 flex items-center justify-center md:justify-around px-4 md:px-8 lg:px-16 bg-[#0D0B0E] overflow-hidden pointer-events-none"
          >
            <div className="hidden md:flex items-center justify-center aspect-[9/16] h-[78vh] lg:h-[84vh] max-h-[820px] rounded-3xl overflow-hidden border border-[#2E2733]/60 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(233,30,99,0.15)] bg-black">
              <video
                src="/background-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center justify-center aspect-[9/16] h-[78vh] lg:h-[84vh] max-h-[820px] rounded-3xl overflow-hidden border border-[#2E2733]/40 shadow-2xl bg-black">
              <video
                src="/background-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>

            <div className="hidden md:flex items-center justify-center aspect-[9/16] h-[78vh] lg:h-[84vh] max-h-[820px] rounded-3xl overflow-hidden border border-[#2E2733]/60 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(233,30,99,0.15)] bg-black">
              <video
                src="/background-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative w-full flex-1 flex flex-col items-center justify-center z-20 py-4 sm:py-6 px-2">
        <AnimatePresence mode="wait">
          {(viewState === 'envelope' || viewState === 'opening') && (
            <motion.div
              key="envelope-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6 }}
              className="w-full flex items-center justify-center"
            >
              <Envelope
                onSealClick={handleSealClick}
                onOpenComplete={handleEnvelopeOpenComplete}
              />
            </motion.div>
          )}

          {viewState === 'chat' && (
            <motion.div
              key="chat-view"
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="w-full flex items-center justify-center"
            >
              <InteractiveChat onComplete={handleChatComplete} />
            </motion.div>
          )}

          {viewState === 'book' && (
            <motion.div
              key="book-view"
              initial={{ opacity: 0, scale: 0.92, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.75, ease: 'easeOut' }}
              className="w-full flex flex-col items-center justify-center"
            >
              <Booklet
                onPageChange={handleBookPageChange}
                onFinishLetter={() => setShowAnniversaryCard(true)}
              />

              <FloatingPhotos
                photos={anniversaryData.photos}
                currentPage={currentBookPage}
                onSelectPhoto={(photo) => setSelectedPhoto(photo)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <LightboxModal
        photo={selectedPhoto}
        photos={anniversaryData.photos}
        onClose={() => setSelectedPhoto(null)}
        onSelectPhoto={(photo) => setSelectedPhoto(photo)}
      />

      <AnimatePresence>
        {showAnniversaryCard && (
          <AnniversaryCard
            onReadAgain={handleReadAgain}
            onClose={handleCardClose}
          />
        )}
      </AnimatePresence>

      <footer className="relative w-full z-10 py-3 text-center text-[11px] text-zinc-500 font-sans tracking-widest uppercase">
        <span>For {anniversaryData.couple.partnerName} • Happy 1-Month Anniversary</span>
      </footer>
    </main>
  );
};

export default App;
