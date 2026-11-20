export interface LetterPage {
  id: number;
  type: 'cover' | 'letter' | 'keepsake';
  title?: string;
  subtitle?: string;
  salutation?: string;
  date?: string;
  content?: string[];
  signature?: string;
  signoff?: string;
  decorativeQuote?: string;
  accentIcon?: string;
}

export interface PolaroidPhoto {
  id: string;
  type?: 'image' | 'video';
  url: string;
  poster?: string;
  caption: string;
  date: string;
  location?: string;
  story?: string;
  initialRotation: number;
  desktopPosition: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  page?: number;
  revealedOnPage?: number;
}

export interface PromiseItem {
  id: number;
  text: string;
  checked: boolean;
}

export interface QAOption {
  label: string;
  reply: string;
}

export interface QAQuestion {
  id: number;
  prompt: string;
  options: QAOption[];
}

export interface ChatMessage {
  id: string;
  sender: 'ayanfe' | 'meema';
  text: string;
  timestamp?: string;
  isQuestion?: boolean;
  questionId?: number;
  options?: QAOption[];
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  audioUrl?: string;
}

export interface AnniversaryData {
  couple: {
    partnerName: string;
    partnerNickname: string;
    senderName: string;
    milestone: string;
    startDate: string;
    anniversaryDate: string;
  };
  music: {
    tracks: {
      initial: MusicTrack;
      opening: MusicTrack;
      keepsake: MusicTrack;
    };
    autoPlayHint: string;
  };
  envelope: {
    sealText: string;
    promptText: string;
    stampSubtext: string;
  };
  chat: {
    senderDisplayName: string;
    senderSubtext: string;
    initialGreeting: string;
    questions: QAQuestion[];
    closingMessage: string;
    buttonToLetter: string;
  };
  pages: LetterPage[];
  photos: PolaroidPhoto[];
  promises: PromiseItem[];
}
