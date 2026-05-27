"use client";

import Link from "next/link";
import { useListFavorites } from "@workspace/api-client-react";
import GirlCard from "@/components/girl-card";
import { Heart } from "lucide-react";

const serif: React.CSSProperties = { fontFamily: "'Cormorant Garamond', serif" };
const sans: React.CSSProperties = { fontFamily: "'Raleway', sans-serif" };
const label: React.CSSProperties = { fontFamily: "'Raleway', sans-serif", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "0.62rem" };

export default function FavoritesPage() {
  const { data: girls, isLoading } = useListFavorites();

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <div className="mb-5 sm:mb-7">
        <h1 className="mb-1" style={{ ...serif, fontStyle: "italic", fontSize: "clamp(1.8rem, 8vw, 2.8rem)", color: "hsl(30 15% 92%)" }}>
          My Favorites
        </h1>
        <p style={{ color: "hsl(30 5% 48%)", ...label }}>The girls you keep coming back to</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden" style={{ aspectRatio: "2/3" }}>
              <div className="skeleton w-full h-full" />
            </div>
          ))}
        </div>
      ) : !girls?.length ? (
        <div
          className="text-center py-16 sm:py-24 rounded-2xl mx-auto max-w-sm"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "rgba(196,30,58,0.1)", border: "1px solid rgba(196,30,58,0.2)" }}
          >
            <Heart size={24} style={{ color: "hsl(0 72% 52%)" }} />
          </div>
          <h2 className="text-2xl font-semibold mb-2" style={{ ...serif, fontStyle: "italic", color: "hsl(30 15% 72%)" }}>
            No favorites yet
          </h2>
          <p className="mb-6 text-sm" style={{ color: "hsl(30 5% 42%)", ...sans, lineHeight: 1.65 }}>
            Find a performer who captivates you<br />and save her here.
          </p>
          <Link href="/girls" data-testid="link-browse-from-favorites">
            <span
              className="inline-block px-7 py-3 rounded-full font-bold text-white cursor-pointer transition-transform"
              style={{ background: "linear-gradient(135deg, hsl(0 72% 36%), hsl(0 72% 48%))", ...label, fontSize: "0.68rem" }}
            >
              Browse Performers
            </span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {girls.map((girl, i) => (
            <GirlCard key={girl.id} {...girl} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
