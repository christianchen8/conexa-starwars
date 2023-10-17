import { Dispatch, SetStateAction } from "react";
import { Button } from "@nextui-org/react";
import Fade from "react-reveal/Fade";

interface PopupProp {
  setHome: Dispatch<SetStateAction<string | null>>;
}

export function Popup({ setHome }: PopupProp) {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Fade>
        <div className="bg-[rgba(0,0,0,0.8)] w-full md:w-1/2 md:h-1/2 mx-5 p-5 h-[12rem] border rounded-xl flex flex-col items-center justify-center">
          <h1 className="text-white font-semibold text-2xl text-center ">
            Are you a Star Wars fan?
          </h1>
          <div className="flex justify-between mt-8">
            {["YES", "NO"].map((answer) => {
              return (
                <Button
                  key={answer}
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
      </Fade>
    </div>
  );
}
