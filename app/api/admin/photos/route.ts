import { NextResponse } from "next/server";
import { db, photosTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";

// GET /api/admin/photos?girlId=... - Retrieve photos of a specific performer
export async function GET(request: Request) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const girlId = Number(searchParams.get("girlId"));

  try {
    let photos;
    if (girlId) {
      photos = await db.select().from(photosTable).where(eq(photosTable.girlId, girlId));
    } else {
      photos = await db.select().from(photosTable);
    }
    return NextResponse.json(photos);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/admin/photos - Add an additional photo for a performer
export async function POST(request: Request) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { url, thumbnailUrl, girlId, girlName, isPremium, price, category } = body;

    if (!url || !girlId || !girlName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const [newPhoto] = await db
      .insert(photosTable)
      .values({
        url,
        thumbnailUrl: thumbnailUrl || url,
        girlId: Number(girlId),
        girlName,
        isPremium: !!isPremium,
        price: price !== undefined ? Number(price) : null,
        category: category || "Uncategorized",
        likes: 0,
      })
      .returning();

    return NextResponse.json(newPhoto);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/admin/photos?id=... - Delete a performer photo
export async function DELETE(request: Request) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const photoId = Number(searchParams.get("id"));

  if (!photoId) {
    return NextResponse.json({ error: "Missing or invalid id" }, { status: 400 });
  }

  try {
    const [deleted] = await db.delete(photosTable).where(eq(photosTable.id, photoId)).returning();
    if (!deleted) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, deleted });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
