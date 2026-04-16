import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gavel, 
  LayoutDashboard, 
  Search, 
  Heart, 
  Bell, 
  Settings, 
  LogOut, 
  PlusCircle, 
  ShoppingBag,
  Menu,
  X,
  User,
  ChevronRight,
  TrendingUp,
  Clock,
  ShieldCheck,
  Star
} from 'lucide-react';
import { MOCK_AUCTIONS, MOCK_NOTIFICATIONS, MOCK_BIDS } from './constants';
import { Auction, Notification, Bid, AuctionStatus } from './types';

// Pages
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import BuyerDashboard from './pages/BuyerDashboard';
import BrowseAuctions from './pages/BrowseAuctions';
import SingleAuction from './pages/SingleAuction';
import SellerDashboard from './pages/SellerDashboard';
import CreateAuction from './pages/CreateAuction';
import NotificationsPage from './pages/NotificationsPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<'buyer' | 'seller' | 'both'>('both');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null);

  // Simulate real-time bid updates
  const [auctions, setAuctions] = useState<Auction[]>(MOCK_AUCTIONS);

  useEffect(() => {
    const interval = setInterval(() => {
      setAuctions(prev => prev.map(a => {
        if (a.status === 'ENDING_SOON' && Math.random() > 0.8) {
          return {
            ...a,
            currentBid: a.currentBid + Math.floor(Math.random() * 1000) + 100,
            bidCount: a.bidCount + 1
          };
        }
        return a;
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const navigate = (page: string, data?: any) => {
    if (page === 'auction-detail') {
      setSelectedAuction(data);
    }
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleLogin = (role: 'buyer' | 'seller' | 'both') => {
    setIsLoggedIn(true);
    setUserRole(role);
    setCurrentPage(role === 'seller' ? 'seller-dashboard' : 'buyer-dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('landing');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={navigate} onLogin={() => setCurrentPage('auth')} />;
      case 'auth':
        return <AuthPage onLogin={handleLogin} onBack={() => setCurrentPage('landing')} />;
      case 'buyer-dashboard':
        return <BuyerDashboard auctions={auctions} onNavigate={navigate} />;
      case 'browse':
        return <BrowseAuctions auctions={auctions} onNavigate={navigate} />;
      case 'auction-detail':
        return selectedAuction ? <SingleAuction auction={selectedAuction} onNavigate={navigate} /> : null;
      case 'seller-dashboard':
        return <SellerDashboard auctions={auctions} onNavigate={navigate} />;
      case 'create-auction':
        return <CreateAuction onNavigate={navigate} />;
      case 'notifications':
        return <NotificationsPage notifications={MOCK_NOTIFICATIONS} onNavigate={navigate} />;
      default:
        return <LandingPage onNavigate={navigate} onLogin={() => setCurrentPage('auth')} />;
    }
  };

  const Sidebar = () => (
    <aside className={`fixed left-0 top-0 h-full bg-sidebar border-r border-white/5 transition-all duration-300 z-50 ${isSidebarOpen ? 'w-[220px]' : 'w-20'}`}>
      <div className="p-6 flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-extrabold text-sm relative">
          AX
          <span className="absolute right-1 bottom-1 text-[8px] text-accent">↑</span>
        </div>
        {isSidebarOpen && (
          <span className="font-extrabold text-lg tracking-tight text-white">AuctionX</span>
        )}
      </div>

      <div className="px-4 py-2">
        <nav className="space-y-1">
          <NavItem 
            icon={<LayoutDashboard size={18} />} 
            label="Dashboard" 
            active={currentPage.includes('dashboard')} 
            onClick={() => navigate(userRole === 'seller' ? 'seller-dashboard' : 'buyer-dashboard')} 
            collapsed={!isSidebarOpen}
          />
          <NavItem 
            icon={<Search size={18} />} 
            label="Browse Auctions" 
            active={currentPage === 'browse'} 
            onClick={() => navigate('browse')} 
            collapsed={!isSidebarOpen}
          />
          <NavItem 
            icon={<ShoppingBag size={18} />} 
            label="My Bids" 
            active={false} 
            onClick={() => {}} 
            collapsed={!isSidebarOpen}
          />
          <NavItem 
            icon={<Heart size={18} />} 
            label="Watchlist" 
            active={false} 
            onClick={() => {}} 
            collapsed={!isSidebarOpen}
          />
          <NavItem 
            icon={<Bell size={18} />} 
            label="Notifications" 
            active={currentPage === 'notifications'} 
            onClick={() => navigate('notifications')} 
            badge={2}
            collapsed={!isSidebarOpen}
          />
        </nav>
      </div>

      <div className="absolute bottom-4 left-0 w-full px-4 space-y-1">
        <NavItem 
          icon={<Settings size={18} />} 
          label="Settings" 
          active={false} 
          onClick={() => {}} 
          collapsed={!isSidebarOpen}
        />
        <NavItem 
          icon={<LogOut size={18} />} 
          label="Logout" 
          active={false} 
          onClick={handleLogout} 
          collapsed={!isSidebarOpen}
          danger
        />
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="w-full flex items-center justify-center p-2 text-text-dim hover:text-white transition-colors"
        >
          {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-bg text-text-main">
      {isLoggedIn && currentPage !== 'landing' && currentPage !== 'auth' && <Sidebar />}
      
      <main className={`${isLoggedIn && currentPage !== 'landing' && currentPage !== 'auth' ? (isSidebarOpen ? 'ml-[220px]' : 'ml-20') : ''} transition-all duration-300 min-h-screen flex flex-col`}>
        {isLoggedIn && currentPage !== 'landing' && currentPage !== 'auth' && (
          <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 shrink-0">
            <div className="relative w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" size={16} />
              <input 
                type="text" 
                placeholder="Search for products, brands or categories..." 
                className="w-full pl-11 pr-4 py-2 bg-surface border border-surface-lighter rounded-full text-xs text-text-dim focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-medium text-text-dim">₹ 45,200.00</span>
              <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-[10px] font-bold text-white">
                PS
              </div>
            </div>
          </div>
        )}
        <div className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Bottom Tab Bar */}
      {isLoggedIn && (
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-sidebar border-t border-white/5 px-6 py-3 flex justify-between items-center z-50">
          <button onClick={() => navigate(userRole === 'seller' ? 'seller-dashboard' : 'buyer-dashboard')} className={`p-2 ${currentPage.includes('dashboard') ? 'text-primary' : 'text-text-dim'}`}>
            <LayoutDashboard size={24} />
          </button>
          <button onClick={() => navigate('browse')} className={`p-2 ${currentPage === 'browse' ? 'text-primary' : 'text-text-dim'}`}>
            <Search size={24} />
          </button>
          <button onClick={() => navigate('create-auction')} className={`p-2 ${currentPage === 'create-auction' ? 'text-primary' : 'text-text-dim'}`}>
            <PlusCircle size={24} />
          </button>
          <button onClick={() => navigate('notifications')} className={`p-2 ${currentPage === 'notifications' ? 'text-primary' : 'text-text-dim'}`}>
            <Bell size={24} />
          </button>
          <button onClick={handleLogout} className="p-2 text-text-dim">
            <LogOut size={24} />
          </button>
        </div>
      )}
    </div>
  );
}

function NavItem({ icon, label, active, onClick, collapsed, badge, danger }: { 
  icon: React.ReactNode, 
  label: string, 
  active: boolean, 
  onClick: () => void,
  collapsed?: boolean,
  badge?: number,
  danger?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all relative group ${
        active 
          ? 'bg-primary/20 text-white font-semibold' 
          : danger 
            ? 'text-danger hover:bg-danger/10' 
            : 'text-text-dim hover:text-white hover:bg-white/5'
      } ${collapsed ? 'justify-center' : ''}`}
    >
      <span className={`${active ? 'text-primary' : ''}`}>
        {icon}
      </span>
      {!collapsed && <span className="text-sm">{label}</span>}
      {badge && !collapsed && (
        <span className="ml-auto bg-danger text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
          {badge}
        </span>
      )}
      {badge && collapsed && (
        <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full border-2 border-sidebar"></span>
      )}
    </button>
  );
}
