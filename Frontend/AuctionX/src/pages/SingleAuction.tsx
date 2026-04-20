import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  Heart, 
  Users, 
  ShieldCheck, 
  Star,
  Zap,
  TrendingUp
} from 'lucide-react';
import { Auction } from '../types';
import { MOCK_BIDS } from '../constants';
import CountdownTimer from '../components/CountdownTimer';

export default function SingleAuction({ auction, onNavigate }: { auction: Auction, onNavigate: (p: string, d?: any) => void }) {
  const [activeTab, setActiveTab] = useState<'description' | 'condition' | 'seller' | 'history'>('description');
  const [bidAmount, setBidAmount] = useState<number>(auction.currentBid + 500);
  const [isWinning, setIsWinning] = useState(false);

  return (
    <div className="flex h-full overflow-hidden bg-bg">
      {/* Left Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
        <button 
          onClick={() => onNavigate('browse')}
          className="flex items-center gap-2 text-text-dim hover:text-white transition-colors text-sm font-medium"
        >
          <ChevronLeft size={16} />
          Back to Browse
        </button>

        <div className="grid lg:grid-cols-1 gap-8">
          <div className="space-y-6">
            <div className="aspect-video rounded-2xl overflow-hidden border border-white/5 bg-surface relative">
              <img 
                src={auction.image} 
                alt={auction.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-danger rounded-lg text-xs font-bold text-white uppercase tracking-wider">
                  <span className="w-2 h-2 bg-white rounded-full pulse-red"></span>
                  Live Auction
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-white leading-tight">{auction.title}</h1>
              <div className="flex items-center gap-4 text-sm text-text-dim">
                <div className="flex items-center gap-1.5">
                  <Users size={16} className="text-primary" />
                  <span>{auction.participantCount} Participants</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <TrendingUp size={16} className="text-success" />
                  <span>{auction.bidCount} Bids Placed</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-white/5 flex gap-8">
              {['description', 'condition', 'seller', 'history'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === tab ? 'text-primary' : 'text-text-dim hover:text-white'}`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
                  )}
                </button>
              ))}
            </div>

            <div className="text-text-dim leading-relaxed text-sm">
              {activeTab === 'description' && <p>{auction.description}</p>}
              {activeTab === 'condition' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <ShieldCheck size={18} className="text-success" />
                    <span>Certified {auction.condition}</span>
                  </div>
                  <p>This item has been professionally inspected and verified by our expert team. It is in {auction.condition.toLowerCase()} condition with minimal signs of wear.</p>
                </div>
              )}
              {activeTab === 'seller' && (
                <div className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-white/5">
                  <img src={auction.seller.avatar} alt={auction.seller.name} className="w-12 h-12 rounded-full" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white">{auction.seller.name}</h4>
                      <ShieldCheck size={14} className="text-primary" />
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <Star size={12} className="text-accent fill-accent" />
                      <span className="text-white font-bold">{auction.seller.rating}</span>
                      <span className="text-text-dim">({auction.seller.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'history' && (
                <div className="space-y-3">
                  {MOCK_BIDS.map((bid, i) => (
                    <div key={bid.id} className="flex items-center justify-between p-3 rounded-lg bg-surface/50 border border-white/5 text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white">
                          {bid.bidderName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-white">{bid.bidderName}</p>
                          <p className="text-text-dim">{bid.timestamp}</p>
                        </div>
                      </div>
                      <p className="font-bold text-success">₹{bid.amount.toLocaleString('en-IN')}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Sticky */}
      <div className="w-[340px] bg-surface border-l border-white/5 flex flex-col shrink-0 overflow-y-auto no-scrollbar">
        <div className="bg-danger text-white p-4 text-xs font-bold flex items-center gap-3">
          <Zap size={16} fill="currentColor" />
          ⚡ You've been outbid! Bid again to stay in.
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white">{auction.title}</h2>
            <div className="flex items-center gap-1.5 text-xs text-text-dim">
              <span>by</span>
              <span className="text-white font-bold">{auction.seller.name}</span>
              <ShieldCheck size={12} className="text-primary" />
              <span>• Verified Seller</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-black/20 p-4 rounded-xl">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-text-dim uppercase tracking-widest">Current Bid</span>
              <span className="text-xl font-bold text-success block">₹{auction.currentBid.toLocaleString('en-IN')}</span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-text-dim uppercase tracking-widest">Ends In</span>
              <span className="text-xl font-bold text-danger block">
                <CountdownTimer targetDate={auction.endTime} compact />
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim text-lg font-bold">₹</span>
              <input 
                type="number" 
                value={bidAmount}
                onChange={(e) => setBidAmount(Number(e.target.value))}
                className="w-full bg-bg border border-surface-lighter rounded-xl py-4 pl-10 pr-4 text-xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[500, 1000, 5000].map(increment => (
                <button 
                  key={increment}
                  onClick={() => setBidAmount(auction.currentBid + increment)}
                  className="bg-surface-lighter hover:bg-slate-600 text-white py-2 rounded-lg text-[11px] font-bold transition-colors"
                >
                  + ₹{increment.toLocaleString('en-IN')}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setIsWinning(true)}
              className="w-full bg-accent hover:bg-amber-500 text-black font-extrabold py-4 rounded-xl text-lg shadow-lg shadow-accent/20 transition-all active:scale-95"
            >
              Place Bid
            </button>
          </div>

          <div className="bg-primary/10 border border-primary/30 p-4 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-[11px] font-bold text-primary uppercase tracking-wider">
              <span>✨ AI Price Insight</span>
            </div>
            <p className="text-xs text-text-dim leading-relaxed">
              Based on recent sales for <b className="text-white">{auction.title}</b> in this condition, our Gemini engine suggests a fair winning bid of <b className="text-white">₹{(auction.currentBid * 0.95).toLocaleString('en-IN')} – ₹{(auction.currentBid * 1.1).toLocaleString('en-IN')}</b>.
            </p>
            <p className="text-[9px] text-text-dim/50 text-right italic">Powered by Gemini</p>
          </div>
        </div>
      </div>
    </div>
  );
}
