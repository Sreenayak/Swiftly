import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Wrench, Zap, Droplets, Leaf, Shield, Paintbrush, Wind, Flame,
  Star, ArrowRight, ChevronRight, CheckCircle, TrendingUp, Clock, Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import NavBar from "@/components/NavBar";
import ServiceCard from "@/components/ServiceCard";
import ProCard from "@/components/ProCard";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const services = [
  { title: "Plumbing", description: "Leak repairs, pipe installation, drain cleaning and full plumbing overhauls.", icon: Droplets, price: "$75", category: "Utility", popular: true, color: "#4a6c8f" },
  { title: "Electrical", description: "Panel upgrades, outlet installs, smart home wiring and safety inspections.", icon: Zap, price: "$90", category: "Utility", popular: false, color: "#d9a441" },
  { title: "HVAC & Cooling", description: "AC installation, furnace repair, duct cleaning and climate control systems.", icon: Wind, price: "$85", category: "Climate", popular: true, color: "#22c55e" },
  { title: "General Repairs", description: "Furniture assembly, appliance installation, handyman tasks of all kinds.", icon: Wrench, price: "$65", category: "General", popular: false, color: "#8b5cf6" },
  { title: "Landscaping", description: "Lawn care, garden design, tree trimming and seasonal yard maintenance.", icon: Leaf, price: "$60", category: "Outdoor", popular: false, color: "#10b981" },
  { title: "Home Security", description: "Camera installation, smart locks, alarm systems and security audits.", icon: Shield, price: "$110", category: "Security", popular: false, color: "#f43f5e" },
  { title: "Painting", description: "Interior and exterior painting, wall prep, color consultation and finishing.", icon: Paintbrush, price: "$80", category: "Aesthetic", popular: true, color: "#f97316" },
  { title: "Gas & Heating", description: "Boiler service, gas line installs, radiator balancing and heating efficiency.", icon: Flame, price: "$95", category: "Utility", popular: false, color: "#ef4444" },
];

const featuredPros = [
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
  },
];

const stats = [
  { icon: Users, value: "48,000+", label: "Verified Professionals" },
  { icon: CheckCircle, value: "1.2M+", label: "Jobs Completed" },
  { icon: Star, value: "4.87", label: "Average Rating" },
  { icon: Clock, value: "< 2 hrs", label: "Average Response" },
];

const revealDelay = (index: number, base = 0.1, max = 0.6) => ({
  transitionDelay: `${Math.min(index * base, max)}s`,
});

