"use client";

import { useState, useEffect, useRef } from "react";

export function VectorSpaceViz() {
  const [dragged, setDragged] = useState(null);
  const words = [
    { word: "King", x: 70, y: 20, color: "#FF6B35" },
    { word: "Queen", x: 80, y: 70, color: "#FF9F1C" },
    { word: "Man", x: 25, y: 25, color: "#FFBF69" },
    { word: "Woman", x: 35, y: 75, color: "#CBF3F0" },
    { word: "Apple", x: 85, y: 85, color: "#22C55E" },
    { word: "Banana", x: 80, y: 92, color: "#4ADE80" },
  ];

  return (
    <div style={{ padding: "16px 0" }}>
      <div style={{ color: "#666", fontSize: 11, marginBottom: 12 }}>
        2D projection of embedding space — similar concepts cluster together
      </div>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 200,
          background: "#0a0a0a",
          borderRadius: 8,
          border: "1px solid #1a1a1a",
          overflow: "hidden",
        }}
      >
        {/* Axes */}
        <div style={{ position: "absolute", left: 10, top: "50%", width: "calc(100% - 20px)", height: 1, background: "#1a1a1a" }} />
        <div style={{ position: "absolute", left: "50%", top: 10, width: 1, height: "calc(100% - 20px)", background: "#1a1a1a" }} />
        
        {/* Cluster labels */}
        <div style={{ position: "absolute", right: 12, top: 40, color: "#333", fontSize: 9, fontFamily: "monospace" }}>Royalty ↗</div>
        <div style={{ position: "absolute", right: 12, bottom: 12, color: "#333", fontSize: 9, fontFamily: "monospace" }}>Fruit ↘</div>
        <div style={{ position: "absolute", left: 12, top: 40, color: "#333", fontSize: 9, fontFamily: "monospace" }}>← Common</div>

        {/* Words */}
        {words.map((w, i) => (
          <div
            key={i}
            onMouseEnter={() => setDragged(i)}
            onMouseLeave={() => setDragged(null)}
            style={{
              position: "absolute",
              left: `${w.x}%`,
              top: `${w.y}%`,
              transform: "translate(-50%, -50%)",
              cursor: "default",
              transition: "transform 0.2s",
            }}
          >
            <div
              style={{
                width: dragged === i ? 10 : 8,
                height: dragged === i ? 10 : 8,
                borderRadius: "50%",
                background: w.color,
                boxShadow: dragged === i ? `0 0 12px ${w.color}` : "none",
                transition: "all 0.2s",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 12,
                left: "50%",
                transform: "translateX(-50%)",
                color: w.color,
                fontSize: 10,
                fontFamily: "monospace",
                whiteSpace: "nowrap",
                opacity: dragged === i ? 1 : 0.7,
              }}
            >
              {w.word}
            </div>
          </div>
        ))}
      </div>
      <div style={{ color: "#555", fontSize: 11, marginTop: 12, fontStyle: "italic" }}>
        King − Man + Woman ≈ Queen (vector arithmetic preserves relationships)
      </div>
    </div>
  );
}

