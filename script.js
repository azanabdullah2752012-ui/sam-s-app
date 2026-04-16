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
    document.getElementById("reviewBtn").disabled = false;
  } catch (err) {
    if (progressText) progressText.textContent = "Oops! AI is resting. Refresh!";
  }
  return engine;
}

const storageKey = "eco-workshop-fun-state-v4";

// ─── Curated Project Library (PRECISE & DETAILED) ──────────────────
const PROJECT_LIBRARY = {
  "cardboard-storage": [
    { 
      title: "Super-Sort Desk Organizer 📁", 
      description: "Keep your pens, markers, and secret notes perfectly neat!", 
      materials: ["Large cereal box", "3-4 toilet paper rolls", "Tape or Glue", "Colored paper"], 
      steps: [
        "Cut the top flaps off your cereal box to make it open.",
        "Cut the box at an angle so the back is tall and the front is short.",
        "Measure your toilet paper rolls to fit inside the front area.",
        "Glue the rolls inside the front of the box to hold pens.",
        "Decorate the outside with stickers or colored paper.",
        "Fill your new organizer with your favorite craft supplies!"
      ] 
    },
    { 
      title: "Stackable Shoe Tower 👟", 
      description: "Clear the floor by building a skyscraper for your shoes.", 
      materials: ["4-5 similar sized boxes", "Strong packing tape", "Markers"], 
      steps: [
        "Check that all your boxes are clean and empty.",
        "Tape the bottom flaps of each box shut very tightly.",
        "Cut the top flaps off completely so the boxes are open on top.",
        "Stack the boxes on their sides to see how high you want it.",
        "Tape the boxes together side-by-side or in a tall tower.",
        "Slide your shoes into their new cardboard cubbies!"
      ] 
    }
  ],
  "cardboard-decor": [
    { 
      title: "DIY Cardboard Cinema 📺", 
      description: "Put on your own TV show or puppet play for the family!", 
      materials: ["Large packing box", "Scissors", "Plastic wrap", "Flashlight"], 
      steps: [
        "Find a box big enough for you or your puppets to sit behind.",
        "Draw a large rectangle on the front and cut it out for the 'screen'.",
        "Tape clear plastic wrap over the hole to look like real glass.",
        "Cut a smaller hole in the back to shine a flashlight through.",
        "Draw buttons and a volume knob on the front with markers.",
        "Grab some popcorn and start your first broadcast!"
      ] 
    },
    { 
      title: "Layered 3D Wall Art 🖼️", 
      description: "Make a popping masterpiece that jumps off your wall.", 
      materials: ["Scrap cardboard pieces", "Glue", "Safety scissors", "Bright paint"], 
      steps: [
        "Draw simple shapes like stars, hearts, or robots on your scraps.",
        "Carefully cut out at least 10 different shapes.",
        "Paint each shape a different bright, fun color.",
        "Glue a small 'spacer' piece of cardboard to the back of each shape.",
        "Glue your shapes onto a large flat piece of cardboard in a cool pattern.",
        "Wait 10 minutes for the glue to dry, then hang up your art!"
      ] 
    }
  ],
  "cardboard-garden": [
    { 
      title: "Magic Seed Starters 🌱", 
      description: "Watch life begin in these eco-friendly starter boxes.", 
      materials: ["Egg carton or small boxes", "Potting soil", "Water", "Seeds"], 
      steps: [
        "Separate your egg carton into individual little cups.",
        "Use a pencil to poke a tiny drainage hole in the bottom of each.",
        "Fill each cup almost to the top with soft potting soil.",
        "Press your finger 1 inch into the dirt to make a home for the seed.",
        "Drop in a seed and cover it gently with a 'blanket' of soil.",
        "Give it a tiny drink of water and put it in a sunny window!"
      ] 
    }
  ],
  "cardboard-fashion": [
    { 
      title: "Hero's Shield & Armor 🛡️", 
      description: "Prepare for adventure with your own custom battle gear.", 
      materials: ["Large cardboard sheet", "Utility tape", "String or Elastic"], 
      steps: [
        "Draw a large shield shape on your cardboard and cut it out.",
        "Cut two long strips of cardboard to act as arm handles.",
        "Tape the handle strips to the back of the shield in a 'U' shape.",
        "Draw a cool crest or your initials on the front of the shield.",
        "Make a matching chest plate by cutting a hole for your head in a box.",
        "Grab your gear and go save the day!"
      ] 
    }
  ],
  "plastic-bottle-storage": [
    { 
      title: "Piggy Bank Buddy 🐷", 
      description: "A cute little friend to help you save your pocket money.", 
      materials: ["Water bottle", "4 bottle caps", "Pink paper", "Glue"], 
      steps: [
        "Make sure your bottle is completely dry inside.",
        "Glue the 4 bottle caps to the side of the bottle to act as legs.",
        "Cut a thin coin slot in the top using safety scissors.",
        "Cut out two pink paper triangles and glue them near the cap for ears.",
        "Draw two dots on the bottle cap for the pig's nose.",
        "Start filling your buddy with coins and watch your savings grow!"
      ] 
    }
  ],
  "plastic-bottle-decor": [
    { 
      title: "Glow-in-the-Dark Fairy Jar ✨", 
      description: "Capture some magic in a bottle to light up your room.", 
      materials: ["Plastic bottle", "Glitter", "Led fairy lights", "Ribbon"], 
      steps: [
        "Remove any labels from your bottle using warm soapy water.",
        "Pour a small amount of glitter inside and shake it around.",
        "Carefully thread your battery-powered fairy lights into the bottle.",
        "Tape the battery pack to the back of the bottle so it's hidden.",
        "Tie a big, pretty ribbon around the neck of the bottle.",
        "Turn on the lights at night and enjoy the fairy glow!"
      ] 
    }
  ],
  "plastic-bottle-garden": [
    { 
      title: "Self-Watering Herb Pot 💧", 
      description: "The smart way to grow plants without forgetting to water them.", 
      materials: ["Plastic bottle", "Cotton string", "Soil", "Small plant"], 
      steps: [
        "Cut your bottle in half (have a parent help if it's tricky!).",
        "Poke a hole in the bottle cap using a screwdriver or nail.",
        "Thread a 6-inch cotton string through the hole in the cap.",
        "Fill the bottom half of the bottle with 2 inches of water.",
        "Put the top half (with cap) upside down into the bottom half.",
        "Fill the top with soil and your plant—the string will drink for you!"
      ] 
    }
  ],
  "plastic-bottle-fashion": [
    { 
      title: "Cap Jewelry & Rings 💍", 
      description: "Turn trash into treasure with these shiny bottle cap rings.", 
      materials: ["Bottle caps", "Glue", "Ribbon or Pipe cleaner"], 
      steps: [
        "Collect 5-10 colorful caps from different juice bottles.",
        "Wash and dry the caps thoroughly.",
        "Glue a small gem or a sticker into the center of each cap.",
        "Twist a pipe cleaner into a circle that fits your finger.",
        "Glue the pipe cleaner ring to the back of your favorite cap.",
        "Wait for the glue to harden and show off your new sparkle!"
      ] 
    }
  ],
  "old-fabric-storage": [
    { 
      title: "No-Sew T-Shirt Basket 🧺", 
      description: "Turn that old shirt into a soft home for your toys.", 
      materials: ["Old T-Shirt", "Scissors", "Cardboard box"], 
      steps: [
        "Find an old shirt that is too small for you.",
        "Cut the shirt into long horizontal strips about 1 inch wide.",
        "Gently pull on the strips to make them curl into 'yarn'.",
        "Wrap the shirt-yarn around an old cardboard box.",
        "Tuck the ends under the loops to stay in place.",
        "Use your soft new basket to hold your building blocks!"
      ] 
    }
  ],
  "old-fabric-decor": [
    { 
      title: "Sock Monster Buddy ☁️", 
      description: "Make a new best friend from a lonely, single sock.", 
      materials: ["Old sock", "Rice or Stuffing", "Buttons", "Rubber band"], 
      steps: [
        "Find a clean sock that has lost its partner.",
        "Fill the sock halfway with rice, beans, or soft cotton.",
        "Tie a rubber band around the middle to make a head and body.",
        "Glue button eyes or draw a silly mouth with markers.",
        "Tie a second rubber band near the top to make 'ears'.",
        "Give your new monster buddy a name and a hug!"
      ] 
    }
  ],
  "old-fabric-garden": [
    { 
      title: "Hanging Denim Planters 🌱", 
      description: "Super strong plant pockets made from your old jeans.", 
      materials: ["Old jeans", "Strong glue or Staples", "Soil"], 
      steps: [
        "Cut the back pocket out of your old, worn-out jeans.",
        "Make sure to leave a little extra fabric around the edges.",
        "Glue or staple the edges to a piece of wood or a fence.",
        "Fill the pocket with a little bit of potting soil.",
        "Tuck a small succulent or herb plant into the pocket.",
        "Water gently and watch your wall turn green!"
      ] 
    }
  ],
  "old-fabric-fashion": [
    { 
      title: "Fringe Tote Bag 🛍️", 
      description: "A cool bag for the beach or park, made in minutes.", 
      materials: ["Old T-shirt", "Sharp scissors"], 
      steps: [
        "Lay your shirt flat and cut off the sleeves.",
        "Cut a large 'U' shape around the neck to make the handles.",
        "Cut 3-inch long fringes along the very bottom of the shirt.",
        "Tie the front fringe pieces to the back fringe pieces in double knots.",
        "Turn the bag inside out so the knots are hidden on the bottom.",
        "Load it up with your favorite snacks and books!"
      ] 
    }
  ],
  "glass-jar-storage": [
    { 
      title: "Rainbow Desk Jar ✏️", 
      description: "A bright and sparkly home for all your school supplies.", 
      materials: ["Clean glass jar", "Acrylic paint", "Sponge"], 
      steps: [
        "Make sure your jar is clean and completely dry.",
        "Dab small spots of different paint colors all over the jar.",
        "Let the first coat dry for about 20 minutes.",
        "Add a second layer of paint to make the colors really pop.",
        "Paint your name on the front with a thinner brush.",
        "Place all your pens and pencils inside for a tidy desk!"
      ] 
    }
  ],
  "glass-jar-decor": [
    { 
      title: "Magical Forest Lantern 🕯️", 
      description: "Bring the beauty of the woods inside your room.", 
      materials: ["Glass Jar", "Dried leaves", "Clear glue", "Battery candle"], 
      steps: [
        "Collect some pretty leaves from your backyard.",
        "Paint a thin layer of clear glue onto the outside of the jar.",
        "Press the leaves firmly onto the glue and let them dry.",
        "Wrap a piece of twine around the neck for a rustic look.",
        "Place a battery-operated candle at the bottom.",
        "Switch it on at bedtime for a cozy, forest feel!"
      ] 
    }
  ],
  "glass-jar-garden": [
    { 
      title: "Mini Moss Terrarium 🌲", 
      description: "A tiny world in a bottle that stays green all year.", 
      materials: ["Glass Jar", "Small pebbles", "Charcoal", "Moss"], 
      steps: [
        "Place 1 inch of small pebbles at the bottom for drainage.",
        "Add a thin layer of crushed charcoal to keep it fresh.",
        "Layer 2 inches of potting soil on top of the charcoal.",
        "Carefully place bits of moss and tiny rocks inside.",
        "Mist the inside with a spray bottle of water.",
        "Put the lid on and place it in indirect sunlight!"
      ] 
    }
  ],
  "glass-jar-fashion": [
    { 
      title: "Glitter Luck Amulet ✨", 
      description: "A tiny sparkle jar to wear on your favorite necklace.", 
      materials: ["Mini glass vial", "Fine glitter", "Clear oil or Water"], 
      steps: [
        "Find a very small glass jar or vial with a cork.",
        "Fill it 3/4 full with clear baby oil or water.",
        "Add a pinch of your favorite color glitter.",
        "Apply a tiny drop of glue to the cork and seal it tight.",
        "Tie a piece of jewelry cord around the neck of the vial.",
        "Wear your splash of magic wherever you go!"
      ] 
    }
  ],
  "tin-can-storage": [
    { 
      title: "Magnetic Pencil Caddy 📎", 
      description: "Keep your workspace clear with this industrial organizer.", 
      materials: ["Clean tin can", "Strong magnets", "Washi tape"], 
      steps: [
        "Carefully check that the edges of the can aren't sharp.",
        "Wrap colorful washi tape around the can in layers.",
        "Glue two strong magnets to the side of the can.",
        "Wait 30 minutes for the glue to be completely dry.",
        "Snap the can onto your fridge or a metal desk leg.",
        "Toss in your pens, clips, and scissors!"
      ] 
    }
  ],
  "tin-can-decor": [
    { 
      title: "Tin-Bot 5000 🤖", 
      description: "Create a metal friend using can scraps and bolts.", 
      materials: ["1 large can", "2 small cans", "Strong glue", "Googly eyes"], 
      steps: [
        "Use the large can as the 'body' of your robot.",
        "Glue the two smaller cans to the bottom for legs.",
        "Glue nuts or bottle caps all over for 'buttons'.",
        "Add two large googly eyes to the front of the 'head'.",
        "Give your robot 'arms' using bent pipe cleaners.",
        "Write your robot's name on its chest with a marker!"
      ] 
    }
  ],
  "tin-can-garden": [
    { 
      title: "Painted Flower Planter 🪴", 
      description: "A colorful home for your flowers that helps the planet.", 
      materials: ["Clean tin can", "Hammer", "Nail", "Outdoor paint"], 
      steps: [
        "Have a parent help you poke 3-4 holes in the bottom with a nail.",
        "Paint the outside of the can with bright colors or patterns.",
        "Let the paint dry completely in the sun.",
        "Fill the bottom with small rocks, then add soil.",
        "Plant a colorful flower or some tasty herbs.",
        "Give it a drink and place it on your balcony or porch!"
      ] 
    }
  ],
  "tin-can-fashion": [
    { 
      title: "Space-Talker Cups 👂", 
      description: "The classic way to talk to your friends across the yard.", 
      materials: ["2 tin cans", "Long piece of string", "Nail"], 
      steps: [
        "Punch a small hole in the center of the bottom of both cans.",
        "Thread one end of the string through the hole of the first can.",
        "Tie a big knot inside the can so the string can't pull out.",
        "Do the same thing with the other can and the other end of string.",
        "Walk apart until the string is very tight and straight.",
        "Have one friend talk while the other listens—it's magic!"
      ] 
    }
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
