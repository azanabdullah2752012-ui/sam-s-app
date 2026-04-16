import { CreateMLCEngine } from "https://esm.run/@mlc-ai/web-llm";

// ─── Magic Vision Engine (AI ONLY FOR REVIEW) ───────────────────────
let engine = null;
const modelId = "Llama-3.2-3B-Vision-Instruct-q4f16_1-MLC"; 

async function initEngine() {
  if (engine) return engine;
  const progressContainer = document.getElementById("webllmProgress");
  const progressText = document.getElementById("aiStatus");
  const progressFill = document.getElementById("webllmFill");

  if (progressContainer) progressContainer.style.display = "block";

  const initProgressCallback = (initProgress) => {
    if (progressText) progressText.textContent = `Waking up the Magic Brain... ${Math.round(initProgress.progress * 100)}%`;
    if (progressFill) progressFill.style.width = Math.round(initProgress.progress * 100) + "%";
  };

  try {
    engine = await CreateMLCEngine(modelId, { initProgressCallback });
    if (progressText) progressText.textContent = "AI Helper Ready! ⭐";
    // Enable review button now that engine is ready
    document.getElementById("reviewBtn").disabled = false;
  } catch (err) {
    if (progressText) progressText.textContent = "Oops! AI is resting. Refresh!";
  }
  return engine;
}

const storageKey = "eco-workshop-fun-state-v4";

