import { CreateMLCEngine } from "https://esm.run/@mlc-ai/web-llm";

// ─── Magic Vision Engine ──────────────────────────────────────────────
let engine = null;
const modelId = "Llama-3.2-3B-Vision-Instruct-q4f16_1-MLC"; 

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

const storageKey = "eco-workshop-fun-state-v2";

const templates = [
  { id: "planner", name: "Project Planner 📝", category: "Plan", price: 10, type: "interactive", default: { title: "Your Magic Plan", materials: ["Paper", "Colored Pens"], steps: ["Dream it up", "Draw it out"] } },
  { id: "checklist", name: "Stuff You Need 📦", category: "Logistics", price: 5, type: "interactive", default: { title: "Maker Box Checklist", items: ["Measure your area", "Clean your materials", "Get your tape ready"] } },
  { id: "tracker", name: "Step-by-Step Tracker ✅", category: "Execution", price: 8, type: "interactive", default: { title: "Doing Great! Tracker", steps: ["Start", "Middle", "Finish!"] } }
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

// ─── Kid-Friendly Idea Generation ─────────────────────────────────────────
async function generateIdeas() {
  const customQuery = elements.aiInput ? elements.aiInput.value : "";
  const material = elements.materialType.value;
  const goal = elements.projectGoal.value;

  setLoading(elements.generateBtn, elements.aiStatus, "🍭 Finding fun ideas for you...", true);

  try {
    const prompt = `You are a friendly DIY helper for kids and parents. 
    Someone has "${material}" and wants to make "${goal}". 
    ${customQuery ? "They also asked for: " + customQuery : ""}
    Give 4 super fun and simple ideas! 
    Output ONLY a JSON array: [{title, description, materials:[], steps:[], difficulty:"Easy/Medium/Hard"}]. 
    Use very simple, happy words.`;
    
    const reply = await callEngine(prompt, false, true);
    const match = reply.match(/\[[\s\S]*\]/);
    if (match) {
      const ideas = JSON.parse(match[0]);
      renderExpertPlans(ideas);
      if (window.confetti) confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    }
  } catch (e) {
    console.error(e);
    elements.aiStatus.textContent = "Oops! The Magic Brain is resting. Try again soon!";
  } finally {
    setLoading(elements.generateBtn, null, "", false);
  }
}

function renderExpertPlans(plans) {
  elements.ideas.innerHTML = plans.map((plan, i) => `
    <article class="course-card" style="background:#fff; border-radius:32px; padding:24px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); cursor:pointer;" onclick="window.openPlanner(${JSON.stringify(plan).replace(/"/g, '&quot;')})">
      <div class="card-img-wrap">
        <img src="https://picsum.photos/seed/${plan.title}/600/400" alt="plan">
      </div>
      <div class="card-content">
        <span style="background:#fef3c7; color:#d97706; padding:4px 12px; border-radius:100px; font-size:0.8rem; font-weight:800; font-family:'Fredoka';">${plan.difficulty}</span>
        <h4 style="margin:12px 0 8px;">${escHtml(plan.title)}</h4>
        <p>${escHtml(plan.description)}</p>
      </div>
    </article>
  `).join("");
}

// ─── Kid-Friendly Image Review ────────────────────────────────────────────
async function analyzeImage() {
  const file = elements.imageInput.files[0];
  if (!file) {
    alert("Don't forget to upload a photo of your project first! 📸");
    return;
  }

  elements.reviewResult.style.display = "block";
  elements.reviewResult.innerHTML = "<div class='modal-loader'><div class='spinner'></div> <p>Checking out your amazing project! ⭐</p></div>";
  
  try {
    const dataUrl = await fileToDataUrl(file);
    const prompt = [
      { type: "text", text: "You are a friendly teacher. Look at this kid's DIY project. Tell them: 1. What you see; 2. Why it's awesome; 3. One fun tip to make it even better; 4. A Star Rating (1-10 stars)." },
      { type: "image_url", image_url: { url: dataUrl } }
    ];

    const reply = await callEngine(prompt, true);
    elements.reviewResult.innerHTML = `
      <div style="background:#fff; padding:24px; border-radius:20px; border-left:8px solid #72efdd;">
        <h3 style="font-family:'Fredoka'; color:#2d3436; margin-bottom:12px;">Expert Feedback! ⭐</h3>
        <div style="font-size:1.1rem; line-height:1.6; color:#636e72;">${reply.replace(/\n/g, '<br>')}</div>
      </div>
    `;
  } catch (e) {
    elements.reviewResult.innerHTML = "Oops! I couldn't see your photo. Can you try uploading it again?";
  }
}

// ─── Interactive Planner Logic ───────────────────────────────────────────
window.openPlanner = function(plan) {
  elements.tutorialTitle.textContent = plan.title;
  elements.tutorialModal.showModal();

  const projectId = `project-${plan.title.replace(/\s+/g, '-').toLowerCase()}`;
  const savedProgress = state.progress[projectId] || { materials: [], steps: [], items: [] };

  const matsHtml = plan.materials ? `
    <h3 style="font-family:'Fredoka'; margin-top:24px;">Stuff You Need 📦</h3>
    ${plan.materials.map((m, i) => `
      <div class="planner-item">
        <input type="checkbox" id="m-${i}" ${savedProgress.materials?.includes(i) ? 'checked' : ''} onchange="window.saveProgress('${projectId}', 'materials', ${i}, this.checked)">
        <label for="m-${i}">${escHtml(m)}</label>
      </div>
    `).join('')}` : '';
    
  const stepsHtml = plan.steps ? `
    <h3 style="font-family:'Fredoka'; margin-top:24px;">Step-by-Step ✅</h3>
    ${plan.steps.map((s, i) => `
      <div class="planner-item">
        <input type="checkbox" id="s-${i}" ${savedProgress.steps?.includes(i) ? 'checked' : ''} onchange="window.saveProgress('${projectId}', 'steps', ${i}, this.checked)">
        <label for="s-${i}">${escHtml(s)}</label>
      </div>
    `).join('')}` : '';

  const itemsHtml = plan.items ? `
    <h3 style="font-family:'Fredoka'; margin-top:24px;">Extra Checklist 📝</h3>
    ${plan.items.map((it, i) => `
      <div class="planner-item">
        <input type="checkbox" id="it-${i}" ${savedProgress.items?.includes(i) ? 'checked' : ''} onchange="window.saveProgress('${projectId}', 'items', ${i}, this.checked)">
        <label for="it-${i}">${escHtml(it)}</label>
      </div>
    `).join('')}` : '';

  elements.tutorialContent.innerHTML = matsHtml + stepsHtml + itemsHtml;
}

window.saveProgress = function(pid, type, index, checked) {
  if (!state.progress[pid]) state.progress[pid] = { materials: [], steps: [], items: [] };
  const list = state.progress[pid][type] || [];
  if (checked) {
    if (!list.includes(index)) list.push(index);
  } else {
    state.progress[pid][type] = list.filter(i => i !== index);
  }
  saveState();
}

window.accessToolkit = function(tid) {
  const t = templates.find(item => item.id === tid);
  if (!t) return;
  window.openPlanner({
    title: t.name,
    materials: t.default.materials || [],
    steps: t.default.steps || [],
    items: t.default.items || [],
    difficulty: "Fun!"
  });
}

// ─── Engine Helpers ───────────────────────────────────────────────────
async function callEngine(prompt, isVision = false, requireJSON = false) {
  const engine = await initEngine();
  const systemMsg = "You are a friendly, happy DIY helper for kids. Use simple words. Format as clear points.";
  const messages = isVision 
    ? [{ role: "user", content: prompt }] 
    : [{ role: "system", content: systemMsg }, { role: "user", content: prompt }];
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
    btn.textContent = "Show Me Magic! ✨";
    if (statusEl) statusEl.textContent = "";
  }
}

function renderMarketplace() {
  if (!elements.marketGrid) return;
  elements.marketGrid.innerHTML = templates.map(t => `
    <div style="background:#fff; border-radius:24px; padding:24px; min-width:280px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); text-align:center;">
      <strong style="display:block; font-family:'Fredoka'; font-size:1.2rem; margin-bottom:8px;">${t.name}</strong>
      <span style="color:#636e72;">${t.category} • ${t.price}c</span>
      <button class="pill-btn secondary-btn" style="margin-top:16px; width:100%;" onclick="window.accessToolkit('${t.id}')">Open Tool! 🧰</button>
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
  elements.ideas.innerHTML = '<p style="grid-column: 1/-1; text-align:center; opacity:0.5; padding: 60px; font-family:Fredoka;">Tell us what you have to see magic ideas! ✨</p>';
}

function renderPreview(input, container) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      container.innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-width:100%; border-radius:20px; box-shadow:0 10px 30px rgba(0,0,0,0.1); margin-top:32px;">`;
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function escHtml(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
window.analyzeImage = analyzeImage;
window.accessToolkit = accessToolkit;
window.saveProgress = saveProgress;
window.openPlanner = openPlanner;
