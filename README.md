# 🌹 30 Days With You — Personalized 1-Month Anniversary Web App

A romantic, luxury interactive anniversary web application created for **Jemimah Adeyinka Aderibigbe (Meema baby / Suki)** from **Ayanfe (GeeOfficial)**, celebrating your first month together.

Built with **React**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **react-pageflip**.

---

## 🎶 Continuous Autoplay Music & Sequential Playback System

The application features a cinematic, continuous audio system with automatic cross-fade transitions tied to user milestones:

1. **Track 1: "Daylight" — David Kushner**:
   - Starts automatically immediately when the application initializes (on the loading screen & 3D envelope landing state).
   - Seamlessly handles browser autoplay policies by registering gesture listeners so audio unlocks on the very first touch/click without interruption.

2. **Track 2: "Dandelions" — Ruth B**:
   - The moment the envelope opening animation completes, the audio engine performs a smooth cross-fade (~1.8s) from *"Daylight"* to *"Dandelions"*.
   - Plays continuously throughout the interactive Q&A chat with Ayanfe and the handwritten letter pages.

3. **Track 3: "For My Hand" — Burna Boy feat. Ed Sheeran**:
   - Immediately when the letter finishes displaying and the final "Happy 1 Month Anniversary" keepsake card appears on screen, playback smoothly cross-fades into *"For My Hand"*.

4. **Universal Master Volume & Audio Controls**:
   - Consistent, normalized volume levels across all tracks.
   - Smooth volume cross-fades ensure zero jarring cuts.
   - Dual-engine fallback: Supports custom audio files (`public/audio/daylight.mp3`, `dandelions.mp3`, `formyhand.mp3`) with an authentic Web Audio API acoustic piano arrangement synthesized in real-time if local files are absent.
   - Top-right corner floating audio widget with real-time track info (*"🎵 Now Playing: Track — Artist"*), animated visualizer bars, and one-click mute/unmute.

---

## ✨ Complete User Experience Flow

1. **Polished Loading State**:
   - Ambient luxury dark screen with animated crimson-rose heart crest.
   - Live progress indicator (0% → 100%) that preloads images, acoustic piano audio, and fonts to ensure a smooth, artifact-free experience from the first interaction.

2. **Physically-Calibrated 3D Envelope Landing State**:
   - Centered 3D Matte Onyx (`#18141A`) envelope resting in a deep velvet black atmosphere with ambient crimson glows (`rgba(233, 30, 99, 0.18)`).
   - Sealed with a glowing `#E91E63` crimson wax seal stamped with **"J & A"**.
   - Subtle prompt: *"Tap the wax seal to open for Meema baby"*.
   - **Physics-based opening mechanics**: Calibrated cubic-bezier easing curves unfold the top flap (`rotateX(-180deg)`), accompanied by a discrete paper-slide and seal-break audio effect, sliding the folded booklet upward.

3. **Interactive Romantic Q&A Chatbox**:
   - Immediately following envelope opening, a luxury dark glassmorphism chatbox appears from *"Ayanfe (Ur Handsome Baby) ❤️"*.
   - Starts with: *"hey there from ur handsome baby Ayanfe 🥰"*.
   - Interactive Q&A prompts asking how dating has felt over the past month.
   - Meema selects from thoughtfully crafted response options; Ayanfe replies with personalized sweet reactions and typing indicators.
   - Concludes with Ayanfe's message and a grand glowing button: **"Open My Anniversary Letter 📖"**.

4. **Multi-Page Flipbook Experience (`react-pageflip`)**:
   - **Cover Page**: "30 Days With You — For Jemimah Adeyinka Aderibigbe — Month One".
   - **Page 1 (The Beginning)**: "My Dearest Meema baby..." — recounting how natural everything feels and how she became your favorite person.
   - **Page 2 (The Little Things)**: "What I Adore About You" — celebrating her laugh, warmth, and effortless grace.
   - **Page 3 (How You Make Me Feel)**: "My Safe Space" — sharing the peace, real connection, and happiness of the past 4 weeks.
   - **Page 4 (Looking Ahead)**: "Here’s to Many More" — looking forward to all the tomorrows, signed *"Forever yours, GeeOfficial"*.
   - **Page 5 (Keepsake Page)**: Interactive checklist of promises for Meema baby, milestone counter badge, and a **"Celebrate 30 Days of Us"** button with a confetti burst.
   - Supports realistic page curl dragging, keyboard arrows (`←` / `→`), Next/Previous controls, and page dots indicator with discrete realistic page turn audio.

5. **Floating Polaroid Photo Frames & Parallax**:
   - 5 Polaroid-style photo cards that drift with slow, gentle floating trajectories (`y` and subtle `rotate` bobbing).
   - Dynamic mouse parallax movement responding subtly to cursor motion.
   - Progressive entrance: photos appear progressively as pages are turned.
   - Mobile-Safe: On mobile viewports, photos are safely tucked into a bottom drawer so they never obstruct reading.
   - Click-to-enlarge Lightbox modal with story, date, and location.

---

## 💻 Running the App

### Start Local Development Server:
```bash
npm run dev
```
Open **[http://127.0.0.1:3000/](http://127.0.0.1:3000/)** in your browser.

### Build Production Bundle:
```bash
npm run build
```
Creates an optimized static build in `dist/` ready to be hosted on Vercel, Netlify, Cloudflare Pages, or GitHub Pages.
