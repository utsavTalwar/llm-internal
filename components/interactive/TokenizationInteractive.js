"use client";

import { useState, useEffect } from "react";

export function BPEAnimation() {
  const [step, setStep] = useState(0);
  const steps = [
    { tokens: ["l", "o", "w", " ", "l", "o", "w", "e", "r"], label: "Start: individual characters" },
    { tokens: ["l", "o", "w", " ", "l", "o", "w", "er"], label: "Merge 'e'+'r' → 'er'" },
    { tokens: ["lo", "w", " ", "lo", "w", "er"], label: "Merge 'l'+'o' → 'lo'" },
    { tokens: ["low", " ", "low", "er"], label: "Merge 'lo'+'w' → 'low'" },
    { tokens: ["low", " ", "lower"], label: "Merge 'low'+'er' → 'lower'" },
  ];
  
  const current = steps[step];

  useEffect(() => {
    if (step < steps.length - 1) {
      const t = setTimeout(() => setStep(s => s + 1), 1200);
      return () => clearTimeout(t);
    }
  }, [step]);

  return (
    <div style={{ padding: "16px 0" }}>
      <div style={{ color: "#666", fontSize: 12, marginBottom: 16, fontFamily: "monospace" }}>
        Input: "low lower"
      </div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 16 }}>
        {current.tokens.map((tok, i) => (
          <div
            key={i}
            style={{
              background: tok.length > 1 ? "#00E5FF22" : "#111",
              border: `1px solid ${tok.length > 1 ? "#00E5FF55" : "#222"}`,
              borderRadius: 4,
              padding: "6px 10px",
              color: tok.length > 1 ? "#00E5FF" : "#666",
              fontFamily: "monospace",
              fontSize: 14,
              transition: "all 0.3s",
            }}
          >
            {tok === " " ? "⎵" : tok}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ color: "#888", fontSize: 12 }}>{current.label}</div>
        <div style={{ display: "flex", gap: 4 }}>
          {steps.map((_, i) => (
            <div
              key={i}
              onClick={() => setStep(i)}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: i === step ? "#00E5FF" : "#333",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>
      <button
        onClick={() => setStep(0)}
        style={{
          marginTop: 12,
          background: "transparent",
          border: "1px solid #222",
          borderRadius: 4,
          color: "#555",
          padding: "4px 12px",
          cursor: "pointer",
          fontSize: 11,
        }}
      >
        ↺ Replay
      </button>
    </div>
  );
}

export function VocabSizeCompare() {
  const [vocabSize, setVocabSize] = useState(50000);
  const sentence = "The astronaut floated gracefully in zero gravity";
  
  const tokenizations = {
    10000: ["The", " astro", "naut", " float", "ed", " grace", "fully", " in", " zero", " grav", "ity"],
    30000: ["The", " astronaut", " floated", " grace", "fully", " in", " zero", " gravity"],
    50000: ["The", " astronaut", " floated", " gracefully", " in", " zero", " gravity"],
    100000: ["The", " astronaut", " floated", " gracefully", " in", " zero gravity"],
  };

  const tokens = tokenizations[vocabSize] || tokenizations[50000];

  return (
    <div style={{ padding: "16px 0" }}>
      <div style={{ color: "#666", fontSize: 12, marginBottom: 8 }}>
        "{sentence}"
      </div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ color: "#888", fontSize: 11 }}>Vocab size: {vocabSize.toLocaleString()}</span>
          <span style={{ color: "#00E5FF", fontSize: 11, fontFamily: "monospace" }}>{tokens.length} tokens</span>
        </div>
        <input
          type="range"
          min="10000"
          max="100000"
          step="20000"
          value={vocabSize}
          onChange={(e) => setVocabSize(parseInt(e.target.value))}
          style={{ width: "100%", accentColor: "#00E5FF" }}
        />
      </div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {tokens.map((tok, i) => (
          <div
            key={i}
            style={{
              background: "#00E5FF15",
              border: "1px solid #00E5FF33",
              borderRadius: 4,
              padding: "4px 8px",
              color: "#00E5FF",
              fontFamily: "monospace",
              fontSize: 12,
            }}
          >
            {tok}
          </div>
        ))}
      </div>
      <div style={{ color: "#555", fontSize: 11, marginTop: 12, fontStyle: "italic" }}>
        Larger vocab → fewer tokens → fits more in context window
      </div>
    </div>
  );
}

