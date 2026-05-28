import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import PhotosContent from "./_content";

export const metadata: Metadata = createMetadata({
  title: "Exclusive Photos",
  description: "Browse exclusive performer photo galleries. Unlock premium private photo collections from your favorite girls.",
  path: "/photos",
  keywords: ["photos", "galleries", "exclusive", "premium", "performers"],
});

export default function PhotosPage() {
  return <PhotosContent />;
}
