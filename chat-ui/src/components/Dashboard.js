import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';

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
            className="bg-blue-700 text-white px-4 py-2 rounded-r-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
};

export default Dashboard; 