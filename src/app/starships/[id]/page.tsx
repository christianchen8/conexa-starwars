"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Fade from "react-reveal/Fade";
import { PageTitle,Breadcrumb } from "@/components";
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

  const starshipsData = [
    {
      title: "model",
      item: data?.model,
    },
    {
      title: "passengers",
      item: data?.passengers,
    },
    {
      title: "crew",
      item: data?.crew,
    },
    {
      title: "consumables",
      item: data?.consumables,
    },
    {
      title: "cargo capacity",
      item: data?.cargo_capacity,
    },
    {
      title: "hyperdrive rating",
      item: data?.hyperdrive_rating,
    },
    {
      title: "length",
      item: data?.length,
    },
    {
      title: "max atmosphering peed",
      item: data?.max_atmosphering_speed,
    },
    {
      title: "starship class",
      item: data?.starship_class,
    },

    {
      title: "manufacturer",
      item: data?.manufacturer,
    },
    ,
  ];

  return (
    <Fade>
      <div className="backdrop-blur-sm	 min-h-screen py-[8rem] w-full px-5 sm:px-10 xl:px-20">
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
                {starshipsData.map(({ item, title }) => {
                  return (
                    <h1>
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
