"use client";
import { useState } from "react";
import { Plus, ListMusic, X } from "lucide-react";
import { usePlayer } from "../../context/PlayerContext";
import { getColors, ACCENT } from "../../lib/utils";

export default function PlaylistsArea({ onPlPick }: { onPlPick: (c: string) => void }) {
  const { s, setS } = usePlayer();
  const [plName, setPlName] = useState("");
  const c = getColors(s.theme === "dark");

  const createPlaylist = (name: string) => {
    if (!name?.trim()) return;
    const id = `pl_${Date.now()}`;
    setS(p => ({ ...p, playlists: [...p.playlists, { id, name: name.trim(), trackIds: [] }] }));
    setPlName("");
  };

  const deletePlaylist = (id: string) => {
    setS(p => ({
      ...p,
      playlists: p.playlists.filter(pl => pl.id !== id),
      playlistId: p.playlistId === id ? null : p.playlistId,
      view: p.playlistId === id ? "library" : p.view,
    }));
  };

  return (
    <>
      <div className="flex items-center justify-between px-3 mb-2">
        <span style={{ color: c.txt3 }} className="text-[11px] font-semibold tracking-wider uppercase">Playlists</span>
        <button style={{ color: c.txt3 }} className="hover:opacity-70 transition-opacity" onClick={() => onPlPick("__create__")}><Plus size={14} /></button>
      </div>
      {s.playlists.map(pl => {
        const act = s.view === "playlist" && s.playlistId === pl.id;
        return (
          <div key={pl.id} style={{ background: act ? (s.theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)") : "transparent", color: act ? c.txt : c.txt2 }}
            className="group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-[13px] font-medium transition-all"
            onClick={() => setS(p => ({ ...p, view: "playlist", playlistId: pl.id }))}>
            <ListMusic size={14} />
            <span className="truncate flex-1">{pl.name}</span>
            <span style={{ color: c.txt4 }} className="text-xs opacity-0 group-hover:opacity-100 mr-1">{pl.trackIds.length}</span>
            <button className="opacity-0 group-hover:opacity-60 hover:!opacity-100" onClick={e => { e.stopPropagation(); deletePlaylist(pl.id); }}><X size={12} /></button>
          </div>
        );
      })}
      {s.playlists.length === 0 && <p style={{ color: c.txt4 }} className="text-xs text-center py-3">No playlists yet</p>}
      <div className="mt-2 px-1">
        <div style={{ background: s.theme === "dark" ? "rgba(255,255,255,0.05)" : "#f3f4f6", borderRadius: 8 }} className="flex items-center gap-1 p-1">
          <input style={{ color: c.txt }} className="flex-1 bg-transparent px-2 py-1 text-xs outline-none" placeholder="Create playlist…" value={plName} onChange={e => setPlName(e.target.value)} onKeyDown={e => e.key === "Enter" && createPlaylist(plName)} />
          <button style={{ background: plName.trim() ? ACCENT : "transparent", color: plName.trim() ? "#000" : c.txt4 }} className="px-2 py-1 rounded-md text-xs font-semibold" onClick={() => createPlaylist(plName)}>+</button>
        </div>
      </div>
    </>
  );
}