// ─── Curated Project Library (PRACTICAL & INSTANT) ──────────────────
const PROJECT_LIBRARY = {
  "cardboard-storage": [
    { title: "Desk Organizer 📁", description: "Keep your pens and papers neat!", materials: ["Box lids", "Tape", "Scissors"], steps: ["Cut dividers", "Tape them inside", "Paint it!"] },
    { title: "Shoe Rack 👟", description: "Stack your kicks in style.", materials: ["Large boxes", "Glue gun"], steps: ["Stack boxes", "Glue triangles", "Arrange shoes"] }
  ],
  "cardboard-decor": [
    { title: "Magic TV Box 📺", description: "Put on your own TV show!", materials: ["Large box", "Saran wrap"], steps: ["Cut screen hole", "Add knobs", "Jump inside!"] },
    { title: "Wall Art 🖼️", description: "Make a 3D cardboard picture.", materials: ["Scraps", "Glue"], steps: ["Draw shapes", "Layer them up", "Colors!"] }
  ],
  "cardboard-garden": [
    { title: "Seed Starter 🌱", description: "Grow tiny plants in boxes.", materials: ["Small boxes", "Dirt"], steps: ["Poke tiny holes", "Fill with soil", "Plant a seed"] }
  ],
  "cardboard-fashion": [
    { title: "Knight Armor 🛡️", description: "The ultimate cardboard shield.", materials: ["Box flabs", "String"], steps: ["Cut shield shape", "Add handle", "Engrave a crest"] }
  ],
  "plastic-bottle-storage": [
    { title: "Piggy Bank 🐷", description: "Save your coins in a bottle.", materials: ["Plastic bottle", "Pink paint"], steps: ["Cut coin slot", "Add paper ears", "Add 4 legs"] }
  ],
  "plastic-bottle-decor": [
    { title: "Light-Up Fairy Jar ✨", description: "Glowing bottle magic.", materials: ["Clean bottle", "Fairy lights"], steps: ["Dry bottle well", "Insert lights", "Add stickers"] }
  ],
  "plastic-bottle-garden": [
    { title: "Self-Watering Garden 💧", description: "Water once, grow forever!", materials: ["Plastic bottle", "String", "Soil"], steps: ["Cut bottle in half", "Add string to top", "Invert top into bottom"] }
  ],
  "plastic-bottle-fashion": [
    { title: "Bottle Jewelery 💍", description: "Make rings from bottle caps.", materials: ["Caps", "Glue", "Ribbon"], steps: ["Clean caps", "Glue to ribbon", "Wear it!"] }
  ],
  "old-fabric-storage": [
    { title: "Soft Storage Basket 🧺", description: "Made from an old t-shirt.", materials: ["Old Shirt", "Needle"], steps: ["Cut into strips", "Braid the strips", "Coil and sew"] }
  ],
  "old-fabric-decor": [
    { title: "Pillow Friend ☁️", description: "Turn a sock into a buddy.", materials: ["Old sock", "Stuffing"], steps: ["Fill the sock", "Tie the top", "Add button eyes"] }
  ],
  "old-fabric-garden": [
    { title: "Hanging Herb Pocket 🌱", description: "Plants on your wall!", materials: ["Jeans scrap", "Nails"], steps: ["Sew a pocket", "Add soil", "Hang on a hook"] }
  ],
  "old-fabric-fashion": [
    { title: "T-Shirt Tote Bag 🛍️", description: "No sewing needed!", materials: ["Old T-Shirt", "Scissors"], steps: ["Cut off sleeves", "Fringe the bottom", "Tie knots!"] }
  ],
  "glass-jar-storage": [
    { title: "Rainbow Pencil Pot ✏️", description: "Desk storage that shines.", materials: ["Clean jar", "Acrylic paint"], steps: ["Paint patterns", "Let it dry", "Fill with pens"] }
  ],
  "glass-jar-decor": [
    { title: "Nature Lantern 🕯️", description: "The forest in a jar.", materials: ["Jar", "Leaves", "Glue"], steps: ["Glue leaves outside", "Add a battery candle", "Watch it glow"] }
  ],
  "glass-jar-garden": [
    { title: "Tiny Terrarium 🌲", description: "A mini forest in a jar.", materials: ["Glass Jar", "Moss", "Dirt"], steps: ["Add pebbles", "Add dirt", "Plant your moss"] }
  ],
  "glass-jar-fashion": [
    { title: "Glitter Amulet ✨", description: "Jar of pure luck.", materials: ["Small vial/jar", "Glitter"], steps: ["Fill with color", "Seal the lid", "Wear on string"] }
  ],
  "tin-can-storage": [
    { title: "Office Caddy 📎", description: "Industrial desk help.", materials: ["Tin can", "Magnets"], steps: ["Wrap in paper", "Glue magnets", "Stick to fridge!"] }
  ],
  "tin-can-decor": [
    { title: "Robot Friend 🤖", description: "Art from old cans.", materials: ["Cans", "Nuts/Bolts"], steps: ["Clean cans", "Glue legs/arms", "Draw a face"] }
  ],
  "tin-can-garden": [
    { title: "Tin Planter 🪴", description: "Simple garden home.", materials: ["Tin can", "Hammer", "Nail"], steps: ["Poke drainage holes", "Decorate", "Add your plant"] }
  ],
  "tin-can-fashion": [
    { title: "Sound Cuffs 👂", description: "Communication cups.", materials: ["Cans", "String"], steps: ["Poke hole in bottoms", "Add string", "Talk to a friend!"] }
  ]
};

const templates = [
  { id: "planner", name: "Project Planner 📝", category: "Plan", price: 10, type: "interactive", default: { title: "Your Maker Plan", materials: ["Paper", "Colored Chips"], steps: ["Imagine", "Build"] } },
  { id: "checklist", name: "Stuff You Need 📦", category: "Maker Stuff", price: 5, type: "interactive", default: { title: "Stuff Finder", items: ["Look for boxes", "Clean the jars", "Find the glue"] } }
];

const state = loadState();

