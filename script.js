import { CreateMLCEngine } from "https://esm.run/@mlc-ai/web-llm";

// ─── WebLLM In-Browser AI Engine ──────────────────────────────────────────
let engine = null;

async function initWebLLM() {
  if (engine) return engine;
  
  const progressContainer = document.getElementById("webllmProgress");
  const progressText = document.getElementById("webllmText");
  const progressFill = document.getElementById("webllmFill");

  if (progressContainer) progressContainer.style.display = "block";

  const initProgressCallback = (initProgress) => {
    if (progressText) progressText.textContent = initProgress.text;
    if (progressFill) progressFill.style.width = Math.round(initProgress.progress * 100) + "%";
  };

  engine = await CreateMLCEngine(
    "Llama-3.2-1B-Instruct-q4f16_1-MLC",
    { initProgressCallback }
  );

  if (progressContainer) progressContainer.style.display = "none";
  return engine;
}

const storageKey = "eco-remix-studio-state";

const templates = [
  { id: "toy-storage", name: "Toy Storage Cubes", description: "Stackable bins with labels.", category: "Storage", price: 8 },
  { id: "wall-art", name: "Mosaic Wall Art", description: "Art piece from caps and lids.", category: "Decor", price: 10 },
  { id: "bird-feeder", name: "Bottle Bird Feeder", description: "Weather-friendly feeder plan.", category: "Garden", price: 6 },
  { id: "desk-dock", name: "Desk Dock Organizer", description: "Phone and pen stand from jars.", category: "Workspace", price: 12 }
];

const state = loadState();

const elements = {
  coinCount: document.getElementById("coinCount"),
  streakCount: document.getElementById("streakCount"),
  imageInput: document.getElementById("imageInput"),
  finalInput: document.getElementById("finalInput"),
  aiInput: document.getElementById("aiInput"),
  materialType: document.getElementById("materialType"),
  projectGoal: document.getElementById("projectGoal"),
  materialPreview: document.getElementById("materialPreview"),
  finalPreview: document.getElementById("finalPreview"),
  ideas: document.getElementById("ideas"),
  marketGrid: document.getElementById("marketGrid"),
  generateBtn: document.getElementById("generateBtn"),
  aiStatus: document.getElementById("aiStatus"),
  tutorialModal: document.getElementById("tutorialModal"),
  tutorialTitle: document.getElementById("tutorialTitle"),
  tutorialLoading: document.getElementById("tutorialLoading"),
  tutorialContent: document.getElementById("tutorialContent"),
  closeModalBtn: document.getElementById("closeModalBtn")
};

init();

function init() {
  updateDashboard();
  renderIdeasEmpty();
  renderMarketplace();

  if (elements.generateBtn) elements.generateBtn.addEventListener("click", generateIdeas);
  if (elements.closeModalBtn) elements.closeModalBtn.addEventListener("click", () => elements.tutorialModal.close());

  elements.imageInput?.addEventListener("change", (e) => renderPreview(e.target, elements.materialPreview));
  elements.finalInput?.addEventListener("change", (e) => renderPreview(e.target, elements.finalPreview));
}

async function callWebLLM(prompt, requireJSON = false) {
  const llm = await initWebLLM();
  const messages = [
    { role: "system", content: requireJSON ? "You are a DIY expert. Output ONLY valid JSON array." : "You are a DIY expert." },
    { role: "user", content: prompt }
  ];
  const reply = await llm.chat.completions.create({ messages });
  return reply.choices[0].message.content;
}

function setLoading(btn, statusEl, message, active) {
  if (active) {
    if (!btn.dataset.label) btn.dataset.label = btn.textContent.trim();
    btn.disabled = true;
    btn.textContent = "...";
  } else {
    btn.disabled = false;
    btn.textContent = btn.dataset.label || "AI REMIX ➔";
    delete btn.dataset.label;
  }
  if (statusEl) statusEl.textContent = active ? message : "";
}

