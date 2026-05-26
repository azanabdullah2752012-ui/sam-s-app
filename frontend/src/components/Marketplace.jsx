import React, { useState } from 'react';

const Marketplace = ({ coinBalance, setCoinBalance }) => {
  const [projects] = useState([
    { _id: '1', title: 'Cardboard Spaceship', cost: 50, color: 'bg-ecoBlue', icon: '🚀' },
    { _id: '2', title: 'Plastic Bottle Planter', cost: 20, color: 'bg-ecoGreen', icon: '🌱' },
    { _id: '3', title: 'Fabric Tote Bag', cost: 100, color: 'bg-ecoPink', icon: '👜' },
    { _id: '4', title: 'Glass Jar Lantern', cost: 40, color: 'bg-ecoYellow', icon: '🏮' },
  ]);
  const [message, setMessage] = useState('');

  const handlePurchase = async (project) => {
    if (coinBalance < project.cost) {
      setMessage(`❌ You need more coins for the ${project.title}!`);
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
      setMessage(`✅ Yay! You bought the ${project.title}!`);
    } catch (err) {
      // Fallback for mock mode
      setCoinBalance(prev => prev - project.cost);
      setMessage(`✅ Yay! You bought the ${project.title}! (Mock)`);
    }
  };

  return (
    <div className="animate-fade-in mt-10">
      <div className="text-center mb-12">
        <h2 className="text-6xl font-bold mb-4 drop-shadow-md text-ecoDark">Project Store 🛒</h2>
        <p className="text-2xl font-medium text-ecoDark/70">Use your coins to unlock awesome new projects!</p>
      </div>

      {message && (
        <div className="mb-10 p-6 bg-white rounded-2xl border-4 border-ecoDark shadow-bouncy text-2xl font-bold text-center">
          {message}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
        {projects.map(project => (
          <div key={project._id} className={`${project.color} p-8 rounded-3xl border-4 border-ecoDark shadow-[0_12px_0_rgba(0,0,0,0.15)] flex flex-col items-center text-center bouncy-hover`}>
            <div className="w-24 h-24 bg-white rounded-full border-4 border-ecoDark flex items-center justify-center text-5xl shadow-bouncy mb-6">
              {project.icon}
            </div>
            <h3 className="text-3xl font-bold mb-4 text-ecoDark">{project.title}</h3>
            
            <div className="bg-white/50 px-6 py-2 rounded-full border-2 border-ecoDark font-bold text-xl mb-8 flex items-center gap-2">
              🪙 {project.cost} Coins
            </div>
            
            <button 
              onClick={() => handlePurchase(project)}
              className="w-full py-4 bg-white border-4 border-ecoDark text-ecoDark text-2xl font-bold rounded-full shadow-bouncy hover:bg-gray-100 transition-colors active:translate-y-2 active:shadow-none"
            >
              Buy Blueprint!
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
