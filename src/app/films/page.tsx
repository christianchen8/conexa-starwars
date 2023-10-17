"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/Card";
import { Skeleton } from "@nextui-org/react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Fade from "react-reveal/Fade";

export default function FilmsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any[] | null>(null);
  const [items, addItem, removeItem] = useLocalStorage("favs", []);

  const getData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/films?page=1`, {
        method: "GET",
      });
      const resData = await res.json();
      setIsLoading(false);
      setData(resData);
    } catch (error) {
      setIsLoading(false);
      console.log("Error ", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleAddItem = (newItem: any) => {
    addItem(newItem);
  };

  const handleRemoveItem = (itemToRemove: any) => {
    removeItem(itemToRemove);
  };

  const inventory = data?.map((doc) => (
    <Card
      key={doc.url}
      doc={doc}
      favs={items}
      category="films"
      handleAddItem={handleAddItem}
      handleRemoveItem={handleRemoveItem}
    />
  ));

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
    return (
      <Skeleton
        key={num}
        className="bg-white h-[18.75rem] p-1 text-black relative group/card hover:border-white border cursor-pointer"
      ></Skeleton>
    );
  });

  return (
    <Fade>
      <div
        className="bg-black min-h-screen py-[5rem] w-full px-5 sm:px-10 "
        style={{ boxSizing: "border-box" }}
      >
        <div className="w-full border-b">
          <Fade left>
            <h1 className="uppercase text-semibold text-3xl lg:text-5xl pb-2 text-white">
              Films
            </h1>
          </Fade>
        </div>

        <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4  w-full gap-5 mt-8 ">
          {!isLoading ? inventory : skeletons}
        </div>
      </div>
    </Fade>
  );
}
