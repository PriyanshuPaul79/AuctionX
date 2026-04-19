import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, 
  Zap, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Sparkles, 
  Info,
  DollarSign,
  Clock,
  Eye
} from 'lucide-react';

export default function CreateAuction({ onNavigate }: { onNavigate: (p: string, d?: any) => void }) {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAISuggestion, setShowAISuggestion] = useState(true); // Show filled state by default

  const [formData, setFormData] = useState({
    title: 'iPhone 14 Pro - 256GB Space Black',
    category: 'Electronics',
    condition: 'Like New',
    description: 'Mint condition iPhone 14 Pro. No scratches, includes original box and accessories. Battery health 98%. Recently upgraded to iPhone 15, so selling this one. It has been kept in a case since day one.',
    startingPrice: '50000',
    duration: '24 Hours',
    startTime: 'Immediately'
  });

  const handleGenerateAI = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowAISuggestion(true);
    }, 2000);
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto pb-32 h-full overflow-y-auto no-scrollbar">
      {/* Progress Indicator */}
      <div className="mb-12">
        <div className="flex justify-between mb-4">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all ${step >= s ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-surface text-text-dim border border-white/5'}`}>
                {step > s ? <CheckCircle2 size={20} /> : s}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${step >= s ? 'text-primary' : 'text-text-dim'}`}>
                {s === 1 ? 'Details' : s === 2 ? 'Settings' : 'Review'}
              </span>
            </div>
          ))}
        </div>
        <div className="h-1.5 bg-surface rounded-full overflow-hidden border border-white/5">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: '33.33%' }}
            animate={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h2 className="text-2xl font-extrabold text-white tracking-tight">Product Details</h2>
              
              {/* Image Upload */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest ml-1">Product Images</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="aspect-square rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-2 text-text-dim hover:border-primary hover:text-primary transition-all cursor-pointer bg-surface">
                    <Upload size={24} />
                    <span className="text-[10px] font-bold uppercase">Upload</span>
                  </div>
                  {[1, 2, 3].map(i => (
                    <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-white/5 relative group">
                      <img src={`https://picsum.photos/seed/upload${i}/400/400`} alt="" className="w-full h-full object-cover" />
                      <button className="absolute top-2 right-2 w-6 h-6 bg-black/60 backdrop-blur-md rounded-lg flex items-center justify-center text-danger opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Generation Card */}
              <div className="bg-sidebar rounded-3xl p-8 relative overflow-hidden border border-white/5">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-accent shrink-0 border border-white/5">
                    <Sparkles size={32} />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-lg font-bold text-white mb-1">Generate Description with AI</h3>
                    <p className="text-text-dim text-sm">Upload an image above and let Gemini write your listing for you.</p>
                  </div>
                  <button 
                    onClick={handleGenerateAI}
                    disabled={isGenerating}
                    className="bg-white text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-accent hover:text-black transition-all disabled:opacity-50 uppercase tracking-widest text-xs"
                  >
                    {isGenerating ? 'Generating...' : 'Generate with Gemini'}
                    <Zap size={18} fill="currentColor" />
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest ml-1">Product Title</label>
                  <input 
                    type="text" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-5 py-4 bg-surface border border-white/5 rounded-2xl text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest ml-1">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-5 py-4 bg-surface border border-white/5 rounded-2xl text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all appearance-none text-sm"
                  >
                    <option>Electronics</option>
                    <option>Fashion</option>
                    <option>Art & Collectibles</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest ml-1">Condition</label>
                <div className="flex gap-3">
                  {['New', 'Like New', 'Good', 'Fair'].map(c => (
                    <button
                      key={c}
                      onClick={() => setFormData({...formData, condition: c as any})}
                      className={`flex-1 py-3 text-xs font-bold rounded-xl border transition-all ${formData.condition === c ? 'border-primary bg-primary/10 text-primary' : 'border-white/5 bg-surface text-text-dim hover:border-white/20'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest ml-1">Description</label>
                <textarea 
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-5 py-4 bg-surface border border-white/5 rounded-2xl text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button 
                onClick={() => setStep(2)}
                className="bg-primary text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-primary/20 flex items-center gap-2 hover:scale-[1.02] transition-all uppercase tracking-widest text-sm"
              >
                Next Step
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h2 className="text-2xl font-extrabold text-white tracking-tight">Auction Settings</h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest ml-1">Starting Price</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-text-dim">₹</span>
                    <input 
                      type="number" 
                      value={formData.startingPrice}
                      onChange={(e) => setFormData({...formData, startingPrice: e.target.value})}
                      className="w-full pl-10 pr-4 py-5 bg-surface border border-white/5 rounded-2xl text-2xl font-bold text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>
                </div>

                {/* AI Price Suggestion */}
                {showAISuggestion && (
                  <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 space-y-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="flex items-center gap-2 text-primary">
                      <Zap size={18} fill="currentColor" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Smart Price Suggestion</span>
                    </div>
                    <p className="text-sm text-text-dim leading-relaxed">
                      Based on your product description, we suggest starting at <span className="font-bold text-white">₹45,000</span>. 
                      This maximises bidder participation while protecting your minimum value.
                    </p>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-primary text-white text-[10px] font-bold rounded-lg hover:bg-primary/90 transition-all uppercase tracking-widest">Use Suggested Price</button>
                      <button className="px-4 py-2 bg-white/5 border border-white/10 text-text-dim text-[10px] font-bold rounded-lg hover:bg-white/10 transition-all uppercase tracking-widest">Set My Own Price</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest ml-1">Auction Duration</label>
                <div className="flex flex-wrap gap-3">
                  {['12 Hours', '24 Hours', '48 Hours', '7 Days', 'Custom'].map(d => (
                    <button
                      key={d}
                      onClick={() => setFormData({...formData, duration: d})}
                      className={`px-6 py-3 text-xs font-bold rounded-xl border transition-all ${formData.duration === d ? 'border-primary bg-primary/10 text-primary' : 'border-white/5 bg-surface text-text-dim hover:border-white/20'}`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest ml-1">Start Time</label>
                <div className="flex gap-3">
                  {['Immediately', 'Schedule for later'].map(t => (
                    <button
                      key={t}
                      onClick={() => setFormData({...formData, startTime: t})}
                      className={`flex-1 py-3 text-xs font-bold rounded-xl border transition-all ${formData.startTime === t ? 'border-primary bg-primary/10 text-primary' : 'border-white/5 bg-surface text-text-dim hover:border-white/20'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button 
                onClick={() => setStep(1)}
                className="px-8 py-4 rounded-2xl font-bold text-text-dim flex items-center gap-2 hover:bg-white/5 transition-all uppercase tracking-widest text-xs"
              >
                <ChevronLeft size={20} />
                Back
              </button>
              <button 
                onClick={() => setStep(3)}
                className="bg-primary text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-primary/20 flex items-center gap-2 hover:scale-[1.02] transition-all uppercase tracking-widest text-sm"
              >
                Review Listing
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <h2 className="text-2xl font-extrabold text-white tracking-tight">Review & Publish</h2>
              
              <div className="bg-surface rounded-[2.5rem] border border-white/5 overflow-hidden shadow-xl">
                <div className="grid md:grid-cols-2">
                  <div className="aspect-square">
                    <img src="https://picsum.photos/seed/iphone/800/800" alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8 space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-white/5 rounded text-[9px] font-bold text-text-dim uppercase tracking-widest">Preview</span>
                        <div className="w-1 h-1 bg-white/10 rounded-full"></div>
                        <span className="text-[9px] font-bold text-primary uppercase tracking-widest">Electronics</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white tracking-tight">{formData.title}</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-end border-b border-white/5 pb-4">
                        <div>
                          <p className="text-[9px] font-bold text-text-dim uppercase tracking-widest mb-1">Starting Price</p>
                          <p className="text-3xl font-bold text-success">₹{Number(formData.startingPrice).toLocaleString('en-IN')}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] font-bold text-text-dim uppercase tracking-widest mb-1">Duration</p>
                          <p className="text-lg font-bold text-white">{formData.duration}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-[9px] font-bold text-text-dim uppercase tracking-widest">Description</p>
                        <p className="text-xs text-text-dim line-clamp-3 leading-relaxed">{formData.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                      <CheckCircle2 size={20} className="text-success" />
                      <span className="text-xs font-bold text-white uppercase tracking-widest">All details verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <button 
                onClick={() => setStep(2)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-text-dim flex items-center justify-center gap-2 hover:bg-white/5 transition-all uppercase tracking-widest text-xs"
              >
                <ChevronLeft size={20} />
                Edit Settings
              </button>
              <div className="flex gap-4 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none px-8 py-4 rounded-2xl font-bold text-text-dim hover:text-white hover:bg-white/5 transition-all uppercase tracking-widest text-xs">
                  Save as Draft
                </button>
                <button 
                  onClick={() => onNavigate('seller-dashboard')}
                  className="flex-1 sm:flex-none bg-primary text-white px-12 py-4 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all uppercase tracking-widest text-sm"
                >
                  Publish Auction
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Trash2({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );
}
