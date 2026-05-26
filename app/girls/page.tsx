"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useListGirls } from "@workspace/api-client-react";
import GirlCard from "@/components/girl-card";
import { SlidersHorizontal, Search, X } from "lucide-react";

const STATUSES = ["All", "online", "busy", "offline"];
const ETHNICITIES = ["All", "Caucasian", "Latina", "Asian", "Ebony"];
const BODY_TYPES = ["All", "Petite", "Slim", "Athletic", "Curvy"];

const velvetLabel: React.CSSProperties = {
  fontFamily: "'Raleway', sans-serif",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  fontSize: "0.6rem",
};

function GirlsContent() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category") || "";
  const [search, setSearch] = useState("");
  const [ethnicity, setEthnicity] = useState("All");
  const [bodyType, setBodyType] = useState("All");
  const [status, setStatus] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const params: Record<string, string | number | undefined> = {};
  if (ethnicity !== "All") params.ethnicity = ethnicity;
  if (bodyType !== "All") params.bodyType = bodyType;
  if (status !== "All") params.status = status;
  if (urlCategory) params.category = urlCategory;

  const { data: girls, isLoading } = useListGirls(params);

  const filtered = girls?.filter((g) => {
    if (!search) return true;
    return g.name.toLowerCase().includes(search.toLowerCase()) || (g.shortBio ?? "").toLowerCase().includes(search.toLowerCase());
  }) ?? [];

  const FilterChip = ({ label, value, active, onClick }: { label: string; value: string; active: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="px-3 py-1.5 rounded-full text-xs transition-all duration-150 active:scale-95 cursor-pointer"
      style={{
        background: active ? "rgba(196,30,58,0.22)" : "rgba(255,255,255,0.04)",
        border: active ? "1px solid rgba(196,30,58,0.45)" : "1px solid rgba(255,255,255,0.07)",
        color: active ? "hsl(0 72% 68%)" : "hsl(30 5% 55%)",
        ...velvetLabel,
      }}
    >
      {label}
    </button>
  );

  const pageTitle = urlCategory
    ? urlCategory.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "All Performers";

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-5 sm:mb-7">
        <h1
          className="mb-1"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 8vw, 2.8rem)", fontStyle: "italic", color: "hsl(30 15% 92%)" }}
        >
          {pageTitle}
        </h1>
        <p style={{ color: "hsl(30 5% 48%)", fontSize: "0.78rem", fontFamily: "'Raleway', sans-serif", letterSpacing: "0.04em" }}>
          {isLoading ? "Loading..." : `${filtered.length} performers found`}
        </p>
      </div>

      {/* Search + filter toggle */}
      <div className="flex items-center gap-2 mb-4">
        <div
          className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <Search size={14} style={{ color: "hsl(30 5% 45%)", flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search performers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-testid="input-search-girls"
            className="bg-transparent flex-1 text-sm outline-none min-w-0"
            style={{ color: "hsl(30 15% 88%)", fontFamily: "'Raleway', sans-serif" }}
          />
          {search && (
            <button onClick={() => setSearch("")} className="shrink-0 cursor-pointer">
              <X size={13} style={{ color: "hsl(30 5% 45%)" }} />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          data-testid="button-toggle-filters"
          className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 active:scale-95 shrink-0 cursor-pointer"
          style={{
            background: showFilters ? "rgba(196,30,58,0.18)" : "rgba(255,255,255,0.05)",
            border: showFilters ? "1px solid rgba(196,30,58,0.4)" : "1px solid rgba(255,255,255,0.08)",
            color: showFilters ? "hsl(0 72% 65%)" : "hsl(30 5% 55%)",
            ...velvetLabel,
          }}
        >
          <SlidersHorizontal size={13} />
          Filter
        </button>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div
          className="rounded-xl p-4 mb-5 grid grid-cols-1 sm:grid-cols-3 gap-4"
          style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {[
            { title: "Status", options: STATUSES, value: status, onChange: setStatus },
            { title: "Ethnicity", options: ETHNICITIES, value: ethnicity, onChange: setEthnicity },
            { title: "Body Type", options: BODY_TYPES, value: bodyType, onChange: setBodyType },
          ].map(({ title, options, value, onChange }) => (
            <div key={title}>
              <p className="text-xs mb-2" style={{ color: "hsl(30 5% 48%)", ...velvetLabel }}>{title}</p>
              <div className="flex flex-wrap gap-1.5">
                {options.map((opt) => (
                  <FilterChip key={opt} label={opt} value={opt} active={value === opt} onClick={() => onChange(opt)} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden" style={{ aspectRatio: "2/3" }}>
              <div className="skeleton w-full h-full" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl font-bold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "hsl(30 15% 65%)" }}>
            No performers found
          </p>
          <p style={{ color: "hsl(30 5% 42%)", fontFamily: "'Raleway', sans-serif", fontSize: "0.85rem" }}>
            Try adjusting your filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {filtered.map((girl, i) => (
            <GirlCard key={girl.id} {...girl} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function GirlsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="skeleton w-64 h-12 mb-8" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden" style={{ aspectRatio: "2/3" }}>
              <div className="skeleton w-full h-full" />
            </div>
          ))}
        </div>
      </div>
    }>
      <GirlsContent />
    </Suspense>
  );
}
