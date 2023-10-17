"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/Card";
import { Skeleton } from "@nextui-org/react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { parseId } from "@/utils/parseId";
import { Button } from "@nextui-org/react";

export default function PlanetsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any | null>(null);
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const [isAppending, setIsAppending] = useState(false);
  const [items, addItem, removeItem] = useLocalStorage("favs", []);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const getData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/planets?page=${page}`, {
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
      const res = await fetch(`/api/planets?page=${page + 1}`, {
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

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/planets`, {
        method: "POST",
        body: JSON.stringify({ search }),
      });
      const resData = await res.json();
      setIsLoading(false);
      if (resData.length < 1) {
        setError("No se han encontrado coincidencias");
        setData(null);
      } else {
        setError("")
        setData(resData);
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Error ", error);
    }
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
        category="planets"
        id={id}
      />
    );
  });

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
    return (
      <Skeleton key={num} className="bg-white h-[18.75rem] p-1 text-black relative group/card hover:border-white border cursor-pointer"></Skeleton>
    );
  });

  return (
    <div
      className="bg-black min-h-screen py-[5rem] w-full px-5 sm:px-10  "
      style={{ boxSizing: "border-box" }}
    >
      <div className="w-full border-b">
        <h1 className="uppercase text-semibold text-3xl lg:text-5xl pb-2 text-white">
          Planets
        </h1>
      </div>

      <div className="mt-4 flex items-center justify-end">
        <div className="flex border w-full lg:w-1/3 bg-none justify-between">
          <input
            type="text"
            name="search"
            placeholder="Buscar por nombre..."
            className="w-full px-2 bg-black"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="text-black bg-yellow-500 px-2"
            onClick={handleSearch}
          >
            Buscar{" "}
          </button>
        </div>
      </div>

      <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4  w-full gap-5 mt-8 ">
        {!isLoading && inventory}
        {(isAppending || isLoading) && skeletons}
      </div>

      {error && <h1 className="text-white text-2xl">{error}</h1>}

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
