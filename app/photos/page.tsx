"use client";

import { useState } from "react";
import { useListPhotos } from "@workspace/api-client-react";
import { Lock, Heart } from "lucide-react";

const CATEGORIES = ["All", "Latina", "Asian", "MILF", "Ebony", "College Girls"];

const serif: React.CSSProperties = { fontFamily: "'Cormorant Garamond', serif" };
const sans: React.CSSProperties = { fontFamily: "'Raleway', sans-serif" };
const label: React.CSSProperties = { fontFamily: "'Raleway', sans-serif", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "0.62rem" };

export default function PhotosPage() {
  const [category, setCategory] = useState("All");

  const params: Record<string, string> = {};
  if (category !== "All") params.category = category;

  const { data: photos, isLoading } = useListPhotos(params);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <div className="mb-5 sm:mb-7">
        <h1 className="mb-1" style={{ ...serif, fontStyle: "italic", fontSize: "clamp(1.8rem, 8vw, 2.8rem)", color: "hsl(30 15% 92%)" }}>
          Photos
        </h1>
        <p style={{ color: "hsl(30 5% 48%)", ...label }}>Exclusive galleries from our performers</p>
      </div>

      {/* Category filter — horizontal scroll */}
      <div
        className="flex gap-2 overflow-x-auto pb-1 mb-5 scrollbar-none"
        style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            data-testid={`photo-category-${cat.toLowerCase()}`}
            className="px-3.5 py-2 rounded-full transition-all shrink-0 cursor-pointer"
            style={{
              background: category === cat ? "rgba(196,30,58,0.18)" : "rgba(255,255,255,0.04)",
              border: category === cat ? "1px solid rgba(196,30,58,0.4)" : "1px solid rgba(255,255,255,0.07)",
              color: category === cat ? "hsl(0 72% 68%)" : "hsl(30 5% 52%)",
              ...label,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-2 sm:gap-3 space-y-2 sm:space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden break-inside-avoid skeleton"
              style={{ height: `${180 + (i % 3) * 70}px` }}
            />
          ))}
        </div>
      ) : (
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-2 sm:gap-3 space-y-2 sm:space-y-3">
          {photos?.map((photo) => (
            <div
              key={photo.id}
              className="relative rounded-xl overflow-hidden break-inside-avoid cursor-pointer group"
              data-testid={`photo-card-${photo.id}`}
            >
              <img
                src={photo.thumbnailUrl}
                alt={photo.girlName}
                className="w-full object-cover transition-transform duration-500"
                style={{ filter: photo.isPremium ? "blur(4px) brightness(0.45)" : "brightness(0.82)" }}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(0,0,0,0.38)" }}
              />
              {photo.isPremium && (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Lock size={18} style={{ color: "hsl(43 74% 68%)" }} />
                  <span className="text-sm font-bold mt-1" style={{ color: "hsl(43 74% 68%)", ...sans }}>${photo.price}</span>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs font-semibold text-white truncate" style={{ ...sans }}>{photo.girlName}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Heart size={9} style={{ color: "hsl(0 72% 62%)" }} />
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.65)", ...sans }}>{photo.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
