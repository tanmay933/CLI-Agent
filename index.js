import axios from "axios";
import fs from "fs";
import readlineSync from "readline-sync";
import "dotenv/config";

const API_KEY = process.env.GEMINI_API_KEY;

// 🔹 Retry wrapper
async function callLLM(prompt, retries = 3) {
  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );

    return res.data.candidates[0].content.parts[0].text;

  } catch (err) {
    if (retries > 0) {
      console.log("Retrying due to load...");
      await new Promise(r => setTimeout(r, 3000));
      return callLLM(prompt, retries - 1);
    } else {
      console.error("API failed after retries");
      throw err;
    }
  }
}

// 🔹 Create files safely
function createFile(path, content) {
  const dir = path.substring(0, path.lastIndexOf("/"));
  if (dir) fs.mkdirSync(dir, { recursive: true });

  fs.writeFileSync(path, content);
  console.log(`Created: ${path}`);
}

// 🔹 Main
async function run() {
  const userInput = readlineSync.question(">> ");

  const planPrompt = `
You are an AI agent.

Break this task into clear steps.

User: ${userInput}

Return ONLY JSON:
{
  "steps": ["step1", "step2", "step3"]
}
`;

  let planResponse = await callLLM(planPrompt);

  let planClean = planResponse.trim();
  if (planClean.startsWith("```")) {
    planClean = planClean.replace(/```json|```/g, "").trim();
  }

  try {
    const planParsed = JSON.parse(planClean);
    console.log("\n🧠 Agent Plan:");
    planParsed.steps.forEach((s, i) => {
      console.log(`${i + 1}. ${s}`);
    });
  } catch {
    console.log("⚠️ Failed to parse plan, continuing...");
  }

  const prompt = `
You are an expert frontend developer.

STRICT RULES:
- ONLY return valid JSON
- NO markdown
- NO explanation

Goal:
Generate a modern, high-quality website.

Design requirements:
- Clean UI (like Scaler / modern ed-tech)
- Dark theme + accent colors
- Proper spacing and layout
- Responsive design

Structure:
- Navbar (logo + links)
- Hero section (headline + CTA button)
- Features / course section
- Testimonials or info section
- Footer

Tech:
- HTML (semantic)
- CSS (modern styling, flexbox/grid)
- JS (basic interactivity)

Output:
{
  "files": [
    { "path": "project/index.html", "content": "..." },
    { "path": "project/style.css", "content": "..." },
    { "path": "project/script.js", "content": "..." }
  ]
}

User: ${userInput}
`;

  let response = await callLLM(prompt);

  // 🔧 Clean JSON
  let clean = response.trim();

  if (clean.startsWith("```")) {
    clean = clean.replace(/```json|```/g, "").trim();
  }

  let parsed;

  try {
    parsed = JSON.parse(clean);
  } catch (e) {
    console.log("❌ Failed to parse JSON:\n", response);
    return;
  }

  // 🔹 Create all files
  for (const file of parsed.files) {
    createFile(file.path, file.content);
  }

  console.log("\n✅ Website generated successfully!");
}

run();