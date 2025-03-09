"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSpeechToText from "react-hook-speech-to-text";
import { useAccount, useSendTransaction, useWriteContract } from "wagmi";
import { parseEther } from "viem";
import FlrUsdtSwap from "../abi/FlrUsdtSwap.json";

// Add proper typing for the address book
type AddressBookType = {
  [key: string]: string;
};

const ADDRESS_BOOK: AddressBookType = {
  romain: "0x8fBa7D8342CB0C804c369727F71699C1afaC55d3",
  // Add more mappings as needed
};

// Token addresses
const TOKENS = {
  usdt: "0x0B38e83B86d491735fEaa0a791F65c2B99535396",
} as const;

export default function VoiceInterface() {
  const { address } = useAccount();
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [currentSpeech, setCurrentSpeech] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const speechTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const { writeContract } = useWriteContract();
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const { data: hash, sendTransaction } = useSendTransaction();

  const toggleListening = () => {
    if (isListening) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
    setIsListening(!isListening);
  };

  useEffect(() => {
    if (videoRef.current) {
      if (isListening) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isListening]);

  // Enhanced command processing with multilingual support
  const processVoiceCommand = async (speech: string) => {
    const lowerSpeech = speech.toLowerCase();
    const words = lowerSpeech.split(" ");

    // Check for swap commands
    const isSwapCommand = words.some((word) =>
      ["swap", "exchange", "echange", "échange"].includes(word)
    );
    const isForCommand = words.some((word) =>
      ["for", "to", "contre", "en"].includes(word)
    );

    if (isSwapCommand && isForCommand) {
      // Find amount
      let amount = "";
      for (let i = 0; i < words.length; i++) {
        if (
          words[i].match(/^[0-9.]+$/) ||
          words[i] === "un" ||
          words[i] === "one"
        ) {
          amount = words[i] === "un" || words[i] === "one" ? "1" : words[i];
          break;
        }
      }

      // Find target token
      let targetToken = "";
      for (const word of words) {
        const normalizedWord = word.toLowerCase();
        if (normalizedWord in TOKENS) {
          targetToken = TOKENS[normalizedWord as keyof typeof TOKENS];
          break;
        }
      }

      if (amount && targetToken && address) {
        console.log(`Swapping ${amount} FLR for ${targetToken}`);

        try {
          // Prepare swap parameters
          const amountOutMin = BigInt(0); // In production, calculate minimum amount
          const path = [
            "0x1D80c49BbBCd1C0911346656B529DF9E5c2F783d",
            targetToken,
          ] as `0x${string}`[]; // WFLR address
          const deadline = BigInt(Math.floor(Date.now() / 1000) + 60 * 20); // 20 minutes from now

          writeContract({
            abi: FlrUsdtSwap.abi,
            address: FlrUsdtSwap.address as `0x${string}`,
            functionName: "swapExactNATForTokens",
            args: [amountOutMin, path, address, deadline],
            value: parseEther(amount),
          });

          console.log("Swap transaction sent successfully");
        } catch (error) {
          console.error("Swap failed:", error);
        }
      }
    } else {
      // Check for English or French send commands
      const isSendCommand = words.some((word) =>
        ["send", "envoyer", "envoie"].includes(word)
      );
      const isToCommand = words.some((word) => ["to", "à", "a"].includes(word));

      if (isSendCommand && isToCommand) {
        // Find the amount (number before FLR/flr)
        let amount = "";
        for (let i = 0; i < words.length; i++) {
          // Handle both "1" and "un"/"one" cases
          if (
            words[i].match(/^[0-9.]+$/) ||
            words[i] === "un" ||
            words[i] === "one"
          ) {
            amount = words[i] === "un" || words[i] === "one" ? "1" : words[i];
            break;
          }
        }

        // Find recipient name with type safety
        let recipient = "";
        for (const word of words) {
          const normalizedWord = word.toLowerCase();
          if (normalizedWord in ADDRESS_BOOK) {
            recipient = ADDRESS_BOOK[normalizedWord];
            break;
          }
        }

        if (amount && recipient) {
          console.log(`Sending ${amount} FLR to ${recipient}`);
          setAmount(amount);
          setRecipientAddress(recipient);

          if (sendTransaction) {
            sendTransaction({
              to: recipient as `0x${string}`,
              value: parseEther(amount),
            });
          }
        }
      }
    }
  };

  // Update feedback for swap commands
  const getCommandFeedback = (speech: string): string => {
    const lowerSpeech = speech.toLowerCase();
    const words = lowerSpeech.split(" ");

    // Check for swap command
    const isSwapCommand = words.some((word) =>
      ["swap", "exchange", "echange", "échange"].includes(word)
    );

    if (isSwapCommand) {
      let amount = words.find(
        (word) => word.match(/^[0-9.]+$/) || word === "un" || word === "one"
      );
      let token = words.find((word) => word.toLowerCase() in TOKENS);

      if (amount && token) {
        if (amount === "un" || amount === "one") amount = "1";
        return `Swapping ${amount} FLR for ${token.toUpperCase()}`;
      }
    }
    return speech;
  };

  // Modify the speech timeout effect
  useEffect(() => {
    if (interimResult?.trim()) {
      if (speechTimeoutRef.current) {
        clearTimeout(speechTimeoutRef.current);
      }

      // Update current speech immediately for better feedback
      setCurrentSpeech(interimResult.trim());

      speechTimeoutRef.current = setTimeout(() => {
        const speech = interimResult.trim();
        setCurrentSpeech(getCommandFeedback(speech));
        processVoiceCommand(speech);
      }, 1000);
    }

    return () => {
      if (speechTimeoutRef.current) {
        clearTimeout(speechTimeoutRef.current);
      }
    };
  }, [interimResult, sendTransaction]);

  // Add a new effect to handle final results
  useEffect(() => {
    if (results.length > 0) {
      const lastResult = results[results.length - 1];
      if (typeof lastResult === "string") {
        setCurrentSpeech(getCommandFeedback(lastResult));
        processVoiceCommand(lastResult);
      } else if ("transcript" in lastResult) {
        setCurrentSpeech(getCommandFeedback(lastResult.transcript));
        processVoiceCommand(lastResult.transcript);
      }
    }
  }, [results]);

  return (
    <div className="relative w-full h-[500px] bg-white rounded-xl overflow-hidden flex flex-col items-center justify-center">
      {error ? (
        <p>Web Speech API is not available in this browser 🤷‍</p>
      ) : (
        <>
          <div className="relative">
            <div onClick={toggleListening} className="relative cursor-pointer">
              <div className="relative w-64 h-64 rounded-full overflow-hidden">
                <motion.video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  src="https://flare.network/en/video/home_providers_desktop.webm"
                  loop
                  muted
                  playsInline
                  animate={
                    isListening
                      ? {
                          scale: [1, 1.15, 1],
                          transition: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                        }
                      : {}
                  }
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                />
              </div>
            </div>

            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-center">
              <span className="text-sm font-medium text-gray-500">
                {isListening ? "Listening..." : "Tap to speak"}
              </span>
            </div>
          </div>

          <div className="w-full mt-24 px-4">
            <AnimatePresence mode="wait">
              {/* Display current speech */}
              {currentSpeech && (
                <motion.div
                  key="current-speech"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="max-w-2xl mx-auto text-center mb-4"
                >
                  <h3 className="text-sm text-gray-500 mb-2">
                    Last Captured Speech:
                  </h3>
                  {currentSpeech.split(" ").map((word, wordIndex) => (
                    <motion.span
                      key={`current-${word}-${wordIndex}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: wordIndex * 0.1,
                        duration: 0.3,
                        ease: "easeOut",
                      }}
                      className="inline-block mx-1 text-2xl font-bold text-blue-600"
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.div>
              )}

              {/* Display interim results */}
              {(results.length > 0 || interimResult) && (
                <motion.div
                  key={isListening ? "listening" : "not-listening"}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="max-w-2xl mx-auto text-center"
                >
                  {interimResult && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2"
                    >
                      <h3 className="text-sm text-gray-500 mb-2">
                        Current Speech:
                      </h3>
                      {interimResult.split(" ").map((word, wordIndex) => (
                        <motion.span
                          key={`interim-${word}-${wordIndex}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: wordIndex * 0.1,
                            duration: 0.3,
                            ease: "easeOut",
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
        </>
      )}
    </div>
  );
}
