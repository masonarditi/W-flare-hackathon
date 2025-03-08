import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, ExternalLink, Flame, Search } from 'lucide-react';

const Dashboard = ({ setCurrentView }) => {
  const [inputText, setInputText] = useState('');
  
  // Mock data
  const recentScans = [
    { url: 'uniswap.org', status: 'safe', timestamp: '2 hours ago' },
    { url: 'ph1sh1ng-metamask.io', status: 'dangerous', timestamp: '1 day ago' },
    { url: 'pancakeswap.finance', status: 'safe', timestamp: '3 days ago' },
    { url: 'opensea.io', status: 'safe', timestamp: '5 days ago' }
  ];

  const securityMetrics = {
    scansToday: 24,
    threatsBlocked: 7,
    safeVisits: 18,
    riskScore: 'Low'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    // Redirect to scanner view with the input
    setCurrentView('scanner');
  };

  return (
    <div className="px-4 py-6">
      <div className="bg-white rounded-xl p-8 mb-8 shadow-lg border-l-4 border-blue-500">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-blue-100 rounded-full mr-3">
            <Flame className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome to FlareBeacon</h1>
            <p className="text-gray-600">Your trusted navigator for Web3 security on the Flare network</p>
          </div>
        </div>
        
        {/* Quick URL check */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h2 className="text-lg font-semibold mb-3 text-gray-800">Quick URL Security Check</h2>
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste a Web3 URL to verify..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 text-gray-800"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium flex items-center"
            >
              <Search className="w-4 h-4 mr-2" />
              Check
            </button>
          </form>
        </div>
      </div>
      
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-blue-500 transform transition hover:scale-105">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Scans Today</p>
              <h3 className="text-3xl font-bold mt-1">{securityMetrics.scansToday}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-red-500 transform transition hover:scale-105">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Threats Blocked</p>
              <h3 className="text-3xl font-bold mt-1">{securityMetrics.threatsBlocked}</h3>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-green-500 transform transition hover:scale-105">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Safe Visits</p>
              <h3 className="text-3xl font-bold mt-1">{securityMetrics.safeVisits}</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-blue-500 transform transition hover:scale-105">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Risk Score</p>
              <h3 className="text-3xl font-bold mt-1">{securityMetrics.riskScore}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Flame className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent scans */}
      <div className="bg-white rounded-lg shadow-lg mb-8 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-white flex items-center">
          <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-2">
            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
          </div>
          <h2 className="font-semibold text-gray-800">Recent URL Scans</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentScans.map((scan, index) => (
            <div key={index} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
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
                className={`text-xs px-3 py-1.5 rounded-full font-medium ${
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
        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
          <button 
            onClick={() => setCurrentView('history')}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
          >
            View all scans
            <ExternalLink className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
      
      {/* Educational content */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-white flex items-center">
          <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-2">
            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
          </div>
          <h2 className="font-semibold text-gray-800">Flare Network Security Tips</h2>
        </div>
        <div className="px-6 py-6 bg-white">
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="bg-blue-100 rounded-full p-1 mr-3 mt-0.5">
                <Shield className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-gray-700">Always verify the URL before connecting your wallet to any Flare dApp</p>
            </li>
            <li className="flex items-start">
              <div className="bg-blue-100 rounded-full p-1 mr-3 mt-0.5">
                <Shield className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-gray-700">Check for secure connections (HTTPS) and valid SSL certificates</p>
            </li>
            <li className="flex items-start">
              <div className="bg-blue-100 rounded-full p-1 mr-3 mt-0.5">
                <Shield className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-gray-700">Be cautious of URLs with misspellings or extra characters</p>
            </li>
            <li className="flex items-start">
              <div className="bg-blue-100 rounded-full p-1 mr-3 mt-0.5">
                <Shield className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-gray-700">Verify smart contracts through official Flare explorers</p>
            </li>
          </ul>
          <button 
            onClick={() => setCurrentView('guide')}
            className="mt-6 px-5 py-2 bg-white border border-blue-500 text-blue-600 rounded-md hover:bg-blue-50 font-medium flex items-center"
          >
            Read full security guide
            <ExternalLink className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 