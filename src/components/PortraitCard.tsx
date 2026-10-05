import { useRef, useEffect, useState } from "react";
import { Play, VolumeX } from "lucide-react";
import { WorkItem } from "../types/portfolio";
import { resolveMediaUrl, resolvePosterUrl, getEffectiveRatio } from "../lib/media";

interface PortraitCardProps {
  work: WorkItem;
  cloudName: string;
  clientColor: string;
  reducedMotion: boolean;
  onOpenViewer: (work: WorkItem) => void;
}

export function PortraitCard({
  work,
  cloudName,
  clientColor,
  reducedMotion,
  onOpenViewer,
}: PortraitCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  const ratio = getEffectiveRatio(work);
  const videoUrl = resolveMediaUrl(work.src, work.type, cloudName);
  const posterUrl = resolvePosterUrl(work, cloudName);

  // IntersectionObserver untuk deteksi apakah kartu sedang terlihat di layar
  useEffect(() => {
    if (reducedMotion || work.type === "youtube") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting && entry.intersectionRatio > 0.6);
        });
      },
      {
        threshold: [0.2, 0.6, 0.9],
        rootMargin: "0px -30px 0px -30px",
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [reducedMotion, work.type]);

  // Kontrol putar otomatis tanpa suara saat terlihat
  useEffect(() => {
    const video = videoRef.current;
    if (!video || work.type === "youtube" || reducedMotion) return;

    if (isInView && !hasError) {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay ditolak browser, biarkan poster tampil
            setIsPlaying(false);
          });
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isInView, hasError, work.type, reducedMotion]);

  // Rasio aspek dalam format CSS style
  const aspectRatioStyle = {
    aspectRatio: `${ratio}`,
  };

  return (
    <div
      ref={containerRef}
      style={aspectRatioStyle}
      className="shrink-0 h-[400px] sm:h-[460px] snap-center group"
    >
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
        className="pop-card w-full h-full flex flex-col justify-between cursor-pointer pop-focus-ring relative select-none"
        aria-label={`Buka video ${work.title} untuk klien ${work.client}`}
      >
        {/* MEDIA LAYER (VIDEO ATAU POSTER) */}
        <div className="absolute inset-0 bg-slate-900 overflow-hidden">
          {/* Poster image fallback */}
          {posterUrl && (
            <img
              src={posterUrl}
              alt=""
              aria-hidden="true"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                isPlaying ? "opacity-0" : "opacity-100"
              }`}
            />
          )}

          {/* Video preview player (HTML5) */}
          {work.type === "video" && !reducedMotion && !hasError && (
            <video
              ref={videoRef}
              src={videoUrl}
              muted
              playsInline
              loop
              preload="metadata"
              onError={() => setHasError(true)}
              className="w-full h-full object-cover"
            />
          )}

          {/* Gradient scrim untuk memastikan teks metadata selalu terbaca */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40 pointer-events-none" />
        </div>

        {/* TOP OVERLAY: CLIENT BADGE & AUDIO STATUS */}
        <div className="relative z-10 p-3 sm:p-4 flex items-start justify-between gap-2 pointer-events-none">
          <span
            style={{ backgroundColor: clientColor }}
            className="px-2.5 py-1 text-[11px] font-black font-display tracking-wider text-black rounded-lg border-2 border-black shadow-[2px_2px_0px_#000000] uppercase truncate max-w-[150px]"
          >
            {work.client}
          </span>

          <div className="flex items-center gap-1.5">
            {work.ratio && (
              <span className="px-2 py-0.5 text-[10px] font-bold bg-black/60 text-white backdrop-blur-sm rounded-md border border-white/20">
                {work.ratio}
              </span>
            )}
            {isPlaying && (
              <span
                className="p-1 rounded-md bg-black/60 text-white/90 backdrop-blur-sm"
                title="Pratinjau bisu (klik untuk buka dan dengar suara)"
              >
                <VolumeX className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
            )}
          </div>
        </div>

        {/* CENTER HOVER PLAY BUTTON */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-primary text-white border-2 border-black shadow-[3px_3px_0px_#000000] flex items-center justify-center transform transition-transform duration-200 group-hover:scale-110 opacity-90 group-hover:opacity-100">
            <Play className="w-5 h-5 fill-white ml-0.5" aria-hidden="true" />
          </div>
        </div>

        {/* BOTTOM OVERLAY: TITLE, PROJECT & YEAR */}
        <div className="relative z-10 p-3 sm:p-4 pointer-events-none flex flex-col gap-1 text-white">
          <h3 className="font-bold text-sm sm:text-base leading-snug line-clamp-2 text-white drop-shadow-sm font-display">
            {work.title}
          </h3>

          <div className="flex items-center gap-2 text-xs text-white/80 font-medium">
            <span>{work.project}</span>
            <span aria-hidden="true">·</span>
            <span>{work.year}</span>
          </div>

          {/* Tags */}
          {work.tags && work.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1 text-[10px] text-white/70">
              {work.tags.slice(0, 2).map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
