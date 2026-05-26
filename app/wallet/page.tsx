"use client";

import { useState, useEffect, Suspense } from "react";
import { useGetWallet, getGetWalletQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { Wallet, TrendingUp, CreditCard, ArrowUpRight, ArrowDownLeft, Loader2 } from "lucide-react";

const TOP_UP_AMOUNTS = [
  { credits: 100, usd: 10 },
  { credits: 250, usd: 25 },
  { credits: 500, usd: 50 },
  { credits: 1000, usd: 100 },
  { credits: 2000, usd: 200 },
];
const sans: React.CSSProperties = { fontFamily: "'Raleway', sans-serif" };
const serif: React.CSSProperties = { fontFamily: "'Cormorant Garamond', serif" };
const label: React.CSSProperties = { fontFamily: "'Raleway', sans-serif", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "0.62rem" };

function WalletContent() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: wallet, isLoading } = useGetWallet();

  const [customAmount, setCustomAmount] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);

  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");

  // Secure URL feedback hook for completed/canceled checkouts
  useEffect(() => {
    if (success === "true") {
      queryClient.invalidateQueries({ queryKey: getGetWalletQueryKey() });
      toast({ title: "Payment Successful! 🎉", description: "Your wallet has been securely credited." });
      router.replace("/wallet");
    } else if (canceled === "true") {
      toast({ title: "Payment Canceled", description: "Your transactions were canceled.", variant: "destructive" });
      router.replace("/wallet");
    }
  }, [success, canceled, queryClient, router, toast]);

  const handleTopUp = async (amount: number) => {
    try {
      setIsRedirecting(true);
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast({ title: "Payment Initiation Failed", description: data.error || "Could not start checkout", variant: "destructive" });
        setIsRedirecting(false);
      }
    } catch (err: any) {
      toast({ title: "Payment Error", description: err.message || "An error occurred", variant: "destructive" });
      setIsRedirecting(false);
    }
  };

  const handleCustomTopUp = () => {
    const credits = parseFloat(customAmount);
    if (isNaN(credits) || credits <= 0) return;
    handleTopUp(credits / 10);
  };

  const formatDate = (s: string) =>
    new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <div className="max-w-2xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1
          className="mb-1"
          style={{ ...serif, fontStyle: "italic", fontSize: "clamp(1.8rem, 8vw, 2.8rem)", color: "hsl(30 15% 92%)" }}
        >
          Credits Wallet
        </h1>
        <p style={{ color: "hsl(30 5% 48%)", ...label }}>Manage your balance &amp; history</p>
      </div>

      {/* Balance card */}
      <div
        className="rounded-2xl p-6 sm:p-8 mb-5 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, hsl(0 40% 11%), hsl(240 15% 7%))",
          border: "1px solid rgba(196,30,58,0.2)",
          boxShadow: "0 0 40px rgba(139,0,0,0.12)",
        }}
      >
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none"
          style={{ background: "rgba(196,30,58,0.08)", transform: "translate(30%,-30%)" }} />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Wallet size={14} style={{ color: "hsl(43 74% 62%)" }} />
            <span style={{ color: "hsl(30 5% 55%)", ...label }}>Available Balance</span>
          </div>
          {isLoading ? (
            <div className="skeleton h-14 w-44 rounded-xl" />
          ) : (
            <div className="flex items-start gap-1">
              <span style={{ ...serif, fontSize: "clamp(2.8rem, 12vw, 4rem)", fontWeight: 700, color: "hsl(30 15% 96%)", lineHeight: 1 }}>
                {wallet?.balance !== undefined ? (wallet.balance * 10).toFixed(0) : "0"} Credits
              </span>
            </div>
          )}
          <p className="text-xs mt-1" style={{ color: "hsl(30 5% 45%)", ...label }}>1 USD = 10 Credits</p>
        </div>
      </div>

      {/* Top-up panel */}
      <div className="rounded-2xl p-5 sm:p-6 mb-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <h2 className="mb-4" style={{ ...serif, fontStyle: "italic", fontSize: "1.4rem", color: "hsl(30 15% 90%)" }}>Add Funds</h2>

        {/* Quick amounts */}
        <div className="grid grid-cols-5 gap-2 mb-4">
          {TOP_UP_AMOUNTS.map((amt) => (
            <button
              key={amt.credits}
              onClick={() => handleTopUp(amt.usd)}
              disabled={isLoading || isRedirecting}
              data-testid={`button-topup-${amt.credits}`}
              className="py-2 rounded-xl font-bold transition-all active:scale-90 hover:scale-105 cursor-pointer flex flex-col items-center justify-center gap-0.5"
              style={{ background: "rgba(212,168,67,0.1)", border: "1px solid rgba(212,168,67,0.22)", color: "hsl(43 74% 68%)", ...label }}
            >
              <span className="text-sm sm:text-base font-extrabold">{amt.credits}</span>
              <span className="text-[10px] opacity-70 lowercase font-normal" style={sans}>${amt.usd}</span>
            </button>
          ))}
        </div>

        {/* Custom amount */}
        <div>
          <div className="flex gap-2">
            <div
              className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <span style={{ color: "hsl(30 5% 50%)", ...sans }}>Credits:</span>
              <input
                type="number"
                placeholder="Custom credit amount"
                value={customAmount}
                disabled={isRedirecting}
                onChange={(e) => setCustomAmount(e.target.value)}
                data-testid="input-custom-amount"
                className="bg-transparent flex-1 text-sm outline-none min-w-0"
                style={{ color: "hsl(30 15% 88%)", ...sans }}
                min="10"
              />
            </div>
            <button
              onClick={handleCustomTopUp}
              disabled={isLoading || isRedirecting || !customAmount}
              data-testid="button-topup-custom"
              className="px-5 sm:px-6 py-3 rounded-xl font-bold text-white transition-all active:scale-90 shrink-0 cursor-pointer flex items-center gap-2"
              style={{
                background: isRedirecting ? "rgba(196,30,58,0.4)" : "linear-gradient(135deg, hsl(0 72% 36%), hsl(0 72% 48%))",
                ...label, fontSize: "0.68rem",
              }}
            >
              {isRedirecting && <Loader2 size={12} className="animate-spin" />}
              {isRedirecting ? "Redirecting…" : "Add"}
            </button>
          </div>
          {customAmount && !isNaN(parseFloat(customAmount)) && (
            <p className="text-xs text-right mt-1.5" style={{ color: "hsl(30 5% 45%)", ...sans }}>
              Cost: ${(parseFloat(customAmount) / 10).toFixed(2)} USD
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 mt-3">
          <CreditCard size={12} style={{ color: "hsl(30 5% 40%)" }} />
          <span style={{ color: "hsl(30 5% 40%)", ...label, fontSize: "0.58rem" }}>
            Secure checkout powered by Stripe
          </span>
        </div>
      </div>

      {/* Transaction history */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2 p-4 sm:p-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <TrendingUp size={14} style={{ color: "hsl(0 72% 58%)" }} />
          <h2 style={{ ...label, color: "hsl(30 15% 88%)", fontSize: "0.7rem" }}>Transaction History</h2>
        </div>

        {isLoading ? (
          <div className="p-5 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="skeleton w-8 h-8 rounded-full shrink-0" />
                <div className="flex-1">
                  <div className="skeleton h-3.5 rounded mb-1.5" />
                  <div className="skeleton h-3 rounded w-2/3" />
                </div>
                <div className="skeleton h-4 w-14 rounded shrink-0" />
              </div>
            ))}
          </div>
        ) : !wallet?.transactions?.length ? (
          <div className="text-center py-10">
            <p style={{ color: "hsl(30 5% 42%)", ...sans, fontSize: "0.85rem" }}>No transactions yet</p>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
            {wallet.transactions.map((tx) => (
              <div key={tx.id} className="flex items-center gap-3 p-3.5 sm:p-4" data-testid={`transaction-${tx.id}`}>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: tx.amount > 0 ? "rgba(34,197,94,0.13)" : "rgba(196,30,58,0.13)",
                    border: `1px solid ${tx.amount > 0 ? "rgba(34,197,94,0.25)" : "rgba(196,30,58,0.25)"}`,
                  }}
                >
                  {tx.amount > 0
                    ? <ArrowUpRight size={13} style={{ color: "#22c55e" }} />
                    : <ArrowDownLeft size={13} style={{ color: "hsl(0 72% 60%)" }} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: "hsl(30 15% 82%)", ...sans }}>
                    {tx.description?.replace(/\$(\d+(\.\d+)?)/g, (_, val) => `${(parseFloat(val) * 10).toFixed(0)} Credits`)}
                  </p>
                  <p className="text-xs" style={{ color: "hsl(30 5% 42%)", ...sans }}>{formatDate(tx.createdAt)}</p>
                </div>
                <span
                  className="text-sm font-bold shrink-0"
                  style={{ color: tx.amount > 0 ? "#22c55e" : "hsl(0 72% 62%)", ...sans }}
                >
                  {tx.amount > 0 ? "+" : "-"}{(Math.abs(tx.amount) * 10).toFixed(0)} Credits
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function WalletPage() {
  return (
    <Suspense fallback={
      <div className="max-w-2xl mx-auto px-3 sm:px-4 py-6 sm:py-8 text-center" style={{ minHeight: "60vh" }}>
        <p style={{ color: "hsl(30 5% 50%)", fontFamily: "'Raleway', sans-serif" }}>Loading wallet...</p>
      </div>
    }>
      <WalletContent />
    </Suspense>
  );
}
