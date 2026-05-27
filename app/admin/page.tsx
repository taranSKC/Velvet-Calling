"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Plus, Edit2, Trash2, Image, Video, Users, Check, AlertTriangle, LogOut, ArrowLeft, Settings, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { VOICE_REGISTRY } from "@/utils/voice-registry";

// Dynamically generate the select list options from our secure backend voice registry
const REGISTRY_VOICES = Object.values(VOICE_REGISTRY).reduce((acc: { id: string; name: string }[], item) => {
  const voiceId = item.voiceId;
  const isDuplicate = acc.some(v => v.id === voiceId);
  if (!isDuplicate) {
    acc.push({
      id: voiceId,
      name: `${item.backendName} (${item.gender.toUpperCase()} - ${item.language.toUpperCase()} | ${item.description})`
    });
  }
  return acc;
}, []).sort((a, b) => a.name.localeCompare(b.name));

export default function AdminDashboard() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  // Navigation tabs
  const [activeTab, setActiveTab] = useState<"performers" | "photos" | "videos">("performers");

  // Performer states
  const [performers, setPerformers] = useState<any[]>([]);
  const [isLoadingPerformers, setIsLoadingPerformers] = useState(true);
  const [isPerformerModalOpen, setIsPerformerModalOpen] = useState(false);
  const [editingPerformer, setEditingPerformer] = useState<any | null>(null);

  // Form states for performer
  const [perfName, setPerfName] = useState("");
  const [perfAge, setPerfAge] = useState("22");
  const [perfStatus, setPerfStatus] = useState("online");
  const [perfPrice, setPerfPrice] = useState("2.99");
  const [perfAvatar, setPerfAvatar] = useState("");
  const [perfCover, setPerfCover] = useState("");
  const [perfBio, setPerfBio] = useState("");
  const [perfShortBio, setPerfShortBio] = useState("");
  const [perfSpecialties, setPerfSpecialties] = useState("GFE, Seduction, Dirty Talk");
  const [perfCategories, setPerfCategories] = useState("Bimbo, Bratty");
  const [perfVoice, setPerfVoice] = useState("eve");
  const [perfHair, setPerfHair] = useState("Blonde");
  const [perfBody, setPerfBody] = useState("Hourglass");
  const [perfEthnicity, setPerfEthnicity] = useState("Caucasian");
  const [perfOnline, setPerfOnline] = useState(true);

  // Media states
  const [selectedGirlId, setSelectedGirlId] = useState<string>("");
  const [girlPhotos, setGirlPhotos] = useState<any[]>([]);
  const [girlVideos, setGirlVideos] = useState<any[]>([]);
  const [newPhotoUrl, setNewPhotoUrl] = useState("");
  const [newPhotoIsPremium, setNewPhotoIsPremium] = useState(false);
  const [newPhotoPrice, setNewPhotoPrice] = useState("5.00");
  const [newPhotoCategory, setNewPhotoCategory] = useState("Glamour");

  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newVideoThumbnail, setNewVideoThumbnail] = useState("");
  const [newVideoDuration, setNewVideoDuration] = useState("120");
  const [newVideoIsPremium, setNewVideoIsPremium] = useState(false);
  const [newVideoPrice, setNewVideoPrice] = useState("10.00");
  const [newVideoCategory, setNewVideoCategory] = useState("Solo");

  // Fetch Performers
  const fetchPerformers = async () => {
    setIsLoadingPerformers(true);
    try {
      const res = await fetch("/api/admin/girls");
      if (res.ok) {
        const data = await res.json();
        setPerformers(data);
        if (data.length > 0 && !selectedGirlId) {
          setSelectedGirlId(data[0].id.toString());
        }
      } else {
        toast.error("Failed to load performers");
      }
    } catch (err) {
      toast.error("Error connecting to server");
    } finally {
      setIsLoadingPerformers(false);
    }
  };

  // Fetch Media when girl selection changes
  const fetchGirlMedia = async (girlId: string) => {
    if (!girlId) return;
    try {
      // Fetch Photos
      const photoRes = await fetch(`/api/admin/photos?girlId=${girlId}`);
      if (photoRes.ok) {
        setGirlPhotos(await photoRes.json());
      }
      
      // Fetch Videos
      const videoRes = await fetch(`/api/admin/videos?girlId=${girlId}`);
      if (videoRes.ok) {
        setGirlVideos(await videoRes.json());
      }
    } catch (err) {
      console.error("Failed to fetch media", err);
    }
  };

  useEffect(() => {
    if (sessionStatus === "authenticated" && (session?.user as any)?.role === "admin") {
      fetchPerformers();
    }
  }, [sessionStatus, session]);

  useEffect(() => {
    if (selectedGirlId) {
      fetchGirlMedia(selectedGirlId);
    }
  }, [selectedGirlId]);

  // Auth Guard Rendering
  if (sessionStatus === "loading") {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center flex-col gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-pink-500/20 border-t-pink-500 animate-spin" />
        <p className="text-neutral-400 font-medium tracking-wide">Loading Secure Dashboard...</p>
      </div>
    );
  }

  if (sessionStatus === "unauthenticated" || (session?.user as any)?.role !== "admin") {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full border border-red-500/30 bg-neutral-900/60 backdrop-blur-xl p-8 rounded-2xl text-center shadow-2xl shadow-red-500/5">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]" />
          <h1 className="text-2xl font-bold tracking-wide mb-2">ACCESS DENIED</h1>
          <p className="text-neutral-400 mb-6 text-sm leading-relaxed">
            You do not have administrative privileges to access this area. This action has been logged.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => router.push("/")}
              className="flex-1 px-4 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-medium tracking-wide transition-all border border-neutral-700"
            >
              Back to Home
            </button>
            <button
              onClick={() => router.push("/login")}
              className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-medium tracking-wide transition-all shadow-lg shadow-red-600/20"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Open Edit Performer Modal
  const handleEditPerformer = (girl: any) => {
    setEditingPerformer(girl);
    setPerfName(girl.name);
    setPerfAge(girl.age.toString());
    setPerfStatus(girl.status);
    setPerfPrice(girl.pricePerMin.toString());
    setPerfAvatar(girl.avatarUrl);
    setPerfCover(girl.coverUrl || "");
    setPerfBio(girl.bio || "");
    setPerfShortBio(girl.shortBio || "");
    setPerfSpecialties(girl.specialties ? girl.specialties.join(", ") : "");
    setPerfCategories(girl.categories ? girl.categories.join(", ") : "");
    setPerfHair(girl.hairColor || "");
    setPerfBody(girl.bodyType || "");
    setPerfEthnicity(girl.ethnicity || "");
    setPerfOnline(girl.isOnline);
    
    // Fallback voice selection match
    setPerfVoice("eve");
    setIsPerformerModalOpen(true);
  };

  // Open Add Performer Modal
  const handleAddPerformer = () => {
    setEditingPerformer(null);
    setPerfName("");
    setPerfAge("22");
    setPerfStatus("online");
    setPerfPrice("2.99");
    setPerfAvatar("");
    setPerfCover("");
    setPerfBio("");
    setPerfShortBio("");
    setPerfSpecialties("GFE, Seduction, Dirty Talk");
    setPerfCategories("Bimbo, Bratty");
    setPerfVoice("eve");
    setPerfHair("Blonde");
    setPerfBody("Hourglass");
    setPerfEthnicity("Caucasian");
    setPerfOnline(true);
    setIsPerformerModalOpen(true);
  };

  // Submit Performer Add/Edit Form
  const handlePerformerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!perfName || !perfAvatar || !perfPrice) {
      toast.error("Please fill in all required fields");
      return;
    }

    const payload = {
      name: perfName,
      age: Number(perfAge),
      status: perfStatus,
      pricePerMin: Number(perfPrice),
      avatarUrl: perfAvatar,
      coverUrl: perfCover || perfAvatar,
      bio: perfBio,
      shortBio: perfShortBio,
      specialties: perfSpecialties.split(",").map(s => s.trim()).filter(Boolean),
      categories: perfCategories.split(",").map(c => c.trim()).filter(Boolean),
      isOnline: perfOnline,
      hairColor: perfHair,
      bodyType: perfBody,
      ethnicity: perfEthnicity,
      voiceId: perfVoice, // Send backend voice ID for mapping
    };

    try {
      const url = editingPerformer ? `/api/admin/girls/${editingPerformer.id}` : "/api/admin/girls";
      const method = editingPerformer ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(editingPerformer ? "Performer updated successfully!" : "Performer added successfully!");
        setIsPerformerModalOpen(false);
        fetchPerformers();
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to save performer");
      }
    } catch (err) {
      toast.error("Error saving performer");
    }
  };

  // Delete Performer
  const handleDeletePerformer = async (id: number) => {
    if (!confirm("Are you sure you want to permanently delete this performer? This will delete all their details.")) return;

    try {
      const res = await fetch(`/api/admin/girls/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Performer deleted successfully!");
        fetchPerformers();
      } else {
        toast.error("Failed to delete performer");
      }
    } catch (err) {
      toast.error("Error deleting performer");
    }
  };

  // Add Photo
  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoUrl) {
      toast.error("Please provide a photo URL");
      return;
    }

    const girl = performers.find(p => p.id.toString() === selectedGirlId);
    if (!girl) return;

    try {
      const res = await fetch("/api/admin/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: newPhotoUrl,
          thumbnailUrl: newPhotoUrl,
          girlId: girl.id,
          girlName: girl.name,
          isPremium: newPhotoIsPremium,
          price: newPhotoIsPremium ? Number(newPhotoPrice) : null,
          category: newPhotoCategory,
        }),
      });

      if (res.ok) {
        toast.success("Photo added successfully!");
        setNewPhotoUrl("");
        fetchGirlMedia(selectedGirlId);
      } else {
        toast.error("Failed to add photo");
      }
    } catch (err) {
      toast.error("Error adding photo");
    }
  };

  // Delete Photo
  const handleDeletePhoto = async (photoId: number) => {
    try {
      const res = await fetch(`/api/admin/photos?id=${photoId}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Photo removed!");
        fetchGirlMedia(selectedGirlId);
      } else {
        toast.error("Failed to remove photo");
      }
    } catch (err) {
      toast.error("Error removing photo");
    }
  };

  // Add Video
  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideoTitle || !newVideoThumbnail) {
      toast.error("Please fill in all required video fields");
      return;
    }

    const girl = performers.find(p => p.id.toString() === selectedGirlId);
    if (!girl) return;

    try {
      const res = await fetch("/api/admin/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newVideoTitle,
          duration: Number(newVideoDuration),
          thumbnailUrl: newVideoThumbnail,
          videoUrl: newVideoUrl || null,
          girlId: girl.id,
          girlName: girl.name,
          category: newVideoCategory,
          isPremium: newVideoIsPremium,
          price: newVideoIsPremium ? Number(newVideoPrice) : null,
        }),
      });

      if (res.ok) {
        toast.success("Video added successfully!");
        setNewVideoTitle("");
        setNewVideoUrl("");
        setNewVideoThumbnail("");
        fetchGirlMedia(selectedGirlId);
      } else {
        toast.error("Failed to add video");
      }
    } catch (err) {
      toast.error("Error adding video");
    }
  };

  // Delete Video
  const handleDeleteVideo = async (videoId: number) => {
    try {
      const res = await fetch(`/api/admin/videos?id=${videoId}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Video removed!");
        fetchGirlMedia(selectedGirlId);
      } else {
        toast.error("Failed to remove video");
      }
    } catch (err) {
      toast.error("Error removing video");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-pink-500 selection:text-white pb-20">
      
      {/* HEADER */}
      <header className="border-b border-neutral-900 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-600 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wide flex items-center gap-2">
                VELVET CALL <span className="text-[10px] bg-pink-500/10 border border-pink-500/30 text-pink-400 font-extrabold uppercase px-2 py-0.5 rounded-full tracking-widest">Admin Control</span>
              </h1>
              <p className="text-[11px] text-neutral-400">Manage performers, AI secure voices, and models media</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition-all text-neutral-300"
            >
              <ArrowLeft className="w-4 h-4" /> Exit Dashboard
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-10">
        
        {/* TABS SELECTOR */}
        <div className="flex items-center justify-between border-b border-neutral-900 pb-6 mb-8">
          <div className="flex items-center gap-2 bg-neutral-900/50 p-1 rounded-2xl border border-neutral-900 backdrop-blur-md">
            <button
              onClick={() => setActiveTab("performers")}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "performers"
                  ? "bg-gradient-to-tr from-pink-600 to-purple-600 text-white shadow-lg shadow-pink-500/15"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Users className="w-4 h-4" /> Performers Map
            </button>
            <button
              onClick={() => setActiveTab("photos")}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "photos"
                  ? "bg-gradient-to-tr from-pink-600 to-purple-600 text-white shadow-lg shadow-pink-500/15"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Image className="w-4 h-4" /> Photo Sets
            </button>
            <button
              onClick={() => setActiveTab("videos")}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "videos"
                  ? "bg-gradient-to-tr from-pink-600 to-purple-600 text-white shadow-lg shadow-pink-500/15"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Video className="w-4 h-4" /> Video Sets
            </button>
          </div>

          {activeTab === "performers" && (
            <button
              onClick={handleAddPerformer}
              className="flex items-center gap-2 text-xs font-extrabold uppercase px-6 py-3.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-pink-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Plus className="w-4 h-4" /> Add New Performer
            </button>
          )}
        </div>

        {/* TAB CONTENTS - PERFORMERS */}
        {activeTab === "performers" && (
          <div>
            {isLoadingPerformers ? (
              <div className="h-64 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-4 border-pink-500/10 border-t-pink-500 animate-spin" />
              </div>
            ) : performers.length === 0 ? (
              <div className="border border-dashed border-neutral-800 bg-neutral-900/10 p-12 text-center rounded-2xl">
                <Users className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-1">No Performers Loaded</h3>
                <p className="text-sm text-neutral-500 mb-6">Start building your performer roster right now.</p>
                <button
                  onClick={handleAddPerformer}
                  className="px-6 py-3.5 bg-neutral-900 border border-neutral-800 text-xs font-bold uppercase text-white rounded-xl hover:bg-neutral-800 transition-all"
                >
                  Create First Profile
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {performers.map((girl) => (
                  <div
                    key={girl.id}
                    className="border border-neutral-900 bg-neutral-900/20 backdrop-blur-md rounded-2xl overflow-hidden hover:border-pink-500/30 transition-all flex flex-col group"
                  >
                    <div className="h-44 relative bg-neutral-900 overflow-hidden">
                      <img
                        src={girl.avatarUrl}
                        alt={girl.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                        <div>
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase border ${
                            girl.isOnline 
                              ? "bg-green-500/10 border-green-500/30 text-green-400" 
                              : "bg-neutral-900/60 border-neutral-800 text-neutral-400"
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${girl.isOnline ? "bg-green-500" : "bg-neutral-500"}`} />
                            {girl.status}
                          </span>
                          <h3 className="text-lg font-extrabold tracking-wide mt-1.5 drop-shadow-md">{girl.name}</h3>
                        </div>
                        <span className="text-xs font-extrabold text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20">
                          ${girl.pricePerMin.toFixed(2)}/min
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs mb-5 border-b border-neutral-900/50 pb-4">
                          <div>
                            <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-wider">Age</p>
                            <p className="font-semibold text-neutral-200">{girl.age} years old</p>
                          </div>
                          <div>
                            <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-wider">Hair Color</p>
                            <p className="font-semibold text-neutral-200">{girl.hairColor || "Not specified"}</p>
                          </div>
                          <div>
                            <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-wider">Categories</p>
                            <div className="flex flex-wrap gap-1 mt-0.5">
                              {girl.categories?.slice(0, 2).map((c: string, idx: number) => (
                                <span key={idx} className="bg-neutral-800/80 text-neutral-300 text-[9px] font-bold px-1.5 py-0.5 rounded">
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-wider">Call stats</p>
                            <p className="font-semibold text-neutral-200">{girl.totalCalls} completed calls</p>
                          </div>
                        </div>
                        <p className="text-neutral-400 text-xs leading-relaxed line-clamp-3 mb-6">
                          {girl.shortBio || girl.bio || "No biography provided yet."}
                        </p>
                      </div>

                      <div className="flex gap-2 border-t border-neutral-900/80 pt-4">
                        <button
                          onClick={() => handleEditPerformer(girl)}
                          className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-neutral-900 border border-neutral-800 text-xs font-bold uppercase text-neutral-300 hover:bg-neutral-800 hover:text-white rounded-xl transition-all"
                        >
                          <Edit2 className="w-3.5 h-3.5" /> Edit Profile
                        </button>
                        <button
                          onClick={() => handleDeletePerformer(girl.id)}
                          className="px-4 py-2.5 bg-red-650/10 border border-red-500/20 text-red-400 hover:bg-red-600 hover:text-white rounded-xl transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB CONTENTS - PHOTOS */}
        {activeTab === "photos" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left side: Selector & Uploader */}
            <div className="border border-neutral-900 bg-neutral-900/30 backdrop-blur-md p-6 rounded-2xl h-fit">
              <h2 className="text-base font-bold tracking-wide mb-6 uppercase flex items-center gap-2">
                <Image className="w-5 h-5 text-pink-500" /> Link Additional Photos
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">Select Performer</label>
                  <select
                    value={selectedGirlId}
                    onChange={(e) => setSelectedGirlId(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-850 focus:border-pink-500 text-neutral-100 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                  >
                    {performers.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <form onSubmit={handleAddPhoto} className="space-y-4 pt-4 border-t border-neutral-900">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">Photo URL *</label>
                    <input
                      type="url"
                      value={newPhotoUrl}
                      onChange={(e) => setNewPhotoUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-neutral-950 border border-neutral-850 focus:border-pink-500 text-neutral-100 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all placeholder:text-neutral-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">Category</label>
                    <input
                      type="text"
                      value={newPhotoCategory}
                      onChange={(e) => setNewPhotoCategory(e.target.value)}
                      placeholder="e.g. Glamour, Selfie, Spicy"
                      className="w-full bg-neutral-950 border border-neutral-850 focus:border-pink-500 text-neutral-100 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                    />
                  </div>

                  <div className="flex items-center justify-between bg-neutral-950 p-4 rounded-xl border border-neutral-900">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wide">Premium / Locked Photo</h4>
                      <p className="text-[10px] text-neutral-400 mt-0.5">Requires coins/price to unlock</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={newPhotoIsPremium}
                      onChange={(e) => setNewPhotoIsPremium(e.target.checked)}
                      className="w-5 h-5 rounded accent-pink-500 bg-neutral-950"
                    />
                  </div>

                  {newPhotoIsPremium && (
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">Coin Price ($ value equivalent)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={newPhotoPrice}
                        onChange={(e) => setNewPhotoPrice(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-850 focus:border-pink-500 text-neutral-100 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg shadow-pink-500/10 mt-6"
                  >
                    Link Photo
                  </button>
                </form>
              </div>
            </div>

            {/* Right side: Photo Gallery */}
            <div className="lg:col-span-2 border border-neutral-900 bg-neutral-900/10 p-6 rounded-2xl">
              <h2 className="text-base font-bold tracking-wide mb-6 uppercase">Linked Photos</h2>
              
              {girlPhotos.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center">
                  <Image className="w-10 h-10 text-neutral-700 mb-2" />
                  <p className="text-xs text-neutral-500">No extra photos linked to this performer.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {girlPhotos.map((photo) => (
                    <div key={photo.id} className="relative group rounded-xl overflow-hidden border border-neutral-900 h-48 bg-neutral-950">
                      <img src={photo.url} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleDeletePhoto(photo.id)}
                          className="p-3 bg-red-650 hover:bg-red-600 text-white rounded-xl transition-all shadow-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center pointer-events-none">
                        <span className="bg-neutral-950/80 px-2 py-0.5 text-[9px] font-bold rounded uppercase tracking-wide border border-neutral-850">
                          {photo.category}
                        </span>
                        {photo.isPremium && (
                          <span className="bg-pink-600 text-white px-2 py-0.5 text-[9px] font-bold rounded uppercase tracking-wide shadow-lg shadow-pink-600/20">
                            Premium (${photo.price})
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB CONTENTS - VIDEOS */}
        {activeTab === "videos" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left side: Selector & Video form */}
            <div className="border border-neutral-900 bg-neutral-900/30 backdrop-blur-md p-6 rounded-2xl h-fit">
              <h2 className="text-base font-bold tracking-wide mb-6 uppercase flex items-center gap-2">
                <Video className="w-5 h-5 text-pink-500" /> Link Performer Video
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">Select Performer</label>
                  <select
                    value={selectedGirlId}
                    onChange={(e) => setSelectedGirlId(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-850 focus:border-pink-500 text-neutral-100 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                  >
                    {performers.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <form onSubmit={handleAddVideo} className="space-y-4 pt-4 border-t border-neutral-900">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">Video Title *</label>
                    <input
                      type="text"
                      value={newVideoTitle}
                      onChange={(e) => setNewVideoTitle(e.target.value)}
                      placeholder="e.g. Seducing you after a late night..."
                      className="w-full bg-neutral-950 border border-neutral-850 focus:border-pink-500 text-neutral-100 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all placeholder:text-neutral-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">Cover Thumbnail URL *</label>
                    <input
                      type="url"
                      value={newVideoThumbnail}
                      onChange={(e) => setNewVideoThumbnail(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-neutral-950 border border-neutral-850 focus:border-pink-500 text-neutral-100 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all placeholder:text-neutral-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">MP4 / Video File URL</label>
                    <input
                      type="url"
                      value={newVideoUrl}
                      onChange={(e) => setNewVideoUrl(e.target.value)}
                      placeholder="https://yoursite.com/videos/clip.mp4"
                      className="w-full bg-neutral-950 border border-neutral-850 focus:border-pink-500 text-neutral-100 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all placeholder:text-neutral-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">Duration (seconds)</label>
                      <input
                        type="number"
                        value={newVideoDuration}
                        onChange={(e) => setNewVideoDuration(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-850 focus:border-pink-500 text-neutral-100 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">Category</label>
                      <input
                        type="text"
                        value={newVideoCategory}
                        onChange={(e) => setNewVideoCategory(e.target.value)}
                        placeholder="Solo, Cosplay"
                        className="w-full bg-neutral-950 border border-neutral-850 focus:border-pink-500 text-neutral-100 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-neutral-950 p-4 rounded-xl border border-neutral-900">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wide">Premium Video Clip</h4>
                      <p className="text-[10px] text-neutral-400 mt-0.5">Pay coins/tokens to watch</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={newVideoIsPremium}
                      onChange={(e) => setNewVideoIsPremium(e.target.checked)}
                      className="w-5 h-5 rounded accent-pink-500 bg-neutral-950"
                    />
                  </div>

                  {newVideoIsPremium && (
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">Unlock Cost ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={newVideoPrice}
                        onChange={(e) => setNewVideoPrice(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-850 focus:border-pink-500 text-neutral-100 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg shadow-pink-500/10 mt-6"
                  >
                    Link Video
                  </button>
                </form>
              </div>
            </div>

            {/* Right side: Video list */}
            <div className="lg:col-span-2 border border-neutral-900 bg-neutral-900/10 p-6 rounded-2xl">
              <h2 className="text-base font-bold tracking-wide mb-6 uppercase">Linked Videos</h2>
              
              {girlVideos.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center">
                  <Video className="w-10 h-10 text-neutral-700 mb-2" />
                  <p className="text-xs text-neutral-500">No extra video sets linked to this performer.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {girlVideos.map((video) => (
                    <div
                      key={video.id}
                      className="flex items-center gap-4 bg-neutral-900/30 border border-neutral-900 p-4 rounded-xl hover:border-neutral-800 transition-all justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-14 bg-neutral-950 rounded-lg overflow-hidden border border-neutral-850 relative">
                          <img src={video.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm tracking-wide text-neutral-200">{video.title}</h4>
                          <div className="flex gap-2 mt-1 items-center">
                            <span className="text-[9px] bg-neutral-800 text-neutral-400 font-bold uppercase px-2 py-0.5 rounded">
                              {Math.floor(video.duration / 60)}m {video.duration % 60}s
                            </span>
                            <span className="text-[9px] bg-neutral-800 text-neutral-400 font-bold uppercase px-2 py-0.5 rounded">
                              {video.category}
                            </span>
                            {video.isPremium && (
                              <span className="text-[9px] bg-pink-500/10 text-pink-400 border border-pink-500/20 font-bold uppercase px-2 py-0.5 rounded">
                                Premium (${video.price})
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteVideo(video.id)}
                        className="p-3 bg-red-650/10 border border-red-500/20 text-red-400 hover:bg-red-600 hover:text-white rounded-xl transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      {/* ADD/EDIT PERFORMER MODAL */}
      {isPerformerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div 
            className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm"
            onClick={() => setIsPerformerModalOpen(false)}
          />
          <div className="relative border border-neutral-850 bg-neutral-900 backdrop-blur-xl p-8 rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto shadow-2xl shadow-neutral-950/50">
            <h2 className="text-xl font-bold tracking-wide mb-6 uppercase flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-pink-500" /> {editingPerformer ? "Edit Performer Profile" : "Register Performer Profile"}
            </h2>

            <form onSubmit={handlePerformerSubmit} className="space-y-6">
              
              {/* Row 1: Core details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">Performer Name (Frontend Show Name) *</label>
                  <input
                    type="text"
                    value={perfName}
                    onChange={(e) => setPerfName(e.target.value)}
                    placeholder="e.g. Yuki Sakura"
                    className="w-full bg-neutral-950 border border-neutral-850 focus:border-pink-500 text-neutral-100 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all placeholder:text-neutral-600"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">Age *</label>
                  <input
                    type="number"
                    value={perfAge}
                    onChange={(e) => setPerfAge(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-850 focus:border-pink-500 text-neutral-100 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">Coin Price Per Minute ($ equivalent) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={perfPrice}
                    onChange={(e) => setPerfPrice(e.target.value)}
                    placeholder="e.g. 2.99"
                    className="w-full bg-neutral-950 border border-neutral-850 focus:border-pink-500 text-neutral-100 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Media links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">Avatar Image URL *</label>
                  <input
                    type="url"
                    value={perfAvatar}
                    onChange={(e) => setPerfAvatar(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-neutral-950 border border-neutral-850 focus:border-pink-500 text-neutral-100 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">Profile Cover Image URL</label>
                  <input
                    type="url"
                    value={perfCover}
                    onChange={(e) => setPerfCover(e.target.value)}
                    placeholder="Leave empty to fallback to Avatar"
                    className="w-full bg-neutral-950 border border-neutral-850 focus:border-pink-500 text-neutral-100 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Row 3: Biographies */}
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">Teaser Short Bio (Grid view text) *</label>
                  <input
                    type="text"
                    value={perfShortBio}
                    onChange={(e) => setPerfShortBio(e.target.value)}
                    placeholder="A dynamic one-liner biography..."
                    className="w-full bg-neutral-950 border border-neutral-850 focus:border-pink-500 text-neutral-100 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">Detailed Bio / Persona (Important for dynamic prompt generation) *</label>
                  <textarea
                    value={perfBio}
                    onChange={(e) => setPerfBio(e.target.value)}
                    rows={4}
                    placeholder="Detailed history, preferences, and personality details. This bio is injected into the AI backend prompt to build their realistic speech style."
                    className="w-full bg-neutral-950 border border-neutral-850 focus:border-pink-500 text-neutral-100 rounded-xl p-4 text-sm focus:outline-none transition-all placeholder:text-neutral-600"
                    required
                  />
                </div>
              </div>

              {/* Row 4: Voice selection & Physical traits */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">Secure AI Voice Persona *</label>
                  <select
                    value={perfVoice}
                    onChange={(e) => setPerfVoice(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-850 focus:border-pink-500 text-neutral-100 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                  >
                    {REGISTRY_VOICES.map((v) => (
                      <option key={v.id} value={v.id}>{v.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">Hair Style / Color</label>
                  <input
                    type="text"
                    value={perfHair}
                    onChange={(e) => setPerfHair(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-850 focus:border-pink-500 text-neutral-100 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">Body Type</label>
                  <input
                    type="text"
                    value={perfBody}
                    onChange={(e) => setPerfBody(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-850 focus:border-pink-500 text-neutral-100 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">Ethnicity</label>
                  <input
                    type="text"
                    value={perfEthnicity}
                    onChange={(e) => setPerfEthnicity(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-850 focus:border-pink-500 text-neutral-100 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Row 5: Tags and Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">Specialty tags (Comma separated)</label>
                  <input
                    type="text"
                    value={perfSpecialties}
                    onChange={(e) => setPerfSpecialties(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-850 focus:border-pink-500 text-neutral-100 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">Categories tags (Comma separated)</label>
                  <input
                    type="text"
                    value={perfCategories}
                    onChange={(e) => setPerfCategories(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-850 focus:border-pink-500 text-neutral-100 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Row 6: Status mappings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-neutral-950 p-4 rounded-xl border border-neutral-850">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wide">Status state</h4>
                    <p className="text-[10px] text-neutral-400 mt-0.5">Toggle default performer visibility</p>
                  </div>
                  <select
                    value={perfStatus}
                    onChange={(e) => setPerfStatus(e.target.value)}
                    className="bg-neutral-900 border border-neutral-800 text-neutral-100 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                  >
                    <option value="online">Online</option>
                    <option value="busy">Busy</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>

                <div className="flex items-center justify-between border-l border-neutral-850 pl-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wide">Active Presence</h4>
                    <p className="text-[10px] text-neutral-400 mt-0.5">Show as immediately active on pages</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={perfOnline}
                    onChange={(e) => setPerfOnline(e.target.checked)}
                    className="w-5 h-5 rounded accent-pink-500 bg-neutral-950"
                  />
                </div>
              </div>

              {/* Actions footer */}
              <div className="flex gap-4 pt-6 border-t border-neutral-900">
                <button
                  type="button"
                  onClick={() => setIsPerformerModalOpen(false)}
                  className="flex-1 py-3.5 bg-neutral-950 border border-neutral-850 hover:bg-neutral-800 hover:text-white transition-all text-xs font-bold uppercase tracking-wider text-neutral-450 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg shadow-pink-500/10"
                >
                  {editingPerformer ? "Save Performer" : "Create Performer"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
