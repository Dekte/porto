import {
  ArrowUp,
  Instagram,
  Youtube,
  Linkedin,
  MessageCircle,
  Mail,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { PortfolioConfig } from "../types/portfolio";

interface FooterProps {
  config: PortfolioConfig;
}

export function Footer({ config }: FooterProps) {
  const { profile, links } = config;
  const currentYear = new Date().getFullYear();

  const footer = config.footer || {
    copyrightText: "All rights reserved.",
    backToTopText: "Kembali ke Atas",
  };

  const renderIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case "instagram":
        return <Instagram className="w-4 h-4" aria-hidden="true" />;
      case "youtube":
        return <Youtube className="w-4 h-4" aria-hidden="true" />;
      case "linkedin":
        return <Linkedin className="w-4 h-4" aria-hidden="true" />;
      case "whatsapp":
      case "message-circle":
        return <MessageCircle className="w-4 h-4" aria-hidden="true" />;
      case "mail":
      case "email":
        return <Mail className="w-4 h-4" aria-hidden="true" />;
      default:
        return <ExternalLink className="w-4 h-4" aria-hidden="true" />;
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="kontak-footer"
      className="bg-surface text-text py-12 border-t-[var(--border-width)] border-black"
      aria-label="Informasi Kontak dan Tautan Sosial"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        {/* TOP ROW: PROFILE SUMMARY & SOCIAL BUTTONS */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b-2 border-black/10">
          <div>
            <h3 className="text-2xl font-black font-display tracking-tight text-text">
              {profile.name}
            </h3>
            <p className="text-sm text-text/75 font-medium mt-1">
              {profile.roleBadge}
            </p>
            {profile.location && (
              <p className="text-xs text-text/60 flex items-center gap-1.5 mt-2">
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{profile.location}</span>
              </p>
            )}
          </div>

          {/* SOCIAL LINKS ARRAY */}
          <div className="flex flex-wrap items-center gap-2.5">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-background hover:bg-highlight text-text font-bold text-xs rounded-xl border-2 border-black shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 pop-focus-ring cursor-pointer"
                aria-label={`${link.label} (buka di tab baru)`}
              >
                {renderIcon(link.icon)}
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* BOTTOM ROW: EMAIL, COPYRIGHT & BACK TO TOP */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-text/70">
          <div className="flex items-center gap-2">
            <span>
              &copy; {currentYear} {profile.name}. {footer.copyrightText || "All rights reserved."}
            </span>
            {profile.email && (
              <>
                <span aria-hidden="true">·</span>
                <a
                  href={`mailto:${profile.email}`}
                  className="hover:text-primary underline underline-offset-2 transition-colors"
                >
                  {profile.email}
                </a>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-background hover:bg-slate-100 text-text border-2 border-black shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 pop-focus-ring cursor-pointer"
            aria-label={footer.backToTopText || "Kembali ke Atas"}
          >
            <span>{footer.backToTopText || "Kembali ke Atas"}</span>
            <ArrowUp className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
