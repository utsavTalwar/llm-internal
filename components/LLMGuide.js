"use client";

import { useState } from "react";
import { TokenDemo } from "./TokenDemo";
import { EmbedDemo } from "./EmbedDemo";
import { AttentionDemo } from "./AttentionDemo";
import { LayerDemo } from "./LayerDemo";
import { ArchDemo } from "./ArchDemo";
import { OutputDemo } from "./OutputDemo";
import { LLMPipeline } from "./LLMPipeline";

const stages = [
  {
    id: "tokenization",
    label: "01 · Tokenization",
    title: "Breaking Text into Tokens",
    color: "#00E5FF",
    icon: "✂",
    description:
      "The model never sees raw text. Instead, words (and subwords) are split into tokens — numeric IDs from a fixed vocabulary. This bridges human language and math.",
    demo: "TokenDemo",
  },
  {
    id: "embedding",
    label: "02 · Embedding",
    title: "Tokens → Vectors",
    color: "#FF6B35",
    icon: "⟶",
    description:
      "Each token ID is looked up in a giant table to produce a high-dimensional vector (e.g. 4096 numbers). These vectors encode semantic meaning — similar words cluster together in this space.",
    demo: "EmbedDemo",
  },
  {
    id: "attention",
    label: "03 · Attention",
    title: "Self-Attention Mechanism",
    color: "#A855F7",
    icon: "👁",
    description:
      "The core of the Transformer. Every token looks at every other token and decides how much to 'attend' to it. This lets the model understand context — e.g. what 'it' refers to.",
    demo: "AttentionDemo",
  },
  {
    id: "layers",
    label: "04 · Transformer Layers",
    title: "Deep Stacked Processing",
    color: "#22C55E",
    icon: "⊞",
    description:
      "Attention + Feed-Forward networks are stacked many times (e.g. 96 layers in GPT-4). Each layer refines the representation, building from syntax → semantics → reasoning.",
    demo: "LayerDemo",
  },
  {
    id: "architecture",
    label: "05 · Architecture",
    title: "Three Ways to Wire a Transformer",
    color: "#EC4899",
    icon: "⇌",
    description:
      "Think of it like reading vs. writing. Some models read the whole input at once to understand it (like a student reading a paragraph). Others write one word at a time (like composing a sentence). A third type does both — reads first, then writes. Each style suits different tasks.",
    demo: "ArchDemo",
  },
  {
    id: "output",
    label: "06 · Output",
    title: "Predicting the Next Token",
    color: "#F59E0B",
    icon: "◎",
    description:
      "The final layer produces a probability distribution over the entire vocabulary. The model samples (or greedily picks) the most likely next token — and repeats until done.",
    demo: "OutputDemo",
  },
];

const demoMap = { TokenDemo, EmbedDemo, AttentionDemo, LayerDemo, ArchDemo, OutputDemo };

export default function LLMGuide() {
  const [active, setActive] = useState(0);
  const stage = stages[active];
  const Demo = demoMap[stage.demo];

  return (
    <div
      style={{
        color: "#fff",
        fontFamily: "'Georgia', serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "32px 0 24px",
          borderBottom: "1px solid #141414",
        }}
      >
        <div style={{ fontSize: 11, letterSpacing: 4, color: "#444", textTransform: "uppercase", marginBottom: 8 }}>
          Interactive Guide
        </div>
        <h1
          style={{
            margin: 0,
            fontSize: 28,
            fontWeight: 400,
            letterSpacing: -0.5,
            color: "#fff",
          }}
        >
          How LLMs Work Internally
        </h1>
        <p style={{ margin: "8px 0 0", color: "#555", fontSize: 14, fontFamily: "sans-serif" }}>
          From raw text to predicted tokens — a visual walkthrough
        </p>
      </div>

      <div style={{ display: "flex", flex: 1, marginTop: 24 }}>
        <div style={{ flexShrink: 0, borderRight: "1px solid #141414", paddingTop: 8 }}>
          <LLMPipeline active={active} onSelect={setActive} />
        </div>

        <div style={{ flex: 1, padding: "0 48px", overflowY: "auto" }}>
          <div style={{ maxWidth: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: stage.color + "22",
                  border: `1px solid ${stage.color}55`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  color: stage.color,
                }}
              >
                {stage.icon}
              </div>
              <div>
                <div style={{ fontSize: 11, color: stage.color, letterSpacing: 3, textTransform: "uppercase", fontFamily: "monospace" }}>
                  {stage.label}
                </div>
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 400, color: "#fff" }}>
                  {stage.title}
                </h2>
              </div>
            </div>

            <p style={{ color: "#777", fontSize: 14, lineHeight: 1.7, marginBottom: 32, fontFamily: "sans-serif" }}>
              {stage.description}
            </p>

            <div
              style={{
                background: "#0d0d0d",
                border: "1px solid #1c1c1c",
                borderRadius: 12,
                padding: "28px 28px",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: 3,
                  color: "#333",
                  textTransform: "uppercase",
                  fontFamily: "monospace",
                  marginBottom: 20,
                }}
              >
                Interactive Demo
              </div>
              <Demo key={active} />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 32,
              }}
            >
              <button
                onClick={() => setActive((a) => Math.max(0, a - 1))}
                disabled={active === 0}
                style={{
                  background: "transparent",
                  border: "1px solid #222",
                  borderRadius: 8,
                  color: active === 0 ? "#333" : "#888",
                  padding: "10px 20px",
                  cursor: active === 0 ? "not-allowed" : "pointer",
                  fontFamily: "monospace",
                  fontSize: 12,
                }}
              >
                ← Previous
              </button>
              <span style={{ color: "#333", fontFamily: "monospace", fontSize: 12, alignSelf: "center" }}>
                {active + 1} / {stages.length}
              </span>
              <button
                onClick={() => setActive((a) => Math.min(stages.length - 1, a + 1))}
                disabled={active === stages.length - 1}
                style={{
                  background: active === stages.length - 1 ? "transparent" : stage.color,
                  border: `1px solid ${active === stages.length - 1 ? "#222" : stage.color}`,
                  borderRadius: 8,
                  color: active === stages.length - 1 ? "#333" : "#000",
                  padding: "10px 20px",
                  cursor: active === stages.length - 1 ? "not-allowed" : "pointer",
                  fontFamily: "monospace",
                  fontSize: 12,
                  fontWeight: 700,
                  transition: "all 0.2s",
                }}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
