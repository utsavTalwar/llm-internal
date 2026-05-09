"use client";

import { useState } from "react";

export function CausalMaskBuilder() {
  const tokens = ["I", "love", "Paris", "→?"];
  const [showMask, setShowMask] = useState(true);

  return (
    <div style={{ padding: "16px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ color: "#666", fontSize: 11 }}>Causal mask (decoder-only)</span>
        <button
          onClick={() => setShowMask(!showMask)}
          style={{
            background: showMask ? "#EC489922" : "#111",
            border: `1px solid ${showMask ? "#EC4899" : "#333"}`,
            borderRadius: 4,
            color: showMask ? "#EC4899" : "#555",
            padding: "4px 12px",
            cursor: "pointer",
            fontSize: 11,
          }}
        >
          {showMask ? "Masked" : "Unmasked"}
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: `40px repeat(${tokens.length}, 1fr)`, gap: 3 }}>
        {/* Header */}
        <div style={{ color: "#333", fontSize: 9, textAlign: "center" }}>can see →</div>
        {tokens.map((t, i) => (
          <div key={i} style={{ textAlign: "center", color: "#EC4899", fontSize: 10, fontFamily: "monospace" }}>{t}</div>
        ))}

        {/* Grid */}
        {tokens.map((rowToken, ri) => (
          <>
            <div key={`label-${ri}`} style={{ color: "#555", fontSize: 10, fontFamily: "monospace", display: "flex", alignItems: "center" }}>
              {rowToken}
            </div>
            {tokens.map((_, ci) => {
              const canSee = showMask ? ci <= ri : true;
              return (
                <div
                  key={`${ri}-${ci}`}
                  style={{
                    height: 28,
                    borderRadius: 4,
                    background: canSee ? "#EC489933" : "#111",
                    border: `1px solid ${canSee ? "#EC489955" : "#1a1a1a"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    color: canSee ? "#EC4899" : "#2a2a2a",
                    transition: "all 0.3s",
                  }}
                >
                  {canSee ? "✓" : "✗"}
                </div>
              );
            })}
          </>
        ))}
      </div>

      <div style={{ color: "#555", fontSize: 10, marginTop: 12 }}>
        {showMask
          ? "Each token can only see itself + past tokens (autoregressive)"
          : "Without mask: all tokens see everything (like encoder)"}
      </div>
    </div>
  );
}

export function CrossAttentionFlow() {
  const [step, setStep] = useState(0);
  const encoderTokens = ["Bonjour", "monde"];
  const decoderTokens = ["Hello", "world"];

  return (
    <div style={{ padding: "16px 0" }}>
      <div style={{ color: "#666", fontSize: 11, marginBottom: 16 }}>
        Cross-attention: decoder queries the encoder
      </div>

      <div style={{ display: "flex", gap: 20, alignItems: "stretch" }}>
        {/* Encoder */}
        <div style={{ flex: 1 }}>
          <div style={{ color: "#38BDF8", fontSize: 10, marginBottom: 8, fontFamily: "monospace" }}>ENCODER</div>
          <div style={{ background: "#38BDF811", border: "1px solid #38BDF833", borderRadius: 8, padding: 12 }}>
            {encoderTokens.map((t, i) => (
              <div
                key={i}
                style={{
                  padding: "6px 10px",
                  marginBottom: i < encoderTokens.length - 1 ? 6 : 0,
                  background: step > 0 ? "#38BDF822" : "#111",
                  borderRadius: 4,
                  color: "#38BDF8",
                  fontSize: 12,
                  fontFamily: "monospace",
                  transition: "background 0.3s",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div style={{ display: "flex", alignItems: "center", color: step > 1 ? "#A78BFA" : "#333", fontSize: 20, transition: "color 0.3s" }}>
          ⇢
        </div>

        {/* Decoder */}
        <div style={{ flex: 1 }}>
          <div style={{ color: "#A78BFA", fontSize: 10, marginBottom: 8, fontFamily: "monospace" }}>DECODER</div>
          <div style={{ background: "#A78BFA11", border: "1px solid #A78BFA33", borderRadius: 8, padding: 12 }}>
            {decoderTokens.map((t, i) => (
              <div
                key={i}
                style={{
                  padding: "6px 10px",
                  marginBottom: i < decoderTokens.length - 1 ? 6 : 0,
                  background: step > 1 && i <= step - 2 ? "#A78BFA22" : "#111",
                  borderRadius: 4,
                  color: "#A78BFA",
                  fontSize: 12,
                  fontFamily: "monospace",
                  transition: "background 0.3s",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
        {["Input", "Encode", "Decode 1", "Decode 2"].map((label, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            style={{
              background: step === i ? "#A78BFA22" : "#111",
              border: `1px solid ${step === i ? "#A78BFA" : "#222"}`,
              borderRadius: 4,
              color: step === i ? "#A78BFA" : "#555",
              padding: "4px 10px",
              cursor: "pointer",
              fontSize: 10,
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function RLHFPipeline() {
  const [stage, setStage] = useState(0);
  const stages = [
    { name: "Pretrain", desc: "Learn language from raw text", color: "#888" },
    { name: "SFT", desc: "Supervised fine-tuning on examples", color: "#38BDF8" },
    { name: "Reward Model", desc: "Learn human preferences", color: "#F59E0B" },
    { name: "RLHF", desc: "Optimize for high reward", color: "#22C55E" },
  ];

  return (
    <div style={{ padding: "16px 0" }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {stages.map((s, i) => (
          <div
            key={i}
            onClick={() => setStage(i)}
            style={{
              flex: 1,
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                height: 4,
                background: i <= stage ? s.color : "#222",
                borderRadius: 2,
                marginBottom: 6,
                transition: "background 0.3s",
              }}
            />
            <div style={{ color: i <= stage ? s.color : "#444", fontSize: 10, fontFamily: "monospace" }}>
              {s.name}
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: "#0a0a0a", borderRadius: 8, padding: 16, border: `1px solid ${stages[stage].color}33` }}>
        <div style={{ color: stages[stage].color, fontSize: 14, fontWeight: 600, marginBottom: 6 }}>
          {stages[stage].name}
        </div>
        <div style={{ color: "#888", fontSize: 12 }}>{stages[stage].desc}</div>
      </div>

      <div style={{ color: "#555", fontSize: 10, marginTop: 12 }}>
        This transforms GPT-4-base → ChatGPT (helpful assistant)
      </div>
    </div>
  );
}

export function ArchitectureComparison() {
  const [selected, setSelected] = useState("decoder");
  const archs = [
    { id: "encoder", name: "Encoder", models: "BERT", use: "Understanding", bidirectional: true, generates: false, color: "#38BDF8" },
    { id: "decoder", name: "Decoder", models: "GPT, Claude", use: "Generation", bidirectional: false, generates: true, color: "#EC4899" },
    { id: "encdec", name: "Enc-Dec", models: "T5, BART", use: "Transformation", bidirectional: true, generates: true, color: "#A78BFA" },
  ];

  const arch = archs.find((a) => a.id === selected);

  return (
    <div style={{ padding: "16px 0" }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {archs.map((a) => (
          <button
            key={a.id}
            onClick={() => setSelected(a.id)}
            style={{
              flex: 1,
              background: selected === a.id ? a.color + "22" : "#111",
              border: `1px solid ${selected === a.id ? a.color : "#222"}`,
              borderRadius: 6,
              color: selected === a.id ? a.color : "#555",
              padding: "8px 4px",
              cursor: "pointer",
              fontSize: 11,
              fontFamily: "monospace",
            }}
          >
            {a.name}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ background: "#0a0a0a", borderRadius: 6, padding: 12 }}>
          <div style={{ color: "#555", fontSize: 10, marginBottom: 4 }}>Bidirectional</div>
          <div style={{ color: arch.bidirectional ? "#22C55E" : "#EF4444", fontSize: 13, fontWeight: 600 }}>
            {arch.bidirectional ? "Yes" : "No (causal)"}
          </div>
        </div>
        <div style={{ background: "#0a0a0a", borderRadius: 6, padding: 12 }}>
          <div style={{ color: "#555", fontSize: 10, marginBottom: 4 }}>Generates text</div>
          <div style={{ color: arch.generates ? "#22C55E" : "#EF4444", fontSize: 13, fontWeight: 600 }}>
            {arch.generates ? "Yes" : "No"}
          </div>
        </div>
        <div style={{ background: "#0a0a0a", borderRadius: 6, padding: 12 }}>
          <div style={{ color: "#555", fontSize: 10, marginBottom: 4 }}>Example models</div>
          <div style={{ color: arch.color, fontSize: 13, fontWeight: 600 }}>{arch.models}</div>
        </div>
        <div style={{ background: "#0a0a0a", borderRadius: 6, padding: 12 }}>
          <div style={{ color: "#555", fontSize: 10, marginBottom: 4 }}>Best for</div>
          <div style={{ color: "#888", fontSize: 13, fontWeight: 600 }}>{arch.use}</div>
        </div>
      </div>
    </div>
  );
}
