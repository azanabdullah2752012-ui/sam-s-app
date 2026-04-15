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
  aiFeedbackStatus: document.getElementById("aiFeedbackStatus")
};

init();

function init() {
  updateDashboard();
  renderIdeasEmpty();
  renderRatingEmpty();
  renderMarketplace();

  if (elements.generateBtn) elements.generateBtn.addEventListener("click", generateIdeas);
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
    btn.textContent = btn.dataset.label || "AI REMIX";
    delete btn.dataset.label;
  }
  if (statusEl) statusEl.textContent = active ? message : "";
}

async function generateIdeas() {
  const customQuery = elements.aiInput ? elements.aiInput.value : "";
  setLoading(elements.generateBtn, elements.aiStatus, "⌛ Analyzing...", true);
  renderStaticIdeas();

  try {
    const prompt = buildIdeaPrompt(customQuery || "sustainable fashion", "style");
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
  const variants = ["bg-mint", "bg-blue", "bg-peach", "bg-lavender"];
  const authors = [
    { name: "J. Chen", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=J" },
    { name: "A. Davis", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=A" },
    { name: "E. Lee", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=E" },
    { name: "M. Smith", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=M" }
  ];

  elements.ideas.innerHTML = ideas.map((entry, i) => {
    const variant = variants[i % variants.length];
    const author = authors[i % authors.length];
    const rating = (4.5 + Math.random() * 0.5).toFixed(1);
    return `
      <article class="idea-card ${variant}" onclick="alert('${entry.title} Instructions coming soon!')">
        <div class="card-img" style="background-image: url('https://picsum.photos/seed/${entry.title}/400')"></div>
        <div class="card-info">
          <div>
            <div class="card-title">${escHtml(entry.title)}</div>
            <p class="card-desc">${escHtml(entry.description)}</p>
            <div class="tag-row">
              <span class="pill-tag">${entry.difficulty || "Easy"}</span>
              <span class="pill-tag">${entry.time || "1h"}</span>
            </div>
          </div>
          <div class="card-footer">
            <div class="author">
              <img src="${author.img}">
              <span>${author.name}</span>
            </div>
            <div class="rating">★ ${rating}</div>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function renderStaticIdeas() {
  const library = [
    { title: "Eco-Fabric Sneakers", description: "Mycelium leather + Recycled soles.", difficulty: "Medium", time: "90m" },
    { title: "Regenerative Apparel", description: "Sustainable jacket from organic cotton.", difficulty: "Hard", time: "2h" },
    { title: "Plant-Based Bag", description: "Handbag using Hemp & Pineapple Fiber.", difficulty: "Medium", time: "1h" },
    { title: "Bio Accessory", description: "Watch strap from recycled timber.", difficulty: "Easy", time: "45m" }
  ];
  renderAIIdeas(library, "Static");
}

function renderMarketplace() {
  elements.marketGrid.innerHTML = templates.map(t => `
    <div class="recent-item" style="background-image: url('https://picsum.photos/seed/${t.id}/200')" title="${t.name}"></div>
  `).join("");
}

function buildIdeaPrompt(m, g) {
  return `Generate JSON array of 4 DIY projects for ${m}. Each: {title, description, difficulty, time}. No markdown.`;
}

function loadState() {
  return { coins: 24, projectsRated: 0, streak: 0, lastRatedDate: null, ownedTemplates: [], history: [] };
}

function updateDashboard() {}
function renderIdeasEmpty() {}
function renderRatingEmpty() {}
function escHtml(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }

async function openTutorial(t, m) { alert("Tutorial for " + t); }
