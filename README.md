# How LLMs Work Internally

An interactive, visual guide to understanding Large Language Models — from raw text to predicted tokens.

🔗 **Live site**: [llm-internal.vercel.app](https://llm-internal.vercel.app)

---

## What's Inside

A step-by-step walkthrough of 6 core stages of an LLM's pipeline, each with an interactive demo and optional deep-dive sections:

1. **Tokenization** — How text is split into chunks the model understands
2. **Embeddings** — How tokens become vectors in semantic space
3. **Attention** — How the model figures out which words matter most
4. **Transformer Layers** — How meaning is refined through stacked blocks
5. **Architecture** — How the encoder/decoder structure reads and writes
6. **Output** — How the model picks the next word

Each stage includes:
- Plain-language explanation
- Interactive demo
- 4 deep-dive sections with animated visualizations

---

## Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- Plain JavaScript (no TypeScript)
- CSS-in-JS (inline styles + global keyframes)
- Deployed on [Vercel](https://vercel.com)

---

## Running Locally

```bash
git clone https://github.com/utsavTalwar/llm-internal.git
cd llm-internal
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

Built by [Utsav Talwar](https://www.linkedin.com/in/utsav-talwar/)
