'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import VoiceInterface from './components/voice-interface';

export default function Home() {
  const scrollToVoiceInterface = () => {
    // Smooth scroll to the voice interface section
    document.getElementById('voice-interface-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

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
              The blockchain for data
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 font-light tracking-wide">
              Flare is a full-stack layer 1 solution designed for
              data intensive use cases.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#9c2e4b] hover:bg-[#8a2941] text-white px-8 py-3 rounded-md font-normal"
              onClick={scrollToVoiceInterface}
            >
              Try it now
            </motion.button>
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-600 mb-2">Scroll down to try</p>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-gray-600"
              >
                <path d="M12 5v14M5 12l7 7 7-7"/>
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Voice Interface Section - Seamless scroll design */}
      <div 
        id="voice-interface-section" 
        className="w-full min-h-screen bg-gradient-to-b from-[#f2f2f2] to-white py-20"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-normal text-gray-800 mb-6 tracking-tight">
                Voice Interface
              </h2>
              <p className="text-xl text-gray-600 font-light">
                Speak naturally to execute transactions and interact with smart contracts
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <VoiceInterface />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mt-16"
            >
              <p className="text-gray-600 mb-8">
                Try speaking commands like "Send 10 tokens to Alice" or "Check my balance"
              </p>
              <a 
                href="#" 
                className="text-[#9c2e4b] hover:text-[#8a2941] font-medium"
              >
                Learn more about voice commands →
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}