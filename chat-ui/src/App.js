import React, { useState } from 'react';
import { 
  Shield, Menu, X
} from 'lucide-react';
import './index.css';

// Import components
import Dashboard from './components/Dashboard';
import ChatScanner from './components/ChatScanner';
import ScanHistory from './components/ScanHistory';
import SecurityAlerts from './components/SecurityAlerts';
import SecurityGuide from './components/SecurityGuide';
import Settings from './components/Settings';

const App = () => {
  // Navigation state
  const [currentView, setCurrentView] = useState('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  // Navigation items
  const navItems = [
    { icon: 'Home', label: 'Dashboard', id: 'dashboard' },
    { icon: 'Shield', label: 'URL Scanner', id: 'scanner' },
    { icon: 'History', label: 'Scan History', id: 'history' },
    { icon: 'Bell', label: 'Alerts', id: 'alerts' },
    { icon: 'BookOpen', label: 'Security Guide', id: 'guide' },
    { icon: 'Settings', label: 'Settings', id: 'settings' }
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
            <span className="w-5 h-5 mr-3">
              {getIcon(item.icon)}
            </span>
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

  // Helper function to get icon component
  const getIcon = (iconName) => {
    const icons = {
      Home: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
      Shield: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>,
      History: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0"/><path d="M12 7v5l3 3"/></svg>,
      Bell: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>,
      BookOpen: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
      Settings: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
    };
    
    return icons[iconName] || null;
  };

  // Main content based on current view
  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard setCurrentView={setCurrentView} />;
      case 'scanner':
        return <ChatScanner />;
      case 'history':
        return <ScanHistory />;
      case 'alerts':
        return <SecurityAlerts />;
      case 'guide':
        return <SecurityGuide setCurrentView={setCurrentView} />;
      case 'settings':
        return <Settings />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
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