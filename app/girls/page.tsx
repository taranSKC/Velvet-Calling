import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import GirlsListPage from "./_content";

export const metadata: Metadata = createMetadata({
  title: "Browse Performers",
  description: "Browse hundreds of gorgeous performers available for live voice calls, intimate chat, and exclusive content. Filter by ethnicity, body type, and more.",
  path: "/girls",
  keywords: ["performers", "girls", "live calls", "adult chat", "browse"],
});

export default function GirlsPage() {
  return <GirlsListPage />;
}
