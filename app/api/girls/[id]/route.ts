import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, girlsTable } from "@workspace/db";
import { GetGirlParams, GetGirlResponse } from "@workspace/api-zod";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const rawParams = await params;
    const parsedParams = GetGirlParams.safeParse({ id: rawParams.id });
    if (!parsedParams.success) {
      return NextResponse.json({ error: parsedParams.error.message }, { status: 400 });
    }

    const [girl] = await db.select().from(girlsTable).where(eq(girlsTable.id, parsedParams.data.id));
    if (!girl) {
      return NextResponse.json({ error: "Performer not found" }, { status: 404 });
    }

    return NextResponse.json(GetGirlResponse.parse(girl));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
