'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import VoiceInterface from './components/voice-interface';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

export default function Home() {
  const { isConnected } = useAccount();
  
  const scrollToVoiceInterface = () => {
    if (!isConnected) return;
    
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
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
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
            <h1 className="text-4xl font-normal text-center text-black mb-6 tracking-tight">
              The blockchain for data
            </h1>
            <p className="text-xl md:text-2xl text-center text-gray-600 mb-8 font-light tracking-wide">
              Flare is a full-stack layer 1 solution designed for
              data intensive use cases.
            </p>
            
            {/* Buttons side by side */}
            <div className="flex justify-center gap-4">
              {/* Try it now button with wallet connection check */}
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openConnectModal,
                  mounted,
                }) => {
                  const ready = mounted;
                  const connected = ready && account && chain;

                  return (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-[#9c2e4b] hover:bg-[#8a2941] text-white px-8 py-3 rounded-md font-normal h-[50px]"
                      onClick={() => {
                        if (!connected) {
                          openConnectModal();
                        } else {
                          scrollToVoiceInterface();
                        }
                      }}
                    >
                      Try it now
                    </motion.button>
                  );
                }}
              </ConnectButton.Custom>
              
              {/* Connect Wallet button */}
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  mounted,
                }) => {
                  const ready = mounted;
                  const connected = ready && account && chain;

                  return (
                    <div
                      {...(!ready && {
                        'aria-hidden': true,
                        style: {
                          opacity: 0,
                          pointerEvents: 'none',
                          userSelect: 'none',
                        },
                      })}
                    >
                      {(() => {
                        if (!connected) {
                          return (
                            <motion.button
                              onClick={openConnectModal}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-[#9c2e4b] hover:bg-[#8a2941] text-white px-8 py-3 rounded-md font-normal h-[50px]"
                            >
                              Connect Wallet
                            </motion.button>
                          );
                        }

                        return (
                          <div className="flex gap-3">
                            <motion.button
                              onClick={openChainModal}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-[#9c2e4b] hover:bg-[#8a2941] text-white px-4 py-3 rounded-md font-normal flex items-center gap-2 h-[50px]"
                            >
                              {chain.hasIcon && (
                                <div style={{ width: 20, height: 20 }}>
                                  {chain.iconUrl && (
                                    <img
                                      alt={chain.name ?? 'Chain icon'}
                                      src={chain.iconUrl}
                                      style={{ width: 20, height: 20 }}
                                    />
                                  )}
                                </div>
                              )}
                              {chain.name}
                            </motion.button>

                            <motion.button
                              onClick={openAccountModal}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-[#9c2e4b] hover:bg-[#8a2941] text-white px-4 py-3 rounded-md font-normal h-[50px] flex items-center"
                            >
                              {account.displayName}
                            </motion.button>
                          </div>
                        );
                      })()}
                    </div>
                  );
                }}
              </ConnectButton.Custom>
            </div>
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


            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}