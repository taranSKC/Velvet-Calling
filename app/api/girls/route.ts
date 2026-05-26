import { NextResponse } from "next/server";
import { eq, and, gte, lte } from "drizzle-orm";
import { db, girlsTable } from "@workspace/db";
import { ListGirlsQueryParams, ListGirlsResponse } from "@workspace/api-zod";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query: Record<string, any> = {};
    searchParams.forEach((val, key) => {
      query[key] = val;
    });

    const parsed = ListGirlsQueryParams.safeParse(query);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.message }, { status: 400 });
    }

    const { category, status, minPrice, maxPrice, ethnicity, bodyType } = parsed.data;

    const conditions = [];
    if (status) conditions.push(eq(girlsTable.status, status));
    if (minPrice !== undefined) conditions.push(gte(girlsTable.pricePerMin, minPrice));
    if (maxPrice !== undefined) conditions.push(lte(girlsTable.pricePerMin, maxPrice));
    if (ethnicity) conditions.push(eq(girlsTable.ethnicity, ethnicity));
    if (bodyType) conditions.push(eq(girlsTable.bodyType, bodyType));

    let rows = await db.select().from(girlsTable).where(conditions.length ? and(...conditions) : undefined);

    if (category) {
      rows = rows.filter((g: any) => g.categories.includes(category));
    }

    return NextResponse.json(ListGirlsResponse.parse(rows));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
