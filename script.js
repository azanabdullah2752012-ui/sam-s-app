// ─── Config ────────────────────────────────────────────────────────────────
// Google Gemini API Key
const GEMINI_API_KEY = "AIzaSyANW0sZNF1bo7zjTc9JkUBhOYxmNGeyNDA";

const AI_MODELS = [
  { id: "gemini-2.5-flash", label: "Gemini 2.5 Flash (Vision+Speed)" },
  { id: "gemini-2.5-pro",   label: "Gemini 2.5 Pro (Precision)"    }
];

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
  materialType: document.getElementById("materialType"),
  projectGoal: document.getElementById("projectGoal"),
  materialPreview: document.getElementById("materialPreview"),
  finalPreview: document.getElementById("finalPreview"),
  ideas: document.getElementById("ideas"),
  rating: document.getElementById("rating"),
  marketGrid: document.getElementById("marketGrid"),
  craftsmanshipRange: document.getElementById("craftsmanshipRange"),
  originalityRange: document.getElementById("originalityRange"),
  functionalityRange: document.getElementById("functionalityRange"),
  sustainabilityRange: document.getElementById("sustainabilityRange"),
  generateBtn: document.getElementById("generateBtn"),
  rateBtn: document.getElementById("rateBtn"),
  modelSelect: document.getElementById("modelSelect"),
  aiStatus: document.getElementById("aiStatus"),
  aiFeedbackStatus: document.getElementById("aiFeedbackStatus")
};

init();

// ─── Init ──────────────────────────────────────────────────────────────────
function init() {
  populateModelSelect();
  updateDashboard();
  renderIdeasEmpty();
  renderRatingEmpty();
  renderMarketplace();

  elements.imageInput.addEventListener("change", (e) => renderPreview(e.target, elements.materialPreview, "Material preview"));
  elements.finalInput.addEventListener("change", (e) => renderPreview(e.target, elements.finalPreview, "Final build preview"));
  elements.generateBtn.addEventListener("click", generateIdeas);
  elements.rateBtn.addEventListener("click", rateProject);
}

// ─── Model Select ──────────────────────────────────────────────────────────
function populateModelSelect() {
  if (!elements.modelSelect) return;
  elements.modelSelect.innerHTML = AI_MODELS.map((m) =>
    `<option value="${m.id}">${m.label}</option>`
  ).join("");
}

function selectedModel() {
  return elements.modelSelect ? elements.modelSelect.value : AI_MODELS[0].id;
}

