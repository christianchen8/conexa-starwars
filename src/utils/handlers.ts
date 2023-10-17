import { Dispatch, SetStateAction } from "react";

export const handleSearch = async (
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  page: string,
  search: string,
  setError: Dispatch<SetStateAction<string>>,
  setData: Dispatch<SetStateAction<null | any[]>>
) => {
  setIsLoading(true);
  try {
    const res = await fetch(`/api/${page}`, {
      method: "POST",
      body: JSON.stringify({ search }),
    });
    const resData = await res.json();
    setIsLoading(false);
    if (resData.length < 1) {
      setError("No se han encontrado coincidencias");
      setData(null);
    } else {
      setError("");
      setData(resData);
    }
  } catch (error) {
    setIsLoading(false);
    console.log("Error ", error);
  }
};

export const getData = async (
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  page: string,
  setData: Dispatch<SetStateAction<null | any[]>>,
  pageNum: number
) => {
  setIsLoading(true);
  try {
    const res = await fetch(`/api/${page}?page=${pageNum}`, {
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

export const handleAppend = async (
  limit: number,
  pageNum: number,
  setIsAppending: Dispatch<SetStateAction<boolean>>,
  setPage: Dispatch<SetStateAction<number>>,
  setData: Dispatch<SetStateAction<null | any[]>>,
  setLimit: Dispatch<SetStateAction<number>>,
  data:any
) => {
  setIsAppending(true);
  setPage(pageNum + 1);
  try {
    const res = await fetch(`/api/people?page=${pageNum + 1}`, {
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
