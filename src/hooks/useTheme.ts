import { useEffect, useState } from "react";
import { PortfolioConfig } from "../types/portfolio";

export function useTheme(config: PortfolioConfig) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("portfolio_theme_mode");
      if (saved) return saved === "dark";
      if (config.theme.mode === "dark") return true;
      if (config.theme.mode === "light") return false;
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return false;
    }
  });

  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("portfolio_reduced_motion");
      if (saved !== null) return saved === "true";
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      return false;
    }
  });

  // Suntikkan CSS variables ke :root
  useEffect(() => {
    const root = document.documentElement;
    const theme = config.theme;
    const profile = config.profile;

    if (isDark) {
      root.classList.add("dark");
      root.style.setProperty("--primary", "#FF6B9D");
      root.style.setProperty("--secondary", "#6366F1");
      root.style.setProperty("--accent", "#10B981");
      root.style.setProperty("--highlight", "#FCD34D");
      root.style.setProperty("--background", "#0F172A");
      root.style.setProperty("--surface", "#1E293B");
      root.style.setProperty("--text", "#F8FAFC");
      root.style.setProperty("--shadow-offset", "5px 5px 0px #000000");
      root.style.setProperty("--shadow-offset-sm", "3px 3px 0px #000000");
      root.style.setProperty("--shadow-offset-lg", "7px 7px 0px #000000");
    } else {
      root.classList.remove("dark");
      root.style.setProperty("--primary", theme.primary);
      root.style.setProperty("--secondary", theme.secondary);
      root.style.setProperty("--accent", theme.accent);
      root.style.setProperty("--highlight", theme.highlight);
      root.style.setProperty("--background", theme.background);
      root.style.setProperty("--surface", theme.surface);
      root.style.setProperty("--text", theme.text);
      root.style.setProperty("--shadow-offset", theme.shadowOffset || "5px 5px 0px #111827");
      root.style.setProperty("--shadow-offset-sm", theme.shadowOffsetSm || "3px 3px 0px #111827");
      root.style.setProperty("--shadow-offset-lg", theme.shadowOffsetLg || "7px 7px 0px #111827");
    }

    root.style.setProperty("--border-width", theme.borderWidth || "3px");
    root.style.setProperty("--radius", theme.radius || "16px");
    root.style.setProperty("--font-heading", theme.fontHeading);
    root.style.setProperty("--font-body", theme.fontBody);
    root.style.setProperty("--tilt-degrees", `${profile.tiltDegrees || 2}deg`);

    // Daftarkan palet client accents
    if (theme.clientAccents && Array.isArray(theme.clientAccents)) {
      theme.clientAccents.forEach((color, idx) => {
        root.style.setProperty(`--client-accent-${idx}`, color);
      });
    }

    try {
      localStorage.setItem("portfolio_theme_mode", isDark ? "dark" : "light");
    } catch {
      // Abaikan jika ditolak
    }
  }, [isDark, config]);

  // Kelola class reduced-motion
  useEffect(() => {
    const root = document.documentElement;
    if (reducedMotion) {
      root.classList.add("reduced-motion");
    } else {
      root.classList.remove("reduced-motion");
    }
    try {
      localStorage.setItem("portfolio_reduced_motion", reducedMotion.toString());
    } catch {
      // Abaikan
    }
  }, [reducedMotion]);

  const toggleTheme = () => setIsDark((prev) => !prev);
  const toggleReducedMotion = () => setReducedMotion((prev) => !prev);

  return {
    isDark,
    toggleTheme,
    reducedMotion,
    toggleReducedMotion,
  };
}
