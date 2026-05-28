import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import VideosContent from "./_content";

export const metadata: Metadata = createMetadata({
  title: "Exclusive Videos",
  description: "Browse and unlock exclusive performer videos. Premium collections featuring your favorite girls.",
  path: "/videos",
  keywords: ["videos", "exclusive", "premium", "performers", "adult videos"],
});

export default function VideosPage() {
  return <VideosContent />;
}
