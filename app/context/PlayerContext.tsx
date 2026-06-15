"use client";

import { createContext, useContext, ReactNode, useState, useEffect, useRef } from "react";
import { AppState, Track } from "../types";
import { useCore } from "../hooks/useCore";
import { usePlayback } from "../hooks/usePlayback";

export interface ContextType {
  s: AppState;
  setS: React.Dispatch<React.SetStateAction<AppState>>;
  time: number; setTime: (n: number) => void;
  dur: number; setDur: (n: number) => void;
  playing: boolean; setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean; setLoading: (b: boolean) => void;
  media: React.RefObject<HTMLMediaElement | null>;
  track?: Track;
  processFiles: (files: FileList | File[], label?: string | null) => number;
  playId: (id: string, q?: string[] | null) => void;
  next: () => void;
  prev: () => void;
  showVideo: boolean; setShowVideo: (b: boolean | ((old: boolean) => boolean)) => void;
  videoFullscreen: boolean; setVideoFullscreen: (b: boolean) => void;
  sidebarCollapsed: boolean; setSidebarCollapsed: (b: boolean) => void;
}

const Ctx = createContext<ContextType | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const core = useCore();
  const pb = usePlayback(core.s, core.setS, core.time, core.setPlaying, core.media);
  
  const [showVideo, setShowVideo] = useState(false);
  const [videoFullscreen, setVideoFullscreen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const lastTrackId = useRef<string | null>(null);

  const track = core.s.tracks.find(t => t.id === core.s.currentTrackId);

  useEffect(() => {
    const el = core.media.current;
    if (!el || !track) return;

    if (!track.objectUrl) {
      core.setLoading(true);
      import("../lib/db").then(({ getMediaFile }) => {
        getMediaFile(track.id).then(file => {
          if (file) {
            const newUrl = URL.createObjectURL(file);
            core.setS(p => ({
              ...p,
              tracks: p.tracks.map(t => t.id === track.id ? { ...t, objectUrl: newUrl } : t)
            }));
          } else {
            console.error(`File ${track.title} not found in database.`);
            // core.setS(p => ({ ...p, currentTrackId: null })); // Don't wipe it out, let them see it fails
            core.setLoading(false);
          }
        });
      });
      return;
    }

    const url = track.objectUrl;
    if (el.src !== url) { 
      el.src = url; 
      el.load(); 
      if (lastTrackId.current === track.id) {
        el.currentTime = core.time;
      } else {
        core.setTime(0);
        el.currentTime = 0;
      }
      lastTrackId.current = track.id;
    }
    el.volume = core.s.volume;
    if (core.playing) el.play().catch(() => {});
  }, [core.s.currentTrackId, showVideo, videoFullscreen, track?.objectUrl]);

  useEffect(() => {
    const el = core.media.current;
    if (!el) return;
    core.playing ? el.play().catch(() => {}) : el.pause();
  }, [core.playing]);

  useEffect(() => {
    if (core.media.current) core.media.current.volume = core.s.volume;
  }, [core.s.volume]);

  return (
    <Ctx.Provider value={{
      ...core, ...pb, track,
      showVideo, setShowVideo, videoFullscreen, setVideoFullscreen,
      sidebarCollapsed, setSidebarCollapsed
    }}>
      {children}
    </Ctx.Provider>
  );
}

export const usePlayer = () => useContext(Ctx)!;
