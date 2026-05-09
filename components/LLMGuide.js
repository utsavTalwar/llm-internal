"use client";

import { useState, useEffect } from "react";
import { TokenDemo } from "./TokenDemo";
import { EmbedDemo } from "./EmbedDemo";
import { AttentionDemo } from "./AttentionDemo";
import { LayerDemo } from "./LayerDemo";
import { ArchDemo } from "./ArchDemo";
import { OutputDemo } from "./OutputDemo";
import DeepDive from "./DeepDive";

const icons = {
  tokenization: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12M6 21h12M3 12h18M3 6l3 6-3 6M21 6l-3 6 3 6"/>
    </svg>
  ),
  embedding: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="12" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="19" cy="19" r="2"/>
      <line x1="7" y1="12" x2="17" y2="5"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="7" y1="12" x2="17" y2="19"/>
    </svg>
  ),
  attention: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/>
    </svg>
  ),
  layers: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
      <polyline points="2 12 12 17 22 12"/>
      <polyline points="2 17 12 22 22 17"/>
    </svg>
  ),
  architecture: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="8" height="10" rx="1"/>
      <rect x="14" y="7" width="8" height="10" rx="1"/>
      <path d="M10 12h4M13 10l2 2-2 2"/>
    </svg>
  ),
  output: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18M3 9l9-6 9 6M5 21h14"/>
      <circle cx="12" cy="14" r="2"/>
    </svg>
  ),
};

const stages = [
  {
    id: "tokenization",
    label: "01 · Tokenization",
    shortLabel: "Tokens",
    title: "Breaking Text into Tokens",
    color: "#00E5FF",
    icon: icons.tokenization,
    description:
      "Before anything happens, the AI has to convert your words into numbers — because computers only understand math. It chops your sentence into small pieces called tokens (think of them like puzzle pieces), then assigns each one a number. A token can be a whole word, part of a word, or even just punctuation.",
    demo: "TokenDemo",
  },
  {
    id: "embedding",
    label: "02 · Embedding",
    shortLabel: "Embed",
    title: "Giving Numbers Meaning",
    color: "#FF6B35",
    icon: icons.embedding,
    description:
      "A raw number like 4996 doesn't carry any meaning. So each token number gets swapped for a list of hundreds of decimal numbers called a vector (or embedding). Think of it as a coordinate in a map of meaning — words with similar meanings land close together. 'King' and 'Queen' are neighbours; 'Apple' is far away.",
    demo: "EmbedDemo",
  },
  {
    id: "attention",
    label: "03 · Attention",
    shortLabel: "Attention",
    title: "Understanding Context",
    color: "#A855F7",
    icon: icons.attention,
    description:
      "Words mean different things depending on what's around them — 'bank' next to 'river' vs 'bank' next to 'money'. The attention mechanism lets every word look at every other word in the sentence and decide which ones are most relevant to understanding it. This is the heart of modern AI language models.",
    demo: "AttentionDemo",
  },
  {
    id: "layers",
    label: "04 · Transformer Layers",
    shortLabel: "Layers",
    title: "Thinking Deeper, Step by Step",
    color: "#22C55E",
    icon: icons.layers,
    description:
      "Attention + a small neural network are stacked on top of each other dozens or even hundreds of times. Each pass refines the model's understanding — early layers pick up basic grammar, middle layers understand meaning, and the deepest layers handle complex reasoning. GPT-4 has 96 of these stacked layers.",
    demo: "LayerDemo",
  },
  {
    id: "architecture",
    label: "05 · Architecture",
    shortLabel: "Arch",
    title: "Three Ways to Wire a Transformer",
    color: "#EC4899",
    icon: icons.architecture,
    description:
      "Think of it like reading vs. writing. Some models are built only to read and understand (like BERT). Others are built only to write, one word at a time (like GPT and Claude). A third type reads first, then writes — useful for tasks like translation. The design choice shapes everything the model can and can't do.",
    demo: "ArchDemo",
  },
  {
    id: "output",
    label: "06 · Output",
    shortLabel: "Output",
    title: "Choosing the Next Word",
    color: "#F59E0B",
    icon: icons.output,
    description:
      "At every step, the model looks at everything it has written so far and produces a ranked list of every word it knows, with a score for each. It picks one word, adds it to the sentence, and repeats — that's how 'The capital of France is' becomes 'The capital of France is Paris.' One word at a time, from start to finish.",
    demo: "OutputDemo",
  },
];

const demoMap = { TokenDemo, EmbedDemo, AttentionDemo, LayerDemo, ArchDemo, OutputDemo };

