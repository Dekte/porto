# PopStudio – Portfolio Video Editor & Graphic Designer

Website portofolio bergaya **POP Neo-Brutalism** yang bersih, berkarakter kuat, cepat, dan sepenuhnya aksesibel (target **WCAG 2.2 AA**).

> ⭐️ **ATURAN 1-FILE: 100% KONTEN WEBSITE HANYA DIEDIT DARI `src/config.ts`**
>
> Anda tidak perlu membuka atau menyentuh file kode React/CSS manapun. Cukup ubah `src/config.ts` untuk mengganti profil hero, teks navigasi, highlight karya, arsip video, cerita & statistik tentang saya, form kontak, teks viewer, footer, warna tema, hingga font!

---

## 💡 Mengapa Menggunakan Format `src/config.ts`? (Paling Fleksibel & Kompatibel)

File konfigurasi ini menggunakan format **TypeScript (`.ts`)**, yang merupakan standar paling fleksibel dan andal untuk proyek React modern:

| Format | Kelebihan | Kekurangan | Kesimpulan |
| :--- | :--- | :--- | :--- |
| **`.json`** | Format data universal | ❌ **TIDAK BISA DIBERI KOMENTAR** (menghilangkan petunjuk bahasa Indonesia).<br>❌ Sangat rapuh (koma di akhir baris langsung error).<br>❌ Tidak ada saran otomatis (*autocomplete*). | Kurang cocok untuk file konfigurasi panduan manusia |
| **`.jsx`** | Cocok untuk komponen React | ❌ Dirancang untuk menulis tag HTML/komponen, bukan struktur data bersih. | Tidak tepat untuk data konfigurasi |
| **`.js`** | Mudah diedit | ⚠️ Tidak ada deteksi otomatis jika salah ketik nama field, kecuali editor disetel khusus. | Cukup baik, tapi kurang proteksi |
| **`.ts` (PILIHAN KITA)** | ✅ **Bisa diberi komentar** petunjuk lengkap di setiap baris.<br>✅ **Autocomplete & IntelliSense**: Editor otomatis menyarankan pilihan field.<br>✅ **Typo-proof**: Jika salah ketik nama field, editor langsung memberi tahu letak kesalahannya sebelum di-deploy.<br>✅ **Fleksibel**: Bebas memakai kutip tunggal, ganda, backticks multi-baris, dan *trailing commas*. | Butuh TypeScript (sudah terpasang bawaan di proyek ini). | 🏆 **Paling Fleksibel, Aman & Kompatibel** |

---

## 🎨 Panduan Lengkap 14 Bagian di `src/config.ts`

Semua data diatur dalam 1 file `src/config.ts` yang terbagi menjadi 14 bagian terstruktur dengan komentar bahasa Indonesia:

1. **`profile`**: Nama kreator, badge profesi, badge status ketersediaan kerja, headline 3-bagian (dengan kotak pop kuning miring), bio, tombol CTA, foto cetak pop, caption foto, stiker interaktif konfeti, derajat kemiringan (`tiltDegrees`), dan teks berjalan `marqueeText`.
2. **`navigation`**: Label menu header dan mobile bar (`home`, `karya`, `tentang`, `kontak`).
3. **`highlight`**: Judul, badge, deskripsi, sub-judul reels, dan banner ajakan di halaman utama (Home).
4. **`worksSection`**: Judul, badge, label filter "Semua", sub-judul rasio portrait/landscape, pesan kosong, dan tombol reset filter di halaman Karya.
5. **`about`**: Cerita kreator, 3 kartu statistik pencapaian, daftar software & keahlian, 3 paket layanan bernomor, serta banner ajakan kolaborasi di halaman Tentang.
6. **`contact`**: Label kartu email, tombol salin, chat WhatsApp, status ketersediaan, serta teks formulir proyek (label input, placeholder, pilihan kategori dropdown, tombol kirim, dan pesan sukses).
7. **`viewer`**: Semua teks pada modal penampil video (status memuat, judul & pesan error, tombol salin tautan, tombol navigasi sebelumnya/berikutnya, tombol tutup).
8. **`footer`**: Teks hak cipta dan tombol kembali ke atas.
9. **`ui`**: Teks aksesibilitas (tombol lewati konten utama, tooltip pengurang gerak animasi, dan tema terang/gelap).
10. **`links`**: Array tombol link sosial & kontak di footer (Instagram, YouTube, Behance, TikTok, LinkedIn, WhatsApp).
11. **`theme`**: Palet warna pop, font display & body Google Fonts, ketebalan outline, radius sudut, bayangan offset keras, dan toggle efek visual.
12. **`cloudinary`**: Cloud Name dan opsi optimasi otomatis `f_auto,q_auto`.
13. **`sections`**: Urutan dan label bagian video portrait (9:16 & 4:3) dan landscape (16:9).
14. **`works`**: Seluruh koleksi video reels dan film komersial (cukup salin 1 blok objek untuk menambah karya baru).

