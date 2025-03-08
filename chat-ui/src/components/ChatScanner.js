import React, { useState, useRef, useEffect } from 'react';
import { Send, Flame, Globe, AlertTriangle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const BACKEND_ROUTE = '/api/chat'

const ChatScanner = () => {
  const [messages, setMessages] = useState([
    { 
      text: "Hi, I'm Beacon! 👋 Your Web3 security navigator on the Flare network. I'll help you verify URLs, check smart contracts, and protect your digital assets from scams.\n\n⚠️ Always verify before connecting your wallet to any site.",
      type: 'bot' 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);
  const [pendingTransaction, setPendingTransaction] = useState(null);
  const [apiError, setApiError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Clear API error after 5 seconds
  useEffect(() => {
    let timer;
    if (apiError) {
      timer = setTimeout(() => {
        setApiError(null);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [apiError]);

  const handleSendMessage = async (text) => {
    try {
      console.log('Sending request to:', BACKEND_ROUTE);
      
      const response = await fetch(BACKEND_ROUTE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
        credentials: 'include',
        mode: 'cors',
      });
      
      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        console.error('API Error:', response.status, errorText);
        throw new Error(`Server returned ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      // Check if response contains a transaction preview
      if (data.response && data.response.includes('Transaction Preview:')) {
        setAwaitingConfirmation(true);
        setPendingTransaction(text);
      }
      
      return data.response || "Sorry, I couldn't process that properly.";
    } catch (error) {
      console.error('Fetch Error:', error);
      setApiError(error.message);
      return 'Sorry, there was an error connecting to the server. Please check your connection and try again.';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const messageText = inputText.trim();
    setInputText('');
    setIsLoading(true);
    setApiError(null);
    setMessages(prev => [...prev, { text: messageText, type: 'user' }]);

    // Handle transaction confirmation
    if (awaitingConfirmation) {
      if (messageText.toUpperCase() === 'CONFIRM') {
        setAwaitingConfirmation(false);
        const response = await handleSendMessage(pendingTransaction);
        setMessages(prev => [...prev, { text: response, type: 'bot' }]);
      } else {
        setAwaitingConfirmation(false);
        setPendingTransaction(null);
        setMessages(prev => [...prev, { 
          text: 'Transaction cancelled. How else can I help you?', 
          type: 'bot' 
        }]);
      }
    } else {
      const response = await handleSendMessage(messageText);
      setMessages(prev => [...prev, { text: response, type: 'bot' }]);
    }

    setIsLoading(false);
  };

  // Custom components for ReactMarkdown
  const MarkdownComponents = {
    p: ({ children }) => <span className="inline">{children}</span>,
    code: ({ node, inline, className, children, ...props }) => (
      inline ? 
        <code className="bg-gray-200 rounded px-1 py-0.5 text-sm">{children}</code> :
        <pre className="bg-gray-200 rounded p-2 my-2 overflow-x-auto">
          <code {...props} className="text-sm">{children}</code>
        </pre>
    ),
    a: ({ node, children, ...props }) => (
      <a {...props} className="text-blue-600 hover:underline">{children}</a>
    )
  };

  return (
    <div className="px-4 py-6 h-full">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Security Scanner</h1>
      
      {/* API Error Alert */}
      {apiError && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          <span>{apiError}</span>
        </div>
      )}
      
      <div className="flex flex-col h-[calc(100vh-10rem)] max-h-[800px] bg-white rounded-lg shadow-md border border-gray-200">
        {/* Chat Header */}
        <div className="px-4 py-3 border-b border-gray-200 flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold">FlareBeacon</h3>
            <p className="text-xs text-gray-500">Protecting you on the Flare network</p>
          </div>
        </div>
        
        {/* Messages container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-2">
                  <Flame className="w-5 h-5" />
                </div>
              )}
              <div
                className={`max-w-xs md:max-w-md px-4 py-2 rounded-xl ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                }`}
              >
                <ReactMarkdown 
                  components={MarkdownComponents}
                  className="text-sm break-words whitespace-pre-wrap"
                >
                  {message.text}
                </ReactMarkdown>
              </div>
              {message.type === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold ml-2">
                  <Globe className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-2">
                <Flame className="w-5 h-5" />
              </div>
              <div className="bg-white border border-gray-200 text-gray-800 px-4 py-3 rounded-xl rounded-bl-none shadow-sm">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input form */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={awaitingConfirmation ? "Type CONFIRM to proceed or anything else to cancel" : "Enter a URL or describe your Web3 security concern..."}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 shadow-sm"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatScanner; 