"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { signIn } from "next-auth/react";
import { Mail, Lock, User, Sparkles, AlertCircle, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  // Tabs: "login" | "signup"
  const [activeTab, setActiveTab] = useState<"login" | "signup">(
    pathname === "/register" ? "signup" : "login"
  );
  
  // Redirect target
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const errorParam = searchParams.get("error");
  
  // Forms state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle Auth.js redirect error
  useEffect(() => {
    if (errorParam === "CredentialsSignin") {
      setErrorMessage("Invalid email or password. Please try again.");
    } else if (errorParam) {
      setErrorMessage("An error occurred during authentication.");
    }
  }, [errorParam]);

  // Clean errors when toggling tabs
  const handleTabChange = (tab: "login" | "signup") => {
    setActiveTab(tab);
    setErrorMessage("");
    setSuccessMessage("");
    setPassword("");
  };

  // Submit Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await signIn("credentials", {
        email: email.toLowerCase().trim(),
        password,
        redirect: false,
        callbackUrl,
      });

      if (res?.error) {
        setErrorMessage("Invalid email or password.");
      } else {
        router.refresh();
        router.push(callbackUrl);
      }
    } catch (err: any) {
      setErrorMessage("A connection error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Submit Signup
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Failed to create account.");
        return;
      }

      setSuccessMessage("Your account was created! Logging in...");

      // Automatically sign in the user after successful registration
      const loginRes = await signIn("credentials", {
        email: email.toLowerCase().trim(),
        password,
        redirect: false,
        callbackUrl,
      });

      if (loginRes?.error) {
        // Fall back to showing success and switching to login tab
        setSuccessMessage("Account created successfully! Please log in below.");
        setActiveTab("login");
        setPassword("");
      } else {
        router.refresh();
        router.push(callbackUrl);
      }
    } catch (err) {
      setErrorMessage("A connection error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 bg-[#050208] overflow-hidden">
      {/* Luxurious Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#ec4899]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] right-[10%] w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[90px] pointer-events-none" />

      {/* Premium Glassmorphic Card Wrapper */}
      <div className="relative w-full max-w-[440px] z-10">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-fuchsia-500/10 rounded-3xl blur-[2px] -m-[1px] pointer-events-none" />
        
        <div className="w-full bg-[#0d0714]/80 border border-white/[0.05] rounded-3xl p-8 backdrop-blur-2xl shadow-[0_24px_50px_-12px_rgba(0,0,0,0.7)]">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-100 via-amber-100 to-fuchsia-200 font-serif leading-tight">
              VelvetCall
            </h1>
            <p className="text-xs text-purple-200/50 mt-2 font-light tracking-wider uppercase flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Step Into Your Fantasy
            </p>
          </div>

          {/* Luxury Tab Switcher */}
          <div className="flex bg-[#160e1f] border border-white/[0.03] p-1 rounded-xl mb-6">
            <button
              onClick={() => handleTabChange("login")}
              disabled={isLoading}
              className={`flex-1 text-center py-2.5 rounded-lg text-sm font-medium tracking-wide transition-all ${
                activeTab === "login"
                  ? "bg-gradient-to-r from-fuchsia-950 to-purple-950 text-fuchsia-200 border border-fuchsia-800/30 shadow-[0_4px_12px_rgba(240,70,250,0.15)]"
                  : "text-purple-300/60 hover:text-purple-200"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => handleTabChange("signup")}
              disabled={isLoading}
              className={`flex-1 text-center py-2.5 rounded-lg text-sm font-medium tracking-wide transition-all ${
                activeTab === "signup"
                  ? "bg-gradient-to-r from-fuchsia-950 to-purple-950 text-fuchsia-200 border border-fuchsia-800/30 shadow-[0_4px_12px_rgba(240,70,250,0.15)]"
                  : "text-purple-300/60 hover:text-purple-200"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Feedback Messages */}
          {errorMessage && (
            <div className="flex items-start gap-2.5 bg-rose-950/40 border border-rose-800/30 text-rose-300 px-4 py-3 rounded-xl mb-5 text-sm animate-[shake_0.4s_ease-in-out]">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="flex items-start gap-2.5 bg-emerald-950/40 border border-emerald-800/30 text-emerald-300 px-4 py-3 rounded-xl mb-5 text-sm">
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Tab content: Login Form */}
          {activeTab === "login" ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-purple-200/70 text-xs font-medium pl-1">
                  Email address
                </Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-purple-300/40">
                    <Mail className="w-4.5 h-4.5" />
                  </span>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    disabled={isLoading}
                    className="pl-10 h-11 bg-[#120a1a]/60 border-white/[0.04] text-purple-100 placeholder:text-purple-300/25 focus-visible:ring-fuchsia-500 focus-visible:border-fuchsia-500 focus-visible:ring-1"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-purple-200/70 text-xs font-medium pl-1">
                  Password
                </Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-purple-300/40">
                    <Lock className="w-4.5 h-4.5" />
                  </span>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    disabled={isLoading}
                    className="pl-10 pr-10 h-11 bg-[#120a1a]/60 border-white/[0.04] text-purple-100 placeholder:text-purple-300/25 focus-visible:ring-fuchsia-500 focus-visible:border-fuchsia-500 focus-visible:ring-1"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-purple-300/40 hover:text-purple-200"
                  >
                    {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-gradient-to-r from-fuchsia-600 via-pink-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-medium rounded-xl shadow-lg shadow-fuchsia-600/10 active:scale-[0.98] transition-all mt-6"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing In...
                  </span>
                ) : (
                  "Unlock Access"
                )}
              </Button>
            </form>
          ) : (
            /* Tab content: Signup Form */
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-purple-200/70 text-xs font-medium pl-1">
                  Your Name / Alias
                </Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-purple-300/40">
                    <User className="w-4.5 h-4.5" />
                  </span>
                  <Input
                    id="name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sweet_Dreamer"
                    required
                    disabled={isLoading}
                    className="pl-10 h-11 bg-[#120a1a]/60 border-white/[0.04] text-purple-100 placeholder:text-purple-300/25 focus-visible:ring-fuchsia-500 focus-visible:border-fuchsia-500 focus-visible:ring-1"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-purple-200/70 text-xs font-medium pl-1">
                  Email address
                </Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-purple-300/40">
                    <Mail className="w-4.5 h-4.5" />
                  </span>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    disabled={isLoading}
                    className="pl-10 h-11 bg-[#120a1a]/60 border-white/[0.04] text-purple-100 placeholder:text-purple-300/25 focus-visible:ring-fuchsia-500 focus-visible:border-fuchsia-500 focus-visible:ring-1"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-purple-200/70 text-xs font-medium pl-1">
                  Password
                </Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-purple-300/40">
                    <Lock className="w-4.5 h-4.5" />
                  </span>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    required
                    disabled={isLoading}
                    className="pl-10 pr-10 h-11 bg-[#120a1a]/60 border-white/[0.04] text-purple-100 placeholder:text-purple-300/25 focus-visible:ring-fuchsia-500 focus-visible:border-fuchsia-500 focus-visible:ring-1"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-purple-300/40 hover:text-purple-200"
                  >
                    {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-gradient-to-r from-fuchsia-600 via-pink-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-medium rounded-xl shadow-lg shadow-fuchsia-600/10 active:scale-[0.98] transition-all mt-6"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          )}

          {/* Anonymous Disclaimer */}
          <div className="mt-8 text-center text-[10px] text-purple-300/35 leading-relaxed tracking-wide font-light">
            🔒 Fully encrypted database. 100% discrete. Your identity is fully secure with us. By continuing, you verify you are 18+ years of age.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#050208] text-purple-200">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-fuchsia-500" />
          <p className="text-sm font-light tracking-wide uppercase text-purple-200/50">Loading Secure Access...</p>
        </div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
