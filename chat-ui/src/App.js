import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Shield, AlertTriangle, CheckCircle, Globe, 
  Home, History, BookOpen, Bell, Settings, Menu, X, ExternalLink
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import './index.css';

const BACKEND_ROUTE = 'api/routes/chat/'

const App = () => {
  // Navigation state
  const [currentView, setCurrentView] = useState('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  // Chat state
  const [messages, setMessages] = useState([
    { 
      text: "Hello! I'm your Web3 Security Assistant 🛡️\n\nI can verify crypto URLs to protect you from phishing scams and fake websites. Just send me any web3 URL you want to check, and I'll analyze it for safety.",
      type: 'bot' 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [securityStatus, setSecurityStatus] = useState(null);
  const messagesEndRef = useRef(null);
  
  // Mock data for dashboard
  const [recentScans] = useState([
    { url: 'uniswap.org', status: 'safe', timestamp: '2 hours ago' },
    { url: 'ph1sh1ng-metamask.io', status: 'dangerous', timestamp: '1 day ago' },
    { url: 'pancakeswap.finance', status: 'safe', timestamp: '3 days ago' },
    { url: 'opensea.io', status: 'safe', timestamp: '5 days ago' }
  ]);

  const [securityMetrics] = useState({
    scansToday: 24,
    threatsBlocked: 7,
    safeVisits: 18,
    riskScore: 'Low'
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleCheckURL = async (url) => {
    try {
      const response = await fetch(BACKEND_ROUTE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: url }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      // Set security status based on response
      if (data.response.includes('safe') || data.response.includes('legitimate')) {
        setSecurityStatus('safe');
      } else if (data.response.includes('suspicious') || data.response.includes('phishing')) {
        setSecurityStatus('unsafe');
      } else {
        setSecurityStatus('unknown');
      }
      
      return data.response;
    } catch (error) {
      console.error('Error:', error);
      setSecurityStatus('error');
      return 'Sorry, there was an error checking this URL. Please try again.';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const messageText = inputText.trim();
    setInputText('');
    setIsLoading(true);
    setSecurityStatus(null);
    setMessages(prev => [...prev, { text: messageText, type: 'user' }]);

    const response = await handleCheckURL(messageText);
    setMessages(prev => [...prev, { text: response, type: 'bot' }]);

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

  const getStatusIndicator = () => {
    switch (securityStatus) {
      case 'safe':
        return (
          <div className="fixed top-20 right-4 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span>URL Verified Safe</span>
          </div>
        );
      case 'unsafe':
        return (
          <div className="fixed top-20 right-4 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            <span>Dangerous URL Detected!</span>
          </div>
        );
      case 'unknown':
        return (
          <div className="fixed top-20 right-4 z-50 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            <span>Could not verify URL</span>
          </div>
        );
      case 'error':
        return (
          <div className="fixed top-20 right-4 z-50 bg-gray-100 border border-gray-400 text-gray-700 px-4 py-3 rounded flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            <span>Error checking URL</span>
          </div>
        );
      default:
        return null;
    }
  };

  // Navigation items
  const navItems = [
    { icon: Home, label: 'Dashboard', id: 'dashboard' },
    { icon: Shield, label: 'URL Scanner', id: 'scanner' },
    { icon: History, label: 'Scan History', id: 'history' },
    { icon: Bell, label: 'Alerts', id: 'alerts' },
    { icon: BookOpen, label: 'Security Guide', id: 'guide' },
    { icon: Settings, label: 'Settings', id: 'settings' }
  ];

  // Sidebar component
  const Sidebar = ({ mobile = false }) => (
    <div className={`${mobile ? 'fixed inset-0 z-40 bg-white flex lg:hidden' : 'hidden lg:flex h-full'} flex-col w-64 border-r border-gray-200`}>
      {mobile && (
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-xl font-bold">Menu</h1>
          <button onClick={() => setMobileSidebarOpen(false)} className="p-2">
            <X className="w-6 h-6" />
          </button>
        </div>
      )}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <Shield className="w-8 h-8 text-blue-700 mr-2" />
          <div>
            <h1 className="text-xl font-bold">SafeWeb3</h1>
            <p className="text-sm text-gray-600">URL Security Scanner</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setCurrentView(item.id);
              if (mobile) setMobileSidebarOpen(false);
            }}
            className={`flex items-center w-full p-3 rounded-md ${
              currentView === item.id
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <img
            src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
            alt="User"
            className="w-8 h-8 rounded-full mr-3"
          />
          <div>
            <p className="font-medium">User Account</p>
            <p className="text-sm text-gray-600">Free Plan</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Main content based on current view
  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <div className="px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">Security Dashboard</h1>
            
            {/* Quick URL check */}
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold mb-3">Quick URL Security Check</h2>
              <form onSubmit={handleSubmit} className="flex">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste a Web3 URL to verify..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-700 text-white px-4 py-2 rounded-r-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  Check
                </button>
              </form>
            </div>
            
            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm">Scans Today</p>
                    <h3 className="text-3xl font-bold mt-1">{securityMetrics.scansToday}</h3>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Shield className="w-6 h-6 text-blue-700" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm">Threats Blocked</p>
                    <h3 className="text-3xl font-bold mt-1">{securityMetrics.threatsBlocked}</h3>
                  </div>
                  <div className="bg-red-100 p-3 rounded-full">
                    <AlertTriangle className="w-6 h-6 text-red-700" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm">Safe Visits</p>
                    <h3 className="text-3xl font-bold mt-1">{securityMetrics.safeVisits}</h3>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircle className="w-6 h-6 text-green-700" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm">Risk Score</p>
                    <h3 className="text-3xl font-bold mt-1">{securityMetrics.riskScore}</h3>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Shield className="w-6 h-6 text-blue-700" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent scans */}
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="font-semibold">Recent URL Scans</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {recentScans.map((scan, index) => (
                  <div key={index} className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center">
                      {scan.status === 'safe' ? (
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-red-600 mr-3" />
                      )}
                      <div>
                        <p className="font-medium">{scan.url}</p>
                        <p className="text-sm text-gray-500">{scan.timestamp}</p>
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        scan.status === 'safe'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {scan.status === 'safe' ? 'Safe' : 'Dangerous'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="px-6 py-3 border-t border-gray-200">
                <button 
                  onClick={() => setCurrentView('history')}
                  className="text-blue-700 hover:text-blue-900 text-sm font-medium"
                >
                  View all scans
                </button>
              </div>
            </div>
            
            {/* Educational content */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="font-semibold">Security Tips</h2>
              </div>
              <div className="px-6 py-4">
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Always verify the URL before connecting your wallet</li>
                  <li>Look for HTTPS and valid SSL certificates</li>
                  <li>Be cautious of URLs with misspellings or extra characters</li>
                  <li>Check for the official domain name of projects</li>
                  <li>Verify links through official social media channels</li>
                </ul>
                <button 
                  onClick={() => setCurrentView('guide')}
                  className="mt-4 text-blue-700 hover:text-blue-900 text-sm font-medium flex items-center"
                >
                  Read full security guide
                  <ExternalLink className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'scanner':
        return (
          <div className="px-4 py-6 h-full">
            <h1 className="text-2xl font-bold mb-6">URL Security Scanner</h1>
            <div className="flex flex-col h-[calc(100vh-10rem)] max-h-[800px] bg-white rounded-lg shadow">
              {/* Messages container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.type === 'bot' && (
                      <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold mr-2">
                        <Shield className="w-5 h-5" />
                      </div>
                    )}
                    <div
                      className={`max-w-xs md:max-w-md px-4 py-2 rounded-xl ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'
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
                    <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold mr-2">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-xl rounded-bl-none">
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
              <div className="border-t border-gray-200 p-4">
                <form onSubmit={handleSubmit} className="flex space-x-4">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste a web3 URL to check for security..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-700 text-white p-2 rounded-full hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        );
      
      case 'history':
        return (
          <div className="px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">Scan History</h1>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[...recentScans, ...recentScans].map((scan, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{scan.url}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          scan.status === 'safe' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {scan.status === 'safe' ? 
                            <><CheckCircle className="w-3 h-3 mr-1" /> Safe</> : 
                            <><AlertTriangle className="w-3 h-3 mr-1" /> Dangerous</>
                          }
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {scan.timestamp}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Details</button>
                        <button className="text-gray-600 hover:text-gray-900">Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      
      case 'alerts':
        return (
          <div className="px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">Security Alerts</h1>
            <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
              <div className="p-6">
                <div className="flex items-start">
                  <div className="bg-red-100 rounded-full p-2 mr-4">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Phishing Attempt Detected</h3>
                    <p className="mt-1 text-sm text-gray-500">We blocked access to ph1sh1ng-metamask.io which was attempting to steal wallet credentials.</p>
                    <p className="mt-2 text-sm text-gray-500">1 day ago</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start">
                  <div className="bg-yellow-100 rounded-full p-2 mr-4">
                    <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Suspicious Domain Flagged</h3>
                    <p className="mt-1 text-sm text-gray-500">The domain aave-defiprotocol.com has been flagged as potentially suspicious.</p>
                    <p className="mt-2 text-sm text-gray-500">3 days ago</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-2 mr-4">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Security Scan Complete</h3>
                    <p className="mt-1 text-sm text-gray-500">Weekly security scan completed. No new threats detected.</p>
                    <p className="mt-2 text-sm text-gray-500">5 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'guide':
        return (
          <div className="px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">Web3 Security Guide</h1>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">How to Stay Safe in Web3</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">1. Always Verify URLs</h3>
                  <p className="text-gray-700">
                    Double-check the URL before connecting your wallet. Look for subtle misspellings, 
                    extra characters, or wrong TLDs (.com vs .org). Bookmark official sites for future use.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">2. Check for HTTPS</h3>
                  <p className="text-gray-700">
                    Ensure the website uses HTTPS (look for the lock icon). While this doesn't guarantee 
                    legitimacy, sites without SSL certificates should be avoided.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">3. Use Hardware Wallets</h3>
                  <p className="text-gray-700">
                    Hardware wallets provide an extra layer of security by keeping your private keys offline.
                    Consider using one for significant crypto holdings.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">4. Be Cautious of Airdrops</h3>
                  <p className="text-gray-700">
                    Unexpected tokens in your wallet could be scams. Research before interacting with 
                    unknown tokens, as they may contain malicious approval functions.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">5. Use Our URL Checker</h3>
                  <p className="text-gray-700">
                    When in doubt, use our security scanner to verify any Web3 URL before connecting your wallet
                    or engaging with the site.
                  </p>
                  <button 
                    onClick={() => setCurrentView('scanner')} 
                    className="mt-2 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
                  >
                    Go to URL Scanner
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div className="px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>
            <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
              <div className="p-6">
                <h2 className="text-lg font-medium mb-4">Account</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value="user@example.com"
                      readOnly
                      className="px-3 py-2 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subscription Plan</label>
                    <div className="flex items-center">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">Free Plan</span>
                      <button className="text-blue-700 text-sm hover:text-blue-900">Upgrade</button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-lg font-medium mb-4">Security Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Enable Browser Extension</h3>
                      <p className="text-sm text-gray-500">Get real-time protection while browsing</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Email Alerts</h3>
                      <p className="text-sm text-gray-500">Receive security alerts via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-lg font-medium mb-4">Danger Zone</h2>
                <button className="px-4 py-2 border border-red-300 text-red-700 rounded hover:bg-red-50">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        );
      
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {getStatusIndicator()}
      
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setMobileSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-white shadow"
      >
        <Menu className="w-6 h-6" />
      </button>
      
      {/* Mobile sidebar */}
      {mobileSidebarOpen && <Sidebar mobile />}
      
      {/* Desktop sidebar */}
      <Sidebar />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-lg font-semibold text-gray-900">
              {navItems.find(item => item.id === currentView)?.label || 'Dashboard'}
            </h1>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;