export function SpecialTokensViz() {
  const [hovered, setHovered] = useState(null);
  const tokens = [
    { token: "<|system|>", desc: "Marks start of system instructions", color: "#EC4899" },
    { token: "You are a helpful assistant.", desc: "System prompt content", color: "#888" },
    { token: "<|user|>", desc: "Marks start of user message", color: "#22C55E" },
    { token: "What is 2+2?", desc: "User's question", color: "#888" },
    { token: "<|assistant|>", desc: "Marks start of AI response", color: "#A855F7" },
    { token: "The answer is 4.", desc: "Model's generated response", color: "#888" },
    { token: "<|endoftext|>", desc: "End of sequence signal", color: "#F59E0B" },
  ];

  return (
    <div style={{ padding: "16px 0" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {tokens.map((t, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "8px 12px",
              background: hovered === i ? "#ffffff08" : "transparent",
              borderRadius: 6,
              transition: "background 0.2s",
            }}
          >
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 12,
                color: t.color,
                minWidth: 180,
              }}
            >
              {t.token}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#555",
                opacity: hovered === i ? 1 : 0,
                transition: "opacity 0.2s",
              }}
            >
              {t.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TokenizationGotchas() {
  const [example, setExample] = useState(0);
  const examples = [
    {
      label: "Numbers",
      input: "9.11 vs 9.9",
      tokens1: ["9", ".", "11"],
      tokens2: ["9", ".", "9"],
      issue: "Model sees character sequences, not numeric values — can't reliably compare!",
    },
    {
      label: "Languages",
      input: "Hello vs नमस्ते",
      tokens1: ["Hello"],
      tokens2: ["न", "म", "स्", "ते"],
      issue: "Non-English uses 4× more tokens — less context per dollar",
    },
    {
      label: "Whitespace",
      input: "cat vs  Cat",
      tokens1: ["cat"],
      tokens2: [" ", "Cat"],
      issue: "Space and capitalization change token IDs completely",
    },
  ];

  const ex = examples[example];

  return (
    <div style={{ padding: "16px 0" }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {examples.map((e, i) => (
          <button
            key={i}
            onClick={() => setExample(i)}
            style={{
              background: example === i ? "#00E5FF22" : "#111",
              border: `1px solid ${example === i ? "#00E5FF55" : "#222"}`,
              borderRadius: 6,
              color: example === i ? "#00E5FF" : "#666",
              padding: "6px 14px",
              cursor: "pointer",
              fontSize: 11,
              fontFamily: "monospace",
            }}
          >
            {e.label}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 24, marginBottom: 12 }}>
        <div>
          <div style={{ color: "#555", fontSize: 10, marginBottom: 6 }}>Input 1</div>
          <div style={{ display: "flex", gap: 2 }}>
            {ex.tokens1.map((t, i) => (
              <span key={i} style={{ background: "#00E5FF22", padding: "2px 6px", borderRadius: 3, color: "#00E5FF", fontFamily: "monospace", fontSize: 12 }}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div style={{ color: "#555", fontSize: 10, marginBottom: 6 }}>Input 2</div>
          <div style={{ display: "flex", gap: 2 }}>
            {ex.tokens2.map((t, i) => (
              <span key={i} style={{ background: "#F59E0B22", padding: "2px 6px", borderRadius: 3, color: "#F59E0B", fontFamily: "monospace", fontSize: 12 }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div style={{ color: "#888", fontSize: 12, padding: "10px 12px", background: "#111", borderRadius: 6, borderLeft: "2px solid #F59E0B" }}>
        ⚠️ {ex.issue}
      </div>
    </div>
  );
}
