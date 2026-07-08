import { Star, MapPin, CheckCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ProCardProps {
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  location: string;
  distance: string;
  availability: string;
  avatar: string;
  verified: boolean;
  jobsCompleted: number;
  hourlyRate: string;
  tags: string[];
  compact?: boolean;
}

export default function ProCard({
  name, specialty, rating, reviews, location, distance,
  availability, avatar, verified, jobsCompleted, hourlyRate, tags, compact = false
}: ProCardProps) {
  return (
    <div
      className="swiftly-card swiftly-card-hover"
      style={{ padding: compact ? "16px" : "20px" }}
    >
      <div className="flex items-start gap-3">
        <div className="relative shrink-0">
          <img
            src={avatar}
            alt={name}
            className={`rounded-xl object-cover ${compact ? "w-10 h-10" : "w-14 h-14"}`}
            style={{ border: "2px solid rgba(74,108,143,0.4)" }}
          />
          {verified && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: "#10151c" }}>
              <CheckCircle className="w-4 h-4" style={{ color: "#4a6c8f" }} />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className={`font-sora font-600 ${compact ? "text-sm" : "text-base"}`} style={{ color: "#e2e8f0" }}>{name}</h4>
              <p className="font-manrope text-xs mt-0.5" style={{ color: "#4a6c8f" }}>{specialty}</p>
            </div>
            {!compact && (
              <div className="text-right shrink-0">
                <div className="font-sora font-700 text-base" style={{ color: "#d9a441" }}>{hourlyRate}</div>
                <div className="font-manrope text-xs" style={{ color: "#64748b" }}>/hr</div>
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3 h-3"
                  style={{ color: i < Math.floor(rating) ? "#d9a441" : "rgba(217,164,65,0.25)", fill: i < Math.floor(rating) ? "#d9a441" : "transparent" }}
                />
              ))}
            </div>
            <span className="font-manrope text-xs font-600" style={{ color: "#d9a441" }}>{rating}</span>
            <span className="font-manrope text-xs" style={{ color: "#64748b" }}>({reviews} reviews)</span>
          </div>

          {!compact && (
            <>
              {/* Meta */}
              <div className="flex flex-wrap gap-3 mt-2.5">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" style={{ color: "#4a6c8f" }} />
                  <span className="font-manrope text-xs" style={{ color: "#64748b" }}>{distance} away</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" style={{ color: "#4a6c8f" }} />
                  <span className="font-manrope text-xs" style={{ color: "#64748b" }}>{availability}</span>
                </div>
                <div className="font-manrope text-xs" style={{ color: "#64748b" }}>{jobsCompleted} jobs done</div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md font-manrope text-xs"
                    style={{ backgroundColor: "rgba(74,108,143,0.12)", color: "#4a6c8f", border: "1px solid rgba(74,108,143,0.2)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action */}
              <Link to="/booking">
                <Button
                  className="w-full mt-4 font-manrope font-600 text-sm h-9"
                  style={{ backgroundColor: "#4a6c8f", color: "#e2e8f0" }}
                >
                  Book {name.split(" ")[0]}
                </Button>
              </Link>
            </>
          )}

          {compact && (
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" style={{ color: "#4a6c8f" }} />
                <span className="font-manrope text-xs" style={{ color: "#64748b" }}>{availability}</span>
              </div>
              <span className="font-sora font-700 text-sm" style={{ color: "#d9a441" }}>{hourlyRate}/hr</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}