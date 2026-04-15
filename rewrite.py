import re

with open('script.js', 'r') as f:
    code = f.read()

# 1. Config -> WebLLM
code = re.sub(
    r'// ─── Config ───.*?const AI_ENABLED = true;',
    '''import { CreateMLCEngine } from "https://esm.run/@mlc-ai/web-llm";

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
    "Llama-3.2-1B-Instruct-q4f32_1-MLC",
    { initProgressCallback }
  );

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
}''',
    code, flags=re.DOTALL
)

# 2. Removes
code = re.sub(r'// ─── Model Select ───.*?}\n', '', code, flags=re.DOTALL)
code = re.sub(r'function selectedModel\(\) \{.*?\}\n', '', code, flags=re.DOTALL)
code = re.sub(r'populateModelSelect\(\);\n', '', code)
code = re.sub(r'// ─── Gemini API call ───.*?throw new Error\("No content returned from Gemini"\);\n\}\n', '', code, flags=re.DOTALL)
code = re.sub(r'// ─── Image validation & base64 ───.*?\}\n\nfunction fileToBase64.*?\}\n', '', code, flags=re.DOTALL)

# 3. Generate Ideas
gen_regex = r'try \{.*?let parts = \[\];.*?const raw = await callGemini\(parts, 1000, true\);.*?if \(elements\.aiStatus\) elements\.aiStatus\.textContent = "✨ Vision AI Complete!";.*?finally \{'
code = re.sub(gen_regex, '''try {
    const prompt = buildIdeaPrompt(material, goal);
    const raw = await callWebLLM(prompt, true);
    console.log("[Generate Ideas] raw AI response:", raw);
    
    const match = raw.match(/\\[[\\s\\S]*\\]/);
    if (!match) throw new Error("No JSON in AI response");
    const ideas = JSON.parse(match[0]);

    if (ideas && ideas.length > 0) {
      renderAIIdeas(ideas);
      if (elements.aiStatus) elements.aiStatus.textContent = "✨ Edge AI Complete!";
      if (window.confetti) confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } else {
      if (elements.aiStatus) elements.aiStatus.textContent = "";
    }
  } catch (error) {
    if (elements.aiStatus) elements.aiStatus.textContent = "";
  } finally {''', code, flags=re.DOTALL)

code = code.replace('getModelLabel()', '"Llama 3.2 1B (Local Edge)"')

# 4. Rate Project
rate_regex = r'try \{.*?validateImage\(file\);.*?const prompt = `You are an expert DIY judge\. Look at the attached image.*?const rawAI = await callGemini\(parts, 600, true\);.*?console\.log\("\[Rate Project\] Raw AI:", rawAI\);'
code = re.sub(rate_regex, '''try {
    const prompt = `You are an expert DIY judge. A maker built a "${goal}" project. Evaluate it conceptually out of 100 based on Craftsmanship, Originality, Functionality, and Sustainability.
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
    console.log("[Rate Project] Raw AI:", rawAI);''', code, flags=re.DOTALL)

code = code.replace('const staticSummary = summarizeScore(score);', '''const staticSummary = summarizeScore(score);
    if (score > 75 && window.confetti) {
       confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 }, startVelocity: 45 });
    }''')

with open('script.js', 'w') as f:
    f.write(code)

print("Python rewrite complete.")
