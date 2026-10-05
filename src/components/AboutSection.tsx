import {
  Sparkles,
  Video,
  Palette,
  Image as ImageIcon,
  PenTool,
  Volume2,
  CheckCircle2,
} from "lucide-react";
import { PortfolioConfig } from "../types/portfolio";

interface AboutSectionProps {
  config: PortfolioConfig;
  onNavigateToContact?: () => void;
}

export function AboutSection({ config, onNavigateToContact }: AboutSectionProps) {
  const about = config.about;
  if (!about) return null;

  const renderSkillIcon = (iconName?: string) => {
    switch (iconName) {
      case "video":
        return <Video className="w-4 h-4 text-primary" aria-hidden="true" />;
      case "sparkles":
        return <Sparkles className="w-4 h-4 text-highlight" aria-hidden="true" />;
      case "palette":
        return <Palette className="w-4 h-4 text-secondary" aria-hidden="true" />;
      case "image":
        return <ImageIcon className="w-4 h-4 text-accent" aria-hidden="true" />;
      case "pen-tool":
        return <PenTool className="w-4 h-4 text-primary" aria-hidden="true" />;
      case "volume-2":
        return <Volume2 className="w-4 h-4 text-secondary" aria-hidden="true" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-accent" aria-hidden="true" />;
    }
  };

  const skillsTitle = about.skillsTitle || "SOFTWARE & SPESIALISASI";
  const servicesTitle = about.servicesTitle || "LAYANAN UTAMA";
  const calloutTitle = about.calloutTitle || "Tertarik berkolaborasi dalam proyek video atau desain?";
  const calloutSubtitle = about.calloutSubtitle || "Jadwalkan diskusi santai atau kirimkan brief proyek Anda secara langsung.";
  const calloutButton = about.calloutButton || "Hubungi Sekarang";

  return (
    <section
      id="tentang"
      className="py-16 sm:py-24 relative bg-background border-b-[var(--border-width)] border-black"
      aria-label={about.title}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 pop-badge bg-surface text-text mb-3">
            <Sparkles className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
            <span>{about.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-text mb-4">
            {about.title}
          </h2>

          <p className="text-lg sm:text-xl font-bold text-text/90 leading-relaxed font-display">
            {about.headline}
          </p>
        </div>

        {/* CONTENT GRID: 2 COLUMNS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* KOLOM KIRI: CERITA & STATISTIK */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            {/* Story text */}
            <div className="flex flex-col gap-4 text-base sm:text-lg text-text/85 leading-relaxed font-normal">
              {about.story.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* STATISTIK PENCAPAIAN */}
            {about.stats && about.stats.length > 0 && (
              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4">
                {about.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 bg-surface rounded-2xl border-[var(--border-width)] border-black shadow-[3px_3px_0px_#000000] flex flex-col items-center text-center gap-1"
                  >
                    <span className="text-2xl sm:text-3xl font-black font-display text-primary tabular-nums">
                      {stat.value}
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold text-text/75 uppercase tracking-wide leading-tight">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* TOOLS & SKILLS CHIPS */}
            {about.skills && about.skills.length > 0 && (
              <div className="pt-2">
                <h3 className="text-xs font-black font-display tracking-widest text-text/70 uppercase mb-3">
                  {skillsTitle}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {about.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="px-3.5 py-2 bg-surface rounded-xl border-2 border-black shadow-[2px_2px_0px_#000000] flex items-center gap-2 text-xs font-bold text-text"
                    >
                      {renderSkillIcon(skill.icon)}
                      <span>{skill.name}</span>
                      <span className="text-[10px] text-text/50 font-medium">
                        ({skill.category})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* KOLOM KANAN: KARTU LAYANAN (SERVICES) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <h3 className="text-xs font-black font-display tracking-widest text-text/70 uppercase mb-1">
              {servicesTitle}
            </h3>

            {about.services &&
              about.services.map((service) => (
                <div
                  key={service.number}
                  className="p-5 sm:p-6 bg-surface rounded-2xl border-[var(--border-width)] border-black shadow-[4px_4px_0px_#000000] flex flex-col gap-2.5 relative overflow-hidden group hover:translate-y-[-2px] transition-transform"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-black font-display px-2.5 py-1 bg-highlight text-black rounded-lg border-2 border-black shadow-[2px_2px_0px_#000000] tabular-nums">
                      {service.number}
                    </span>
                    <span className="text-[11px] font-bold text-text/70 uppercase tracking-wider">
                      {service.tag}
                    </span>
                  </div>

                  <h4 className="text-lg sm:text-xl font-black font-display text-text">
                    {service.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-text/80 leading-relaxed font-normal">
                    {service.description}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* BOTTOM CALLOUT MENUJU KONTAK */}
        {onNavigateToContact && (
          <div className="mt-14 p-6 sm:p-8 bg-highlight text-black rounded-2xl border-[var(--border-width)] border-black shadow-[5px_5px_0px_#000000] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black font-display">
                {calloutTitle}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-black/80 mt-1">
                {calloutSubtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={onNavigateToContact}
              className="pop-btn-primary bg-primary text-white border-2 border-black shrink-0 text-sm py-2.5 px-6 cursor-pointer"
            >
              {calloutButton}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
