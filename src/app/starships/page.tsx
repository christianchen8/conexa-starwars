"use client";

import React, { useState, useEffect } from "react";
import Fade from "react-reveal/Fade";
import { parseId } from "@/utils/parseId";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Card, Skeletons, PageTitle, AppendButton } from "@/components";
import { handleSearch, getData, handleAppend } from "@/utils/handlers";

export default function StarshipsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any | null>(null);
  const [isAppending, setIsAppending] = useState(false);
  const [items, addItem, removeItem] = useLocalStorage("favs", []);

  useEffect(() => {
    getData(setIsLoading, "starships", setData, page);
  }, []);

  const append = () =>
    handleAppend(limit, page, setIsAppending, setPage, setData, setLimit, data);

  const searchItems = () =>
    handleSearch(setIsLoading, "starships", search, setError, setData);

  const handleAddItem = (newItem: any) => {
    addItem(newItem);
  };

  const handleRemoveItem = (itemToRemove: any) => {
    removeItem(itemToRemove);
  };

  const inventory = data?.slice(0, limit).map((doc: any) => {
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

  return (
    <Fade>
      <div
        className="bg-black min-h-screen py-[5rem] w-full px-5 sm:px-10"
        style={{ boxSizing: "border-box" }}
      >
        <PageTitle title="Starships" />

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
              onClick={searchItems}
            >
              Buscar
            </button>
          </div>
        </div>

        <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4  w-full gap-5 mt-8 ">
          {!isLoading && inventory}
          {(isAppending || isLoading) && <Skeletons />}
        </div>

        {error && <h1 className="text-white text-2xl">{error}</h1>}

        {(!isLoading || !isAppending) && data && data?.length > 7 && (
          <AppendButton handleAppend={append} />
        )}
      </div>
    </Fade>
  );
}
