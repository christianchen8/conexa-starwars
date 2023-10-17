"use client";
import { useState } from "react";
import { Home } from "@/components/Home";
import { Intro } from "@/components/Intro";
import { Popup } from "@/components/Popup";

function App() {
  const [home, setHome] = useState<string | null>(null);

  return (
    <div className="bg-space w-full">
      {!home && <Popup setHome={setHome} />}
      {home === "intro" && <Intro setHome={setHome} />}
      {home === "home" && <Home />}
    </div>
  );
}

export default App;
