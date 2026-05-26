import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db, girlsTable } from "@workspace/db";
import { GetTrendingGirlsResponse } from "@workspace/api-zod";

export async function GET() {
  try {
    const rows = await db.select().from(girlsTable).orderBy(sql`${girlsTable.rating} DESC`).limit(10);
    return NextResponse.json(GetTrendingGirlsResponse.parse(rows));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
