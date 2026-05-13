"use client";

import { useState } from "react";

export function LayerDemo() {
  const layers = [
    { name: "Layer 1–4", role: "Surface patterns", detail: "Punctuation, capitalization, adjacent word pairs", color: "#22C55E" },
    { name: "Layer 5–16", role: "Syntax & structure", detail: "POS tagging, phrase boundaries, dependency arcs", color: "#4ADE80" },
    { name: "Layer 17–40", role: "Semantics", detail: "Named entities, coreference, word sense disambiguation", color: "#86EFAC" },
    { name: "Layer 41–80", role: "Reasoning & context", detail: "Multi-hop inference, long-range dependencies, world knowledge", color: "#BBF7D0" },
    { name: "Layer 81–96", role: "Task-specific", detail: "Format, style, instruction following, output planning", color: "#DCFCE7" },
  ];
  const [expanded, setExpanded] = useState(null);

  return (
    <div>
      <div style={{ color: "#aaa", fontSize: 13, marginBottom: 20 }}>
        Click any layer group to see what it learns:
      </div>
      <div style={{ position: "relative", paddingLeft: 24 }}>
        <div
          style={{
            position: "absolute",
            left: 10,
            top: 0,
            bottom: 0,
            width: 2,
            background: "linear-gradient(180deg, #22C55E, #BBF7D0)",
            borderRadius: 1,
          }}
        />
        {layers.map((l, i) => (
          <div
            key={i}
            onClick={() => setExpanded(expanded === i ? null : i)}
            style={{
              marginBottom: 10,
              cursor: "pointer",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: -20,
                top: 14,
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: l.color,
                boxShadow: `0 0 8px ${l.color}`,
              }}
            />
            <div
              style={{
                background: expanded === i ? "#ffffff08" : "#0d0d0d",
                border: `1px solid ${expanded === i ? l.color + "66" : "#222"}`,
                borderRadius: 8,
                padding: "12px 16px",
                transition: "all 0.25s",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ color: l.color, fontFamily: "monospace", fontSize: 13, fontWeight: 700 }}>
                    {l.name}
                  </span>
                  <span style={{ color: "#888", fontSize: 13, marginLeft: 12 }}>{l.role}</span>
                </div>
                <span style={{ color: "#444", fontSize: 16 }}>{expanded === i ? "-" : "+"}</span>
              </div>
              {expanded === i && (
                <div
                  style={{
                    marginTop: 10,
                    paddingTop: 10,
                    borderTop: "1px solid #222",
                    color: "#aaa",
                    fontSize: 13,
                    lineHeight: 1.6,
                  }}
                >
                  {l.detail}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, color: "#555", fontSize: 12 }}>
        Each layer = Multi-Head Attention → Add & Norm → Feed-Forward Network → Add & Norm
      </div>
    </div>
  );
}