// ─── Gemini API call ───────────────────────────────────────────────────
async function callGemini(parts, maxTokens = 900) {
  const modelId = selectedModel();
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${GEMINI_API_KEY}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts }],
      generationConfig: {
        maxOutputTokens: maxTokens,
        temperature: 0.85
      }
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini error ${response.status}: ${err}`);
  }

  const data = await response.json();
  if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text.trim();
  }
  throw new Error("No content returned from Gemini");
}

// ─── Image → base64 ────────────────────────────────────────────────────────
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ─── Set loading state ─────────────────────────────────────────────────────
function setLoading(btn, statusEl, message, active) {
  if (active) {
    // Save the original label before changing it
    if (!btn.dataset.label) btn.dataset.label = btn.textContent.trim();
    btn.disabled = true;
    btn.textContent = "Thinking…";
  } else {
    btn.disabled = false;
    // Restore from saved label — don't use btn.textContent which is already "Thinking…"
    btn.textContent = btn.dataset.label || btn.textContent;
    delete btn.dataset.label;
  }
  if (statusEl) statusEl.textContent = active ? message : "";
}

// ─── Generate Ideas ───────────────────────────────────────────────────────
async function generateIdeas() {
  const file = elements.imageInput.files[0];
  const material = elements.materialType.value;
  const goal = elements.projectGoal.value;

  console.log("[Generate Ideas] clicked — material:", material, "goal:", goal);

  // Always show static ideas instantly — no waiting!
  setLoading(elements.generateBtn, elements.aiStatus, "", true);
  renderStaticIdeas(material, goal);

  if (elements.aiStatus) elements.aiStatus.textContent = `🤖 Enhancing with ${getModelLabel()}...`;

  try {
    let parts = [];
    
    // 🔥 VISION MAGIC: Let Gemini "look" at the specific trash item uploaded
    if (file) {
      const imageBase64 = await fileToBase64(file);
      const mimeType = file.type || "image/jpeg";
      parts.push({
        inlineData: {
          mimeType: mimeType,
          data: imageBase64
        }
      });
      parts.push({ text: `Looking at this exact picture of the user's material (plus assuming it's a ${material.replace("-", " ")})...` });
    }

    parts.push({ text: buildIdeaPrompt(material, goal) });

    const raw = await callGemini(parts, 1000);
    console.log("[Generate Ideas] raw AI response:", raw);
    const ideas = parseIdeaJSON(raw);

    if (ideas && ideas.length > 0) {
      renderAIIdeas(ideas);  // Upgrade to tailored AI vision cards!
      if (elements.aiStatus) elements.aiStatus.textContent = "✨ Vision AI Complete!";
    } else {
      console.warn("[Generate Ideas] AI returned non-JSON.");
      if (elements.aiStatus) elements.aiStatus.textContent = "";
    }
  } catch (error) {
    console.error("[Generate Ideas] AI Vision failed:", error.message);
    if (elements.aiStatus) elements.aiStatus.textContent = "";
  } finally {
    setLoading(elements.generateBtn, null, "", false);
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

function renderAIIdeas(ideas) {
  elements.ideas.innerHTML = ideas.map((entry, i) => `
    <article class="idea-note">
      <div class="ai-badge">✨ AI</div>
      <strong>${escHtml(entry.title || "Untitled")}</strong>
      <div class="meta-row">
        <span class="meta-chip">${escHtml(entry.difficulty || "")}</span>
        <span class="meta-chip">${escHtml(entry.time || "")}</span>
        <span class="meta-chip">${escHtml(entry.impact || "")} impact</span>
      </div>
      <p>${escHtml(entry.description || "")}</p>
    </article>
  `).join("");
}

function renderStaticIdeas(material, goal) {
  const ideaLibrary = getStaticLibrary();
  const materialBank = ideaLibrary[material] || ideaLibrary.mixed;
  // Try exact goal, then first available goal, then mixed fallback
  const selectedIdeas = materialBank[goal]
    || Object.values(materialBank)[0]
    || Object.values(ideaLibrary.mixed)[0]
    || [];

  if (selectedIdeas.length === 0) {
    elements.ideas.innerHTML = '<div class="empty-state">No ideas found for this combination. Try a different material or goal.</div>';
    return;
  }

  elements.ideas.innerHTML = selectedIdeas.map((entry) => `
    <article class="idea-note">
      <strong>${entry.title}</strong>
      <div class="meta-row">
        <span class="meta-chip">${entry.difficulty}</span>
        <span class="meta-chip">${entry.time}</span>
        <span class="meta-chip">${entry.impact} impact</span>
      </div>
      <p>${entry.description}</p>
    </article>
  `).join("");
}

// ─── Rate My Build (AI feedback) ──────────────────────────────────────────
async function rateProject() {
  const file = elements.finalInput.files[0];
  if (!file) {
    elements.rating.innerHTML = "<p>Upload the final build before scoring it.</p>";
    return;
  }

  const rubric = [
    { name: "Craftsmanship", value: Number(elements.craftsmanshipRange.value) },
    { name: "Originality", value: Number(elements.originalityRange.value) },
    { name: "Functionality", value: Number(elements.functionalityRange.value) },
    { name: "Sustainability", value: Number(elements.sustainabilityRange.value) }
  ];

  const total = rubric.reduce((sum, item) => sum + item.value, 0);
  const score = Math.round((total / 20) * 100);
  const earnedCoins = Math.max(12, Math.round(score * 0.35));
  const today = new Date().toISOString().slice(0, 10);

  // Show instant score UI first
  const staticSummary = summarizeScore(score);
  elements.rating.innerHTML = buildScoreHTML(score, earnedCoins, rubric, staticSummary, "Generating AI feedback…", "…");

  // Update state immediately
  state.coins += earnedCoins;
  state.projectsRated += 1;
  updateStreak(today);
  state.lastRatedDate = today;
  state.history.push({ goal: elements.projectGoal.value, score, date: today });
  saveState();
  updateDashboard();
  renderMarketplace();

  // Get AI feedback asynchronously via Gemini
  elements.rateBtn.dataset.label = "Score Build";
  setLoading(elements.rateBtn, elements.aiFeedbackStatus, `🤖 ${getModelLabel()} is writing your feedback…`, true);

  try {
    const prompt = buildRatingPrompt(rubric, score, elements.projectGoal.value);
    let parts = [];

    // Vision rating! Gemini looks at the final build photos to grade it.
    if (file) {
      const imageBase64 = await fileToBase64(file);
      const mimeType = file.type || "image/jpeg";
      parts.push({ inlineData: { mimeType: mimeType, data: imageBase64 } });
      parts.push({ text: "Look closely at this image of the final built physical project: " });
    }
    parts.push({ text: prompt });

    const aiFeedback = await callGemini(parts, 300);
    const aiNext = await callGemini([{ text: buildNextStepPrompt(rubric, score) }], 150);

    elements.rating.innerHTML = buildScoreHTML(score, earnedCoins, rubric, staticSummary, aiFeedback, aiNext);
  } catch (error) {
    console.error("AI rating feedback failed:", error);
    elements.rating.innerHTML = buildScoreHTML(score, earnedCoins, rubric, staticSummary, staticSummary.feedback, staticSummary.next);
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
    <div class="score-head">
      <strong class="score-number">${score}/100</strong>
      <span class="price-chip">+${earnedCoins} coins</span>
    </div>
    <div class="score-grid">
      ${rubric.map((item) => `
        <div class="score-box">
          <span>${item.name}</span>
          <strong>${item.value}/5</strong>
        </div>
      `).join("")}
    </div>
    <p class="score-copy"><strong>${staticSummary.title}:</strong> ${isLoading ? '<span class="ai-loading">✨ Generating AI feedback…</span>' : escHtml(feedbackText)}</p>
    <p class="score-copy"><strong>Next move:</strong> ${nextText === "…" ? '<span class="ai-loading">✨ Thinking…</span>' : escHtml(nextText)}</p>
    ${!isLoading ? '<p class="ai-tag">🤖 Feedback by ' + getModelLabel() + '</p>' : ''}
  `;
}

