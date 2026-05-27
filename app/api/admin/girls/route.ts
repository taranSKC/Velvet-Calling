import { NextResponse } from "next/server";
import { db, girlsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";

// GET /api/admin/girls - Retrieve all performers (Admin exclusive)
export async function GET() {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
  }

  try {
    const girls = await db.select().from(girlsTable);
    return NextResponse.json(girls);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/admin/girls - Create a new performer (Admin exclusive)
export async function POST(request: Request) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
  }

  try {
    const body = await request.json();
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
      voiceId, // Secure backend voice mapping variable
    } = body;

    if (!name || !avatarUrl || pricePerMin === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Insert the new girl
    const [newGirl] = await db
      .insert(girlsTable)
      .values({
        name,
        age: Number(age || 21),
        status: status || "offline",
        pricePerMin: Number(pricePerMin),
        avatarUrl,
        coverUrl: coverUrl || avatarUrl,
        bio: bio || "",
        shortBio: shortBio || "",
        specialties: specialties || [],
        categories: categories || [],
        isOnline: !!isOnline,
        rating: Number(rating || 4.8),
        totalCalls: 0,
        ethnicity: ethnicity || "",
        bodyType: bodyType || "",
        hairColor: hairColor || "",
        photoCount: Number(photoCount || 0),
        videoCount: Number(videoCount || 0),
        languages: languages || ["English"],
        joinedYear: Number(joinedYear || new Date().getFullYear()),
      })
      .returning();

    // Securely update the backend voice mapping if voiceId is selected
    if (voiceId && newGirl) {
      const fs = require("fs");
      const path = require("path");
      const registryPath = path.join(process.cwd(), "utils/voice-registry.ts");
      
      try {
        let registryContent = fs.readFileSync(registryPath, "utf-8");
        
        // Find insert hook position inside VOICE_REGISTRY declaration
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
      } catch (err) {
        console.error("Failed to append voice registry entry:", err);
      }
    }

    return NextResponse.json(newGirl);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
