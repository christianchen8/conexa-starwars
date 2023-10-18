"use client";
import { useState } from "react";
import { Home } from "@/components/Home";
import { Intro } from "@/components/Intro";
import { Popup } from "@/components/Popup";

function App() {
  const [home, setHome] = useState<boolean>(false);

  return (
    <div className="bg-space w-full">
      {!home ? <Popup setHome={setHome} /> : <Intro setHome={setHome} />}
    </div>
  );
}

export default App;
