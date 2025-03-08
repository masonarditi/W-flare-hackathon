import React from 'react';
import { AlertTriangle, Shield } from 'lucide-react';

const SecurityAlerts = () => {
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
};

export default SecurityAlerts; 