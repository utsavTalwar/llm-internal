"use client";

import { useState } from "react";

export function OutputDemo() {
  const candidates = [
    { token: "Paris", prob: 0.72, color: "#F59E0B" },
    { token: "London", prob: 0.14, color: "#F59E0B99" },
    { token: "France", prob: 0.08, color: "#F59E0B66" },
    { token: "Rome", prob: 0.04, color: "#F59E0B44" },
    { token: "Berlin", prob: 0.02, color: "#F59E0B33" },
  ];
  const [temp, setTemp] = useState(1.0);
  const softmax = (logits, t) => {
    const scaled = logits.map((l) => l / t);
    const maxL = Math.max(...scaled);
    const exps = scaled.map((l) => Math.exp(l - maxL));
    const sum = exps.reduce((a, b) => a + b, 0);
    return exps.map((e) => e / sum);
  };
  const rawLogits = [3.2, 1.8, 1.2, 0.7, 0.3];
  const probs = softmax(rawLogits, temp);

  return (
    <div>
      <div style={{ color: "#aaa", fontSize: 13, marginBottom: 6 }}>
        Prompt: <em style={{ color: "#fff" }}>&quot;The capital of France is ___&quot;</em>
      </div>
      <div style={{ color: "#aaa", fontSize: 13, marginBottom: 20 }}>
        Top next-token predictions (adjust temperature to see its effect):
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        {candidates.map((c, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 56, fontFamily: "monospace", fontSize: 13, color: i === 0 ? "#F59E0B" : "#666", fontWeight: i === 0 ? 700 : 400 }}>
              {c.token}
            </div>
            <div style={{ flex: 1, background: "#111", borderRadius: 4, height: 22, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${probs[i] * 100}%`,
                  background: "linear-gradient(90deg, #F59E0B, #D97706)",
                  opacity: 0.3 + probs[i] * 0.7,
                  borderRadius: 4,
                  transition: "width 0.4s ease",
                }}
              />
            </div>
            <div style={{ width: 46, textAlign: "right", fontFamily: "monospace", fontSize: 12, color: "#555" }}>
              {(probs[i] * 100).toFixed(1)}%
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#888", fontSize: 13 }}>
          Temperature: <strong style={{ color: "#F59E0B" }}>{temp.toFixed(1)}</strong>
        </span>
        <span style={{ color: "#555", fontSize: 11 }}>
          {temp < 0.5 ? "Very deterministic" : temp < 1 ? "Focused" : temp < 1.5 ? "Balanced" : "Creative / random"}
        </span>
      </div>
      <input
        type="range"
        min="0.1"
        max="2"
        step="0.1"
        value={temp}
        onChange={(e) => setTemp(parseFloat(e.target.value))}
        style={{ width: "100%", accentColor: "#F59E0B" }}
      />
      <div style={{ marginTop: 20, padding: "12px 16px", background: "#F59E0B10", border: "1px solid #F59E0B30", borderRadius: 8, fontSize: 12, color: "#888" }}>
        This sampling repeats <strong style={{ color: "#F59E0B" }}>token by token</strong> until an end-of-sequence token or max length is reached. The whole response is generated autoregressively.
      </div>
    </div>
  );
}
