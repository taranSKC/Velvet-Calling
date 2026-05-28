import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import LoginContentPage from "../login/_content";

export const metadata: Metadata = createMetadata({
  title: "Create Account",
  description: "Create your VelvetCall account to access live voice calls, chat, and exclusive content from gorgeous performers.",
  path: "/register",
  keywords: ["register", "sign up", "create account", "join"],
});

export default function RegisterPage() {
  return <LoginContentPage />;
}
