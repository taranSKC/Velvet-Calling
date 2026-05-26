import {
  db,
  girlsTable,
  categoriesTable,
  videosTable,
  photosTable,
  walletTable,
  transactionsTable,
  chatTable,
} from "./src/index";

async function main() {
  console.log("⏳ Seeding VelvetCall database...");

  // 1. Clear existing data
  console.log("🧹 Cleaning up old tables...");
  await db.delete(chatTable);
  await db.delete(photosTable);
  await db.delete(videosTable);
  await db.delete(girlsTable);
  await db.delete(categoriesTable);
  await db.delete(transactionsTable);
  await db.delete(walletTable);

  // 2. Seed Categories
  console.log("🏷️ Seeding categories...");
  const categories = [
    {
      name: "College Girls",
      slug: "college-girls",
      count: 14,
      imageUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&auto=format&fit=crop&q=80",
    },
    {
      name: "MILFs",
      slug: "milfs",
      count: 8,
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80",
    },
    {
      name: "Ebony",
      slug: "ebony",
      count: 11,
      imageUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&auto=format&fit=crop&q=80",
    },
    {
      name: "Asian",
      slug: "asian",
      count: 9,
      imageUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&auto=format&fit=crop&q=80",
    },
    {
      name: "Latina",
      slug: "latina",
      count: 12,
      imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80",
    },
    {
      name: "Petite",
      slug: "petite",
      count: 7,
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    },
    {
      name: "Curvy",
      slug: "curvy",
      count: 10,
      imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80",
    },
  ];

  await db.insert(categoriesTable).values(categories);

  // 3. Seed Girls
  console.log("👙 Seeding performers (girls)...");
  const girls = [
    {
      id: 1,
      name: "Ava Sinclair",
      age: 22,
      status: "online",
      pricePerMin: 3.99,
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80",
      coverUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1600&auto=format&fit=crop&q=80",
      bio: "Hey handsome! I'm Ava, a passionate college girl who loves dirty talking, cosplay, and fulfilling your wildest, most intimate desires. I am very open-minded, submissive when you want it, and dominant when you need a little discipline. Let's make an unforgettable connection tonight.",
      shortBio: "Submissive college babe who loves wild roles and GFE.",
      specialties: ["GFE", "Dirty Talk", "Roleplay", "Cosplay"],
      categories: ["college-girls", "petite"],
      isOnline: true,
      rating: 4.9,
      totalCalls: 312,
      ethnicity: "Latina",
      bodyType: "Petite",
      hairColor: "Brunette",
      languages: ["English", "Spanish"],
      joinedYear: 2024,
      photoCount: 12,
      videoCount: 4,
    },
    {
      id: 2,
      name: "Chloe Hart",
      age: 34,
      status: "online",
      pricePerMin: 5.99,
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
      coverUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1600&auto=format&fit=crop&q=80",
      bio: "Welcome to my room, darling. I'm Chloe, an elegant MILF with a highly sensual, experienced touch. I know exactly how to please a man and listen to his deepest secrets. Whether you want to talk about your day, indulge in sweet whispers, or explore intense taboo roleplay, I am here for you.",
      shortBio: "Sophisticated MILF with an experienced, highly seductive touch.",
      specialties: ["Taboo", "MILF", "Teasing", "Femdom"],
      categories: ["milfs", "curvy"],
      isOnline: true,
      rating: 4.8,
      totalCalls: 450,
      ethnicity: "Caucasian",
      bodyType: "Curvy",
      hairColor: "Blonde",
      languages: ["English", "French"],
      joinedYear: 2023,
      photoCount: 8,
      videoCount: 3,
    },
    {
      id: 3,
      name: "Emma Thorne",
      age: 20,
      status: "busy",
      availableIn: 4,
      pricePerMin: 2.99,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
      coverUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1600&auto=format&fit=crop&q=80",
      bio: "Hi! I'm Emma, a sweet, energetic blonde who is always up for a good laugh and some naughty fun. I love teasing on camera, wearing sexy lingerie, and having fun chats. I'm currently in a private call but I'll be free in just a few minutes, don't keep me waiting!",
      shortBio: "Playful blonde college girl with a sweet smile and naughty mind.",
      specialties: ["Lingerie", "GFE", "Sweet & Naughty", "Foot Fetish"],
      categories: ["college-girls", "petite"],
      isOnline: true,
      rating: 4.7,
      totalCalls: 188,
      ethnicity: "Caucasian",
      bodyType: "Slim",
      hairColor: "Blonde",
      languages: ["English"],
      joinedYear: 2025,
      photoCount: 6,
      videoCount: 2,
    },
    {
      id: 4,
      name: "Yuki Sakura",
      age: 24,
      status: "online",
      pricePerMin: 4.49,
      avatarUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&auto=format&fit=crop&q=80",
      coverUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1600&auto=format&fit=crop&q=80",
      bio: "Konichiwa! I'm Yuki, a sweet and highly expressive Japanese beauty. I absolute love cute outfits, dirty talks, and building deep, intimate connections with open-minded men. I'm very visual, love teasing with high heels, and want to make your wildest fantasies come to life.",
      shortBio: "Intimate and sensual Asian stunner who loves high heels and GFE.",
      specialties: ["GFE", "Foot Fetish", "Cosplay", "Visual Teasing"],
      categories: ["asian", "petite"],
      isOnline: true,
      rating: 4.95,
      totalCalls: 275,
      ethnicity: "Asian",
      bodyType: "Petite",
      hairColor: "Black",
      languages: ["English", "Japanese"],
      joinedYear: 2024,
      photoCount: 15,
      videoCount: 5,
    },
    {
      id: 5,
      name: "Naomi Brooks",
      age: 26,
      status: "online",
      pricePerMin: 4.99,
      avatarUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&auto=format&fit=crop&q=80",
      coverUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&auto=format&fit=crop&q=80",
      bio: "Hey baby. I'm Naomi, an Ebony goddess with mesmerizing curves and a voice that will send shivers down your spine. I specialize in dirty talking, sensual teasing, and premium GFE. I'm looking for a handsome partner to share some extremely intimate moments with. Ready for me?",
      shortBio: "Ebony goddess with stunning curves and an incredibly seductive voice.",
      specialties: ["Dirty Talk", "Curvy", "GFE", "Seductive Voice"],
      categories: ["ebony", "curvy"],
      isOnline: true,
      rating: 4.88,
      totalCalls: 395,
      ethnicity: "Ebony",
      bodyType: "Curvy",
      hairColor: "Dark Brown",
      languages: ["English"],
      joinedYear: 2023,
      photoCount: 10,
      videoCount: 4,
    },
  ];

  await db.insert(girlsTable).values(girls);

  // 4. Seed Photos
  console.log("📸 Seeding photos...");
  const photos = [
    {
      id: 1,
      girlId: 1,
      girlName: "Ava Sinclair",
      url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1200&auto=format&fit=crop&q=80",
      thumbnailUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&auto=format&fit=crop&q=80",
      isPremium: false,
      category: "Lingerie",
      likes: 120,
    },
    {
      id: 2,
      girlId: 1,
      girlName: "Ava Sinclair",
      url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&auto=format&fit=crop&q=80",
      thumbnailUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
      isPremium: true,
      price: 15.0,
      category: "Explicit",
      likes: 340,
    },
    {
      id: 3,
      girlId: 2,
      girlName: "Chloe Hart",
      url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&auto=format&fit=crop&q=80",
      thumbnailUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
      isPremium: false,
      category: "Elegant",
      likes: 85,
    },
    {
      id: 4,
      girlId: 2,
      girlName: "Chloe Hart",
      url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&auto=format&fit=crop&q=80",
      thumbnailUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
      isPremium: true,
      price: 25.0,
      category: "Boudoir",
      likes: 210,
    },
  ];

  await db.insert(photosTable).values(photos);

  // 5. Seed Videos
  console.log("🎥 Seeding videos...");
  const videos = [
    {
      id: 1,
      girlId: 1,
      girlName: "Ava Sinclair",
      title: "Sensual Lingerie Tease & Bedroom Chat",
      duration: 320,
      thumbnailUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&auto=format&fit=crop&q=80",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      category: "Teasing",
      isPremium: false,
      views: 1200,
      likes: 450,
    },
    {
      id: 2,
      girlId: 1,
      girlName: "Ava Sinclair",
      title: "Exclusive Dirty Talk & Undressing Fantasy",
      duration: 540,
      thumbnailUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      category: "Explicit",
      isPremium: true,
      price: 35.0,
      views: 4500,
      likes: 2100,
    },
    {
      id: 3,
      girlId: 2,
      girlName: "Chloe Hart",
      title: "An Elegant Tease in Silk Sheets",
      duration: 410,
      thumbnailUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      category: "Boudoir",
      isPremium: true,
      price: 49.0,
      views: 3100,
      likes: 1540,
    },
  ];

  await db.insert(videosTable).values(videos);

  // 6. Seed Wallet with starting balance
  console.log("💰 Seeding wallet...");
  const initialWallet = {
    id: 1,
    balance: 100.0,
    currency: "USD",
  };

  await db.insert(walletTable).values(initialWallet);

  // Seed transaction separately
  await db.insert(transactionsTable).values({
    id: 1,
    type: "topup",
    amount: 100.0,
    description: "Welcome Promo Topup",
  });

  // 7. Seed initial welcome messages
  console.log("💬 Seeding chat messages...");
  const chats = [
    {
      id: 1,
      girlId: 1,
      content: "Hey there handsome! Thanks for opening my private room. 💋 I was just lying on my bed thinking about what we could do tonight. Send me a message, don't be shy!",
      sender: "girl",
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 2,
      girlId: 2,
      content: "Hello, darling. It's so nice to meet you. I'm Chloe, and I love catering to mature tastes. Tell me: what is your deepest, most secret fantasy? I promise it's safe with me.",
      sender: "girl",
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 3,
      girlId: 4,
      content: "Konichiwa! 🌸 Welcome to my fantasy room. I'm Yuki, and I absolute love visual teasing. Let me know if you want to start a private video call or send a sweet tip! Click chat to talk.",
      sender: "girl",
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
  ];

  await db.insert(chatTable).values(chats);

  console.log("✅ VelvetCall database successfully seeded!");
}

main().catch((err) => {
  console.error("❌ Database seeding failed:", err);
  process.exit(1);
});
