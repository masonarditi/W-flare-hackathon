"use client";
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
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

  useEffect(() => {
    if (results.length > 0) {
      console.log('Results:', results);
    }
    if (interimResult) {
      console.log('Interim Result:', interimResult);
    }
  }, [results, interimResult]);

  return (
    <div className="relative w-full h-[500px] bg-white rounded-xl overflow-hidden flex items-center justify-center">
      {/* Clean, minimal container */}
      <div className="relative">
        {/* Animation video button */}
        <div
          onClick={() => {
            setIsListening(!isListening);
            isListening ? stopSpeechToText() : startSpeechToText();
          }}
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

      {/* Voice interface results */}
    </div>
  );
}