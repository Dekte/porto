import { ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { PortfolioConfig } from "../types/portfolio";

interface HeroProps {
  config: PortfolioConfig;
  onNavigatePage?: (page: "karya" | "kontak") => void;
}

export function Hero({ config, onNavigatePage }: HeroProps) {
  const { profile, theme } = config;

  const handlePrimaryClick = (e: React.MouseEvent) => {
    if (profile.primaryCta?.target === "#karya" && onNavigatePage) {
      e.preventDefault();
      onNavigatePage("karya");
    }
  };

  const handleSecondaryClick = (e: React.MouseEvent) => {
    if (profile.secondaryCta?.url === "#kontak" && onNavigatePage) {
      e.preventDefault();
      onNavigatePage("kontak");
    }
  };

  const handleStickerClick = () => {
    if (!profile.sticker) return;

    if (profile.sticker.action === "confetti") {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.4 },
        colors: [theme.primary, theme.secondary, theme.accent, theme.highlight, "#FF007F"],
      });
    } else if (profile.sticker.action === "link" && profile.sticker.url) {
      window.location.href = profile.sticker.url;
    }
  };

  return (
    <section
      id="home"
      className="relative pt-8 pb-14 sm:pt-14 sm:pb-20 overflow-hidden"
      aria-label="Beranda Profil Kreator"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* ==============================================================
              KOLOM KIRI: BADGE, HEADLINE, BIO, DAN TOMBOL AKSI
              ============================================================== */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            {/* BADGES BERURUTAN */}
            <div className="flex flex-wrap items-center gap-3">
              {profile.roleBadge && (
                <div
                  className="pop-badge bg-highlight text-black"
                  aria-label={`Peran: ${profile.roleBadge}`}
                >
                  <Sparkles className="w-3.5 h-3.5 fill-black" aria-hidden="true" />
                  <span>{profile.roleBadge}</span>
                </div>
              )}

              {profile.statusBadge?.show && (
                <div className="pop-badge bg-surface text-text">
                  {profile.statusBadge.dot === "green" && (
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
                    </span>
                  )}
                  <span>{profile.statusBadge.text}</span>
                </div>
              )}
            </div>

            {/* HEADLINE RAKSASA NEO-BRUTALISME */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-black font-display tracking-tight leading-[1.08] text-text"
              aria-label={`${profile.headline.before || ""} ${profile.headline.highlight || ""} ${profile.headline.after || ""}`.trim()}
            >
              {profile.headline.before && (
                <span className="block">{profile.headline.before}</span>
              )}
              {profile.headline.highlight && (
                <span className="inline-block my-1.5 sm:my-2">
                  <span className="pop-highlight-box">
                    <span className="font-black text-black">
                      {profile.headline.highlight}
                    </span>
                  </span>
                </span>
              )}
              {profile.headline.after && (
                <span className="block">{profile.headline.after}</span>
              )}
            </h1>

            {/* BIO PARAGRAF */}
            <p className="text-base sm:text-lg text-text/85 leading-relaxed max-w-xl font-normal">
              {profile.bio}
            </p>

            {/* DUA TOMBOL CTA */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {profile.primaryCta && (
                <a
                  href={profile.primaryCta.target}
                  onClick={handlePrimaryClick}
                  className="pop-btn-primary pop-focus-ring"
                >
                  <span>{profile.primaryCta.label}</span>
                  <ArrowUpRight className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
                </a>
              )}

              {profile.secondaryCta && (
                <a
                  href={profile.secondaryCta.url}
                  onClick={handleSecondaryClick}
                  className="pop-btn-secondary pop-focus-ring"
                >
                  <span>{profile.secondaryCta.label}</span>
                </a>
              )}
            </div>

          </div>

          {/* ==============================================================
              KOLOM KANAN: FOTO CETAK POP DENGAN CAPTION & STIKER
              ============================================================== */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end mt-4 lg:mt-0">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* STIKER PIL INTERAKTIF DI POJOK ATAS */}
              {theme.effects.sticker && profile.sticker?.text && (
                <button
                  type="button"
                  onClick={handleStickerClick}
                  className="pop-sticker bg-[#A7F3D0] text-[#065F46] pop-focus-ring flex items-center gap-1 cursor-pointer"
                  title="Klik untuk kejutan pop!"
                  aria-label={`Stiker interaktif: ${profile.sticker.text}`}
                >
                  <span>{profile.sticker.text}</span>
                </button>
              )}

              {/* BINGKAI FOTO CETAK */}
              <div className="pop-photo-frame bg-white">
                <div className="relative overflow-hidden rounded-[calc(var(--radius)-4px)] aspect-[4/3] sm:aspect-[4/3.5] bg-slate-100 border-2 border-black/10">
                  <img
                    src={profile.photo}
                    alt={profile.photoAlt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover select-none"
                    loading="eager"
                  />

                  {/* KARTU CAPTION KECIL DI BAGIAN BAWAH FOTO */}
                  {profile.photoCaption && (
                    <div className="absolute bottom-3 left-3 right-3 p-3 bg-white/95 backdrop-blur-md rounded-xl border-2 border-black shadow-[3px_3px_0px_#000000] flex flex-col gap-0.5">
                      <span className="text-xs font-black font-display tracking-wider text-primary">
                        {profile.photoCaption.title}
                      </span>
                      <span className="text-[11px] font-bold text-slate-800 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-600 shrink-0" aria-hidden="true" />
                        <span className="truncate">{profile.photoCaption.location}</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
