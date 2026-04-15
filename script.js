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

const AI_ENABLED = true;

// ─── Storage & Templates ───────────────────────────────────────────────────
const storageKey = "eco-remix-studio-state";

const templates = [
  { id: "toy-storage", name: "Toy Storage Cubes", description: "Bright stackable bins with labels, handles, and stronger corners.", category: "Storage", price: 8 },
  { id: "wall-art", name: "Cap Mosaic Wall Art", description: "A playful wall piece built from caps, lids, and a simple backing board.", category: "Decor", price: 10 },
  { id: "bird-feeder", name: "Bottle Bird Feeder", description: "A weather-friendly feeder plan with drainage, perch spacing, and refill tips.", category: "Garden", price: 6 },
  { id: "desk-dock", name: "Desk Dock Organizer", description: "A phone, pen, and note stand from jars, cardboard, and soft wraps.", category: "Workspace", price: 12 },
  { id: "gift-kit", name: "Reusable Gift Box Kit", description: "A repeatable gift package layout that looks deliberate instead of improvised.", category: "Gift", price: 7 },
  { id: "planter-wall", name: "Vertical Planter Wall", description: "A bottle-garden setup with spacing, drainage, and mounting guidance.", category: "Garden", price: 14 }
];

// ─── State ─────────────────────────────────────────────────────────────────
const state = loadState();

// ─── DOM refs ──────────────────────────────────────────────────────────────
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

// ─── Init ──────────────────────────────────────────────────────────────────
function init() {
  updateDashboard();
  renderIdeasEmpty();
  renderRatingEmpty();
  renderMarketplace();

  elements.imageInput.addEventListener("change", (e) => renderPreview(e.target, elements.materialPreview, "Material preview"));
  elements.finalInput.addEventListener("change", (e) => renderPreview(e.target, elements.finalPreview, "Final build preview"));
  elements.generateBtn.addEventListener("click", generateIdeas);
  elements.rateBtn.addEventListener("click", rateProject);
}

async function callWebLLM(prompt, requireJSON = false) {
  const llm = await initWebLLM();
  const messages = [
    { role: "system", content: requireJSON ? "You are a DIY expert. Output ONLY valid JSON containing exactly what is requested." : "You are a DIY expert." },
    { role: "user", content: prompt }
  ];
  
  const reply = await llm.chat.completions.create({
    messages,
    response_format: requireJSON ? { type: "json_object" } : undefined
  });
  
  return reply.choices[0].message.content;
}

// ─── Set loading state ─────────────────────────────────────────────────────
function setLoading(btn, statusEl, message, active) {
  if (active) {
    if (!btn.dataset.label) btn.dataset.label = btn.textContent.trim();
    btn.disabled = true;
    btn.innerHTML = `<span class="ai-loading">✨ Thinking…</span>`;
  } else {
    btn.disabled = false;
    btn.textContent = btn.dataset.label || btn.textContent;
    delete btn.dataset.label;
  }
  if (statusEl) {
    statusEl.innerHTML = active ? `<span class="ai-loading">${message}</span>` : "";
  }
}

// ─── Generate Ideas ───────────────────────────────────────────────────────
async function generateIdeas() {
  const file = elements.imageInput.files[0];
  const material = elements.materialType.value;
  const goal = elements.projectGoal.value;

async function generateIdeas() {
  const customQuery = elements.aiInput ? elements.aiInput.value : "";
  const material = elements.materialType.value;
  const goal = elements.projectGoal.value;

  setLoading(elements.generateBtn, elements.aiStatus, "", true);
  renderStaticIdeas(material, goal);

  if (elements.aiStatus) elements.aiStatus.textContent = `🤖 Analyzing textures...`;

  try {
    const prompt = buildIdeaPrompt(customQuery || material, goal);
    const raw = await callWebLLM(prompt, true);
    const match = raw.match(/\[[\s\S]*\]/);
    if (!match) throw new Error("No JSON in AI response");
    const ideas = JSON.parse(match[0]);

    if (ideas && ideas.length > 0) {
      renderAIIdeas(ideas, material);  
      if (elements.aiStatus) elements.aiStatus.textContent = "✨ AI Remix Complete";
      if (window.confetti) confetti({ particleCount: 60, spread: 55, origin: { y: 0.6 } });
    }
  } catch (error) {
    console.error("[Generate Ideas] Edge AI failed:", error.message);
  } finally {
    setLoading(elements.generateBtn, null, "", false);
  }
}
}

