import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import WalletContentPage from "./_content";

export const metadata: Metadata = createMetadata({
  title: "Credits Wallet",
  description: "Manage your VelvetCall credits wallet. Top up your balance with Stripe and view your transaction history.",
  path: "/wallet",
  keywords: ["wallet", "credits", "top up", "balance", "payment"],
});

export default function WalletPage() {
  return <WalletContentPage />;
}
