"use client";
import { useState } from "react";
import { Home } from "@/components/Home";
import { Intro } from "@/components/Intro";
import { Button } from "@nextui-org/react";

function App() {
  const [home, setHome] = useState<string | null>(null);

  return (
    <div className="bg-space w-full">
      {!home && (
        <div className="w-full h-screen flex justify-center items-center">
          <div className="bg-[rgba(0,0,0,0.8)] w-1/2 h-1/2 border rounded-xl flex flex-col items-center justify-center">
            <h1 className="text-white font-semibold text-2xl ">
              Are you a Star Wars fan?
            </h1>
            <div className="flex justify-between mt-4">
              {["YES", "NO"].map((answer) => {
                return (
                  <Button
                    size="lg"
                    variant={answer === "YES" ? "shadow" : "ghost"}
                    color="warning"
                    className="mx-2 font-bold"
                    onClick={() => setHome(answer === "YES" ? "intro" : "home")}
                  >
                    {answer}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {home === "intro" && <Intro setHome={setHome}/>}
      {home === "home" && <Home />}
    </div>
  );
}

export default App;
