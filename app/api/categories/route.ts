import { NextResponse } from "next/server";
import { db, categoriesTable } from "@workspace/db";
import { ListCategoriesResponse } from "@workspace/api-zod";

export async function GET() {
  try {
    const rows = await db.select().from(categoriesTable);
    return NextResponse.json(ListCategoriesResponse.parse(rows));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
