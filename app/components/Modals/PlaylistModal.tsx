"use client";
import { ListMusic, X } from "lucide-react";
import { usePlayer } from "../../context/PlayerContext";
import { getColors } from "../../lib/utils";

export default function PlaylistModal({ setModal, pickTrackId, setPickTrackId }: { setModal: (m: string | null) => void; pickTrackId: string; setPickTrackId: (id: string | null) => void }) {
  const { s, setS } = usePlayer();
  const c = getColors(s.theme === "dark");

  const close = () => { setModal(null); setPickTrackId(null); };

  const addToPlaylist = (plId: string) => {
    setS(p => ({
      ...p,
      playlists: p.playlists.map(pl => {
        if (pl.id === plId && !pl.trackIds.includes(pickTrackId)) return { ...pl, trackIds: [...pl.trackIds, pickTrackId] };
        return pl;
      })
    }));
    close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div style={{ background: c.bg, border: `1px solid ${c.border}` }} className="w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden flex flex-col pt-4">
        <div className="flex items-center justify-between px-5 pb-3" style={{ borderBottom: `1px solid ${c.border}` }}>
          <h2 style={{ color: c.txt }} className="text-lg font-bold">Add to Playlist</h2>
          <button style={{ color: c.txt3 }} className="p-1 hover:opacity-80 transition-opacity" onClick={close}><X size={20} /></button>
        </div>
        <div className="px-2 py-2 max-h-[300px] overflow-y-auto">
          {s.playlists.map(pl => {
            const has = pl.trackIds.includes(pickTrackId);
            return (
              <button key={pl.id} style={{ color: c.txt }} className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-white/5" disabled={has} onClick={() => addToPlaylist(pl.id)}>
                <div style={{ background: c.bgEl }} className="w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0"><ListMusic size={16} style={{ color: c.txt3 }} /></div>
                <div className="flex flex-col items-start min-w-0">
                  <span className="truncate w-full">{pl.name}</span>
                  {has && <span className="text-[10px] text-[rgba(29,185,84,0.8)] uppercase tracking-wide">Already Added</span>}
                </div>
              </button>
            );
          })}
          {s.playlists.length === 0 && <p style={{ color: c.txt3 }} className="text-sm text-center py-6">No playlists. Create one in the sidebar first.</p>}
        </div>
      </div>
    </div>
  );
}
