"use client";
import { Music, Video, Clock, Heart, PlusCircle, Trash2, X, Plus } from "lucide-react";
import { usePlayer } from "../../context/PlayerContext";
import { getColors, ACCENT } from "../../lib/utils";
import { Track } from "../../types";

export default function TrackTable({ filtered, setModal, onPlPick }: any) {
  const { s, setS, playing, playId } = usePlayer();
  const c = getColors(s.theme === "dark");
  const dark = s.theme === "dark";

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3" style={{ color: c.txt4 }}>
        <Music size={40} strokeWidth={1.2} />
        <div className="text-center">
          <p className="font-medium text-sm" style={{ color: c.txt3 }}>No tracks here</p>
          <p className="text-xs mt-1">Drag & drop files or add a folder to begin</p>
        </div>
        <button style={{ background: ACCENT, color: "#000" }} className="mt-3 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold hover:brightness-110 transition-all" onClick={() => setModal("folder")}>
          <Plus size={14} /> Add Music
        </button>
      </div>
    );
  }

  const toggleLike = (id: string) => setS(p => ({ ...p, tracks: p.tracks.map(t => t.id === id ? { ...t, liked: !t.liked } : t) }));
  
  const removeTrack = (id: string) => setS(p => ({
    ...p, tracks: p.tracks.filter(t => t.id !== id), queue: p.queue.filter(q => q !== id),
    playlists: p.playlists.map(pl => ({ ...pl, trackIds: pl.trackIds.filter(t => t !== id) })),
    currentTrackId: p.currentTrackId === id ? null : p.currentTrackId
  }));

  const removeFromPlaylist = (tId: string) => s.playlistId && setS(p => ({
    ...p, playlists: p.playlists.map(pl => pl.id === p.playlistId ? { ...pl, trackIds: pl.trackIds.filter(id => id !== tId) } : pl)
  }));

  return (
    <table className="w-full" style={{ borderCollapse: "separate", borderSpacing: "0 2px" }}>
      <thead>
        <tr>
          <td style={{ color: c.txt4 }} className="pb-2 pl-4 w-10 text-xs font-medium">#</td>
          <td style={{ color: c.txt4 }} className="pb-2 text-xs font-medium">TITLE</td>
          <td style={{ color: c.txt4 }} className="pb-2 hidden md:table-cell text-xs font-medium">FOLDER</td>
          <td style={{ color: c.txt4 }} className="pb-2 w-20 text-right pr-2 text-xs font-medium"><Clock size={11} /></td>
          <td className="pb-2 w-24"></td>
        </tr>
      </thead>
      <tbody>
        {filtered.map((t: Track, i: number) => {
          const act = t.id === s.currentTrackId;
          const folder = s.folders.find(f => f.id === t.folderId);
          return (
            <tr key={t.id} style={{ background: act ? (dark ? "rgba(255,255,255,0.06)" : "rgba(29,185,84,0.06)") : "transparent", borderRadius: 8, cursor: "pointer" }}
              className="group transition-colors duration-75"
              onMouseEnter={e => { if (!act) e.currentTarget.style.background = dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)"; }}
              onMouseLeave={e => { if (!act) e.currentTarget.style.background = "transparent"; }}
              onClick={() => playId(t.id, filtered.map((x: Track) => x.id))}>
              <td className="py-2 pl-4 w-10" style={{ borderRadius: "8px 0 0 8px" }}>
                {act && playing ? (
                  <span className="flex gap-[3px] items-end h-3.5"><span className="w-[3px] rounded-full eq-bar-1" style={{ background: ACCENT }} /><span className="w-[3px] rounded-full eq-bar-2" style={{ background: ACCENT }} /><span className="w-[3px] rounded-full eq-bar-3" style={{ background: ACCENT }} /></span>
                ) : <span style={{ color: act ? ACCENT : c.txt4 }} className="text-xs">{i + 1}</span>}
              </td>
              <td className="py-2">
                <div className="flex items-center gap-3">
                  <div style={{ background: act ? (dark ? "rgba(29,185,84,0.15)" : "rgba(29,185,84,0.1)") : c.bgEl }} className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0">
                    {t.type === "video" ? <Video size={15} style={{ color: act ? ACCENT : c.txt3 }} /> : <Music size={15} style={{ color: act ? ACCENT : c.txt3 }} />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate max-w-[260px]" style={{ color: act ? ACCENT : c.txt }}>{t.title}</p>
                    {t.type === "video" && <span style={{ color: c.txt4 }} className="text-[10px]">Video</span>}
                  </div>
                </div>
              </td>
              <td className="py-2 hidden md:table-cell">{folder && <span style={{ color: c.txt3 }} className="text-xs">{folder.label}</span>}</td>
              <td className="py-2 text-right pr-2"><span style={{ color: c.txt4 }} className="text-xs">—</span></td>
              <td className="py-2 pr-3" style={{ borderRadius: "0 8px 8px 0" }}>
                <div className="flex items-center gap-0.5 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 rounded-md transition-colors" style={{ color: t.liked ? "#e74c3c" : c.txt3 }} onMouseEnter={e => e.currentTarget.style.background = c.bgHover} onMouseLeave={e => e.currentTarget.style.background = "transparent"} onClick={e => { e.stopPropagation(); toggleLike(t.id); }}>
                    <Heart size={13} fill={t.liked ? "currentColor" : "none"} />
                  </button>
                  <button className="p-1.5 rounded-md transition-colors" style={{ color: c.txt3 }} onMouseEnter={e => e.currentTarget.style.background = c.bgHover} onMouseLeave={e => e.currentTarget.style.background = "transparent"} onClick={e => { e.stopPropagation(); onPlPick(t.id); }}>
                    <PlusCircle size={13} />
                  </button>
                  {s.view === "playlist" && s.playlistId && (
                    <button className="p-1.5 rounded-md transition-colors" style={{ color: c.txt3 }} onMouseEnter={e => e.currentTarget.style.background = c.bgHover} onMouseLeave={e => e.currentTarget.style.background = "transparent"} onClick={e => { e.stopPropagation(); removeFromPlaylist(t.id); }}>
                      <Trash2 size={13} />
                    </button>
                  )}
                  <button className="p-1.5 rounded-md transition-colors" style={{ color: "#e74c3c44" }} onMouseEnter={e => { e.currentTarget.style.background = c.bgHover; e.currentTarget.style.color = "#e74c3c"; }} onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#e74c3c44"; }} onClick={e => { e.stopPropagation(); removeTrack(t.id); }}>
                    <X size={13} />
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
