import { motion } from 'motion/react';
import { Gavel, ShieldCheck, Zap, Award, ChevronRight, ArrowRight, PlusCircle } from 'lucide-react';
import { MOCK_AUCTIONS } from '../constants';
import AuctionCard from '../components/AuctionCard';

export default function LandingPage({ onNavigate, onLogin }: { onNavigate: (p: string, d?: any) => void, onLogin: () => void }) {
  return (
    <div className="bg-bg min-h-screen text-white selection:bg-primary/30">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full h-20 bg-bg/80 backdrop-blur-xl border-b border-white/5 z-50 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-[0_0_20px_rgba(26,86,160,0.4)]">AX</div>
          <span className="font-extrabold text-2xl tracking-tight text-white">AuctionX</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          <a href="#" className="text-[10px] font-bold text-text-dim hover:text-white transition-all uppercase tracking-widest">How it works</a>
          <a href="#" className="text-[10px] font-bold text-text-dim hover:text-white transition-all uppercase tracking-widest" onClick={() => onNavigate('browse')}>Browse Auctions</a>
          <a href="#" className="text-[10px] font-bold text-text-dim hover:text-white transition-all uppercase tracking-widest">Sell</a>
        </div>

        <div className="flex items-center gap-6">
          <button onClick={onLogin} className="text-[10px] font-bold text-white hover:text-primary transition-all uppercase tracking-widest">Login</button>
          <button onClick={onLogin} className="bg-primary text-white px-8 py-3 rounded-xl text-[10px] font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all uppercase tracking-widest">Register</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-24 px-6 md:px-12 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-8 border border-primary/20">
            <Zap size={14} fill="currentColor" />
            <span>The Future of Online Auctions</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold text-white leading-[0.95] mb-8 tracking-tighter">
            The Fairest <br />Way to <span className="text-primary">Win</span>
          </h1>
          <p className="text-lg text-text-dim mb-12 max-w-lg leading-relaxed font-medium">
            AuctionX brings transparency and excitement to online bidding. Discover rare collectibles, electronics, and more with real-time AI-powered insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <button 
              onClick={() => onNavigate('browse')}
              className="bg-primary text-white px-10 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-all uppercase tracking-widest text-xs"
            >
              Browse Live Auctions
              <ChevronRight size={20} />
            </button>
            <button className="border border-white/10 text-white px-10 py-5 rounded-2xl font-bold hover:bg-white/5 transition-all uppercase tracking-widest text-xs">
              Start Selling
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-accent/20 rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
          
          <div className="relative bg-surface rounded-[3rem] p-5 shadow-2xl border border-white/5 transform rotate-2 hover:rotate-0 transition-transform duration-700">
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] border border-white/5">
              <img 
                src="https://picsum.photos/seed/auction-hero/800/1000" 
                alt="Auction Hero" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent"></div>
              
              <div className="absolute bottom-8 left-8 right-8 p-8 bg-black/40 backdrop-blur-2xl rounded-3xl border border-white/10">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-text-dim text-[10px] font-bold uppercase tracking-widest mb-2">Current Bid</p>
                    <p className="text-4xl font-extrabold text-white tracking-tight">₹1,24,500</p>
                  </div>
                  <div className="bg-danger px-4 py-1.5 rounded-full text-white text-[10px] font-bold uppercase tracking-widest animate-pulse">
                    Live Now
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                      <Gavel size={18} className="text-white" />
                    </div>
                    <span className="text-white text-xs font-bold uppercase tracking-widest">34 Bidders</span>
                  </div>
                  <div className="text-white text-sm font-black font-mono tracking-tighter">04:12:55</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Trust Bar */}
      <section className="py-16 bg-surface border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: 'Auctions Hosted', value: '50,000+' },
            { label: 'Bids Placed', value: '2M+' },
            { label: 'Seller Satisfaction', value: '98%' },
            { label: 'In Transactions', value: '₹10Cr+' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-4xl font-extrabold text-white mb-2 tracking-tight">{stat.value}</p>
              <p className="text-[10px] font-bold text-text-dim uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">How It Works</h2>
          <p className="text-text-dim max-w-2xl mx-auto text-lg font-medium">Three simple steps to start your auction journey with AuctionX.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-16">
          {[
            { icon: <PlusCircle size={32} />, title: 'List Your Product', desc: 'Upload images and let our AI generate the perfect description and price suggestion.' },
            { icon: <Gavel size={32} />, title: 'Buyers Bid Live', desc: 'Watch the excitement as verified buyers compete in real-time for your product.' },
            { icon: <Award size={32} />, title: 'Winner Pays Securely', desc: 'Our secure payment gateway ensures a smooth transaction for both parties.' }
          ].map((step, i) => (
            <div key={i} className="relative text-center group">
              {i < 2 && <div className="hidden md:block absolute top-12 left-full w-full border-t border-dashed border-white/10 -translate-x-1/2 z-0"></div>}
              <div className="relative z-10 w-24 h-24 bg-surface rounded-[2rem] border border-white/5 shadow-2xl flex items-center justify-center mx-auto mb-10 group-hover:border-primary group-hover:text-primary transition-all duration-500">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-5 tracking-tight">{step.title}</h3>
              <p className="text-text-dim leading-relaxed font-medium">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live Auctions Preview */}
      <section className="py-32 bg-sidebar border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">Live Auctions</h2>
            <p className="text-text-dim text-lg font-medium">Don't miss out on these trending items ending soon.</p>
          </div>
          <button 
            onClick={() => onNavigate('browse')}
            className="flex items-center gap-3 text-primary font-bold hover:gap-5 transition-all uppercase tracking-widest text-xs"
          >
            View All <ArrowRight size={20} />
          </button>
        </div>

        <div className="flex gap-8 px-6 overflow-x-auto pb-12 no-scrollbar">
          {MOCK_AUCTIONS.map(auction => (
            <div key={auction.id} className="min-w-[320px] md:min-w-[380px]">
              <AuctionCard auction={auction} onClick={() => onNavigate('auction-detail', auction)} />
            </div>
          ))}
        </div>
      </section>

      {/* AI Features */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="bg-primary rounded-[4rem] p-12 md:p-24 relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(26,86,160,0.5)]">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest mb-8 border border-white/20">
                Powered by Gemini
              </div>
              <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-8 tracking-tighter leading-[1.1]">Smart Bidding with <br /><span className="text-accent">AI Insights</span></h2>
              <p className="text-white/80 text-xl mb-12 leading-relaxed font-medium">
                We use advanced AI to help you make informed decisions. From price suggestions to automated descriptions, AuctionX is your smart auction partner.
              </p>
              
              <div className="space-y-8">
                {[
                  { title: 'AI Price Suggestion', desc: 'Get fair market value estimates based on real-time data.' },
                  { title: 'Auto-Description', desc: 'Generate professional product listings from just an image.' },
                  { title: 'Bid Sentiment', desc: 'Understand auction trends with our smart analytics.' }
                ].map((f, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 border border-white/10">
                      <ShieldCheck size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">{f.title}</h4>
                      <p className="text-white/60 text-sm font-medium leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative hidden md:block">
              <div className="bg-white/10 backdrop-blur-3xl rounded-[3rem] p-10 border border-white/20 shadow-2xl">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center text-black shadow-lg shadow-accent/20">
                    <Zap size={28} fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">AI Price Insight</p>
                    <p className="text-white/50 text-xs font-bold uppercase tracking-widest">Analysis complete</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="h-2 bg-white/20 rounded-full w-full"></div>
                  <div className="h-2 bg-white/20 rounded-full w-3/4"></div>
                  <div className="h-2 bg-white/20 rounded-full w-5/6"></div>
                  <div className="pt-8">
                    <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-3">Suggested Starting Price</p>
                    <p className="text-5xl font-extrabold text-accent tracking-tight">₹12,499</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg pt-32 pb-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-16 mb-32">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">AX</div>
              <span className="font-extrabold text-2xl tracking-tight text-white">AuctionX</span>
            </div>
            <p className="text-text-dim text-sm leading-relaxed mb-8 font-medium">
              The world's most trusted real-time auction platform. Bid smart, win fair, and experience the thrill of the auction.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-8 uppercase text-[10px] tracking-[0.2em]">For Buyers</h4>
            <ul className="space-y-5 text-sm text-text-dim font-medium">
              <li><a href="#" className="hover:text-primary transition-colors">Browse Auctions</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Buyer Protection</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">How to Bid</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Verified Sellers</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-8 uppercase text-[10px] tracking-[0.2em]">For Sellers</h4>
            <ul className="space-y-5 text-sm text-text-dim font-medium">
              <li><a href="#" className="hover:text-primary transition-colors">Start Selling</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Seller Fees</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">AI Tools</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Shipping Guide</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-8 uppercase text-[10px] tracking-[0.2em]">Legal</h4>
            <ul className="space-y-5 text-sm text-text-dim font-medium">
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Dispute Resolution</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-text-dim text-[10px] font-bold uppercase tracking-widest">© 2024 AuctionX Inc. All rights reserved.</p>
          <div className="flex gap-10">
            <a href="#" className="text-text-dim hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest">Twitter</a>
            <a href="#" className="text-text-dim hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest">Instagram</a>
            <a href="#" className="text-text-dim hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
