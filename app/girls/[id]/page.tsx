"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  useGetGirl,
  useGetGirlPhotos,
  useGetGirlVideos,
  useGetChatMessages,
  useSendChatMessage,
  useSendTip,
  useAddFavorite,
  useRemoveFavorite,
  useListFavorites,
  useGetWallet,
  getGetWalletQueryKey,
  getGetChatMessagesQueryKey,
  getGetGirlQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Video, MessageSquare, Heart, Lock, Star, Send, ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

const TIP_AMOUNTS = [5, 10, 25, 50];

const serif: React.CSSProperties = { fontFamily: "'Cormorant Garamond', serif" };
const sans: React.CSSProperties = { fontFamily: "'Raleway', sans-serif" };
const label: React.CSSProperties = { fontFamily: "'Raleway', sans-serif", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "0.62rem" };

export default function GirlProfilePage() {
  const params = useParams();
  const girlId = parseInt((params?.id as string) ?? "0", 10);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");
  const [chatInput, setChatInput] = useState("");
  const [callActive, setCallActive] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<number[]>([]);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const { data: girl, isLoading: loadingGirl } = useGetGirl(girlId, {
    query: { enabled: !!girlId, queryKey: getGetGirlQueryKey(girlId) },
  });
  const { data: photos } = useGetGirlPhotos(girlId, {
    query: { enabled: !!girlId, queryKey: ["girl-photos", girlId] as const },
  });
  const { data: videos } = useGetGirlVideos(girlId, {
    query: { enabled: !!girlId, queryKey: ["girl-videos", girlId] as const },
  });
  const { data: messages } = useGetChatMessages(girlId, {
    query: { enabled: !!girlId, queryKey: getGetChatMessagesQueryKey(girlId) },
  });
  const { data: favorites } = useListFavorites();
  const { data: wallet } = useGetWallet();

  const sendMessage = useSendChatMessage();
  const sendTip = useSendTip();
  const addFav = useAddFavorite();
  const removeFav = useRemoveFavorite();

  const isFavorite = favorites?.some((f) => f.id === girlId) ?? false;

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const content = chatInput;
    setChatInput("");
    sendMessage.mutate(
      { girlId, data: { content } },
      { onSuccess: () => queryClient.invalidateQueries({ queryKey: getGetChatMessagesQueryKey(girlId) }) }
    );
  };

  const handleTip = (amount: number) => {
    if (!wallet || wallet.balance < amount) {
      toast({ title: "Insufficient balance", description: "Please top up your wallet.", variant: "destructive" });
      return;
    }
    sendTip.mutate(
      { data: { girlId, amount, message: `Tip for ${girl?.name}` } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetWalletQueryKey() });
          const id = Date.now();
          setFloatingHearts((prev) => [...prev, id]);
          setTimeout(() => setFloatingHearts((prev) => prev.filter((h) => h !== id)), 1000);
          toast({ title: `$${amount} tip sent!`, description: `${girl?.name} loved it 💋` });
        },
      }
    );
  };

  const handleFavorite = () => {
    if (isFavorite) removeFav.mutate({ girlId });
    else addFav.mutate({ data: { girlId } });
  };

  if (loadingGirl) {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: "60vh" }}>
        <div className="text-center">
          <div className="skeleton w-16 h-16 rounded-full mx-auto mb-4" />
          <p style={{ color: "hsl(30 5% 50%)", ...sans, fontSize: "0.85rem" }}>Loading profile…</p>
        </div>
      </div>
    );
  }

  if (!girl) {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: "60vh" }}>
        <p style={{ color: "hsl(30 5% 50%)", ...sans }}>Performer not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      {/* Back */}
      <Link href="/girls" className="inline-block mb-4">
        <span className="flex items-center gap-1.5 text-xs cursor-pointer" style={{ color: "hsl(30 5% 50%)", ...label }}>
          <ArrowLeft size={12} /> Back to Girls
        </span>
      </Link>

      {/* ── Main layout: stacks on mobile, side-by-side on lg ── */}
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-6">

        {/* ── LEFT: Video + Chat ── */}
        <div className="flex-1 min-w-0">

          {/* Video area */}
          <div
            className="relative rounded-2xl overflow-hidden mb-4"
            style={{ aspectRatio: "16/9", background: "rgba(0,0,0,0.85)" }}
          >
            <img
              src={girl.avatarUrl}
              alt={girl.name}
              className="w-full h-full object-cover object-top"
              style={{ filter: callActive ? "none" : "blur(2px) brightness(0.45)" }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)" }} />

            {/* Idle state */}
            {!callActive && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4">
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 overflow-hidden"
                  style={{ borderColor: girl.isOnline ? "#22c55e" : "#374151" }}
                >
                  <img src={girl.avatarUrl} alt={girl.name} className="w-full h-full object-cover object-top" />
                </div>
                <div className="text-center">
                  <p className="text-xl sm:text-2xl font-semibold text-white" style={{ ...serif, fontStyle: "italic" }}>
                    {girl.name}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: girl.isOnline ? "#22c55e" : "#6b7280", ...label }}>
                    {girl.status === "online" ? "Available Now" : girl.status === "busy" ? `In Call · ${girl.availableIn ?? "?"}m` : "Offline"}
                  </p>
                </div>
                {girl.isOnline && (
                  <button
                    onClick={() => setCallActive(true)}
                    data-testid="button-start-call"
                    className="velvet-glow flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full font-bold text-white active:scale-95 transition-transform cursor-pointer"
                    style={{
                      background: "linear-gradient(135deg, hsl(0 72% 36%), hsl(0 72% 50%))",
                      ...label, fontSize: "0.68rem",
                    }}
                  >
                    <Video size={14} />
                    Start Video Call · ${girl.pricePerMin}/min
                  </button>
                )}
              </div>
            )}

            {/* Live state */}
            {callActive && (
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <span
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(34,197,94,0.18)", border: "1px solid rgba(34,197,94,0.4)", color: "#22c55e", ...label, fontSize: "0.6rem" }}
                >
                  <span className="online-dot w-1.5 h-1.5 rounded-full" style={{ background: "#22c55e" }} />
                  Live · ${girl.pricePerMin}/min
                </span>
                <button
                  onClick={() => setCallActive(false)}
                  className="px-2.5 py-1 rounded-full active:scale-95 transition-transform cursor-pointer"
                  style={{ background: "rgba(196,30,58,0.28)", border: "1px solid rgba(196,30,58,0.45)", color: "hsl(0 72% 68%)", ...label, fontSize: "0.6rem" }}
                >
                  End Call
                </button>
              </div>
            )}

            {/* Floating hearts */}
            {floatingHearts.map((id) => (
              <div
                key={id}
                className="floating-heart absolute text-2xl"
                style={{ bottom: "60px", right: "36px", color: "hsl(0 72% 60%)" }}
              >
                ♥
              </div>
            ))}
          </div>

          {/* Profile info bar */}
          <div
            className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl mb-3"
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="min-w-0">
              <h1 className="font-semibold leading-tight" style={{ ...serif, fontStyle: "italic", fontSize: "clamp(1.3rem, 5vw, 1.8rem)", color: "hsl(30 15% 92%)" }}>
                {girl.name}<span className="font-light ml-1.5 text-base not-italic" style={{ color: "hsl(30 5% 60%)" }}>{girl.age}</span>
              </h1>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <span className="flex items-center gap-1">
                  <Star size={11} fill="hsl(43 74% 60%)" style={{ color: "hsl(43 74% 60%)" }} />
                  <span className="text-xs font-bold" style={{ color: "hsl(43 74% 70%)", ...sans }}>{girl.rating.toFixed(1)}</span>
                </span>
                <span className="text-xs" style={{ color: "hsl(30 5% 48%)", ...sans }}>{girl.totalCalls.toLocaleString()} calls</span>
                <span className="text-xs" style={{ color: "hsl(30 5% 48%)", ...sans }}>{girl.ethnicity}</span>
              </div>
            </div>
            <button
              onClick={handleFavorite}
              data-testid="button-toggle-favorite"
              className="p-2.5 rounded-xl transition-all duration-200 active:scale-90 shrink-0 ml-3 cursor-pointer"
              style={{
                background: isFavorite ? "rgba(196,30,58,0.18)" : "rgba(255,255,255,0.05)",
                border: isFavorite ? "1px solid rgba(196,30,58,0.4)" : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Heart size={17} fill={isFavorite ? "hsl(0 72% 55%)" : "none"} style={{ color: isFavorite ? "hsl(0 72% 55%)" : "hsl(30 5% 55%)" }} />
            </button>
          </div>

          {/* Specialties */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {girl.specialties.map((s) => (
              <span
                key={s}
                className="px-2.5 py-1 rounded-lg"
                style={{ background: "rgba(196,30,58,0.08)", border: "1px solid rgba(196,30,58,0.18)", color: "hsl(0 72% 68%)", ...label }}
              >
                {s}
              </span>
            ))}
          </div>

          {/* Bio */}
          <div
            className="p-4 rounded-xl mb-4"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p className="text-sm leading-relaxed" style={{ color: "hsl(30 5% 60%)", ...sans }}>{girl.bio}</p>
          </div>

          {/* ── CHAT ── */}
          <div className="rounded-xl overflow-hidden" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-2 p-3.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <MessageSquare size={14} style={{ color: "hsl(0 72% 58%)" }} />
              <span className="text-xs font-semibold" style={{ color: "hsl(30 15% 82%)", ...label }}>Chat with {girl.name}</span>
              <span className="online-dot w-1.5 h-1.5 rounded-full ml-auto" style={{ background: girl.isOnline ? "#22c55e" : "#6b7280" }} />
            </div>

            {/* Messages */}
            <div className="h-48 sm:h-60 overflow-y-auto p-3.5 flex flex-col gap-2.5">
              {!messages || messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-sm text-center" style={{ color: "hsl(30 5% 42%)", ...sans }}>
                    Say hello to {girl.name}…
                  </p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.sender === "girl" && (
                      <img src={girl.avatarUrl} alt={girl.name} className="w-5 h-5 rounded-full object-cover object-top mr-1.5 self-end flex-shrink-0" />
                    )}
                    <div
                      className="max-w-[75%] px-3 py-2 text-sm"
                      style={{
                        background: msg.sender === "user"
                          ? "linear-gradient(135deg, hsl(0 72% 34%), hsl(0 72% 46%))"
                          : "rgba(255,255,255,0.06)",
                        color: "hsl(30 15% 90%)",
                        borderRadius: msg.sender === "user" ? "16px 16px 4px 16px" : "4px 16px 16px 16px",
                        ...sans,
                      }}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Chat input */}
            <div className="p-2.5 flex items-center gap-2" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <input
                type="text"
                placeholder={`Message ${girl.name}…`}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                data-testid="input-chat-message"
                className="flex-1 bg-transparent outline-none text-sm px-3 py-2 rounded-xl min-w-0"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "hsl(30 15% 88%)", ...sans }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!chatInput.trim() || sendMessage.isPending}
                data-testid="button-send-message"
                className="p-2.5 rounded-xl flex items-center justify-center transition-all active:scale-90 shrink-0 cursor-pointer"
                style={{ background: "linear-gradient(135deg, hsl(0 72% 36%), hsl(0 72% 48%))", minWidth: "40px", minHeight: "40px" }}
              >
                <Send size={14} className="text-white" />
              </button>
            </div>

            {/* Tip bar */}
            <div className="px-2.5 pb-2.5 flex items-center gap-2 flex-wrap" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
              <span className="text-xs" style={{ color: "hsl(30 5% 45%)", ...label }}>Send Tip:</span>
              {TIP_AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  onClick={() => handleTip(amt)}
                  data-testid={`button-tip-${amt}`}
                  disabled={sendTip.isPending}
                  className="px-3 py-1.5 rounded-lg font-bold transition-all active:scale-90 hover:scale-105 cursor-pointer"
                  style={{ background: "rgba(212,168,67,0.12)", border: "1px solid rgba(212,168,67,0.28)", color: "hsl(43 74% 68%)", ...label }}
                >
                  ${amt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Her Collection (sidebar) ── */}
        <div className="w-full lg:w-72 xl:w-80 shrink-0">
          {/* Profile card */}
          <div className="rounded-xl overflow-hidden mb-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="relative h-24 sm:h-28 overflow-hidden">
              <img
                src={girl.coverUrl ?? girl.avatarUrl}
                alt=""
                className="w-full h-full object-cover object-top"
                style={{ filter: "brightness(0.55)" }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)" }} />
            </div>
            <div className="p-4 -mt-8 relative z-10">
              <img
                src={girl.avatarUrl}
                alt={girl.name}
                className="w-14 h-14 rounded-full object-cover object-top border-2 mb-3"
                style={{ borderColor: girl.isOnline ? "#22c55e" : "#374151" }}
              />
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs" style={{ color: "hsl(30 5% 50%)", ...sans }}>
                {[
                  ["Photos", girl.photoCount],
                  ["Videos", girl.videoCount],
                  ["Member since", girl.joinedYear],
                  ["Languages", girl.languages?.join(", ")],
                ].map(([k, v]) => (
                  <div key={String(k)} className="flex justify-between col-span-2">
                    <span>{k}</span>
                    <span style={{ color: "hsl(30 15% 78%)" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Collection tabs */}
          <div className="rounded-xl overflow-hidden" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex">
              {(["photos", "videos"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  data-testid={`tab-${tab}`}
                  className="flex-1 py-3 capitalize transition-all duration-200 cursor-pointer"
                  style={{
                    background: activeTab === tab ? "rgba(196,30,58,0.12)" : "transparent",
                    color: activeTab === tab ? "hsl(0 72% 68%)" : "hsl(30 5% 48%)",
                    borderBottom: activeTab === tab ? "2px solid hsl(0 72% 48%)" : "2px solid transparent",
                    ...label,
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-3">
              {activeTab === "photos" && (
                <div className="grid grid-cols-3 gap-1.5">
                  {photos?.slice(0, 6).map((photo) => (
                    <div
                      key={photo.id}
                      className="relative rounded-lg overflow-hidden cursor-pointer group"
                      style={{ aspectRatio: "1" }}
                      data-testid={`photo-${photo.id}`}
                    >
                      <img
                        src={photo.thumbnailUrl}
                        alt=""
                        className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                        style={{ filter: photo.isPremium ? "blur(4px) brightness(0.5)" : "none" }}
                      />
                      {photo.isPremium && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <Lock size={13} style={{ color: "hsl(43 74% 68%)" }} />
                          <span className="text-xs font-bold mt-0.5" style={{ color: "hsl(43 74% 68%)", ...sans }}>${photo.price}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "videos" && (
                <div className="flex flex-col gap-2">
                  {videos?.slice(0, 4).map((video) => (
                    <div
                      key={video.id}
                      className="flex items-center gap-2.5 p-2 rounded-lg cursor-pointer transition-all duration-200 active:scale-98"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                      data-testid={`video-${video.id}`}
                    >
                      <div className="relative w-14 h-9 rounded overflow-hidden shrink-0">
                        <img
                          src={video.thumbnailUrl}
                          alt={video.title}
                          className="w-full h-full object-cover"
                          style={{ filter: video.isPremium ? "blur(3px) brightness(0.45)" : "none" }}
                        />
                        {video.isPremium && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Lock size={9} style={{ color: "hsl(43 74% 68%)" }} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate" style={{ color: "hsl(30 15% 82%)", ...sans }}>{video.title}</p>
                        <p className="text-xs" style={{ color: "hsl(30 5% 42%)", ...sans }}>
                          {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, "0")}
                          {video.isPremium && <span style={{ color: "hsl(43 74% 62%)" }}> · ${video.price}</span>}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button
                className="w-full mt-3 py-2.5 rounded-xl flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer"
                data-testid="button-unlock-collection"
                style={{
                  background: "linear-gradient(135deg, rgba(212,168,67,0.15), rgba(212,168,67,0.08))",
                  border: "1px solid rgba(212,168,67,0.28)",
                  color: "hsl(43 74% 68%)",
                  ...label,
                }}
              >
                Unlock Full Collection
                <ChevronRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
