import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import AdminContent from "./_content";

export const metadata: Metadata = createMetadata({
  title: "Admin Dashboard",
  description: "Administrative dashboard for managing performers, photos, and videos.",
  path: "/admin",
  noIndex: true,
});

export default function AdminPage() {
  return <AdminContent />;
}
