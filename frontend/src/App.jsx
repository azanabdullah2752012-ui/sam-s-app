import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marketplace from './components/Marketplace';
import ProjectPlanner from './components/ProjectPlanner';
import Toolkit from './components/Toolkit';
import Progress from './components/Progress';
import About from './components/About';
import Inventory from './components/Inventory';
import R4X from './components/R4X';

const AmbientBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-transparent pointer-events-none">
      {/* 3D Perspective Grid */}
      <div className="absolute inset-0 bg-grid opacity-30 transform perspective-[1000px] rotate-x-60 scale-150 origin-bottom" style={{ transform: 'perspective(1000px) rotateX(60deg) scale(1.5)', transformOrigin: 'bottom' }}></div>

      {/* Floating Plasma Orbs (Keep for extra depth) */}
      <motion.div 
        animate={{ 
          x: [0, 100, -100, 0], 
          y: [0, -50, 50, 0],
          scale: [1, 1.2, 0.8, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-neoAccent/10 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div 
        animate={{ 
          x: [0, -150, 100, 0], 
          y: [0, 100, -100, 0],
          scale: [1, 1.5, 0.9, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] bg-neoBlue/10 rounded-full blur-[150px] pointer-events-none"
      />
    </div>
  );
};

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
    localStorage.setItem('neoCoins', coinBalance.toString());
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

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    document.documentElement.style.setProperty('--mouse-x', `${x}%`);
    document.documentElement.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div 
        className="min-h-screen text-gray-900 selection:bg-neoAccent selection:text-white font-inter relative"
        onMouseMove={handleMouseMove}
      >
        <AmbientBackground />
        
        <div className="relative z-10 w-full flex flex-col min-h-screen">
          <Navbar coinBalance={coinBalance} />
          <main className="w-full flex-grow">
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/assistant" element={<R4X />} />
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
      </div>
    </Router>
  );
}

export default App;
