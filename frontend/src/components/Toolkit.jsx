import React from 'react';
import { useNavigate } from 'react-router-dom';
import Scroll3DWrapper from './Scroll3DWrapper';

const Toolkit = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-32 pb-32 z-10 relative overflow-hidden">
      
      <Scroll3DWrapper className="text-center mb-16 max-w-3xl px-4">
        <h2 className="text-5xl font-bold mb-6 tracking-tight">Maker Toolkit 🛠️</h2>
        <p className="text-lg text-white/60 leading-relaxed">
          The central hub for all your upcycling operations. Manage your physical inventory, calculate your environmental impact, and configure your maker profile.
        </p>
      </Scroll3DWrapper>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-4">
        
        {/* Inventory Card */}
        <Scroll3DWrapper>
          <div className="glass p-10 rounded-3xl border border-neoBorder flex flex-col justify-between h-full hover-lift relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-neoAccent/10 rounded-bl-full group-hover:bg-neoAccent/20 transition-colors blur-2xl pointer-events-none"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-full border border-neoBorder flex items-center justify-center bg-[rgba(20,9,30,0.4)] mb-6">
                <span className="text-3xl animate-float">📦</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Maker Inventory</h3>
              <p className="text-sm text-white/60 leading-relaxed mb-8">
                Keep an accurate log of all the recyclable materials you have gathered. Track your cardboard boxes, plastic bottles, fabrics, and adhesives in a centralized digital stockroom.
              </p>
            </div>
            <button onClick={() => navigate('/inventory')} className="w-full py-4 bg-[rgba(20,9,30,0.6)] border border-neoBorder btn-spring font-bold rounded-xl text-sm transition mt-auto text-white relative z-10">
              Open Digital Stockroom
            </button>
          </div>
        </Scroll3DWrapper>

        {/* Impact Calculator Card (Coming Soon) */}
        <Scroll3DWrapper>
          <div className="glass p-10 rounded-3xl border border-neoBorder flex flex-col justify-between h-full hover-lift relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/10 rounded-bl-full group-hover:bg-green-500/20 transition-colors blur-2xl pointer-events-none"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-full border border-neoBorder flex items-center justify-center bg-[rgba(20,9,30,0.4)] mb-6">
                <span className="text-3xl animate-float">🌍</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Impact Calculator</h3>
              <p className="text-sm text-white/60 leading-relaxed mb-8">
                Run advanced algorithms to determine the exact carbon footprint reduction and landfill diversion weight achieved by your completed upcycling projects.
              </p>
            </div>
            <button className="w-full py-4 bg-black/40 border border-white/5 font-bold rounded-xl text-sm mt-auto text-white/40 cursor-not-allowed relative z-10">
              Offline (Coming Soon)
            </button>
          </div>
        </Scroll3DWrapper>

      </div>
    </div>
  );
};

export default Toolkit;
