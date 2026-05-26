import React from 'react';

const Progress = ({ coinBalance }) => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-32 pb-20 z-10 relative">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 tracking-tight text-white">My Progress 📈</h2>
        <p className="text-sm text-white/60">Track your journey and achievements in the NeoLab.</p>
      </div>

      <div className="w-full max-w-4xl flex flex-col gap-8">
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass p-6 rounded-2xl border border-neoBorder flex flex-col items-center text-center">
            <span className="text-4xl mb-2">🪙</span>
            <h4 className="text-sm text-white/60 uppercase tracking-widest mb-1">Total Coins</h4>
            <p className="text-3xl font-bold text-neoAccent">{coinBalance}</p>
          </div>
          
          <div className="glass p-6 rounded-2xl border border-neoBorder flex flex-col items-center text-center">
            <span className="text-4xl mb-2">🔥</span>
            <h4 className="text-sm text-white/60 uppercase tracking-widest mb-1">Active Streak</h4>
            <p className="text-3xl font-bold text-orange-400">7 Days</p>
          </div>

          <div className="glass p-6 rounded-2xl border border-neoBorder flex flex-col items-center text-center">
            <span className="text-4xl mb-2">🛠️</span>
            <h4 className="text-sm text-white/60 uppercase tracking-widest mb-1">Builds Finished</h4>
            <p className="text-3xl font-bold text-neoBlue">12</p>
          </div>
        </div>

        {/* Badges Section */}
        <div className="glass p-8 rounded-2xl border border-neoBorder w-full">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-neoAccent">✧</span> Earned Badges
          </h3>
          <div className="flex flex-wrap gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-full bg-[rgba(20,9,30,0.6)] border-2 border-neoAccent flex items-center justify-center shadow-[0_0_15px_rgba(202,156,225,0.4)]">
                <span className="text-3xl">🚀</span>
              </div>
              <span className="text-xs text-white/80 font-medium">First Flight</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-full bg-[rgba(20,9,30,0.6)] border-2 border-neoBlue flex items-center justify-center shadow-[0_0_15px_rgba(169,214,229,0.4)]">
                <span className="text-3xl">📦</span>
              </div>
              <span className="text-xs text-white/80 font-medium">Cardboard Pro</span>
            </div>
            <div className="flex flex-col items-center gap-2 opacity-30 grayscale">
              <div className="w-20 h-20 rounded-full bg-black/40 border-2 border-white/10 flex items-center justify-center">
                <span className="text-3xl">🔒</span>
              </div>
              <span className="text-xs text-white/50 font-medium">Plastic Hero</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Progress;
