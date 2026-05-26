import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, favoritesTable } from "@workspace/db";
import { RemoveFavoriteParams } from "@workspace/api-zod";

export async function DELETE(request: Request, { params }: { params: Promise<{ girlId: string }> }) {
  try {
    const rawParams = await params;
    const parsedParams = RemoveFavoriteParams.safeParse({ girlId: rawParams.girlId });
    if (!parsedParams.success) {
      return NextResponse.json({ error: parsedParams.error.message }, { status: 400 });
    }

    await db.delete(favoritesTable).where(eq(favoritesTable.girlId, parsedParams.data.girlId));
    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
