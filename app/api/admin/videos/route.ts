import { NextResponse } from "next/server";
import { db, videosTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";

// GET /api/admin/videos?girlId=... - Retrieve videos of a specific performer
export async function GET(request: Request) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const girlId = Number(searchParams.get("girlId"));

  try {
    let videos;
    if (girlId) {
      videos = await db.select().from(videosTable).where(eq(videosTable.girlId, girlId));
    } else {
      videos = await db.select().from(videosTable);
    }
    return NextResponse.json(videos);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/admin/videos - Add a video for a performer
export async function POST(request: Request) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { title, duration, thumbnailUrl, videoUrl, girlId, girlName, category, isPremium, price } = body;

    if (!title || !girlId || !girlName || !thumbnailUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const [newVideo] = await db
      .insert(videosTable)
      .values({
        title,
        duration: Number(duration || 0),
        thumbnailUrl,
        videoUrl: videoUrl || null,
        girlId: Number(girlId),
        girlName,
        category: category || "Uncategorized",
        isPremium: !!isPremium,
        price: price !== undefined ? Number(price) : null,
        views: 0,
        likes: 0,
      })
      .returning();

    return NextResponse.json(newVideo);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/admin/videos?id=... - Delete a performer video
export async function DELETE(request: Request) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const videoId = Number(searchParams.get("id"));

  if (!videoId) {
    return NextResponse.json({ error: "Missing or invalid id" }, { status: 400 });
  }

  try {
    const [deleted] = await db.delete(videosTable).where(eq(videosTable.id, videoId)).returning();
    if (!deleted) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, deleted });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