function buildIdeaPrompt(material, goal) {
  return `You are a creative eco-DIY expert. Generate exactly 3 fun, practical DIY project ideas for repurposing a "${material.replace("-", " ")}" into something related to "${goal}".

Respond ONLY with a valid JSON array — no explanation, no markdown fences — like this:
[
  {
    "title": "Short catchy name",
    "difficulty": "Easy|Medium|Advanced",
    "time": "X min",
    "impact": "Low|Medium|High",
    "description": "One vivid sentence describing the project and how to make it."
  }
]`;
}

function parseIdeaJSON(raw) {
  try {
    // Strip markdown fences if present
    const cleaned = raw.replace(/```(?:json)?/gi, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleaned);
    if (Array.isArray(parsed)) return parsed;
  } catch (_) { /* ignore */ }

  // Try to extract a JSON array from the text
  const match = raw.match(/\[[\s\S]*\]/);
  if (match) {
    try { return JSON.parse(match[0]); } catch (_) { /* ignore */ }
  }
  return null;
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
    const imgId = 100 + i;
    
    return `
      <article class="idea-card ${variant}" data-title="${escHtml(entry.title)}" data-material="${escHtml(material)}">
        <div class="card-img" style="background-image: url('https://picsum.photos/seed/${entry.title}/400')"></div>
        <div class="card-info">
          <div>
            <div class="card-title">${escHtml(entry.title || "Untitled")}</div>
            <p class="card-desc">${escHtml(entry.description || "")}</p>
            <div class="tag-row">
              <span class="pill-tag">${escHtml(entry.difficulty || "Easy")}</span>
              <span class="pill-tag">${escHtml(entry.time || "30m")}</span>
            </div>
          </div>
          <div class="card-footer">
            <div class="author">
              <img src="${author.img}" alt="user">
              <span>${author.name}</span>
            </div>
            <div class="rating">★ ${rating}</div>
          </div>
        </div>
      </article>
    `;
  }).join("");

  elements.ideas.querySelectorAll(".idea-card").forEach(card => {
    card.addEventListener("click", () => openTutorial(card.dataset.title, card.dataset.material));
  });
}

function renderStaticIdeas(material, goal) {
  const ideaLibrary = getStaticLibrary();
  const materialBank = ideaLibrary[material] || ideaLibrary.cardboard;
  const selectedIdeas = materialBank[goal] || Object.values(materialBank)[0] || [];

  renderAIIdeas(selectedIdeas.slice(0, 4), material);
}

// ─── Rate My Build (AI feedback) ──────────────────────────────────────────
async function rateProject() {
  const file = elements.finalInput.files[0];
  const goal = elements.projectGoal.value;
  if (!file) {
    elements.rating.innerHTML = "<p>Upload the final build before scoring it.</p>";
    return;
  }

  // Set loading
  elements.rateBtn.dataset.label = "Score Build";
  setLoading(elements.rateBtn, elements.aiFeedbackStatus, `🤖 Llama 3.2 is grading your physical build…`, true);
  elements.rating.innerHTML = "<p>Analyzing attributes and calculating score...</p>";

  try {
    const prompt = `You are an expert DIY judge. A maker built a "${goal}" project using "${elements.materialType?.value || "recycled materials"}".
There is no image attached, so assume the Craftsmanship is decent, but evaluate it conceptually.
Score it out of 100 based on Craftsmanship, Originality, Functionality, and Sustainability.
Respond exactly with valid JSON:
{
  "score": 85,
  "feedback": "2 sentences of encouraging feedback.",
  "next_step": "1 concrete suggestion to improve it.",
  "breakdown": [
    {"name": "Craftsmanship", "value": 4},
    {"name": "Originality", "value": 5},
    {"name": "Functionality", "value": 4},
    {"name": "Sustainability", "value": 4}
  ]
}`;

    const rawAI = await callWebLLM(prompt, true);
    console.log("[Rate Project] Raw AI:", rawAI);
    
    // Parse JSON
    const match = rawAI.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON in AI response");
    const result = JSON.parse(match[0]);
    
    const score = result.score || 70;
    const earnedCoins = Math.max(12, Math.round(score * 0.35));
    const rubric = result.breakdown || [];
    
    const today = new Date().toISOString().slice(0, 10);
    state.coins += earnedCoins;
    state.projectsRated += 1;
    updateStreak(today);
    state.lastRatedDate = today;
    state.history.push({ goal: goal, score, date: today });
    saveState();
    updateDashboard();
    renderMarketplace();

    const staticSummary = summarizeScore(score);
    if (score > 75 && window.confetti) {
       confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 }, startVelocity: 45 });
    }
    
    elements.rating.innerHTML = buildScoreHTML(score, earnedCoins, rubric, staticSummary, result.feedback, result.next_step);

  } catch (error) {
    console.error("AI rating feedback failed:", error);
    elements.rating.innerHTML = `<p style="color:#e07070">⚠️ ${error.message}</p>`;
    if (elements.aiFeedbackStatus) elements.aiFeedbackStatus.textContent = "";
  } finally {
    setLoading(elements.rateBtn, elements.aiFeedbackStatus, "", false);
    elements.rateBtn.textContent = "Score Build";
  }
}

function buildRatingPrompt(rubric, score, goal) {
  const breakdown = rubric.map((r) => `${r.name}: ${r.value}/5`).join(", ");
  return `You are a friendly eco-DIY mentor. A maker just completed a "${goal}" project and scored ${score}/100.
Breakdown: ${breakdown}.

Write 1–2 warm, encouraging sentences of specific feedback about the build quality. Be honest but upbeat. Do NOT use markdown.`;
}

function buildNextStepPrompt(rubric, score) {
  const weakest = [...rubric].sort((a, b) => a.value - b.value)[0];
  return `For an eco-DIY maker whose "${weakest.name}" score is ${weakest.value}/5 on a project scoring ${score}/100 overall, suggest one concrete next action to improve that specific dimension. One sentence, plain text, no markdown.`;
}

function buildScoreHTML(score, earnedCoins, rubric, staticSummary, feedbackText, nextText) {
  const isLoading = feedbackText === "Generating AI feedback…";
  return `
    <div class="score-head" style="margin-bottom: 24px;">
      <div style="display:flex; align-items: baseline; gap: 16px;">
        <strong class="score-number">${score}</strong>
        <span style="font-size: 1.5rem; color: var(--muted); font-weight: 700;">/ 100</span>
      </div>
      <div class="price-chip" style="background:#fef3c7; color:#92400e; border: 1px solid #fde68a;">+${earnedCoins} coins</div>
    </div>
    
    <div class="score-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 32px;">
      ${rubric.map((item) => `
        <div class="score-box" style="margin:0; text-align:left;">
          <span style="font-size: 0.75rem; font-weight: 700; color: var(--muted); text-transform: uppercase;">${item.name}</span>
          <div style="font-size: 1.25rem; font-weight: 700; color: var(--ink);">${item.value}<span style="font-size: 0.9rem; color: var(--muted);"> / 5</span></div>
        </div>
      `).join("")}
    </div>

    <div style="background: rgba(99, 102, 241, 0.05); padding: 24px; border-radius: 20px; border: 1px solid rgba(99, 102, 241, 0.1);">
      <p class="score-copy" style="margin: 0 0 16px 0;">
        <strong style="color:var(--primary);">${staticSummary.title}:</strong> 
        ${isLoading ? '<span class="ai-loading">✨ Generating AI feedback…</span>' : escHtml(feedbackText)}
      </p>
      <p class="score-copy" style="margin: 0;">
        <strong style="color:var(--primary);">Mentor Advice:</strong> 
        ${nextText === "…" ? '<span class="ai-loading">✨ Thinking…</span>' : escHtml(nextText)}
      </p>
    </div>
    
    ${!isLoading ? '<p style="font-size: 0.7rem; color: var(--muted); margin-top: 16px; font-weight: 600;">🤖 Evaluation by ' + getModelLabel() + '</p>' : ''}
  `;
}

// ─── Helpers ───────────────────────────────────────────────────────────────
function getModelLabel() {
  return "Llama 3.2 1B (Local Edge)";
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function showAIError(el, msg) {
  if (!el) return;
  el.textContent = ``;
}

// ─── Static library (fallback) ─────────────────────────────────────────────
function makeIdea(title, difficulty, time, impact, description) {
  return { title, difficulty, time, impact, description };
}

function getStaticLibrary() {
  return {
    "mixed": {
      storage: [
        makeIdea("Eco-Fabric Sneakers", "Medium", "90 min", "High", "Mycelium leather + Recycled soles. A high-end sustainable footwear concept."),
        makeIdea("Regenerative Apparel", "Advanced", "120 min", "High", "Sustainable jacket from organic cotton and algae dye."),
        makeIdea("Plant-Based Fashion Bag", "Medium", "60 min", "High", "Handbag using Hemp & Pineapple Fiber with aesthetic design."),
        makeIdea("Biodegradable Accessory", "Easy", "45 min", "Low", "Watch strap from recycled metal and wood tags.")
      ]
    }
  };
}
    container: {
      storage: [
        makeIdea("Pantry color set", "Easy", "30 min", "Medium", "Turn mixed jars into a cleaner pantry system with matching labels."),
        makeIdea("Hardware sorter", "Medium", "45 min", "High", "Mount containers on a board to sort screws, clips, and bits."),
        makeIdea("Travel care caddy", "Easy", "25 min", "Medium", "Bundle toiletries or craft items into a reusable case.")
      ],
      decor: [
        makeIdea("Memory jars", "Easy", "30 min", "Low", "Fill clear containers with scraps, photos, and notes for shelf decor."),
        makeIdea("Stencil sleeves", "Medium", "40 min", "Low", "Paint containers with layered patterns for soft evening light."),
        makeIdea("Pressed flower domes", "Medium", "50 min", "Low", "Frame dried flowers and found objects inside jars.")
      ],
      garden: [
        makeIdea("Propagation station", "Easy", "20 min", "High", "Line up jars for herb cuttings and root growth by a window."),
        makeIdea("Seed shelf", "Easy", "20 min", "Medium", "Sort saved seeds by season and light needs in labeled containers."),
        makeIdea("Compost caddy", "Medium", "40 min", "High", "Create a tidy indoor scrap caddy with a washable lid.")
      ],
      kids: [
        makeIdea("Treasure jars", "Easy", "20 min", "Low", "Make mini display jars for shells, leaves, or stones."),
        makeIdea("Glitter calm jars", "Easy", "15 min", "Low", "Build soothing jars for focus breaks and quiet time."),
        makeIdea("Puzzle cups", "Easy", "25 min", "Medium", "Separate game pieces into colorful grab-and-go jars.")
      ],
      gift: [
        makeIdea("Cookie mix jar", "Easy", "20 min", "Low", "Layer ingredients neatly and add a handwritten recipe tag."),
        makeIdea("Mini spa set", "Easy", "25 min", "Low", "Package salts, scrubs, or tea lights in a soft-color jar."),
        makeIdea("Thank-you bundle", "Easy", "20 min", "Low", "Use a decorated jar to carry small notes and treats.")
      ]
    },
    cardboard: {
      storage: [
        makeIdea("Drawer divider grid", "Easy", "20 min", "High", "Slot strips together for fast drawer organization."),
        makeIdea("Magazine files", "Easy", "25 min", "High", "Cut and wrap boxes into sturdy upright files."),
        makeIdea("Closet sleeves", "Medium", "45 min", "High", "Refinish boxes with bold paper to reduce visual clutter.")
      ],
      decor: [
        makeIdea("Layered shadow frames", "Medium", "50 min", "Medium", "Stack cardboard depths to build dimensional wall art."),
        makeIdea("Typography letters", "Easy", "25 min", "Low", "Cut oversized letters and wrap them in color blocks."),
        makeIdea("Geo hanging light", "Advanced", "90 min", "Medium", "Build a sculptural pendant from repeated shapes.")
      ],
      garden: [
        makeIdea("Seed starter pots", "Easy", "15 min", "High", "Fold plantable starter pots for herbs and flowers."),
        makeIdea("Tool shed labels", "Easy", "20 min", "Low", "Create bright signs for garden storage."),
        makeIdea("Brown bin", "Medium", "35 min", "High", "Store dry compost materials in a reinforced cardboard tote.")
      ],
      kids: [
        makeIdea("Play market stand", "Advanced", "100 min", "Medium", "Turn delivery boxes into a fold-flat pretend shop."),
        makeIdea("Marble maze board", "Medium", "45 min", "Low", "Build a maze with raised walls and painted paths."),
        makeIdea("Puppet stage", "Medium", "50 min", "Low", "Create a storytelling frame with slot-in characters.")
      ],
      gift: [
        makeIdea("Keepsake box", "Easy", "30 min", "Medium", "Transform packaging into a memory box with dividers."),
        makeIdea("Photo frame pair", "Easy", "20 min", "Low", "Wrap cardboard into playful standing frames."),
        makeIdea("Fold-flat crate", "Medium", "40 min", "Medium", "Make a reusable gift crate that stores flat.")
      ]
    },
    fabric: {
      storage: [
        makeIdea("Pocket board", "Medium", "50 min", "High", "Use fabric scraps to sew a cheerful hanging organizer."),
        makeIdea("Cord roll", "Easy", "20 min", "Low", "Create a wrap for chargers, pencils, or brushes."),
        makeIdea("Soft jar covers", "Easy", "25 min", "Medium", "Dress containers in fabric to soften busy storage.")
      ],
      decor: [
        makeIdea("Patchwork cushion", "Medium", "70 min", "Medium", "Combine scraps by tone into a bold pillow cover."),
        makeIdea("Banner strip set", "Easy", "30 min", "Low", "Create bright hanging banners from layered scraps."),
        makeIdea("Wrapped bottle vase", "Easy", "20 min", "Low", "Turn plain bottles into soft-texture decor.")
      ],
      garden: [
        makeIdea("Tool wrap", "Easy", "25 min", "Medium", "Organize hand tools in a roll-up fabric case."),
        makeIdea("Plant hanger straps", "Medium", "35 min", "Low", "Sew or braid bright hangers for indoor planters."),
        makeIdea("Harvest pouch", "Medium", "40 min", "Low", "Make a soft bag for herbs, twine, and snips.")
      ],
      kids: [
        makeIdea("Story dice pouch", "Easy", "15 min", "Low", "Sew a small drawstring bag for game pieces."),
        makeIdea("Alphabet bunting", "Medium", "40 min", "Medium", "Make colorful learning flags from fabric offcuts."),
        makeIdea("Dress-up crowns", "Easy", "25 min", "Low", "Create reversible costume crowns and badges.")
      ],
      gift: [
        makeIdea("Reusable wrap cloth", "Easy", "25 min", "High", "Replace single-use gift wrap with knot-wrap fabric."),
        makeIdea("Lavender sachets", "Easy", "20 min", "Low", "Sew scented sachets for drawers or closets."),
        makeIdea("Bottle gift sleeve", "Easy", "20 min", "Low", "Turn scraps into a playful bottle bag.")
      ]
    },
    mixed: {
      storage: [
        makeIdea("Entryway reset", "Medium", "60 min", "High", "Combine jars, cardboard, and fabric into a catch-all hub."),
        makeIdea("Maker caddy", "Advanced", "90 min", "High", "Build a colorful caddy with compartments for tools and scraps."),
        makeIdea("Bathroom tray set", "Medium", "45 min", "Medium", "Layer reused materials into a coordinated organizer.")
      ],
      decor: [
        makeIdea("Collage wall tile", "Medium", "45 min", "Low", "Mix caps, fabric, and cardboard into a tactile art tile."),
        makeIdea("Centerpiece cluster", "Easy", "30 min", "Low", "Create a reusable table centerpiece from mixed scraps."),
        makeIdea("Memory board", "Medium", "40 min", "Medium", "Build a framed board with pockets, pins, and color blocks.")
      ],
      garden: [
        makeIdea("Balcony grow station", "Advanced", "100 min", "High", "Create a compact garden with planting and storage zones."),
        makeIdea("Seed-start center", "Medium", "50 min", "High", "Organize trays, labels, and tools in one reuse setup."),
        makeIdea("Potting tote", "Medium", "40 min", "Medium", "Make a portable garden tote from mixed materials.")
      ],
      kids: [
        makeIdea("Creative supply cart", "Advanced", "90 min", "Medium", "Build a rolling-feel station for crafts and pretend play."),
        makeIdea("Explorer kit", "Medium", "40 min", "Low", "Create jars, tags, and a carrying base for nature collecting."),
        makeIdea("Mini city set", "Advanced", "80 min", "Medium", "Turn scraps into roads, buildings, and play pieces.")
      ],
      gift: [
        makeIdea("Celebration hamper", "Medium", "50 min", "Medium", "Build a reusable gift bundle container from mixed materials."),
        makeIdea("Keepsake chest", "Medium", "55 min", "Medium", "Layer cardboard and fabric into a more premium memory box."),
        makeIdea("Desk reset gift", "Medium", "45 min", "High", "Package a functional organizer set from reuse parts.")
      ]
    }
  };
}

// ─── Score helpers ─────────────────────────────────────────────────────────
function summarizeScore(score) {
  if (score >= 90) return { title: "Studio-quality build", feedback: "This looks polished, intentional, and genuinely useful.", next: "Photograph the process and turn it into a repeatable template." };
  if (score >= 75) return { title: "Strong build", feedback: "The concept works and the finish is close to premium.", next: "Tighten the edges, alignment, and color consistency." };
  if (score >= 60) return { title: "Promising build", feedback: "The idea is solid, but the finishing still feels rough.", next: "Simplify the design and reinforce the key joints." };
  return { title: "Prototype stage", feedback: "The project has potential, but it still needs clearer structure.", next: "Focus on one use case and rebuild with fewer materials." };
}

// ─── Streak ────────────────────────────────────────────────────────────────
function updateStreak(today) {
  if (!state.lastRatedDate) { state.streak = 1; return; }
  const diffDays = Math.round((new Date(today) - new Date(state.lastRatedDate)) / 86400000);
  if (diffDays === 1) state.streak += 1;
  else if (diffDays > 1) state.streak = 1;
}

// ─── Dashboard ─────────────────────────────────────────────────────────────
function updateDashboard() {
  elements.coinCount.textContent = state.coins;
  elements.projectCount.textContent = state.projectsRated;
  elements.streakCount.textContent = `${state.streak} day${state.streak === 1 ? "" : "s"}`;

  if (state.history.length === 0) {
    elements.favoriteCategory.textContent = "No data yet";
    elements.lastScore.textContent = "No projects rated";
  } else {
    const lastEntry = state.history[state.history.length - 1];
    elements.favoriteCategory.textContent = titleCase(favoriteCategory());
    elements.lastScore.textContent = `${lastEntry.score}/100`;
  }

  if (state.ownedTemplates.length === 0) {
    elements.ownedTemplates.innerHTML = '<span class="chip muted-chip">Nothing yet</span>';
  } else {
    elements.ownedTemplates.innerHTML = state.ownedTemplates.map((id) => {
      const t = templates.find((item) => item.id === id);
      return t ? `<span class="chip">${t.name}</span>` : "";
    }).join("");
  }
}

function favoriteCategory() {
  const counts = state.history.reduce((acc, entry) => {
    acc[entry.goal] = (acc[entry.goal] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

// ─── Marketplace ───────────────────────────────────────────────────────────
function renderMarketplace() {
  elements.marketGrid.innerHTML = templates.slice(0, 4).map((template, i) => {
    return `
      <div class="recent-item" 
           style="background-image: url('https://picsum.photos/seed/${template.id}/200')" 
           title="${template.name}"
           onclick="alert('Interactive Dashboard: Click an Idea Card to see WebLLM generate instructions!')">
      </div>
    `;
  }).join("");
}

function buyTemplate(templateId) {
  const template = templates.find((t) => t.id === templateId);
  if (!template || state.ownedTemplates.includes(template.id) || state.coins < template.price) return;
  state.coins -= template.price;
  state.ownedTemplates.push(template.id);
  saveState();
  updateDashboard();
  renderMarketplace();
}

// ─── State / Storage ───────────────────────────────────────────────────────
function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (saved) {
      return {
        coins: saved.coins ?? 24,
        projectsRated: saved.projectsRated ?? 0,
        streak: saved.streak ?? 0,
        lastRatedDate: saved.lastRatedDate ?? null,
        ownedTemplates: Array.isArray(saved.ownedTemplates) ? saved.ownedTemplates : [],
        history: Array.isArray(saved.history) ? saved.history : []
      };
    }
  } catch (e) { console.error("Failed to load state", e); }
  return { coins: 24, projectsRated: 0, streak: 0, lastRatedDate: null, ownedTemplates: [], history: [] };
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

// ─── Empty states ──────────────────────────────────────────────────────────
function renderIdeasEmpty() {
  elements.ideas.innerHTML = `
    <div class="empty-state" style="text-align:center; padding: 60px 40px; border: 2px dashed #e2e8f0; border-radius: 24px;">
      <div style="font-size: 3rem; margin-bottom: 20px;">💡</div>
      <h3 style="margin-bottom: 12px; color: var(--ink);">Ready for your next remix?</h3>
      <p style="color: var(--muted); max-width: 300px; margin: 0 auto;">Select your materials and hit generate to see AI-powered DIY blueprints appear here.</p>
    </div>
  `;
}

function renderRatingEmpty() {
  elements.rating.innerHTML = `
    <div style="text-align:center; padding: 40px; color: var(--muted);">
      <div style="font-size: 2.5rem; margin-bottom: 16px;">🏆</div>
      <p>Your skill score and AI mentor feedback will appear here after you upload your finished project.</p>
    </div>
  `;
}

// ─── Preview ───────────────────────────────────────────────────────────────
function renderPreview(input, target, label) {
  const file = input.files[0];
  if (!file) { target.innerHTML = `<p>${label}</p>`; return; }
  const imageUrl = URL.createObjectURL(file);
  target.innerHTML = `<img src="${imageUrl}" alt="${label}">`;
}

// ─── Utility ───────────────────────────────────────────────────────────────
function titleCase(value) {
  return String(value).split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

// ─── Interactive Tutorials ──────────────────────────────────────────────────
const tutorialModal = document.getElementById("tutorialModal");
const tutorialTitle = document.getElementById("tutorialTitle");
const tutorialLoading = document.getElementById("tutorialLoading");
const tutorialContent = document.getElementById("tutorialContent");
const closeModalBtn = document.getElementById("closeModalBtn");

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", () => {
    tutorialModal.close();
  });
}

async function openTutorial(title, context) {
  tutorialTitle.textContent = title;
  tutorialContent.innerHTML = "";
  tutorialLoading.style.display = "flex";
  tutorialModal.showModal();

  try {
    const prompt = `You are a DIY expert. Write a simple, easy-to-read 5-step tutorial on how to build "${title}" (Context: ${context}).
Format the response using basic HTML, like so:
<h3>Materials Needed</h3>
<ul><li>Item 1</li></ul>
<h3>Steps</h3>
<ol><li>Step 1</li></ol>
Keep it concise, formatting ONLY with standard HTML tags (no markdown backticks, no markdown headers).`;

    const instructions = await callWebLLM(prompt, false);
    
    // Strip markdown fences just in case Llama outputs them anyway
    const cleanedHTML = instructions.replace(/```(?:html)?/gi, "").replace(/```/g, "").trim();
    
    tutorialContent.innerHTML = cleanedHTML;
  } catch (error) {
    console.error("Tutorial AI failed:", error);
    tutorialContent.innerHTML = `<p style="color:#e07070">⚠️ AI failed to generate tutorial: ${error.message}</p>`;
  } finally {
    tutorialLoading.style.display = "none";
  }
}
