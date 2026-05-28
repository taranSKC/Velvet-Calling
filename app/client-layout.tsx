"use client";

import { useState, useEffect } from "react";
import AgeGate from "@/components/age-gate";
import Nav from "@/components/layout/nav";
import { Toaster } from "@/components/ui/toaster";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [ageVerified, setAgeVerified] = useState(false);

  useEffect(() => {
    setMounted(true);
    setAgeVerified(localStorage.getItem("ageVerified") === "true");
  }, []);

  const handleVerify = () => {
    localStorage.setItem("ageVerified", "true");
    setAgeVerified(true);
  };

  const handleDecline = () => {
    window.location.href = "https://www.google.com";
  };

  if (!mounted) {
    return (
      <div className="min-h-screen" style={{ background: "hsl(240 15% 4%)", color: "hsl(30 15% 92%)" }}>
        <main className="pb-16 md:pb-0">{children}</main>
      </div>
    );
  }

  return (
    <>
      {!ageVerified && <AgeGate onVerify={handleVerify} onDecline={handleDecline} />}
      <Nav />
      <main className="pb-16 md:pb-0" style={{ background: "hsl(240 15% 4%)", color: "hsl(30 15% 92%)" }}>{children}</main>
      <Toaster />
    </>
  );
}
