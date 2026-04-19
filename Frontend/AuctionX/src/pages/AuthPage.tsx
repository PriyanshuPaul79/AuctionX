import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, Phone, ChevronLeft, Eye, EyeOff, ShieldCheck } from 'lucide-react';

export default function AuthPage({ onLogin, onBack }: { onLogin: (role: 'buyer' | 'seller' | 'both') => void, onBack: () => void }) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'buyer' | 'seller' | 'both'>('buyer');

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-bg">
      {/* Left Panel - Branded */}
      <div className="hidden md:flex md:w-[40%] bg-sidebar p-12 flex-col justify-between relative overflow-hidden border-r border-white/5">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div className="relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-text-dim hover:text-white transition-colors mb-12 group"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold uppercase tracking-widest">Back to Home</span>
          </button>

          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-extrabold text-2xl shadow-xl shadow-primary/40 relative">
              AX
              <span className="absolute right-1 bottom-1 text-[10px] text-accent">↑</span>
            </div>
            <span className="font-extrabold text-3xl tracking-tight text-white">AuctionX</span>
          </div>
          
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-6">
            Join the most trusted <span className="text-accent">auction community</span> in India.
          </h2>
          <p className="text-text-dim text-lg leading-relaxed">
            Whether you're looking for rare collectibles or selling your electronics, AuctionX provides the tools you need to succeed.
          </p>
        </div>

        <div className="relative z-10 bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10">
          <div className="flex gap-1 mb-4">
            {[1, 2, 3, 4, 5].map(i => <ShieldCheck key={i} size={16} className="text-accent" />)}
          </div>
          <p className="text-white text-lg italic mb-6">
            "AuctionX transformed how I sell my vintage watches. The real-time bidding and AI price suggestions are game-changers!"
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-700 overflow-hidden">
              <img src="https://picsum.photos/seed/testimonial/100/100" alt="Avatar" />
            </div>
            <div>
              <p className="text-white font-bold">Vikram Singh</p>
              <p className="text-text-dim text-[10px] uppercase tracking-widest font-bold">Verified Seller</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 md:px-24 lg:px-32 relative">
        <div className="md:hidden absolute top-6 left-6">
          <button onClick={onBack} className="p-2 text-text-dim hover:text-white"><ChevronLeft size={24} /></button>
        </div>

        <div className="max-w-md w-full mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
              {mode === 'login' ? 'Welcome back' : 'Create an account'}
            </h1>
            <p className="text-text-dim">
              {mode === 'login' 
                ? 'Enter your credentials to access your account' 
                : 'Join thousands of buyers and sellers today'}
            </p>
          </div>

          {/* Tab Switch */}
          <div className="flex p-1 bg-surface rounded-2xl mb-8 border border-white/5">
            <button 
              onClick={() => setMode('login')}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${mode === 'login' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-text-dim hover:text-white'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setMode('register')}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${mode === 'register' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-text-dim hover:text-white'}`}
            >
              Register
            </button>
          </div>

          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onLogin(role); }}>
            <AnimatePresence mode="wait">
              {mode === 'register' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" size={18} />
                      <input 
                        type="text" 
                        placeholder="John Doe"
                        className="w-full pl-12 pr-4 py-4 bg-surface border border-white/5 rounded-2xl text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest ml-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" size={18} />
                      <input 
                        type="tel" 
                        placeholder="+91 98765 43210"
                        className="w-full pl-12 pr-4 py-4 bg-surface border border-white/5 rounded-2xl text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" size={18} />
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-surface border border-white/5 rounded-2xl text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" size={18} />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-surface border border-white/5 rounded-2xl text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-dim hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {mode === 'register' && (
              <div className="space-y-4 pt-2">
                <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest ml-1">I want to...</label>
                <div className="flex gap-3">
                  {[
                    { id: 'buyer', label: 'Buy' },
                    { id: 'seller', label: 'Sell' },
                    { id: 'both', label: 'Both' }
                  ].map(r => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRole(r.id as any)}
                      className={`flex-1 py-3 text-xs font-bold rounded-xl border transition-all ${role === r.id ? 'border-primary bg-primary/10 text-primary' : 'border-white/5 bg-surface text-text-dim hover:border-white/20'}`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {mode === 'login' && (
              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-surface text-primary focus:ring-primary" />
                  <span className="text-xs text-text-dim group-hover:text-white transition-colors">Remember me</span>
                </label>
                <a href="#" className="text-xs font-bold text-primary hover:underline">Forgot password?</a>
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:bg-primary/90 hover:scale-[1.01] active:scale-[0.99] transition-all mt-4 uppercase tracking-widest text-sm"
            >
              {mode === 'login' ? 'Login' : 'Create Account'}
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold"><span className="bg-bg px-4 text-text-dim">Or continue with</span></div>
            </div>

            <button 
              type="button"
              className="w-full flex items-center justify-center gap-3 py-4 bg-surface border border-white/5 rounded-2xl font-bold text-white hover:bg-surface-lighter transition-all"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Google
            </button>
          </form>

          <p className="text-center text-xs text-text-dim mt-10">
            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="ml-2 font-bold text-primary hover:underline"
            >
              {mode === 'login' ? 'Register now' : 'Login here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
