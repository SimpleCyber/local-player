export const fmt = (s: number) => {
  if (!s || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${Math.floor(s % 60).toString().padStart(2, "0")}`;
};

export const ext = (p?: string) => p?.split(".").pop()?.toLowerCase() ?? "";
export const isVid = (p?: string) => ["mp4", "mkv", "webm", "mov", "avi"].includes(ext(p));
export const isAud = (p?: string) => ["mp3", "wav", "ogg", "flac", "m4a", "aac", "wma"].includes(ext(p));
export const base = (p: string) => p.replace(/\\/g, "/").split("/").pop()?.replace(/\.[^.]+$/, "") || "Unknown";

export const ACCENT = "#1db954";
export const getColors = (dark: boolean) => ({
  bg: dark ? "#121212" : "#ffffff",
  bgSub: dark ? "#181818" : "#f9fafb",
  bgEl: dark ? "#282828" : "#f0f0f0",
  bgHover: dark ? "#2a2a2a" : "#e8e8e8",
  border: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
  txt: dark ? "#ffffff" : "#1a1a1a",
  txt2: dark ? "#b3b3b3" : "#6b7280",
  txt3: dark ? "#727272" : "#9ca3af",
  txt4: dark ? "#404040" : "#d1d5db"
});
