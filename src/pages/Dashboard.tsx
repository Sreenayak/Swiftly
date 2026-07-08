import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Clock, CheckCircle, Star, ChevronRight, Bell, Settings,
  TrendingUp, DollarSign, Calendar, MapPin, Phone, MessageSquare,
  MoreHorizontal, ArrowUpRight, Zap, User, Home, Wrench
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import NavBar from "@/components/NavBar";
import LiveStatusMap from "@/components/LiveStatusMap";

const inProgressJobs = [
  {
    id: 1,
    service: "Electrical Panel Upgrade",
    pro: { name: "Marcus Webb", avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg", specialty: "Master Electrician", rating: 4.9 },
    status: "en-route" as const,
    eta: "12 min",
    address: "1427 Valencia St, SF",
    scheduledTime: "2:00 PM Today",
    total: "$230",
    progress: 25,
    phase: "En Route",
  },
  {
    id: 2,
    service: "Bathroom Plumbing Fix",
    pro: { name: "Priya Sharma", avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg", specialty: "Licensed Plumber", rating: 4.8 },
    status: "on-site" as const,
    eta: "45 min",
    address: "1427 Valencia St, SF",
    scheduledTime: "10:00 AM Today",
    total: "$155",
    progress: 65,
    phase: "Working On-Site",
  },
];

const pastJobs = [
  {
    id: 101,
    service: "HVAC Annual Tune-Up",
    pro: { name: "Derek Nguyen", avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg", specialty: "HVAC Tech" },
    completedDate: "Jun 10, 2025",
    total: "$175",
    rating: 5,
    status: "completed",
    canRebook: true,
  },
  {
    id: 102,
    service: "Interior Painting — Living Room",
    pro: { name: "Carmen Reyes", avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg", specialty: "Painter" },
    completedDate: "May 28, 2025",
    total: "$420",
    rating: 5,
    status: "completed",
    canRebook: true,
  },
  {
    id: 103,
    service: "Roof Inspection & Sealing",
    pro: { name: "James Okafor", avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg", specialty: "General Contractor" },
    completedDate: "May 15, 2025",
    total: "$290",
    rating: 4,
    status: "completed",
    canRebook: false,
  },
  {
    id: 104,
    service: "Garden Redesign & Planting",
    pro: { name: "Sofia Tanaka", avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg", specialty: "Landscaper" },
    completedDate: "Apr 22, 2025",
    total: "$340",
    rating: 5,
    status: "completed",
    canRebook: true,
  },
  {
    id: 105,
    service: "Dishwasher Installation",
    pro: { name: "Marcus Webb", avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg", specialty: "Master Electrician" },
    completedDate: "Apr 8, 2025",
    total: "$120",
    rating: 5,
    status: "completed",
    canRebook: true,
  },
];

const upcomingJobs = [
  {
    id: 201,
    service: "Window Cleaning",
    pro: { name: "Carlos Rivera", avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" },
    date: "Tomorrow, Jun 17",
    time: "9:00 AM",
    total: "$95",
  },
];

const statusConfig = {
  "en-route": { label: "En Route", color: "#d9a441", bg: "rgba(217,164,65,0.1)", border: "rgba(217,164,65,0.3)" },
  "on-site": { label: "On-Site", color: "#22c55e", bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.3)" },
  "completed": { label: "Completed", color: "#4a6c8f", bg: "rgba(74,108,143,0.1)", border: "rgba(74,108,143,0.3)" },
};

export default function Dashboard() {
  const [activeJobId, setActiveJobId] = useState<number>(1);
  const activeJob = inProgressJobs.find(j => j.id === activeJobId) ?? inProgressJobs[0];

  return (
    <div className="min-h-screen bg-canvas">
      <NavBar />

      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-20 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="font-manrope text-xs uppercase tracking-widest mb-1" style={{ color: "#4a6c8f" }}>My Hub</div>
            <h1 className="font-sora font-700 text-2xl xl:text-3xl" style={{ color: "#e2e8f0" }}>
              Good afternoon, Alex 👋
            </h1>
            <p className="font-manrope text-sm mt-1" style={{ color: "#64748b" }}>
              You have {inProgressJobs.length} active services and {upcomingJobs.length} upcoming.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2.5 rounded-lg relative" style={{ backgroundColor: "#1e2a38", border: "1px solid rgba(74,108,143,0.2)" }}>
              <Bell className="w-4 h-4" style={{ color: "#94a3b8" }} />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: "#d9a441" }} />
            </button>
            <button className="p-2.5 rounded-lg" style={{ backgroundColor: "#1e2a38", border: "1px solid rgba(74,108,143,0.2)" }}>
              <Settings className="w-4 h-4" style={{ color: "#94a3b8" }} />
            </button>
            <Link to="/booking">
              <Button className="font-manrope font-600 glow-cta" style={{ backgroundColor: "#d9a441", color: "#10151c" }}>
                + Book a Service
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Home, label: "Services Booked", value: "24", change: "+3 this month", positive: true },
            { icon: DollarSign, label: "Total Spent", value: "$2,840", change: "+$420 this month", positive: false },
            { icon: Star, label: "Avg. Rating Given", value: "4.8 ★", change: "Across 21 reviews", positive: true },
            { icon: Clock, label: "Hours Saved", value: "186 hrs", change: "vs DIY estimate", positive: true },
          ].map(({ icon: Icon, label, value, change, positive }) => (
            <div key={label} className="swiftly-card p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(74,108,143,0.12)" }}>
                  <Icon className="w-4 h-4" style={{ color: "#4a6c8f" }} />
                </div>
                <ArrowUpRight className="w-4 h-4" style={{ color: positive ? "#22c55e" : "#64748b" }} />
              </div>
              <div className="font-sora font-700 text-2xl mb-0.5" style={{ color: "#e2e8f0" }}>{value}</div>
              <div className="font-manrope text-xs" style={{ color: "#64748b" }}>{label}</div>
              <div className="font-manrope text-[10px] mt-1" style={{ color: positive ? "#22c55e" : "#64748b" }}>{change}</div>
            </div>
          ))}
        </div>

        {/* Main Content: Kanban Layout */}
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Left Column: In Progress */}
          <div className="flex-1 min-w-0">
            {/* In Progress Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <h2 className="font-sora font-600 text-base" style={{ color: "#e2e8f0" }}>In Progress</h2>
                <Badge className="font-manrope text-xs" style={{ backgroundColor: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.25)" }}>
                  {inProgressJobs.length} Active
                </Badge>
              </div>
            </div>

            {/* Job Cards — In Progress */}
            <div className="space-y-4 mb-6">
              {inProgressJobs.map((job) => {
                const cfg = statusConfig[job.status];
                const isActive = activeJobId === job.id;

                return (
                  <div
                    key={job.id}
                    onClick={() => setActiveJobId(job.id)}
                    className="swiftly-card swiftly-card-hover cursor-pointer p-5"
                    style={{
                      borderColor: isActive ? "rgba(74,108,143,0.5)" : "rgba(74,108,143,0.2)",
                      boxShadow: isActive ? "0 0 0 1px rgba(74,108,143,0.3), 0 8px 24px rgba(74,108,143,0.1)" : "none",
                    }}
                  >
                    {/* Top Row */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <img src={job.pro.avatar} alt={job.pro.name} className="w-10 h-10 rounded-xl object-cover" style={{ border: "2px solid rgba(74,108,143,0.35)" }} />
                        <div>
                          <div className="font-sora font-600 text-sm" style={{ color: "#e2e8f0" }}>{job.service}</div>
                          <div className="font-manrope text-xs mt-0.5" style={{ color: "#64748b" }}>{job.pro.name} · {job.pro.specialty}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="px-2.5 py-1 rounded-full font-manrope text-xs font-600" style={{ backgroundColor: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
                          {cfg.label}
                        </div>
                        <button><MoreHorizontal className="w-4 h-4" style={{ color: "#64748b" }} /></button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="font-manrope text-xs" style={{ color: "#64748b" }}>{job.phase}</span>
                        <span className="font-manrope text-xs font-600" style={{ color: "#e2e8f0" }}>{job.progress}%</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(74,108,143,0.15)" }}>
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${job.progress}%`, backgroundColor: job.status === "on-site" ? "#22c55e" : "#d9a441" }}
                        />
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 shrink-0" style={{ color: "#4a6c8f" }} />
                        <div>
                          <div className="font-manrope text-[10px]" style={{ color: "#64748b" }}>ETA</div>
                          <div className="font-manrope text-xs font-600" style={{ color: "#d9a441" }}>{job.eta}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: "#4a6c8f" }} />
                        <div>
                          <div className="font-manrope text-[10px]" style={{ color: "#64748b" }}>Location</div>
                          <div className="font-manrope text-xs font-600 truncate" style={{ color: "#e2e8f0" }}>{job.address}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 shrink-0" style={{ color: "#4a6c8f" }} />
                        <div>
                          <div className="font-manrope text-[10px]" style={{ color: "#64748b" }}>Total</div>
                          <div className="font-sora font-700 text-sm" style={{ color: "#d9a441" }}>{job.total}</div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4 pt-4" style={{ borderTop: "1px solid rgba(74,108,143,0.1)" }}>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-manrope text-xs transition-colors hover:bg-white/5" style={{ color: "#94a3b8", border: "1px solid rgba(74,108,143,0.2)" }}>
                        <Phone className="w-3 h-3" />
                        Call
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-manrope text-xs transition-colors hover:bg-white/5" style={{ color: "#94a3b8", border: "1px solid rgba(74,108,143,0.2)" }}>
                        <MessageSquare className="w-3 h-3" />
                        Message
                      </button>
                      <div className="ml-auto font-manrope text-xs self-center" style={{ color: "#64748b" }}>
                        {job.scheduledTime}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Upcoming */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" style={{ color: "#4a6c8f" }} />
                <h2 className="font-sora font-600 text-base" style={{ color: "#e2e8f0" }}>Upcoming</h2>
              </div>
            </div>
            <div className="space-y-3">
              {upcomingJobs.map((job) => (
                <div key={job.id} className="swiftly-card p-4">
                  <div className="flex items-center gap-3">
                    <img src={job.pro.avatar} alt={job.pro.name} className="w-9 h-9 rounded-xl object-cover" style={{ border: "2px solid rgba(74,108,143,0.3)" }} />
                    <div className="flex-1">
                      <div className="font-sora font-600 text-sm" style={{ color: "#e2e8f0" }}>{job.service}</div>
                      <div className="font-manrope text-xs mt-0.5" style={{ color: "#64748b" }}>{job.date} at {job.time}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-sora font-700 text-sm" style={{ color: "#d9a441" }}>{job.total}</div>
                      <button className="font-manrope text-xs" style={{ color: "#4a6c8f" }}>Manage</button>
                    </div>
                  </div>
                </div>
              ))}
              <Link to="/booking">
                <div
                  className="flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed font-manrope text-sm transition-colors cursor-pointer hover:bg-white/3"
                  style={{ borderColor: "rgba(74,108,143,0.25)", color: "#64748b" }}
                >
                  <span>+ Schedule a new service</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Center Column: Live Map */}
          <div className="w-full xl:w-80 shrink-0">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-sora font-600 text-base" style={{ color: "#e2e8f0" }}>Live Tracking</h2>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-manrope text-xs" style={{ color: "#22c55e" }}>Live</span>
                </div>
              </div>
              <LiveStatusMap
                technicianName={activeJob.pro.name}
                eta={activeJob.eta}
                status={activeJob.status}
                serviceType={activeJob.service}
              />

              {/* Switch job */}
              <div className="mt-3 flex gap-2">
                {inProgressJobs.map((job) => (
                  <button
                    key={job.id}
                    onClick={() => setActiveJobId(job.id)}
                    className="flex-1 py-2 px-3 rounded-lg font-manrope text-xs font-500 transition-all"
                    style={{
                      backgroundColor: activeJobId === job.id ? "rgba(74,108,143,0.2)" : "rgba(74,108,143,0.06)",
                      border: `1px solid ${activeJobId === job.id ? "rgba(74,108,143,0.5)" : "rgba(74,108,143,0.2)"}`,
                      color: activeJobId === job.id ? "#e2e8f0" : "#64748b",
                    }}
                  >
                    {job.pro.name.split(" ")[0]}
                  </button>
                ))}
              </div>

              {/* Quick Links */}
              <div className="swiftly-card p-4 mt-4">
                <div className="font-sora font-500 text-xs uppercase tracking-wider mb-3" style={{ color: "#64748b" }}>Quick Actions</div>
                <div className="space-y-2">
                  {[
                    { icon: Wrench, label: "Book a Service", to: "/booking" },
                    { icon: User, label: "Browse Professionals", to: "/services" },
                    { icon: Home, label: "Explore Services", to: "/" },
                  ].map(({ icon: Icon, label, to }) => (
                    <Link key={label} to={to}>
                      <div className="flex items-center justify-between p-2.5 rounded-lg transition-colors hover:bg-white/5 cursor-pointer">
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4" style={{ color: "#4a6c8f" }} />
                          <span className="font-manrope text-sm" style={{ color: "#94a3b8" }}>{label}</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5" style={{ color: "#4a6c8f" }} />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: History */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" style={{ color: "#4a6c8f" }} />
                <h2 className="font-sora font-600 text-base" style={{ color: "#e2e8f0" }}>Past History</h2>
                <Badge className="font-manrope text-xs" style={{ backgroundColor: "rgba(74,108,143,0.1)", color: "#4a6c8f", border: "1px solid rgba(74,108,143,0.25)" }}>
                  {pastJobs.length} Jobs
                </Badge>
              </div>
              <button className="font-manrope text-xs" style={{ color: "#4a6c8f" }}>View All</button>
            </div>

            <div className="space-y-3">
              {pastJobs.map((job) => (
                <div key={job.id} className="swiftly-card p-4">
                  <div className="flex items-start gap-3">
                    <img
                      src={job.pro.avatar}
                      alt={job.pro.name}
                      className="w-10 h-10 rounded-xl object-cover shrink-0"
                      style={{ border: "2px solid rgba(74,108,143,0.25)", filter: "grayscale(20%)" }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-sora font-600 text-sm" style={{ color: "#e2e8f0" }}>{job.service}</div>
                          <div className="font-manrope text-xs mt-0.5" style={{ color: "#64748b" }}>{job.pro.name} · {job.completedDate}</div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="font-sora font-700 text-sm" style={{ color: "#e2e8f0" }}>{job.total}</div>
                        </div>
                      </div>

                      {/* Rating Display */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3"
                              style={{
                                color: i < job.rating ? "#d9a441" : "rgba(217,164,65,0.2)",
                                fill: i < job.rating ? "#d9a441" : "transparent",
                              }}
                            />
                          ))}
                        </div>
                        {job.canRebook && (
                          <Link to="/booking">
                            <button
                              className="flex items-center gap-1 px-2.5 py-1 rounded-lg font-manrope text-xs font-600 transition-all hover:opacity-90"
                              style={{ backgroundColor: "rgba(74,108,143,0.12)", color: "#4a6c8f", border: "1px solid rgba(74,108,143,0.25)" }}
                            >
                              Rebook
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Spending Summary */}
            <div className="swiftly-card p-5 mt-5">
              <div className="font-sora font-500 text-xs uppercase tracking-wider mb-4" style={{ color: "#64748b" }}>Spending This Year</div>
              <div className="flex items-end justify-between gap-1 h-20">
                {[
                  { month: "Jan", amount: 120 }, { month: "Feb", amount: 0 }, { month: "Mar", amount: 290 },
                  { month: "Apr", amount: 340 }, { month: "May", amount: 710 }, { month: "Jun", amount: 575 },
                ].map(({ month, amount }) => (
                  <div key={month} className="flex flex-col items-center gap-1.5 flex-1">
                    <div
                      className="w-full rounded-t-sm transition-all"
                      style={{
                        height: `${(amount / 710) * 64}px`,
                        backgroundColor: month === "Jun" ? "#d9a441" : "rgba(74,108,143,0.3)",
                        minHeight: amount > 0 ? "4px" : "0",
                      }}
                    />
                    <div className="font-manrope text-[9px] uppercase" style={{ color: "#64748b" }}>{month}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: "1px solid rgba(74,108,143,0.15)" }}>
                <span className="font-manrope text-xs" style={{ color: "#64748b" }}>YTD Total</span>
                <span className="font-sora font-700 text-base" style={{ color: "#d9a441" }}>$2,840</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}