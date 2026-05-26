import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ReviewWork from './components/ReviewWork';
import Marketplace from './components/Marketplace';
import ProjectPlanner from './components/ProjectPlanner';

function App() {
  const [coinBalance, setCoinBalance] = useState(150);

  return (
    <Router>
      <div className="min-h-screen bg-darkPurple text-white font-sans selection:bg-accentPurple selection:text-white">
        <Navbar coinBalance={coinBalance} />
        <main className="max-w-6xl mx-auto p-6">
          <Routes>
            <Route path="/" element={<><Hero /><ReviewWork /></>} />
            <Route path="/marketplace" element={<Marketplace coinBalance={coinBalance} setCoinBalance={setCoinBalance} />} />
            <Route path="/planner" element={<ProjectPlanner />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
