import { anniversaryData } from '../data/anniversaryData';
import { MusicTrack } from '../types';

export type TrackKey = 'initial' | 'opening' | 'keepsake';

interface AudioState {
  currentTrack: MusicTrack;
  trackKey: TrackKey;
  isPlaying: boolean;
  isMuted: boolean;
  isAutoplayBlocked: boolean;
}

class RomanticAudioController {
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private isAutoplayBlocked: boolean = false;
  private currentTrackKey: TrackKey = 'initial';

  private playerA: HTMLAudioElement | null = null;
  private playerB: HTMLAudioElement | null = null;
  private activePlayerSlot: 'A' | 'B' = 'A';
  private masterVolume: number = 0.7;
  private fadeInterval: number | null = null;
  private listeners: Set<(state: AudioState) => void> = new Set();

  constructor() {
    this.initAudioElements();
    this.setupAutoplayUnlock();
    this.attemptInitialAutoplay();
  }

  private initAudioElements() {
    if (typeof window === 'undefined') return;
    this.playerA = new Audio();
    this.playerA.loop = true;
    this.playerA.preload = 'auto';

    this.playerB = new Audio();
    this.playerB.loop = true;
    this.playerB.preload = 'auto';
  }

  private attemptInitialAutoplay() {
    if (typeof window === 'undefined') return;
    setTimeout(() => {
      this.playTrack('initial');
    }, 100);
  }

  private setupAutoplayUnlock() {
    if (typeof window === 'undefined') return;

    const unlock = () => {
      this.isAutoplayBlocked = false;
      const active = this.getActivePlayer();
      if (active) {
        active.muted = this.isMuted;
        active.volume = this.isMuted ? 0 : this.masterVolume;
        active.play().catch(() => {});
      } else {
        this.playTrack(this.currentTrackKey);
      }
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('click', unlock);
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('keydown', unlock);
      window.removeEventListener('scroll', unlock);
      this.notify();
    };

    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('click', unlock, { once: true });
    window.addEventListener('touchstart', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });
    window.addEventListener('scroll', unlock, { once: true });
  }

  public subscribe(callback: (state: AudioState) => void): () => void {
    this.listeners.add(callback);
    callback(this.getState());
    return () => this.listeners.delete(callback);
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach((cb) => cb(state));
  }

  public getState(): AudioState {
    const currentTrack = anniversaryData.music.tracks[this.currentTrackKey];
    return {
      currentTrack,
      trackKey: this.currentTrackKey,
      isPlaying: this.isPlaying && !this.isMuted,
      isMuted: this.isMuted,
      isAutoplayBlocked: this.isAutoplayBlocked,
    };
  }

  private getActivePlayer(): HTMLAudioElement | null {
    return this.activePlayerSlot === 'A' ? this.playerA : this.playerB;
  }

  private getInactivePlayer(): HTMLAudioElement | null {
    return this.activePlayerSlot === 'A' ? this.playerB : this.playerA;
  }

  public playTrack(trackKey: TrackKey) {
    this.currentTrackKey = trackKey;
    this.isPlaying = true;

    const track = anniversaryData.music.tracks[trackKey];
    const targetUrl = track.audioUrl;
    if (!targetUrl) {
      this.notify();
      return;
    }

    const currentActive = this.getActivePlayer();
    const nextPlayer = this.getInactivePlayer();

    if (!nextPlayer) {
      this.notify();
      return;
    }

    if (this.fadeInterval) {
      window.clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }

    nextPlayer.src = targetUrl;
    nextPlayer.muted = this.isMuted;
    nextPlayer.volume = 0;

    nextPlayer
      .play()
      .then(() => {
        this.isAutoplayBlocked = false;
        this.activePlayerSlot = this.activePlayerSlot === 'A' ? 'B' : 'A';
        this.crossFade(currentActive, nextPlayer);
      })
      .catch(() => {
        this.isAutoplayBlocked = true;
        this.activePlayerSlot = this.activePlayerSlot === 'A' ? 'B' : 'A';
        nextPlayer.volume = this.masterVolume;
      });

    this.notify();
  }

  private crossFade(fadeOutPlayer: HTMLAudioElement | null, fadeInPlayer: HTMLAudioElement) {
    const targetVol = this.isMuted ? 0 : this.masterVolume;
    const steps = 25;
    const intervalMs = 60;
    let stepCount = 0;

    const initialFadeOutVol = fadeOutPlayer ? fadeOutPlayer.volume : 0;

    this.fadeInterval = window.setInterval(() => {
      stepCount++;
      const progress = Math.min(stepCount / steps, 1);

      fadeInPlayer.volume = targetVol * progress;

      if (fadeOutPlayer) {
        fadeOutPlayer.volume = Math.max(initialFadeOutVol * (1 - progress), 0);
      }

      if (progress >= 1) {
        if (this.fadeInterval) {
          window.clearInterval(this.fadeInterval);
          this.fadeInterval = null;
        }
        if (fadeOutPlayer) {
          fadeOutPlayer.pause();
          fadeOutPlayer.currentTime = 0;
        }
      }
    }, intervalMs);
  }

  public transitionToOpening() {
    if (this.currentTrackKey === 'opening') return;
    this.playTrack('opening');
  }

  public transitionToKeepsake() {
    if (this.currentTrackKey === 'keepsake') return;
    this.playTrack('keepsake');
  }

  public transitionToInitial() {
    if (this.currentTrackKey === 'initial') return;
    this.playTrack('initial');
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;

    if (this.playerA) {
      this.playerA.muted = this.isMuted;
      this.playerA.volume = this.isMuted ? 0 : this.masterVolume;
    }

    if (this.playerB) {
      this.playerB.muted = this.isMuted;
      this.playerB.volume = this.isMuted ? 0 : this.masterVolume;
    }

    if (!this.isMuted && !this.isPlaying) {
      this.playTrack(this.currentTrackKey);
    }

    this.notify();
    return this.isMuted;
  }

  public playEnvelopeOpenSound() {}

  public playPageFlipSound() {}

  public playMessageChime() {}
}

export const romanticAudio = new RomanticAudioController();
