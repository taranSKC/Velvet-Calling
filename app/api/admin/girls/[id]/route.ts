import { NextResponse } from "next/server";
import { db, girlsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";

// PATCH /api/admin/girls/[id] - Update performer properties (Admin exclusive)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
  }

  const { id } = await params;
  const girlId = Number(id);

  if (!girlId) {
    return NextResponse.json({ error: "Missing or invalid id" }, { status: 400 });
  }

  try {
    const body = await request.json();
    
    // Find the current record
    const [existing] = await db.select().from(girlsTable).where(eq(girlsTable.id, girlId)).limit(1);
    if (!existing) {
      return NextResponse.json({ error: "Performer not found" }, { status: 404 });
    }

    const {
      name,
      age,
      status,
      pricePerMin,
      avatarUrl,
      coverUrl,
      bio,
      shortBio,
      specialties,
      categories,
      isOnline,
      rating,
      ethnicity,
      bodyType,
      hairColor,
      photoCount,
      videoCount,
      languages,
      joinedYear,
      voiceId, // Update secure backend voice mapping
    } = body;

    // Update performer record
    const [updated] = await db
      .update(girlsTable)
      .set({
        name: name !== undefined ? name : existing.name,
        age: age !== undefined ? Number(age) : existing.age,
        status: status !== undefined ? status : existing.status,
        pricePerMin: pricePerMin !== undefined ? Number(pricePerMin) : existing.pricePerMin,
        avatarUrl: avatarUrl !== undefined ? avatarUrl : existing.avatarUrl,
        coverUrl: coverUrl !== undefined ? coverUrl : existing.coverUrl,
        bio: bio !== undefined ? bio : existing.bio,
        shortBio: shortBio !== undefined ? shortBio : existing.shortBio,
        specialties: specialties !== undefined ? specialties : existing.specialties,
        categories: categories !== undefined ? categories : existing.categories,
        isOnline: isOnline !== undefined ? !!isOnline : existing.isOnline,
        rating: rating !== undefined ? Number(rating) : existing.rating,
        ethnicity: ethnicity !== undefined ? ethnicity : existing.ethnicity,
        bodyType: bodyType !== undefined ? bodyType : existing.bodyType,
        hairColor: hairColor !== undefined ? hairColor : existing.hairColor,
        photoCount: photoCount !== undefined ? Number(photoCount) : existing.photoCount,
        videoCount: videoCount !== undefined ? Number(videoCount) : existing.videoCount,
        languages: languages !== undefined ? languages : existing.languages,
        joinedYear: joinedYear !== undefined ? Number(joinedYear) : existing.joinedYear,
      })
      .where(eq(girlsTable.id, girlId))
      .returning();

    // Securely update backend voice mapping if voiceId is supplied
    if (voiceId && name) {
      const fs = require("fs");
      const path = require("path");
      const registryPath = path.join(process.cwd(), "utils/voice-registry.ts");
      
      try {
        let registryContent = fs.readFileSync(registryPath, "utf-8");
        
        // Check if name is already present
        const searchPattern = `"${name}": {`;
        const existsIndex = registryContent.indexOf(searchPattern);
        
        if (existsIndex !== -1) {
          // Replace existing entry's voiceId
          const blockStart = registryContent.indexOf("voiceId:", existsIndex);
          if (blockStart !== -1) {
            const lineEnd = registryContent.indexOf("\n", blockStart);
            const oldLine = registryContent.slice(blockStart, lineEnd);
            const newLine = `voiceId: "${voiceId}",`;
            registryContent = registryContent.replace(oldLine, newLine);
            fs.writeFileSync(registryPath, registryContent, "utf-8");
          }
        } else {
          // Append new entry
          const targetString = "export const VOICE_REGISTRY: Record<string, VoicePersona> = {";
          const index = registryContent.indexOf(targetString);
          if (index !== -1) {
            const insertPos = index + targetString.length;
            const newMapping = `\n  "${name}": {\n    voiceId: "${voiceId}",\n    backendName: "${name.split(" ")[0]}",\n    gender: "female",\n    language: "multilingual",\n    description: "Seductive Custom Persona"\n  },`;
            registryContent = 
              registryContent.slice(0, insertPos) + 
              newMapping + 
              registryContent.slice(insertPos);
            fs.writeFileSync(registryPath, registryContent, "utf-8");
          }
        }
      } catch (err) {
        console.error("Failed to update voice registry entry:", err);
      }
    }

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/admin/girls/[id] - Remove performer (Admin exclusive)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
  }

  const { id } = await params;
  const girlId = Number(id);

  if (!girlId) {
    return NextResponse.json({ error: "Missing or invalid id" }, { status: 400 });
  }

  try {
    const [deleted] = await db.delete(girlsTable).where(eq(girlsTable.id, girlId)).returning();
    if (!deleted) {
      return NextResponse.json({ error: "Performer not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, deleted });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
