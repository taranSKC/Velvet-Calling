import { NextResponse } from "next/server";
import { db, videosTable } from "@workspace/db";
import { ListVideosQueryParams, ListVideosResponse } from "@workspace/api-zod";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query: Record<string, any> = {};
    searchParams.forEach((val, key) => {
      query[key] = val;
    });

    const parsed = ListVideosQueryParams.safeParse(query);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.message }, { status: 400 });
    }

    const { category, search, sort } = parsed.data;

    let rows = await db.select().from(videosTable);

    if (category) rows = rows.filter((v: any) => v.category === category);
    if (search) rows = rows.filter((v: any) => v.title.toLowerCase().includes(search.toLowerCase()));

    if (sort === "popular") rows.sort((a: any, b: any) => b.views - a.views);
    else if (sort === "top_rated") rows.sort((a: any, b: any) => b.likes - a.likes);
    else rows.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const serialized = rows.map((v: any) => ({
      ...v,
      createdAt: v.createdAt instanceof Date ? v.createdAt.toISOString() : v.createdAt,
    }));

    return NextResponse.json(ListVideosResponse.parse(serialized));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
