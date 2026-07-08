import { useState, useEffect } from "react";
import { MapPin, Navigation, Clock, Zap } from "lucide-react";

interface LiveStatusMapProps {
  technicianName: string;
  eta: string;
  status: "en-route" | "on-site" | "completed";
  serviceType: string;
}

export default function LiveStatusMap({ technicianName, eta, status, serviceType }: LiveStatusMapProps) {
  const [techPos, setTechPos] = useState({ x: 30, y: 60 });
  const destPos = { x: 65, y: 42 };

  useEffect(() => {
    if (status !== "en-route") return;
    const interval = setInterval(() => {
      setTechPos((prev) => ({
        x: prev.x + (destPos.x - prev.x) * 0.03,
        y: prev.y + (destPos.y - prev.y) * 0.03,
      }));
    }, 800);
    return () => clearInterval(interval);
  }, [status]);

  const statusConfig = {
    "en-route": { label: "En Route", color: "#d9a441", pulse: true },
    "on-site": { label: "On-Site", color: "#22c55e", pulse: true },
    "completed": { label: "Completed", color: "#4a6c8f", pulse: false },
  };

  const cfg = statusConfig[status];

  return (
    <div className="rounded-xl overflow-hidden" style={{ backgroundColor: "#0d1a26", border: "1px solid rgba(74,108,143,0.25)" }}>
      {/* Map Area */}
      <div className="relative" style={{ height: "180px" }}>
        {/* Grid background */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="map-grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(74,108,143,0.08)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#map-grid)" />
          
          {/* Road lines */}
          <line x1="10%" y1="35%" x2="90%" y2="35%" stroke="rgba(74,108,143,0.2)" strokeWidth="2" />
          <line x1="10%" y1="65%" x2="90%" y2="65%" stroke="rgba(74,108,143,0.15)" strokeWidth="1.5" />
          <line x1="35%" y1="10%" x2="35%" y2="90%" stroke="rgba(74,108,143,0.2)" strokeWidth="2" />
          <line x1="65%" y1="10%" x2="65%" y2="90%" stroke="rgba(74,108,143,0.15)" strokeWidth="1.5" />
          
          {/* Route path */}
          <path
            d={`M ${techPos.x}% ${techPos.y}% Q 48% 35% ${destPos.x}% ${destPos.y}%`}
            fill="none"
            stroke={cfg.color}
            strokeWidth="2"
            strokeDasharray="6 4"
            opacity="0.6"
          />

          {/* Destination pin */}
          <circle cx={`${destPos.x}%`} cy={`${destPos.y}%`} r="10" fill="rgba(217,164,65,0.12)" stroke="#d9a441" strokeWidth="1.5" />
          <circle cx={`${destPos.x}%`} cy={`${destPos.y}%`} r="4" fill="#d9a441" />
          
          {/* Technician marker */}
          <circle cx={`${techPos.x}%`} cy={`${techPos.y}%`} r="12" fill="rgba(74,108,143,0.15)" stroke={cfg.color} strokeWidth="1.5" />
          <circle cx={`${techPos.x}%`} cy={`${techPos.y}%`} r="5" fill={cfg.color} />
          
          {/* Pulse animation for active status */}
          {cfg.pulse && (
            <>
              <circle cx={`${techPos.x}%`} cy={`${techPos.y}%`} r="14" fill="none" stroke={cfg.color} strokeWidth="1" opacity="0.4">
                <animate attributeName="r" from="12" to="22" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite" />
              </circle>
            </>
          )}
        </svg>

        {/* Map overlays */}
        <div className="absolute top-2 left-2">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg" style={{ backgroundColor: "rgba(16,21,28,0.9)", border: "1px solid rgba(74,108,143,0.3)" }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.color }} />
            <span className="font-manrope text-xs font-600" style={{ color: cfg.color }}>{cfg.label}</span>
          </div>
        </div>

        <div className="absolute top-2 right-2">
          <div className="px-2 py-1 rounded-lg" style={{ backgroundColor: "rgba(16,21,28,0.9)", border: "1px solid rgba(74,108,143,0.3)" }}>
            <span className="font-manrope text-xs" style={{ color: "#94a3b8" }}>Live</span>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="px-4 py-3 flex items-center justify-between" style={{ backgroundColor: "#0d1a26", borderTop: "1px solid rgba(74,108,143,0.15)" }}>
        <div className="flex items-center gap-2.5">
          <img
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg"
            alt={technicianName}
            className="w-8 h-8 rounded-full object-cover"
            style={{ border: "2px solid rgba(74,108,143,0.4)" }}
          />
          <div>
            <div className="font-manrope text-xs font-600" style={{ color: "#e2e8f0" }}>{technicianName}</div>
            <div className="font-manrope text-xs" style={{ color: "#64748b" }}>{serviceType}</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" style={{ color: "#d9a441" }} />
          <div className="text-right">
            <div className="font-sora font-700 text-sm" style={{ color: "#d9a441" }}>ETA {eta}</div>
          </div>
        </div>
      </div>
    </div>
  );
}