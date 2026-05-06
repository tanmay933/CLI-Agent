# 🤖 CLI AI Agent – Assignment 02

A simple conversational CLI tool that behaves like a mini AI agent.  
You can type instructions in the terminal, and it will reason through the task and generate a working website (HTML, CSS, JS) on your system.

---

## ✨ Features

- 🧠 Agent-like behavior (planning + execution)  
- 💬 Accepts natural language input from CLI  
- 🏗️ Generates complete website files  
- 🔁 Includes reasoning loop (Plan → Execute)  
- 🌐 Output opens in browser and resembles Scaler-style UI  

---

## 🛠️ Tech Stack

- Node.js  
- Axios (API calls)  
- Gemini API  
- File System (fs)  

---

## 🚀 How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/tanmay933/CLI-Agent.git
   cd CLI-Agent
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Add your API key in `.env`:
   ```env
   GEMINI_API_KEY=your_key_here
   ```

4. Run the CLI agent:
   ```bash
   node index.js
   ```

---

## 💡 Example Usage

```bash
>> clone scaler academy website
```

What happens:
- Agent first prints a plan  
- Then generates:
  - index.html  
  - style.css  
  - script.js  
- Files are saved in `/project`  

---

## 📁 Project Structure

```
CLI-Agent/
│── index.js
│── package.json
│── .env.example
│── README.md
│── project/
│     ├── index.html
│     ├── style.css
│     └── script.js
```

---

## 🧪 Sample Output

The `/project` folder contains a generated example website.  
Open it in your browser:

```bash
open project/index.html   # mac
```

---

## 🎥 Demo Video

👉 https://youtu.be/L9aXwcBBiag

---

## 🧠 How the Agent Works

1. Planning Phase  
   - Breaks the user request into steps  

2. Execution Phase  
   - Generates complete website files  

This ensures:
- minimal API usage  
- clear reasoning (as required)  

---

## 📌 Notes

- `.env` is ignored for security  
- `.env.example` is provided for setup  
- Retry logic handles API load  

---

## ✅ Assignment Coverage

- ✔️ CLI-based conversational agent  
- ✔️ Agent loop (reasoning + execution)  
- ✔️ Generates working website  
- ✔️ Includes Header, Hero, Footer  
- ✔️ Clean code and documentation  

---

## 🙌 Author

Tanmay