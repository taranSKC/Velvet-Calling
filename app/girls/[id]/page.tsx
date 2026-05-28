import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import GirlProfileContent from "./_content";

export const metadata: Metadata = createMetadata({
  title: "Performer Profile",
  description: "View performer profile, photos, videos, and start a live voice call. Chat privately and unlock exclusive content.",
  path: "/girls",
  keywords: ["performer", "profile", "live call", "voice chat", "exclusive content"],
});

export default function GirlProfilePage() {
  return <GirlProfileContent />;
}
