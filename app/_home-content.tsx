"use client";

import Link from "next/link";
import { useGetTrendingGirls, useListCategories, useGetSiteStats } from "@workspace/api-client-react";
import GirlCard from "@/components/girl-card";
import { ChevronRight, Users, Video, Image, Radio, Phone } from "lucide-react";

export default function HomeContent() {
  const { data: trendingGirls, isLoading: loadingGirls } = useGetTrendingGirls();
  const { data: categories } = useListCategories();
  const { data: stats } = useGetSiteStats();

  return (
    <div>
      {/* ══════════════ HERO ══════════════ */}
      <section
        className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{
          minHeight: "calc(100svh - 56px)",
          background: "linear-gradient(160deg, hsl(240 20% 5%) 0%, hsl(0 35% 9%) 50%, hsl(240 20% 5%) 100%)",
          padding: "60px 20px 80px",
        }}
      >
        {/* Ambient orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div style={{
            position: "absolute", top: "20%", left: "15%",
            width: "min(400px, 60vw)", height: "min(400px, 60vw)",
            borderRadius: "50%", filter: "blur(80px)",
            background: "rgba(139,0,0,0.13)",
          }} />
          <div style={{
            position: "absolute", bottom: "25%", right: "10%",
            width: "min(300px, 45vw)", height: "min(300px, 45vw)",
            borderRadius: "50%", filter: "blur(80px)",
            background: "rgba(212,168,67,0.07)",
          }} />
        </div>

        {/* Live stats pill */}
        {stats && (
          <div
            className="flex items-center gap-3 sm:gap-5 px-4 py-2 rounded-full mb-8 flex-wrap justify-center"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              fontSize: "0.72rem",
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 600,
              letterSpacing: "0.06em",
            }}
          >
            <span className="flex items-center gap-1.5">
              <span className="online-dot w-1.5 h-1.5 rounded-full" style={{ background: "#22c55e" }} />
              <span style={{ color: "#22c55e" }}>{stats.onlineCount} LIVE</span>
            </span>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
            <span style={{ color: "hsl(30 5% 55%)" }}>{stats.totalGirls} PERFORMERS</span>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
            <span style={{ color: "hsl(30 5% 55%)" }}>{stats.totalVideos} VIDEOS</span>
          </div>
        )}

        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
          style={{
            background: "rgba(196,30,58,0.12)",
            border: "1px solid rgba(196,30,58,0.28)",
            color: "hsl(0 72% 68%)",
            fontSize: "0.65rem",
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Live Intimate Calls &amp; Exclusive Content
        </div>

        {/* Main heading */}
        <h1
          className="relative z-10 mb-5"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.6rem, 10vw, 5.5rem)",
            fontWeight: 600,
            fontStyle: "italic",
            lineHeight: 1.05,
            color: "hsl(30 15% 95%)",
            maxWidth: "800px",
            letterSpacing: "0.01em",
          }}
        >
          Talk to Your{" "}
          <span
            style={{
              background: "linear-gradient(135deg, hsl(0 72% 60%), hsl(0 72% 45%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Fantasy Girls
          </span>
          {" "}Right Now
        </h1>

        <p
          className="mb-8 max-w-lg mx-auto"
          style={{
            color: "hsl(30 5% 56%)",
            lineHeight: "1.75",
            fontSize: "clamp(0.875rem, 3vw, 1.05rem)",
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 400,
          }}
        >
          Hundreds of gorgeous performers waiting to connect with you.
          Live voice calls, intimate chat, exclusive content — all in one place.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xs sm:max-w-none">
          <Link href="/girls" data-testid="button-browse-girls-hero">
            <span
              className="btn-pulse velvet-glow inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 sm:px-10 py-4 rounded-full font-bold text-white cursor-pointer transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, hsl(0 72% 36%), hsl(0 72% 50%))",
                boxShadow: "0 0 30px rgba(196,30,58,0.4)",
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.9rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                minWidth: "200px",
              }}
            >
              Browse Girls
              <ChevronRight size={16} />
            </span>
          </Link>
          <Link href="/live" data-testid="button-live-now-hero">
            <span
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full cursor-pointer transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "hsl(30 15% 78%)",
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                minWidth: "180px",
              }}
            >
              <Radio size={14} style={{ color: "#22c55e" }} />
              Voice Call Live
            </span>
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <div className="w-px h-10 rounded-full" style={{ background: "linear-gradient(to bottom, rgba(196,30,58,0.5), transparent)" }} />
        </div>
      </section>

      {/* ══════════════ TRENDING ══════════════ */}
      <section className="py-12 sm:py-16 px-4 max-w-7xl mx-auto" aria-label="Trending Performers">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h2
              className="mb-1"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.6rem, 6vw, 2.2rem)", fontStyle: "italic", color: "hsl(30 15% 92%)" }}
            >
              Trending Tonight
            </h2>
            <p style={{ color: "hsl(30 5% 50%)", fontSize: "0.8rem", fontFamily: "'Raleway', sans-serif", letterSpacing: "0.04em" }}>
              Our most popular performers
            </p>
          </div>
          <Link href="/girls" data-testid="link-see-all-girls">
            <span
              className="flex items-center gap-1 cursor-pointer shrink-0"
              style={{ color: "hsl(0 72% 62%)", fontSize: "0.78rem", fontFamily: "'Raleway', sans-serif", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}
            >
              See all <ChevronRight size={13} />
            </span>
          </Link>
        </div>

        {loadingGirls ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="rounded-xl overflow-hidden" style={{ aspectRatio: "2/3" }}>
                <div className="skeleton w-full h-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {trendingGirls?.slice(0, 5).map((girl, i) => (
              <GirlCard key={girl.id} {...girl} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* ══════════════ CATEGORIES ══════════════ */}
      <section className="py-10 sm:py-14 px-4" style={{ background: "rgba(255,255,255,0.012)" }} aria-label="Browse by Category">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h2
              className="mb-1"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.6rem, 6vw, 2.2rem)", fontStyle: "italic", color: "hsl(30 15% 92%)" }}
            >
              Browse by Category
            </h2>
            <p style={{ color: "hsl(30 5% 50%)", fontSize: "0.8rem", fontFamily: "'Raleway', sans-serif", letterSpacing: "0.04em" }}>
              Find exactly what you're looking for
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {categories?.map((cat) => (
              <Link key={cat.id} href={`/girls?category=${cat.slug}`} data-testid={`link-category-${cat.slug}`} className="block">
                <div
                  className="relative rounded-xl overflow-hidden cursor-pointer group"
                  style={{ aspectRatio: "4/3" }}
                >
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)" }}
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "rgba(196,30,58,0.18)" }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                    <h3
                      className="text-white font-semibold"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1rem, 3vw, 1.25rem)", fontStyle: "italic" }}
                    >
                      {cat.name}
                    </h3>
                    <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.68rem", fontFamily: "'Raleway', sans-serif", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      {cat.count} performers
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FEATURES ══════════════ */}
      <section className="py-14 sm:py-20 px-4 max-w-7xl mx-auto" aria-label="Features">
        <div className="text-center mb-10 sm:mb-14">
          <h2
            className="mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 7vw, 2.8rem)", fontStyle: "italic", color: "hsl(30 15% 92%)" }}
          >
            The Ultimate Intimate Experience
          </h2>
          <p style={{ color: "hsl(30 5% 50%)", fontFamily: "'Raleway', sans-serif", fontSize: "0.85rem", letterSpacing: "0.04em" }}>
            Everything you need to feel truly connected
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { icon: Phone, title: "Live Voice Calls", desc: "Hear her voice, share your secrets. Real-time intimate voice connections." },
            { icon: Video, title: "Exclusive Videos", desc: "Unlock her private collection. Premium content she made just for you." },
            { icon: Image, title: "Photo Galleries", desc: "Browse thousands of exclusive photos. Unlock full collections privately." },
            { icon: Users, title: "GFE Mode", desc: "The Girlfriend Experience. The most intimate connection online." },
          ].map(({ icon: Icon, title, desc }) => (
            <article
              key={title}
              className="glass-card rounded-xl p-5 sm:p-6 text-center"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(196,30,58,0.12)", border: "1px solid rgba(196,30,58,0.22)" }}
              >
                <Icon size={18} style={{ color: "hsl(0 72% 65%)" }} />
              </div>
              <h3
                className="font-semibold mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontStyle: "italic", color: "hsl(30 15% 90%)" }}
              >
                {title}
              </h3>
              <p style={{ color: "hsl(30 5% 52%)", lineHeight: "1.65", fontSize: "0.83rem", fontFamily: "'Raleway', sans-serif" }}>
                {desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-10 px-4 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-7xl mx-auto">
          <p
            className="mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontStyle: "italic", color: "hsl(0 72% 55%)" }}
          >
            VelvetCall
          </p>
          <p className="text-xs mb-3" style={{ color: "hsl(30 5% 38%)", fontFamily: "'Raleway', sans-serif" }}>
            All performers are 18+ verified adults. This platform contains adult content.
          </p>
          <p className="text-xs" style={{ color: "hsl(30 5% 28%)", fontFamily: "'Raleway', sans-serif" }}>
            © 2025 VelvetCall — All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
