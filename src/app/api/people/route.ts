import { NextResponse } from "next/server";

const DATA_SOURCE_URL = `${process.env.NEXT_PUBLIC_SWAPI_URL}/people`

export async function GET(request: Request) {
  const page = request.url.split("page=")[1];
  const id = request.url.split("id=")[1];

  if (page) {
    const res = await fetch(DATA_SOURCE_URL + `?page=${page}`);
    const people = await res.json();
    return NextResponse.json(people.results);
  }

  const res = await fetch(DATA_SOURCE_URL + `/${id}`);
  const singlePeople = await res.json();

  return NextResponse.json(singlePeople);
}

export async function POST(request: Request) {
  const { search } = await request.json();
  const res = await fetch(DATA_SOURCE_URL + `/?search=${search}`);
  const people = await res.json();
  return NextResponse.json(people.results);
}
