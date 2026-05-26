import React, { useState } from 'react';

const Marketplace = ({ coinBalance, setCoinBalance }) => {
  const [projects] = useState([
    { _id: '1', title: 'Cardboard Spaceship', cost: 50 },
    { _id: '2', title: 'Plastic Bottle Planter', cost: 20 },
    { _id: '3', title: 'Fabric Tote Bag', cost: 100 },
  ]);
  const [message, setMessage] = useState('');

  const handlePurchase = async (project) => {
    if (coinBalance < project.cost) {
      setMessage(`❌ Insufficient coins for ${project.title}`);
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/marketplace/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'mock-user-id', projectId: project._id })
      });
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Purchase failed');
      
      setCoinBalance(data.newBalance || (coinBalance - project.cost));
      setMessage(`✅ Successfully purchased ${project.title}`);
    } catch (err) {
      setCoinBalance(prev => prev - project.cost);
      setMessage(`✅ Successfully purchased ${project.title} (Local Mock)`);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-32 pb-20 z-10 relative">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 tracking-tight">Community Marketplace 🛒</h2>
        <p className="text-sm text-white/60">Unlock new project blueprints with your coins!</p>
      </div>

      {message && <div className="mb-8 p-4 glass rounded-xl border border-neoBorder text-sm">{message}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {projects.map(project => (
          <div key={project._id} className="glass p-8 rounded-2xl border border-neoBorder flex flex-col items-center hover:bg-neoHover transition-colors">
            <h3 className="text-xl font-bold mb-4">{project.title}</h3>
            <p className="text-sm text-white/60 mb-6">Cost: <span className="text-neoAccent font-bold">{project.cost} Coins</span></p>
            <button 
              onClick={() => handlePurchase(project)}
              className="w-full py-3 bg-button-gradient border border-neoAccent/40 hover:bg-white/5 font-semibold rounded-lg text-sm transition"
            >
              Purchase Project
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
