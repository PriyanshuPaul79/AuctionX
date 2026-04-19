import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Grid, List, ChevronDown, X } from 'lucide-react';
import { Auction } from '../types';
import AuctionCard from '../components/AuctionCard';

export default function BrowseAuctions({ auctions, onNavigate }: { auctions: Auction[], onNavigate: (p: string, d?: any) => void }) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ['Electronics', 'Fashion', 'Art & Collectibles', 'Agriculture', 'Books', 'Furniture', 'Vehicles'];

  const filteredAuctions = auctions.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? a.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 flex flex-col md:flex-row gap-8 h-full overflow-hidden">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 shrink-0 space-y-8 overflow-y-auto no-scrollbar pr-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Filter size={18} />
            Filters
          </h2>
          <button 
            onClick={() => { setSelectedCategory(null); setSearchQuery(''); }}
            className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest"
          >
            Clear All
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold text-text-dim uppercase tracking-widest">Category</h3>
            <div className="space-y-2">
              {categories.map(cat => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                    className="w-4 h-4 rounded border-white/10 bg-surface text-primary focus:ring-primary" 
                  />
                  <span className={`text-sm transition-colors ${selectedCategory === cat ? 'text-primary font-bold' : 'text-text-dim group-hover:text-white'}`}>
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-[10px] font-bold text-text-dim uppercase tracking-widest">Price Range</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-1">
                  <p className="text-[9px] font-bold text-text-dim mb-1">MIN</p>
                  <input type="text" placeholder="₹0" className="w-full px-3 py-2 bg-surface border border-white/5 rounded-lg text-xs text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-[9px] font-bold text-text-dim mb-1">MAX</p>
                  <input type="text" placeholder="₹10L+" className="w-full px-3 py-2 bg-surface border border-white/5 rounded-lg text-xs text-white" />
                </div>
              </div>
              <input type="range" className="w-full h-1 bg-surface-lighter rounded-lg appearance-none cursor-pointer accent-primary" />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-[10px] font-bold text-text-dim uppercase tracking-widest">Status</h3>
            <div className="space-y-2">
              {['Live Now', 'Ending Soon', 'Upcoming'].map(status => (
                <label key={status} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-surface text-primary focus:ring-primary" />
                  <span className="text-sm text-text-dim group-hover:text-white transition-colors">{status}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col space-y-6 overflow-hidden">
        {/* Search and Sort Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between shrink-0">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" size={16} />
            <input 
              type="text" 
              placeholder="Search by product name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-surface border border-white/5 rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex bg-surface p-1 rounded-lg border border-white/5">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-text-dim hover:text-white'}`}
              >
                <Grid size={16} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-primary text-white' : 'text-text-dim hover:text-white'}`}
              >
                <List size={16} />
              </button>
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2.5 bg-surface border border-white/5 rounded-xl text-xs font-bold text-white hover:bg-surface-lighter transition-all">
              Sort By: Ending Soonest
              <ChevronDown size={14} />
            </button>
          </div>
        </div>

        {/* Active Filters */}
        {(selectedCategory || searchQuery) && (
          <div className="flex flex-wrap gap-2 shrink-0">
            {selectedCategory && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory(null)}><X size={12} /></button>
              </div>
            )}
            {searchQuery && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                Search: {searchQuery}
                <button onClick={() => setSearchQuery('')}><X size={12} /></button>
              </div>
            )}
          </div>
        )}

        {/* Results Info */}
        <div className="flex items-center justify-between shrink-0">
          <p className="text-xs text-text-dim">
            Showing <span className="font-bold text-white">{filteredAuctions.length}</span> auctions
          </p>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredAuctions.map(auction => (
              <AuctionCard 
                key={auction.id} 
                auction={auction} 
                onClick={() => onNavigate('auction-detail', auction)} 
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredAuctions.length === 0 && (
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-6 text-text-dim border border-white/5">
                <Search size={32} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">No auctions found</h3>
              <p className="text-sm text-text-dim max-w-xs mx-auto">Try adjusting your filters or search query to find what you're looking for.</p>
              <button 
                onClick={() => { setSelectedCategory(null); setSearchQuery(''); }}
                className="mt-6 text-primary font-bold hover:underline text-sm"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {filteredAuctions.length > 0 && (
            <div className="pt-10 flex justify-center">
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-lg border border-white/5 bg-surface flex items-center justify-center text-text-dim hover:text-white disabled:opacity-50" disabled>
                  <ChevronDown size={16} className="rotate-90" />
                </button>
                {[1, 2, 3].map(p => (
                  <button key={p} className={`w-8 h-8 rounded-lg font-bold text-xs transition-all ${p === 1 ? 'bg-primary text-white' : 'border border-white/5 bg-surface text-text-dim hover:text-white'}`}>
                    {p}
                  </button>
                ))}
                <button className="w-8 h-8 rounded-lg border border-white/5 bg-surface flex items-center justify-center text-text-dim hover:text-white">
                  <ChevronDown size={16} className="-rotate-90" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
