"use client";

import Link from "next/link";
import Fade from "react-reveal/Fade";
import { useAudio } from "@/hooks/useAudio";
import { useEffect } from "react";

const items = [
  { name: "films", image: "/images/films/films_1.jpeg" },
  { name: "people", image: "/images/people/people_4.jpeg" },
  { name: "planets", image: "/images/planets/planets_1.png" },
  { name: "starships", image: "/images/starships/starships_3.jpeg" },
];

export function Home() {
  const url =
    "https://ia801501.us.archive.org/23/items/StarWars_20180709/Star%20Wars.mp3";
  const { setPlaying } = useAudio(url);

  useEffect(() => {
    setPlaying(false);
  }, []);

  return (
    <Fade>
      <div className="min-h-screen pt-[3rem] w-full px-20 bg-no-repeat bg-cover	flex flex-col justify-center items-center ">
        <h1 className="uppercase text-5xl font-bold">Welcome</h1>
        <p className="text-xl ">What do you want to search?</p>
        <div className="grid grid-cols-4 gap-5 w-full mt-8">
          {items.map(({ name, image }) => {
            return (
              <Link
                key={name}
                href={`/${name}`}
                style={{ backgroundImage: `url(${image})` }}
                className=" h-[15rem] bg-center bg-cover group/card"
              >
                <div className="h-full w-full flex justify-center items-center bg-[rgba(0,0,0,0.6)] ">
                  <h1 className="font-bold text-3xl text-white group-hover/card:text-yellow-500 uppercase">
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
