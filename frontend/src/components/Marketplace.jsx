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
      setMessage(`✅ ${data.message || 'Successfully purchased ' + project.title}`);
    } catch (err) {
      // Fallback for when backend is offline/mock mode
      setCoinBalance(prev => prev - project.cost);
      setMessage(`✅ Successfully purchased ${project.title} (Local Mock)`);
    }
  };

  return (
    <div className="animate-fade-in mt-12">
      <h2 className="text-4xl font-bold mb-8">Community Marketplace 🛒</h2>
      {message && <div className="mb-6 p-4 bg-lightPurple/50 rounded-xl border border-accentPurple">{message}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(project => (
          <div key={project._id} className="bg-lightPurple/30 backdrop-blur-md p-8 rounded-3xl border border-lightPurple shadow-lg hover:shadow-glow transition hover:-translate-y-2">
            <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
            <p className="text-gray-300 mb-8">Cost: <span className="text-accentPurple font-bold">{project.cost} Coins</span></p>
            <button 
              onClick={() => handlePurchase(project)}
              className="w-full py-4 border border-accentPurple text-accentPurple hover:bg-accentPurple hover:text-darkPurple font-semibold rounded-full transition"
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
