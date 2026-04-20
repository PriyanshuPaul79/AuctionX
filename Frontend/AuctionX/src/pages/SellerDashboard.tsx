import { motion } from 'motion/react';
import { PlusCircle, TrendingUp, DollarSign, Package, Star, ChevronRight, Edit3, Eye, Trash2 } from 'lucide-react';
import { Auction } from '../types';

export default function SellerDashboard({ auctions, onNavigate }: { auctions: Auction[], onNavigate: (p: string, d?: any) => void }) {
  const myAuctions = auctions.slice(0, 3); // Simulate seller's auctions

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10 pb-20 h-full overflow-y-auto no-scrollbar">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Seller Dashboard</h1>
          <p className="text-text-dim">Manage your listings and track your earnings.</p>
        </div>
        
        <button 
          onClick={() => onNavigate('create-auction')}
          className="bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all uppercase tracking-widest text-sm"
        >
          <PlusCircle size={20} />
          Create New Auction
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Listings', value: '04', icon: <Package size={20} />, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Total Earnings', value: '₹4.8L', icon: <DollarSign size={20} />, color: 'text-success', bg: 'bg-success/10' },
          { label: 'Completed', value: '12', icon: <TrendingUp size={20} />, color: 'text-accent', bg: 'bg-accent/10' },
          { label: 'Avg. Rating', value: '4.9', icon: <Star size={20} />, color: 'text-amber-400', bg: 'bg-amber-400/10' }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface p-6 rounded-3xl border border-white/5 shadow-sm"
          >
            <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              {stat.icon}
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-[10px] font-bold text-text-dim uppercase tracking-widest">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Active Listings Table */}
      <section className="bg-surface rounded-3xl border border-white/5 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">My Active Listings</h2>
          <button className="text-xs font-bold text-primary hover:underline uppercase tracking-widest">View All</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-black/20 text-[10px] font-bold text-text-dim uppercase tracking-widest">
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Start Price</th>
                <th className="px-6 py-4">Current Bid</th>
                <th className="px-6 py-4">Bids</th>
                <th className="px-6 py-4">Time Left</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {myAuctions.map((auction, i) => (
                <tr key={auction.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={auction.image} alt="" className="w-10 h-10 rounded-lg object-cover border border-white/5" />
                      <span className="font-bold text-white text-sm">{auction.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-text-dim text-sm">₹{auction.startingPrice.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4 font-bold text-success text-sm">₹{auction.currentBid.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-white">{auction.bidCount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-danger">45m 12s</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-text-dim hover:text-primary transition-colors"><Eye size={18} /></button>
                      <button className="p-2 text-text-dim hover:text-primary transition-colors"><Edit3 size={18} /></button>
                      <button className="p-2 text-text-dim hover:text-danger transition-colors"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recent Completed */}
      <section>
        <h2 className="text-xl font-bold text-white mb-6">Recently Completed</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'MacBook Pro M1', winner: 'User***45', price: '₹1,12,000', date: '2 days ago' },
            { title: 'Canon EOS R5', winner: 'User***89', price: '₹2,45,000', date: '5 days ago' },
            { title: 'Bose QC45', winner: 'User***12', price: '₹22,500', date: '1 week ago' }
          ].map((item, i) => (
            <div key={i} className="bg-surface p-6 rounded-3xl border border-white/5 shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-white text-sm">{item.title}</h3>
                <span className="text-[9px] font-bold text-text-dim uppercase tracking-widest">{item.date}</span>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[9px] font-bold text-text-dim uppercase tracking-widest mb-1">Final Price</p>
                  <p className="text-xl font-bold text-success">{item.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-bold text-text-dim uppercase tracking-widest mb-1">Winner</p>
                  <p className="text-xs font-bold text-white">{item.winner}</p>
                </div>
              </div>
              <button className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-text-dim hover:text-white transition-all uppercase tracking-widest">
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