### Kebutuhan Sistem:
- Node.js (v18 atau lebih baru)
- npm atau pnpm

```bash
# Pasang dependensi
npm install

# Jalankan server pengembangan (Port 3000)
npm run dev

# Bangun untuk produksi
npm run build

# Uji hasil build secara lokal
npm run preview
```

---

## 🎨 2. Aturan Utama: Semua Kustomisasi HANYA Lewat `src/config.ts`

Pemilik website tidak perlu mengubah file kode apapun. Cukup buka dan edit `src/config.ts`.

### Struktur Halaman Mandiri (Multi-Page dengan Navbar):
Aplikasi ini menggunakan perutean URL Hash yang bersih dan cepat:

1. **Halaman Utama / Home (`#/home` atau `#/`)**:
   Dibuat sangat bersih dan to the point:
   - **Hero Berkarakter**: Foto cetak pop dengan stiker konfeti interaktif, headline raksasa, dan tombol aksi.
   - **Pita Marquee**: Transisi teks berjalan pemisah.
   - **Highlight Karya**: Menampilkan pilihan karya unggulan (featured reels & commercial film) dengan tombol pop menuju halaman karya lengkap.
   - **Footer Minimalis**.

2. **Halaman Karya (`#/karya`)**:
   - Menampilkan seluruh arsip video lengkap (Reels 9:16, video 4:3, dan widescreen 16:9).
   - Filter chip interaktif per klien dengan warna aksen dinamis.
   - Penampil video layar penuh (*modal viewer*) dengan kontrol audio dan tombol salin link.

3. **Halaman Tentang (`#/tentang`)**:
   - Cerita latar belakang dan filosofi kreatif.
   - Kartu statistik pencapaian (total video, penonton, komitmen).
   - Grid software & keahlian khusus (Premiere, After Effects, DaVinci, Photoshop, Illustrator, Sound Design).
   - Penjelasan 3 paket layanan utama bernomor rapi.
   - Tombol ajakan kolaborasi yang langsung mengarah ke halaman kontak.

4. **Halaman Kontak (`#/kontak`)**:
   - Kartu salin alamat email 1-klik & tombol kirim email langsung.
   - Tombol chat WhatsApp cepat.
   - Informasi ketersediaan kerja dan lokasi.
   - Formulir pengajuan proyek interaktif dengan validasi dan selebrasi konfeti saat terkirim.

### A. Kustomisasi Profil & Hero
Di dalam blok `profile`:
- `name`: Nama Anda yang akan tampil di judul situs, header, dan SEO.
- `roleBadge`: Teks badge kuning atas (contoh: `"GRAPHIC DESIGNER & VIDEO EDITOR"`).
- `statusBadge`: Ketersediaan kerja (`show: true/false`, `text: "Open for freelance..."`, `dot: "green"`).
- `headline`: Dipecah 3 bagian:
  ```js
  headline: {
    before: "Desain berani,",
    highlight: "penuh warna",    // Tampil di dalam kotak pop kuning miring
    after: "& tak terlupakan."
  }
  ```
- `bio`: Paragraf singkat 2–5 kalimat.
- `primaryCta` & `secondaryCta`: Label, tautan (anchor `#karya` atau URL), dan ikon.
- `photo` & `photoAlt`: Path foto hero atau Cloudinary public ID.
- `photoCaption`: Judul kapital dan lokasi di dalam foto.
- `sticker`: Teks stiker pojok kanan atas (`"KLIK ME! ✨"`), aksi (`"confetti"` | `"link"` | `"none"`).
- `tiltDegrees`: Kemiringan foto dan kotak highlight (misal `2.5`).
- `marqueeText`: Teks berjalan di pita pemisah antara hero dan karya.

### B. Menambah Karya Baru (Works)
Untuk menambah video baru, cukup salin satu blok objek di dalam array `works` di `src/config.ts`:

```ts
{
  id: "promo-kopi-senja",             // Slug unik untuk URL hash /#/promo-kopi-senja
  type: "video",                      // "video" (mp4/Cloudinary) | "youtube"
  ratio: "9:16",                      // "9:16", "4:3", "16:9", atau kosong "" (deteksi otomatis)
  section: "",                        // Paksa ke "portrait" atau "landscape", kosong = otomatis
  title: "Promo Kopi Senja",
  client: "Kopi Senja",               // Otomatis menjadi filter chip
  project: "Rebrand 2025",
  year: 2025,
  tags: ["reels", "fnb", "color-grading"],
  src: "kopi-senja/rebrand-2025/promo-reel", // Cloudinary ID ATAU URL penuh video / ID YouTube
  poster: "",                         // Opsional: URL gambar poster pratinjau
  alt: "Deskripsi video untuk screen reader",
  captions: "",                       // Opsional: file .vtt untuk takarir/subtitle
  featured: true                      // Prioritaskan di urutan atas
}
```

