import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import HomeContent from "./_home-content";

export const metadata: Metadata = createMetadata({
  title: "VelvetCall — Talk to Your Fantasy Girls Live",
  description:
    "Live intimate calls, flirty chatrooms, and premium exclusive photo/video collections with hot performers. Browse hundreds of gorgeous performers now.",
  path: "/",
  keywords: ["home", "live calls", "fantasy", "adult entertainment"],
});

export default function HomePage() {
  return <HomeContent />;
}
