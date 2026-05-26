import { useState } from 'react';

export default function StuffYouNeed({ materials = [] }) {
  const [checked, setChecked] = useState(Array(materials.length).fill(false));

  const toggle = (i) => {
    const newChecked = [...checked];
    newChecked[i] = !newChecked[i];
    setChecked(newChecked);
  };

  return (
    <div className="glass p-6 mt-8 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Stuff You Need</h2>
      <ul className="flex flex-col gap-2">
        {materials.map((mat, i) => (
          <li key={i} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={checked[i]}
              onChange={() => toggle(i)}
              className="accent-accentPurple"
            />
            <span className={checked[i] ? 'line-through text-gray-400' : ''}>{mat}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
