import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marketplace from './components/Marketplace';
import ProjectPlanner from './components/ProjectPlanner';

const PlaceholderPage = ({ title }) => (
  <div className="w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-20 z-10 relative">
    <div className="glass p-12 rounded-2xl border border-neoBorder text-center max-w-2xl">
      <h2 className="text-4xl font-bold mb-4">{title}</h2>
      <p className="text-white/60">This section is currently under construction in the NeoLab. Check back later!</p>
    </div>
  </div>
);

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
            <Route path="/toolkit" element={<PlaceholderPage title="Toolkit 🛠️" />} />
            <Route path="/progress" element={<PlaceholderPage title="My Progress 📈" />} />
            <Route path="/about" element={<PlaceholderPage title="About ℹ️" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
