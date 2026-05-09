"use client";

import { useState } from "react";

function BOX({ label, color }) {
  return (
    <div style={{
      border: `1px solid ${color}55`,
      background: color + "11",
      borderRadius: 6,
      padding: "6px 12px",
      color: color,
      fontSize: 12,
      fontFamily: "monospace",
      fontWeight: 700,
      whiteSpace: "nowrap",
    }}>{label}</div>
  );
}

function ArrowLine({ color }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", color: color, fontSize: 16, lineHeight: 1, gap: 2 }}>
      <div style={{ width: 1, height: 12, background: color + "66" }} />
      ▼
    </div>
  );
}

export function ArchDemo() {
  const [selected, setSelected] = useState("decoder");

  const archs = [
    {
      id: "encoder",
      name: "Reader",
      color: "#38BDF8",
      badge: "e.g. BERT, RoBERTa",
      tagline: "Understanding text",
      attnType: "Sees everything at once — like reading a full sentence before answering",
      howItWorks: "Imagine reading an entire paragraph before answering a question about it. This model sees all words simultaneously and builds a deep understanding of the input — but it doesn't write new text. It's great at tasks like \"Is this review positive or negative?\" or \"Find the person's name in this sentence.\"",
      useCases: ["Spam detection", "Sentiment analysis", "Search & retrieval", "Classifying text"],
      canGenerate: false,
      tokens: ["I", "love", "Paris", "[MASK]"],
      arrows: [
        [0,1],[0,2],[0,3],[1,0],[1,2],[1,3],[2,0],[2,1],[2,3],[3,0],[3,1],[3,2]
      ],
    },
    {
      id: "decoder",
      name: "Writer",
      color: "#EC4899",
      badge: "e.g. GPT, Claude, Llama",
      tagline: "Generating text",
      attnType: "Writes left-to-right — each word only sees what came before it",
      howItWorks: "Like writing a sentence one word at a time, where you can only look back at what you've already written — never peek ahead. This is how ChatGPT, Claude, and most AI assistants work. They predict the next word, then the next, then the next, building up a response.",
      useCases: ["Chatbots & assistants", "Writing & summarizing", "Code generation", "Creative content"],
      canGenerate: true,
      tokens: ["I", "love", "Paris", "→?"],
      arrows: [
        [1,0],[2,0],[2,1],[3,0],[3,1],[3,2]
      ],
    },
    {
      id: "enc-dec",
      name: "Reader → Writer",
      color: "#A78BFA",
      badge: "e.g. T5, BART, Whisper",
      tagline: "Transform input → output",
      attnType: "First reads everything, then writes based on what it understood",
      howItWorks: "Like a translator who first reads the full French sentence to understand it, then writes the English translation word by word. The \"reader\" half digests the input completely, then the \"writer\" half produces the output — constantly referring back to what was read.",
      useCases: ["Translation", "Summarization", "Speech-to-text", "Question answering"],
      canGenerate: true,
      tokens: ["Bonjour", "Paris", "→", "Hello", "Paris"],
      arrows: [],
    },
  ];

  const arch = archs.find((a) => a.id === selected);

  return (
    <div>
      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {archs.map((a) => (
          <button
            key={a.id}
            onClick={() => setSelected(a.id)}
            style={{
              flex: 1,
              background: selected === a.id ? a.color + "22" : "#111",
              border: `1px solid ${selected === a.id ? a.color : "#222"}`,
              borderRadius: 8,
              color: selected === a.id ? a.color : "#555",
              padding: "10px 8px",
              cursor: "pointer",
              fontSize: 11,
              fontFamily: "monospace",
              fontWeight: selected === a.id ? 700 : 400,
              transition: "all 0.2s",
              textAlign: "center",
            }}
          >
            {a.name}
          </button>
        ))}
      </div>

      {/* Badge + tagline */}
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16 }}>
        <span style={{ background: arch.color + "22", border: `1px solid ${arch.color}44`, borderRadius: 20, padding: "3px 12px", color: arch.color, fontSize: 11, fontFamily: "monospace" }}>
          {arch.badge}
        </span>
        <span style={{ color: "#555", fontSize: 12 }}>Task type: <strong style={{ color: "#888" }}>{arch.tagline}</strong></span>
      </div>

      {/* Architecture diagram */}
      {selected === "enc-dec" ? (
        <div style={{ display: "flex", gap: 0, marginBottom: 20, alignItems: "flex-start", background: "#0a0a0a", borderRadius: 10, padding: 16, border: "1px solid #1a1a1a" }}>
          {/* Encoder side */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ color: "#38BDF8", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4, fontFamily: "monospace" }}>Encoder</div>
            <BOX label="Bonjour Paris" color="#38BDF8" />
            <ArrowLine color="#38BDF8" />
            <BOX label="Bidirectional Attn" color="#38BDF8" />
            <ArrowLine color="#38BDF8" />
            <div style={{ background: "#38BDF822", border: "1px solid #38BDF855", borderRadius: 6, padding: "6px 12px", color: "#38BDF8", fontSize: 11, fontFamily: "monospace", textAlign: "center" }}>
              Context<br/>vectors
            </div>
          </div>
          {/* Cross arrow */}
          <div style={{ display: "flex", alignItems: "center", padding: "48px 8px 0", color: "#A78BFA", fontSize: 20 }}>⇢</div>
          {/* Decoder side */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ color: "#A78BFA", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4, fontFamily: "monospace" }}>Decoder</div>
            <BOX label="Hello Paris" color="#A78BFA" />
            <ArrowLine color="#A78BFA" />
            <BOX label="Causal Attn" color="#A78BFA" />
            <ArrowLine color="#A78BFA" />
            <BOX label="Cross-Attention ←" color="#A78BFA" />
            <ArrowLine color="#A78BFA" />
            <BOX label="Output tokens" color="#A78BFA" />
          </div>
        </div>
      ) : (
        /* Encoder-only / Decoder-only token grid */
        <div style={{ background: "#0a0a0a", borderRadius: 10, padding: 16, marginBottom: 20, border: "1px solid #1a1a1a" }}>
          <div style={{ color: "#444", fontSize: 10, letterSpacing: 2, fontFamily: "monospace", marginBottom: 12, textTransform: "uppercase" }}>
            Which words can see which ({arch.attnType.split("—")[0].trim()})
          </div>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${arch.tokens.length}, 1fr)`, gap: 4 }}>
            {/* Column headers */}
            {arch.tokens.map((t, i) => (
              <div key={i} style={{ textAlign: "center", color: arch.color, fontSize: 11, fontFamily: "monospace", paddingBottom: 4 }}>{t}</div>
            ))}
            {/* Grid cells */}
            {arch.tokens.map((row, ri) =>
              arch.tokens.map((col, ci) => {
                const hasArrow = arch.arrows.some(([r, c]) => r === ri && c === ci) || ri === ci;
                return (
                  <div
                    key={`${ri}-${ci}`}
                    style={{
                      height: 28,
                      borderRadius: 4,
                      background: hasArrow ? arch.color + "33" : "#111",
                      border: `1px solid ${hasArrow ? arch.color + "55" : "#1a1a1a"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      color: hasArrow ? arch.color : "#2a2a2a",
                    }}
                  >
                    {hasArrow ? "✓" : "✗"}
                  </div>
                );
              })
            )}
            {/* Row labels */}
            {arch.tokens.map((t, i) => (
              <div key={i} style={{ textAlign: "center", color: "#444", fontSize: 10, fontFamily: "monospace", paddingTop: 2 }}>{t}</div>
            ))}
          </div>
          <div style={{ marginTop: 10, color: "#444", fontSize: 11, fontFamily: "monospace" }}>
            rows = current word · cols = words it can look at
          </div>
        </div>
      )}

      {/* How it works */}
      <div style={{ color: "#888", fontSize: 13, lineHeight: 1.7, marginBottom: 16, fontFamily: "sans-serif" }}>
        {arch.howItWorks}
      </div>

      {/* Use cases */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {arch.useCases.map((u, i) => (
          <span
            key={i}
            style={{
              background: "#111",
              border: "1px solid #222",
              borderRadius: 20,
              padding: "4px 12px",
              color: "#666",
              fontSize: 11,
              fontFamily: "sans-serif",
            }}
          >
            {u}
          </span>
        ))}
      </div>
    </div>
  );
}
