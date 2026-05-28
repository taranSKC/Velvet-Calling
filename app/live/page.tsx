import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import LiveContent from "./_content";

export const metadata: Metadata = createMetadata({
  title: "Live Online Performers",
  description: "See which performers are live and available for voice calls right now. Connect instantly with gorgeous girls online.",
  path: "/live",
  keywords: ["live", "online", "voice calls", "live chat", "performers"],
});

export default function LivePage() {
  return <LiveContent />;
}
