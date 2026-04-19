import { motion } from 'motion/react';
import { Bell, Gavel, Award, AlertCircle, Info, ChevronRight, Check } from 'lucide-react';
import { Notification } from '../types';

export default function NotificationsPage({ notifications, onNavigate }: { notifications: Notification[], onNavigate: (p: string, d?: any) => void }) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'bid': return <Gavel size={20} className="text-primary" />;
      case 'outbid': return <AlertCircle size={20} className="text-danger" />;
      case 'won': return <Award size={20} className="text-success" />;
      default: return <Info size={20} className="text-text-dim" />;
    }
  };

  const getBg = (type: string) => {
    switch (type) {
      case 'bid': return 'bg-primary/10';
      case 'outbid': return 'bg-danger/10';
      case 'won': return 'bg-success/10';
      default: return 'bg-surface';
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-10 pb-20 h-full overflow-y-auto no-scrollbar">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Notifications</h1>
          <p className="text-text-dim">Stay updated with your auction activity.</p>
        </div>
        <button className="flex items-center gap-2 text-xs font-bold text-primary hover:underline uppercase tracking-widest">
          <Check size={16} />
          Mark all as read
        </button>
      </div>

      <div className="space-y-8">
        {['Today', 'Yesterday', 'This Week'].map(group => {
          const groupNotifications = notifications.filter(n => {
            if (group === 'Today') return n.timestamp.includes('min') || n.timestamp === 'Today';
            if (group === 'Yesterday') return n.timestamp === 'Yesterday';
            return n.timestamp.includes('week') || n.timestamp.includes('hour');
          });

          if (groupNotifications.length === 0) return null;

          return (
            <div key={group} className="space-y-4">
              <h2 className="text-[10px] font-bold text-text-dim uppercase tracking-widest ml-1">{group}</h2>
              <div className="space-y-3">
                {groupNotifications.map((n, i) => (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`group p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-5 ${n.isRead ? 'bg-surface border-white/5 hover:border-white/10' : 'bg-primary/5 border-primary/20 hover:bg-primary/10'}`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${getBg(n.type)}`}>
                      {getIcon(n.type)}
                    </div>
                    
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-bold text-sm ${n.isRead ? 'text-white' : 'text-primary'}`}>{n.title}</h3>
                        <span className="text-[9px] font-bold text-text-dim uppercase tracking-widest">{n.timestamp}</span>
                      </div>
                      <p className="text-xs text-text-dim leading-relaxed">{n.description}</p>
                    </div>

                    <div className="flex items-center self-center">
                      {!n.isRead && <div className="w-2 h-2 bg-primary rounded-full mr-4 shadow-[0_0_8px_rgba(26,86,160,0.8)]"></div>}
                      <ChevronRight size={18} className="text-text-dim group-hover:text-white transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {notifications.length === 0 && (
        <div className="py-20 text-center">
          <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-6 text-text-dim border border-white/5">
            <Bell size={32} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">No notifications yet</h3>
          <p className="text-sm text-text-dim">We'll notify you when something important happens.</p>
        </div>
      )}
    </div>
  );
}
