"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Fade from "react-reveal/Fade";
import { PageTitle, Breadcrumb } from "@/components";
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


  const planetsData = [
    {
      title: "diameter",
      item: data?.diameter,
    },
    {
      title: "climate",
      item: data?.climate,
    },
    {
      title: "gravity",
      item: data?.gravity,
    },
    {
      title: "rotation period",
      item: data?.rotation_period,
    },
    {
      title: "orbital period",
      item: data?.orbital_period,
    },
    {
      title: "terrain",
      item: data?.terrain,
    },

    {
      title: "population",
      item: data?.population,
    },
    ,
  ];


  return (
    <Fade>
      <div
        className="backdrop-blur-sm	min-h-screen py-[8rem] w-full px-5 sm:px-10 xl:px-20 "
        style={{ boxSizing: "border-box" }}
      >
        {isLoading ? (
          <CircularProgress color="warning"></CircularProgress>
        ) : (
          <>
            <Breadcrumb title={data?.name} category={category} />
            <PageTitle title={data?.name} />

            <div className="flex md:flex-row flex-col justify-between min-h-[28rem] mt-8">
              <div className=" sm:w-[25rem] h-[30rem] md:h-[35rem] bg-white p-4 relative flex justify-start ">
                <Image
                  src={`/images/${category}/${category}_${id}.jpeg`}
                  alt="image"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex capitalize flex-col md:w-2/3 mt-2 text-2xl">
                {planetsData.map(({ item, title }: any) => {
                  return (
                    <h1 key={item}>
                      <strong>{title}: </strong>{" "}
                      <span className="text-white">{item}</span>
                    </h1>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </Fade>
  );
}
