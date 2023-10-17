import { NextResponse } from "next/server";

const DATA_SOURCE_URL = `${process.env.NEXT_PUBLIC_SWAPI_URL}/starships`

export async function GET(request: Request) {
  const page = request.url.split("page=")[1];
  const id = request.url.split("id=")[1];

  if (page) {
    const res = await fetch(DATA_SOURCE_URL + `?page=${page}`);
    const starships = await res.json();
    return NextResponse.json(starships.results);
  }

  const res = await fetch(DATA_SOURCE_URL + `/${id}`);
  const starship = await res.json();

  return NextResponse.json(starship);
}

export async function POST(request: Request) {
  const { search } = await request.json();
  const res = await fetch(DATA_SOURCE_URL + `/?search=${search}`);
  const people = await res.json();
  return NextResponse.json(people.results);
}
