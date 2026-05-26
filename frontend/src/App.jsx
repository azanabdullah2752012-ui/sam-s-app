import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marketplace from './components/Marketplace';
import ProjectPlanner from './components/ProjectPlanner';
import Toolkit from './components/Toolkit';
import Progress from './components/Progress';
import About from './components/About';
import Inventory from './components/Inventory';

const PlaceholderPage = ({ title }) => (
  <div className="w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-20 z-10 relative">
    <div className="glass p-12 rounded-2xl border border-neoBorder text-center max-w-2xl">
      <h2 className="text-4xl font-bold mb-4">{title}</h2>
      <p className="text-white/60">This section is currently under construction in the NeoLab. Check back later!</p>
    </div>
  </div>
);

function App() {
  // Global State Initializers (from localStorage or defaults)
  const [coinBalance, setCoinBalance] = useState(() => {
    const saved = localStorage.getItem('neoCoins');
    return saved !== null ? parseInt(saved, 10) : 150;
  });
  
  const [savedProjects, setSavedProjects] = useState(() => {
    const saved = localStorage.getItem('neoSavedProjects');
    return saved !== null ? JSON.parse(saved) : [];
  });
  
  const [purchasedProjects, setPurchasedProjects] = useState(() => {
    const saved = localStorage.getItem('neoPurchasedProjects');
    return saved !== null ? JSON.parse(saved) : [];
  });
  
  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem('neoInventory');
    return saved !== null ? JSON.parse(saved) : [
      { id: 1, name: 'Cardboard Boxes', quantity: 5 },
      { id: 2, name: 'Plastic Bottles', quantity: 2 },
      { id: 3, name: 'Glue Sticks', quantity: 10 }
    ];
  });

  // Sync to localStorage on change
  useEffect(() => {
    localStorage.setItem('neoCoins', coinBalance);
  }, [coinBalance]);

  useEffect(() => {
    localStorage.setItem('neoSavedProjects', JSON.stringify(savedProjects));
  }, [savedProjects]);

  useEffect(() => {
    localStorage.setItem('neoPurchasedProjects', JSON.stringify(purchasedProjects));
  }, [purchasedProjects]);

  useEffect(() => {
    localStorage.setItem('neoInventory', JSON.stringify(inventory));
  }, [inventory]);

  return (
    <Router>
      <div className="min-h-screen text-white selection:bg-neoAccent selection:text-neoBg font-inter">
        <Navbar coinBalance={coinBalance} />
        <main className="w-full">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route 
              path="/marketplace" 
              element={<Marketplace 
                coinBalance={coinBalance} 
                setCoinBalance={setCoinBalance} 
                purchasedProjects={purchasedProjects}
                setPurchasedProjects={setPurchasedProjects}
              />} 
            />
            <Route 
              path="/planner" 
              element={<ProjectPlanner 
                savedProjects={savedProjects}
                setSavedProjects={setSavedProjects}
              />} 
            />
            <Route path="/toolkit" element={<Toolkit />} />
            <Route path="/inventory" element={<Inventory inventory={inventory} setInventory={setInventory} />} />
            <Route path="/progress" element={<Progress coinBalance={coinBalance} />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
