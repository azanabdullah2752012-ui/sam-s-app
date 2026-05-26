import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marketplace from './components/Marketplace';
import ProjectPlanner from './components/ProjectPlanner';
import Toolkit from './components/Toolkit';
import Progress from './components/Progress';
import About from './components/About';

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
            <Route path="/toolkit" element={<Toolkit />} />
            <Route path="/progress" element={<Progress coinBalance={coinBalance} />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
