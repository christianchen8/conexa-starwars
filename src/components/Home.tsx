"use client";

import { useEffect } from "react";
import Link from "next/link";
import Fade from "react-reveal/Fade";
import { useAudio } from "@/hooks/useAudio";

const items = [
  { name: "films", image: "/images/films/films_1.jpeg" },
  { name: "people", image: "/images/people/people_4.jpeg" },
  { name: "planets", image: "/images/planets/planets_1.jpeg" },
  { name: "starships", image: "/images/starships/starships_3.jpeg" },
];

export function Home() {
  const url = `${process.env.NEXT_PUBLIC_AUDIO_URL}`;
  const { setPlaying } = useAudio(url);

  useEffect(() => {
    setPlaying(false);
  }, []);

  return (
    <Fade>
      <div className="min-h-screen h-full w-full py-12 px-5 lg:px-20 bg-no-repeat bg-cover	flex flex-col justify-center items-center ">
        <h1 className="uppercase text-6xl font-bold">Welcome</h1>
        <p className="text-2xl w-full text-center text-white">
          What do you want to search?
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 w-full mt-10">
          {items.map(({ name, image }) => {
            return (
              <Link
                key={name}
                href={`/${name}`}
                style={{ backgroundImage: `url(${image})` }}
                className=" h-[25rem] bg-center bg-cover group/card"
              >
                <div className="h-full w-full flex justify-center items-center bg-[rgba(0,0,0,0.6)] ">
                  <h1 className="font-bold text-3xl text-white group-hover/card:text-yellow-500 group-hover/card:text-4xl duration-300 uppercase">
                    {name}
                  </h1>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Fade>
  );
}