---

## 📐 3. Penempatan Otomatis Berdasarkan Rasio

1. **Prioritas Utama**: Jika `ratio` diisi (misal `"9:16"`, `"4:3"`, `"16:9"`), sistem langsung memakai rasio tersebut tanpa perlu mengunduh metadata.
2. **Deteksi Otomatis**: Jika `ratio` dikosongkan, browser membaca `videoWidth` dan `videoHeight` dari metadata video (`preload="metadata"`), lalu menghitung nilainya:
   - **Rasio < 1.5** (seperti `9:16 = 0.56`, `4:5 = 0.8`, `1:1 = 1.0`, `4:3 = 1.33`) $\rightarrow$ Masuk ke bagian **PORTRAIT (Reels)**.
   - **Rasio $\ge$ 1.5** (seperti `16:9 = 1.78`, `21:9 = 2.33`) $\rightarrow$ Masuk ke bagian **LANDSCAPE (Videos)**.
3. **Penyimpanan Cache**: Nilai rasio yang terdeteksi disimpan di `localStorage` (dibungkus `try/catch`). Kunjungan berikutnya akan instan tanpa layout shift (CLS 0).
4. **Penimpaan Manual**: Jika ingin memaksa video 4:3 masuk ke landscape atau sebaliknya, cukup isi field `section: "landscape"` atau `section: "portrait"`.

---

## ☁️ 4. Panduan Integrasi Cloudinary

1. Daftar akun di [Cloudinary](https://cloudinary.com) (gratis).
2. Catat **Cloud Name** Anda di Dashboard.
3. Buka `src/config.ts`, ubah:
   ```ts
   cloudinary: {
     cloudName: "nama_cloud_anda",
     defaultTransform: "f_auto,q_auto"
   }
   ```
4. **Struktur Folder Cloudinary (Disarankan)**:
   Buat folder dengan format rapi:
   `klien / proyek / nama_file` (contoh: `kopi-senja/rebrand-2025/promo-reel`).
5. **Salin Public ID**:
   Di Cloudinary Media Library, klik kanan video lalu pilih *Copy Public ID*.
   Tempelkan ke field `src` di `src/config.ts`.

6. **Optimasi Otomatis**:
   Sistem otomatis menambahkan transformasi `f_auto,q_auto` (format WebM/MP4 adaptif dan kompresi tanpa penurunan kualitas visual) serta membuat poster pratinjau dari frame awal secara otomatis (`so_0`).

---

## 🌐 5. Panduan Deploy

Aplikasi ini adalah Single Page Application (SPA) berbasis Vite:

### Netlify:
- Hubungkan repositori Git.
- Build command: `npm run build`
- Publish directory: `dist`

### Vercel:
- Impor repositori Git.
- Framework preset: `Vite`
- Root directory: `./`
- Deploy langsung berhasil tanpa konfigurasi tambahan.

### GitHub Pages:
- Pastikan base path di `vite.config.ts` sesuai nama repo (`base: './'`).
- Bangun dengan `npm run build` dan push folder `dist` ke branch `gh-pages`.

---

## ♿ 6. Fitur Aksesibilitas (WCAG 2.2 AA)

- **Kontras Warna**: Teks gelap di atas warna terang diuji memenuhi standar kontras minimal 4.5:1 (teks besar $\ge$ 3:1).
- **Struktur Semantik**: Satu elemen `<h1>` yang terbaca utuh oleh pembaca layar meski memiliki kotak highlight miring.
- **Navigasi Keyboard Penuh**:
  - Tombol **"Lewati ke konten utama"** (`SkipLink`) di awal halaman.
  - Urutan tab logis dengan outline fokus tebal (`focus-visible: 3px solid black`).
  - **Focus trap** di dalam viewer video: tombol Esc menutup modal, panah kiri/kanan berpindah karya, spasi untuk play/pause. Fokus otomatis kembali ke kartu asal saat viewer ditutup.
- **Kontrol Animasi (`prefers-reduced-motion`)**:
  - Mendeteksi preferensi sistem secara otomatis.
  - Disediakan tombol **"Kurangi Gerak"** di header untuk mematikan marquee, kemiringan tilt, dan autoplay video.
- **Tanpa Autoplay Bersuara**: Semua video pratinjau dalam keadaan bisu (muted). Pengguna memegang kendali penuh untuk menyalakan audio.
