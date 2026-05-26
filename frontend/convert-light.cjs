const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');

const replacements = [
  { regex: /text-white\/60/g, replacement: 'text-gray-500' },
  { regex: /text-white\/40/g, replacement: 'text-gray-400' },
  { regex: /text-white\/70/g, replacement: 'text-gray-600' },
  { regex: /text-white\/80/g, replacement: 'text-gray-700' },
  { regex: /text-white\/90/g, replacement: 'text-gray-800' },
  { regex: /text-white/g, replacement: 'text-gray-900' },
  { regex: /from-white/g, replacement: 'from-gray-900' },
  { regex: /to-white\/60/g, replacement: 'to-gray-600' },
  { regex: /bg-\[rgba\(20,9,30,0\.5\)\]/g, replacement: 'bg-white/40' },
  { regex: /bg-\[rgba\(20,9,30,0\.4\)\]/g, replacement: 'bg-white/30' },
  { regex: /bg-\[rgba\(20,9,30,0\.6\)\]/g, replacement: 'bg-white/50' },
  { regex: /border-neoBorder/g, replacement: 'border-neoBorder' }, // neoBorder is now light
  { regex: /bg-white\/5/g, replacement: 'bg-black/5' },
  { regex: /bg-white\/10/g, replacement: 'bg-black/10' },
  { regex: /hover:bg-white\/10/g, replacement: 'hover:bg-black/10' },
  { regex: /hover:bg-white\/5/g, replacement: 'hover:bg-black/5' },
  { regex: /border-white\/10/g, replacement: 'border-black/10' },
  { regex: /border-white\/20/g, replacement: 'border-black/20' },
  { regex: /bg-white\/20/g, replacement: 'bg-black/20' }
];

function processDirectory(directory) {
  fs.readdirSync(directory).forEach(file => {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      replacements.forEach(({ regex, replacement }) => {
        content = content.replace(regex, replacement);
      });

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${file}`);
      }
    }
  });
}

processDirectory(componentsDir);
console.log('Conversion complete!');
