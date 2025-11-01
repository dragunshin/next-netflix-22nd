import { NextResponse } from "next/server";

const API_BASE = "https://api.themoviedb.org/3";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const token = process.env.TMDB_API_KEY;
  if (!token) {
    return NextResponse.json(
      { message: "TMDB_API_KEY missing" },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(req.url);
  const { path } = await params;
  const joined = (path ?? []).join("/");
  const target = `${API_BASE}/${joined}?${searchParams.toString()}`;

  const res = await fetch(target, {
    headers: { accept: "application/json", Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  return new NextResponse(await res.text(), {
    status: res.status,
    headers: {
      "content-type": res.headers.get("content-type") ?? "application/json",
    },
  });
}
