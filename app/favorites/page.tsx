import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import FavoritesContent from "./_content";

export const metadata: Metadata = createMetadata({
  title: "My Favorites",
  description: "View your favorite performers. Save the girls you love and come back to them anytime.",
  path: "/favorites",
  keywords: ["favorites", "saved", "performers", "bookmarks"],
});

export default function FavoritesPage() {
  return <FavoritesContent />;
}
