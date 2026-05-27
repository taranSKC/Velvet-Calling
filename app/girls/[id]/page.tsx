"use client";

import { getFrontendVoiceConfig } from "@/utils/voice-registry";
import { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
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
  customFetch,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useVoiceAgent } from "@/hooks/use-voice-agent";
import VoiceCallOverlay from "@/components/voice-call-overlay";
import { Video, MessageSquare, Heart, Lock, Star, Send, ChevronRight, ArrowLeft, X, Phone, Trash2 } from "lucide-react";
import Link from "next/link";

const TIP_AMOUNTS = [5, 10, 25, 50];

const serif: React.CSSProperties = { fontFamily: "'Cormorant Garamond', serif" };
const sans: React.CSSProperties = { fontFamily: "'Raleway', sans-serif" };
const label: React.CSSProperties = { fontFamily: "'Raleway', sans-serif", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "0.62rem" };



export default function GirlProfilePage() {
  const params = useParams();
  const router = useRouter();
  const girlId = parseInt((params?.id as string) ?? "0", 10);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: session } = useSession();

  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");
  const [chatInput, setChatInput] = useState("");
  const [floatingHearts, setFloatingHearts] = useState<number[]>([]);
  const [playingVideo, setPlayingVideo] = useState<any>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const billingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [liveBalance, setLiveBalance] = useState<number | null>(null);
  const [isClearingChat, setIsClearingChat] = useState(false);

  // xAI Voice Agent
  const voiceAgent = useVoiceAgent();

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

  const [optimisticMessages, setOptimisticMessages] = useState<any[]>([]);

  useEffect(() => {
    if (messages) {
      setOptimisticMessages(messages);
    }
  }, [messages]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [optimisticMessages, sendMessage.isPending]);

  const handleSendMessage = () => {
    if (!session?.user) return;
    if (!chatInput.trim()) return;

    // Quick client-side check: 1 credit = $0.10 USD
    if (!wallet || wallet.balance < 0.10) {
      toast({
        title: "Insufficient credits 🔒",
        description: "You need at least 1 Credit ($0.10) to chat. Please top up your wallet.",
        variant: "destructive",
      });
      router.push("/wallet");
      return;
    }

    const content = chatInput;
    setChatInput("");

    // 1. Create a temporary optimistic message object
    const tempUserMsg = {
      id: Date.now(), // temporary unique id
      girlId,
      content,
      sender: "user",
      createdAt: new Date().toISOString(),
    };

    // 2. Append user message right away so it displays immediately!
    setOptimisticMessages((prev) => [...prev, tempUserMsg]);

    sendMessage.mutate(
      { girlId, data: { content } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetChatMessagesQueryKey(girlId) });
          queryClient.invalidateQueries({ queryKey: getGetWalletQueryKey() }); // Refresh wallet balance on profile
        },
        onError: (err: any) => {
          // Revert optimistic update on error
          if (messages) {
            setOptimisticMessages(messages);
          }

          const errorData = err?.data || {};
          const errorCode = errorData.error || "";
          
          if (errorCode === "insufficient_balance" || err?.status === 402) {
            toast({
              title: "Insufficient credits 🔒",
              description: "You need at least 1 Credit ($0.10) to chat. Please top up your wallet.",
              variant: "destructive",
            });
            router.push("/wallet");
          } else {
            toast({
              title: "Error sending message",
              description: errorData.message || err.message || "Failed to send message.",
              variant: "destructive",
            });
          }
        }
      }
    );
  };

  const handleCleanChat = async () => {
    if (!session?.user) return;
    if (!confirm("Are you sure you want to clear your chat history with this performer?")) return;
    
    setIsClearingChat(true);
    try {
      const response = await customFetch<{ success?: boolean; message?: string }>(`/api/chat/${girlId}`, {
        method: "DELETE",
      });
      if (response?.success) {
        queryClient.invalidateQueries({ queryKey: getGetChatMessagesQueryKey(girlId) });
        toast({
          title: "Chat cleared ✨",
          description: `${girl?.name} is ready for a fresh conversation!`,
        });
      }
    } catch (err: any) {
      console.error("Failed to clear chat:", err);
      toast({
        title: "Failed to clear chat",
        description: err?.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsClearingChat(false);
    }
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
          toast({ title: `${(amount * 10).toFixed(0)} Credits tip sent!`, description: `${girl?.name} loved it 💋` });
        },
      }
    );
  };

  const handleFavorite = () => {
    if (isFavorite) removeFav.mutate({ girlId });
    else addFav.mutate({ data: { girlId } });
  };

  // Derive callActive from voice agent status
  const callActive = voiceAgent.status === "active" || voiceAgent.status === "connecting";

  // Track wallet balance during call
  const currentBalance = liveBalance ?? wallet?.balance ?? 0;

  const handleStartCall = useCallback(async () => {
    if (!session?.user) {
      toast({
        title: "🔒 Authentication Required",
        description: "Please sign in to start a live voice call.",
        variant: "destructive"
      });
      router.push(`/login?callbackUrl=/girls/${girlId}`);
      return;
    }

    if (!girl) return;

    if (!wallet || wallet.balance < girl.pricePerMin) {
      toast({
        title: "Insufficient balance",
        description: `You need at least ${(girl.pricePerMin * 10).toFixed(0)} Credits in your wallet to start this call.`,
        variant: "destructive"
      });
      router.push("/wallet");
      return;
    }

    const voiceConfig = getFrontendVoiceConfig(girl.name);
    const voice = voiceConfig.voiceId;
    setLiveBalance(wallet.balance);

    await voiceAgent.connect({
      girlId,
      voice,
      instructions: girl.bio,
      girlName: girl.name,
    });
  }, [session, girl, wallet, voiceAgent, toast, router, girlId]);

  // ─── Refs for stable billing logic (prevents effect re-triggers) ───
  const voiceAgentRef = useRef(voiceAgent);
  voiceAgentRef.current = voiceAgent;
  const queryClientRef = useRef(queryClient);
  queryClientRef.current = queryClient;
  const toastRef = useRef(toast);
  toastRef.current = toast;
  const girlRef = useRef(girl);
  girlRef.current = girl;

  // Billing guards
  const isBillingActiveRef = useRef(false);
  const isDeductingRef = useRef(false); // prevents overlapping API calls

  const handleEndCall = useCallback(() => {
    // Stop billing FIRST
    isBillingActiveRef.current = false;
    if (billingIntervalRef.current) {
      clearInterval(billingIntervalRef.current);
      billingIntervalRef.current = null;
    }
    // Then disconnect
    voiceAgentRef.current.disconnect();
    setLiveBalance(null);
    // Refresh wallet balance
    queryClientRef.current.invalidateQueries({ queryKey: getGetWalletQueryKey() });
  }, []); // stable — no deps, uses refs

  // Per-minute billing during active calls — BULLETPROOF
  useEffect(() => {
    // Only run when status is "active" and girl data exists
    if (voiceAgent.status !== "active" || !girl) {
      // If we were billing, stop
      if (isBillingActiveRef.current) {
        isBillingActiveRef.current = false;
        if (billingIntervalRef.current) {
          clearInterval(billingIntervalRef.current);
          billingIntervalRef.current = null;
        }
      }
      return;
    }

    // Guard: prevent duplicate billing setups
    if (isBillingActiveRef.current) {
      return;
    }
    isBillingActiveRef.current = true;

    // Capture girl data for this billing session
    const billingGirlId = girl.id;
    const billingGirlName = girl.name;
    const billingPricePerMin = girl.pricePerMin;

    const deductMinute = async () => {
      // Guard: prevent overlapping deduction calls
      if (isDeductingRef.current) return;
      // Guard: billing may have been stopped while we were waiting
      if (!isBillingActiveRef.current) return;

      isDeductingRef.current = true;
      try {
        const data = await customFetch<{
          success?: boolean;
          newBalance?: number;
          error?: string;
          message?: string;
        }>("/api/voice/deduct", {
          method: "POST",
          body: JSON.stringify({
            girlId: billingGirlId,
            girlName: billingGirlName,
            pricePerMin: billingPricePerMin,
          }),
        });

        // Check if billing was stopped while the request was in-flight
        if (!isBillingActiveRef.current) return;

        if (data?.success) {
          setLiveBalance(data.newBalance ?? null);
        }
      } catch (err: any) {
        // Handle ApiError thrown by customFetch for non-2xx status codes
        const errorData = err?.data || {};
        const errorCode = errorData.error || "";

        if (errorCode === "insufficient_balance" || err?.status === 402) {
          toastRef.current({
            title: "Call Ended",
            description: "Insufficient balance. Please top up your wallet.",
            variant: "destructive",
          });
          handleEndCall();
          return;
        }

        if (errorCode === "rate_limited" || err?.status === 429) {
          return; // Server rate-limited us — just wait for next interval
        }

        console.error("Billing error:", err);
      } finally {
        isDeductingRef.current = false;
      }
    };

    // Deduct first minute immediately
    deductMinute();
    // Then every 60 seconds
    billingIntervalRef.current = setInterval(deductMinute, 60_000);

    return () => {
      isBillingActiveRef.current = false;
      if (billingIntervalRef.current) {
        clearInterval(billingIntervalRef.current);
        billingIntervalRef.current = null;
      }
    };
    // ONLY re-run when status transitions to "active" or girl changes
    // handleEndCall is stable (no deps), so this won't loop
  }, [voiceAgent.status, girl?.id, handleEndCall]);

  // Handle voice agent errors
  useEffect(() => {
    if (voiceAgent.error && voiceAgent.status === "error") {
      toastRef.current({
        title: "Voice Call Error",
        description: voiceAgent.error,
        variant: "destructive",
      });
    }
  }, [voiceAgent.error, voiceAgent.status]);

  const handleWatchVideo = (video: any) => {
    if (!session?.user) {
      toast({
        title: "🔒 Authentication Required",
        description: "Please sign in to watch exclusive performer videos.",
        variant: "destructive"
      });
      router.push(`/login?callbackUrl=/girls/${girlId}`);
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
        { data: { girlId, amount: video.price, message: `Unlocked video: ${video.title}` } },
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

  const handleViewPhoto = (photo: any) => {
    if (!session?.user) {
      toast({
        title: "🔒 Authentication Required",
        description: "Please sign in to view exclusive performer photos.",
        variant: "destructive"
      });
      router.push(`/login?callbackUrl=/girls/${girlId}`);
      return;
    }

    if (photo.isPremium) {
      const confirmUnlock = window.confirm(`Unlock premium photo for ${(photo.price * 10).toFixed(0)} Credits?`);
      if (!confirmUnlock) return;

      if (!wallet || wallet.balance < photo.price) {
        toast({
          title: "Insufficient balance",
          description: "Please top up your wallet to unlock this photo.",
          variant: "destructive"
        });
        router.push("/wallet");
        return;
      }

      sendTip.mutate(
        { data: { girlId, amount: photo.price, message: `Unlocked premium photo` } },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getGetWalletQueryKey() });
            toast({
              title: "Photo Unlocked! 🎉",
              description: "You can now view this premium photo."
            });
            photo.isPremium = false; // local state override
          }
        }
      );
    }
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
                    onClick={handleStartCall}
                    data-testid="button-start-call"
                    className="velvet-glow flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full font-bold text-white transition-transform cursor-pointer"
                    style={{
                      background: "linear-gradient(135deg, hsl(0 72% 36%), hsl(0 72% 50%))",
                      ...label, fontSize: "0.68rem",
                    }}
                  >
                    <Phone size={14} />
                    Start Voice Call · {(girl.pricePerMin * 10).toFixed(0)} Credits/min
                  </button>
                )}
              </div>
            )}

            {/* Live state indicator (when call active but overlay shows full UI) */}
            {callActive && (
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <span
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(34,197,94,0.18)", border: "1px solid rgba(34,197,94,0.4)", color: "#22c55e", ...label, fontSize: "0.6rem" }}
                >
                  <span className="online-dot w-1.5 h-1.5 rounded-full" style={{ background: "#22c55e" }} />
                  Live · {(girl.pricePerMin * 10).toFixed(0)} Credits/min
                </span>
                <button
                  onClick={handleEndCall}
                  className="px-2.5 py-1 rounded-full transition-transform cursor-pointer"
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
              className="p-2.5 rounded-xl transition-all duration-200 shrink-0 ml-3 cursor-pointer"
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
              <span className="online-dot w-1.5 h-1.5 rounded-full" style={{ background: girl.isOnline ? "#22c55e" : "#6b7280" }} />
              {session?.user && (
                <button
                  onClick={handleCleanChat}
                  disabled={isClearingChat}
                  title="Clean Chat History"
                  className="ml-auto p-1 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 text-rose-500 hover:text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 active:bg-rose-500/30 select-none border border-rose-500/20"
                  style={label}
                >
                  <Trash2 size={11} />
                  Clear
                </button>
              )}
            </div>

            {/* Messages */}
            <div className="h-48 sm:h-60 overflow-y-auto p-3.5 flex flex-col gap-2.5">
              {!optimisticMessages || optimisticMessages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-sm text-center" style={{ color: "hsl(30 5% 42%)", ...sans }}>
                    Say hello to {girl.name}…
                  </p>
                </div>
              ) : (
                optimisticMessages.map((msg) => (
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
              
              {/* Dynamic Bouncing-Dots Typing Indicator */}
              {sendMessage.isPending && (
                <div className="flex justify-start items-end gap-1.5 animate-pulse">
                  <img src={girl.avatarUrl} alt={girl.name} className="w-5 h-5 rounded-full object-cover object-top mr-1.5 self-end flex-shrink-0" />
                  <div
                    className="max-w-[75%] px-4 py-3 rounded-2xl flex items-center gap-1.5 bg-white/5 border border-white/5"
                    style={{
                      borderRadius: "4px 16px 16px 16px",
                    }}
                  >
                    <span className="text-[10px] text-purple-300/40 mr-1 font-semibold uppercase tracking-widest" style={label}>Typing</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400/80 animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400/80 animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400/80 animate-bounce"></span>
                  </div>
                </div>
              )}
              
              <div ref={chatBottomRef} />
            </div>

            {/* Chat input */}
            <div className="p-2.5 flex items-center gap-2" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              {!session?.user ? (
                <div 
                  onClick={() => router.push(`/login?callbackUrl=/girls/${girlId}`)}
                  className="flex-1 bg-[#1a1224]/80 border border-fuchsia-900/30 text-purple-300/60 rounded-xl px-3 py-2 text-sm text-center font-medium cursor-pointer hover:border-fuchsia-800/60 hover:text-purple-200 transition-all flex items-center justify-center gap-1.5 select-none"
                  style={sans}
                >
                  <Lock size={12} className="text-fuchsia-400" />
                  Please sign in to chat with {girl.name}
                </div>
              ) : (
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
              )}
              <button
                onClick={handleSendMessage}
                disabled={!chatInput.trim() || sendMessage.isPending}
                data-testid="button-send-message"
                className="p-2.5 rounded-xl flex items-center justify-center transition-all shrink-0 cursor-pointer"
                style={{ background: "linear-gradient(135deg, hsl(0 72% 36%), hsl(0 72% 48%))", minWidth: "40px", minHeight: "40px" }}
              >
                <Send size={14} className="text-white" />
              </button>
            </div>

            {/* Tip bar */}
            <div className="px-2.5 pb-2.5 flex items-center gap-2 flex-wrap" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
              <span className="text-xs" style={{ color: "hsl(30 5% 45%)", ...label }}>Send Credits:</span>
              {TIP_AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  onClick={() => handleTip(amt)}
                  data-testid={`button-tip-${amt}`}
                  disabled={sendTip.isPending}
                  className="px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer"
                  style={{ background: "rgba(212,168,67,0.12)", border: "1px solid rgba(212,168,67,0.28)", color: "hsl(43 74% 68%)", ...label }}
                >
                  {(amt * 10)} Credits
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
                      onClick={() => handleViewPhoto(photo)}
                      className="relative rounded-lg overflow-hidden cursor-pointer group"
                      style={{ aspectRatio: "1" }}
                      data-testid={`photo-${photo.id}`}
                    >
                      <img
                        src={photo.thumbnailUrl}
                        alt=""
                        className="w-full h-full object-cover object-top transition-transform duration-300"
                        style={{ filter: photo.isPremium ? "blur(4px) brightness(0.5)" : "none" }}
                      />
                      {photo.isPremium && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <Lock size={13} style={{ color: "hsl(43 74% 68%)" }} />
                          <span className="text-xs font-bold mt-0.5" style={{ color: "hsl(43 74% 68%)", ...sans }}>{((photo.price ?? 0) * 10).toFixed(0)} Credits</span>
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
                      onClick={() => handleWatchVideo(video)}
                      className="flex items-center gap-2.5 p-2 rounded-lg cursor-pointer transition-all duration-200"
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
                          {video.isPremium && <span style={{ color: "hsl(43 74% 62%)" }}> · {((video.price ?? 0) * 10).toFixed(0)} Credits</span>}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button
                className="w-full mt-3 py-2.5 rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer"
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

      {/* ── Voice Call Overlay ── */}
      {callActive && girl && (
        <VoiceCallOverlay
          girl={{
            id: girl.id,
            name: girl.name,
            age: girl.age,
            avatarUrl: girl.avatarUrl,
            pricePerMin: girl.pricePerMin,
          }}
          status={voiceAgent.status}
          messages={voiceAgent.messages}
          micLevel={voiceAgent.micLevel}
          error={voiceAgent.error}
          isMuted={voiceAgent.isMuted}
          onDisconnect={handleEndCall}
          onSendText={voiceAgent.sendText}
          onToggleMute={voiceAgent.toggleMute}
          walletBalance={currentBalance}
        />
      )}
    </div>
  );
}
