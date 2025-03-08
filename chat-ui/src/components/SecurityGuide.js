import React from 'react';

const SecurityGuide = ({ setCurrentView }) => {
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
};

export default SecurityGuide; 