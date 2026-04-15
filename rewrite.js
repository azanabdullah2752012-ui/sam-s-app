const fs = require('fs');

let code = fs.readFileSync('script.js', 'utf8');

// 1. Remove getApiKey and AI_MODELS and callGemini
const configRegex = /\/\/ ─── Config ───[\s\S]*?const AI_ENABLED = true;/;
code = code.replace(configRegex, `import { CreateMLCEngine } from "https://esm.run/@mlc-ai/web-llm";

// ─── WebLLM In-Browser AI Engine ──────────────────────────────────────────
let engine = null;
let isModelLoaded = false;

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
    "Llama-3.2-1B-Instruct-q4f32_1-MLC",
    { initProgressCallback }
  );

  isModelLoaded = true;
  if (progressContainer) progressContainer.style.display = "none";
  return engine;
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
`);

// 2. Remove populateModelSelect and selectedModel
code = code.replace(/\/\/ ─── Model Select ───[\s\S]*?\}\n/, "");
code = code.replace(/function selectedModel\(\) \{[\s\S]*?\}\n/, "");
code = code.replace(/populateModelSelect\(\);\n/, "");

// 3. Remove callGemini block
code = code.replace(/\/\/ ─── Gemini API call ───[\s\S]*?throw new Error\("No content returned from Gemini"\);\n\}\n/, "");

// 4. Remove validateImage and fileToBase64
code = code.replace(/\/\/ ─── Image validation & base64 ───[\s\S]*?\}\n\nfunction fileToBase64[\s\S]*?\}\n/, "");

// 5. Update generateIdeas
const genIdeasRegex = /try \{[\s\S]*?let parts = \[\];[\s\S]*?const raw = await callGemini\(parts, 1000, true\);[\s\S]*?if \(elements\.aiStatus\) elements\.aiStatus\.textContent = "✨ Vision AI Complete!";[\s\S]*?finally \{/m;
code = code.replace(genIdeasRegex, `try {
    const prompt = buildIdeaPrompt(material, goal);
    const raw = await callWebLLM(prompt, true);
    console.log("[Generate Ideas] raw AI response:", raw);
    
    // Attempt to extract JSON from completion
    const match = raw.match(/\\[[\\s\\S]*\\]/);
    if (!match) throw new Error("No JSON in AI response");
    const ideas = JSON.parse(match[0]);

    if (ideas && ideas.length > 0) {
      renderAIIdeas(ideas);
      if (elements.aiStatus) elements.aiStatus.textContent = "✨ Edge AI Complete!";
      // Confetti polish
      if (window.confetti) confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } else {
      console.warn("[Generate Ideas] AI returned empty ideas.");
      if (elements.aiStatus) elements.aiStatus.textContent = "";
    }
  } catch (error) {
    console.error("[Generate Ideas] Edge AI failed:", error.message);
    if (elements.aiStatus) elements.aiStatus.textContent = "";
  } finally {`);

// Also fix getModelLabel inside generateIdeas
code = code.replace(/getModelLabel\(\)/g, '"Llama 3.2 1B (Local Edge)"');

// 6. Update rateProject
const rateRegex = /try \{[\s\S]*?validateImage\(file\);[\s\S]*?const prompt = `You are an expert DIY judge\. Look at the attached image[\s\S]*?const rawAI = await callGemini\(parts, 600, true\);[\s\S]*?console\.log\("\[Rate Project\] Raw AI:", rawAI\);/m;
code = code.replace(rateRegex, `try {
    // TEXT ONLY EVALUATION (Vision removed for WebLLM)
    const prompt = \`You are an expert DIY judge. A maker built a "\${goal}" project using "\${elements.materialType?.value || "recycled materials"}".
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
}\`;

    const rawAI = await callWebLLM(prompt, true);
    console.log("[Rate Project] Raw AI:", rawAI);`);

// 7. Add huge confetti hit for scoring high
code = code.replace(/const staticSummary = summarizeScore\(score\);/m, `const staticSummary = summarizeScore(score);
    if (score > 75 && window.confetti) {
       confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 }, startVelocity: 45 });
    }
`);

fs.writeFileSync('script.js', code);
console.log("Rewrite complete.");
