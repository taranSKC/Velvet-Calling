import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, videosTable } from "@workspace/db";
import { GetGirlVideosParams, GetGirlVideosResponse } from "@workspace/api-zod";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const rawParams = await params;
    const parsedParams = GetGirlVideosParams.safeParse({ id: rawParams.id });
    if (!parsedParams.success) {
      return NextResponse.json({ error: parsedParams.error.message }, { status: 400 });
    }

    const videos = await db.select().from(videosTable).where(eq(videosTable.girlId, parsedParams.data.id));
    const serializedVideos = videos.map((v: any) => ({
      ...v,
      createdAt: v.createdAt instanceof Date ? v.createdAt.toISOString() : v.createdAt,
    }));

    return NextResponse.json(GetGirlVideosResponse.parse(serializedVideos));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
