'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import VoiceInterface from './components/voice-interface';

export default function Home() {
  const [showVoiceInterface, setShowVoiceInterface] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{ backgroundColor: '#f2f2f2' }}>
      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <div className="w-[90%] h-[90%] overflow-hidden rounded-lg">
            <video className="w-full h-full object-cover" autoPlay loop muted>
              <source src="https://flare.network/en/video/home_hero.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <Image
              src="https://flare.network/api/media/file/Flare.svg"
              alt="Flare Icon"
              width={60}
              height={60}
              className="mx-auto mb-6"
              priority
            />
            <h1 className="text-4xl font-normal text-black mb-6 tracking-tight">
              Engage with Flare's ecosystem in any language
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 font-light tracking-wide">
              Flare is a full-stack layer 1 solution designed for
              data intensive use cases.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#9c2e4b] hover:bg-[#8a2941] text-white px-8 py-3 rounded-md font-normal"
              onClick={() => setShowVoiceInterface(true)}
            >
              Try it now
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Voice Interface Modal */}
      <AnimatePresence>
        {showVoiceInterface && (
          <motion.div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              // Close when clicking outside the interface
              if (e.target === e.currentTarget) {
                setShowVoiceInterface(false);
              }
            }}
          >
            <motion.div 
              className="bg-white rounded-xl p-8 max-w-4xl w-full shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="flex flex-col items-center">
                <h2 className="text-2xl font-normal text-gray-800 mb-6 tracking-tight">
                  Voice Interface
                </h2>
                
                <VoiceInterface />
                
                <motion.button 
                  onClick={() => setShowVoiceInterface(false)}
                  className="mt-6 px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}