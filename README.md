# 📄 PaperLens — AI Research Paper Analyzer

> Deconstruct any research paper in seconds. From abstract to full technical dossier — powered by **Google Gemini AI**.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?style=flat-square&logo=express)](https://expressjs.com/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Gemini AI](https://img.shields.io/badge/Gemini-3.8_Flash-4285F4?style=flat-square&logo=google)](https://ai.google.dev/)

---

## ✨ Features

- 🔬 **6-Part Academic Framework** — Executive Summary, Methodology, Technologies, Workflow, Flowchart, Insights
- 🌐 **Google Search Grounding** — Real-time web sources cited alongside the analysis
- 📊 **Mermaid.js Flowcharts** — Auto-generated visual pipeline/architecture diagrams
- 🔄 **Smart Fallback Chain** — Gemini 3.8 Flash → Gemini 3.1 Flash-Lite → Local Synthesis Engine
- ⚡ **Rate-Limit Recovery** — Graceful 429 handling with zero-crash guarantees
- 🎯 **Audience-Aware** — Depth tunable for `researcher`, `student`, `industry`, or `general`
- 💬 **Follow-up Q&A** — Ask questions about any analyzed paper

---

## 🏗️ Architecture

```
User Input (text / query)
       │
       ▼
 Express API Server  ──►  Gemini 3.8 Flash (+ Search Grounding)
       │                          │ 429 Rate Limit
       │                          ▼
       │               Gemini 3.1 Flash-Lite
       │                          │ still limited / no key
       │                          ▼
       └──────────────►  Local Synthesis Engine (paperParser.ts)
                                  │
                                  ▼
                      6-Part Technical Dossier + Sources
```

---

## 📁 Project Structure

```
├── server.ts                  # Express API + Gemini integration
├── vite.config.ts             # Vite + Tailwind + React plugins
├── src/
│   ├── App.tsx                # Root: routing, state, API calls
│   ├── pages/
│   │   ├── PaperInputPage.tsx      # Page 1: Ingestion Studio
│   │   └── AnalysisReportPage.tsx  # Page 2: Technical Dossier
│   ├── components/
│   │   ├── MermaidRenderer.tsx     # Mermaid diagram renderer
│   │   ├── ResearchQA.tsx          # Follow-up Q&A UI
│   │   └── WorkflowStepper.tsx     # Animated workflow steps
│   └── utils/
│       └── paperParser.ts          # Offline synthesis fallback engine
```

---

## 🚀 Getting Started

**Prerequisites:** Node.js ≥ 18, a [Gemini API Key](https://aistudio.google.com/apikey)

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env.local
# → Add your GEMINI_API_KEY to .env.local

# 3. Start dev server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)**

---

## 🔌 API Endpoints

### `POST /api/analyze-paper`
```json
// Request
{
  "paperText": "...",         // raw paper text or abstract
  "paperQuery": "...",        // OR a title/topic to search
  "searchGrounding": true,    // enable Google Search
  "depth": "comprehensive",   // quick | standard | comprehensive
  "targetAudience": "researcher"
}
```

### `POST /api/ask-paper`
```json
// Request
{
  "question": "...",
  "paperTitle": "...",
  "paperSummary": "..."
}
```

---

## ⚙️ Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `GEMINI_API_KEY` | ✅ | — | Google Gemini API key |
| `APP_URL` | ⬜ | — | Public app URL (Cloud Run) |
| `PORT` | ⬜ | `3000` | Server port |
| `NODE_ENV` | ⬜ | `development` | `development` or `production` |

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Dev server with Vite HMR |
| `npm run build` | Production bundle |
| `npm run start` | Serve production build |
| `npm run lint` | TypeScript type check |
| `npm run clean` | Remove `dist/` artifacts |

---

## 🧩 Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, TypeScript, TailwindCSS 4, Lucide Icons, Mermaid.js, Motion |
| **Backend** | Express 4, `@google/genai` SDK, dotenv, tsx |
| **Build** | Vite 8, esbuild |

---

## 🌐 Deployment

```bash
# Build & run production
npm run build
NODE_ENV=production npm run start
```

Pre-configured for **Google AI Studio** and **Cloud Run** — `APP_URL` is auto-injected at runtime.

---

## 🤝 Contributing

1. Fork → `git checkout -b feat/my-feature`
2. Commit → `git commit -m 'feat: describe change'`
3. Push → `git push origin feat/my-feature`
4. Open a Pull Request

---

<div align="center">
  <sub>PaperLens v2.5 · Powered by Google Gemini 3.8 Flash · React · TypeScript · Express</sub>
</div>
