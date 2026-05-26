import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Marketplace() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO: Replace with real API call
    setProjects([
      { _id: '1', title: 'Bottle Bird Feeder', cost: 10, materials: ['Plastic Bottle', 'String'], steps: ['Cut bottle', 'Attach string'] },
      { _id: '2', title: 'Tin Can Lantern', cost: 15, materials: ['Tin Can', 'Candle'], steps: ['Punch holes', 'Insert candle'] },
    ]);
    setLoading(false);
  }, []);

  return (
    <div className="glass p-8 mt-8 max-w-2xl mx-auto">
      <h2 className="text-2xl mb-4">Community Marketplace</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-400">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project._id} className="glass p-4 flex flex-col gap-2">
            <h3 className="text-lg font-bold text-accentPurple">{project.title}</h3>
            <div className="text-sm text-gray-300">Cost: <span className="font-semibold text-green-400">{project.cost} coins</span></div>
            <div className="text-sm">Materials: {project.materials.join(', ')}</div>
            <div className="text-sm">Steps: {project.steps.length}</div>
            <button className="mt-2 bg-accentPurple text-white py-1 rounded-lg">Purchase</button>
          </div>
        ))}
      </div>
    </div>
  );
}