export default function Landing() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Utility", "Climate", "General", "Outdoor", "Security", "Aesthetic"];
  const filteredServices = activeCategory === "All" ? services : services.filter(s => s.category === activeCategory);

  // Attach scroll-reveal to the whole page
  useScrollReveal("[data-reveal]", 0.12);

  return (
    <div className="min-h-screen bg-canvas">
      <NavBar />

      {/* ── Hero Section ── CSS entrance animations (no JS needed) */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#10151c" }}>
        {/* Background mesh */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #4a6c8f 0%, transparent 70%)", transform: "translate(20%, -30%)" }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-5" style={{ background: "radial-gradient(circle, #d9a441 0%, transparent 70%)", transform: "translate(-20%, 30%)" }} />
        </div>

        <div className="relative w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-20 py-16 lg:py-24 xl:py-32">
          <div className="flex flex-col lg:flex-row items-center gap-12 xl:gap-20">
            {/* Left: Copy — staggered entrance */}
            <div className="flex-1 max-w-2xl">
              <div className="hero-badge-enter inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{ backgroundColor: "rgba(217,164,65,0.1)", border: "1px solid rgba(217,164,65,0.25)" }}>
                <div className="w-1.5 h-1.5 rounded-full bg-cta animate-pulse" />
                <span className="font-manrope text-xs font-600" style={{ color: "#d9a441" }}>Trusted by 400K+ homeowners nationwide</span>
              </div>

              <h1 className="hero-h1-enter font-sora font-800 text-4xl sm:text-5xl xl:text-6xl leading-tight mb-6" style={{ color: "#e2e8f0" }}>
                Premium Home Services,{" "}
                <span style={{ color: "#d9a441" }}>On Demand.</span>
              </h1>

              <p className="hero-p-enter font-manrope text-base lg:text-lg leading-relaxed mb-8" style={{ color: "#64748b", maxWidth: "520px" }}>
                Swiftly connects you with licensed, background-checked professionals for every home need — from emergency repairs to full renovations. Book, track, and pay in one place.
              </p>

              <div className="hero-btns-enter flex flex-wrap gap-3">
                <Link to="/services">
                  <Button
                    size="lg"
                    className="font-manrope font-700 glow-cta"
                    style={{ backgroundColor: "#d9a441", color: "#10151c", height: "48px", padding: "0 28px" }}
                  >
                    Browse Services
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/booking">
                  <Button
                    variant="outline"
                    size="lg"
                    className="font-manrope font-600"
                    style={{ backgroundColor: "transparent", border: "1px solid rgba(74,108,143,0.4)", color: "#e2e8f0", height: "48px", padding: "0 28px" }}
                  >
                    Book a Pro
                  </Button>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="hero-badges-enter flex flex-wrap items-center gap-4 mt-8">
                {["Licensed & Insured", "Background Checked", "Satisfaction Guaranteed"].map((badge) => (
                  <div key={badge} className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" style={{ color: "#4a6c8f" }} />
                    <span className="font-manrope text-xs" style={{ color: "#64748b" }}>{badge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Hero Visual — slides in from right + floating cards */}
            <div className="hero-visual-enter flex-1 max-w-lg w-full lg:max-w-none xl:max-w-lg">
              <div className="relative">
                {/* Main image card */}
                <div className="rounded-2xl overflow-hidden aspect-[4/3]" style={{ border: "1px solid rgba(74,108,143,0.25)" }}>
                  <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_61add016d1_cc2934c20b339ac6.png" alt="professional home service technician working in modern home interior, high quality photography, dark" />
                </div>

                {/* Floating active job card */}
                <div
                  className="float-card absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 rounded-xl px-4 py-3 w-52"
                  style={{ backgroundColor: "#1e2a38", border: "1px solid rgba(74,108,143,0.3)", boxShadow: "0 16px 40px rgba(0,0,0,0.4)" }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-manrope text-xs" style={{ color: "#22c55e" }}>Live Now</span>
                  </div>
                  <div className="font-sora font-600 text-sm" style={{ color: "#e2e8f0" }}>Marcus W. on-site</div>
                  <div className="font-manrope text-xs mt-0.5" style={{ color: "#64748b" }}>Electrical · ETA 8 min</div>
                </div>

                {/* Floating rating card */}
                <div
                  className="float-card-delayed absolute -top-4 -right-4 sm:-top-6 sm:-right-6 rounded-xl px-4 py-3"
                  style={{ backgroundColor: "#1e2a38", border: "1px solid rgba(217,164,65,0.25)", boxShadow: "0 16px 40px rgba(0,0,0,0.4)" }}
                >
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4" style={{ color: "#d9a441", fill: "#d9a441" }} />
                    <span className="font-sora font-700 text-base" style={{ color: "#d9a441" }}>4.9</span>
                  </div>
                  <div className="font-manrope text-xs" style={{ color: "#64748b" }}>284 reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar — staggered counter-up on scroll */}
      <div style={{ backgroundColor: "#1e2a38", borderTop: "1px solid rgba(74,108,143,0.2)", borderBottom: "1px solid rgba(74,108,143,0.2)" }}>
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-20 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(({ icon: Icon, value, label }, i) => (
              <div
                key={label}
                data-reveal
                className="animate-fade-up flex items-center gap-3"
                style={revealDelay(i + 1)}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(74,108,143,0.15)" }}>
                  <Icon className="w-5 h-5" style={{ color: "#4a6c8f" }} />
                </div>
                <div>
                  <div className="font-sora font-700 text-xl" style={{ color: "#e2e8f0" }}>{value}</div>
                  <div className="font-manrope text-xs" style={{ color: "#64748b" }}>{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Service Category Matrix ── */}
      <section id="services" className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-20 py-16 xl:py-24">
        {/* Section header */}
        <div
          data-reveal
          className="animate-fade-up flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
        >
          <div>
            <div className="font-manrope text-xs uppercase tracking-widest mb-2" style={{ color: "#4a6c8f" }}>Service Categories</div>
            <h2 className="font-sora font-700 text-3xl xl:text-4xl" style={{ color: "#e2e8f0" }}>
              Everything Your Home Needs
            </h2>
          </div>
          <Link to="/services">
            <Button variant="ghost" className="font-manrope font-600" style={{ color: "#d9a441" }}>
              View all services <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>

        {/* Category Filter — fade in */}
        <div data-reveal className="animate-fade-in flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-1.5 rounded-full font-manrope text-sm font-500 transition-all"
              style={{
                backgroundColor: activeCategory === cat ? "#4a6c8f" : "rgba(74,108,143,0.1)",
                color: activeCategory === cat ? "#fff" : "#94a3b8",
                border: `1px solid ${activeCategory === cat ? "#4a6c8f" : "rgba(74,108,143,0.2)"}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid — staggered scale-in */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredServices.map((service, i) => (
            <div
              key={service.title}
              data-reveal
              className="animate-scale-in"
              style={revealDelay(i + 1, 0.08, 0.5)}
            >
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Professionals ── */}
      <section style={{ backgroundColor: "#1e2a38", borderTop: "1px solid rgba(74,108,143,0.15)" }}>
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-20 py-16 xl:py-24">
          {/* Header */}
          <div
            data-reveal
            className="animate-slide-left flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
          >
            <div>
              <div className="font-manrope text-xs uppercase tracking-widest mb-2" style={{ color: "#4a6c8f" }}>Top Professionals</div>
              <h2 className="font-sora font-700 text-3xl xl:text-4xl" style={{ color: "#e2e8f0" }}>
                Trusted in Your Area
              </h2>
            </div>
            <Link to="/services">
              <Button variant="ghost" className="font-manrope font-600" style={{ color: "#d9a441" }}>
                See all pros <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          {/* Pro cards — staggered fade-up */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {featuredPros.map((pro, i) => (
              <div
                key={pro.name}
                data-reveal
                className="animate-fade-up"
                style={revealDelay(i + 1, 0.15, 0.7)}
              >
                <ProCard {...pro} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-20 py-16 xl:py-24">
        <div data-reveal className="animate-fade-up text-center mb-12">
          <div className="font-manrope text-xs uppercase tracking-widest mb-2" style={{ color: "#4a6c8f" }}>Process</div>
          <h2 className="font-sora font-700 text-3xl xl:text-4xl" style={{ color: "#e2e8f0" }}>
            From Search to Done in Minutes
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: "01", title: "Choose a Service", desc: "Browse 80+ professional services organized by category.", icon: "🔍" },
            { step: "02", title: "Pick Your Pro", desc: "Compare verified ratings, specialties, and live availability.", icon: "👤" },
            { step: "03", title: "Book Instantly", desc: "Set a date, time, and address. Confirm in under 2 minutes.", icon: "📅" },
            { step: "04", title: "Track Live", desc: "Follow your pro's real-time location and get status updates.", icon: "📍" },
          ].map(({ step, title, desc, icon }, i) => (
            <div
              key={step}
              data-reveal
              className="animate-fade-up relative"
              style={revealDelay(i + 1, 0.12, 0.6)}
            >
              <div
                className="swiftly-card p-6 h-full"
                style={{ position: "relative", overflow: "hidden" }}
              >
                <div
                  className="absolute top-4 right-4 font-sora font-800 text-5xl opacity-5"
                  style={{ color: "#4a6c8f" }}
                >
                  {step}
                </div>
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-sora font-600 text-base mb-2" style={{ color: "#e2e8f0" }}>{title}</h3>
                <p className="font-manrope text-sm leading-relaxed" style={{ color: "#64748b" }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner — scale-in on scroll */}
      <section id="cta-banner" className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-20 pb-16">
        <div
          data-reveal
          className="animate-scale-in rounded-2xl p-8 lg:p-12 text-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #1e2a38 0%, #162030 100%)", border: "1px solid rgba(74,108,143,0.3)" }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-10" style={{ background: "radial-gradient(ellipse, #d9a441 0%, transparent 70%)" }} />
          </div>
          <div className="relative">
            <h2
              data-reveal
              className="animate-fade-up font-sora font-700 text-3xl xl:text-4xl mb-4"
              style={{ color: "#e2e8f0" }}
            >
              Your First Booking is{" "}
              <span style={{ color: "#d9a441" }}>On Us</span>
            </h2>
            <p
              data-reveal
              className="animate-fade-up delay-200 font-manrope text-base mb-8"
              style={{ color: "#64748b", maxWidth: "500px", margin: "0 auto 2rem" }}
            >
              Get $30 off your first service booking. No code needed — discount applies automatically at checkout.
            </p>
            <div data-reveal className="animate-fade-up delay-300">
              <Link to="/booking">
                <Button
                  size="lg"
                  className="font-manrope font-700 glow-cta"
                  style={{ backgroundColor: "#d9a441", color: "#10151c", height: "52px", padding: "0 36px", fontSize: "16px" }}
                >
                  Book Your First Service
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ backgroundColor: "#1e2a38", borderTop: "1px solid rgba(74,108,143,0.2)" }}>
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-20 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div data-reveal className="animate-fade-up" style={revealDelay(1)}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#d9a441" }}>
                  <Zap className="w-4 h-4" style={{ color: "#10151c" }} />
                </div>
                <span className="font-sora font-700 text-lg" style={{ color: "#e2e8f0" }}>Swiftly</span>
              </div>
              <p className="font-manrope text-sm leading-relaxed" style={{ color: "#64748b" }}>
                Premium home services, verified professionals, and on-demand convenience for every room in your home.
              </p>
            </div>
            {[
              {
                title: "Services",
                links: [
                  { label: "Plumbing", href: "/services" },
                  { label: "Electrical", href: "/services" },
                  { label: "HVAC", href: "/services" },
                  { label: "Landscaping", href: "/services" },
                ],
              },
              {
                title: "Platform",
                links: [
                  { label: "How It Works", href: "#how-it-works" },
                  { label: "Pricing", href: "#cta-banner" },
                  { label: "Book a Pro", href: "/booking" },
                  { label: "Dashboard", href: "/dashboard" },
                ],
              },
              {
                title: "Support",
                links: [
                  { label: "Help Center", href: "mailto:support@swiftly.com" },
                  { label: "Safety", href: "mailto:safety@swiftly.com" },
                  { label: "Terms", href: "mailto:legal@swiftly.com" },
                  { label: "Privacy", href: "mailto:privacy@swiftly.com" },
                ],
              },
            ].map(({ title, links }, i) => (
              <div key={title} data-reveal className="animate-fade-up" style={revealDelay(i + 2)}>
                <h4 className="font-sora font-600 text-sm mb-4" style={{ color: "#e2e8f0" }}>{title}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="font-manrope text-sm hover:text-white transition-colors" style={{ color: "#64748b" }}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: "rgba(74,108,143,0.2)" }}>
            <p className="font-manrope text-xs" style={{ color: "#64748b" }}>
              © 2026 Swiftly Inc. All rights reserved.
            </p>
            <div className="flex gap-4">
              {[
                { label: "Privacy", href: "mailto:privacy@swiftly.com" },
                { label: "Terms", href: "mailto:legal@swiftly.com" },
                { label: "Cookies", href: "mailto:support@swiftly.com" },
              ].map((item) => (
                <a key={item.label} href={item.href} className="font-manrope text-xs hover:text-white transition-colors" style={{ color: "#64748b" }}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}