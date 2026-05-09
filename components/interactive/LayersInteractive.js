"use client";

import { useState, useEffect } from "react";

export function ResidualFlow() {
  const [showSkip, setShowSkip] = useState(true);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  // Run once on mount, stop at 100
  useEffect(() => {
    setProgress(0);
    setDone(false);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 99) {
          clearInterval(interval);
          setDone(true);
          return 100;
        }
        return p + 1;
      });
    }, 22);
    return () => clearInterval(interval);
  }, [showSkip]); // re-run animation when toggle changes

  // SVG coordinate system — smaller canvas
  const W = 340, H = 120;
  const startX = 30, midY = H / 2;
  const addX = W - 60;
  const boxW = 64, boxH = 28;
  const boxX = W / 2 - boxW / 2, boxY = midY - boxH / 2;

  const t = Math.min(progress / 100, 1);

  // Main dot along horizontal
  const mainDotX = startX + t * (addX - startX);

  // Skip dot along bezier arc
  const bt = t;
  const arcCtrlY = 18;
  const arcX =
    Math.pow(1 - bt, 3) * startX +
    3 * Math.pow(1 - bt, 2) * bt * startX +
    3 * (1 - bt) * Math.pow(bt, 2) * addX +
    Math.pow(bt, 3) * addX;
  const arcY =
    Math.pow(1 - bt, 3) * midY +
    3 * Math.pow(1 - bt, 2) * bt * arcCtrlY +
    3 * (1 - bt) * Math.pow(bt, 2) * arcCtrlY +
    Math.pow(bt, 3) * midY;

  const nearEnd = t > 0.85;
  const plusColor = done ? "#22C55E" : nearEnd && showSkip ? "#22C55E" : showSkip ? "#22C55E55" : "#444";

  return (
    <div style={{ padding: "12px 0" }}>
      {/* Header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ color: "#888", fontSize: 11, fontFamily: "monospace" }}>
          output ={" "}
          <span style={{ color: showSkip ? "#22C55E" : "#60A5FA" }}>
            {showSkip ? "x + f(x)" : "f(x)"}
          </span>
        </span>
        <button
          onClick={() => setShowSkip((s) => !s)}
          style={{
            background: showSkip ? "#22C55E18" : "#111",
            border: `1px solid ${showSkip ? "#22C55E" : "#444"}`,
            borderRadius: 4,
            color: showSkip ? "#22C55E" : "#666",
            padding: "3px 10px",
            cursor: "pointer",
            fontSize: 10,
            transition: "all 0.2s",
          }}
        >
          Skip: {showSkip ? "ON" : "OFF"}
        </button>
      </div>

      {/* SVG diagram */}
      <svg
        width="100%"
        viewBox={`0 0 ${W} ${H}`}
        style={{ background: "#0a0a0a", borderRadius: 8, border: "1px solid #1a1a1a", display: "block", maxHeight: 120 }}
      >
        {/* Main horizontal line */}
        <line x1={startX} y1={midY} x2={addX - 11} y2={midY} stroke="#2a2a2a" strokeWidth={2} />
        {/* Output line */}
        <line x1={addX + 11} y1={midY} x2={W - 8} y2={midY} stroke="#2a2a2a" strokeWidth={2} />

        {/* Skip arc (dashed) */}
        {showSkip && (
          <path
            d={`M ${startX} ${midY} C ${startX} ${arcCtrlY}, ${addX} ${arcCtrlY}, ${addX} ${midY}`}
            fill="none"
            stroke="#22C55E33"
            strokeWidth={1.5}
            strokeDasharray="4 3"
          />
        )}

        {/* f(x) box */}
        <rect x={boxX} y={boxY} width={boxW} height={boxH} rx={5} fill="#111" stroke="#2a2a2a" strokeWidth={1.5} />
        <text x={W / 2} y={midY + 4} fill="#555" fontSize={10} textAnchor="middle" fontFamily="monospace">f(x)</text>

        {/* Plus node */}
        <circle cx={addX} cy={midY} r={11} fill="#111" stroke={plusColor} strokeWidth={1.5} />
        <text x={addX} y={midY + 4} fill={plusColor} fontSize={13} textAnchor="middle">+</text>

        {/* Labels */}
        <text x={startX - 3} y={midY + 4} fill="#555" fontSize={10} textAnchor="end" fontFamily="monospace">x</text>
        <text x={W - 6} y={midY + 4} fill={showSkip ? "#22C55E" : "#555"} fontSize={9} textAnchor="end" fontFamily="monospace">
          {showSkip ? "x+f(x)" : "f(x)"}
        </text>

        {/* Animated dots — hidden once done */}
        {!done && (
          <>
            {/* Main path dot (blue) */}
            <circle cx={mainDotX} cy={midY} r={4} fill="#60A5FA" />
            <circle cx={mainDotX} cy={midY} r={7} fill="none" stroke="#60A5FA" strokeWidth={1} opacity={0.2} />

            {/* Skip path dot (green) */}
            {showSkip && (
              <>
                <circle cx={arcX} cy={arcY} r={4} fill="#22C55E" />
                <circle cx={arcX} cy={arcY} r={7} fill="none" stroke="#22C55E" strokeWidth={1} opacity={0.2} />
              </>
            )}
          </>
        )}

        {/* Merged glow at + when done */}
        {done && (
          <circle cx={addX} cy={midY} r={11} fill="none" stroke="#22C55E" strokeWidth={2} opacity={0.6} />
        )}
      </svg>

      {/* Legend */}
      <div style={{ display: "flex", gap: 16, marginTop: 8, fontSize: 10 }}>
        <span style={{ color: "#60A5FA" }}>● through f(x)</span>
        {showSkip && <span style={{ color: "#22C55E" }}>● skip (x direct)</span>}
      </div>

      <div style={{ color: "#555", fontSize: 10, marginTop: 6 }}>
        {showSkip
          ? "✓ Both paths merge at + — gradient always has a direct route back"
          : "✗ No skip — gradient must pass through every layer (can vanish)"}
      </div>
    </div>
  );
}

