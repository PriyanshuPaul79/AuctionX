import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Users, TrendingUp, Clock } from 'lucide-react';
import { Auction } from '../types';
import CountdownTimer from './CountdownTimer';

interface AuctionCardProps {
  auction: Auction;
  onClick: () => void;
  key?: string | number;
}

export default function AuctionCard({ auction, onClick }: AuctionCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [bidFlash, setBidFlash] = useState(false);

  // Simulate bid flash when currentBid changes
  useEffect(() => {
    setBidFlash(true);
    const timer = setTimeout(() => setBidFlash(false), 1500);
    return () => clearTimeout(timer);
  }, [auction.currentBid]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'LIVE': return 'bg-danger text-white';
      case 'ENDING_SOON': return 'bg-accent text-white';
      case 'UPCOMING': return 'bg-slate-400 text-white';
      default: return 'bg-slate-200 text-slate-600';
    }
  };

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      className="bg-surface rounded-xl overflow-hidden border border-white/5 shadow-sm hover:border-primary/50 transition-all duration-300 cursor-pointer group relative"
      onClick={onClick}
    >
      <div className="relative h-[140px] overflow-hidden">
        <img 
          src={auction.image} 
          alt={auction.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        
        <div className="absolute top-3 left-3 flex gap-2">
          <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${getStatusColor(auction.status)}`}>
            {(auction.status === 'LIVE' || auction.status === 'ENDING_SOON') && <span className="w-1.5 h-1.5 bg-white rounded-full pulse-red"></span>}
            {auction.status === 'ENDING_SOON' ? 'ENDING' : auction.status.replace('_', ' ')}
          </div>
        </div>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsWatchlisted(!isWatchlisted);
          }}
          className={`absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-all ${isWatchlisted ? 'bg-danger text-white' : 'bg-black/40 text-white/80 hover:bg-black/60'}`}
        >
          <Heart size={14} fill={isWatchlisted ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="p-3 space-y-3">
        <h3 className="font-semibold text-sm text-text-main line-clamp-2 leading-tight h-10">
          {auction.title}
        </h3>

        <div className="flex justify-between items-end pt-1">
          <div className="space-y-0.5">
            <p className="text-[10px] font-medium text-text-dim uppercase tracking-wider">Current Bid</p>
            <p className={`text-base font-bold transition-colors duration-500 ${bidFlash ? 'text-success' : 'text-success'}`}>
              ₹{auction.currentBid.toLocaleString('en-IN')}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="text-[11px] font-mono bg-black/30 px-1.5 py-1 rounded text-accent">
              <CountdownTimer targetDate={auction.endTime} compact />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
