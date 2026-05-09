"use client";

import { useState } from "react";
import LLMGuide from "@/components/LLMGuide";
import WelcomeScreen from "@/components/WelcomeScreen";

export default function Home() {
  const [done, setDone] = useState(false);
  return done ? <LLMGuide /> : <WelcomeScreen onEnter={() => setDone(true)} />;
}
