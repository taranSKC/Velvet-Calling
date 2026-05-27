interface AgeGateProps {
  onVerify: () => void;
  onDecline: () => void;
}

export default function AgeGate({ onVerify, onDecline }: AgeGateProps) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.97)", backdropFilter: "blur(20px)" }}
    >
      <div
        className="text-center w-full max-w-sm p-8 sm:p-10 rounded-2xl"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(196,30,58,0.3)",
          boxShadow: "0 0 60px rgba(196,30,58,0.12)",
        }}
      >
        {/* Logo */}
        <div className="mb-5">
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.6rem", fontWeight: 700, fontStyle: "italic" }}>
            <span style={{ color: "hsl(0 72% 52%)" }}>V</span>
            <span style={{ color: "hsl(30 15% 90%)" }}>elvetCall</span>
          </span>
        </div>

        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-6 velvet-label"
          style={{
            background: "rgba(196,30,58,0.15)",
            border: "1px solid rgba(196,30,58,0.3)",
            color: "hsl(0 72% 65%)",
          }}
        >
          <span className="online-dot w-1.5 h-1.5 rounded-full" style={{ background: "hsl(0 72% 60%)" }} />
          18+ Adults Only
        </div>

        <h2
          className="text-3xl sm:text-4xl font-semibold mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "hsl(30 15% 92%)", lineHeight: 1.15 }}
        >
          Age Verification
        </h2>
        <p className="text-sm mb-8 leading-relaxed" style={{ color: "hsl(30 5% 58%)", fontFamily: "'Raleway', sans-serif" }}>
          This site contains adult content for individuals 18 and older.
          By entering, you confirm you meet this requirement.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={onVerify}
            data-testid="button-age-verify"
            className="btn-pulse w-full py-4 rounded-xl font-semibold text-white transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, hsl(0 72% 36%), hsl(0 72% 48%))",
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.95rem",
              letterSpacing: "0.06em",
              minHeight: "52px",
            }}
          >
            I am 18 or older — Enter
          </button>
          <button
            onClick={onDecline}
            data-testid="button-age-decline"
            className="w-full py-3.5 rounded-xl font-medium transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.04)",
              color: "hsl(30 5% 50%)",
              border: "1px solid rgba(255,255,255,0.08)",
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.875rem",
              minHeight: "48px",
            }}
          >
            I am under 18 — Exit
          </button>
        </div>

        <p className="text-xs mt-6" style={{ color: "hsl(30 5% 35%)", fontFamily: "'Raleway', sans-serif" }}>
          By entering you agree to our Terms &amp; Privacy Policy
        </p>
      </div>
    </div>
  );
}