// ─── Helpers ───────────────────────────────────────────────────────────────
function getModelLabel() {
  const found = AI_MODELS.find((m) => m.id === selectedModel());
  return found ? found.label : selectedModel();
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
    "plastic-bottle": {
      storage: [
        makeIdea("Snap desk pods", "Easy", "30 min", "Low", "Cut bottle bodies into bright pods for pens, chargers, and scissors."),
        makeIdea("Bathroom bins", "Medium", "45 min", "Medium", "Wrap bottles in paper or fabric to build a coordinated shelf organizer."),
        makeIdea("Cable drop station", "Medium", "35 min", "Low", "Use bottle bottoms to keep charging cables upright and easy to grab.")
      ],
      decor: [
        makeIdea("Petal lamp", "Advanced", "90 min", "High", "Shape translucent plastic petals into a bold hanging lamp."),
        makeIdea("Sun catcher chain", "Easy", "25 min", "Low", "Paint bottle rings and hang them as bright moving window art."),
        makeIdea("Bottle bloom garland", "Medium", "50 min", "Medium", "Turn plastic flowers into a cheerful room installation.")
      ],
      garden: [
        makeIdea("Self-watering planter", "Easy", "30 min", "High", "Split a bottle into a wick planter that keeps herbs alive longer."),
        makeIdea("Hanging herb rail", "Medium", "55 min", "High", "Mount bottles sideways to create a compact balcony garden."),
        makeIdea("Seedling domes", "Easy", "20 min", "High", "Use clear bottle tops as mini greenhouses for new plants.")
      ],
      kids: [
        makeIdea("Rocket kit", "Medium", "40 min", "Medium", "Create a play rocket set with bottle bodies and cardboard fins."),
        makeIdea("Color sorting game", "Easy", "20 min", "Low", "Build a tactile game for sorting caps, beads, or pom-poms."),
        makeIdea("Mini bowling set", "Easy", "25 min", "Low", "Weight bottle bases and turn them into indoor play pins.")
      ],
      gift: [
        makeIdea("Gift capsules", "Easy", "25 min", "Low", "Turn bottle middles into transparent packaging for notes or treats."),
        makeIdea("Message keepsake", "Medium", "35 min", "Low", "Decorate a bottle as a memory holder for handwritten notes."),
        makeIdea("Seed favors", "Easy", "20 min", "Low", "Package small seed gifts in reworked bottle pods.")
      ]
    },
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
  elements.marketGrid.innerHTML = templates.map((template) => {
    const owned = state.ownedTemplates.includes(template.id);
    const canAfford = state.coins >= template.price;
    return `
      <article class="market-note">
        <div class="market-head">
          <div>
            <strong>${template.name}</strong>
            <p>${template.category}</p>
          </div>
          <span class="price-chip">${template.price} coins</span>
        </div>
        <p>${template.description}</p>
        <div class="market-foot">
          <span>${owned ? "Unlocked and saved." : "Permanent local unlock."}</span>
          <button class="buy-btn" data-id="${template.id}" ${owned || !canAfford ? "disabled" : ""}>
            ${owned ? "Owned" : canAfford ? "Unlock" : "Need coins"}
          </button>
        </div>
      </article>
    `;
  }).join("");

  elements.marketGrid.querySelectorAll(".buy-btn").forEach((btn) => {
    btn.addEventListener("click", () => buyTemplate(btn.dataset.id));
  });
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
  elements.ideas.innerHTML = '<div class="empty-state">Your colorful AI idea cards will appear here.</div>';
}

function renderRatingEmpty() {
  elements.rating.innerHTML = "<p>Upload a finished project and this panel becomes a scoring board.</p>";
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
