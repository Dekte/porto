import { useState, useEffect, useRef } from "react";
import { config } from "./config";
import { WorkItem } from "./types/portfolio";
import { useTheme } from "./hooks/useTheme";
import { SkipLink } from "./components/SkipLink";
import { Header, NavPage } from "./components/Header";
import { Hero } from "./components/Hero";
import { MarqueeSeparator } from "./components/MarqueeSeparator";
import { HighlightWorks } from "./components/HighlightWorks";
import { WorksSection } from "./components/WorksSection";
import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import { WorkViewer } from "./components/WorkViewer";
import { Footer } from "./components/Footer";

export default function App() {
  const { isDark, toggleTheme, reducedMotion, toggleReducedMotion } = useTheme(config);

  const [currentPage, setCurrentPage] = useState<NavPage>("home");
  const [activeWork, setActiveWork] = useState<WorkItem | null>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  // URL Hash Router: Sinkronisasi rute halaman dan deep-linking karya
  useEffect(() => {
    // Sinkronisasi judul halaman dari config
    document.title = `${config.profile.name} – ${config.profile.roleBadge}`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && config.profile.bio) {
      metaDesc.setAttribute("content", config.profile.bio);
    }

    const handleHashSync = () => {
      const hash = window.location.hash.toLowerCase();

      // Cek apakah hash mengarah ke halaman mandiri
      if (!hash || hash === "#" || hash === "#/" || hash === "#home" || hash === "#/home") {
        setCurrentPage("home");
        setActiveWork(null);
        return;
      }

      if (hash === "#karya" || hash === "#/karya") {
        setCurrentPage("karya");
        setActiveWork(null);
        return;
      }

      if (hash === "#tentang" || hash === "#/tentang") {
        setCurrentPage("tentang");
        setActiveWork(null);
        return;
      }

      if (hash === "#kontak" || hash === "#/kontak") {
        setCurrentPage("kontak");
        setActiveWork(null);
        return;
      }

      // Format hash pembuka karya: #/<work-id> atau #/<client-slug>/<work-id>
      const cleanHash = hash.replace(/^#\/?/, "");
      const segments = cleanHash.split("/");
      const workId = segments[segments.length - 1];

      const found = config.works.find((w) => w.id.toLowerCase() === workId);
      if (found) {
        setActiveWork(found);
      }
    };

    handleHashSync();
    window.addEventListener("hashchange", handleHashSync);
    return () => window.removeEventListener("hashchange", handleHashSync);
  }, []);

  // Berpindah antar halaman mandiri
  const handleNavigatePage = (page: NavPage) => {
    setCurrentPage(page);
    setActiveWork(null);
    window.location.hash = page === "home" ? "#/home" : `#/${page}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Buka modal viewer karya
  const handleOpenViewer = (work: WorkItem) => {
    triggerElementRef.current = document.activeElement as HTMLElement;
    setActiveWork(work);

    const clientSlug = encodeURIComponent(work.client.toLowerCase().replace(/\s+/g, "-"));
    window.location.hash = `#/${clientSlug}/${work.id}`;
  };

  // Tutup modal viewer karya
  const handleCloseViewer = () => {
    setActiveWork(null);
    window.location.hash = currentPage === "home" ? "#/home" : `#/${currentPage}`;
  };

  // Navigasi prev/next di dalam modal viewer
  const handleNavigateViewer = (nextWork: WorkItem) => {
    setActiveWork(nextWork);
    const clientSlug = encodeURIComponent(nextWork.client.toLowerCase().replace(/\s+/g, "-"));
    window.location.hash = `#/${clientSlug}/${nextWork.id}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-text transition-colors">
      {/* Aksesibilitas: Tombol lewati ke konten utama */}
      <SkipLink />

      {/* Header dengan Tab Navigasi Halaman Mandiri */}
      <Header
        config={config}
        currentPage={currentPage}
        onNavigatePage={handleNavigatePage}
        isDark={isDark}
        toggleTheme={toggleTheme}
        reducedMotion={reducedMotion}
        toggleReducedMotion={toggleReducedMotion}
      />

      {/* Landmark Utama: Menampilkan Halaman yang Dipilih */}
      <main id="main-content" className="flex-1">
        {/* ==============================================================
            1. HALAMAN UTAMA (HOME) - BERSIH: HERO + HIGHLIGHT KARYA + FOOTER
            ============================================================== */}
        {currentPage === "home" && (
          <>
            <Hero config={config} onNavigatePage={handleNavigatePage} />
            <MarqueeSeparator config={config} reducedMotion={reducedMotion} />
            <HighlightWorks
              config={config}
              reducedMotion={reducedMotion}
              onOpenViewer={handleOpenViewer}
              onNavigateToKarya={() => handleNavigatePage("karya")}
            />
          </>
        )}

        {/* ==============================================================
            2. HALAMAN KARYA (KARYA) - ARSIP LENGKAP & FILTER KLIEN
            ============================================================== */}
        {currentPage === "karya" && (
          <WorksSection
            config={config}
            reducedMotion={reducedMotion}
            onOpenViewer={handleOpenViewer}
          />
        )}

        {/* ==============================================================
            3. HALAMAN TENTANG (TENTANG) - CERITA, STATS, TOOLS, & LAYANAN
            ============================================================== */}
        {currentPage === "tentang" && (
          <AboutSection
            config={config}
            onNavigateToContact={() => handleNavigatePage("kontak")}
          />
        )}

        {/* ==============================================================
            4. HALAMAN KONTAK (KONTAK) - KARTU KONTAK & FORM INQUIRY PROYEK
            ============================================================== */}
        {currentPage === "kontak" && (
          <ContactSection config={config} />
        )}
      </main>

      {/* Footer Minimalis di Semua Halaman */}
      <Footer config={config} />

      {/* Fullscreen Video Overlay Viewer */}
      <WorkViewer
        work={activeWork}
        config={config}
        allWorks={config.works}
        onClose={handleCloseViewer}
        onNavigate={handleNavigateViewer}
        triggerElementRef={triggerElementRef.current}
      />

      {/* Schema.org Structured Data (JSON-LD) untuk SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: config.profile.name,
            jobTitle: config.profile.roleBadge,
            description: config.profile.bio,
            address: {
              "@type": "PostalAddress",
              addressLocality: config.profile.location,
            },
            email: config.profile.email,
            url: window.location.origin,
            sameAs: config.links.map((l) => l.url),
          }),
        }}
      />
    </div>
  );
}
