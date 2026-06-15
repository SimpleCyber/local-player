import { useCallback } from "react";
import { AppState } from "../types";

export function usePlayback(
  s: AppState, 
  setS: React.Dispatch<React.SetStateAction<AppState>>, 
  time: number, 
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>, 
  media: React.RefObject<HTMLMediaElement | null>
) {
  const playId = useCallback((id: string, q: string[] | null = null) => {
    setS(p => {
      const queue = q || p.queue;
      return { ...p, currentTrackId: id, currentIndex: Math.max(0, queue.indexOf(id)), queue };
    });
    setPlaying(true);
  }, [setS, setPlaying]);

  const next = useCallback(() => {
    setS(p => {
      if (!p.queue.length) return p;
      const idx = p.shuffle ? Math.floor(Math.random() * p.queue.length) : (p.currentIndex + 1) % p.queue.length;
      if (!p.shuffle && p.repeat === "none" && idx === 0) {
        setPlaying(false);
        return { ...p, currentIndex: 0, currentTrackId: p.queue[0] };
      }
      return { ...p, currentIndex: idx, currentTrackId: p.queue[idx] };
    });
    setPlaying(true);
  }, [setS, setPlaying]);

  const prev = useCallback(() => {
    if (time > 3 && media.current) { media.current.currentTime = 0; return; }
    setS(p => {
      if (!p.queue.length) return p;
      const idx = p.shuffle ? Math.floor(Math.random() * p.queue.length) : (p.currentIndex - 1 + p.queue.length) % p.queue.length;
      return { ...p, currentIndex: idx, currentTrackId: p.queue[idx] };
    });
    setPlaying(true);
  }, [time, media, setS, setPlaying]);

  return { playId, next, prev };
}
