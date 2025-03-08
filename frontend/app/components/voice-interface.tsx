'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { MicOff } from 'lucide-react';

// Animation variants
const bubbleAnimation = {
  initial: { scale: 0, opacity: 0 },
  animate: (i: number) => ({
    scale: [0.7, 1, 0.7],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 3,
      delay: i * 0.2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  })
};

const containerAnimation = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { staggerChildren: 0.3 }
  }
};

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
}

export default function VoiceInterface() {
  const [isListening, setIsListening] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Generate random bubbles
  useEffect(() => {
    if (containerRef.current && isListening) {
      const container = containerRef.current;
      const numBubbles = 15;
      const newBubbles: Bubble[] = [];

      for (let i = 0; i < numBubbles; i++) {
        newBubbles.push({
          id: i,
          x: Math.random() * (container.offsetWidth - 100),
          y: Math.random() * (container.offsetHeight - 100),
          size: Math.random() * (80 - 20) + 20
        });
      }

      setBubbles(newBubbles);
    } else {
      setBubbles([]);
    }
  }, [isListening]);

  // Handle video playback
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
    <div className="relative w-full h-[600px] bg-gradient-to-b from-pink-50 to-purple-50 rounded-xl overflow-hidden">
      {/* Bubble container */}
      <div ref={containerRef} className="absolute inset-0">
        <AnimatePresence>
          {isListening && (
            <motion.div
              variants={containerAnimation}
              initial="initial"
              animate="animate"
              className="relative w-full h-full"
            >
              {bubbles.map((bubble, i) => (
                <motion.div
                  key={bubble.id}
                  custom={i}
                  variants={bubbleAnimation}
                  initial="initial"
                  animate="animate"
                  style={{
                    position: 'absolute',
                    left: bubble.x,
                    top: bubble.y,
                    width: bubble.size,
                    height: bubble.size,
                  }}
                  className="rounded-full bg-gradient-to-r from-pink-200/30 to-purple-200/30 backdrop-blur-sm"
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Custom animation voice control button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          onClick={() => setIsListening(!isListening)}
          className="relative cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={isListening ? { 
            scale: [1, 1.1, 1],
            transition: { 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          } : {}}
        >
          {/* Animation video */}
          <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg">
            <video 
              ref={videoRef}
              className="w-full h-full object-cover"
              src="https://flare.network/en/video/home_providers_desktop.webm"
              loop
              muted
              playsInline
            />
            
            {/* Overlay for inactive state */}
            {!isListening && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <span className="text-white text-sm font-medium">Click to activate</span>
              </div>
            )}
          </div>
          
          {/* Pulsing ring when active */}
          {isListening && (
            <motion.div
              className="absolute -inset-2 rounded-full border-2 border-pink-500"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          
          {/* Status indicator */}
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-center">
            <span className={`text-sm font-medium ${isListening ? 'text-pink-600' : 'text-gray-600'}`}>
              {isListening ? 'Listening...' : 'Click to start'}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
