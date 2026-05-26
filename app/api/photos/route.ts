import { NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
import { db, photosTable } from "@workspace/db";
import { ListPhotosQueryParams, ListPhotosResponse } from "@workspace/api-zod";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query: Record<string, any> = {};
    searchParams.forEach((val, key) => {
      query[key] = val;
    });

    const parsed = ListPhotosQueryParams.safeParse(query);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.message }, { status: 400 });
    }

    const { category, girlId } = parsed.data;

    const conditions = [];
    if (girlId !== undefined) conditions.push(eq(photosTable.girlId, girlId));
    if (category) conditions.push(eq(photosTable.category, category));

    const rows = await db.select().from(photosTable).where(conditions.length ? and(...conditions) : undefined);
    return NextResponse.json(ListPhotosResponse.parse(rows));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
