import React from 'react';
import { useNavigate } from 'react-router-dom';

const Toolkit = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-32 pb-20 z-10 relative">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 tracking-tight text-white">Your Toolkit 🛠️</h2>
        <p className="text-sm text-white/60">All the instruments you need to craft your masterpiece.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        
        {/* Planner Tool */}
        <div className="glass p-8 rounded-2xl border border-neoBorder flex flex-col justify-between hover:bg-neoHover transition-colors h-64 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-neoAccent opacity-10 rounded-bl-full"></div>
          <div>
            <div className="w-12 h-12 rounded-full border border-neoBorder flex items-center justify-center bg-[rgba(20,9,30,0.3)] mb-4">
              <span className="text-xl">📝</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Project Planner</h3>
            <p className="text-xs text-white/60 leading-relaxed">Map out your materials and step-by-step blueprints before building.</p>
          </div>
          <button onClick={() => navigate('/planner')} className="w-full py-2.5 bg-[rgba(20,9,30,0.6)] border border-neoBorder hover:bg-white/10 font-medium rounded-lg text-sm transition mt-4 text-white">
            Launch Planner
          </button>
        </div>

        {/* Inventory Tool */}
        <div className="glass p-8 rounded-2xl border border-neoBorder flex flex-col justify-between hover:bg-neoHover transition-colors h-64 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-neoBlue opacity-10 rounded-bl-full"></div>
          <div>
            <div className="w-12 h-12 rounded-full border border-neoBorder flex items-center justify-center bg-[rgba(20,9,30,0.3)] mb-4">
              <span className="text-xl">📦</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Maker Inventory</h3>
            <p className="text-xs text-white/60 leading-relaxed">Keep track of the cardboard, plastic, and fabric you have in stock.</p>
          </div>
          <button onClick={() => navigate('/inventory')} className="w-full py-2.5 bg-[rgba(20,9,30,0.6)] border border-neoBorder hover:bg-white/10 font-medium rounded-lg text-sm transition mt-4 text-white">
            Open Inventory
          </button>
        </div>

        {/* AI Scanner Tool */}
        <div className="glass p-8 rounded-2xl border border-neoBorder flex flex-col justify-between hover:bg-neoHover transition-colors h-64 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-5 rounded-bl-full"></div>
          <div>
            <div className="w-12 h-12 rounded-full border border-neoBorder flex items-center justify-center bg-[rgba(20,9,30,0.3)] mb-4">
              <span className="text-xl">🤖</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Magic Brain Scanner</h3>
            <p className="text-xs text-white/60 leading-relaxed">Have our AI teacher review your finished builds and award stars.</p>
          </div>
          <button onClick={() => navigate('/')} className="w-full py-2.5 bg-review-gradient border border-neoBorder hover:opacity-80 font-medium rounded-lg text-sm transition mt-4 text-white">
            Open Scanner
          </button>
        </div>

      </div>
    </div>
  );
};

export default Toolkit;