export function LayerNormViz() {
  const [values, setValues] = useState([3.2, -1.5, 0.8, 2.1, -0.3]);
  
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;
  const std = Math.sqrt(variance);
  const normalized = values.map(v => (v - mean) / (std + 1e-5));

  const randomize = () => {
    setValues(Array.from({ length: 5 }, () => (Math.random() - 0.5) * 10));
  };

  return (
    <div style={{ padding: "16px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ color: "#666", fontSize: 11 }}>Activations before / after LayerNorm</span>
        <button onClick={randomize} style={{ background: "transparent", border: "1px solid #222", borderRadius: 4, color: "#555", padding: "4px 10px", cursor: "pointer", fontSize: 10 }}>
          Randomize
        </button>
      </div>

      <div style={{ display: "flex", gap: 24 }}>
        {/* Before */}
        <div style={{ flex: 1 }}>
          <div style={{ color: "#555", fontSize: 10, marginBottom: 8 }}>Before</div>
          <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 80 }}>
            {values.map((v, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${Math.abs(v) * 8 + 10}px`,
                  background: v >= 0 ? "#22C55E44" : "#EF444444",
                  borderRadius: 3,
                  transition: "height 0.3s",
                }}
              />
            ))}
          </div>
          <div style={{ color: "#444", fontSize: 9, marginTop: 4, fontFamily: "monospace" }}>
            μ={mean.toFixed(1)}, σ={std.toFixed(1)}
          </div>
        </div>

        {/* Arrow */}
        <div style={{ display: "flex", alignItems: "center", color: "#333", fontSize: 16 }}>→</div>

        {/* After */}
        <div style={{ flex: 1 }}>
          <div style={{ color: "#555", fontSize: 10, marginBottom: 8 }}>After</div>
          <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 80 }}>
            {normalized.map((v, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${Math.abs(v) * 20 + 10}px`,
                  background: v >= 0 ? "#22C55E" : "#EF4444",
                  borderRadius: 3,
                  transition: "height 0.3s",
                }}
              />
            ))}
          </div>
          <div style={{ color: "#22C55E", fontSize: 9, marginTop: 4, fontFamily: "monospace" }}>
            μ≈0, σ≈1
          </div>
        </div>
      </div>
    </div>
  );
}

