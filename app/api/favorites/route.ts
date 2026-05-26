import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, favoritesTable, girlsTable } from "@workspace/db";
import { AddFavoriteBody, ListFavoritesResponse } from "@workspace/api-zod";

export async function GET() {
  try {
    const favs = await db.select().from(favoritesTable);
    const girlIds = favs.map((f: any) => f.girlId);

    if (girlIds.length === 0) {
      return NextResponse.json([]);
    }

    const girls = await db.select().from(girlsTable);
    const favoriteGirls = girls.filter((g: any) => girlIds.includes(g.id));

    return NextResponse.json(ListFavoritesResponse.parse(favoriteGirls));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = AddFavoriteBody.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.message }, { status: 400 });
    }

    const existing = await db.select().from(favoritesTable).where(eq(favoritesTable.girlId, parsed.data.girlId));
    if (existing.length > 0) {
      return NextResponse.json(existing[0], { status: 201 });
    }

    const [fav] = await db.insert(favoritesTable).values({ girlId: parsed.data.girlId }).returning();
    return NextResponse.json(fav, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
