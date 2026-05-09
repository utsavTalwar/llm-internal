"use client";

import { useState, useEffect } from "react";

export default function WelcomeScreen({ onEnter }) {
  const [exiting, setExiting] = useState(false);
  const [showCta, setShowCta] = useState(false);

  // Show CTA button after headline has settled
  useEffect(() => {
    const t = setTimeout(() => setShowCta(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const handleEnter = () => {
    setExiting(true);
    setTimeout(onEnter, 580);
  };

  return (
    <div
      className={exiting ? "welcome-exit" : ""}
      style={{
        minHeight: "100vh",
        background: "#080808",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Subtle grid background */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(#ffffff04 1px, transparent 1px), linear-gradient(90deg, #ffffff04 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />

      {/* Glow blob */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, #ffffff06 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Main content */}
      <div style={{ textAlign: "center", position: "relative", padding: "0 24px" }}>
        {/* Small eyebrow */}
        <div
          style={{
            fontSize: 11,
            letterSpacing: 6,
            color: "#444",
            textTransform: "uppercase",
            fontFamily: "monospace",
            marginBottom: 28,
            animation: "slide-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
          }}
        >
          Interactive Guide
        </div>

        {/* Big headline */}
        <h1
          style={{
            fontSize: "clamp(42px, 8vw, 96px)",
            fontWeight: 300,
            fontFamily: "'Georgia', serif",
            letterSpacing: "-2px",
            lineHeight: 1.05,
            color: "#fff",
            animation: "slide-up 0.8s 0.1s cubic-bezier(0.22, 1, 0.36, 1) both",
          }}
        >
          Let&apos;s learn
          <br />
          <span style={{ color: "#fff", fontStyle: "italic" }}>LLMs</span>
          <span
            style={{
              display: "inline-block",
              width: 3,
              height: "0.85em",
              background: "#fff",
              marginLeft: 6,
              verticalAlign: "middle",
              animation: "blink-cursor 1s step-end infinite",
            }}
          />
        </h1>

        {/* Subtext */}
        <p
          style={{
            marginTop: 28,
            color: "#444",
            fontSize: 16,
            fontFamily: "sans-serif",
            letterSpacing: 0.3,
            animation: "slide-up-delay 1.2s cubic-bezier(0.22, 1, 0.36, 1) both",
          }}
        >
          From raw text to predicted tokens — a visual walkthrough
        </p>

        {/* CTA button */}
        <div
          style={{
            marginTop: 52,
            animation: showCta ? "fade-in-slow 0.8s ease both" : "none",
            opacity: showCta ? undefined : 0,
          }}
        >
          <button
            onClick={handleEnter}
            style={{
              background: "transparent",
              border: "1px solid #333",
              borderRadius: 40,
              color: "#aaa",
              padding: "14px 40px",
              fontSize: 13,
              fontFamily: "monospace",
              letterSpacing: 2,
              cursor: "pointer",
              textTransform: "uppercase",
              transition: "border-color 0.2s, color 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#fff";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.background = "#ffffff0a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#333";
              e.currentTarget.style.color = "#aaa";
              e.currentTarget.style.background = "transparent";
            }}
          >
            Begin →
          </button>
        </div>
      </div>

      {/* Bottom hint */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          fontSize: 10,
          letterSpacing: 3,
          color: "#2a2a2a",
          textTransform: "uppercase",
          fontFamily: "monospace",
          animation: "fade-in-slow 2s ease both",
        }}
      >
        6 stages · interactive demos · deep dives
      </div>

      {/* Attribution */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          right: 32,
          fontSize: 10,
          color: "#2e2e2e",
          fontFamily: "monospace",
          letterSpacing: 1,
          animation: "fade-in-slow 2s ease both",
        }}
      >
        built by Utsav Talwar
      </div>
    </div>
  );
}
