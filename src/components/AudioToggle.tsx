import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Disc } from 'lucide-react';
import { romanticAudio } from '../utils/audio';
import { MusicTrack } from '../types';
import { anniversaryData } from '../data/anniversaryData';

export const AudioToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<MusicTrack>(
    anniversaryData.music.tracks.initial
  );
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false);

  useEffect(() => {
    const unsubscribe = romanticAudio.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setIsMuted(state.isMuted);
      setCurrentTrack(state.currentTrack);
      setIsAutoplayBlocked(state.isAutoplayBlocked);
    });
    return () => unsubscribe();
  }, []);

  const handleToggle = () => {
    romanticAudio.toggleMute();
  };

  return (
    <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-2 select-none">
      <button
        onClick={handleToggle}
        title={`${currentTrack.title} • ${currentTrack.artist} (Click to ${isMuted || !isPlaying ? 'enable' : 'mute'} audio)`}
        aria-label={isPlaying ? 'Mute audio' : 'Play audio'}
        className="group relative flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#18141A]/90 hover:bg-[#221D25] border border-[#2E2733] hover:border-[#E91E63]/60 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(233,30,99,0.35)] backdrop-blur-md text-[#FFFDF9]"
      >
        <span
          className={`absolute inset-0 rounded-full bg-[#E91E63]/10 transition-opacity duration-500 pointer-events-none ${
            isPlaying ? 'opacity-100 animate-pulse' : 'opacity-0'
          }`}
        />

        <div className="flex items-end gap-[3px] h-3.5 w-3.5 justify-center">
          {isPlaying ? (
            <>
              <span className="w-[2.5px] bg-[#E91E63] rounded-full animate-[bounce_0.8s_ease-in-out_infinite] h-full" />
              <span className="w-[2.5px] bg-[#E91E63] rounded-full animate-[bounce_1.1s_ease-in-out_infinite_0.2s] h-3/4" />
              <span className="w-[2.5px] bg-[#E91E63] rounded-full animate-[bounce_0.9s_ease-in-out_infinite_0.4s] h-1/2" />
            </>
          ) : (
            <Music className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#E91E63] transition-colors" />
          )}
        </div>

        <div className="hidden sm:flex flex-col text-left max-w-[170px] truncate leading-tight">
          <span className="text-xs font-semibold text-zinc-100 group-hover:text-white truncate">
            {currentTrack.title}
          </span>
          <span className="text-[10px] text-zinc-400 truncate">
            {currentTrack.artist}
          </span>
        </div>

        {isPlaying ? (
          <Volume2 className="w-3.5 h-3.5 text-[#E91E63]" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-200" />
        )}
      </button>

      {isAutoplayBlocked && (
        <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] text-[#F8BBD0] bg-[#18141A]/90 border border-[#E91E63]/40 px-3 py-1 rounded-full backdrop-blur-sm shadow-md animate-pulse">
          <Disc className="w-3 h-3 text-[#E91E63] animate-spin" />
          <span>Tap anywhere to hear Daylight 🎵</span>
        </span>
      )}
    </div>
  );
};
