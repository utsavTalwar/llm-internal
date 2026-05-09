"use client";

import { useState } from "react";

export function EmbedDemo() {
  const words = [
    { word: "King", vec: [0.9, 0.1, 0.8, 0.2], color: "#FF6B35" },
    { word: "Queen", vec: [0.85, 0.9, 0.75, 0.2], color: "#FF9F1C" },
    { word: "Man", vec: [0.8, 0.1, 0.3, 0.15], color: "#FFBF69" },
    { word: "Woman", vec: [0.75, 0.9, 0.28, 0.15], color: "#CBF3F0" },
    { word: "Apple", vec: [0.1, 0.05, 0.2, 0.9], color: "#22C55E" },
  ];
  const [hovered, setHovered] = useState(null);

  return (
    <div>
      <div style={{ color: "#aaa", fontSize: 13, marginBottom: 16 }}>
        Each token maps to a vector. Hover to inspect — notice King & Queen cluster together:
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {words.map((w, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              cursor: "default",
              background: hovered === i ? "#ffffff08" : "transparent",
              borderRadius: 8,
              padding: "6px 8px",
              transition: "background 0.2s",
            }}
          >
            <div
              style={{
                width: 72,
                color: w.color,
                fontWeight: 700,
                fontFamily: "monospace",
                fontSize: 14,
              }}
            >
              {w.word}
            </div>
            <div style={{ display: "flex", gap: 4, flex: 1 }}>
              {w.vec.map((v, j) => (
                <div
                  key={j}
                  style={{
                    height: 28,
                    flex: 1,
                    background: w.color,
                    opacity: 0.15 + v * 0.85,
                    borderRadius: 3,
                    transition: "opacity 0.3s",
                    position: "relative",
                  }}
                >
                  {hovered === i && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: -18,
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontSize: 9,
                        color: "#666",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {v.toFixed(2)}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div style={{ color: "#444", fontSize: 11, fontFamily: "monospace", whiteSpace: "nowrap", flexShrink: 0 }}>
              …{Math.floor(Math.random() * 4000 + 4000)} dims
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 28, color: "#555", fontSize: 12, fontStyle: "italic" }}>
        King − Man + Woman ≈ Queen (famous analogy in embedding space)
      </div>
    </div>
  );
}
