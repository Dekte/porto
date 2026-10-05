import { useState } from "react";
import {
  Mail,
  MessageCircle,
  MapPin,
  Check,
  Copy,
  Send,
  Calendar,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";
import { PortfolioConfig } from "../types/portfolio";

interface ContactSectionProps {
  config: PortfolioConfig;
}

export function ContactSection({ config }: ContactSectionProps) {
  const contact = config.contact || {
    badge: "LET'S CREATE TOGETHER",
    title: "Mulai Kolaborasi",
    subtitle: "Punya ide proyek video, kampanye brand baru, atau butuh video reels dengan karakter kuat? Mari wujudkan bersama.",
    email: config.profile.email || "rian.creative@example.com",
    emailLabel: "Email Resmi",
    copyEmailLabel: "Salin Email",
    copiedEmailLabel: "Email Tersalin!",
    sendEmailLabel: "Kirim Email",
    whatsapp: "+62 812-3456-7890",
    whatsappLabel: "WhatsApp Chat",
    chatWhatsappLabel: "Chat Sekarang",
    location: config.profile.location || "Blitar, Jawa Timur & Remote Worldwide",
    availability: "Tersedia untuk proyek freelance & kerja sama jangka panjang",
    formTitle: "Kirim Pesan Langsung",
    formSubtitle: "Isi formulir ringkas di bawah ini untuk mendiskusikan kebutuhan video atau desain grafis Anda.",
    nameLabel: "Nama Lengkap *",
    namePlaceholder: "Nama Anda / Perusahaan",
    emailInputLabel: "Alamat Email *",
    emailInputPlaceholder: "email@perusahaan.com",
    categoryLabel: "Kategori Proyek",
    categoryOptions: [
      { value: "reels", label: "Video Vertikal (Reels, TikTok, Shorts 9:16)" },
      { value: "motion-graphics", label: "Kinetic Motion & Graphic Design" },
      { value: "commercial-film", label: "Commercial Video & Documentary (16:9)" },
      { value: "color-grading", label: "Color Grading & Post-Production" },
      { value: "full-campaign", label: "Paket Kampanye Kreatif Lengkap" },
    ],
    messageLabel: "Detail Proyek & Gambaran *",
    messagePlaceholder: "Ceritakan tentang brand Anda, target audiens, deadline, atau referensi visual yang diinginkan...",
    submitButtonLabel: "Kirim Pengajuan Proyek",
    successTitle: "Pesan Siap Terkirim!",
    successMessage: "Klien email Anda telah dibuka dengan draf pesan otomatis. Kami akan segera merespons dalam 1x24 jam.",
    newInquiryButtonLabel: "Kirim Pesan Baru",
  };

  const defaultCategory =
    contact.categoryOptions && contact.categoryOptions.length > 0
      ? contact.categoryOptions[0].value
      : "reels";

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: defaultCategory,
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email).then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Letupkan konfeti pop saat berhasil submit form
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: [config.theme.primary, config.theme.secondary, config.theme.highlight],
    });

    // Buat mailto link untuk kenyamanan pengguna
    const subject = encodeURIComponent(`[Inquiry Proyek] ${formData.name} - ${formData.projectType}`);
    const body = encodeURIComponent(
      `Halo,\n\nNama saya: ${formData.name} (${formData.email})\nKategori proyek: ${formData.projectType}\n\nPesan:\n${formData.message}\n`
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="kontak"
      className="py-16 sm:py-24 relative bg-background border-b-[var(--border-width)] border-black"
      aria-label={contact.title}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 pop-badge bg-highlight text-black mb-3">
            <Sparkles className="w-3.5 h-3.5 fill-black" aria-hidden="true" />
            <span>{contact.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-text mb-4">
            {contact.title}
          </h2>

          <p className="text-base sm:text-lg text-text/80 leading-relaxed font-normal">
            {contact.subtitle}
          </p>
        </div>

        {/* 2-COLUMN GRID: DIRECT CONTACT CARDS & INQUIRY FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* KOLOM KIRI: KARTU KONTAK LANGSUNG */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* EMAIL CARD */}
            <div className="p-6 bg-surface rounded-2xl border-[var(--border-width)] border-black shadow-[4px_4px_0px_#000000] flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary text-white border-2 border-black shadow-[2px_2px_0px_#000000] flex items-center justify-center">
                  <Mail className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs font-bold text-text/60 uppercase tracking-wider block">
                    {contact.emailLabel || "Email Resmi"}
                  </span>
                  <a
                    href={`mailto:${contact.email}`}
                    className="font-bold text-base text-text hover:text-primary transition-colors"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-black/10">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="pop-btn-secondary text-xs py-2 px-3 flex items-center gap-1.5 flex-1 cursor-pointer"
                  aria-label={contact.copyEmailLabel || "Salin Alamat Email"}
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-accent" />
                      <span className="text-accent font-bold">
                        {contact.copiedEmailLabel || "Tersalin!"}
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{contact.copyEmailLabel || "Salin Email"}</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${contact.email}`}
                  className="pop-btn-primary text-xs py-2 px-3 flex items-center gap-1.5 flex-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{contact.sendEmailLabel || "Kirim Email"}</span>
                </a>
              </div>
            </div>

            {/* WHATSAPP CARD */}
            {contact.whatsapp && (
              <div className="p-6 bg-surface rounded-2xl border-[var(--border-width)] border-black shadow-[4px_4px_0px_#000000] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white border-2 border-black shadow-[2px_2px_0px_#000000] flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 fill-white" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-text/60 uppercase tracking-wider block">
                      {contact.whatsappLabel || "WhatsApp Chat"}
                    </span>
                    <span className="font-bold text-base text-text">
                      {contact.whatsapp}
                    </span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pop-btn-secondary text-xs py-2 px-3 shrink-0"
                >
                  {contact.chatWhatsappLabel || "Chat Sekarang"}
                </a>
              </div>
            )}

            {/* STATUS KETERSEDIAAN & LOKASI */}
            <div className="p-5 bg-background rounded-2xl border-2 border-black flex flex-col gap-3">
              {contact.availability && (
                <div className="flex items-start gap-2.5 text-xs font-bold text-text">
                  <Calendar className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{contact.availability}</span>
                </div>
              )}

              {contact.location && (
                <div className="flex items-start gap-2.5 text-xs font-semibold text-text/75">
                  <MapPin className="w-4 h-4 text-secondary shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{contact.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* KOLOM KANAN: FORMULIR INQUIRY PROYEK POP */}
          <div className="lg:col-span-7 bg-surface p-6 sm:p-8 rounded-2xl border-[var(--border-width)] border-black shadow-[6px_6px_0px_#000000]">
            <h3 className="text-xl sm:text-2xl font-black font-display text-text mb-2">
              {contact.formTitle || "Kirim Pesan Langsung"}
            </h3>
            <p className="text-xs sm:text-sm text-text/75 mb-6">
              {contact.formSubtitle ||
                "Isi formulir ringkas di bawah ini untuk mendiskusikan kebutuhan video atau desain grafis Anda."}
            </p>

            {submitted ? (
              <div className="p-6 bg-accent/20 border-2 border-accent rounded-xl flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000000]">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h4 className="text-lg font-black font-display text-text">
                  {contact.successTitle || "Pesan Siap Terkirim!"}
                </h4>
                <p className="text-xs text-text/80 max-w-sm">
                  {contact.successMessage ||
                    `Klien email Anda telah dibuka dengan draf pesan otomatis. Kami akan segera merespons dalam 1x24 jam.`}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="pop-btn-secondary text-xs py-1.5 px-4 mt-2 cursor-pointer"
                >
                  {contact.newInquiryButtonLabel || "Kirim Pesan Baru"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Nama */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-name"
                      className="text-xs font-black font-display uppercase tracking-wider text-text"
                    >
                      {contact.nameLabel || "Nama Lengkap *"}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder={contact.namePlaceholder || "Nama Anda / Brand"}
                      className="px-3.5 py-2.5 bg-background text-text text-sm rounded-xl border-2 border-black shadow-[2px_2px_0px_#000000] focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-email"
                      className="text-xs font-black font-display uppercase tracking-wider text-text"
                    >
                      {contact.emailInputLabel || "Alamat Email *"}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder={contact.emailInputPlaceholder || "email@perusahaan.com"}
                      className="px-3.5 py-2.5 bg-background text-text text-sm rounded-xl border-2 border-black shadow-[2px_2px_0px_#000000] focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                    />
                  </div>
                </div>

                {/* Jenis Proyek */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-project"
                    className="text-xs font-black font-display uppercase tracking-wider text-text"
                  >
                    {contact.categoryLabel || "Kategori Proyek"}
                  </label>
                  <select
                    id="contact-project"
                    value={formData.projectType}
                    onChange={(e) =>
                      setFormData({ ...formData, projectType: e.target.value })
                    }
                    className="px-3.5 py-2.5 bg-background text-text text-sm rounded-xl border-2 border-black shadow-[2px_2px_0px_#000000] focus:outline-none focus:ring-2 focus:ring-primary font-medium cursor-pointer"
                  >
                    {contact.categoryOptions?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Pesan */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-message"
                    className="text-xs font-black font-display uppercase tracking-wider text-text"
                  >
                    {contact.messageLabel || "Detail Proyek & Gambaran *"}
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder={
                      contact.messagePlaceholder ||
                      "Ceritakan tentang brand Anda, target audiens, deadline, atau referensi visual yang diinginkan..."
                    }
                    className="px-3.5 py-2.5 bg-background text-text text-sm rounded-xl border-2 border-black shadow-[2px_2px_0px_#000000] focus:outline-none focus:ring-2 focus:ring-primary font-medium resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="pop-btn-primary py-3 px-6 mt-2 flex items-center justify-center gap-2 font-display cursor-pointer"
                >
                  <span>{contact.submitButtonLabel || "Kirim Pengajuan Proyek"}</span>
                  <Send className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
