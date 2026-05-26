"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetWallet } from "@workspace/api-client-react";
import { Wallet, Heart, Video, Image, Users, Radio } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Nav() {
  const pathname = usePathname();
  const { data: wallet } = useGetWallet();
  const { data: session } = useSession();

  const navLinks = [
    { href: "/girls", label: "Girls", icon: Users },
    { href: "/live", label: "Live", icon: Radio },
    { href: "/videos", label: "Videos", icon: Video },
    { href: "/photos", label: "Photos", icon: Image },
    { href: "/favorites", label: "Saved", icon: Heart },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* Top nav */}
      <nav
        className="sticky top-0 z-50 w-full"
        style={{
          background: "rgba(8,6,16,0.96)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
          {/* Logo */}
          <Link href="/" data-testid="link-home-logo" className="flex items-center cursor-pointer select-none shrink-0">
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.55rem",
                fontWeight: 700,
                fontStyle: "italic",
                letterSpacing: "0.01em",
                color: "hsl(30 15% 92%)",
                lineHeight: 1,
              }}
            >
              <span style={{ color: "hsl(0 72% 55%)" }}>V</span>elvetCall
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-5">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} data-testid={`link-nav-${label.toLowerCase()}`} className="flex items-center gap-1.5 text-sm cursor-pointer transition-colors duration-200">
                <span
                  className="flex items-center gap-1.5 text-sm cursor-pointer transition-colors duration-200"
                  style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    color: isActive(href) ? "hsl(0 72% 65%)" : "hsl(30 5% 58%)",
                  }}
                >
                  <Icon size={13} />
                  {label}
                  {href === "/live" && (
                    <span
                      className="online-dot w-1.5 h-1.5 rounded-full"
                      style={{ background: "#22c55e" }}
                    />
                  )}
                </span>
              </Link>
            ))}
          </div>

          {/* Right: Wallet + CTA */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {session?.user && (
              <Link href="/wallet" data-testid="link-nav-wallet" className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-200"
                style={{
                  background: "rgba(212,168,67,0.1)",
                  border: "1px solid rgba(212,168,67,0.22)",
                }}
              >
                <Wallet size={12} style={{ color: "hsl(43 74% 58%)" }} />
                <span
                  className="text-sm font-semibold"
                  style={{ fontFamily: "'Raleway', sans-serif", color: "hsl(43 74% 68%)", letterSpacing: "0.02em" }}
                >
                  {wallet?.balance !== undefined ? (wallet.balance * 10).toFixed(0) : "0"} Credits
                </span>
              </Link>
            )}

            <Link href="/girls" data-testid="link-nav-browse" className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg text-xs font-bold text-white cursor-pointer transition-all duration-200 active:scale-95"
              style={{
                background: "linear-gradient(135deg, hsl(0 72% 36%), hsl(0 72% 50%))",
                fontFamily: "'Raleway', sans-serif",
                letterSpacing: "0.07em",
                textTransform: "uppercase",
              }}
            >
              Browse
            </Link>

            {session?.user ? (
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-fuchsia-200 border border-fuchsia-800/35 select-none"
                  style={{
                    background: "radial-gradient(circle at center, hsl(300 70% 12%), hsl(280 60% 6%))",
                    boxShadow: "0 0 10px rgba(240,70,250,0.12)",
                    fontFamily: "'Raleway', sans-serif"
                  }}
                  title={session.user.name || "Dreamer"}
                >
                  {(session.user.name || "Dreamer").trim().charAt(0).toUpperCase()}
                </div>
                <button
                  onClick={() => signOut()}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold border border-white/10 text-purple-200/70 hover:text-white cursor-pointer active:scale-95 transition-all"
                  style={{ fontFamily: "'Raleway', sans-serif", textTransform: "uppercase", letterSpacing: "0.05em" }}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link href="/login" data-testid="link-nav-login" className="inline-flex items-center px-3.5 py-1.5 rounded-lg text-xs font-bold border border-fuchsia-800/40 text-fuchsia-200 hover:text-white cursor-pointer active:scale-95 transition-all bg-fuchsia-950/20"
                style={{ fontFamily: "'Raleway', sans-serif", textTransform: "uppercase", letterSpacing: "0.05em" }}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile fixed bottom tab bar */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50"
        style={{
          background: "rgba(6,4,14,0.98)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        <div className="flex items-center justify-around px-2 py-2">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link key={href} href={href} className="flex flex-col items-center gap-1 cursor-pointer px-3 py-1.5 rounded-xl transition-all duration-200 active:scale-90"
                style={{
                  color: active ? "hsl(0 72% 65%)" : "hsl(30 5% 48%)",
                  background: active ? "rgba(196,30,58,0.1)" : "transparent",
                }}
              >
                <Icon size={19} />
                <span
                  style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
