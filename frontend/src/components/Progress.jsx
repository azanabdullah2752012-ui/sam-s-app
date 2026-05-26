import React from 'react';
import Scroll3DWrapper from './Scroll3DWrapper';

const Progress = ({ coinBalance }) => {
  // Mock data for levels
  const currentLevel = 4;
  const nextLevelCost = 300;
  const progressPercent = Math.min(100, (coinBalance / nextLevelCost) * 100);

  const achievements = [
    { id: 1, title: 'First Build', desc: 'Completed your very first upcycling project.', icon: '🏆', unlocked: true },
    { id: 2, title: 'Plastic Savior', desc: 'Upcycled 10 plastic bottles.', icon: '🧴', unlocked: true },
    { id: 3, title: 'Cardboard Architect', desc: 'Used over 20 cardboard boxes.', icon: '📦', unlocked: false },
    { id: 4, title: 'Marketplace Whale', desc: 'Bought 3 premium blueprints.', icon: '🛒', unlocked: false },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-32 pb-32 z-10 relative overflow-hidden">
      
      {/* Header */}
      <Scroll3DWrapper className="text-center mb-16 max-w-3xl px-4">
        <h2 className="text-5xl font-bold mb-6 tracking-tight text-white">Your Eco Journey 🚀</h2>
        <p className="text-lg text-white/60 leading-relaxed">
          Track your impact on the planet. Every project you build keeps waste out of the landfill. Level up your maker skills to unlock exclusive community perks.
        </p>
      </Scroll3DWrapper>

      {/* Main Stats Card */}
      <Scroll3DWrapper className="w-full max-w-4xl px-4 mb-16">
        <div className="glass p-10 rounded-3xl border border-neoBorder hover-lift relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-neoAccent/5 blur-3xl rounded-full"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
            {/* Level Info */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-neoAccent mb-2">Maker Level {currentLevel}</h3>
              <p className="text-4xl font-bold text-white mb-6">Master Upcycler</p>
              
              <div className="w-full bg-black/40 h-4 rounded-full overflow-hidden mb-2 border border-white/10">
                <div 
                  className="bg-button-gradient h-full rounded-full relative"
                  style={{ width: `${progressPercent}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 w-full animate-pulse"></div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-white/50">
                <span>{coinBalance} NeoCoins</span>
                <span>{nextLevelCost} to Level 5</span>
              </div>
            </div>

            {/* Impact Stats */}
            <div className="flex-1 grid grid-cols-2 gap-4 w-full">
              <div className="bg-[rgba(20,9,30,0.5)] p-6 rounded-2xl border border-white/5 text-center">
                <span className="text-3xl block mb-2">🗑️</span>
                <p className="text-2xl font-bold text-white">12 lbs</p>
                <p className="text-xs text-white/40 uppercase tracking-wider">Waste Saved</p>
              </div>
              <div className="bg-[rgba(20,9,30,0.5)] p-6 rounded-2xl border border-white/5 text-center">
                <span className="text-3xl block mb-2">🔥</span>
                <p className="text-2xl font-bold text-white">4 Days</p>
                <p className="text-xs text-white/40 uppercase tracking-wider">Build Streak</p>
              </div>
            </div>
          </div>
        </div>
      </Scroll3DWrapper>

      {/* Achievements Gallery */}
      <Scroll3DWrapper className="w-full max-w-5xl px-4">
        <h3 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
          <span className="text-neoAccent">✧</span> Unlockable Achievements
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((ach, index) => (
            <div 
              key={ach.id} 
              className={`glass p-6 rounded-2xl border ${ach.unlocked ? 'border-neoAccent/50 bg-neoAccent/5' : 'border-white/5 opacity-60'} hover-lift flex flex-col items-center text-center delay-${(index + 1) * 100}`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 ${ach.unlocked ? 'bg-neoAccent/20 shadow-[0_0_15px_rgba(202,156,225,0.4)]' : 'bg-black/40 grayscale'}`}>
                {ach.icon}
              </div>
              <h4 className="font-bold text-lg mb-2 text-white">{ach.title}</h4>
              <p className="text-xs text-white/60 leading-relaxed mb-4">{ach.desc}</p>
              
              <div className="mt-auto">
                {ach.unlocked ? (
                  <span className="text-[10px] uppercase tracking-wider font-bold text-neoAccent bg-neoAccent/10 px-3 py-1 rounded-full">Unlocked</span>
                ) : (
                  <span className="text-[10px] uppercase tracking-wider font-bold text-white/40 bg-black/40 px-3 py-1 rounded-full">Locked</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Scroll3DWrapper>

    </div>
  );
};

export default Progress;