const elements = {
  coinCount: document.getElementById("coinCount"),
  streakCount: document.getElementById("streakCount"),
  imageInput: document.getElementById("imageInput"),
  aiInput: document.getElementById("aiInput"),
  materialType: document.getElementById("materialType"),
  projectGoal: document.getElementById("projectGoal"),
  ideas: document.getElementById("ideas"),
  resultsSection: document.getElementById("resultsSection"),
  marketGrid: document.getElementById("marketGrid"),
  generateBtn: document.getElementById("generateBtn"),
  reviewBtn: document.getElementById("reviewBtn"),
  reviewResult: document.getElementById("reviewResult"),
  aiStatus: document.getElementById("aiStatus"),
  tutorialModal: document.getElementById("tutorialModal"),
  tutorialTitle: document.getElementById("tutorialTitle"),
  closeModalBtn: document.getElementById("closeModalBtn"),
  tutorialContent: document.getElementById("tutorialContent"),
  materialPreview: document.getElementById("materialPreview")
};

init();

function init() {
  updateDashboard();
  renderIdeasEmpty();
  renderMarketplace();

  if (elements.generateBtn) {
    elements.generateBtn.disabled = false;
    elements.generateBtn.addEventListener("click", generateIdeas);
  }
  
  if (elements.reviewBtn) {
    elements.reviewBtn.addEventListener("click", handleReviewClick);
  }

  if (elements.closeModalBtn) elements.closeModalBtn.addEventListener("click", () => elements.tutorialModal.close());
  elements.imageInput?.addEventListener("change", (e) => renderPreview(e.target, elements.materialPreview));
}

// ─── Instant Curated Idea Generation ──────────────────────────────────────
function generateIdeas() {
  const mat = elements.materialType.value;
  const goal = elements.projectGoal.value;
  const search = elements.aiInput.value.toLowerCase();
  
  const key = `${mat}-${goal}`;
  let ideas = PROJECT_LIBRARY[key] || [];

  // Local Search Filter
  if (search) {
    ideas = ideas.filter(p => p.title.toLowerCase().includes(search) || p.description.toLowerCase().includes(search));
  }

  renderExpertPlans(ideas);
  elements.resultsSection.style.display = "block";
  elements.resultsSection.scrollIntoView({ behavior: 'smooth' });
}

function renderExpertPlans(plans) {
  if (plans.length === 0) {
    elements.ideas.innerHTML = `<p style="grid-column: 1/-1; text-align:center; opacity:0.5; padding: 60px;">No exact matches for "${elements.aiInput.value}". Try another word!</p>`;
    return;
  }
  elements.ideas.innerHTML = plans.map(plan => `
    <article class="course-card" onclick="window.openPlanner(${JSON.stringify(plan).replace(/"/g, '&quot;')})">
      <div class="card-img-wrap">
        <img src="https://picsum.photos/seed/${plan.title}/600/400" alt="plan">
      </div>
      <div class="card-content">
        <h4 style="font-family:'Fredoka'; font-size:1.4rem; margin:0 0 8px;">${escHtml(plan.title)}</h4>
        <p>${escHtml(plan.description)}</p>
      </div>
    </article>
  `).join("");
}

// ─── AI Only for Review ──────────────────────────────────────────────────
async function handleReviewClick() {
  const file = elements.imageInput.files[0];
  if (!file) {
    alert("Snap or upload a photo first! 📸");
    return;
  }

  // Wake up brain ONLY now
  elements.reviewResult.style.display = "block";
  elements.reviewResult.innerHTML = "<div class='modal-loader'><div class='spinner'></div> <p>Checking out your magic work... ⭐</p></div>";
  
  const aiEngine = await initEngine();
  if (!aiEngine) return;

  try {
    const dataUrl = await fileToDataUrl(file);
    const prompt = [
      { type: "text", text: "You are a friendly teacher. Look at this kid's project. Tell them: 1. What you see; 2. Why it's awesome; 3. One tip; 4. Star Rating (1-10)." },
      { type: "image_url", image_url: { url: dataUrl } }
    ];

    const messages = [{ role: "user", content: prompt }];
    const reply = await aiEngine.chat.completions.create({ messages });
    const content = reply.choices[0].message.content;

    elements.reviewResult.innerHTML = `
      <div class="expert-feedback-box">
        <h3>Expert AI Review! ⭐</h3>
        <div style="font-size:1.1rem; line-height:1.6; color:#636e72;">${content.replace(/\n/g, '<br>')}</div>
      </div>
    `;
    elements.reviewResult.scrollIntoView({ behavior: 'smooth' });
  } catch (e) {
    elements.reviewResult.innerHTML = "Oops! Brain had a glitch. Try again!";
  }
}

