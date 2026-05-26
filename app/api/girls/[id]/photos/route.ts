import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, photosTable } from "@workspace/db";
import { GetGirlPhotosParams, GetGirlPhotosResponse } from "@workspace/api-zod";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const rawParams = await params;
    const parsedParams = GetGirlPhotosParams.safeParse({ id: rawParams.id });
    if (!parsedParams.success) {
      return NextResponse.json({ error: parsedParams.error.message }, { status: 400 });
    }

    const photos = await db.select().from(photosTable).where(eq(photosTable.girlId, parsedParams.data.id));
    const serializedPhotos = photos.map((p: any) => ({
      ...p,
      createdAt: p.createdAt instanceof Date ? p.createdAt.toISOString() : p.createdAt,
    }));

    return NextResponse.json(GetGirlPhotosResponse.parse(serializedPhotos));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
