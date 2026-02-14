"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  HiHeart,
  HiMusicalNote,
  HiCamera,
  HiSparkles,
  HiStar,
  HiFire
} from "react-icons/hi2";
import { BsFillSuitHeartFill } from "react-icons/bs";

// --- Components ---

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-champagne"
    >
      <div className="relative">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360]
          }}
          transition={{
            scale: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
            rotate: { repeat: Infinity, duration: 3, ease: "linear" }
          }}
          className="text-deep-rose"
        >
          <BsFillSuitHeartFill size={80} />
        </motion.div>
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center text-white"
        >
          <HiHeart size={30} />
        </motion.div>
      </div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 font-heading text-3xl text-deep-rose"
      >
        Preparing something special...
      </motion.p>
    </motion.div>
  );
};

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<{ id: number; left: number; delay: number; scale: number; duration: number }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      scale: Math.random() * 0.5 + 0.3,
      duration: Math.random() * 5 + 7,
    }));

    requestAnimationFrame(() => {
      setHearts(newHearts);
    });
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{ y: "-10vh", opacity: [0, 0.8, 0] }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
          style={{
            left: `${heart.left}%`,
            scale: heart.scale,
          }}
          className="absolute text-deep-rose/20"
        >
          <BsFillSuitHeartFill size={40} />
        </motion.div>
      ))}
    </div>
  );
};

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className={`relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-24 ${className}`}
    >
      <div className="flex w-full max-w-6xl flex-col items-center justify-center mx-auto">
        {children}
      </div>
    </motion.section>
  );
};

// --- Main Page Component ---

