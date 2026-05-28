"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Phone } from "lucide-react";

interface GirlCardProps {
  id: number;
  name: string;
  age: number;
  status: string;
  pricePerMin: number;
  avatarUrl: string;
  shortBio?: string;
  specialties: string[];
  rating: number;
  isOnline: boolean;
  availableIn?: number | null;
  index?: number;
}

export default function GirlCard({
  id, name, age, status, pricePerMin, avatarUrl, shortBio, specialties, rating, isOnline, availableIn, index = 0,
}: GirlCardProps) {
  const statusColor = status === "online" ? "#22c55e" : status === "busy" ? "#f59e0b" : "#6b7280";
  const statusLabel = status === "online" ? "Online" : status === "busy" ? `Busy${availableIn ? ` · ${availableIn}m` : ""}` : "Offline";

  return (
    <Link href={`/girls/${id}`} className="block" aria-label={`View ${name}'s profile`}>
      <div
        className="glass-card rounded-xl overflow-hidden cursor-pointer group select-none"
        data-testid={`card-girl-${id}`}
        style={{ animationDelay: `${index * 0.04}s` }}
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "2/3" }}>
          <Image
            src={avatarUrl}
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1280px) 20vw, 250px"
            className="object-cover object-top transition-transform duration-500"
            loading={index < 4 ? undefined : "lazy"}
            {...(index < 4 ? { priority: true } : {})}
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)",
            }}
          />

          {/* Status badge */}
          <div className="absolute top-2.5 left-2.5">
            <span
              className="flex items-center gap-1 px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(0,0,0,0.65)",
                border: `1px solid ${statusColor}40`,
                color: statusColor,
                fontSize: "0.6rem",
                fontFamily: "'Raleway', sans-serif",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${status === "online" ? "online-dot" : ""}`}
                style={{ background: statusColor, flexShrink: 0 }}
              />
              {statusLabel}
            </span>
          </div>

          {/* Price badge */}
          <div className="absolute top-2.5 right-2.5">
            <span
              className="px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(0,0,0,0.7)",
                border: "1px solid rgba(212,168,67,0.28)",
                color: "hsl(43 74% 68%)",
                fontSize: "0.62rem",
                fontFamily: "'Raleway', sans-serif",
                fontWeight: 700,
              }}
            >
              {(pricePerMin * 10).toFixed(0)} Credits/m
            </span>
          </div>

          {/* Name + rating */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <div className="flex items-end justify-between">
              <div>
                <h2
                  className="font-semibold text-white leading-tight"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", fontStyle: "italic" }}
                >
                  {name}
                  <span className="font-light text-sm not-italic opacity-80 ml-1">{age}</span>
                </h2>
                {shortBio && (
                  <p
                    className="text-xs mt-0.5 line-clamp-1"
                    style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Raleway', sans-serif" }}
                  >
                    {shortBio}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-0.5 shrink-0 ml-2">
                <Star size={10} fill="hsl(43 74% 60%)" style={{ color: "hsl(43 74% 60%)" }} />
                <span style={{ color: "hsl(43 74% 70%)", fontSize: "0.7rem", fontFamily: "'Raleway', sans-serif", fontWeight: 700 }}>
                  {rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Hover CTA — desktop only */}
          <div
            className="absolute inset-0 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: "rgba(196,30,58,0.12)" }}
          >
            <div
              className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-white text-xs"
              style={{
                background: "linear-gradient(135deg, hsl(0 72% 36%), hsl(0 72% 50%))",
                boxShadow: "0 0 20px rgba(196,30,58,0.5)",
                fontFamily: "'Raleway', sans-serif",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              <Phone size={12} />
              Connect
            </div>
          </div>
        </div>

        {/* Specialties */}
        {specialties && specialties.length > 0 && (
          <div className="px-2.5 py-2 flex flex-wrap gap-1">
            {specialties.slice(0, 2).map((s) => (
              <span
                key={s}
                style={{
                  background: "rgba(196,30,58,0.1)",
                  border: "1px solid rgba(196,30,58,0.18)",
                  color: "hsl(0 72% 68%)",
                  fontSize: "0.58rem",
                  padding: "2px 6px",
                  borderRadius: "999px",
                  fontFamily: "'Raleway', sans-serif",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
