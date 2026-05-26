import React from 'react';

const About = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-32 pb-20 z-10 relative">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 tracking-tight text-white">About NeoLab ℹ️</h2>
        <p className="text-sm text-white/60">Discover the mission behind our universe.</p>
      </div>

      <div className="glass max-w-3xl w-full p-12 rounded-2xl border border-neoBorder relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-neoAccent opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-neoBlue opacity-20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-neoAccent">✧</span> Turning Trash into Treasures
          </h3>
          <p className="text-white/70 leading-relaxed mb-6">
            Eco Remix Studio (NeoLab Edition) is a premium workspace dedicated to helping you transform everyday household recyclables into incredible DIY creations. Whether it's cardboard boxes, plastic bottles, or old fabrics, our Magic Brain AI helps you engineer the perfect blueprints.
          </p>

          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 mt-10">
            <span className="text-neoBlue">✧</span> The Marketplace Economy
          </h3>
          <p className="text-white/70 leading-relaxed">
            By building projects and maintaining your streak, you earn Coins. Use these Coins to unlock premium community-crafted blueprints in the Store. Keep building, keep recycling, and keep creating!
          </p>

          <div className="mt-10 p-6 bg-[rgba(20,9,30,0.5)] rounded-xl border border-neoBorder flex items-center justify-between">
            <div>
              <p className="text-xs text-white/40 uppercase tracking-widest">Version</p>
              <p className="font-bold">v2.0.1 - NeoLab Build</p>
            </div>
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition">
              View Changelog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
