"use client";

const stages = [
  { id: "tokenization", label: "Tokenization", color: "#00E5FF", icon: "✂" },
  { id: "embedding", label: "Embedding", color: "#FF6B35", icon: "⟶" },
  { id: "attention", label: "Attention", color: "#A855F7", icon: "👁" },
  { id: "layers", label: "Layers", color: "#22C55E", icon: "⊞" },
  { id: "architecture", label: "Architecture", color: "#EC4899", icon: "⇌" },
  { id: "output", label: "Output", color: "#F59E0B", icon: "◎" },
];

export function LLMPipeline({ active, onSelect }) {
  return (
    <div style={{ padding: "0 24px 0 0" }}>
      <div style={{ fontSize: 10, color: "#444", letterSpacing: 3, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 20 }}>
        Pipeline
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", position: "relative" }}>
        {/* Connecting line */}
        <div
          style={{
            position: "absolute",
            left: 21,
            top: 24,
            bottom: 24,
            width: 2,
            background: "#1a1a1a",
            zIndex: 0,
          }}
        />
        {/* Progress line */}
        <div
          style={{
            position: "absolute",
            left: 21,
            top: 24,
            height: `${(active / (stages.length - 1)) * 100}%`,
            width: 2,
            background: `linear-gradient(180deg, ${stages[0].color}, ${stages[Math.min(active, stages.length - 1)].color})`,
            zIndex: 1,
            transition: "height 0.5s cubic-bezier(0.4,0,0.2,1)",
          }}
        />

        {stages.map((s, i) => (
          <div
            key={s.id}
            style={{ display: "flex", alignItems: "center", position: "relative", zIndex: 2, marginBottom: i < stages.length - 1 ? 12 : 0 }}
          >
            {/* Node */}
            <div
              onClick={() => onSelect(i)}
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: active === i ? s.color : active > i ? s.color + "33" : "#111",
                border: `2px solid ${active >= i ? s.color : "#222"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                color: active === i ? "#000" : active > i ? s.color : "#444",
                fontWeight: active === i ? 700 : 400,
                boxShadow: active === i ? `0 0 16px ${s.color}44, 0 0 4px ${s.color}22` : "none",
                transform: active === i ? "scale(1.1)" : "scale(1)",
                flexShrink: 0,
              }}
            >
              {active > i ? "✓" : s.icon}
            </div>
            {/* Label + step number */}
            <div style={{ marginLeft: 14 }}>
              <div
                style={{
                  fontSize: 12,
                  fontFamily: "monospace",
                  letterSpacing: 0.5,
                  color: active === i ? s.color : active > i ? s.color + "99" : "#444",
                  transition: "color 0.3s",
                  fontWeight: active === i ? 700 : 400,
                  whiteSpace: "nowrap",
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  marginTop: 2,
                  fontSize: 9,
                  color: active >= i ? s.color + "66" : "#222",
                  fontFamily: "monospace",
                  transition: "color 0.3s",
                }}
              >
                0{i + 1}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
