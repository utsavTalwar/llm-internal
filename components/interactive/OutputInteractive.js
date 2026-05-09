"use client";

import { useState, useEffect } from "react";

export function LogitsToProbs() {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const logits = [3.2, 1.8, 1.2, 0.7, 0.3];
  const tokens = ["Paris", "London", "France", "Rome", "Berlin"];
  
  const expLogits = logits.map((l) => Math.exp(l));
  const sumExp = expLogits.reduce((a, b) => a + b, 0);
  const probs = expLogits.map((e) => e / sumExp);

  const steps = [
    { title: "Raw logits", values: logits, format: (v) => v.toFixed(1), color: "#F59E0B" },
    { title: "exp(logits)", values: expLogits, format: (v) => v.toFixed(1), color: "#A855F7" },
    { title: "Probabilities", values: probs, format: (v) => (v * 100).toFixed(0) + "%", color: "#22C55E" },
  ];

  useEffect(() => {
    if (!paused && step < steps.length - 1) {
      const t = setTimeout(() => setStep((s) => s + 1), 1500);
      return () => clearTimeout(t);
    }
  }, [step, paused]);

  const current = steps[step];

  const handleTabClick = (i) => {
    setPaused(true);
    setStep(i);
  };

  const handleReplay = () => {
    setPaused(false);
    setStep(0);
  };

  return (
    <div style={{ padding: "16px 0" }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => handleTabClick(i)}
            style={{
              flex: 1,
              background: step === i ? s.color + "22" : "#111",
              border: `1px solid ${step === i ? s.color : "#222"}`,
              borderRadius: 6,
              color: step === i ? s.color : "#555",
              padding: "6px 4px",
              cursor: "pointer",
              fontSize: 10,
              fontFamily: "monospace",
            }}
          >
            {s.title}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {tokens.map((t, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 50, color: "#666", fontSize: 11, fontFamily: "monospace" }}>{t}</div>
            <div style={{ flex: 1, height: 20, background: "#111", borderRadius: 4, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${(current.values[i] / Math.max(...current.values)) * 100}%`,
                  background: current.color,
                  borderRadius: 4,
                  transition: "width 0.5s",
                }}
              />
            </div>
            <div style={{ width: 50, textAlign: "right", color: current.color, fontSize: 11, fontFamily: "monospace" }}>
              {current.format(current.values[i])}
            </div>
          </div>
        ))}
      </div>

      <button onClick={handleReplay} style={{ marginTop: 12, background: "transparent", border: "1px solid #222", borderRadius: 4, color: "#555", padding: "4px 12px", cursor: "pointer", fontSize: 10 }}>
        ↺ Replay
      </button>
    </div>
  );
}

export function SamplingStrategies() {
  const [strategy, setStrategy] = useState("greedy");
  const tokens = [
    { word: "Paris", prob: 0.72 },
    { word: "London", prob: 0.14 },
    { word: "France", prob: 0.08 },
    { word: "Rome", prob: 0.04 },
    { word: "Berlin", prob: 0.02 },
  ];

  const strategies = {
    greedy: { eligible: [0], desc: "Always pick highest probability" },
    topk: { eligible: [0, 1, 2], desc: "Sample from top 3 only (k=3)" },
    topp: { eligible: [0, 1], desc: "Sample until cumsum > 0.9 (p=0.9)" },
  };

  const current = strategies[strategy];

  return (
    <div style={{ padding: "16px 0" }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {Object.entries(strategies).map(([key, val]) => (
          <button
            key={key}
            onClick={() => setStrategy(key)}
            style={{
              flex: 1,
              background: strategy === key ? "#F59E0B22" : "#111",
              border: `1px solid ${strategy === key ? "#F59E0B" : "#222"}`,
              borderRadius: 6,
              color: strategy === key ? "#F59E0B" : "#555",
              padding: "8px 4px",
              cursor: "pointer",
              fontSize: 11,
              fontFamily: "monospace",
              textTransform: "capitalize",
            }}
          >
            {key === "topk" ? "Top-k" : key === "topp" ? "Top-p" : key}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
        {tokens.map((t, i) => {
          const isEligible = current.eligible.includes(i);
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, opacity: isEligible ? 1 : 0.3, transition: "opacity 0.3s" }}>
              <div style={{ width: 50, color: isEligible ? "#F59E0B" : "#444", fontSize: 11, fontFamily: "monospace" }}>{t.word}</div>
              <div style={{ flex: 1, height: 16, background: "#111", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${t.prob * 100}%`, background: isEligible ? "#F59E0B" : "#333", borderRadius: 4 }} />
              </div>
              <div style={{ width: 40, textAlign: "right", color: "#555", fontSize: 10, fontFamily: "monospace" }}>
                {(t.prob * 100).toFixed(0)}%
              </div>
              {isEligible && <span style={{ color: "#22C55E", fontSize: 10 }}>✓</span>}
            </div>
          );
        })}
      </div>

      <div style={{ color: "#888", fontSize: 11, padding: "8px 12px", background: "#111", borderRadius: 6 }}>
        {current.desc}
      </div>
    </div>
  );
}

