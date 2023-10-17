import { NextResponse } from "next/server";

const DATA_SOURCE_URL = "https://swapi.dev/api/planets";

export async function GET(request: Request) {
  const page = request.url.split("page=")[1];
  const res = await fetch(DATA_SOURCE_URL + `?page=${page}`);
  const planets = await res.json();

  return NextResponse.json(planets.results );
}


export async function POST(request: Request) {
  const { search } = await request.json();
  const res = await fetch(DATA_SOURCE_URL + `/?search=${search}`);
  const people = await res.json();
  return NextResponse.json(people.results);
}
