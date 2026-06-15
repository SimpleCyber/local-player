"use client";
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat1, Repeat } from "lucide-react";
import { usePlayer } from "../../context/PlayerContext";
import { getColors, ACCENT, fmt } from "../../lib/utils";

export default function Controls() {
  const { s, setS, track, playing, setPlaying, time, dur, media, prev, next } = usePlayer();
  const c = getColors(s.theme === "dark");
  const dark = s.theme === "dark";

  return (
    <div className="flex flex-col items-center max-w-[40%] w-full">
      <div className="flex items-center gap-5">
        <button style={{ color: s.shuffle ? ACCENT : c.txt3 }} className="p-2 hover:opacity-80 transition-opacity" onClick={() => setS(p => ({ ...p, shuffle: !p.shuffle }))} title="Shuffle">
          <Shuffle size={15} />
        </button>
        <button style={{ color: c.txt }} className="p-2 hover:opacity-80 transition-opacity" onClick={prev} disabled={!track}><SkipBack size={18} fill="currentColor" /></button>
        <button style={{ background: dark ? "#fff" : "#1a1a1a", color: dark ? "#000" : "#fff" }}
          className="w-[34px] h-[34px] rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md disabled:opacity-50"
          onClick={() => {
            if (!track && s.queue.length > 0) {
              const ids = s.queue;
              const q = s.shuffle ? [...ids].sort(() => Math.random() - 0.5) : ids;
              setS(p => ({ ...p, currentTrackId: q[0], currentIndex: 0 }));
              setPlaying(true);
            } else if (track) {
              setPlaying(!playing);
            }
          }}>
          {playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" style={{ marginLeft: 2 }} />}
        </button>
        <button style={{ color: c.txt }} className="p-2 hover:opacity-80 transition-opacity" onClick={next} disabled={!track}><SkipForward size={18} fill="currentColor" /></button>

        <button style={{ color: s.repeat !== "none" ? ACCENT : c.txt3 }} className="p-2 transition-all hover:opacity-80" onClick={() => setS(p => ({ ...p, repeat: p.repeat === "none" ? "all" : p.repeat === "all" ? "one" : "none" }))} title="Repeat">
          {s.repeat === "one" ? <Repeat1 size={15} /> : <Repeat size={15} />}
        </button>
      </div>

      <div className="flex items-center gap-2 w-full max-w-[500px] mt-1.5">
        <span style={{ color: c.txt3 }} className="text-[11px] font-medium w-9 text-right font-mono">{track ? fmt(time) : "-:--"}</span>
        <div className="flex-1 flex items-center group relative h-2 cursor-pointer">
          <input type="range" min="0" max={dur || 0} step="0.1" value={time}
            onChange={e => { if (media.current) media.current.currentTime = parseFloat(e.target.value); }}
            style={{
              background: `linear-gradient(to right, ${dark ? "#fff" : "#1a1a1a"} ${(time / (dur || 1)) * 100}%, ${dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"} ${(time / (dur || 1)) * 100}%)`,
              width: "100%"
            }}
          />
        </div>
        <span style={{ color: c.txt3 }} className="text-[11px] font-medium w-9 text-left font-mono">{track ? fmt(dur) : "-:--"}</span>
      </div>
    </div>
  );
}