export function TemperatureDeep() {
  const [temp, setTemp] = useState(1.0);
  const rawLogits = [3.2, 1.8, 1.2, 0.7, 0.3];
  const tokens = ["Paris", "London", "France", "Rome", "Berlin"];

  const softmax = (logits, t) => {
    const scaled = logits.map((l) => l / t);
    const maxL = Math.max(...scaled);
    const exps = scaled.map((l) => Math.exp(l - maxL));
    const sum = exps.reduce((a, b) => a + b, 0);
    return exps.map((e) => e / sum);
  };

  const probs = softmax(rawLogits, temp);
  const entropy = -probs.reduce((sum, p) => sum + (p > 0 ? p * Math.log2(p) : 0), 0);

  return (
    <div style={{ padding: "16px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ color: "#888", fontSize: 11 }}>
          Temperature: <strong style={{ color: "#F59E0B" }}>{temp.toFixed(1)}</strong>
        </span>
        <span style={{ color: "#555", fontSize: 10 }}>
          Entropy: {entropy.toFixed(2)} bits
        </span>
      </div>
      <input
        type="range"
        min="0.1"
        max="2.5"
        step="0.1"
        value={temp}
        onChange={(e) => setTemp(parseFloat(e.target.value))}
        style={{ width: "100%", accentColor: "#F59E0B", marginBottom: 16 }}
      />

      <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 100, marginBottom: 8 }}>
        {tokens.map((t, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                width: "100%",
                height: `${probs[i] * 100}%`,
                minHeight: 2,
                background: `linear-gradient(180deg, #F59E0B, #F59E0B44)`,
                borderRadius: "4px 4px 0 0",
                transition: "height 0.3s",
              }}
            />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {tokens.map((t, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center" }}>
            <div style={{ color: "#555", fontSize: 9, fontFamily: "monospace" }}>{t}</div>
            <div style={{ color: "#F59E0B", fontSize: 9, fontFamily: "monospace" }}>{(probs[i] * 100).toFixed(0)}%</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, color: "#444", fontSize: 10 }}>
        <span>← Deterministic</span>
        <span>Random →</span>
      </div>
    </div>
  );
}

export function TrainingLoop() {
  const [step, setStep] = useState(0);
  const [loss, setLoss] = useState(4.5);

  const runStep = () => {
    setStep((s) => s + 1);
    setLoss((l) => Math.max(0.5, l * 0.92 + (Math.random() - 0.5) * 0.3));
  };

  const reset = () => {
    setStep(0);
    setLoss(4.5);
  };

  return (
    <div style={{ padding: "16px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <span style={{ color: "#888", fontSize: 11 }}>Step: </span>
          <span style={{ color: "#22C55E", fontFamily: "monospace", fontSize: 13 }}>{step}</span>
        </div>
        <div>
          <span style={{ color: "#888", fontSize: 11 }}>Loss: </span>
          <span style={{ color: "#F59E0B", fontFamily: "monospace", fontSize: 13 }}>{loss.toFixed(2)}</span>
        </div>
      </div>

      {/* Loss bar */}
      <div style={{ height: 12, background: "#111", borderRadius: 6, overflow: "hidden", marginBottom: 16 }}>
        <div
          style={{
            height: "100%",
            width: `${(loss / 5) * 100}%`,
            background: `linear-gradient(90deg, #22C55E, #F59E0B, #EF4444)`,
            borderRadius: 6,
            transition: "width 0.3s",
          }}
        />
      </div>

      {/* Training sequence preview */}
      <div style={{ background: "#0a0a0a", borderRadius: 6, padding: 12, marginBottom: 16, fontFamily: "monospace", fontSize: 11 }}>
        <div style={{ color: "#555", marginBottom: 4 }}>Training on:</div>
        <div style={{ color: "#888" }}>
          <span style={{ color: "#666" }}>The capital of France is</span>{" "}
          <span style={{ color: "#22C55E" }}>Paris</span>
        </div>
        <div style={{ color: "#555", fontSize: 10, marginTop: 8 }}>
          → Model predicted "Paris" with {Math.max(5, 100 - loss * 20).toFixed(0)}% confidence
        </div>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={runStep}
          style={{
            flex: 1,
            background: "#22C55E22",
            border: "1px solid #22C55E55",
            borderRadius: 6,
            color: "#22C55E",
            padding: "8px 16px",
            cursor: "pointer",
            fontSize: 12,
          }}
        >
          Train step →
        </button>
        <button
          onClick={reset}
          style={{
            background: "transparent",
            border: "1px solid #222",
            borderRadius: 6,
            color: "#555",
            padding: "8px 16px",
            cursor: "pointer",
            fontSize: 12,
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
