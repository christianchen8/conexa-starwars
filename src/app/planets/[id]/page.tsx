"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Fade from "react-reveal/Fade";
import { PageTitle } from "@/components";
import { usePathname } from "next/navigation";
import { CircularProgress } from "@nextui-org/react";

export default function SinglePage() {
  const [data, setData] = useState<any | null>(null);
  const pathname = usePathname();
  const splitPath = pathname.split("/");
  const category = splitPath[1];
  const id = splitPath[2];

  const [isLoading, setIsLoading] = useState(true);

  const getItem = async () => {
    const response = await fetch(`/api/${category}?id=${id}`, {
      method: "GET",
    });
    const data = await response.json();
    setData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <Fade>
      <div
        className="bg-black min-h-screen py-[5rem] w-full px-5 sm:px-10  "
        style={{ boxSizing: "border-box" }}
      >
        {isLoading ? (
          <CircularProgress color="warning"></CircularProgress>
        ) : (
          <>
            <div className="capitalize text-white mb-4">
              <h1>
                Home / <Link href={`/${category}`}>{category} </Link> /{" "}
                <span className="text-yellow-500">{data?.name} </span>
              </h1>
            </div>

            <PageTitle title={data?.name} />

            <div className="flex md:flex-row flex-col justify-between min-h-[28rem] mt-8">
              <div className=" md:w-[18rem] h-[20rem] md:h-[25rem] bg-white p-4 relative flex justify-start ">
                <Image
                  src={`/images/${category}/${category}_${id}.jpeg`}
                  alt="image"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col md:w-1/2 mt-2 capitalize">
                <h1>
                  Climate: <span className="text-white">{data?.climate}</span>
                </h1>
                <h1>
                  Diameter: <span className="text-white">{data?.diameter}</span>
                </h1>
                <h1>
                  Gravity: <span className="text-white">{data?.gravity} </span>
                </h1>
                <h1>
                  Orbital Period:{" "}
                  <span className="text-white">{data?.orbital_period}</span>
                </h1>
                <h1>
                  Rotaion Period:{" "}
                  <span className="text-white">{data?.rotation_period}</span>
                </h1>
                <h1>
                  Terrain: <span className="text-white">{data?.terrain}</span>
                </h1>
                <h1>
                  Population:{" "}
                  <span className="text-white">{data?.population}</span>
                </h1>
              </div>
            </div>
          </>
        )}
      </div>
    </Fade>
  );
}
