"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/Card";
import { Skeleton } from "@nextui-org/react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { parseId } from "@/utils/parseId";
import { Button } from "@nextui-org/react";

export default function StarshipsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any| null>(null);
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const [isAppending, setIsAppending] = useState(false);
  const [items, addItem, removeItem] = useLocalStorage("favs", []);

  const getData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/starships?page=${page}`, {
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

  const handleAppend = async () => {
    setIsAppending(true);
    setPage(page + 1);
    try {
      const res = await fetch(`/api/people?page=${page + 1}`, {
        method: "GET",
      });
      const resData = await res.json();
      const appendData = data?.concat(resData);

      setData(appendData);
      setLimit(limit + 8);
      setIsAppending(false);
    } catch (error) {
      setIsAppending(false);
      console.log("Error ", error);
    }
  };

  const handleAddItem = (newItem: any) => {
    addItem(newItem);
  };

  const handleRemoveItem = (itemToRemove: any) => {
    removeItem(itemToRemove);
  };

  const inventory = data?.slice(0, limit).map((doc:any) => {
    const id = parseId(doc.url);
    return (
      <Card
        key={doc.url}
        doc={doc}
        favs={items}
        handleAddItem={handleAddItem}
        handleRemoveItem={handleRemoveItem}
        category="starships"
        id={id}
      />
    );
  });

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
    return (
      <Skeleton
        key={num}
        className="bg-white h-[18.75rem] p-1 text-black relative group/card hover:border-white border cursor-pointer"
      ></Skeleton>
    );
  });

  return (
    <div
      className="bg-black min-h-screen py-[5rem] w-full px-5 sm:px-10   "
      style={{ boxSizing: "border-box" }}
    >
      <div className="w-full border-b">
        <h1 className="uppercase text-semibold text-3xl lg:text-5xl pb-2 text-white">
          Starships
        </h1>
      </div>

      <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4  w-full gap-5 mt-8 ">
        {!isLoading && inventory}
        {(isAppending || isLoading) && skeletons}
      </div>

      {(!isLoading || !isAppending) && data && data?.length > 7 && (
        <div className="mt-8 flex justify-center uppercase">
          <Button
            size="lg"
            variant="shadow"
            color="warning"
            onClick={handleAppend}
            className="uppercase text-sm"
          >
            Ver más
          </Button>
        </div>
      )}
    </div>
  );
}
