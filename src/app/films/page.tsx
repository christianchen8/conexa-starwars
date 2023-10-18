"use client";

import React, { useState, useEffect } from "react";
import Fade from "react-reveal/Fade";
import { parseId } from "@/utils/parseId";
import { getData } from "@/utils/handlers";
import { Card, Skeletons, PageTitle } from "@/components";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function FilmsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any[] | null>(null);
  const [items, addItem, removeItem] = useLocalStorage("favs", []);

  useEffect(() => {
    getData(setIsLoading, "films", setData, 1);
  }, []);

  const handleAddItem = (newItem: any) => {
    addItem(newItem);
  };

  const handleRemoveItem = (itemToRemove: any) => {
    removeItem(itemToRemove);
  };

  const inventory = data?.map((doc) => {
    const id = parseId(doc.url);
    return (
      <Card
        key={doc.url}
        doc={doc}
        id={id}
        favs={items}
        category="films"
        handleAddItem={handleAddItem}
        handleRemoveItem={handleRemoveItem}
      />
    );
  });

  return (
    <Fade>
      <div className="bg-space min-h-screen py-[8rem] w-full px-5 sm:px-10 xl:px-20 ">
        <PageTitle title="films" />

        <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4  w-full gap-5 mt-8 ">
          {!isLoading ? inventory : <Skeletons />}
        </div>
      </div>
    </Fade>
  );
}
