import { CreateMLCEngine } from "https://esm.run/@mlc-ai/web-llm";

// ─── WebLLM Vision Engine ───────────────────────────────────────────────
let engine = null;
const modelId = "Llama-3.2-3B-Vision-Instruct-q4f16_1-MLC"; // Vision-Capable Model

async function initEngine() {
  if (engine) return engine;
  
  const progressContainer = document.getElementById("webllmProgress");
  const progressText = document.getElementById("webllmText");
  const progressFill = document.getElementById("webllmFill");

  if (progressContainer) progressContainer.style.display = "block";

  const initProgressCallback = (initProgress) => {
    if (progressText) progressText.textContent = initProgress.text;
    if (progressFill) progressFill.style.width = Math.round(initProgress.progress * 100) + "%";
  };

  engine = await CreateMLCEngine(modelId, { initProgressCallback });
  if (progressContainer) progressContainer.style.display = "none";
  return engine;
}

const storageKey = "eco-workshop-pro-state";

// ─── Useful Core Templates ──────────────────────────────────────────────
const templates = [
  { id: "planner", name: "DIY Project Planner", category: "Plan", price: 10, type: "interactive" },
  { id: "checklist", name: "Materials Checklist", category: "Logistics", price: 5, type: "interactive" },
  { id: "tracker", name: "Build Step Tracker", category: "Execution", price: 8, type: "interactive" }
];

const state = loadState();

const elements = {
  coinCount: document.getElementById("coinCount"),
  streakCount: document.getElementById("streakCount"),
  imageInput: document.getElementById("imageInput"),
  aiInput: document.getElementById("aiInput"),
  materialType: document.getElementById("materialType"),
  projectGoal: document.getElementById("projectGoal"),
  materialPreview: document.getElementById("materialPreview"),
  reviewBtn: document.getElementById("reviewBtn"),
  reviewResult: document.getElementById("reviewResult"),
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
  if (elements.reviewBtn) elements.reviewBtn.addEventListener("click", analyzeImage);
  if (elements.closeModalBtn) elements.closeModalBtn.addEventListener("click", () => elements.tutorialModal.close());

  elements.imageInput?.addEventListener("change", (e) => renderPreview(e.target, elements.materialPreview));
}

// ─── Core Feature 1: DIY Idea Generation (Dropdown-Based) ──────────────
async function generateIdeas() {
  const customQuery = elements.aiInput ? elements.aiInput.value : "";
  const material = elements.materialType.value;
  const goal = elements.projectGoal.value;

  setLoading(elements.generateBtn, elements.aiStatus, "⌛ Engineering Expert Plans...", true);

  try {
    const prompt = `You are a Senior Full-Stack DIY Engineer. Based on the material "${material}" and objective "${goal}", generate 4 SPECIFIC, practical DIY projects. 
    ${customQuery ? "User Add-on: " + customQuery : ""}
    Output ONLY a JSON array with objects: {title, description, materials:[], steps:[], difficulty:"Easy/Medium/Hard"}. 
    No conversational text. Instructions must be specific and actionable.`;
    
    const reply = await callEngine(prompt, false, true);
    const match = reply.match(/\[[\s\S]*\]/);
    if (match) {
      const ideas = JSON.parse(match[0]);
      renderExpertPlans(ideas);
      if (window.confetti) confetti({ particleCount: 150, spread: 80 });
    }
  } catch (e) {
    console.error(e);
    elements.aiStatus.textContent = "Engine Linkage Error. Verify GPU support.";
  } finally {
    setLoading(elements.generateBtn, null, "", false);
  }
}

function renderExpertPlans(plans) {
  elements.ideas.innerHTML = plans.map((plan, i) => `
    <article class="course-card" onclick="window.openPlanner(${JSON.stringify(plan).replace(/"/g, '&quot;')})">
      <div class="card-img-wrap">
        <img src="https://picsum.photos/seed/${plan.title}/600/400" alt="plan">
      </div>
      <div class="card-content">
        <span class="difficulty-badge difficulty-${plan.difficulty.toLowerCase()}">${plan.difficulty}</span>
        <h4>${escHtml(plan.title)}</h4>
        <p>${escHtml(plan.description)}</p>
      </div>
    </article>
  `).join("");
}

