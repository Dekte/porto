import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { WorkItem } from "../types/portfolio";
import { resolveMediaUrl, resolvePosterUrl } from "../lib/media";

interface LandscapeCardProps {
  work: WorkItem;
  cloudName: string;
  clientColor: string;
  reducedMotion: boolean;
  onOpenViewer: (work: WorkItem) => void;
}

export function LandscapeCard({
  work,
  cloudName,
  clientColor,
  reducedMotion,
  onOpenViewer,
}: LandscapeCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  const videoUrl = resolveMediaUrl(work.src, work.type, cloudName);
  const posterUrl = resolvePosterUrl(work, cloudName);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (reducedMotion || work.type === "youtube" || hasError) return;

    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.currentTime = 0;
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpenViewer(work)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpenViewer(work);
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="pop-card group flex flex-col bg-surface cursor-pointer pop-focus-ring select-none"
      aria-label={`Buka video ${work.title} untuk klien ${work.client}`}
    >
      {/* 16:9 MEDIA CONTAINER */}
      <div className="relative aspect-video w-full bg-slate-950 overflow-hidden border-b-[var(--border-width)] border-black">
        {/* Poster image fallback */}
        {posterUrl && (
          <img
            src={posterUrl}
            alt=""
            aria-hidden="true"
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isPlaying ? "opacity-0" : "opacity-100"
            }`}
          />
        )}

        {/* Video preview player (hover only on desktop) */}
        {work.type === "video" && !reducedMotion && !hasError && (
          <video
            ref={videoRef}
            src={videoUrl}
            muted
            playsInline
            loop
            preload="none"
            onError={() => setHasError(true)}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Centered play button icon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-14 h-14 rounded-full bg-primary text-white border-2 border-black shadow-[3px_3px_0px_#000000] flex items-center justify-center transform transition-transform duration-200 group-hover:scale-115">
            <Play className="w-6 h-6 fill-white ml-0.5" aria-hidden="true" />
          </div>
        </div>

        {/* Ratio badge */}
        <div className="absolute top-3 right-3 pointer-events-none">
          <span className="px-2 py-0.5 text-[10px] font-bold bg-black/70 text-white backdrop-blur-sm rounded-md border border-white/20">
            {work.ratio || "16:9"}
          </span>
        </div>
      </div>

      {/* CARD CONTENT & METADATA */}
      <div className="p-4 sm:p-5 flex flex-col gap-2.5">
        <div className="flex items-center justify-between gap-2">
          <span
            style={{ backgroundColor: clientColor }}
            className="px-2.5 py-0.5 text-xs font-black font-display tracking-wider text-black rounded-lg border-2 border-black shadow-[2px_2px_0px_#000000] uppercase truncate max-w-[180px]"
          >
            {work.client}
          </span>

          <span className="text-xs text-text/60 font-semibold tabular-nums">
            {work.year}
          </span>
        </div>

        <h3 className="font-bold text-base sm:text-lg text-text group-hover:text-primary transition-colors leading-snug line-clamp-2 font-display">
          {work.title}
        </h3>

        <div className="flex items-center gap-2 text-xs text-text/70 font-medium">
          <span>{work.project}</span>
          {work.tags && work.tags.length > 0 && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-text/60 truncate">
                {work.tags.map((t) => `#${t}`).join(" ")}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
