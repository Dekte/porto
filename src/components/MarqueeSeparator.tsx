import { Sparkles } from "lucide-react";
import { PortfolioConfig } from "../types/portfolio";

interface MarqueeSeparatorProps {
  config: PortfolioConfig;
  reducedMotion: boolean;
}

export function MarqueeSeparator({ config, reducedMotion }: MarqueeSeparatorProps) {
  const { profile, theme } = config;

  if (!theme.effects.marquee || !profile.marqueeText) {
    return null;
  }

  // Teks diulang agar pengguliran marquee mulus tanpa jeda
  const repeatText = Array(4).fill(profile.marqueeText).join(" ");

  return (
    <div
      className="relative w-full overflow-hidden bg-highlight text-black py-3 border-y-[var(--border-width)] border-black select-none z-10"
      aria-hidden="true"
    >
      <div
        className={`flex whitespace-nowrap ${
          reducedMotion ? "" : "animate-pop-marquee"
        }`}
      >
        <div className="flex items-center gap-6 text-sm sm:text-base font-black font-display tracking-wider uppercase px-4">
          <span>{repeatText}</span>
          <Sparkles className="w-4 h-4 fill-black shrink-0 inline-block" />
        </div>
        <div className="flex items-center gap-6 text-sm sm:text-base font-black font-display tracking-wider uppercase px-4">
          <span>{repeatText}</span>
          <Sparkles className="w-4 h-4 fill-black shrink-0 inline-block" />
        </div>
      </div>
    </div>
  );
}
