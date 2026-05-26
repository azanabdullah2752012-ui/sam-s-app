export default function MyProgress() {
  // TODO: Replace with real user/project data
  const purchasedProjects = [
    { title: 'Bottle Bird Feeder', completed: true },
    { title: 'Tin Can Lantern', completed: false },
  ];
  return (
    <div className="glass p-8 mt-8 max-w-lg mx-auto">
      <h2 className="text-2xl mb-4">My Progress</h2>
      <ul className="flex flex-col gap-4">
        {purchasedProjects.map((proj, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className={proj.completed ? 'text-green-400' : 'text-yellow-400'}>
              {proj.completed ? '✔' : '⏳'}
            </span>
            <span className={proj.completed ? 'line-through text-gray-400' : ''}>{proj.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
