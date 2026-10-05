import { PortfolioConfig } from "./types/portfolio";

/**
 * ====================================================================
 * MASTER KONFIGURASI PORTOFOLIO (PopStudio)
 * ====================================================================
 * Format: TypeScript (.ts) - Format paling kompatibel & fleksibel untuk React + Vite.
 *
 * KEUNGGULAN FORMAT .ts:
 * 1. Autocomplete & Saran Otomatis (IntelliSense) di editor (VS Code, Cursor, dll.)
 * 2. Typo-proof: Jika ada salah ketik field, editor langsung memberi tahu
 * 3. Bebas memberi komentar panduan di setiap baris (tidak bisa di JSON)
 * 4. Mendukung kutip tunggal, ganda, backticks multiline, dan trailing commas
 * ====================================================================
 */

export const config: PortfolioConfig = {
  // ------------------------------------------------------------------
  // 1. PROFIL & HERO UTAMA (HERO SECTION)
  // ------------------------------------------------------------------
  profile: {
    // Nama lengkap untuk judul situs, header, dan SEO
    name: "Dycta Zaky Firmansyah",

    // Badge profesi di atas headline (latar kuning cerah, ikon bintang pop)
    roleBadge: "VIDEO EDITOR",

    // Badge status ketersediaan kerja (latar putih, titik hijau berkedip)
    statusBadge: {
      show: true,
      text: "Open for freelance & collaborations",
      dot: "green", // "green" | "yellow" | "purple" | "none"
    },

    // Headline raksasa hero dipecah tiga bagian:
    // - before: teks sebelum kotak warna
    // - highlight: teks di dalam kotak pop miring (bisa diatur kemiringannya di tiltDegrees)
    // - after: teks setelah kotak warna
    headline: {
      before: "Edit,",
      highlight: "KONTENMU",
      after: "lebih mudah.",
    },

    // Paragraf biografi singkat di Hero (2-5 kalimat yang ramah dan to-the-point)
    bio: "Holla!!! I'm a Video Editor, Graphic Designer, and Content Creator with 4+ years of experience producing video and visualcontent for social media, from concept to editing, design, and publishing. Proficient in Adobe Creative Cloud(Premiere Pro, After Effects, Photoshop, Illustrator).",

    // Tombol aksi utama di Hero
    primaryCta: {
      label: "Lihat Semua Karya",
      target: "#karya",
      icon: "arrow-up-right",
    },

    // Tombol aksi kedua di Hero
    secondaryCta: {
      label: "Ajak Kolaborasi",
      url: "#kontak",
    },

    // Foto utama hero (bisa URL lokal, URL Cloudinary, atau URL gambar web)
    photo: "https://res.cloudinary.com/dwynj78fg/image/upload/v1790952265/DSC99_o1vjkt.jpg",
    photoAlt: "Foto Rian Pratama tersenyum ramah dengan headphone dan kamera mirrorless",

    // Kartu kecil keterangan di pojok bawah foto
    photoCaption: {
      title: "CONTENT CREATOR",
      location: "Blitar & Remote, Indonesia",
    },

    // Stiker biru muda miring di pojok kanan atas bingkai foto
    // action: "confetti" (hujan konfeti pop) | "link" (buka tautan url) | "none"
    sticker: {
      text: "KLIK ME! ✨",
      action: "confetti",
      url: "",
    },

    // Derajat kemiringan bingkai foto dan kotak highlight (angka derajat, 0 = lurus)
    tiltDegrees: 2.5,

    // Kontak & lokasi umum
    email: "jobfordekte@gmail.com",
    location: "Blitar, Jawa Timur, Indonesia",

    // Teks berjalan di marquee pemisah antara Hero dan Karya (kosongkan "" untuk menonaktifkan)
    marqueeText: "VIDEO EDITING · MOTION GRAPHICS · BRAND IDENTITY · COLOR GRADING · REELS & TIKTOK · KINETIC TYPOGRAPHY · COMMERCIAL ADS · ",
  },

  // ------------------------------------------------------------------
  // 2. NAVIGASI NAVBAR (LABEL MENU HEADER & MOBILE BAR)
  // ------------------------------------------------------------------
  navigation: {
    home: "Home",
    karya: "Karya",
    tentang: "Tentang",
    kontak: "Kontak",
  },

  // ------------------------------------------------------------------
  // 3. HIGHLIGHT KARYA (DI HALAMAN UTAMA / HOME)
  // ------------------------------------------------------------------
  highlight: {
    badge: "KARYA PILIHAN",
    title: "Highlight Karya",
    description: "Cuplikan karya terpilih dari kampanye video reels vertikal hingga film komersial sinematik.",
    ctaLabel: "Buka Arsip Lengkap",
    reelsTitle: "Featured Reels",
    reelsSubtitle: "Putar otomatis tanpa suara saat terlihat",
    landscapeTitle: "Featured Commercial & Film",
    bannerTitle: "Ingin menjelajahi semua video berdasarkan klien & proyek?",
    bannerDescription: "Halaman karya memuat filter interaktif, takarir, dan seluruh koleksi reels & video komersial.",
    bannerCta: "Jelajahi Halaman Karya",
  },

  // ------------------------------------------------------------------
  // 4. BAGIAN ARSIP LENGKAP (HALAMAN KARYA)
  // ------------------------------------------------------------------
  worksSection: {
    badge: "PORTFOLIO SHOWCASE",
    title: "Karya Pilihan",
    allFilterLabel: "Semua",
    portraitSubtitle: "karya (9:16 & 4:3)",
    landscapeSubtitle: "karya (16:9 widescreen)",
    emptyMessage: "Belum ada karya untuk filter klien ini.",
    emptyButtonLabel: "Tampilkan Semua Karya",
  },

  // ------------------------------------------------------------------
  // 5. HALAMAN TENTANG (HALAMAN TENTANG)
  // ------------------------------------------------------------------
  about: {
    badge: "BEHIND THE CREATIVE",
    title: "Tentang Saya",
    headline: "Video Editor & Graphic Designer Turning Raw Ideas into Scroll-Stopping Content.",
    story: [
      "Saya Dycta, seorang video editor, graphic designer, dan content creator yang mulai berkarya sejak 2022. Berawal dari mengedit video untuk UMKM lokal, kini saya menangani konten untuk berbagai brand, mulai dari otomotif, food, hingga pendidikan, dengan hasil video yang menembus puluhan ribu views.",
      "Bagi saya, konten yang kuat bukan sekadar potongan cepat atau efek yang ramai. Visual, motion, ritme (pacing), dan pemilihan audio harus berpadu agar pesannya jelas, menarik perhatian sejak detik pertama, dan mudah diingat penonton. Dengan Adobe Photoshop, Illustrator, Premiere Pro, dan After Effects, saya mengubah ide mentah menjadi video dan visual yang konsisten dengan identitas brand."
    ],
    // Software & keahlian teknis
    skillsTitle: "SOFTWARE & SPESIALISASI",
    skills: [
      { name: "Premiere Pro", category: "Video Editing", icon: "video" },
      { name: "After Effects", category: "Motion Graphics", icon: "sparkles" },
      { name: "CapCut", category: "Color Grading", icon: "palette" },
      { name: "Photoshop", category: "Graphic Design", icon: "image" },
      { name: "Illustrator", category: "Vector & Branding", icon: "pen-tool" },
      { name: "Sound Design", category: "Audio Post", icon: "volume-2" },
    ],
    // Layanan inti
    servicesTitle: "LAYANAN UTAMA",
    services: [
      {
        number: "01",
        title: "Short-Form Reels & TikTok",
        description: "Editing vertikal 9:16 / horizontal 4:3 dengan hook visual kuat, pacing cepat, dan efek audio presisi untuk retensi audiens tinggi.",
        tag: "High Retention"
      },
      {
        number: "02",
        title: "Kinetic Motion & Graphic Design",
        description: "Animasi tipografi berkarakter tebal, identitas visual brand bergerak, dan aset promosi digital pop.",
        tag: "Motion Identity"
      },
      {
        number: "03",
        title: "Commercial & Cinematic Ads",
        description: "Video profil brand 16:9, dokumenter kampanye, podcast, dan commercial ads dengan color grading sinematik.",
        tag: "Cinematic"
      }
    ],
    // Statistik pencapaian
    stats: [
      { value: "70+", label: "Video Diproduksi" },
      { value: "2.4M+", label: "Total Views Organik" },
      { value: "100%", label: "Komitmen Deadline" }
    ],
    // Banner ajakan kolaborasi di bawah halaman tentang
    calloutTitle: "Tertarik berkolaborasi dalam proyek video atau desain?",
    calloutSubtitle: "Jadwalkan diskusi santai atau kirimkan brief proyek Anda secara langsung.",
    calloutButton: "Hubungi Sekarang",
  },

  // ------------------------------------------------------------------
  // 6. HALAMAN KONTAK (HALAMAN KONTAK)
  // ------------------------------------------------------------------
  contact: {
    badge: "LET'S CREATE TOGETHER",
    title: "Mulai Kolaborasi",
    subtitle: "Punya ide proyek video, kampanye brand baru, atau butuh jasa editing vidio secara cepat dan mudah? hubungi saya secepatnya ya!.",
    email: "jobfordekte@gmail.com",
    emailLabel: "Email Resmi",
    copyEmailLabel: "Salin Email",
    copiedEmailLabel: "Email Tersalin!",
    sendEmailLabel: "Kirim Email",
    whatsapp: "+62 856-0888-5755",
    whatsappLabel: "WhatsApp Chat",
    chatWhatsappLabel: "Chat Sekarang",
    location: "Blitar, Jawa Timur & Remote Worldwide",
    availability: "Tersedia untuk proyek freelance & kerja sama jangka panjang",
    // Formulir pengajuan proyek
    formTitle: "Kirim Pesan Langsung",
    formSubtitle: "Isi formulir ringkas di bawah ini untuk mendiskusikan kebutuhan video atau desain grafis Anda.",
    nameLabel: "Nama Lengkap *",
    namePlaceholder: "Nama Anda / Perusahaan",
    emailInputLabel: "Alamat Email *",
    emailInputPlaceholder: "email@perusahaan.com",
    categoryLabel: "Kategori Proyek",
    categoryOptions: [
      { value: "reels", label: "Video Vertikal (Reels, TikTok, Shorts 9:16)" },
      { value: "Education-Vidio", label: "Video Pembelajaran (sertifikasi dosen, kkn, vidio pembelajaran )" },
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
  },

  // ------------------------------------------------------------------
  // 7. VIEWER VIDEO LAYAR PENUH (MODAL OVERLAY)
  // ------------------------------------------------------------------
  viewer: {
    loadingText: "Memuat Media...",
    errorTitle: "Video tidak dapat diputar saat ini.",
    errorMessage: "File mungkin sedang diproses atau URL video tidak dapat diakses.",
    directLinkText: "Buka Tautan Langsung",
    copyLinkText: "Salin Link",
    copiedLinkText: "Tersalin!",
    prevLabel: "Karya Sebelumnya",
    nextLabel: "Karya Berikutnya",
    closeLabel: "Tutup (Esc)",
  },

  // ------------------------------------------------------------------
  // 8. FOOTER
  // ------------------------------------------------------------------
  footer: {
    copyrightText: "All rights reserved.",
    backToTopText: "Kembali ke Atas",
  },

  // ------------------------------------------------------------------
  // 9. ELEMEN UI & AKSESIBILITAS
  // ------------------------------------------------------------------
  ui: {
    skipToContent: "Lewati ke konten utama",
    reducedMotionOnText: "Animasi Mati",
    reducedMotionOffText: "Kurangi Gerak",
    themeLightTooltip: "Beralih ke Mode Gelap",
    themeDarkTooltip: "Beralih ke Mode Terang",
  },

  // ------------------------------------------------------------------
  // 10. LINK SOSIAL & KONTAK
  // ------------------------------------------------------------------
  links: [
    { label: "Instagram", url: "https://instagram.com/separuh_manusiaa", icon: "instagram" },
    { label: "TikTok", url: "https://tiktok.com/editor_blitar", icon: "tiktok" },
    { label: "Email", url: "mailto:dictazaki@gmail.com", icon: "email" },
    { label: "WhatsApp", url: "https://wa.me/6285608885755", icon: "message-circle" },
  ],

  // ------------------------------------------------------------------
  // 11. TEMA & WARNA (DISUNTIKKAN KE CSS VARIABLES)
  // ------------------------------------------------------------------
  theme: {
    primary: "#FF4D8D",      // Merah muda pop energik
    secondary: "#4361EE",    // Biru elektrik / kobalt
    accent: "#06D6A0",       // Hijau mint segar
    highlight: "#FFD166",    // Kuning lemon cerah untuk kotak teks highlight
    background: "#FDFBF7",   // Krem hangat bersih untuk kanvas utama
    surface: "#FFFFFF",      // Putih bersih untuk kartu
    text: "#111827",         // Teks utama hitam-slate tebal

    // Palet warna khusus aksen label client (dipilih bergantian secara otomatis)
    clientAccents: [
      "#FFD166", // Kuning
      "#06D6A0", // Hijau
      "#4361EE", // Biru
      "#FF4D8D", // Pink
      "#9B5DE5", // Ungu
    ],

    // Tipografi dari Google Fonts
    fontHeading: "Syne, sans-serif",
    fontBody: "Plus Jakarta Sans, sans-serif",

    // Garis luar (outline) dan bayangan offset keras
    borderWidth: "3px",
    radius: "16px",
    shadowOffset: "5px 5px 0px #111827",
    shadowOffsetSm: "3px 3px 0px #111827",
    shadowOffsetLg: "7px 7px 0px #111827",

    // Toggle efek visual
    effects: {
      sticker: true,         // Tampilkan stiker pojok foto
      marquee: true,         // Tampilkan pita teks berjalan
      hoverBounce: true,     // Efek membal halus saat kursor mengarah ke tombol
      confetti: true,        // Efek semburan konfeti pada stiker
      reducedMotionAllowed: true, // Beri tombol pengontrol animasi di header
    },

    // Mode tampilan awal ("light" | "dark" | "system")
    mode: "light",
  },

  // ------------------------------------------------------------------
  // 12. PENGATURAN CLOUDINARY
  // ------------------------------------------------------------------
  cloudinary: {
    cloudName: "dwynj78fg",       // Ganti dengan Cloud Name akun Cloudinary Anda
    defaultTransform: "f_auto,q_auto", // Optimasi format & kompresi otomatis
  },

  // ------------------------------------------------------------------
  // 13. PENGATURAN BAGIAN KARYA
  // ------------------------------------------------------------------
  sections: [
    { id: "portrait",  label: "Reels & Shorts", show: true }, // Rasio < 1.5 (9:16, 4:3, 1:1)
    { id: "landscape", label: "Videos & Films", show: true }, // Rasio >= 1.5 (16:9, 21:9)
  ],

  // ------------------------------------------------------------------
  // 14. DAFTAR KARYA (WORKS)
  // Menambah karya cukup salin satu blok objek di bawah.
  // ------------------------------------------------------------------
  works: [
    // --- 1. REELS PORTRAIT 9:16 ---
    {
      id: "proses-diamin",
      type: "video",
      ratio: "9:16",
      section: "portrait",
      title: "Proses di AAMIN buakn rahasia",
      client: "PT AAMIN",
      project: "Branding AAMIN",
      year: 2026,
      tags: ["reels", "P3MI", "sound-design"],
      src: "https://res.cloudinary.com/dwynj78fg/video/upload/v1791092809/Proses_di_PT_AAMIN_Bukan_Rahasia_Reel_1_qtdok2.mp4",
      poster: "https://res.cloudinary.com/dwynj78fg/image/upload/v1791128519/cover_Saatnya_Pilih_yang_Resmi_Legal_dan_Gratis_di_PT_AAMIN_rngs7z.jpg",
      alt: "Video edukasi tentang pemberangkatan calon PMI di PT AAMIN",
      captions: "",
      featured: false,
    },
    {
      id: "ke-singapura-tanpa-calo",
      type: "video",
      ratio: "9:16",
      section: "portrait",
      title: "mudahnya berangkat ke singapura",
      client: "PT AAMIN",
      project: "Branding AAMIN",
      year: 2026,
      tags: ["P3MI", "Talking-Head", "reels"],
      src: "https://res.cloudinary.com/dwynj78fg/video/upload/v1791093377/ke_singapura_nggak_pake_calo_to4jaa.mp4",
      poster: "https://res.cloudinary.com/dwynj78fg/image/upload/v1791129395/Buka-bukaan_tentang_kerja_resmi_gratis_tanpa_potong_gaji_di_Singapura_z7hh77.jpg",
      alt: "Video edukasi untuk mmeperkuat branding tentang edukasi pendaftaran",
      captions: "",
      featured: false,
    },
    {
      id: "Ke-singapura-dengan-mudah",
      type: "video",
      ratio: "9:16",
      section: "portrait",
      title: "Berangkat ke singapura tanpa calo",
      client: "PT AAMIN",
      project: "Branding AAMIN",
      year: 2026,
      tags: ["P3MI", "Talking-Head", "reels"],
      src: "https://res.cloudinary.com/dwynj78fg/video/upload/v1791092446/JANGAN_DI-SKIP_kalau_kamu_masih_DITAWARI_CALO_tclurs.mp4",
      poster: "/src/assets/images/poster_reels_coffee_1791083444482.jpg",
      alt: "Video edukasi tentang di PT AAMIN tidak memakai CALO",
      captions: "",
      featured: true,
    },
    {
      id: "MOTION-IBBS",
      type: "Motion",
      ratio: "9:16",
      section: "portrait",
      title: "Dunia anak hari ini tidak lagi sama",
      client: "IBBS",
      project: "Edukasi IBBS",
      year: 2026,
      tags: ["School", "Educaion", "Motion"],
      src: "https://res.cloudinary.com/dwynj78fg/video/upload/v1791092553/ibbs_fiks_banget_a7w1us.mp4",
      poster: "https://res.cloudinary.com/dwynj78fg/image/upload/v1791130239/cover_harusnya_oke_dw2hlv.png",
      alt: "Video edukasi tentang responsibility anak dan orang tua dalam menghadapi masadepan",
      captions: "",
      featured: true,
    },
    {
      id: "do-and-dont-IBBS",
      type: "video",
      ratio: "9:16",
      section: "portrait",
      title: "do and dont",
      client: "IBBS",
      project: "Edukasi IBBS",
      year: 2026,
      tags: ["School", "Educaion", "REELS"],
      src: "https://res.cloudinary.com/dwynj78fg/video/upload/v1791092426/do_and_dont_bvfhwm.mp4",
      poster: "https://res.cloudinary.com/dwynj78fg/image/upload/v1791130456/Do_Don_t_School_Rules_Edition_-Reels-Cover_Reels_2_zoug4p.png",
      alt: "Video edukasi tentang peraturan dan kebiasaan di sekolah",
      captions: "",
      featured: false,
    },
    {
      id: "Hari-Guru",
      type: "Motion",
      ratio: "9:16",
      section: "portrait",
      title: "Hari guru",
      client: "Futureminds",
      project: "Greeting",
      year: 2026,
      tags: ["School", "Educaion", "REELS"],
      src: "https://res.cloudinary.com/dwynj78fg/video/upload/v1791091346/Memperingat_Hari_Guru_Nasional_-_Reels_-_Cove_hlncii.mp4",
      poster: "https://res.cloudinary.com/dwynj78fg/image/upload/v1791130900/Memperingat_Hari_Guru_Nasional_wnllyl.png",
      alt: "Video Motion greeting",
      captions: "",
      featured: false,
    },
    {
      id: "International-Teacher-day",
      type: "Motion",
      ratio: "9:16",
      section: "portrait",
      title: "Internatioanl Teacher Day",
      client: "Futureminds",
      project: "Greeting",
      year: 2026,
      tags: ["School", "Educaion", "REELS", "Motion"],
      src: "https://res.cloudinary.com/dwynj78fg/video/upload/v1791090384/happy_world_teachers_day_kju8xb.mp4",
      poster: "https://res.cloudinary.com/dwynj78fg/image/upload/v1791131901/Screenshot_2026-10-04_233755_g6lzcl.jpg",
      alt: "Video Motion greeting",
      captions: "",
      featured: true,
    },
    {
      id: "Cliping-content-futureminds",
      type: "Vidio",
      ratio: "9:16",
      section: "portrait",
      title: "jangan ngerasa pinter jerome",
      client: "Futureminds",
      project: "Cliping",
      year: 2026,
      tags: ["School", "Educaion", "REELS", "Motion"],
      src: "https://res.cloudinary.com/dwynj78fg/video/upload/v1791092085/Jangan_Ngerasa_Pinter_Sebelum_Kamu_Buktikan_d_4_reqjqp.mp4",
      poster: "https://res.cloudinary.com/dwynj78fg/image/upload/v1791136900/Jangan_Ngerasa_Pinter_Sebelum_Kamu_Buktikan_di_Panggung_Olimpiade_pdznej.png",
      alt: "Video Clippping potongan dari jerome polin dan maudy ayunda untuk motivasi",
      captions: "",
      featured: false,
    },
    {
      id: "Teaser-Reapz",
      type: "Motion",
      ratio: "9:16",
      section: "portrait",
      title: "Teaser",
      client: "REAPZ",
      project: "Teaser",
      year: 2026,
      tags: ["Snack", "hot", "REELS"],
      src: "https://res.cloudinary.com/dwynj78fg/video/upload/v1791091370/reapzz_fix_zxhkzs.mp4",
      poster: "https://res.cloudinary.com/dwynj78fg/image/upload/v1791132237/red_1reapz_reels_teaser_pcw2ko.jpg",
      alt: "Teaser Motion REAPZ IDN",
      captions: "",
      featured: true,
    },
     {
      id: "Curhat-dapat-reapz",
      type: "Vidio",
      ratio: "9:16",
      section: "portrait",
      title: "Curhat dapat reapz",
      client: "REAPZ",
      project: "KONTEN",
      year: 2026,
      tags: ["Snack", "Hot", "REELS"],
      src: "https://res.cloudinary.com/dwynj78fg/video/upload/v1791092373/luapkan_amarah_dapat_reapz_2_ylrtrt.mp4",
      poster: "https://res.cloudinary.com/dwynj78fg/image/upload/v1791132710/Screenshot_2026-10-04_235134_s4emmc.jpg",
      alt: "Video kontent untuk meneriakan kegelisahan dan mendapatkan REAPZ",
      captions: "",
      featured: false,
    },
     {
      id: "lEBIH-PEDAS-DARI-TETANGGA",
      type: "Vidio",
      ratio: "9:16",
      section: "portrait",
      title: "Lebih Pedas Dari Tetangga",
      client: "REAPZ",
      project: "KONTEN",
      year: 2026,
      tags: ["Snack", "Hot", "REELS"],
      src: "https://res.cloudinary.com/dwynj78fg/video/upload/v1791135077/reapz_rumpi_tetangga_5_irjmeu.mp4",
      poster: "https://res.cloudinary.com/dwynj78fg/image/upload/v1791132791/1PEDESNYA_NGALAHIN_MULUT_TETANGGA_kxud4h.png",
      alt: "Video kontent untuk meneriakan kegelisahan dan mendapatkan REAPZ",
      captions: "",
      featured: false,
    },
     {
      id: "Melaty-ratu",
      type: "Vidio",
      ratio: "9:16",
      section: "portrait",
      title: "PBAK Perkenalan Melaty ratu",
      client: "etc",
      project: "Konten",
      year: 2026,
      tags: ["School", "UIN SATU", "REELS"],
      src: "https://res.cloudinary.com/dwynj78fg/video/upload/v1791136127/pkkb_melaty_ratu_yttj7a.mp4",
      poster: "https://res.cloudinary.com/dwynj78fg/image/upload/v1791137134/Screenshot_2026-10-05_010515_vtblj8.jpg",
      alt: "Video REELS perkenalan PKKMB/Ospek Kampus",
      captions: "",
      featured: false,
    },

    // --- 2. VIDEO 4:3 (RETRO / EDITORIAL) ---
    {
      id: "my-simple animation",
      type: "video",
      ratio: "16:9",
      section: "portrait",
      title: "simple animation",
      client: "etc",
      project: "project tugas akhir",
      year: 2025,
      tags: ["motion-graphics", "typography", "branding"],
      src: "https://res.cloudinary.com/dwynj78fg/video/upload/v1791134418/smoke_lodczs.mp4",
      poster: "https://res.cloudinary.com/dwynj78fg/image/upload/v1791159797/Screenshot_2026-10-05_072243_lx6mpc.jpg",
      alt: "simple animasi",
      captions: "",
      featured: true,
    },
    {
      id: "konten-promosi",
      type: "video",
      ratio: "4:3",
      section: "portrait",
      title: "konten promosi",
      client: "personal",
      project: "promosi",
      year: 2026,
      tags: ["documentary", "retro", "color-grading"],
      src: "https://res.cloudinary.com/dwynj78fg/video/upload/v1791134680/jobseeker_yn48mx.mp4",
      poster: "https://res.cloudinary.com/dwynj78fg/image/upload/v1791159974/Screenshot_2026-10-05_072347_urfg1s.jpg",
      alt: "vidio konten unruk promosi",
      captions: "",
      featured: true,
    },
    {
      id: "motion-full",
      type: "video",
      ratio: "16:9",
      section: "portrait",
      title: "motion full",
      client: "personal",
      project: "promosi",
      year: 2026,
      tags: ["documentary", "retro", "color-grading"],
      src: "https://res.cloudinary.com/dwynj78fg/video/upload/v1791091074/jadi_jytq6f.mp4",
      poster: "https://res.cloudinary.com/dwynj78fg/image/upload/v1791160128/Screenshot_2026-10-05_072708_kvphbf.jpg",
      alt: "vidio konten full motion graphic",
      captions: "",
      featured: true,
    },
    {
      id: "full-vfx",
      type: "video",
      ratio: "16:9",
      section: "portrait",
      title: "vfx",
      client: "personal",
      project: "skill",
      year: 2026,
      tags: ["documentary", "retro", "color-grading"],
      src: "https://res.cloudinary.com/dwynj78fg/video/upload/v1791091244/faall4_earzxw.mp4",
      poster: "https://res.cloudinary.com/dwynj78fg/image/upload/v1791159973/Screenshot_2026-10-05_072458_h3td8i.jpg",
      alt: "vidio visual fx",
      captions: "",
      featured: false,
    },
     {
      id: "full-vfx-2",
      type: "video",
      ratio: "16:9",
      section: "portrait",
      title: "vfx",
      client: "personal",
      project: "skill",
      year: 2026,
      tags: ["documentary", "retro", "color-grading"],
      src: "https://res.cloudinary.com/dwynj78fg/video/upload/v1791090269/fiksss_scbyr7.mp4",
      poster: "https://res.cloudinary.com/dwynj78fg/image/upload/v1791159975/Screenshot_2026-10-05_072409_u1viwg.jpg",
      alt: "vidio visual fx text",
      captions: "",
      featured: false,
    },

    // --- 3. VIDEO LANDSCAPE 16:9 ---
    {
      id: "Jurnal-mahasiswa-akhir",
      type: "youtube",
      ratio: "16:9",
      section: "landscape",
      title: "podcast/story telling",
      client: "etc",
      project: "information",
      year: 2025,
      tags: ["film", "commercial", "cinematic"],
      src: "SWm2sM61oDc",
      poster: "https://res.cloudinary.com/dwynj78fg/image/upload/v1791160128/Screenshot_2026-10-05_072801_kphgpq.jpg",
      alt: "Film dokumenter sinematik 16:9 tentang kreator muda perkotaan di malam hari",
      captions: "",
      featured: true,
    },
    {
      id: "Sertifikasi-fauzan",
      type: "youtube",
      ratio: "16:9",
      section: "landscape",
      title: "sertifikasi dosen",
      client: "etc",
      project: "sertifikasi dosen",
      year: 2023,
      tags: ["storytelling", "cinematic", "fnb"],
      src: "khq8Jf1JwVI",
      poster: "https://res.cloudinary.com/dwynj78fg/image/upload/v1791160941/Screenshot_2026-10-05_074127_iysyou.jpg",
      alt: "pembuatan vidio sertifikasi dosen",
      captions: "",
      featured: false,
    },
    {
      id: "Promosi-usaha",
      type: "youtube",
      ratio: "16:9",
      section: "landscape",
      title: "vidio promosi tempat usaha",
      client: "etc",
      project: "usaha",
      year: 2025,
      tags: ["showreel", "motion-graphics", "vfx"],
      src: "SQRtIPFs8BE", // YouTube Video ID
      poster: "https://res.cloudinary.com/dwynj78fg/image/upload/v1791160941/Screenshot_2026-10-05_074202_hs89xr.jpg",
      alt: "vidio promosi usaha",
      captions: "",
      featured: false,
    },
  ],
};