export function PositionalEncodingViz() {
  const [position, setPosition] = useState(0);
  const dims = 8;
  
  const getEncoding = (pos, dim) => {
    const i = Math.floor(dim / 2);
    const angle = pos / Math.pow(10000, (2 * i) / dims);
    return dim % 2 === 0 ? Math.sin(angle) : Math.cos(angle);
  };

  return (
    <div style={{ padding: "16px 0" }}>
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ color: "#888", fontSize: 11 }}>Position: {position}</span>
          <span style={{ color: "#FF6B35", fontSize: 11, fontFamily: "monospace" }}>pos = {position}</span>
        </div>
        <input
          type="range"
          min="0"
          max="20"
          value={position}
          onChange={(e) => setPosition(parseInt(e.target.value))}
          style={{ width: "100%", accentColor: "#FF6B35" }}
        />
      </div>
      <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
        {Array.from({ length: dims }).map((_, d) => {
          const val = getEncoding(position, d);
          return (
            <div
              key={d}
              style={{
                flex: 1,
                height: 60,
                background: "#111",
                borderRadius: 4,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: `${(val + 1) * 50}%`,
                  background: `linear-gradient(180deg, #FF6B35, #FF6B3544)`,
                  transition: "height 0.3s",
                }}
              />
              <div style={{ position: "absolute", bottom: 2, left: 0, right: 0, textAlign: "center", fontSize: 8, color: "#555", fontFamily: "monospace" }}>
                {val.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ color: "#555", fontSize: 10, fontFamily: "monospace", textAlign: "center" }}>
        dim 0 · 1 · 2 · 3 · 4 · 5 · 6 · 7
      </div>
      <div style={{ color: "#666", fontSize: 11, marginTop: 12 }}>
        Each position gets a unique "fingerprint" added to its token embedding
      </div>
    </div>
  );
}

export function EmbeddingDimensions() {
  const models = [
    { name: "BERT-base", dims: 768, params: "110M", color: "#38BDF8" },
    { name: "GPT-2", dims: 1024, params: "117M", color: "#22C55E" },
    { name: "LLaMA 7B", dims: 4096, params: "7B", color: "#A855F7" },
    { name: "GPT-3", dims: 12288, params: "175B", color: "#EC4899" },
  ];
  const maxDims = 12288;

  return (
    <div style={{ padding: "16px 0" }}>
      <div style={{ color: "#666", fontSize: 11, marginBottom: 16 }}>
        Embedding dimensions scale with model size
      </div>
      {models.map((m, i) => (
        <div key={i} style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ color: m.color, fontSize: 12, fontFamily: "monospace" }}>{m.name}</span>
            <span style={{ color: "#555", fontSize: 11 }}>{m.dims.toLocaleString()} dims · {m.params}</span>
          </div>
          <div style={{ height: 8, background: "#111", borderRadius: 4, overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${(m.dims / maxDims) * 100}%`,
                background: m.color,
                borderRadius: 4,
                transition: "width 0.5s",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function KingQueenAnalogy() {
  const [step, setStep] = useState(0);
  const steps = [
    { label: "Start with King", vectors: [{ name: "King", x: 70, y: 30 }], op: "" },
    { label: "Subtract Man", vectors: [{ name: "King", x: 70, y: 30 }, { name: "−Man", x: 30, y: 35 }], op: "King − Man" },
    { label: "Add Woman", vectors: [{ name: "King−Man", x: 50, y: 32 }, { name: "+Woman", x: 40, y: 70 }], op: "King − Man + Woman" },
    { label: "≈ Queen!", vectors: [{ name: "Result", x: 75, y: 68 }, { name: "Queen", x: 80, y: 72 }], op: "≈ Queen" },
  ];

  useEffect(() => {
    if (step < steps.length - 1) {
      const t = setTimeout(() => setStep(s => s + 1), 1500);
      return () => clearTimeout(t);
    }
  }, [step]);

  const current = steps[step];

  return (
    <div style={{ padding: "16px 0" }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 140,
          background: "#0a0a0a",
          borderRadius: 8,
          border: "1px solid #1a1a1a",
          marginBottom: 12,
        }}
      >
        {current.vectors.map((v, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${v.x}%`,
              top: `${v.y}%`,
              transform: "translate(-50%, -50%)",
              transition: "all 0.5s",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: v.name.includes("−") ? "#EF4444" : v.name.includes("+") ? "#22C55E" : "#FF6B35",
                boxShadow: `0 0 8px ${v.name.includes("−") ? "#EF4444" : v.name.includes("+") ? "#22C55E" : "#FF6B35"}`,
              }}
            />
            <div style={{ position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)", color: "#888", fontSize: 10, fontFamily: "monospace", whiteSpace: "nowrap" }}>
              {v.name}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ color: "#FF6B35", fontSize: 13, fontFamily: "monospace" }}>{current.op || "—"}</div>
        <button onClick={() => setStep(0)} style={{ background: "transparent", border: "1px solid #222", borderRadius: 4, color: "#555", padding: "4px 10px", cursor: "pointer", fontSize: 10 }}>
          ↺ Replay
        </button>
      </div>
    </div>
  );
}