export default function LLMGuide() {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const stage = stages[active];
  const Demo = demoMap[stage.demo];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080808",
        color: "#fff",
        fontFamily: "'Georgia', serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: isMobile ? "20px 16px 16px" : "32px 40px 24px",
          borderBottom: "1px solid #141414",
        }}
      >
        <div style={{ fontSize: 10, letterSpacing: 3, color: "#444", textTransform: "uppercase", marginBottom: 6, fontFamily: "monospace" }}>
          Interactive Guide
        </div>
        <h1
          style={{
            margin: 0,
            fontSize: isMobile ? 20 : 28,
            fontWeight: 400,
            letterSpacing: -0.5,
            color: "#fff",
          }}
        >
          How LLMs Work Internally
        </h1>
        <p style={{ margin: "6px 0 0", color: "#555", fontSize: isMobile ? 12 : 14, fontFamily: "sans-serif" }}>
          From raw text to predicted tokens — a visual walkthrough
        </p>
      </div>

      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar — desktop only */}
        {!isMobile && (
          <div
            style={{
              width: 240,
              borderRight: "1px solid #141414",
              padding: "28px 0",
              flexShrink: 0,
            }}
          >
            <div style={{ fontSize: 10, color: "#333", letterSpacing: 2, textTransform: "uppercase", marginBottom: 20, padding: "0 24px", fontFamily: "monospace" }}>
              Pipeline
            </div>
            {stages.map((s, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column" }}>
                <div
                  onClick={() => setActive(i)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "6px 20px",
                    cursor: "pointer",
                    background: active === i ? "#ffffff08" : "transparent",
                    borderLeft: `3px solid ${active === i ? s.color : "transparent"}`,
                    transition: "all 0.2s",
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      background: active === i ? s.color : "#1a1a1a",
                      border: `1px solid ${active >= i ? s.color + "66" : "#222"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s",
                      color: active === i ? "#000" : active > i ? s.color : "#444",
                    }}
                  >
                    {active > i ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <span style={{ display: "flex", alignItems: "center", justifyContent: "center", transform: "scale(0.7)" }}>
                        {s.icon}
                      </span>
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: 12,
                      fontFamily: "monospace",
                      letterSpacing: 0.5,
                      color: active === i ? "#fff" : active > i ? "#666" : "#555",
                      transition: "color 0.2s",
                    }}
                  >
                    {s.label}
                  </span>
                </div>
                {i < stages.length - 1 && (
                  <div
                    style={{
                      width: 1,
                      height: 14,
                      background: active > i ? s.color + "55" : "#1c1c1c",
                      marginLeft: 38,
                      transition: "background 0.3s",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Main content */}
        <div
          style={{
            flex: 1,
            padding: isMobile ? "24px 16px" : "40px 48px",
            overflowY: "auto",
            paddingBottom: isMobile ? 96 : 40, // room for bottom nav
          }}
        >
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            {/* Stage header */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div
                style={{
                  flexShrink: 0,
                  width: isMobile ? 36 : 44,
                  height: isMobile ? 36 : 44,
                  borderRadius: "50%",
                  background: stage.color + "22",
                  border: `1px solid ${stage.color}55`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: stage.color,
                }}
              >
                {stage.icon}
              </div>
              <div>
                <div style={{ fontSize: 10, color: stage.color, letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace" }}>
                  {stage.label}
                </div>
                <h2 style={{ margin: 0, fontSize: isMobile ? 18 : 22, fontWeight: 400, color: "#fff" }}>
                  {stage.title}
                </h2>
              </div>
            </div>

            <p style={{ color: "#777", fontSize: isMobile ? 13 : 14, lineHeight: 1.7, marginBottom: 28, fontFamily: "sans-serif" }}>
              {stage.description}
            </p>

            {/* Interactive demo */}
            <div
              style={{
                background: "#0d0d0d",
                border: "1px solid #1c1c1c",
                borderRadius: 12,
                padding: isMobile ? "20px 16px" : "28px 28px",
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

            {/* Deep dive */}
            <DeepDive key={active} stageId={stage.id} color={stage.color} />

            {/* Navigation */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, gap: 12 }}>
              <button
                onClick={() => setActive((a) => Math.max(0, a - 1))}
                disabled={active === 0}
                style={{
                  flex: isMobile ? 1 : "unset",
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
              <span style={{ color: "#333", fontFamily: "monospace", fontSize: 12, alignSelf: "center", flexShrink: 0 }}>
                {active + 1} / {stages.length}
              </span>
              <button
                onClick={() => setActive((a) => Math.min(stages.length - 1, a + 1))}
                disabled={active === stages.length - 1}
                style={{
                  flex: isMobile ? 1 : "unset",
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

      {/* Mobile bottom tab bar */}
      {isMobile && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background: "#0d0d0d",
            borderTop: "1px solid #1a1a1a",
            display: "flex",
            zIndex: 100,
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
        >
          {stages.map((s, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                padding: "10px 2px 8px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: active === i ? s.color : active > i ? s.color + "22" : "#1a1a1a",
                  border: `1px solid ${active >= i ? s.color + "55" : "#222"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: active === i ? "#000" : active > i ? s.color : "#444",
                  transition: "all 0.2s",
                }}
              >
                {active > i ? (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <span style={{ display: "flex", transform: "scale(0.65)" }}>{s.icon}</span>
                )}
              </div>
              <span style={{ fontSize: 8, fontFamily: "monospace", color: active === i ? s.color : "#444", letterSpacing: 0.3 }}>
                {s.shortLabel}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Fixed attribution — bottom left (above mobile nav) */}
      <div style={{ position: "fixed", bottom: isMobile ? 72 : 20, left: 16, fontSize: 10, fontFamily: "monospace", letterSpacing: 1, color: "#2e2e2e", zIndex: 50 }}>
        built by{" "}
        <a
          href="https://www.linkedin.com/in/utsav-talwar/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#444", textDecoration: "none", borderBottom: "1px solid #2e2e2e", paddingBottom: 1, transition: "color 0.2s, border-color 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.color = "#aaa"; e.currentTarget.style.borderColor = "#666"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "#444"; e.currentTarget.style.borderColor = "#2e2e2e"; }}
        >
          Utsav Talwar
        </a>
      </div>
    </div>
  );
}

