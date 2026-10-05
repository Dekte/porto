import { useEffect, useRef, useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Share2,
  Check,
  AlertCircle,
  ExternalLink,
  Play,
  Pause,
} from "lucide-react";
import { PortfolioConfig, WorkItem } from "../types/portfolio";
import {
  getEffectiveRatio,
  getEffectiveSection,
  resolveMediaUrl,
  resolvePosterUrl,
} from "../lib/media";

interface WorkViewerProps {
  work: WorkItem | null;
  config: PortfolioConfig;
  allWorks: WorkItem[];
  onClose: () => void;
  onNavigate: (work: WorkItem) => void;
  triggerElementRef: HTMLElement | null;
}

export function WorkViewer({
  work,
  config,
  allWorks,
  onClose,
  onNavigate,
  triggerElementRef,
}: WorkViewerProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [copied, setCopied] = useState(false);

  const vConfig = config.viewer || {
    loadingText: "Memuat Media...",
    errorTitle: "Video tidak dapat diputar saat ini.",
    errorMessage: "File mungkin sedang diproses atau URL video tidak dapat diakses.",
    directLinkText: "Buka Tautan Langsung",
    copyLinkText: "Salin Link",
    copiedLinkText: "Tersalin!",
    prevLabel: "Karya Sebelumnya",
    nextLabel: "Karya Berikutnya",
    closeLabel: "Tutup (Esc)",
  };

  // Cari index karya saat ini untuk prev/next
  const currentIndex = work
    ? allWorks.findIndex((item) => item.id === work.id)
    : -1;
  const prevWork =
    currentIndex > 0 ? allWorks[currentIndex - 1] : allWorks[allWorks.length - 1];
  const nextWork =
    currentIndex < allWorks.length - 1 ? allWorks[currentIndex + 1] : allWorks[0];

  // Rasio dan section
  const ratio = work ? getEffectiveRatio(work) : 9 / 16;
  const section = work ? getEffectiveSection(work) : "portrait";
  const isPortraitStyle = section === "portrait";

  const videoUrl = work
    ? resolveMediaUrl(work.src, work.type, config.cloudinary.cloudName)
    : "";
  const posterUrl = work
    ? resolvePosterUrl(work, config.cloudinary.cloudName)
    : "";

  // Reset state saat karya berganti
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setIsPlaying(true);
  }, [work?.id]);

  // Kelola fokus dan keyboard listener (Esc, Panah, Spasi)
  useEffect(() => {
    if (!work) return;

    // Kunci scroll halaman belakang
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Simpan elemen aktif sebelum modal dibuka untuk dikembalikan saat ditutup
    const previouslyFocused = triggerElementRef || document.activeElement;

    // Beri fokus ke tombol tutup di dalam modal
    const closeBtn = modalRef.current?.querySelector<HTMLButtonElement>("[data-close-btn]");
    closeBtn?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft" || (isPortraitStyle && e.key === "ArrowUp")) {
        e.preventDefault();
        if (prevWork) onNavigate(prevWork);
      } else if (e.key === "ArrowRight" || (isPortraitStyle && e.key === "ArrowDown")) {
        e.preventDefault();
        if (nextWork) onNavigate(nextWork);
      } else if (e.key === " " && work.type === "video") {
        e.preventDefault();
        togglePlayPause();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      // Kembalikan fokus ke pemicu kartu asal
      if (previouslyFocused && "focus" in previouslyFocused) {
        (previouslyFocused as HTMLElement).focus();
      }
    };
  }, [work, prevWork, nextWork, onClose, onNavigate, triggerElementRef, isPortraitStyle]);

  // Play / Pause toggle
  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // Toggle Mute
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Salin link karya
  const copyShareLink = () => {
    if (!work) return;
    const clientSlug = encodeURIComponent(work.client.toLowerCase().replace(/\s+/g, "-"));
    const url = `${window.location.origin}${window.location.pathname}#/${clientSlug}/${work.id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      })
      .catch(() => {});
  };

  if (!work) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Pratinjau karya ${work.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 md:p-6"
    >
      {/* TOMBOL TUTUP DI POJOK ATAS */}
      <button
        data-close-btn
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-surface text-text border-2 border-black shadow-[3px_3px_0px_#000000] hover:scale-105 active:scale-95 transition-all pop-focus-ring cursor-pointer"
        aria-label={vConfig.closeLabel || "Tutup (Esc)"}
        title={vConfig.closeLabel || "Tutup (Esc)"}
      >
        <X className="w-6 h-6 stroke-[2.5]" aria-hidden="true" />
      </button>

      {/* CONTAINER UTAMA VIEWER */}
      <div className="relative w-full max-w-6xl max-h-[92vh] flex flex-col lg:flex-row items-center justify-center gap-6 overflow-hidden">
        {/* NAVIGASI SEBELUMNYA (DESKTOP) */}
        {prevWork && (
          <button
            type="button"
            onClick={() => onNavigate(prevWork)}
            className="hidden md:flex absolute left-2 lg:left-0 z-40 p-3 rounded-full bg-surface text-text border-2 border-black shadow-[3px_3px_0px_#000000] hover:scale-110 active:scale-95 transition-all pop-focus-ring cursor-pointer"
            aria-label={`${vConfig.prevLabel || "Karya Sebelumnya"}: ${prevWork.title}`}
            title={`${vConfig.prevLabel || "Karya Sebelumnya"} (←)`}
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" aria-hidden="true" />
          </button>
        )}

        {/* ==============================================================
            AREA PEMUTAR VIDEO (ADAPTIF TERHADAP ASPEK RASIO)
            ============================================================== */}
        <div
          className={`relative flex items-center justify-center bg-black rounded-2xl border-[var(--border-width)] border-black shadow-[6px_6px_0px_#000000] overflow-hidden ${
            isPortraitStyle
              ? "h-[70vh] sm:h-[78vh] w-auto max-w-[90vw]"
              : "w-full max-w-4xl aspect-video"
          }`}
          style={isPortraitStyle ? { aspectRatio: `${ratio}` } : undefined}
        >
          {/* SKELETON / LOADING INDICATOR */}
          {isLoading && !hasError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-white z-10">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-3" />
              <span className="text-xs font-bold font-display tracking-wider uppercase text-white/80">
                {vConfig.loadingText || "Memuat Media..."}
              </span>
            </div>
          )}

          {/* PESAN ERROR RAMAH JIKA VIDEO GAGAL */}
          {hasError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-white p-6 text-center z-20">
              <AlertCircle className="w-12 h-12 text-primary mb-3" />
              <p className="font-bold text-base mb-1">
                {vConfig.errorTitle || "Video tidak dapat diputar saat ini."}
              </p>
              <p className="text-xs text-white/70 max-w-xs mb-4">
                {vConfig.errorMessage ||
                  "File mungkin sedang diproses atau URL video tidak dapat diakses."}
              </p>
              {work.src.startsWith("http") && (
                <a
                  href={work.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pop-btn-primary text-xs py-2 px-4 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{vConfig.directLinkText || "Buka Tautan Langsung"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          )}

          {/* VIDEO HTML5 */}
          {work.type === "video" && (
            <video
              ref={videoRef}
              src={videoUrl}
              poster={posterUrl}
              autoPlay
              muted={isMuted}
              playsInline
              loop
              controls={!isPortraitStyle}
              onLoadedData={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
              className="w-full h-full object-contain"
            >
              {work.captions && (
                <track
                  kind="captions"
                  src={work.captions}
                  srcLang="id"
                  label="Bahasa Indonesia"
                  default
                />
              )}
            </video>
          )}

          {/* YOUTUBE EMBED (YOUTUBE-NOCOOKIE) */}
          {work.type === "youtube" && (
            <iframe
              src={videoUrl}
              title={work.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onLoad={() => setIsLoading(false)}
              className="w-full h-full border-0"
            />
          )}

          {/* KONTROL OVERLAY UNTUK PORTRAIT (ALA REELS: PLAY & SOUND) */}
          {isPortraitStyle && work.type === "video" && !hasError && (
            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
              <button
                type="button"
                onClick={togglePlayPause}
                className="p-2.5 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 pop-focus-ring cursor-pointer"
                title={isPlaying ? "Jeda (Spasi)" : "Putar (Spasi)"}
                aria-label={isPlaying ? "Jeda video" : "Putar video"}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-white" />
                ) : (
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                )}
              </button>

              <button
                type="button"
                onClick={toggleMute}
                className={`p-2.5 rounded-full backdrop-blur-md border border-white/20 pop-focus-ring cursor-pointer transition-colors ${
                  isMuted
                    ? "bg-highlight text-black border-black font-bold"
                    : "bg-black/70 hover:bg-black/90 text-white"
                }`}
                title={isMuted ? "Buka Suara" : "Bisukan Suara"}
                aria-label={isMuted ? "Buka suara video" : "Bisukan suara video"}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
            </div>
          )}
        </div>

        {/* NAVIGASI BERIKUTNYA (DESKTOP) */}
        {nextWork && (
          <button
            type="button"
            onClick={() => onNavigate(nextWork)}
            className="hidden md:flex absolute right-2 lg:right-0 z-40 p-3 rounded-full bg-surface text-text border-2 border-black shadow-[3px_3px_0px_#000000] hover:scale-110 active:scale-95 transition-all pop-focus-ring cursor-pointer"
            aria-label={`${vConfig.nextLabel || "Karya Berikutnya"}: ${nextWork.title}`}
            title={`${vConfig.nextLabel || "Karya Berikutnya"} (→)`}
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" aria-hidden="true" />
          </button>
        )}

        {/* ==============================================================
            PANEL KETERANGAN KARYA (METADATA & SHARE)
            ============================================================== */}
        <div className="w-full max-w-sm bg-surface p-5 sm:p-6 rounded-2xl border-[var(--border-width)] border-black shadow-[5px_5px_0px_#000000] flex flex-col gap-3 text-text shrink-0">
          <div className="flex items-center justify-between gap-2">
            <span className="px-3 py-1 text-xs font-black font-display tracking-wider bg-highlight text-black rounded-lg border-2 border-black shadow-[2px_2px_0px_#000000] uppercase">
              {work.client}
            </span>
            <span className="text-xs font-bold text-text/60 tabular-nums">
              {work.year}
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-black font-display text-text leading-snug">
            {work.title}
          </h2>

          <p className="text-xs sm:text-sm text-text/80">
            Proyek: <strong className="text-text font-bold">{work.project}</strong>
          </p>

          {work.alt && (
            <p className="text-xs text-text/70 italic border-l-2 border-primary pl-2.5 my-1">
              "{work.alt}"
            </p>
          )}

          {/* Tags */}
          {work.tags && work.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] font-semibold text-text/70">
              {work.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* ACTION BUTTONS (SALIN LINK & NAVIGASI MOBILE) */}
          <div className="pt-3 border-t border-black/10 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={copyShareLink}
              className="pop-btn-secondary text-xs py-2 px-3 flex items-center gap-1.5 cursor-pointer"
              aria-label={vConfig.copyLinkText || "Salin Link"}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-accent" />
                  <span className="text-accent font-bold">
                    {vConfig.copiedLinkText || "Tersalin!"}
                  </span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{vConfig.copyLinkText || "Salin Link"}</span>
                </>
              )}
            </button>

            {/* Mobile prev/next */}
            <div className="flex sm:hidden items-center gap-2">
              {prevWork && (
                <button
                  type="button"
                  onClick={() => onNavigate(prevWork)}
                  className="p-2 bg-surface text-text rounded-lg border-2 border-black shadow-[2px_2px_0px_#000000]"
                  aria-label={vConfig.prevLabel || "Sebelumnya"}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
              {nextWork && (
                <button
                  type="button"
                  onClick={() => onNavigate(nextWork)}
                  className="p-2 bg-surface text-text rounded-lg border-2 border-black shadow-[2px_2px_0px_#000000]"
                  aria-label={vConfig.nextLabel || "Berikutnya"}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