export function FFNExpansion() {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ padding: "16px 0" }}>
      <div style={{ color: "#666", fontSize: 11, marginBottom: 16 }}>
        FFN expands dimension 4×, then compresses back
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, padding: "20px 0" }}>
        {/* Input */}
        <div
          onMouseEnter={() => setHovered("in")}
          onMouseLeave={() => setHovered(null)}
          style={{
            width: 40,
            height: 80,
            background: hovered === "in" ? "#22C55E33" : "#22C55E22",
            border: "1px solid #22C55E55",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
          }}
        >
          <span style={{ color: "#22C55E", fontSize: 10, fontFamily: "monospace" }}>d</span>
        </div>

        <span style={{ color: "#333" }}>→</span>

        {/* Expanded */}
        <div
          onMouseEnter={() => setHovered("exp")}
          onMouseLeave={() => setHovered(null)}
          style={{
            width: 40,
            height: 160,
            background: hovered === "exp" ? "#F59E0B33" : "#F59E0B22",
            border: "1px solid #F59E0B55",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
          }}
        >
          <span style={{ color: "#F59E0B", fontSize: 10, fontFamily: "monospace" }}>4d</span>
        </div>

        <span style={{ color: "#333" }}>→</span>

        {/* Output */}
        <div
          onMouseEnter={() => setHovered("out")}
          onMouseLeave={() => setHovered(null)}
          style={{
            width: 40,
            height: 80,
            background: hovered === "out" ? "#A855F733" : "#A855F722",
            border: "1px solid #A855F755",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
          }}
        >
          <span style={{ color: "#A855F7", fontSize: 10, fontFamily: "monospace" }}>d</span>
        </div>
      </div>

      <div style={{ textAlign: "center", color: "#555", fontSize: 10, fontFamily: "monospace" }}>
        {hovered === "in" && "Input: 8,192 dims (LLaMA 70B)"}
        {hovered === "exp" && "Hidden: 32,768 dims (4× expansion)"}
        {hovered === "out" && "Output: 8,192 dims (back to original)"}
        {!hovered && "Hover to see dimensions"}
      </div>
    </div>
  );
}

export function ScalingLawChart() {
  const [compute, setCompute] = useState(50);
  
  const loss = 2.5 * Math.pow(compute / 100, -0.076);
  
  const models = [
    { name: "GPT-2", compute: 10, loss: 3.3 },
    { name: "GPT-3", compute: 40, loss: 2.8 },
    { name: "GPT-4", compute: 80, loss: 2.2 },
  ];

  return (
    <div style={{ padding: "16px 0" }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ color: "#888", fontSize: 11 }}>Compute scale</span>
          <span style={{ color: "#22C55E", fontSize: 11, fontFamily: "monospace" }}>
            Loss: {loss.toFixed(2)}
          </span>
        </div>
        <input
          type="range"
          min="5"
          max="100"
          value={compute}
          onChange={(e) => setCompute(parseInt(e.target.value))}
          style={{ width: "100%", accentColor: "#22C55E" }}
        />
      </div>

      <div style={{ position: "relative", height: 120, background: "#0a0a0a", borderRadius: 8, border: "1px solid #1a1a1a", padding: "10px 10px 30px 40px" }}>
        {/* Y axis */}
        <div style={{ position: "absolute", left: 8, top: 10, bottom: 30, width: 1, background: "#222" }} />
        <div style={{ position: "absolute", left: 4, top: 8, color: "#444", fontSize: 8 }}>High</div>
        <div style={{ position: "absolute", left: 4, bottom: 30, color: "#444", fontSize: 8 }}>Low</div>
        
        {/* X axis */}
        <div style={{ position: "absolute", left: 40, right: 10, bottom: 24, height: 1, background: "#222" }} />
        <div style={{ position: "absolute", left: "50%", bottom: 8, color: "#444", fontSize: 8, transform: "translateX(-50%)" }}>Compute →</div>

        {/* Curve */}
        <svg style={{ position: "absolute", left: 40, top: 10, width: "calc(100% - 50px)", height: "calc(100% - 40px)" }}>
          <path
            d={`M 0,${80 * (1 - Math.pow(5/100, -0.076) / 1.5)} ${Array.from({ length: 20 }, (_, i) => {
              const x = (i + 1) * 5;
              const y = 80 * (1 - (2.5 * Math.pow(x / 100, -0.076)) / 4);
              return `L ${(x / 100) * 100}%,${y}`;
            }).join(" ")}`}
            stroke="#22C55E44"
            strokeWidth="2"
            fill="none"
          />
        </svg>

        {/* Current point */}
        <div
          style={{
            position: "absolute",
            left: `${40 + (compute / 100) * (100 - 50)}%`,
            top: `${10 + 80 * (1 - loss / 4)}%`,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#22C55E",
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 8px #22C55E",
            transition: "all 0.2s",
          }}
        />

        {/* Model markers */}
        {models.map((m, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${40 + (m.compute / 100) * (100 - 50)}%`,
              top: `${10 + 80 * (1 - m.loss / 4)}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#555" }} />
            <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", color: "#444", fontSize: 8, whiteSpace: "nowrap" }}>
              {m.name}
            </div>
          </div>
        ))}
      </div>

      <div style={{ color: "#555", fontSize: 10, marginTop: 12 }}>
        Scaling laws: loss follows a predictable power law with compute
      </div>
    </div>
  );
}
