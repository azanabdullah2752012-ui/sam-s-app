
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ScrollToTop from './ScrollToTop.jsx';
import Navbar from './Navbar.jsx';
import ReviewWork from './ReviewWork.jsx';
import Marketplace from './Marketplace.jsx';
import ProjectPlanner from './ProjectPlanner.jsx';
import MyProgress from './MyProgress.jsx';
import About from './About.jsx';


function Home() {
  return (
    <div className="glass p-8 mt-8">
      <h1 className="text-4xl mb-4">Welcome to Eco Remix Studio</h1>
      <p className="text-lg">Turning today’s recycling into tomorrow’s treasures!</p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/review" element={<ReviewWork />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/toolkit" element={<ProjectPlanner />} />
        <Route path="/progress" element={<MyProgress />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

// trailing duplicate export removed
