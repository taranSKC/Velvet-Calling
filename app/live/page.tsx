"use client";

import { useGetOnlineGirls } from "@workspace/api-client-react";
import GirlCard from "@/components/girl-card";
import { Radio } from "lucide-react";

const serif: React.CSSProperties = { fontFamily: "'Cormorant Garamond', serif" };
const sans: React.CSSProperties = { fontFamily: "'Raleway', sans-serif" };
const label: React.CSSProperties = { fontFamily: "'Raleway', sans-serif", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "0.62rem" };

export default function LivePage() {
  const { data: girls, isLoading } = useGetOnlineGirls();

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.28)", color: "#22c55e", ...label }}
          >
            <span className="online-dot w-1.5 h-1.5 rounded-full" style={{ background: "#22c55e" }} />
            Live Now
          </span>
        </div>
        <h1
          className="mb-1"
          style={{ ...serif, fontStyle: "italic", fontSize: "clamp(1.8rem, 8vw, 2.8rem)", color: "hsl(30 15% 92%)" }}
        >
          Live Cams
        </h1>
        <p style={{ color: "hsl(30 5% 48%)", ...label }}>
          {isLoading ? "Loading…" : `${girls?.length ?? 0} performers live right now`}
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden" style={{ aspectRatio: "2/3" }}>
              <div className="skeleton w-full h-full" />
            </div>
          ))}
        </div>
      ) : !girls?.length ? (
        <div
          className="text-center py-20 rounded-2xl"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <Radio size={36} className="mx-auto mb-4" style={{ color: "hsl(0 72% 50%)" }} />
          <h2 className="text-2xl font-semibold mb-2" style={{ ...serif, fontStyle: "italic", color: "hsl(30 15% 76%)" }}>
            No one live right now
          </h2>
          <p style={{ color: "hsl(30 5% 42%)", ...sans, fontSize: "0.85rem" }}>Check back soon — they'll be here.</p>
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
