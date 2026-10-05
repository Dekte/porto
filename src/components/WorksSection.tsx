import { useState, useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PortfolioConfig, WorkItem } from "../types/portfolio";
import { getEffectiveSection } from "../lib/media";
import { PortraitCard } from "./PortraitCard";
import { LandscapeCard } from "./LandscapeCard";

interface WorksSectionProps {
  config: PortfolioConfig;
  reducedMotion: boolean;
  onOpenViewer: (work: WorkItem) => void;
}

export function WorksSection({
  config,
  reducedMotion,
  onOpenViewer,
}: WorksSectionProps) {
  const { sections, works, theme, cloudinary } = config;
  const portraitScrollRef = useRef<HTMLDivElement>(null);

  const ws = config.worksSection || {
    badge: "PORTFOLIO SHOWCASE",
    title: "Karya Pilihan",
    allFilterLabel: "Semua",
    portraitSubtitle: "karya (9:16 & 4:3)",
    landscapeSubtitle: "karya (16:9 widescreen)",
    emptyMessage: "Belum ada karya untuk filter klien ini.",
    emptyButtonLabel: "Tampilkan Semua Karya",
  };

  // Filter state
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Ambil daftar unik client untuk chip filter
  const clientList = useMemo(() => {
    const clients = new Set<string>();
    works.forEach((w) => {
      if (w.client) clients.add(w.client);
    });
    return Array.from(clients);
  }, [works]);

  // Peta warna aksen untuk tiap client secara konsisten
  const clientColorMap = useMemo(() => {
    const map = new Map<string, string>();
    const accents = theme.clientAccents || ["#FFD166", "#06D6A0", "#4361EE", "#FF4D8D", "#9B5DE5"];
    clientList.forEach((client, idx) => {
      map.set(client, accents[idx % accents.length]);
    });
    return map;
  }, [clientList, theme.clientAccents]);

  // Saring karya berdasarkan filter aktif
  const filteredWorks = useMemo(() => {
    if (activeFilter === "all") return works;
    return works.filter((w) => w.client === activeFilter);
  }, [works, activeFilter]);

  // Kelompokkan karya ke dalam section masing-masing (portrait vs landscape)
  const portraitWorks = useMemo(() => {
    return filteredWorks.filter((w) => getEffectiveSection(w) === "portrait");
  }, [filteredWorks]);

  const landscapeWorks = useMemo(() => {
    return filteredWorks.filter((w) => getEffectiveSection(w) === "landscape");
  }, [filteredWorks]);

  // Handler scroll panah untuk baris horizontal portrait
  const scrollPortrait = (direction: "left" | "right") => {
    if (portraitScrollRef.current) {
      const scrollAmount = 320;
      portraitScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    }
  };

  return (
    <section
      id="karya"
      className="py-14 sm:py-20 relative bg-background border-b-[var(--border-width)] border-black"
      aria-label={ws.title}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER BAGIAN KARYA & FILTER CHIPS */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b-2 border-black/10">
          <div>
            <span className="text-xs font-black font-display tracking-widest text-primary uppercase block mb-1">
              {ws.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-text">
              {ws.title}
            </h2>
          </div>

          {/* FILTER CHIPS */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="sr-only">Filter menurut klien:</span>
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold border-2 border-black transition-all cursor-pointer pop-focus-ring ${
                activeFilter === "all"
                  ? "bg-text text-background shadow-[2px_2px_0px_#000000]"
                  : "bg-surface text-text hover:bg-slate-100 shadow-[2px_2px_0px_#000000]"
              }`}
              aria-pressed={activeFilter === "all"}
            >
              {ws.allFilterLabel} ({works.length})
            </button>

            {clientList.map((client) => {
              const count = works.filter((w) => w.client === client).length;
              const isSelected = activeFilter === client;
              const accentColor = clientColorMap.get(client) || "#FFD166";

              return (
                <button
                  key={client}
                  type="button"
                  onClick={() => setActiveFilter(client)}
                  style={{
                    backgroundColor: isSelected ? accentColor : undefined,
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold border-2 border-black transition-all cursor-pointer pop-focus-ring ${
                    isSelected
                      ? "text-black shadow-[3px_3px_0px_#000000] scale-105 font-black"
                      : "bg-surface text-text hover:bg-slate-100 shadow-[2px_2px_0px_#000000]"
                  }`}
                  aria-pressed={isSelected}
                >
                  {client} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* PENGUMUMAN SCREEN READER SAAT FILTER BERUBAH */}
        <div className="sr-only" aria-live="polite">
          Menampilkan {filteredWorks.length} karya untuk filter{" "}
          {activeFilter === "all" ? "semua klien" : activeFilter}
        </div>

        {/* TAMPILKAN SECTIONS SESUAI URUTAN ARRAY DI CONFIG.SECTIONS */}
        <div className="mt-12 flex flex-col gap-16 sm:gap-20">
          {sections.map((section) => {
            if (!section.show) return null;

            if (section.id === "portrait") {
              if (portraitWorks.length === 0) return null;

              return (
                <div key={section.id} className="relative">
                  {/* SECTION HEADER & KONTROL SCROLL */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-baseline gap-3">
                      <h3 className="text-xl sm:text-2xl font-black font-display text-text tracking-tight">
                        {section.label}
                      </h3>
                      <span className="text-xs font-semibold text-text/60">
                        {portraitWorks.length} {ws.portraitSubtitle}
                      </span>
                    </div>

                    {/* TOMBOL NAVIGASI HORIZONTAL */}
                    <div className="hidden sm:flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => scrollPortrait("left")}
                        className="p-2 bg-surface hover:bg-slate-100 text-text rounded-xl border-2 border-black shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all pop-focus-ring cursor-pointer"
                        aria-label="Geser karya sebelumnya ke kiri"
                        title="Geser ke kiri"
                      >
                        <ChevronLeft className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollPortrait("right")}
                        className="p-2 bg-surface hover:bg-slate-100 text-text rounded-xl border-2 border-black shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all pop-focus-ring cursor-pointer"
                        aria-label="Geser karya berikutnya ke kanan"
                        title="Geser ke kanan"
                      >
                        <ChevronRight className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  {/* HORIZONTAL SCROLLING ROW (SCROLL-SNAP) */}
                  <div
                    ref={portraitScrollRef}
                    className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 px-1 snap-x snap-mandatory custom-scrollbar scroll-smooth"
                    tabIndex={0}
                    aria-label="Daftar video vertikal reels, gulir ke samping untuk melihat lebih banyak"
                  >
                    {portraitWorks.map((work) => (
                      <PortraitCard
                        key={work.id}
                        work={work}
                        cloudName={cloudinary.cloudName}
                        clientColor={clientColorMap.get(work.client) || "#FFD166"}
                        reducedMotion={reducedMotion}
                        onOpenViewer={onOpenViewer}
                      />
                    ))}
                  </div>
                </div>
              );
            }

            if (section.id === "landscape") {
              if (landscapeWorks.length === 0) return null;

              return (
                <div key={section.id} className="relative">
                  <div className="flex items-baseline gap-3 mb-6">
                    <h3 className="text-xl sm:text-2xl font-black font-display text-text tracking-tight">
                      {section.label}
                    </h3>
                    <span className="text-xs font-semibold text-text/60">
                      {landscapeWorks.length} {ws.landscapeSubtitle}
                    </span>
                  </div>

                  {/* GRID LANDSCAPE CARDS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {landscapeWorks.map((work) => (
                      <LandscapeCard
                        key={work.id}
                        work={work}
                        cloudName={cloudinary.cloudName}
                        clientColor={clientColorMap.get(work.client) || "#FFD166"}
                        reducedMotion={reducedMotion}
                        onOpenViewer={onOpenViewer}
                      />
                    ))}
                  </div>
                </div>
              );
            }

            return null;
          })}

          {/* PESAN KOSONG BILA SEMUA KARYA TERFILTER */}
          {filteredWorks.length === 0 && (
            <div className="text-center py-16 bg-surface rounded-2xl border-[var(--border-width)] border-black shadow-[4px_4px_0px_#000000] p-8 max-w-md mx-auto">
              <p className="text-lg font-bold text-text mb-4">
                {ws.emptyMessage}
              </p>
              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                className="pop-btn-primary text-sm py-2 px-4"
              >
                {ws.emptyButtonLabel}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