// ─── Core Feature 2: Image Upload + Review System (Vision) ─────────────
async function analyzeImage() {
  const file = elements.imageInput.files[0];
  if (!file) {
    alert("Please upload a Work-in-Progress photo first.");
    return;
  }

  elements.reviewResult.style.display = "block";
  elements.reviewResult.innerHTML = "<div class='loader'></div> Analyzing build quality...";
  
  try {
    const dataUrl = await fileToDataUrl(file);
    const prompt = [
      { type: "text", text: "Analyze this eco-DIY build. Provide a professional assessment. Output format: 1. Description (what you see); 2. Quality Assessment (neatness, creativity); 3. Improvements (specific tips); 4. Rating (1-10)." },
      { type: "image_url", image_url: { url: dataUrl } }
    ];

    const reply = await callEngine(prompt, true);
    elements.reviewResult.innerHTML = `
      <div class="review-section">
        <span class="review-label">Expert Review Output</span>
        <div class="review-text">${reply.replace(/\n/g, '<br>')}</div>
      </div>
    `;
  } catch (e) {
    console.error(e);
    elements.reviewResult.innerHTML = "Review Analysis Failed. Ensure browser supports WebGPU WebLLM Vision.";
  }
}

// ─── Core Feature 3: Template System (Interactive & Useful) ─────────────
window.openPlanner = function(plan) {
  elements.tutorialTitle.textContent = plan.title;
  elements.tutorialModal.showModal();

  const projectId = `project-${plan.title.replace(/\s+/g, '-').toLowerCase()}`;
  const savedProgress = state.progress[projectId] || { materials: [], steps: [] };

  let html = `
    <h3>Materials Required</h3>
    ${plan.materials.map((m, i) => `
      <div class="planner-item">
        <input type="checkbox" id="m-${i}" ${savedProgress.materials.includes(i) ? 'checked' : ''} onchange="window.saveProgress('${projectId}', 'materials', ${i}, this.checked)">
        <label for="m-${i}">${escHtml(m)}</label>
      </div>
    `).join('')}
    
    <h3>Actionable Steps</h3>
    ${plan.steps.map((s, i) => `
      <div class="planner-item">
        <input type="checkbox" id="s-${i}" ${savedProgress.steps.includes(i) ? 'checked' : ''} onchange="window.saveProgress('${projectId}', 'steps', ${i}, this.checked)">
        <label for="s-${i}">${escHtml(s)}</label>
      </div>
    `).join('')}
  `;

  elements.tutorialContent.innerHTML = html;
}

window.saveProgress = function(pid, type, index, checked) {
  if (!state.progress[pid]) state.progress[pid] = { materials: [], steps: [] };
  const list = state.progress[pid][type];
  if (checked) {
    if (!list.includes(index)) list.push(index);
  } else {
    state.progress[pid][type] = list.filter(i => i !== index);
  }
  saveState();
}

// ─── Engine Helpers ───────────────────────────────────────────────────
async function callEngine(prompt, isVision = false, requireJSON = false) {
  const engine = await initEngine();
  const messages = [
    { role: "system", content: "You are a professional Senior Full-Stack DIY Engineer. Every output must be technical, practical, and highly detailed." },
    { role: "user", content: prompt }
  ];
  const reply = await engine.chat.completions.create({ messages });
  return reply.choices[0].message.content;
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ─── UI & State ──────────────────────────────────────────────────────
function setLoading(btn, statusEl, message, active) {
  if (active) {
    btn.disabled = true;
    btn.textContent = "...";
    if (statusEl) statusEl.textContent = message;
  } else {
    btn.disabled = false;
    btn.textContent = "GENERATE PLAN ➔";
    if (statusEl) statusEl.textContent = "";
  }
}

function renderMarketplace() {
  if (!elements.marketGrid) return;
  elements.marketGrid.innerHTML = templates.map(t => `
    <div class="market-item-panel">
      <strong>${t.name}</strong>
      <span>Practical Tool • ${t.price}c</span>
      <button class="action-btn secondary-btn" style="margin-top:12px">Access Tool</button>
    </div>
  `).join("");
}

function loadState() {
  const saved = JSON.parse(localStorage.getItem(storageKey));
  return saved || { coins: 150, streak: 7, progress: {}, ownedTemplates: [] };
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function updateDashboard() {
  elements.coinCount.textContent = state.coins;
  elements.streakCount.textContent = `${state.streak}-day`;
}

function renderIdeasEmpty() {
  elements.ideas.innerHTML = '<p style="grid-column: 1/-1; text-align:center; opacity:0.5; padding: 60px;">Select materials to generate verification-grade plans.</p>';
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

function escHtml(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

window.analyzeImage = analyzeImage;
