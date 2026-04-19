import { motion } from 'motion/react';
import { Search, Bell, TrendingUp, Award, Heart, ShoppingBag, ChevronRight, Clock } from 'lucide-react';
import { Auction } from '../types';
import AuctionCard from '../components/AuctionCard';

export default function BuyerDashboard({ auctions, onNavigate }: { auctions: Auction[], onNavigate: (p: string, d?: any) => void }) {
  const endingSoon = auctions.filter(a => a.status === 'ENDING_SOON');
  const recommended = auctions.filter(a => a.status === 'LIVE');

  return (
    <div className="p-6 space-y-8 h-full">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Active Bids', value: '12' },
          { label: 'Auctions Won', value: '08' },
          { label: 'Total Spent', value: '₹2,45,000' }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface p-4 rounded-xl border border-white/5 shadow-sm"
          >
            <p className="text-[10px] font-bold text-text-dim uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-xl font-bold text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Section Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Live & Ending Soon</h2>
        <button onClick={() => onNavigate('browse')} className="text-xs font-medium text-primary hover:underline">
          View All →
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {auctions.map(auction => (
          <AuctionCard key={auction.id} auction={auction} onClick={() => onNavigate('auction-detail', auction)} />
        ))}
      </div>
    </div>
  );
}
