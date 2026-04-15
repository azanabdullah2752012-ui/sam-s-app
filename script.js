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
  { id: "sneakers", name: "Eco Sneakers", description: "Recycled sole footwear.", category: "Fashion", price: 8 },
  { id: "jacket", name: "Bio Jacket", description: "Mycelium leather coat.", category: "Apparel", price: 10 },
  { id: "bag", name: "Hemp Tote", description: "Fibrous sustainable bag.", category: "Accessory", price: 6 },
  { id: "watch", name: "Wood Watch", description: "Recycled timber timepiece.", category: "Accessory", price: 12 }
];

const state = loadState();

const elements = {
  coinCount: document.getElementById("coinCount"),
  projectCount: document.getElementById("projectCount"),
  streakCount: document.getElementById("streakCount"),
  favoriteCategory: document.getElementById("favoriteCategory"),
  lastScore: document.getElementById("lastScore"),
  ownedTemplates: document.getElementById("ownedTemplates"),
  imageInput: document.getElementById("imageInput"),
  finalInput: document.getElementById("finalInput"),
  aiInput: document.getElementById("aiInput"),
  materialType: document.getElementById("materialType"),
  projectGoal: document.getElementById("projectGoal"),
  materialPreview: document.getElementById("materialPreview"),
  finalPreview: document.getElementById("finalPreview"),
  ideas: document.getElementById("ideas"),
  rating: document.getElementById("rating"),
  marketGrid: document.getElementById("marketGrid"),
  generateBtn: document.getElementById("generateBtn"),
  rateBtn: document.getElementById("rateBtn"),
  aiStatus: document.getElementById("aiStatus"),
  aiFeedbackStatus: document.getElementById("aiFeedbackStatus"),
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
  renderRatingEmpty();
  renderMarketplace();

  if (elements.generateBtn) elements.generateBtn.addEventListener("click", generateIdeas);
  if (elements.closeModalBtn) elements.closeModalBtn.addEventListener("click", () => elements.tutorialModal.close());
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
    btn.textContent = btn.dataset.label || "Take Remix ➔";
    delete btn.dataset.label;
  }
  if (statusEl) statusEl.textContent = active ? message : "";
}

async function generateIdeas() {
  const customQuery = elements.aiInput ? elements.aiInput.value : "";
  setLoading(elements.generateBtn, elements.aiStatus, "⌛ Analyzing materials...", true);
  renderStaticIdeas();

  try {
    const prompt = buildIdeaPrompt(customQuery || "sustainable design", "eco-friendly");
    const raw = await callWebLLM(prompt, true);
    const match = raw.match(/\[[\s\S]*\]/);
    if (match) {
      const ideas = JSON.parse(match[0]);
      renderAIIdeas(ideas, "Remix");
    }
  } catch (e) { console.error(e); }
  finally { setLoading(elements.generateBtn, null, "", false); }
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

window.openTutorial = async function(title, context) {
  elements.tutorialTitle.textContent = title;
  elements.tutorialContent.innerHTML = "";
  elements.tutorialLoading.style.display = "flex";
  elements.tutorialModal.showModal();

  try {
    const prompt = `Write a clean 5-step tutorial for building "${title}" using "${context}". Output as HTML: <h3>Materials</h3><ul>...</ul> <h3>Steps</h3><ol>...</ol>. No markdown.`;
    const instructions = await callWebLLM(prompt, false);
    elements.tutorialContent.innerHTML = instructions.replace(/```(?:html)?/gi, "").trim();
  } catch (error) {
    elements.tutorialContent.innerHTML = `<p style="color:red">Failed to load: ${error.message}</p>`;
  } finally {
    elements.tutorialLoading.style.display = "none";
  }
}

function renderStaticIdeas() {
  const library = [
    { title: "Eco-Fabric Sneakers", description: "Mycelium leather + Recycled soles. High-end footwear." },
    { title: "Regenerative Jacket", description: "Sustainable apparel from organic cotton." },
    { title: "Plant-Based Tote", description: "Handbag using Hemp & Pineapple Fiber." },
    { title: "Biodegradable Watch", description: "Timepiece from recycled metal and timber." }
  ];
  renderAIIdeas(library, "Sustainable Mix");
}

function renderMarketplace() {
  elements.marketGrid.innerHTML = templates.map(t => `
    <div class="market-item-circle" style="background-image: url('https://picsum.photos/seed/${t.id}/200')" title="${t.name}"></div>
  `).join("");
}

function buildIdeaPrompt(m, g) {
  return `Generate JSON array of 4 projects for ${m}. Each: {title, description}. No markdown.`;
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (saved) return saved;
  } catch (e) { console.error(e); }
  return { coins: 24, projectsRated: 0, streak: 0, lastRatedDate: null, ownedTemplates: [], history: [] };
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function updateDashboard() {
  if (elements.streakCount) elements.streakCount.textContent = `${state.streak}-day`;
  // Add more dash updates if needed
}

function renderIdeasEmpty() {
  elements.ideas.innerHTML = '<p class="muted-text" style="grid-column: 1/-1; text-align:center; padding: 40px;">Select a prompt to see AI ideas.</p>';
}

function renderRatingEmpty() {}

function escHtml(s) { 
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); 
}
