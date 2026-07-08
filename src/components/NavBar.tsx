import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Search, Bell, User, Menu, X, ChevronDown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const locations = [
  "San Francisco, CA",
  "Los Angeles, CA",
  "New York, NY",
  "Chicago, IL",
  "Austin, TX",
  "Seattle, WA",
];

export default function NavBar() {
  const [location, setLocation] = useState("San Francisco, CA");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/services?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full" style={{ backgroundColor: "#10151c", borderBottom: "1px solid rgba(74,108,143,0.2)" }}>
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-3 lg:gap-6 h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#d9a441" }}>
              <Zap className="w-4 h-4" style={{ color: "#10151c" }} strokeWidth={2.5} />
            </div>
            <span className="font-sora font-700 text-lg tracking-tight hidden sm:block" style={{ color: "#e2e8f0" }}>
              Swiftly
            </span>
          </Link>

          {/* Location Picker */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-manrope transition-colors hover:bg-white/5 shrink-0" style={{ color: "#94a3b8", border: "1px solid rgba(74,108,143,0.25)" }}>
                <MapPin className="w-3.5 h-3.5" style={{ color: "#d9a441" }} />
                <span className="max-w-[140px] truncate" style={{ color: "#e2e8f0" }}>{location}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-52" style={{ backgroundColor: "#1e2a38", border: "1px solid rgba(74,108,143,0.3)" }}>
              {locations.map((loc) => (
                <DropdownMenuItem
                  key={loc}
                  onClick={() => setLocation(loc)}
                  className="cursor-pointer font-manrope text-sm"
                  style={{ color: location === loc ? "#d9a441" : "#e2e8f0" }}
                >
                  <MapPin className="w-3.5 h-3.5 mr-2" style={{ color: "#4a6c8f" }} />
                  {loc}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-[600px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#4a6c8f" }} />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services — cleaning, plumbing, electrical..."
                className="pl-10 pr-4 h-10 w-full font-manrope text-sm"
                style={{
                  backgroundColor: "#1e2a38",
                  border: "1px solid rgba(74,108,143,0.3)",
                  color: "#e2e8f0",
                  outline: "none",
                }}
              />
            </div>
          </form>

          {/* Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            <Link to="/services">
              <button className="px-3 py-2 rounded-lg text-sm font-manrope transition-colors hover:bg-white/5" style={{ color: "#94a3b8" }}>
                Services
              </button>
            </Link>
            <Link to="/booking">
              <button className="px-3 py-2 rounded-lg text-sm font-manrope transition-colors hover:bg-white/5" style={{ color: "#94a3b8" }}>
                Book Now
              </button>
            </Link>
            <Link to="/dashboard">
              <button className="px-3 py-2 rounded-lg text-sm font-manrope transition-colors hover:bg-white/5" style={{ color: "#94a3b8" }}>
                Dashboard
              </button>
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 ml-auto shrink-0">
            <button className="relative p-2 rounded-lg transition-colors hover:bg-white/5 hidden sm:flex">
              <Bell className="w-4 h-4" style={{ color: "#94a3b8" }} />
              <Badge className="absolute -top-0.5 -right-0.5 w-4 h-4 p-0 flex items-center justify-center text-[10px] font-manrope" style={{ backgroundColor: "#d9a441", color: "#10151c" }}>
                2
              </Badge>
            </button>
            <Link to="/dashboard">
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-white/5">
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg"
                  alt="User"
                  className="w-7 h-7 rounded-full object-cover"
                  style={{ border: "2px solid rgba(74,108,143,0.5)" }}
                />
                <span className="text-sm font-manrope hidden lg:block" style={{ color: "#e2e8f0" }}>Alex M.</span>
              </button>
            </Link>
            <Link to="/booking">
              <Button size="sm" className="font-manrope font-600 text-sm hidden lg:flex glow-cta" style={{ backgroundColor: "#d9a441", color: "#10151c" }}>
                Book a Pro
              </Button>
            </Link>
            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" style={{ color: "#e2e8f0" }} /> : <Menu className="w-5 h-5" style={{ color: "#e2e8f0" }} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t" style={{ borderColor: "rgba(74,108,143,0.2)" }}>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: "#1e2a38" }}>
                <MapPin className="w-4 h-4" style={{ color: "#d9a441" }} />
                <span className="text-sm font-manrope" style={{ color: "#e2e8f0" }}>{location}</span>
              </div>
              <Link to="/services" onClick={() => setMobileMenuOpen(false)}>
                <div className="px-3 py-2 rounded-lg text-sm font-manrope" style={{ color: "#94a3b8" }}>Services</div>
              </Link>
              <Link to="/booking" onClick={() => setMobileMenuOpen(false)}>
                <div className="px-3 py-2 rounded-lg text-sm font-manrope" style={{ color: "#94a3b8" }}>Book Now</div>
              </Link>
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <div className="px-3 py-2 rounded-lg text-sm font-manrope" style={{ color: "#94a3b8" }}>Dashboard</div>
              </Link>
              <Link to="/booking" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full font-manrope font-600 mt-2" style={{ backgroundColor: "#d9a441", color: "#10151c" }}>
                  Book a Pro
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}