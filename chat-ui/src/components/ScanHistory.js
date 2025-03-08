import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';

const ScanHistory = () => {
  // Mock data
  const scans = [
    { url: 'uniswap.org', status: 'safe', timestamp: '2 hours ago' },
    { url: 'ph1sh1ng-metamask.io', status: 'dangerous', timestamp: '1 day ago' },
    { url: 'pancakeswap.finance', status: 'safe', timestamp: '3 days ago' },
    { url: 'opensea.io', status: 'safe', timestamp: '5 days ago' },
    { url: 'uniswap.org', status: 'safe', timestamp: '1 week ago' },
    { url: 'suspicious-defi.com', status: 'dangerous', timestamp: '1 week ago' },
    { url: 'aave.com', status: 'safe', timestamp: '2 weeks ago' },
    { url: 'compound.finance', status: 'safe', timestamp: '2 weeks ago' }
  ];

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
            {scans.map((scan, index) => (
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
};

export default ScanHistory; 