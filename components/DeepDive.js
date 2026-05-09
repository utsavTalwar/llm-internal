"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const interactiveComponents = {
  // Tokenization
  BPEAnimation: dynamic(() => import("./interactive/TokenizationInteractive").then(m => m.BPEAnimation), { ssr: false }),
  VocabSizeCompare: dynamic(() => import("./interactive/TokenizationInteractive").then(m => m.VocabSizeCompare), { ssr: false }),
  SpecialTokensViz: dynamic(() => import("./interactive/TokenizationInteractive").then(m => m.SpecialTokensViz), { ssr: false }),
  TokenizationGotchas: dynamic(() => import("./interactive/TokenizationInteractive").then(m => m.TokenizationGotchas), { ssr: false }),
  // Embedding
  VectorSpaceViz: dynamic(() => import("./interactive/EmbeddingInteractive").then(m => m.VectorSpaceViz), { ssr: false }),
  PositionalEncodingViz: dynamic(() => import("./interactive/EmbeddingInteractive").then(m => m.PositionalEncodingViz), { ssr: false }),
  EmbeddingDimensions: dynamic(() => import("./interactive/EmbeddingInteractive").then(m => m.EmbeddingDimensions), { ssr: false }),
  KingQueenAnalogy: dynamic(() => import("./interactive/EmbeddingInteractive").then(m => m.KingQueenAnalogy), { ssr: false }),
  // Attention
  QKVExplainer: dynamic(() => import("./interactive/AttentionInteractive").then(m => m.QKVExplainer), { ssr: false }),
  AttentionHeatmap: dynamic(() => import("./interactive/AttentionInteractive").then(m => m.AttentionHeatmap), { ssr: false }),
  MultiHeadViz: dynamic(() => import("./interactive/AttentionInteractive").then(m => m.MultiHeadViz), { ssr: false }),
  ComplexityViz: dynamic(() => import("./interactive/AttentionInteractive").then(m => m.ComplexityViz), { ssr: false }),
  // Layers
  ResidualFlow: dynamic(() => import("./interactive/LayersInteractive").then(m => m.ResidualFlow), { ssr: false }),
  LayerNormViz: dynamic(() => import("./interactive/LayersInteractive").then(m => m.LayerNormViz), { ssr: false }),
  FFNExpansion: dynamic(() => import("./interactive/LayersInteractive").then(m => m.FFNExpansion), { ssr: false }),
  ScalingLawChart: dynamic(() => import("./interactive/LayersInteractive").then(m => m.ScalingLawChart), { ssr: false }),
  // Architecture
  CausalMaskBuilder: dynamic(() => import("./interactive/ArchitectureInteractive").then(m => m.CausalMaskBuilder), { ssr: false }),
  CrossAttentionFlow: dynamic(() => import("./interactive/ArchitectureInteractive").then(m => m.CrossAttentionFlow), { ssr: false }),
  RLHFPipeline: dynamic(() => import("./interactive/ArchitectureInteractive").then(m => m.RLHFPipeline), { ssr: false }),
  ArchitectureComparison: dynamic(() => import("./interactive/ArchitectureInteractive").then(m => m.ArchitectureComparison), { ssr: false }),
  // Output
  LogitsToProbs: dynamic(() => import("./interactive/OutputInteractive").then(m => m.LogitsToProbs), { ssr: false }),
  SamplingStrategies: dynamic(() => import("./interactive/OutputInteractive").then(m => m.SamplingStrategies), { ssr: false }),
  TemperatureDeep: dynamic(() => import("./interactive/OutputInteractive").then(m => m.TemperatureDeep), { ssr: false }),
  TrainingLoop: dynamic(() => import("./interactive/OutputInteractive").then(m => m.TrainingLoop), { ssr: false }),
};

function InteractiveLoader({ name }) {
  const Component = interactiveComponents[name];
  if (!Component) return null;
  return <Component />;
}

function AccordionItem({ section, index, color, isOpen, onToggle }) {

  return (
    <div
      style={{
        borderBottom: "1px solid #1a1a1a",
      }}
    >
      <button
        onClick={() => onToggle(index)}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          padding: "16px 0",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          textAlign: "left",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              fontSize: 10,
              fontFamily: "monospace",
              color: color,
              opacity: 0.6,
              minWidth: 20,
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span style={{ color: "#ccc", fontSize: 14, fontWeight: 500, fontFamily: "sans-serif" }}>
            {section.title}
          </span>
          {section.interactive && (
            <span style={{ fontSize: 9, color: color, opacity: 0.6, fontFamily: "monospace", padding: "2px 6px", background: color + "15", borderRadius: 4 }}>
              interactive
            </span>
          )}
        </div>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#444"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            flexShrink: 0,
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.25s ease",
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div style={{ paddingBottom: 20 }}>
          {/* Interactive component */}
          {section.interactive && (
            <div
              style={{
                background: "#050505",
                border: "1px solid #1a1a1a",
                borderRadius: 8,
                padding: "12px 16px",
                marginBottom: 16,
              }}
            >
              <InteractiveLoader name={section.interactive} />
            </div>
          )}

          {/* Main content */}
          <div
            style={{
              color: "#888",
              fontSize: 13.5,
              lineHeight: 1.85,
              fontFamily: "sans-serif",
              whiteSpace: "pre-wrap",
            }}
          >
            {section.content}
          </div>
        </div>
      )}
    </div>
  );
}

export default function DeepDive({ stageId, color }) {
  const [visible, setVisible] = useState(false);
  const [sections, setSections] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  const load = async () => {
    const { deepDiveContent } = await import("./deepDiveContent");
    setSections(deepDiveContent[stageId] || []);
    setOpenIndex(null);
    setVisible(true);
  };

  const hide = () => setVisible(false);

  return (
    <div style={{ marginTop: 32 }}>
      {!visible ? (
        <button
          onClick={load}
          className="go-deeper-btn"
          style={{
            background: "transparent",
            border: `1px solid #222`,
            borderRadius: 8,
            color: "#555",
            padding: "10px 20px",
            cursor: "pointer",
            fontFamily: "monospace",
            fontSize: 12,
            display: "flex",
            alignItems: "center",
            gap: 8,
            transition: "border-color 0.2s, color 0.2s",
            "--pulse-color": color,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = color + "88";
            e.currentTarget.style.color = color;
            e.currentTarget.style.animation = "none";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "";
            e.currentTarget.style.color = "#555";
            e.currentTarget.style.animation = "";
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          Go deeper
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
      ) : (
        <div>
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 4,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 2, height: 16, background: color, borderRadius: 1 }} />
              <span style={{ fontSize: 10, letterSpacing: 3, color: "#444", textTransform: "uppercase", fontFamily: "monospace" }}>
                In depth
              </span>
            </div>
            <button
              onClick={hide}
              style={{
                background: "transparent",
                border: "none",
                color: "#444",
                cursor: "pointer",
                fontFamily: "monospace",
                fontSize: 11,
                padding: "4px 8px",
              }}
            >
              collapse ↑
            </button>
          </div>

          {/* Accordion sections */}
          <div
            style={{
              background: "#0a0a0a",
              border: "1px solid #1a1a1a",
              borderRadius: 10,
              padding: "0 20px",
              marginTop: 12,
            }}
          >
            {sections && sections.map((section, i) => (
              <AccordionItem
                key={i}
                section={section}
                index={i}
                color={color}
                isOpen={openIndex === i}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