// ─── Shared Logic ────────────────────────────────────────────────────────
window.openPlanner = function(plan) {
  elements.tutorialTitle.textContent = plan.title;
  elements.tutorialModal.showModal();
  const projectId = `project-${plan.title.replace(/\s+/g, '-').toLowerCase()}`;
  const saved = state.progress[projectId] || { materials: [], steps: [] };

  const matsHtml = plan.materials ? `<h3 style="font-family:'Fredoka'; color:#4ea8de; margin-top:24px;">Stuff You Need 📦</h3>` + plan.materials.map((m, i) => `<div class="planner-item"><input type="checkbox" ${saved.materials.includes(i) ? 'checked' : ''} onchange="window.saveProgress('${projectId}', 'materials', ${i}, this.checked)"><label>${escHtml(m)}</label></div>`).join('') : '';
  const stepsHtml = plan.steps ? `<h3 style="font-family:'Fredoka'; color:#4ea8de; margin-top:24px;">Step-by-Step ✅</h3>` + plan.steps.map((s, i) => `<div class="planner-item"><input type="checkbox" ${saved.steps.includes(i) ? 'checked' : ''} onchange="window.saveProgress('${projectId}', 'steps', ${i}, this.checked)"><label>${escHtml(s)}</label></div>`).join('') : '';
  elements.tutorialContent.innerHTML = matsHtml + stepsHtml;
}

window.saveProgress = function(pid, type, index, checked) {
  if (!state.progress[pid]) state.progress[pid] = { materials: [], steps: [] };
  const list = state.progress[pid][type];
  if (checked) { if (!list.includes(index)) list.push(index); }
  else { state.progress[pid][type] = list.filter(i => i !== index); }
  saveState();
}

window.accessToolkit = function(tid) {
  const t = templates.find(item => item.id === tid);
  if (!t) return;
  window.openPlanner({ title: t.name, materials: t.default.materials, steps: t.default.steps });
}

function fileToDataUrl(file) { return new Promise((r, j) => { const reader = new FileReader(); reader.onload = () => r(reader.result); reader.onerror = j; reader.readAsDataURL(file); }); }
function loadState() { return JSON.parse(localStorage.getItem(storageKey)) || { coins: 150, streak: 7, progress: {} }; }
function saveState() { localStorage.setItem(storageKey, JSON.stringify(state)); }
function updateDashboard() { elements.coinCount.textContent = state.coins; elements.streakCount.textContent = `${state.streak}-day`; }
function renderIdeasEmpty() { if (elements.ideas) elements.ideas.innerHTML = '<p style="grid-column: 1/-1; text-align:center; opacity:0.5; padding: 60px; font-family:Fredoka;">Pick your stuff to see curated projects! 💡</p>'; }
function renderMarketplace() { if (!elements.marketGrid) return; elements.marketGrid.innerHTML = templates.map(t => `<div class="tool-panel"><strong style="display:block; font-family:'Fredoka'; font-size:1.3rem; margin-bottom:8px;">${t.name}</strong><span style="color:#636e72;">${t.category}</span><button class="pill-btn secondary-btn" style="margin-top:16px; width:100%; font-size:1rem;" onclick="window.accessToolkit('${t.id}')">Open Tool! 🧰</button></div>`).join(""); }
function renderPreview(input, container) { if (input.files && input.files[0]) { const reader = new FileReader(); reader.onload = (e) => { container.innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-width:100%; border-radius:20px; box-shadow:0 10px 30px rgba(0,0,0,0.1); margin-top:32px;">`; }; reader.readAsDataURL(input.files[0]); } }
function escHtml(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
