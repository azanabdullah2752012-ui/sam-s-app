import { useState } from 'react';

export default function ProjectPlanner() {
  const [title, setTitle] = useState('');
  const [materials, setMaterials] = useState(['']);
  const [steps, setSteps] = useState(['']);

  const handleMaterialChange = (i, value) => {
    const newMaterials = [...materials];
    newMaterials[i] = value;
    setMaterials(newMaterials);
  };
  const handleStepChange = (i, value) => {
    const newSteps = [...steps];
    newSteps[i] = value;
    setSteps(newSteps);
  };
  const addMaterial = () => setMaterials([...materials, '']);
  const addStep = () => setSteps([...steps, '']);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send to backend
    alert('Project saved!');
  };

  return (
    <div className="glass p-8 mt-8 max-w-lg mx-auto">
      <h2 className="text-2xl mb-4">Project Planner</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="p-2 rounded bg-darkPurple border border-accentPurple text-white"
          required
        />
        <div>
          <div className="font-semibold mb-1">Materials</div>
          {materials.map((mat, i) => (
            <input
              key={i}
              type="text"
              value={mat}
              onChange={e => handleMaterialChange(i, e.target.value)}
              className="p-2 rounded bg-darkPurple border border-accentPurple text-white mb-2 w-full"
              required
            />
          ))}
          <button type="button" onClick={addMaterial} className="text-accentPurple mt-1">+ Add Material</button>
        </div>
        <div>
          <div className="font-semibold mb-1">Steps</div>
          {steps.map((step, i) => (
            <input
              key={i}
              type="text"
              value={step}
              onChange={e => handleStepChange(i, e.target.value)}
              className="p-2 rounded bg-darkPurple border border-accentPurple text-white mb-2 w-full"
              required
            />
          ))}
          <button type="button" onClick={addStep} className="text-accentPurple mt-1">+ Add Step</button>
        </div>
        <button type="submit" className="bg-accentPurple text-white py-2 rounded-lg mt-2">Save Project</button>
      </form>
    </div>
  );
}
