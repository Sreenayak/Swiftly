import { useState } from "react";
import {
  Wrench, Zap, Droplets, Leaf, Shield, Paintbrush, Wind, Flame,
  SlidersHorizontal, Star, X, ChevronDown, Search, Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import NavBar from "@/components/NavBar";
import ServiceCard from "@/components/ServiceCard";
import ProCard from "@/components/ProCard";

const allServices = [
  { title: "Plumbing", description: "Leak repairs, pipe installation, drain cleaning and full plumbing overhauls.", icon: Droplets, price: "$75", category: "Utility", popular: true, color: "#4a6c8f" },
  { title: "Electrical", description: "Panel upgrades, outlet installs, smart home wiring and safety inspections.", icon: Zap, price: "$90", category: "Utility", popular: false, color: "#d9a441" },
  { title: "HVAC & Cooling", description: "AC installation, furnace repair, duct cleaning and climate control systems.", icon: Wind, price: "$85", category: "Climate", popular: true, color: "#22c55e" },
  { title: "General Repairs", description: "Furniture assembly, appliance installation, handyman tasks of all kinds.", icon: Wrench, price: "$65", category: "General", popular: false, color: "#8b5cf6" },
  { title: "Landscaping", description: "Lawn care, garden design, tree trimming and seasonal yard maintenance.", icon: Leaf, price: "$60", category: "Outdoor", popular: false, color: "#10b981" },
  { title: "Home Security", description: "Camera installation, smart locks, alarm systems and security audits.", icon: Shield, price: "$110", category: "Security", popular: false, color: "#f43f5e" },
  { title: "Painting", description: "Interior and exterior painting, wall prep, color consultation and finishing.", icon: Paintbrush, price: "$80", category: "Aesthetic", popular: true, color: "#f97316" },
  { title: "Gas & Heating", description: "Boiler service, gas line installs, radiator balancing and heating efficiency.", icon: Flame, price: "$95", category: "Utility", popular: false, color: "#ef4444" },
];

const allPros = [
  {
    name: "Marcus Webb",
    specialty: "Master Electrician",
    rating: 4.9,
    reviews: 284,
    location: "San Francisco, CA",
    distance: "1.2 mi",
    availability: "Available today",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
    verified: true,
    jobsCompleted: 512,
    hourlyRate: "$95",
    tags: ["Panel Upgrades", "Smart Home", "EV Charging"],
    category: "Utility",
  },
  {
    name: "Priya Sharma",
    specialty: "Licensed Plumber",
    rating: 4.8,
    reviews: 196,
    location: "San Francisco, CA",
    distance: "0.8 mi",
    availability: "Next slot: 3 PM",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
    verified: true,
    jobsCompleted: 341,
    hourlyRate: "$80",
    tags: ["Emergency Repairs", "Remodels", "Water Heaters"],
    category: "Utility",
  },
  {
    name: "Derek Nguyen",
    specialty: "HVAC Technician",
    rating: 4.7,
    reviews: 158,
    location: "San Francisco, CA",
    distance: "2.1 mi",
    availability: "Available tomorrow",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg",
    verified: true,
    jobsCompleted: 267,
    hourlyRate: "$88",
    tags: ["AC Repair", "Duct Work", "Mini-Split"],
    category: "Climate",
  },
  {
    name: "Carmen Reyes",
    specialty: "Interior Painter",
    rating: 4.9,
    reviews: 203,
    location: "San Francisco, CA",
    distance: "1.8 mi",
    availability: "Next slot: Tomorrow 9 AM",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg",
    verified: true,
    jobsCompleted: 389,
    hourlyRate: "$75",
    tags: ["Interior", "Exterior", "Commercial"],
    category: "Aesthetic",
  },
  {
    name: "James Okafor",
    specialty: "Security Specialist",
    rating: 4.8,
    reviews: 127,
    location: "San Francisco, CA",
    distance: "3.2 mi",
    availability: "Available today",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg",
    verified: true,
    jobsCompleted: 178,
    hourlyRate: "$110",
    tags: ["Smart Locks", "CCTV", "Alarm Systems"],
    category: "Security",
  },
  {
    name: "Sofia Tanaka",
    specialty: "Landscape Designer",
    rating: 4.6,
    reviews: 89,
    location: "San Francisco, CA",
    distance: "1.5 mi",
    availability: "Next slot: Monday",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg",
    verified: true,
    jobsCompleted: 134,
    hourlyRate: "$65",
    tags: ["Garden Design", "Lawn Care", "Irrigation"],
    category: "Outdoor",
  },
];

const categories = ["All", "Utility", "Climate", "General", "Outdoor", "Security", "Aesthetic"];
const sortOptions = ["Best Match", "Highest Rated", "Lowest Price", "Most Reviews", "Availability"];

export default function Services() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSort, setActiveSort] = useState("Best Match");
  const [priceRange, setPriceRange] = useState([50, 150]);
  const [minRating, setMinRating] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"services" | "pros">("services");

  const filteredServices = allServices.filter((s) => {
    const matchCat = activeCategory === "All" || s.category === activeCategory;
    const matchSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const filteredPros = allPros.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRating = p.rating >= minRating;
    const matchVerified = !verifiedOnly || p.verified;
    const hourly = parseInt(p.hourlyRate.replace("$", ""));
    const matchPrice = hourly >= priceRange[0] && hourly <= priceRange[1];
    return matchCat && matchSearch && matchRating && matchVerified && matchPrice;
  });

  const activeFiltersCount = (activeCategory !== "All" ? 1 : 0) + (verifiedOnly ? 1 : 0) + (minRating > 0 ? 1 : 0);

  return (
    <div className="min-h-screen bg-canvas">
      <NavBar />

      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-20 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-sora font-700 text-2xl xl:text-3xl" style={{ color: "#e2e8f0" }}>
              Home Services
            </h1>
            <p className="font-manrope text-sm mt-1" style={{ color: "#64748b" }}>
              {filteredServices.length} services · {filteredPros.length} professionals near you
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Sort */}
            <div className="relative">
              <select
                value={activeSort}
                onChange={(e) => setActiveSort(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 rounded-lg font-manrope text-sm cursor-pointer"
                style={{
                  backgroundColor: "#1e2a38",
                  border: "1px solid rgba(74,108,143,0.3)",
                  color: "#e2e8f0",
                }}
              >
                {sortOptions.map(opt => (
                  <option key={opt} value={opt} style={{ backgroundColor: "#1e2a38" }}>{opt}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: "#64748b" }} />
            </div>

            {/* Filter Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="font-manrope font-500"
              style={{ backgroundColor: sidebarOpen ? "rgba(74,108,143,0.15)" : "#1e2a38", border: "1px solid rgba(74,108,143,0.3)", color: "#e2e8f0" }}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge className="ml-2 h-4 w-4 p-0 text-[10px]" style={{ backgroundColor: "#d9a441", color: "#10151c" }}>
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-1.5 rounded-full font-manrope text-sm font-500 transition-all"
              style={{
                backgroundColor: activeCategory === cat ? "#4a6c8f" : "rgba(74,108,143,0.08)",
                color: activeCategory === cat ? "#fff" : "#94a3b8",
                border: `1px solid ${activeCategory === cat ? "#4a6c8f" : "rgba(74,108,143,0.2)"}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex gap-6">
          {/* Filter Sidebar */}
          {sidebarOpen && (
            <aside
              className="w-64 shrink-0 hidden md:block"
              style={{
                backgroundColor: "#1e2a38",
                border: "1px solid rgba(74,108,143,0.2)",
                borderRadius: "14px",
                padding: "20px",
                height: "fit-content",
                position: "sticky",
                top: "84px",
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-sora font-600 text-sm" style={{ color: "#e2e8f0" }}>Filters</h3>
                <button className="font-manrope text-xs" style={{ color: "#4a6c8f" }} onClick={() => { setActiveCategory("All"); setVerifiedOnly(false); setMinRating(0); setPriceRange([50, 150]); }}>
                  Reset all
                </button>
              </div>

              {/* Search within */}
              <div className="relative mb-5">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "#4a6c8f" }} />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="pl-9 h-9 font-manrope text-sm"
                  style={{ backgroundColor: "rgba(74,108,143,0.08)", border: "1px solid rgba(74,108,143,0.2)", color: "#e2e8f0" }}
                />
              </div>

              {/* Price Range */}
              <div className="mb-5">
                <div className="font-sora font-500 text-xs uppercase tracking-wider mb-3" style={{ color: "#64748b" }}>Hourly Rate</div>
                <Slider
                  min={30}
                  max={200}
                  step={5}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-2"
                />
                <div className="flex justify-between font-manrope text-xs" style={{ color: "#64748b" }}>
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Min Rating */}
              <div className="mb-5">
                <div className="font-sora font-500 text-xs uppercase tracking-wider mb-3" style={{ color: "#64748b" }}>Min. Rating</div>
                <div className="flex gap-1.5">
                  {[0, 3, 4, 4.5].map((r) => (
                    <button
                      key={r}
                      onClick={() => setMinRating(r)}
                      className="flex-1 py-1.5 rounded-lg font-manrope text-xs transition-all"
                      style={{
                        backgroundColor: minRating === r ? "rgba(217,164,65,0.15)" : "rgba(74,108,143,0.08)",
                        color: minRating === r ? "#d9a441" : "#94a3b8",
                        border: `1px solid ${minRating === r ? "rgba(217,164,65,0.3)" : "rgba(74,108,143,0.2)"}`,
                      }}
                    >
                      {r === 0 ? "All" : `${r}+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Verified Only */}
              <div className="mb-5">
                <div className="font-sora font-500 text-xs uppercase tracking-wider mb-3" style={{ color: "#64748b" }}>Verification</div>
                <button
                  onClick={() => setVerifiedOnly(!verifiedOnly)}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg font-manrope text-sm transition-all"
                  style={{
                    backgroundColor: verifiedOnly ? "rgba(74,108,143,0.15)" : "rgba(74,108,143,0.05)",
                    border: `1px solid ${verifiedOnly ? "rgba(74,108,143,0.4)" : "rgba(74,108,143,0.2)"}`,
                    color: "#e2e8f0",
                  }}
                >
                  <div className={`w-4 h-4 rounded flex items-center justify-center transition-all`} style={{ backgroundColor: verifiedOnly ? "#4a6c8f" : "transparent", border: `2px solid ${verifiedOnly ? "#4a6c8f" : "rgba(74,108,143,0.4)"}` }}>
                    {verifiedOnly && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  Verified Only
                </button>
              </div>

              {/* Availability */}
              <div>
                <div className="font-sora font-500 text-xs uppercase tracking-wider mb-3" style={{ color: "#64748b" }}>Availability</div>
                <div className="space-y-1.5">
                  {["Today", "This Week", "Any Time"].map((opt) => (
                    <button
                      key={opt}
                      className="w-full text-left px-3 py-2 rounded-lg font-manrope text-sm transition-colors hover:bg-white/5"
                      style={{ color: "#94a3b8" }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          )}

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Tab Switch */}
            <div className="flex gap-1 mb-6 p-1 rounded-xl w-fit" style={{ backgroundColor: "#1e2a38", border: "1px solid rgba(74,108,143,0.2)" }}>
              {(["services", "pros"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-5 py-2 rounded-lg font-manrope text-sm font-500 capitalize transition-all"
                  style={{
                    backgroundColor: activeTab === tab ? "#4a6c8f" : "transparent",
                    color: activeTab === tab ? "#fff" : "#64748b",
                  }}
                >
                  {tab === "services" ? `Services (${filteredServices.length})` : `Professionals (${filteredPros.length})`}
                </button>
              ))}
            </div>

            {activeTab === "services" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredServices.map((service) => (
                  <ServiceCard key={service.title} {...service} />
                ))}
                {filteredServices.length === 0 && (
                  <div className="col-span-full text-center py-16 font-manrope" style={{ color: "#64748b" }}>
                    No services match your filters.
                  </div>
                )}
              </div>
            )}

            {activeTab === "pros" && (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                {filteredPros.map((pro) => (
                  <ProCard key={pro.name} {...pro} />
                ))}
                {filteredPros.length === 0 && (
                  <div className="col-span-full text-center py-16 font-manrope" style={{ color: "#64748b" }}>
                    No professionals match your filters.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}