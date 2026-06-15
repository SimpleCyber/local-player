import { useState, useEffect, useCallback, useRef } from "react";
import { AppState, defaults, STORAGE, Track } from "../types";
import { isVid, isAud, base } from "../lib/utils";

export function useCore() {
  const [s, setS] = useState<AppState>(defaults);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const media = useRef<HTMLMediaElement | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.tracks) parsed.tracks = parsed.tracks.map((t: any) => ({ ...t, objectUrl: undefined }));
        setS({ ...defaults, ...parsed });
      }
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE, JSON.stringify(s)); } catch {}
    document.documentElement.className = s.theme;
  }, [s]);

  const processFiles = useCallback((files: FileList | File[], label: string | null = null) => {
    const valid = [...files].filter(f => isAud(f.name) || isVid(f.name));
    if (!valid.length) return 0;
    const fId = `f_${Date.now()}`;
    let added = 0;
    
    // dynamically import save logic here or top level
    import("../lib/db").then(({ saveMediaFile }) => {
      setS(p => {
        const existing = new Set(p.tracks.map(t => t.path));
        let newTracks: Track[] = [];
        valid.forEach(f => {
          const path = (f as any).webkitRelativePath || f.name;
          if (!existing.has(path)) {
            const tId = `t_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
            saveMediaFile(tId, f as File);
            newTracks.push({
              id: tId,
              path, title: base(f.name), folderId: fId,
              objectUrl: URL.createObjectURL(f),
              type: isVid(f.name) ? "video" : "audio",
              liked: false, size: f.size,
            });
          }
        });
        added = newTracks.length;
        if (!added) return p;
        const folderName = label || (valid[0] as any).webkitRelativePath?.split("/")[0] || "Untitled";
        const allIds = [...p.tracks, ...newTracks].map(t => t.id);
        return { 
          ...p, 
          tracks: [...p.tracks, ...newTracks], 
          folders: [...p.folders, { id: fId, label: folderName, count: newTracks.length }],
          queue: allIds
        };
      });
    }).catch(()=>{});

    // Synchronous return is no longer strictly accurate, but we return the count of newly parsed files for UI sake.
    return valid.length;
  }, []);

  return { s, setS, time, setTime, dur, setDur, playing, setPlaying, loading, setLoading, processFiles, media };
}
