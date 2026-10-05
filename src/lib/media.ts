import { WorkItem, WorkType } from "../types/portfolio";

/**
 * Cache key prefix untuk menyimpan hasil deteksi rasio video
 */
const CACHE_PREFIX = "portfolio_ratio_cache_";

/**
 * Helper untuk membaca rasio tersimpan di localStorage secara aman
 */
export function getCachedRatio(workId: string): number | null {
  try {
    const val = localStorage.getItem(CACHE_PREFIX + workId);
    if (val) {
      const parsed = parseFloat(val);
      if (!isNaN(parsed) && parsed > 0) return parsed;
    }
  } catch {
    // Abaikan jika localStorage dilarang oleh browser
  }
  return null;
}

/**
 * Helper untuk menyimpan hasil deteksi rasio ke localStorage
 */
export function setCachedRatio(workId: string, ratio: number): void {
  try {
    localStorage.setItem(CACHE_PREFIX + workId, ratio.toString());
  } catch {
    // Abaikan kegagalan localStorage
  }
}

/**
 * Mengubah string rasio (misal "9:16", "4:3", "16:9") menjadi nilai numerik width / height
 */
export function parseRatioString(ratioStr?: string): number | null {
  if (!ratioStr || typeof ratioStr !== "string") return null;
  const parts = ratioStr.trim().split(":");
  if (parts.length === 2) {
    const w = parseFloat(parts[0]);
    const h = parseFloat(parts[1]);
    if (!isNaN(w) && !isNaN(h) && h > 0) {
      return w / h;
    }
  }
  return null;
}

/**
 * Menentukan apakah rasio masuk ke portrait (< 1.5) atau landscape (>= 1.5)
 */
export function getSectionFromRatio(ratio: number): "portrait" | "landscape" {
  return ratio < 1.5 ? "portrait" : "landscape";
}

/**
 * Membangun URL sumber media penuh dari Cloudinary atau URL langsung
 */
export function resolveMediaUrl(
  src: string,
  type: WorkType,
  cloudName: string = "demo",
  defaultTransform: string = "f_auto,q_auto"
): string {
  if (!src) return "";

  if (type === "youtube") {
    // Jika src adalah URL YouTube lengkap, ambil ID videonya
    let videoId = src;
    if (src.includes("youtube.com") || src.includes("youtu.be")) {
      const match = src.match(/(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
      if (match && match[1]) {
        videoId = match[1];
      }
    }
    return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1`;
  }

  // Jika berupa URL penuh http(s) atau path lokal /
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/")) {
    return src;
  }

  // Anggap sebagai Cloudinary public ID
  const cleanId = src.replace(/^\/+/, "");
  return `https://res.cloudinary.com/${cloudName}/video/upload/${defaultTransform}/${cleanId}`;
}

/**
 * Membangun URL poster pratinjau (Cloudinary thumbnail, YouTube thumb, atau poster kustom)
 */
export function resolvePosterUrl(
  work: WorkItem,
  cloudName: string = "demo"
): string {
  if (work.poster && work.poster.trim() !== "") {
    if (work.poster.startsWith("http://") || work.poster.startsWith("https://") || work.poster.startsWith("/")) {
      return work.poster;
    }
    // Cloudinary image public ID
    return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${work.poster.replace(/^\/+/, "")}`;
  }

  // Fallback YouTube poster
  if (work.type === "youtube") {
    let videoId = work.src;
    if (videoId.includes("youtube.com") || videoId.includes("youtu.be")) {
      const match = videoId.match(/(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
      if (match && match[1]) videoId = match[1];
    }
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }

  // Fallback Cloudinary video frame awal
  if (!work.src.startsWith("http://") && !work.src.startsWith("https://") && !work.src.startsWith("/")) {
    const cleanId = work.src.replace(/^\/+/, "").replace(/\.[^/.]+$/, "");
    return `https://res.cloudinary.com/${cloudName}/video/upload/so_0,f_auto,q_auto/${cleanId}.jpg`;
  }

  // Jika video adalah URL pihak ketiga tanpa poster, return empty (komponen akan menampilkan poster kartu pop)
  return "";
}

/**
 * Mendapatkan rasio efektif untuk suatu karya
 */
export function getEffectiveRatio(work: WorkItem): number {
  // 1. Dari field ratio yang diisi
  const parsed = parseRatioString(work.ratio);
  if (parsed !== null) return parsed;

  // 2. Dari cache localStorage
  const cached = getCachedRatio(work.id);
  if (cached !== null) return cached;

  // 3. Default berdasarkan type
  if (work.type === "youtube") {
    return 16 / 9; // ~1.777
  }

  // 4. Default berdasarkan section yang dipaksakan
  if (work.section === "portrait") return 9 / 16;
  if (work.section === "landscape") return 16 / 9;

  // 5. Default umum
  return 9 / 16;
}

/**
 * Mendapatkan section yang tepat untuk suatu karya
 */
export function getEffectiveSection(work: WorkItem): "portrait" | "landscape" {
  if (work.section === "portrait" || work.section === "landscape") {
    return work.section;
  }
  const ratio = getEffectiveRatio(work);
  return getSectionFromRatio(ratio);
}

/**
 * Deteksi metadata video di background untuk memperbarui rasio jika belum ditentukan
 */
export function inspectVideoMetadata(
  work: WorkItem,
  onDetected?: (ratio: number) => void
): void {
  if (work.ratio) return;
  if (getCachedRatio(work.id)) return;
  if (work.type === "youtube") return;

  const video = document.createElement("video");
  video.preload = "metadata";
  video.muted = true;
  video.src = resolveMediaUrl(work.src, work.type);

  video.onloadedmetadata = () => {
    if (video.videoWidth > 0 && video.videoHeight > 0) {
      const ratio = video.videoWidth / video.videoHeight;
      setCachedRatio(work.id, ratio);
      if (onDetected) onDetected(ratio);
    }
  };

  video.onerror = () => {
    // Gagal membaca metadata, tidak masalah; layout tetap aman memakai default
  };
}
