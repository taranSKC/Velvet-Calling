"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Phone, PhoneOff, Mic, MicOff, Send, X, MessageSquare } from "lucide-react";
import type { VoiceMessage, VoiceStatus } from "@/hooks/use-voice-agent";

// ─── Style constants matching VelvetCall design ──────────────────────────
const serif: React.CSSProperties = { fontFamily: "'Cormorant Garamond', serif" };
const sans: React.CSSProperties = { fontFamily: "'Raleway', sans-serif" };
const label: React.CSSProperties = {
  fontFamily: "'Raleway', sans-serif",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  fontSize: "0.62rem",
};

interface VoiceCallOverlayProps {
  girl: {
    id: number;
    name: string;
    age: number;
    avatarUrl: string;
    pricePerMin: number;
  };
  status: VoiceStatus;
  messages: VoiceMessage[];
  micLevel: number;
  error: string | null;
  isMuted: boolean;
  onDisconnect: () => void;
  onSendText: (text: string) => void;
  onToggleMute: () => void;
  walletBalance: number;
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function VoiceCallOverlay({
  girl,
  status,
  messages,
  micLevel,
  error,
  isMuted,
  onDisconnect,
  onSendText,
  onToggleMute,
  walletBalance,
}: VoiceCallOverlayProps) {
  const [elapsed, setElapsed] = useState(0);
  const [textInput, setTextInput] = useState("");
  const [showChat, setShowChat] = useState(false);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Timer
  useEffect(() => {
    if (status !== "active" && status !== "connecting") return;
    startTimeRef.current = Date.now();
    setElapsed(0);

    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [status]);

  // Auto-scroll transcript
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendText = useCallback(() => {
    if (!textInput.trim()) return;
    onSendText(textInput.trim());
    setTextInput("");
  }, [textInput, onSendText]);

  // Mic orb scale based on audio level
  const orbScale = 1 + Math.min(micLevel * 4, 0.6);
  const isAssistantSpeaking = status === "active" && messages.length > 0;

  const creditsPerMin = (girl.pricePerMin * 10).toFixed(0);
  const creditsUsed = ((elapsed / 60) * girl.pricePerMin * 10).toFixed(0);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col"
      style={{
        background: "rgba(6, 4, 14, 0.97)",
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
      }}
    >
      {/* ─── Top Bar ──────────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-4 sm:px-6 py-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <button
          onClick={onDisconnect}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer"
          style={{
            background: "rgba(196,30,58,0.15)",
            border: "1px solid rgba(196,30,58,0.35)",
            color: "hsl(0 72% 65%)",
            ...label,
          }}
        >
          <PhoneOff size={12} />
          End Call
        </button>

        <div className="flex items-center gap-3">
          {/* Timer */}
          <span
            className="tabular-nums"
            style={{
              color: "hsl(30 15% 78%)",
              ...sans,
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            {formatTime(elapsed)}
          </span>

          {/* Cost badge */}
          <span
            className="px-2 py-1 rounded-full"
            style={{
              background: "rgba(212,168,67,0.12)",
              border: "1px solid rgba(212,168,67,0.25)",
              color: "hsl(43 74% 65%)",
              ...label,
            }}
          >
            {creditsUsed} Credits
          </span>
        </div>
      </div>

      {/* ─── Main Content ─────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden">
        {/* Girl Avatar with animated border */}
        <div className="relative mb-4 sm:mb-6">
          {/* Pulsing rings behind avatar */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              transform: `scale(${1.15 + micLevel * 0.8})`,
              background:
                status === "active"
                  ? "radial-gradient(circle, rgba(196,30,58,0.15) 0%, transparent 70%)"
                  : "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
              transition: "transform 0.15s ease-out",
            }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              transform: `scale(${1.3 + micLevel * 1.2})`,
              background:
                status === "active"
                  ? "radial-gradient(circle, rgba(196,30,58,0.06) 0%, transparent 70%)"
                  : "transparent",
              transition: "transform 0.2s ease-out",
            }}
          />

          <div
            className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2"
            style={{
              borderColor:
                status === "active"
                  ? "hsl(0 72% 50%)"
                  : status === "connecting"
                  ? "hsl(43 74% 55%)"
                  : "#374151",
              boxShadow:
                status === "active"
                  ? "0 0 24px rgba(196,30,58,0.35), 0 0 48px rgba(196,30,58,0.15)"
                  : "none",
              transition: "border-color 0.3s, box-shadow 0.3s",
            }}
          >
            <img
              src={girl.avatarUrl}
              alt={girl.name}
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Online indicator */}
          <div
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full"
            style={{
              background:
                status === "active"
                  ? "rgba(34,197,94,0.2)"
                  : status === "connecting"
                  ? "rgba(212,168,67,0.2)"
                  : "rgba(255,255,255,0.06)",
              border:
                status === "active"
                  ? "1px solid rgba(34,197,94,0.4)"
                  : status === "connecting"
                  ? "1px solid rgba(212,168,67,0.4)"
                  : "1px solid rgba(255,255,255,0.1)",
              ...label,
              color:
                status === "active"
                  ? "#22c55e"
                  : status === "connecting"
                  ? "hsl(43 74% 65%)"
                  : "hsl(30 5% 50%)",
            }}
          >
            {status === "active"
              ? "Live"
              : status === "connecting"
              ? "Connecting…"
              : "Ended"}
          </div>
        </div>

        {/* Girl name + info */}
        <h2
          className="text-2xl sm:text-3xl font-semibold mb-1"
          style={{
            ...serif,
            fontStyle: "italic",
            color: "hsl(30 15% 92%)",
          }}
        >
          {girl.name}
          <span
            className="font-light ml-2 text-lg not-italic"
            style={{ color: "hsl(30 5% 55%)" }}
          >
            {girl.age}
          </span>
        </h2>

        <p className="mb-5 sm:mb-6" style={{ ...label, color: "hsl(30 5% 48%)" }}>
          {creditsPerMin} Credits/min
        </p>

        {/* ─── Audio Visualizer Orb ──────────────────────────────────── */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-5 sm:mb-6">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: isMuted
                ? "rgba(255,255,255,0.04)"
                : "radial-gradient(circle at center, rgba(196,30,58,0.25) 0%, rgba(196,30,58,0.05) 60%, transparent 100%)",
              transform: `scale(${isMuted ? 1 : orbScale})`,
              transition: "transform 0.1s ease-out, background 0.3s",
              border: isMuted
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(196,30,58,0.3)",
            }}
          />
          <div
            className="absolute inset-2 sm:inset-3 rounded-full"
            style={{
              background: isMuted
                ? "rgba(255,255,255,0.06)"
                : "radial-gradient(circle at center, rgba(196,30,58,0.35) 0%, rgba(196,30,58,0.1) 100%)",
              transform: `scale(${isMuted ? 1 : 0.8 + micLevel * 2})`,
              transition: "transform 0.08s ease-out",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            {isMuted ? (
              <MicOff size={22} style={{ color: "hsl(30 5% 45%)" }} />
            ) : (
              <Mic
                size={22}
                style={{
                  color:
                    status === "active"
                      ? "hsl(0 72% 65%)"
                      : "hsl(30 5% 55%)",
                }}
              />
            )}
          </div>
        </div>

        {/* ─── Error Display ──────────────────────────────────────────── */}
        {error && (
          <div
            className="px-4 py-2 rounded-xl mb-4 max-w-sm text-center"
            style={{
              background: "rgba(196,30,58,0.12)",
              border: "1px solid rgba(196,30,58,0.3)",
              color: "hsl(0 72% 68%)",
              ...sans,
              fontSize: "0.8rem",
            }}
          >
            {error}
          </div>
        )}

        {/* ─── Transcript ─────────────────────────────────────────────── */}
        <div className="w-full max-w-lg flex-1 min-h-0 flex flex-col">
          <button
            onClick={() => setShowChat(!showChat)}
            className="flex items-center gap-1.5 mb-2 self-center cursor-pointer transition-all"
            style={{
              color: showChat ? "hsl(0 72% 65%)" : "hsl(30 5% 48%)",
              ...label,
            }}
          >
            <MessageSquare size={11} />
            {showChat ? "Hide" : "Show"} Transcript
            {messages.length > 0 && (
              <span
                className="px-1.5 py-0.5 rounded-full text-[0.5rem]"
                style={{
                  background: "rgba(196,30,58,0.2)",
                  color: "hsl(0 72% 65%)",
                }}
              >
                {messages.length}
              </span>
            )}
          </button>

          {showChat && (
            <div
              ref={transcriptRef}
              className="flex-1 overflow-y-auto rounded-xl p-3 sm:p-4 mb-3"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                maxHeight: "200px",
                minHeight: "80px",
              }}
            >
              {messages.length === 0 ? (
                <p
                  className="text-center text-xs py-4"
                  style={{ color: "hsl(30 5% 38%)", ...sans }}
                >
                  {status === "connecting"
                    ? "Connecting to voice session…"
                    : "Start speaking — your conversation will appear here"}
                </p>
              ) : (
                <div className="flex flex-col gap-2">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      style={{ opacity: msg.interrupted ? 0.5 : 1 }}
                    >
                      {msg.role === "assistant" && (
                        <img
                          src={girl.avatarUrl}
                          alt=""
                          className="w-5 h-5 rounded-full object-cover object-top mr-1.5 self-end shrink-0"
                        />
                      )}
                      <div
                        className="max-w-[80%] px-3 py-2 text-xs sm:text-sm"
                        style={{
                          background:
                            msg.role === "user"
                              ? "linear-gradient(135deg, hsl(0 72% 34%), hsl(0 72% 46%))"
                              : "rgba(255,255,255,0.06)",
                          color: "hsl(30 15% 90%)",
                          borderRadius:
                            msg.role === "user"
                              ? "14px 14px 4px 14px"
                              : "4px 14px 14px 14px",
                          ...sans,
                        }}
                      >
                        {msg.text}
                        {msg.interrupted && (
                          <span
                            className="text-[0.6rem] ml-1"
                            style={{ color: "hsl(30 5% 45%)" }}
                          >
                            (interrupted)
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Text input (secondary — appears only during active call) */}
          {showChat && status === "active" && (
            <div className="flex items-center gap-2 mb-3">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendText()}
                placeholder={`Type to ${girl.name}…`}
                className="flex-1 bg-transparent outline-none text-sm px-3 py-2 rounded-xl min-w-0"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "hsl(30 15% 88%)",
                  ...sans,
                }}
              />
              <button
                onClick={handleSendText}
                disabled={!textInput.trim()}
                className="p-2 rounded-xl transition-all cursor-pointer"
                style={{
                  background: textInput.trim()
                    ? "linear-gradient(135deg, hsl(0 72% 36%), hsl(0 72% 48%))"
                    : "rgba(255,255,255,0.05)",
                }}
              >
                <Send size={14} className="text-white" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ─── Bottom Controls ──────────────────────────────────────────── */}
      <div
        className="px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-center gap-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Mute button */}
        <button
          onClick={onToggleMute}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all cursor-pointer"
          style={{
            background: isMuted
              ? "rgba(196,30,58,0.2)"
              : "rgba(255,255,255,0.06)",
            border: isMuted
              ? "1px solid rgba(196,30,58,0.4)"
              : "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {isMuted ? (
            <MicOff size={20} style={{ color: "hsl(0 72% 65%)" }} />
          ) : (
            <Mic size={20} style={{ color: "hsl(30 15% 82%)" }} />
          )}
        </button>

        {/* End Call button */}
        <button
          onClick={onDisconnect}
          className="w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center transition-all cursor-pointer velvet-glow"
          style={{
            background: "linear-gradient(135deg, hsl(0 72% 36%), hsl(0 72% 50%))",
            boxShadow: "0 0 20px rgba(196,30,58,0.4), 0 4px 16px rgba(0,0,0,0.5)",
          }}
        >
          <PhoneOff size={24} className="text-white" />
        </button>

        {/* Chat toggle */}
        <button
          onClick={() => setShowChat(!showChat)}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all cursor-pointer"
          style={{
            background: showChat
              ? "rgba(196,30,58,0.15)"
              : "rgba(255,255,255,0.06)",
            border: showChat
              ? "1px solid rgba(196,30,58,0.35)"
              : "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <MessageSquare
            size={20}
            style={{
              color: showChat ? "hsl(0 72% 65%)" : "hsl(30 15% 82%)",
            }}
          />
        </button>
      </div>

      {/* ─── Wallet balance warning ───────────────────────────────────── */}
      {walletBalance < girl.pricePerMin * 2 && status === "active" && (
        <div
          className="absolute bottom-24 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl animate-pulse"
          style={{
            background: "rgba(212,168,67,0.15)",
            border: "1px solid rgba(212,168,67,0.35)",
            color: "hsl(43 74% 65%)",
            ...sans,
            fontSize: "0.75rem",
            whiteSpace: "nowrap",
          }}
        >
          ⚠️ Low balance — call will end soon
        </div>
      )}
    </div>
  );
}
