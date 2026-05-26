import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marketplace from './components/Marketplace';
import ProjectPlanner from './components/ProjectPlanner';

function App() {
  const [coinBalance, setCoinBalance] = useState(150);

  return (
    <Router>
      <div className="min-h-screen text-white selection:bg-neoAccent selection:text-neoBg font-inter">
        <Navbar coinBalance={coinBalance} />
        <main className="w-full">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/marketplace" element={<Marketplace coinBalance={coinBalance} setCoinBalance={setCoinBalance} />} />
            <Route path="/planner" element={<ProjectPlanner />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
