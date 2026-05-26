import { NextResponse } from "next/server";
import { sql, eq } from "drizzle-orm";
import { db, girlsTable, videosTable, photosTable } from "@workspace/db";
import { GetSiteStatsResponse } from "@workspace/api-zod";

export async function GET() {
  try {
    const [girlsCount] = await db.select({ count: sql<number>`count(*)` }).from(girlsTable);
    const [onlineCount] = await db.select({ count: sql<number>`count(*)` }).from(girlsTable).where(eq(girlsTable.isOnline, true));
    const [videosCount] = await db.select({ count: sql<number>`count(*)` }).from(videosTable);
    const [photosCount] = await db.select({ count: sql<number>`count(*)` }).from(photosTable);

    return NextResponse.json(GetSiteStatsResponse.parse({
      onlineCount: Number(onlineCount.count),
      totalGirls: Number(girlsCount.count),
      totalVideos: Number(videosCount.count),
      totalPhotos: Number(photosCount.count),
    }));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
