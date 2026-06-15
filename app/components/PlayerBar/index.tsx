"use client";
import { Maximize2, MonitorPlay, VolumeX, Volume1, Volume2, Repeat, Repeat1 } from "lucide-react";
import { usePlayer } from "../../context/PlayerContext";
import { getColors, ACCENT, fmt } from "../../lib/utils";
import Controls from "./Controls";

export default function PlayerBar() {
  const { s, setS, track, time, dur, media, showVideo, setShowVideo } = usePlayer();
  const c = getColors(s.theme === "dark");
  const dark = s.theme === "dark";

  return (
    <footer style={{ background: c.bgSub, borderTop: `1px solid ${c.border}` }} className="h-[90px] flex-shrink-0 px-4 flex items-center justify-between">
      
      {/* ── Left: Track info ── */}
      <div className="flex items-center gap-4 w-[30%] min-w-[200px]">
        {track ? (
          <>
            <div style={{ background: c.bgEl }} className="w-[56px] h-[56px] rounded-md shadow-sm overflow-hidden flex-shrink-0 flex items-center justify-center">
              {track.type === "video" ? (
                <div style={{ background: "rgba(0,0,0,0.8)" }} className="w-full h-full flex items-center justify-center">
                  <MonitorPlay size={20} className="text-white relative z-10" />
                </div>
              ) : (
                <MusicIcon />
              )}
            </div>
            <div className="min-w-0 flex flex-col justify-center">
              <p style={{ color: c.txt }} className="text-sm font-medium truncate">{track.title}</p>
              {track.type === "video" && (
                <button
                  style={{ color: showVideo ? ACCENT : c.txt3 }}
                  className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold tracking-wide uppercase hover:opacity-80 transition-opacity w-max"
                  onClick={() => setShowVideo(!showVideo)}>
                  <MonitorPlay size={12} /> {showVideo ? "Hide Video" : "Show Video"}
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <div style={{ background: c.bgEl }} className="w-[56px] h-[56px] rounded-md shadow-sm" />
            <div className="flex flex-col gap-2 w-32">
              <div style={{ background: c.bgEl }} className="h-3 w-full rounded" />
              <div style={{ background: c.bgEl }} className="h-2 w-2/3 rounded" />
            </div>
          </>
        )}
      </div>

      {/* ── Center: Controls ── */}
      <Controls />

      {/* ── Right: Extra ── */}
      <div className="flex items-center justify-end gap-3 w-[30%] min-w-[150px]">
        <button style={{ color: c.txt3 }} className="p-2 transition-all hover:opacity-80" onClick={async () => {
          if (document.pictureInPictureElement) return document.exitPictureInPicture();
          document.querySelector("video")?.requestPictureInPicture().catch(()=>{});
        }} title="Mini Player (PiP)">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 10V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"/><rect x="4" y="14" width="8" height="6" rx="2"/></svg>
        </button>
        <div className="flex items-center gap-2 group">
          <button style={{ color: c.txt3 }} className="hover:opacity-80 transition-opacity" onClick={() => setS(p => ({ ...p, volume: p.volume > 0 ? 0 : 0.75 }))}>
            {s.volume === 0 ? <VolumeX size={16} /> : s.volume < 0.5 ? <Volume1 size={16} /> : <Volume2 size={16} />}
          </button>
          <div className="w-20 lg:w-24 flex items-center">
            <input type="range" min="0" max="1" step="0.01" value={s.volume}
              onChange={e => setS(p => ({ ...p, volume: parseFloat(e.target.value) }))}
              style={{ background: `linear-gradient(to right, ${s.volume > 0 ? (dark ? "#fff" : "#1a1a1a") : c.txt4} ${s.volume * 100}%, ${dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"} ${s.volume * 100}%)`, width: "100%" }}
            />
          </div>
        </div>
        <button style={{ color: c.txt3 }} className="p-2 hover:opacity-80 transition-opacity" onClick={() => { if (!document.fullscreenElement) document.documentElement.requestFullscreen(); else document.exitFullscreen(); }} title="Fullscreen App">
          <Maximize2 size={15} />
        </button>
      </div>
    </footer>
  );
}

function MusicIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-30">
      <path d="M9 18V5l12-2v13"></path>
      <circle cx="6" cy="18" r="3"></circle>
      <circle cx="18" cy="16" r="3"></circle>
    </svg>
  );
}
