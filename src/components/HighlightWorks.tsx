import { ArrowRight, Sparkles } from "lucide-react";
import { PortfolioConfig, WorkItem } from "../types/portfolio";
import { PortraitCard } from "./PortraitCard";
import { LandscapeCard } from "./LandscapeCard";
import { getEffectiveSection } from "../lib/media";

interface HighlightWorksProps {
  config: PortfolioConfig;
  reducedMotion: boolean;
  onOpenViewer: (work: WorkItem) => void;
  onNavigateToKarya: () => void;
}

export function HighlightWorks({
  config,
  reducedMotion,
  onOpenViewer,
  onNavigateToKarya,
}: HighlightWorksProps) {
  const { works, theme, cloudinary } = config;

  const hl = config.highlight || {
    badge: "KARYA PILIHAN",
    title: "Highlight Karya",
    description: "Cuplikan karya terpilih dari kampanye video reels vertikal hingga film komersial sinematik.",
    ctaLabel: "Buka Arsip Lengkap",
    reelsTitle: "Featured Reels (9:16 & 4:3)",
    reelsSubtitle: "Putar otomatis tanpa suara saat terlihat",
    landscapeTitle: "Featured Commercial & Film (16:9)",
    bannerTitle: "Ingin menjelajahi semua video berdasarkan klien & proyek?",
    bannerDescription: "Halaman karya memuat filter interaktif, takarir, dan seluruh koleksi reels & video komersial.",
    bannerCta: "Jelajahi Halaman Karya",
  };

  // Ambil karya unggulan (featured) atau maksimal 4 karya pertama
  const highlightItems =
    works.filter((w) => w.featured).length >= 2
      ? works.filter((w) => w.featured)
      : works.slice(0, 4);

  // Pisahkan portrait dan landscape untuk highlight
  const portraitHighlights = highlightItems.filter(
    (w) => getEffectiveSection(w) === "portrait"
  );
  const landscapeHighlights = highlightItems.filter(
    (w) => getEffectiveSection(w) === "landscape"
  );

  const clientAccents = theme.clientAccents || [
    "#FFD166",
    "#06D6A0",
    "#4361EE",
    "#FF4D8D",
    "#9B5DE5",
  ];

  return (
    <section
      id="highlight-karya"
      className="py-14 sm:py-20 relative bg-background border-b-[var(--border-width)] border-black"
      aria-label={hl.title}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER HIGHLIGHT */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12 pb-6 border-b-2 border-black/10">
          <div>
            <div className="inline-flex items-center gap-2 pop-badge bg-highlight text-black mb-3">
              <Sparkles className="w-3.5 h-3.5 fill-black" aria-hidden="true" />
              <span>{hl.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-text">
              {hl.title}
            </h2>
            <p className="text-sm sm:text-base text-text/75 font-normal mt-2 max-w-xl">
              {hl.description}
            </p>
          </div>

          {/* TOMBOL MENUJU HALAMAN KARYA */}
          <button
            type="button"
            onClick={onNavigateToKarya}
            className="pop-btn-primary text-sm py-2.5 px-5 self-start sm:self-end flex items-center gap-2"
          >
            <span>
              {hl.ctaLabel} ({works.length})
            </span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
          </button>
        </div>

        {/* REELS PORTRAIT HIGHLIGHT ROW */}
        {portraitHighlights.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-black font-display text-text">
                {hl.reelsTitle}
              </h3>
              <span className="text-xs font-semibold text-text/60">
                {hl.reelsSubtitle}
              </span>
            </div>

            <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 custom-scrollbar">
              {portraitHighlights.map((work, idx) => (
                <PortraitCard
                  key={work.id}
                  work={work}
                  cloudName={cloudinary.cloudName}
                  clientColor={clientAccents[idx % clientAccents.length]}
                  reducedMotion={reducedMotion}
                  onOpenViewer={onOpenViewer}
                />
              ))}
            </div>
          </div>
        )}

        {/* LANDSCAPE HIGHLIGHT GRID */}
        {landscapeHighlights.length > 0 && (
          <div>
            <h3 className="text-lg sm:text-xl font-black font-display text-text mb-4">
              {hl.landscapeTitle}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {landscapeHighlights.slice(0, 2).map((work, idx) => (
                <LandscapeCard
                  key={work.id}
                  work={work}
                  cloudName={cloudinary.cloudName}
                  clientColor={clientAccents[(idx + 2) % clientAccents.length]}
                  reducedMotion={reducedMotion}
                  onOpenViewer={onOpenViewer}
                />
              ))}
            </div>
          </div>
        )}

        {/* BOTTOM CALLOUT MENUJU HALAMAN KARYA LENGKAP */}
        <div className="mt-12 p-6 sm:p-8 bg-surface rounded-2xl border-[var(--border-width)] border-black shadow-[4px_4px_0px_#000000] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h4 className="text-lg sm:text-xl font-black font-display text-text">
              {hl.bannerTitle}
            </h4>
            <p className="text-xs sm:text-sm text-text/75 mt-1">
              {hl.bannerDescription}
            </p>
          </div>

          <button
            type="button"
            onClick={onNavigateToKarya}
            className="pop-btn-primary shrink-0 text-sm py-2.5 px-6 flex items-center gap-2"
          >
            <span>{hl.bannerCta}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
