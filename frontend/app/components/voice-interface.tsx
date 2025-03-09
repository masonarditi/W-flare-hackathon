"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSpeechToText from 'react-hook-speech-to-text';

export default function AnyComponent() {
  const [isListening, setIsListening] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  // Add a function to handle toggling the listening state
  const toggleListening = () => {
    if (isListening) {
      stopSpeechToText();
    } else {
      // Clear previous results when starting a new session
      startSpeechToText();
    }
    setIsListening(!isListening);
  };

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  useEffect(() => {
    if (videoRef.current) {
      if (isListening) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
        // Reset to first frame when stopped
        videoRef.current.currentTime = 0;
      }
    }
  }, [isListening]);

  return (
    <div className="relative w-full h-[500px] bg-white rounded-xl overflow-hidden flex flex-col items-center justify-center">
      {/* Clean, minimal container */}
      <div className="relative">
        {/* Animation video button */}
        <div
          onClick={toggleListening}
          className="relative cursor-pointer"
        >
          {/* Animation video with direct pulsing effect */}
          <div className="relative w-64 h-64 rounded-full overflow-hidden">
            <motion.video 
              ref={videoRef}
              className="w-full h-full object-cover"
              src="https://flare.network/en/video/home_providers_desktop.webm"
              loop
              muted
              playsInline
              animate={isListening ? { 
                scale: [1, 1.15, 1],
                transition: { 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              } : {}}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
          </div>
        </div>
        
        {/* Simple status text */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-center">
          <span className="text-sm font-medium text-gray-500">
            {isListening ? 'Listening...' : 'Tap to speak'}
          </span>
        </div>
      </div>

      {/* Voice interface results - Repositioned below the video */}
      <div className="w-full mt-24 px-4">
        <AnimatePresence mode="wait">
          {(results.length > 0 || interimResult) && (
            <motion.div 
              key={isListening ? 'listening' : 'not-listening'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-2xl mx-auto text-center"
            >
              {results.length > 0 && results.map((result, index) => (
                <motion.div 
                  key={typeof result === 'string' ? `${result}-${index}` : result.timestamp}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-2"
                >
                  {(typeof result === 'string' ? result : result.transcript)
                    .split(' ')
                    .map((word, wordIndex) => (
                      <motion.span
                        key={`${word}-${wordIndex}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          delay: wordIndex * 0.1,
                          duration: 0.3,
                          ease: "easeOut"
                        }}
                        className="inline-block mx-1 text-2xl font-bold text-pink-600"
                      >
                        {word}
                      </motion.span>
                    ))}
                </motion.div>
              ))}
              
              {interimResult && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2"
                >
                  {interimResult.split(' ').map((word, wordIndex) => (
                    <motion.span
                      key={`interim-${word}-${wordIndex}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: wordIndex * 0.1,
                        duration: 0.3,
                        ease: "easeOut"
                      }}
                      className="inline-block mx-1 text-2xl font-bold text-pink-600/70"
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}