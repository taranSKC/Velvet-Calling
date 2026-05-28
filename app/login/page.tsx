import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import LoginContentPage from "./_content";

export const metadata: Metadata = createMetadata({
  title: "Sign In or Create Account",
  description: "Sign in to your VelvetCall account or create a new one to access live voice calls, chat, and exclusive content.",
  path: "/login",
  keywords: ["sign in", "login", "create account", "register"],
});

export default function LoginPage() {
  return <LoginContentPage />;
}
