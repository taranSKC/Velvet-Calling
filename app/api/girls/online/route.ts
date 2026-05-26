import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, girlsTable } from "@workspace/db";
import { GetOnlineGirlsResponse } from "@workspace/api-zod";

export async function GET() {
  try {
    const rows = await db.select().from(girlsTable).where(eq(girlsTable.isOnline, true));
    return NextResponse.json(GetOnlineGirlsResponse.parse(rows));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
