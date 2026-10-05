import { Moon, Sun, Zap, ZapOff } from "lucide-react";
import { PortfolioConfig } from "../types/portfolio";

export type NavPage = "home" | "karya" | "tentang" | "kontak";

interface HeaderProps {
  config: PortfolioConfig;
  currentPage: NavPage;
  onNavigatePage: (page: NavPage) => void;
  isDark: boolean;
  toggleTheme: () => void;
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
}

export function Header({
  config,
  currentPage,
  onNavigatePage,
  isDark,
  toggleTheme,
  reducedMotion,
  toggleReducedMotion,
}: HeaderProps) {
  const nav = config.navigation || {
    home: "Home",
    karya: "Karya",
    tentang: "Tentang",
    kontak: "Kontak",
  };

  const ui = config.ui || {
    reducedMotionOnText: "Animasi Mati",
    reducedMotionOffText: "Kurangi Gerak",
    themeLightTooltip: "Beralih ke Mode Gelap",
    themeDarkTooltip: "Beralih ke Mode Terang",
  };

  const navItems: Array<{ id: NavPage; label: string }> = [
    { id: "home", label: nav.home },
    { id: "karya", label: nav.karya },
    { id: "tentang", label: nav.tentang },
    { id: "kontak", label: nav.kontak },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur-md border-b-[var(--border-width)] border-black transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Zone 1: Single element wordmark (klik kembali ke Home) */}
        <button
          type="button"
          onClick={() => onNavigatePage("home")}
          className="text-xl sm:text-2xl font-black font-display tracking-tight text-text hover:text-primary transition-colors focus-visible:outline-3 focus-visible:outline-black rounded-md cursor-pointer text-left"
          aria-label={`${config.profile.name} - ${nav.home}`}
        >
          {config.profile.name}
        </button>

        {/* Zone 2: Navigation links / tabs per halaman */}
        <nav
          className="hidden md:flex items-center gap-1.5 p-1 bg-surface rounded-xl border-2 border-black shadow-[2px_2px_0px_#000000]"
          aria-label="Navigasi Halaman Utama"
        >
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigatePage(item.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer pop-focus-ring ${
                  isActive
                    ? "bg-highlight text-black border-2 border-black shadow-[1.5px_1.5px_0px_#000000] scale-102 font-black"
                    : "text-text/75 hover:text-text hover:bg-slate-100"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Aksi Aksesibilitas & Tema */}
        <div className="flex items-center gap-2">
          {/* Tombol Kurangi Animasi */}
          {config.theme.effects.reducedMotionAllowed && (
            <button
              type="button"
              onClick={toggleReducedMotion}
              className={`p-2 rounded-xl border-[var(--border-width)] border-black transition-all cursor-pointer pop-focus-ring flex items-center gap-1.5 text-xs font-bold ${
                reducedMotion
                  ? "bg-highlight text-black shadow-[2px_2px_0px_#000000]"
                  : "bg-surface text-text shadow-[2px_2px_0px_#000000] hover:bg-slate-100"
              }`}
              title={reducedMotion ? ui.reducedMotionOnText : ui.reducedMotionOffText}
              aria-label={reducedMotion ? ui.reducedMotionOnText : ui.reducedMotionOffText}
              aria-pressed={reducedMotion}
            >
              {reducedMotion ? (
                <>
                  <ZapOff className="w-4 h-4 text-black" aria-hidden="true" />
                  <span className="hidden lg:inline">{ui.reducedMotionOnText}</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span className="hidden lg:inline">{ui.reducedMotionOffText}</span>
                </>
              )}
            </button>
          )}

          {/* Tombol Ganti Tema Terang/Gelap */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 bg-surface text-text rounded-xl border-[var(--border-width)] border-black shadow-[2px_2px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer pop-focus-ring"
            title={isDark ? ui.themeDarkTooltip : ui.themeLightTooltip}
            aria-label={isDark ? ui.themeDarkTooltip : ui.themeLightTooltip}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-highlight" aria-hidden="true" />
            ) : (
              <Moon className="w-4 h-4 text-text" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE NAV BAR STRIP */}
      <div className="flex md:hidden items-center justify-around px-3 py-2 bg-surface border-t border-black/10 overflow-x-auto gap-1">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigatePage(item.id)}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold text-center transition-all ${
                isActive
                  ? "bg-highlight text-black border-2 border-black shadow-[1.5px_1.5px_0px_#000000] font-black"
                  : "text-text/75 hover:text-text"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
}
