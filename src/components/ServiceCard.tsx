import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  price: string;
  category: string;
  popular?: boolean;
  color?: string;
}

export default function ServiceCard({ title, description, icon: Icon, price, category, popular, color = "#4a6c8f" }: ServiceCardProps) {
  return (
    <Link to="/booking">
      <div
        className="service-card-hover cursor-pointer group relative overflow-hidden"
        style={{
          backgroundColor: "#1e2a38",
          border: "1px solid rgba(74,108,143,0.2)",
          borderRadius: "14px",
          padding: "24px",
        }}
      >
        {popular && (
          <div
            className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-manrope font-700 uppercase tracking-wide"
            style={{ backgroundColor: "rgba(217,164,65,0.15)", color: "#d9a441", border: "1px solid rgba(217,164,65,0.3)" }}
          >
            Popular
          </div>
        )}
        {/* Icon Container */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
          style={{ backgroundColor: `${color}20`, border: `1px solid ${color}40` }}
        >
          <Icon className="w-7 h-7" style={{ color }} />
        </div>

        <h3 className="font-sora font-600 text-base mb-1.5" style={{ color: "#e2e8f0" }}>{title}</h3>
        <p className="font-manrope text-sm leading-relaxed mb-4" style={{ color: "#64748b" }}>{description}</p>

        <div className="flex items-center justify-between">
          <div>
            <span className="font-manrope text-xs uppercase tracking-wider" style={{ color: "#4a6c8f" }}>Starting at</span>
            <div className="font-sora font-700 text-lg" style={{ color: "#d9a441" }}>{price}</div>
          </div>
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0"
            style={{ backgroundColor: "#d9a441" }}
          >
            <ArrowRight className="w-4 h-4" style={{ color: "#10151c" }} />
          </div>
        </div>

        {/* Bottom border accent on hover */}
        <div
          className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300"
          style={{ backgroundColor: "#d9a441" }}
        />
      </div>
    </Link>
  );
}