export default function ValentinePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [saidYes, setSaidYes] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);
  const [noButtonScale, setNoButtonScale] = useState(1);

  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Handle loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Minimum loading time for snazziness

    return () => clearTimeout(timer);
  }, []);

  const handleNoHover = () => {
    setNoCount((prev) => prev + 1);
    setNoButtonScale((prev) => Math.max(0, prev - 0.15));

    // Move slightly as it shrinks
    const bounds = 100;
    const x = (Math.random() - 0.5) * bounds * 2;
    const y = (Math.random() - 0.5) * bounds * 2;
    setNoButtonPos({ x, y });
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure?",
      "Really sure?",
      "Think again!",
      "Last chance!",
      "Surely not?",
      "You're breaking my heart ;(",
      "Give it another thought!",
      "I'm gonna cry...",
      "You're so mean!",
    ];
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  const images = [
    "/image/one.jpg",
    "/image/two.jpg",
    "/image/three.jpg",
    "/image/four.jpg",
    "/image/five.jpg",
    "/image/six.jpg",
    // "/images/one.jpg",
    // "/images/two.jpg",
    // "/images/three.jpg",
    // "/images/four.jpg",
    // "/images/five.jpg",
    // "/images/six.jpg",
  ];

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {!hasStarted ? (
        <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-champagne p-4 text-charcoal-berry">
          <FloatingHearts />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="z-10 flex w-full max-w-lg flex-col items-center gap-6 rounded-3xl bg-white/40 p-8 shadow-2xl backdrop-blur-md border border-white/50 sm:p-12 mx-auto"
          >
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <BsFillSuitHeartFill className="text-deep-rose text-7xl sm:text-9xl drop-shadow-lg" />
              </motion.div>
              <HiSparkles className="absolute -top-4 -right-4 text-gold-leaf text-3xl sm:text-5xl animate-pulse" />
            </div>

            <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl text-deep-rose drop-shadow-sm">
              Hey You...
            </h1>
            <p className="font-body text-lg sm:text-xl italic text-charcoal-berry/80">I have a little story to tell.</p>

            <button
              onClick={() => setHasStarted(true)}
              className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-deep-rose to-rose-400 px-8 py-4 font-body text-lg font-bold text-white shadow-xl transition-all hover:scale-105 sm:w-auto sm:px-12 sm:py-5 sm:text-xl"
            >
              <span className="relative z-10 flex items-center gap-2">
                Open My Heart <HiHeart className="transition-transform group-hover:rotate-12" />
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-rose-400 to-deep-rose transition-transform duration-500 group-hover:translate-x-0" />
            </button>
          </motion.div>
        </div>
      ) : (
        <div className="relative min-h-screen bg-champagne text-charcoal-berry selection:bg-soft-blush selection:text-deep-rose overflow-x-hidden">
          {/* Progress Bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-1.5 bg-deep-rose origin-left z-50 sm:h-2"
            style={{ scaleX }}
          />

          <FloatingHearts />

          {/* Chapter 1: The Intro */}
          <Section>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              className="mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-inner sm:h-40 sm:w-40"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  filter: ["drop-shadow(0 0 0px #D23369)", "drop-shadow(0 0 10px #D23369)", "drop-shadow(0 0 0px #D23369)"]
                }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <HiHeart className="text-deep-rose text-6xl sm:text-8xl" />
              </motion.div>
            </motion.div>
            <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl text-deep-rose mb-6 drop-shadow-md">
              Once upon a time...
            </h1>
            <p className="max-w-2xl font-body text-xl leading-relaxed md:text-3xl text-charcoal-berry/90 sm:text-2xl mx-auto">
              A boy met a girl, and the world suddenly became a brighter place.
            </p>
            <HiSparkles className="mt-8 text-3xl sm:text-4xl text-gold-leaf animate-pulse" />
          </Section>

          {/* Chapter 2: The Memories */}
          <Section className="px-4">
            <div className="w-full bg-white/30 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 py-12 px-4 sm:px-10">
              <div className="flex flex-col items-center gap-4 mb-12 sm:flex-row justify-center">
                <HiCamera className="text-deep-rose text-4xl sm:text-5xl" />
                <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-deep-rose">My Favorite View</h2>
              </div>

              <div className="grid grid-cols-1 gap-6 w-full sm:grid-cols-2 lg:grid-cols-3">
                {images.map((src, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="overflow-hidden rounded-2xl bg-white p-3 shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-soft-blush/20">
                      <Image
                        src={src}
                        alt={`Memory ${index + 1}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 hover:scale-110"
                      />
                    </div>
                    <div className="mt-3">
                      {/* <p className="font-body text-sm text-gray-500 italic">Memory #{index + 1}</p> */}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Section>

          {/* Chapter 3: The Soundtrack */}
          <Section>
            <div className="flex flex-col items-center gap-4 mb-12 sm:flex-row justify-center">
              <HiMusicalNote className="text-deep-rose text-4xl sm:text-5xl animate-bounce" />
              <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-deep-rose">The Rhythm of Us</h2>
            </div>

            <div className="relative w-full max-w-3xl transform px-2 sm:px-0 mx-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-deep-rose via-gold-leaf to-deep-rose rounded-3xl blur opacity-20"></div>
              <div className="relative overflow-hidden rounded-3xl bg-black shadow-2xl border-4 border-white/10">
                {/* Spotify Embed (Commented Out)
                          <iframe
                            data-testid="embed-iframe"
                            style={{ borderRadius: "12px" }}
                            src="https://open.spotify.com/embed/playlist/0jYqaATzQws1wyRHtcXvJX?utm_source=generator&theme=0"
                            width="100%"
                            height="352"
                            frameBorder="0"
                            allowFullScreen={true}
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                            className="opacity-95"
                          ></iframe>
                          */}

                {/* Ebube Music Embed */}
                <iframe data-testid="embed-iframe" 
                style={{borderRadius: "12px"}} 
                src="https://open.spotify.com/embed/playlist/6nOcT2cW5CW2O5xcA3boTw?utm_source=generator" 
                width="100%" 
                height="352" 
                frameBorder="0" 
                allowFullScreen={true} 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                className="opacity-95"
                ></iframe>
              </div>
            </div>          </Section>

          {/* Chapter 4: The Question */}
          <Section className="py-20 sm:py-32">
            <AnimatePresence mode="wait">
              {!saidYes ? (
                <motion.div
                  key="question"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                  className="flex flex-col items-center w-full max-w-4xl mx-auto"
                >
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="mb-8"
                  >
                    <HiStar className="text-gold-leaf text-5xl sm:text-6xl drop-shadow-md" />
                  </motion.div>

                  <h2 className="mb-12 font-heading text-5xl text-deep-rose sm:text-7xl md:text-9xl drop-shadow-xl text-center leading-tight">
                    Will you be my <br className="hidden sm:block" /> Valentine?
                  </h2>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 w-full">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSaidYes(true)}
                      className="group relative z-10 flex items-center justify-center gap-3 rounded-full bg-deep-rose px-12 py-5 font-body text-2xl font-bold text-white shadow-xl transition-all hover:bg-rose-600 hover:shadow-deep-rose/50 sm:px-16 sm:py-6 sm:text-3xl"
                    >                      YES <HiHeart className="inline animate-ping absolute opacity-75" /> <HiHeart className="inline relative" />
                    </motion.button>

                    <AnimatePresence>
                      {noButtonScale > 0 && (
                        <motion.button
                          key="no-button"
                          initial={{ scale: 1 }}
                          animate={{
                            x: noButtonPos.x,
                            y: noButtonPos.y,
                            rotate: noCount * 5,
                            scale: noButtonScale,
                            opacity: noButtonScale
                          }}
                          exit={{ scale: 0, opacity: 0 }}
                          onMouseEnter={handleNoHover}
                          onClick={handleNoHover}
                          className="rounded-full border-2 border-deep-rose bg-white/80 backdrop-blur-sm px-8 py-3 font-body text-lg text-deep-rose shadow-md hover:bg-gray-100 sm:px-10 sm:py-4 sm:text-xl"
                        >
                          {getNoButtonText()}
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>

                  {noCount > 2 && noButtonScale > 0 && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-8 font-body text-base sm:text-lg text-gray-500 italic"
                    >
                      (Please say yes... 🥺)
                    </motion.p>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center z-50 px-4 mx-auto"
                >
                  <div className="mb-8 flex justify-center gap-4 sm:gap-8">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <HiFire className="text-red-500 text-6xl sm:text-8xl animate-bounce" />
                    </motion.div>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <BsFillSuitHeartFill className="text-deep-rose text-7xl sm:text-9xl animate-pulse" />
                    </motion.div>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <HiSparkles className="text-gold-leaf text-6xl sm:text-8xl animate-spin-slow" />
                    </motion.div>
                  </div>

                  <h2 className="mb-6 font-heading text-6xl text-deep-rose sm:text-8xl md:text-9xl drop-shadow-2xl">
                    YAYYY!!!
                  </h2>
                  <p className="font-body text-xl sm:text-3xl md:text-4xl text-charcoal-berry max-w-3xl">
                    I knew you&apos;d say yes! You&apos;ve made me the happiest person in the universe! ❤️
                  </p>

                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="mt-12 relative h-48 w-48 sm:h-64 sm:w-64 mx-auto"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-deep-rose to-gold-leaf rounded-full blur-xl opacity-30 animate-pulse"></div>
                    <Image
                      src="/image/one.jpg"
                      alt="Us"
                      fill
                      className="rounded-full object-cover border-4 border-white shadow-2xl"
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </Section>

          <footer className="relative z-10 bg-white/40 backdrop-blur-md py-8 text-center font-body text-sm sm:text-base text-deep-rose/80 border-t border-white/20">
            <p className="flex items-center justify-center gap-2">
              Made with <BsFillSuitHeartFill className="text-red-500" /> for you.
            </p>
          </footer>
        </div>
      )}
    </>
  );
}
