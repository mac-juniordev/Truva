import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield } from 'lucide-react';

interface LoadingScreenProps {
  isLoading: boolean;
  messages?: string[];
  minDisplayTime?: number;
}

const defaultMessages = [
  'Initializing TRUVA intelligence...',
  'Loading trust modules...',
  'Connecting to analyzers...',
  'Preparing your experience...',
  'Almost ready...',
];

export const LoadingScreen = ({
  isLoading,
  messages = defaultMessages,
  minDisplayTime = 2000,
}: LoadingScreenProps) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    let messageInterval: ReturnType<typeof setInterval> | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (isLoading) {
      setShowLoading(true);

      messageInterval = setInterval(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
      }, 1500);

      timer = setTimeout(() => {}, minDisplayTime);
    } else {
      timer = setTimeout(() => {
        setShowLoading(false);
      }, 500);
    }

    return () => {
      if (messageInterval) {
        clearInterval(messageInterval);
      }

      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isLoading, messages.length, minDisplayTime]);

  if (!showLoading) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative flex flex-col items-center justify-center p-8"
        >

          <div className="relative">

            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute inset-0"
            >
              <svg className="w-24 h-24" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="rgba(16, 185, 129, 0.1)"
                  strokeWidth="3"
                />

                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  strokeDasharray="70 200"
                  strokeLinecap="round"
                />

                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>


            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute inset-0"
            >
              <svg className="w-24 h-24" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="rgba(16, 185, 129, 0.05)"
                  strokeWidth="1.5"
                />

                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="rgba(16, 185, 129, 0.3)"
                  strokeWidth="1.5"
                  strokeDasharray="30 180"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>


            <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 backdrop-blur-sm border border-emerald-500/30 flex items-center justify-center">
              <Shield size={40} className="text-emerald-400" />
            </div>

          </div>


          <div className="mt-8 text-center">

            <motion.h2
              key={currentMessageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-xl font-semibold text-white"
            >
              {messages[currentMessageIndex]}
            </motion.h2>


            <div className="flex justify-center gap-1 mt-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="w-2 h-2 rounded-full bg-emerald-400"
                />
              ))}
            </div>

          </div>


          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-12 text-xs text-gray-500 font-medium tracking-wider"
          >
            TRUVA — Trust Every Digital Decision
          </motion.p>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};