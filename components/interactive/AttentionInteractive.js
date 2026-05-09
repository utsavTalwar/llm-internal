"use client";

import { useState } from "react";

export function QKVExplainer() {
  const [step, setStep] = useState(0);
  const steps = [
    {
      title: "Query (Q)",
      desc: "Each token asks: 'What am I looking for?'",
      visual: "🔍",
      color: "#A855F7",
    },
    {
      title: "Key (K)",
      desc: "Each token announces: 'Here's what I contain'",
      visual: "🔑",
      color: "#22C55E",
    },
    {
      title: "Value (V)",
      desc: "Each token holds: 'Here's my actual information'",
      visual: "📦",
      color: "#F59E0B",
    },
    {
      title: "Match Q↔K",
      desc: "Compute similarity scores between all Q-K pairs",
      visual: "⚡",
      color: "#EC4899",
    },
    {
      title: "Weighted V",
      desc: "Use scores to take weighted average of Values",
      visual: "∑",
      color: "#00E5FF",
    },
  ];

  return (
    <div style={{ padding: "16px 0" }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, overflowX: "auto" }}>
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            style={{
              flex: "0 0 auto",
              background: step === i ? s.color + "22" : "#111",
              border: `1px solid ${step === i ? s.color : "#222"}`,
              borderRadius: 8,
              color: step === i ? s.color : "#555",
              padding: "8px 14px",
              cursor: "pointer",
              fontSize: 11,
              fontFamily: "monospace",
              transition: "all 0.2s",
            }}
          >
            {s.title}
          </button>
        ))}
      </div>
      <div
        style={{
          background: "#0a0a0a",
          border: "1px solid #1a1a1a",
          borderRadius: 10,
          padding: 20,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 36, marginBottom: 12 }}>{steps[step].visual}</div>
        <div style={{ color: steps[step].color, fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
          {steps[step].title}
        </div>
        <div style={{ color: "#888", fontSize: 13 }}>{steps[step].desc}</div>
      </div>
    </div>
  );
}

export function AttentionHeatmap() {
  const words = ["The", "cat", "sat", "on", "mat"];
  const [query, setQuery] = useState(1);
  
  const weights = [
    [0.9, 0.02, 0.03, 0.02, 0.03],
    [0.15, 0.6, 0.15, 0.05, 0.05],
    [0.1, 0.4, 0.3, 0.1, 0.1],
    [0.1, 0.1, 0.2, 0.5, 0.1],
    [0.05, 0.15, 0.2, 0.2, 0.4],
  ];

  return (
    <div style={{ padding: "16px 0" }}>
      <div style={{ color: "#666", fontSize: 11, marginBottom: 12 }}>
        Click a row to see attention from that word
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `40px repeat(${words.length}, 1fr)`, gap: 3 }}>
        {/* Header row */}
        <div />
        {words.map((w, i) => (
          <div key={i} style={{ textAlign: "center", color: "#555", fontSize: 10, fontFamily: "monospace", paddingBottom: 4 }}>
            {w}
          </div>
        ))}
        
        {/* Data rows */}
        {words.map((rowWord, ri) => (
          <>
            <div
              key={`label-${ri}`}
              onClick={() => setQuery(ri)}
              style={{
                color: query === ri ? "#A855F7" : "#444",
                fontSize: 10,
                fontFamily: "monospace",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              {rowWord}
            </div>
            {words.map((_, ci) => {
              const w = weights[ri][ci];
              return (
                <div
                  key={`${ri}-${ci}`}
                  onClick={() => setQuery(ri)}
                  style={{
                    height: 28,
                    borderRadius: 3,
                    background: query === ri
                      ? `rgba(168, 85, 247, ${w})`
                      : `rgba(255, 255, 255, ${w * 0.15})`,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 9,
                    color: query === ri && w > 0.3 ? "#fff" : "#333",
                    transition: "background 0.2s",
                  }}
                >
                  {query === ri ? (w * 100).toFixed(0) : ""}
                </div>
              );
            })}
          </>
        ))}
      </div>
      <div style={{ color: "#555", fontSize: 10, marginTop: 8, fontStyle: "italic" }}>
        Brighter = higher attention weight
      </div>
    </div>
  );
}

export function MultiHeadViz() {
  const [head, setHead] = useState(0);
  const heads = [
    { name: "Head 1", focus: "Syntax", example: "verb → subject", color: "#A855F7" },
    { name: "Head 2", focus: "Position", example: "nearby words", color: "#22C55E" },
    { name: "Head 3", focus: "Coreference", example: "'it' → noun", color: "#F59E0B" },
    { name: "Head 4", focus: "Punctuation", example: "comma patterns", color: "#EC4899" },
  ];

  return (
    <div style={{ padding: "16px 0" }}>
      <div style={{ color: "#666", fontSize: 11, marginBottom: 12 }}>
        Multiple heads learn different relationship patterns in parallel
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {heads.map((h, i) => (
          <button
            key={i}
            onClick={() => setHead(i)}
            style={{
              flex: 1,
              background: head === i ? h.color + "22" : "#111",
              border: `1px solid ${head === i ? h.color : "#222"}`,
              borderRadius: 6,
              color: head === i ? h.color : "#555",
              padding: "8px 4px",
              cursor: "pointer",
              fontSize: 10,
              fontFamily: "monospace",
            }}
          >
            {h.name}
          </button>
        ))}
      </div>
      <div style={{ background: "#0a0a0a", borderRadius: 8, padding: 16, border: "1px solid #1a1a1a" }}>
        <div style={{ color: heads[head].color, fontSize: 14, fontWeight: 600, marginBottom: 6 }}>
          Learns: {heads[head].focus}
        </div>
        <div style={{ color: "#666", fontSize: 12 }}>
          Pattern: {heads[head].example}
        </div>
      </div>
      <div style={{ color: "#555", fontSize: 10, marginTop: 12 }}>
        GPT-3 has 96 heads × 96 layers = 9,216 specialized attention patterns
      </div>
    </div>
  );
}

export function ComplexityViz() {
  const [seqLen, setSeqLen] = useState(1000);
  const scores = seqLen * seqLen;

  return (
    <div style={{ padding: "16px 0" }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ color: "#888", fontSize: 11 }}>Sequence length: {seqLen.toLocaleString()}</span>
          <span style={{ color: "#A855F7", fontSize: 11, fontFamily: "monospace" }}>
            {scores.toLocaleString()} attention scores
          </span>
        </div>
        <input
          type="range"
          min="100"
          max="10000"
          step="100"
          value={seqLen}
          onChange={(e) => setSeqLen(parseInt(e.target.value))}
          style={{ width: "100%", accentColor: "#A855F7" }}
        />
      </div>
      <div style={{ display: "flex", gap: 16, alignItems: "flex-end", height: 80, padding: "0 20px" }}>
        {[100, 1000, 10000, 100000].map((n) => {
          const height = Math.log10(n * n) / Math.log10(100000 * 100000) * 70 + 10;
          const isActive = seqLen >= n;
          return (
            <div key={n} style={{ flex: 1, textAlign: "center" }}>
              <div
                style={{
                  height: height,
                  background: isActive ? "#A855F7" : "#222",
                  borderRadius: "4px 4px 0 0",
                  transition: "all 0.3s",
                }}
              />
              <div style={{ color: "#555", fontSize: 9, marginTop: 4, fontFamily: "monospace" }}>
                {n >= 1000 ? `${n / 1000}k` : n}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ color: "#666", fontSize: 11, marginTop: 12, textAlign: "center" }}>
        O(n²) — doubling sequence length = 4× compute
      </div>
    </div>
  );
}
