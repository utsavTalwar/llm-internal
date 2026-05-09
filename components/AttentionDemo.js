"use client";

import { useState } from "react";

export function AttentionDemo() {
  const words = ["The", "cat", "sat", "on", "mat"];
  const [focused, setFocused] = useState(1);
  const weights = {
    0: [0.3, 0.5, 0.1, 0.05, 0.05],
    1: [0.15, 0.6, 0.15, 0.05, 0.05],
    2: [0.1, 0.5, 0.2, 0.1, 0.1],
    3: [0.1, 0.1, 0.2, 0.4, 0.2],
    4: [0.05, 0.2, 0.2, 0.15, 0.4],
  };

  return (
    <div>
      <div style={{ color: "#aaa", fontSize: 13, marginBottom: 20 }}>
        Click a word — see how much attention it pays to every other word:
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
        {words.map((w, i) => (
          <button
            key={i}
            onClick={() => setFocused(i)}
            style={{
              background: focused === i ? "#A855F7" : "#1a1a1a",
              border: `1px solid ${focused === i ? "#A855F7" : "#333"}`,
              borderRadius: 8,
              color: focused === i ? "#fff" : "#aaa",
              padding: "10px 18px",
              cursor: "pointer",
              fontSize: 16,
              fontWeight: focused === i ? 700 : 400,
              transition: "all 0.2s",
            }}
          >
            {w}
          </button>
        ))}
      </div>
      <div style={{ color: "#aaa", fontSize: 13, marginBottom: 12 }}>
        Attention weights from <span style={{ color: "#A855F7", fontWeight: 700 }}>&quot;{words[focused]}&quot;</span>:
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {words.map((w, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 44,
                flexShrink: 0,
                color: i === focused ? "#A855F7" : "#666",
                fontSize: 13,
                fontFamily: "monospace",
                fontWeight: i === focused ? 700 : 400,
              }}
            >
              {w}
            </div>
            <div style={{ flex: 1, height: 20, background: "#111", borderRadius: 4, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${weights[focused][i] * 100}%`,
                  background: "linear-gradient(90deg, #A855F7, #7C3AED)",
                  borderRadius: 4,
                  transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
                }}
              />
            </div>
            <div style={{ width: 36, flexShrink: 0, color: "#555", fontSize: 12, fontFamily: "monospace", textAlign: "right" }}>
              {(weights[focused][i] * 100).toFixed(0)}%
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 24, padding: "12px 16px", background: "#A855F710", borderRadius: 8, border: "1px solid #A855F730", fontSize: 12, color: "#888" }}>
        In practice, there are <strong style={{ color: "#A855F7" }}>multiple attention heads</strong> running in parallel — each learning different relationship patterns (syntax, coreference, proximity…).
      </div>
    </div>
  );
}
