import { useState, useEffect } from "react";

export const useLocalStorage = (key: string, initialValue = []) => {
  const [items, setItems] = useState(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    }
    return initialValue;
  });

  const addItem = (newItem: any) => {
    setItems((prevItems: any[]) => [...prevItems, newItem]);
  }

  const removeItem = (itemToRemove: any) => {
    setItems(items.filter((item: any) => item.url !== itemToRemove.url));
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(items));
    }
  }, [key, items]);

  return [items, addItem, removeItem];
};