async function generateIdeas() {
  const customQuery = elements.aiInput ? elements.aiInput.value : "";
  const material = elements.materialType.value;
  const goal = elements.projectGoal.value;

  setLoading(elements.generateBtn, elements.aiStatus, "⌛ Analyzing Workshop Input...", true);
  renderStaticIdeas(material, goal);

  try {
    const prompt = `You are an eco-DIY expert. Provide 4 ideas for ${material} targeting ${goal}. ${customQuery ? "User preference: " + customQuery : ""}
    Respond with JSON array: [{title, description}]. No markdown.`;
    
    const raw = await callWebLLM(prompt, true);
    const match = raw.match(/\[[\s\S]*\]/);
    if (match) {
      const ideas = JSON.parse(match[0]);
      renderAIIdeas(ideas, material);
      if (window.confetti) confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  } catch (e) { 
    console.error(e); 
    if (elements.aiStatus) elements.aiStatus.textContent = "AI engine error. Showing local presets.";
  } finally { 
    setLoading(elements.generateBtn, null, "", false); 
  }
}

function renderAIIdeas(ideas, material) {
  const authors = [
    { name: "J. Chen", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=J" },
    { name: "A. Davis", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=A" },
    { name: "E. Lee", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=E" },
    { name: "M. Smith", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=M" }
  ];

  elements.ideas.innerHTML = ideas.map((entry, i) => {
    const author = authors[i % authors.length];
    const rating = (4.5 + Math.random() * 0.5).toFixed(1);
    return `
      <article class="course-card" onclick="window.openTutorial('${escHtml(entry.title)}', '${escHtml(material)}')">
        <div class="card-img-wrap">
          <img src="https://picsum.photos/seed/${entry.title}/600/400" alt="${escHtml(entry.title)}">
        </div>
        <div class="card-content">
          <h4>${escHtml(entry.title)}</h4>
          <p>${escHtml(entry.description)}</p>
        </div>
        <div class="card-meta">
          <div class="author-info">
            <img src="${author.img}" alt="user">
            <span>${author.name}</span>
          </div>
          <div class="rating-badge">★ ${rating}</div>
        </div>
      </article>
    `;
  }).join("");
}

window.openTutorial = async function(title, material) {
  elements.tutorialTitle.textContent = title;
  elements.tutorialContent.innerHTML = "";
  elements.tutorialLoading.style.display = "flex";
  elements.tutorialModal.showModal();

  try {
    const prompt = `Expert DIY guide for "${title}" using "${material}". HTML output (h3/p/ul/ol). No markdown fences.`;
    const instructions = await callWebLLM(prompt, false);
    elements.tutorialContent.innerHTML = instructions.replace(/```(?:html)?/gi, "").trim();
  } catch (error) {
    elements.tutorialContent.innerHTML = `<p style="color:red">WebLLM failed to load. Please refresh. Error: ${error.message}</p>`;
  } finally {
    elements.tutorialLoading.style.display = "none";
  }
}

function renderStaticIdeas(material, goal) {
  const library = [
    { title: `${material} ${goal} Concept`, description: `A sustainable way to use ${material} for ${goal.replace("-"," ")} purposes.` },
    { title: `Recycled ${material} Kit`, description: `Step-by-step assembly of ${material} components.` },
    { title: `Modern ${material} Decor`, description: `Aesthetic styling of raw ${material} pieces.` },
    { title: `Functional ${material} Build`, description: `Heavy-duty use logic for repurposed ${material}.` }
  ];
  renderAIIdeas(library, material);
}

function renderMarketplace() {
  if (!elements.marketGrid) return;
  elements.marketGrid.innerHTML = templates.map(t => {
    const owned = state.ownedTemplates.includes(t.id);
    const canAfford = state.coins >= t.price;
    return `
      <div class="market-item-panel">
        <img class="market-thumb" src="https://picsum.photos/seed/${t.id}/100" alt="thumb">
        <div class="market-details">
          <strong>${escHtml(t.name)}</strong>
          <span>${escHtml(t.category)} • ${t.price}c</span>
        </div>
        <button class="unlock-buy-btn" 
                onclick="window.handleMarketAction('${t.id}')"
                ${!owned && !canAfford ? 'disabled' : ''}>
          ${owned ? 'Open' : 'Unlock'}
        </button>
      </div>
    `;
  }).join("");
}

window.handleMarketAction = function(tid) {
  const t = templates.find(item => item.id === tid);
  if (!t) return;
  if (state.ownedTemplates.includes(tid)) {
    window.openTutorial(t.name, t.category);
  } else if (state.coins >= t.price) {
    state.coins -= t.price;
    state.ownedTemplates.push(tid);
    saveState();
    updateDashboard();
    renderMarketplace();
    alert(`Unlocked: ${t.name}!`);
  }
}

function renderPreview(input, container) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      container.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (saved) return saved;
  } catch (e) {}
  return { coins: 100, streak: 5, ownedTemplates: [] };
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function updateDashboard() {
  if (elements.coinCount) elements.coinCount.textContent = state.coins;
  if (elements.streakCount) elements.streakCount.textContent = `${state.streak}-day`;
}

function renderIdeasEmpty() {
  elements.ideas.innerHTML = '<p style="grid-column: 1/-1; text-align:center; opacity:0.5; padding: 60px;">Your creations will appear here.</p>';
}

function escHtml(s) { 
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); 
}
