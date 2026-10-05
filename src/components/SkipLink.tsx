import { config } from "../config";

export function SkipLink() {
  const text = config.ui?.skipToContent || "Lewati ke konten utama";
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:font-bold focus:border-3 focus:border-black focus:shadow-[4px_4px_0px_#000000] focus:rounded-lg focus:outline-none font-display text-sm"
    >
      {text}
    </a>
  );
}
