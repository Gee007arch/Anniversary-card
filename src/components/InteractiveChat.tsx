import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Send, ArrowRight } from 'lucide-react';
import { anniversaryData } from '../data/anniversaryData';
import { QAOption } from '../types';
import { romanticAudio } from '../utils/audio';

interface InteractiveChatProps {
  onComplete: () => void;
}

type ChatPhase =
  | 'greeting'
  | 'waiting-reply'
  | 'options-question'
  | 'closing'
  | 'done';

interface DisplayMessage {
  id: string;
  sender: 'ayanfe' | 'meema';
  text: string;
  time: string;
}

const FREE_STEPS: Array<{ id: string; prompt: string; ayanfeReply?: string }> = [
  {
    id: 'hey',
    prompt: '',
  },
  {
    id: 'dating',
    prompt: 'I have a little surprise for you, but first how has dating me been like for you? 💭',
    ayanfeReply: 'That means so much to me, baby 🥺❤️',
  },
];

export const InteractiveChat: React.FC<InteractiveChatProps> = ({ onComplete }) => {
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [phase, setPhase] = useState<ChatPhase>('greeting');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(-1);
  const [freeStepIndex, setFreeStepIndex] = useState<number>(0);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const hasInitializedRef = useRef<boolean>(false);
  const firstReplyRef = useRef<string>('');

  const sendRepliesToEmail = (firstReply: string, secondReply: string) => {
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;
    if (!accessKey) return;

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: "Meema's 1-Month Anniversary Replies 💌",
        from_name: 'Anniversary Web App',
        reply_to_hey_baby: firstReply,
        dating_experience_reply: secondReply,
        date_submitted: new Date().toLocaleString(),
      }),
    }).catch(() => {});
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const addAyanfeMessage = (id: string, text: string, delay: number, onDone?: () => void) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      romanticAudio.playMessageChime();
      setMessages((prev) => {
        if (prev.some((m) => m.id === id)) return prev;
        return [...prev, { id, sender: 'ayanfe', text, time: getCurrentTime() }];
      });
      onDone?.();
    }, delay);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;
    addAyanfeMessage('msg-greeting', 'Hey baby 🥰', 1200, () => {
      setPhase('waiting-reply');
      setTimeout(() => inputRef.current?.focus(), 300);
    });
  }, []);

  const handleFreeSubmit = () => {
    const val = inputValue.trim();
    if (!val) return;

    setMessages((prev) => [
      ...prev,
      { id: `meema-free-${Date.now()}`, sender: 'meema', text: val, time: getCurrentTime() },
    ]);
    setInputValue('');
    setPhase('greeting');

    const stepIdx = freeStepIndex;
    const nextFreeIdx = freeStepIndex + 1;

    if (stepIdx === 0) {
      firstReplyRef.current = val;
      setFreeStepIndex(nextFreeIdx);
      sendRepliesToEmail(val, '(awaiting reply 2...)');
      addAyanfeMessage(
        'msg-mid',
        FREE_STEPS[1].prompt,
        1400,
        () => {
          setPhase('waiting-reply');
          setTimeout(() => inputRef.current?.focus(), 300);
        }
      );
    } else if (stepIdx === 1) {
      setFreeStepIndex(nextFreeIdx);
      sendRepliesToEmail(firstReplyRef.current, val);
      if (FREE_STEPS[1].ayanfeReply) {
        addAyanfeMessage('msg-after-dating', FREE_STEPS[1].ayanfeReply, 1300, () => {
          askOptionsQuestion(0);
        });
      } else {
        askOptionsQuestion(0);
      }
    }
  };

  const askOptionsQuestion = (index: number) => {
    if (index >= anniversaryData.chat.questions.length) {
      addAyanfeMessage(
        'msg-closing',
        'Wonderful, to mark 1 month of being with you, here\'s my surprise 🎁✨',
        1200,
        () => {
          setPhase('done');
          setTimeout(() => onComplete(), 1200);
        }
      );
      return;
    }
    addAyanfeMessage(
      `question-${anniversaryData.chat.questions[index].id}`,
      anniversaryData.chat.questions[index].prompt,
      1100,
      () => {
        setPhase('options-question');
        setCurrentQuestionIndex(index);
      }
    );
  };

  const handleSelectOption = (option: QAOption) => {
    setMessages((prev) => [
      ...prev,
      { id: `meema-opt-${Date.now()}`, sender: 'meema', text: option.label, time: getCurrentTime() },
    ]);
    const prevIdx = currentQuestionIndex;
    setCurrentQuestionIndex(-1);
    setPhase('greeting');

    addAyanfeMessage(`ayanfe-reply-${Date.now()}`, option.reply, 1100, () => {
      setTimeout(() => askOptionsQuestion(prevIdx + 1), 1200);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleFreeSubmit();
  };

  const isFreeInputVisible = phase === 'waiting-reply' && !isTyping;
  const isOptionsVisible = phase === 'options-question' && !isTyping && currentQuestionIndex !== -1;
  const isWaiting = !isFreeInputVisible && !isOptionsVisible && phase !== 'done';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: -20 }}
      transition={{ type: 'spring', damping: 25, stiffness: 260 }}
      className="relative w-full max-w-lg mx-auto bg-[#18141A]/95 border border-[#2E2733] rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col h-[560px] sm:h-[620px] select-none z-30"
    >
      <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-gradient-to-r from-[#1C1620] to-[#141016] border-b border-[#2E2733] relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#D81B60] to-[#E91E63] p-0.5 shadow-md">
              <div className="w-full h-full rounded-full bg-[#18141A] flex items-center justify-center text-white">
                <Heart className="w-5 h-5 text-[#E91E63] fill-[#E91E63]" />
              </div>
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#18141A] shadow-sm animate-pulse" />
          </div>

          <div>
            <h3 className="font-sans font-semibold text-sm sm:text-base text-[#FFFDF9] flex items-center gap-1.5">
              <span>{anniversaryData.chat.senderDisplayName}</span>
            </h3>
            <p className="text-[11px] text-zinc-400 font-sans tracking-wide">
              {anniversaryData.chat.senderSubtext}
            </p>
          </div>
        </div>

        <button
          onClick={onComplete}
          className="text-xs text-[#E91E63] hover:text-[#FF4081] font-sans font-medium flex items-center gap-1 px-2.5 py-1 rounded-full hover:bg-white/5 transition-colors"
        >
          <span>Skip to Letter</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 scrollbar-thin scrollbar-thumb-zinc-700">
        <div className="text-center py-1">
          <span className="inline-flex items-center gap-1 text-[11px] font-serif text-[#F8BBD0]/70 bg-white/5 px-3 py-0.5 rounded-full border border-white/5">
            <Sparkles className="w-3 h-3 text-[#E91E63]" />
            <span>Celebrating 30 Days of Us</span>
            <Sparkles className="w-3 h-3 text-[#E91E63]" />
          </span>
        </div>

        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`flex flex-col ${msg.sender === 'meema' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 py-2.5 text-sm sm:text-[15px] leading-relaxed shadow-md ${
                msg.sender === 'meema'
                  ? 'bg-gradient-to-r from-[#D81B60] to-[#E91E63] text-white rounded-br-xs shadow-[0_4px_15px_rgba(233,30,99,0.3)]'
                  : 'bg-[#221B25] border border-[#3A2D3C] text-zinc-100 rounded-bl-xs'
              }`}
            >
              <p>{msg.text}</p>
            </div>
            <span className="text-[10px] text-zinc-500 font-sans mt-1 px-1">{msg.time}</span>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1.5 bg-[#221B25] border border-[#3A2D3C] rounded-2xl rounded-bl-xs px-4 py-2.5 w-fit shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#E91E63] animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 rounded-full bg-[#E91E63] animate-bounce" style={{ animationDelay: '180ms' }} />
            <span className="w-2 h-2 rounded-full bg-[#E91E63] animate-bounce" style={{ animationDelay: '360ms' }} />
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 sm:p-4 bg-[#141016] border-t border-[#2E2733] min-h-[90px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {isFreeInputVisible && (
            <motion.div
              key="free-input"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your reply..."
                className="flex-1 bg-[#1F1922] border border-[#36273B] focus:border-[#E91E63]/70 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition-colors"
              />
              <button
                onClick={handleFreeSubmit}
                disabled={!inputValue.trim()}
                className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#D81B60] to-[#E91E63] flex items-center justify-center shadow-[0_0_15px_rgba(233,30,99,0.4)] disabled:opacity-40 disabled:cursor-not-allowed transition-opacity active:scale-95"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </motion.div>
          )}

          {isOptionsVisible && (
            <motion.div
              key="options"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex flex-col gap-2"
            >
              <span className="text-[11px] font-sans uppercase tracking-wider text-zinc-400 font-medium pl-1">
                Tap your answer for Ayanfe:
              </span>
              <div className="flex flex-col gap-1.5">
                {anniversaryData.chat.questions[currentQuestionIndex]?.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt)}
                    className="w-full text-left text-xs sm:text-sm text-zinc-200 hover:text-white px-3.5 py-2.5 rounded-xl bg-[#1F1922] hover:bg-[#2C2130] border border-[#36273B] hover:border-[#E91E63]/70 transition-all duration-200 active:scale-[0.98] shadow-sm flex items-center justify-between group"
                  >
                    <span>{opt.label}</span>
                    <Send className="w-3.5 h-3.5 text-[#E91E63] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {isWaiting && (
            <motion.div
              key="waiting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center text-xs text-zinc-500 font-sans italic py-2"
            >
              Ayanfe is talking to you...
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
