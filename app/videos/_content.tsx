"use client";

import { useState } from "react";
import { useListVideos, useGetWallet, useSendTip, getGetWalletQueryKey } from "@workspace/api-client-react";
import { Lock, Play, Search, X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SORTS = [
  { value: "newest", label: "Newest" },
  { value: "popular", label: "Popular" },
  { value: "top_rated", label: "Top Rated" },
];
const CATEGORIES = ["All", "Latina", "Asian", "MILF", "Ebony", "College Girls"];

const serif: React.CSSProperties = { fontFamily: "'Cormorant Garamond', serif" };
const sans: React.CSSProperties = { fontFamily: "'Raleway', sans-serif" };
const label: React.CSSProperties = { fontFamily: "'Raleway', sans-serif", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "0.62rem" };

export default function VideosContent() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: session } = useSession();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [category, setCategory] = useState("All");
  const [playingVideo, setPlayingVideo] = useState<any>(null);

  const { data: wallet } = useGetWallet();
  const sendTip = useSendTip();

  const handleWatchVideo = (video: any) => {
    if (!session?.user) {
      toast({
        title: "🔒 Authentication Required",
        description: "Please sign in to watch exclusive performer videos.",
        variant: "destructive"
      });
      router.push(`/login?callbackUrl=/videos`);
      return;
    }

    if (video.isPremium) {
      const confirmUnlock = window.confirm(`Unlock premium video "${video.title}" for ${(video.price * 10).toFixed(0)} Credits?`);
      if (!confirmUnlock) return;

      if (!wallet || wallet.balance < video.price) {
        toast({
          title: "Insufficient balance",
          description: "Please top up your wallet to unlock this video.",
          variant: "destructive"
        });
        router.push("/wallet");
        return;
      }

      sendTip.mutate(
        { data: { girlId: video.girlId, amount: video.price, message: `Unlocked video: ${video.title}` } },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getGetWalletQueryKey() });
            toast({
              title: "Video Unlocked! 🎉",
              description: `Successfully unlocked "${video.title}"`
            });
            setPlayingVideo(video);
          }
        }
      );
    } else {
      setPlayingVideo(video);
    }
  };

  const params: Record<string, string> = { sort };
  if (search) params.search = search;
  if (category !== "All") params.category = category;

  const { data: videos, isLoading } = useListVideos(params);

  const fmtDur = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const fmtViews = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <div className="mb-5 sm:mb-7">
        <h1 className="mb-1" style={{ ...serif, fontStyle: "italic", fontSize: "clamp(1.8rem, 8vw, 2.8rem)", color: "hsl(30 15% 92%)" }}>
          Videos
        </h1>
        <p style={{ color: "hsl(30 5% 48%)", ...label }}>Exclusive collections from our performers</p>
      </div>

      {/* Search */}
      <div
        className="flex items-center gap-2 px-3 py-2.5 rounded-xl mb-4"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <Search size={14} style={{ color: "hsl(30 5% 45%)", flexShrink: 0 }} />
        <input
          type="text"
          placeholder="Search videos…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-testid="input-search-videos"
          className="bg-transparent flex-1 text-sm outline-none min-w-0"
          style={{ color: "hsl(30 15% 88%)", ...sans }}
        />
        {search && <button onClick={() => setSearch("")} className="cursor-pointer"><X size={13} style={{ color: "hsl(30 5% 45%)" }} /></button>}
      </div>

      {/* Sort + Category — scrollable on mobile */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-4 scrollbar-none" style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}>
        {SORTS.map((s) => (
          <button
            key={s.value}
            onClick={() => setSort(s.value)}
            data-testid={`sort-${s.value}`}
            className="px-3.5 py-2 rounded-xl transition-all shrink-0 cursor-pointer"
            style={{
              background: sort === s.value ? "rgba(196,30,58,0.18)" : "rgba(255,255,255,0.05)",
              border: sort === s.value ? "1px solid rgba(196,30,58,0.4)" : "1px solid rgba(255,255,255,0.07)",
              color: sort === s.value ? "hsl(0 72% 68%)" : "hsl(30 5% 55%)",
              ...label,
            }}
          >
            {s.label}
          </button>
        ))}
        <div style={{ width: "1px", background: "rgba(255,255,255,0.08)", margin: "4px 4px" }} />
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            data-testid={`category-${cat.toLowerCase()}`}
            className="px-3.5 py-2 rounded-xl transition-all shrink-0 cursor-pointer"
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
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
              <div className="skeleton w-full h-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {videos?.map((video) => (
            <article
              key={video.id}
              onClick={() => handleWatchVideo(video)}
              className="glass-card rounded-xl overflow-hidden cursor-pointer group"
              data-testid={`card-video-${video.id}`}
            >
              <div className="relative" style={{ aspectRatio: "16/9" }}>
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500"
                  style={{ filter: video.isPremium ? "blur(3px) brightness(0.45)" : "brightness(0.82)" }}
                  loading="lazy"
                />
                <div
                  className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded text-xs font-bold"
                  style={{ background: "rgba(0,0,0,0.82)", color: "white", ...sans }}
                >
                  {fmtDur(video.duration)}
                </div>
                {video.isPremium ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Lock size={18} style={{ color: "hsl(43 74% 68%)" }} />
                    <span className="text-xs font-bold mt-1" style={{ color: "hsl(43 74% 68%)", ...sans }}>{((video.price ?? 0) * 10).toFixed(0)} Credits</span>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(196,30,58,0.88)" }}>
                      <Play size={14} fill="white" className="text-white ml-0.5" />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-2.5 sm:p-3">
                <h2 className="text-xs sm:text-sm font-medium mb-1 line-clamp-1" style={{ color: "hsl(30 15% 86%)", ...sans }}>{video.title}</h2>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "hsl(30 5% 48%)", ...sans }}>{video.girlName}</span>
                  <span className="text-xs" style={{ color: "hsl(30 5% 42%)", ...sans }}>{fmtViews(video.views)} views</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
      {/* ── Video Player Modal ── */}
      {playingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-[#0d0714] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <h3 className="font-serif italic text-lg text-purple-100">{playingVideo.title}</h3>
              <button
                onClick={() => setPlayingVideo(null)}
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-purple-300 hover:text-white transition-all cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            {/* Player */}
            <div className="relative aspect-video bg-black">
              <video
                src={playingVideo.videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4"}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
