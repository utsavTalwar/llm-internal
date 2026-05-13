"use client";

import { useState, useEffect } from "react";

export function TokenDemo() {
  const sentence = "The quick brown fox";
  const tokens = [
    { text: "The", id: 464 },
    { text: " quick", id: 4996 },
    { text: " brown", id: 7586 },
    { text: " fox", id: 21831 },
  ];
  const [revealed, setRevealed] = useState([]);
  const [step, setStep] = useState(0);

  useEffect(() => {
    setRevealed([]);
    setStep(0);
  }, []);

  useEffect(() => {
    if (step < tokens.length) {
      const t = setTimeout(() => {
        setRevealed((r) => [...r, step]);
        setStep((s) => s + 1);
      }, 350);
      return () => clearTimeout(t);
    }
  }, [step, tokens.length]);

  const reset = () => { setRevealed([]); setStep(0); };

  return (
    <div style={{ fontFamily: "'Courier New', monospace" }}>
      <div style={{ marginBottom: 20, color: "#aaa", fontSize: 13 }}>
        Input sentence:
      </div>
      <div
        style={{
          background: "#0a0a0a",
          border: "1px solid #222",
          borderRadius: 8,
          padding: "14px 18px",
          fontSize: 20,
          color: "#fff",
          marginBottom: 24,
          letterSpacing: 1,
        }}
      >
        {sentence}
      </div>
      <div style={{ color: "#aaa", fontSize: 13, marginBottom: 12 }}>Tokens:</div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
        {tokens.map((tok, i) => (
          <div
            key={i}
            style={{
              opacity: revealed.includes(i) ? 1 : 0.1,
              transition: "all 0.4s ease",
              transform: revealed.includes(i) ? "translateY(0)" : "translateY(10px)",
            }}
          >
            <div
              style={{
                background: "#00E5FF22",
                border: "1px solid #00E5FF55",
                borderRadius: 6,
                padding: "8px 14px",
                color: "#00E5FF",
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              {tok.text}
            </div>
            <div style={{ textAlign: "center", color: "#555", fontSize: 11, marginTop: 4 }}>
              #{tok.id}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={reset}
        style={{
          background: "transparent",
          border: "1px solid #333",
          borderRadius: 6,
          color: "#888",
          padding: "6px 16px",
          cursor: "pointer",
          fontSize: 12,
        }}
      >
        ↺ Replay
      </button>
    </div>
  );
}
