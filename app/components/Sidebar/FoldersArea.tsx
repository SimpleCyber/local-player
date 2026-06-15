"use client";
import { FolderOpen, Folder, X } from "lucide-react";
import { usePlayer } from "../../context/PlayerContext";
import { getColors } from "../../lib/utils";

export default function FoldersArea({ setModal }: { setModal: (m: string) => void }) {
  const { s, setS } = usePlayer();
  const c = getColors(s.theme === "dark");

  const removeFolder = (fId: string) => {
    setS(p => {
      const ids = p.tracks.filter(t => t.folderId === fId).map(t => t.id);
      return {
        ...p,
        folders: p.folders.filter(f => f.id !== fId),
        tracks: p.tracks.filter(t => t.folderId !== fId),
        queue: p.queue.filter(q => !ids.includes(q)),
        playlists: p.playlists.map(pl => ({ ...pl, trackIds: pl.trackIds.filter(t => !ids.includes(t)) })),
        currentTrackId: ids.includes(p.currentTrackId!) ? null : p.currentTrackId,
      };
    });
  };

  return (
    <>
      <div className="flex items-center justify-between px-3 mb-2">
        <span style={{ color: c.txt3 }} className="text-[11px] font-semibold tracking-wider uppercase">Folders</span>
        <button style={{ color: c.txt3 }} className="hover:opacity-70 transition-opacity" onClick={() => setModal("folder")}><FolderOpen size={14} /></button>
      </div>

      {s.folders.map(f => (
        <div key={f.id} className="group flex items-center gap-2.5 px-3 py-1.5 rounded-lg cursor-default text-[13px] transition-all" style={{ color: c.txt2 }}>
          <Folder size={14} style={{ color: c.txt3 }} />
          <span className="truncate flex-1">{f.label}</span>
          <span style={{ color: c.txt4 }} className="text-xs">{s.tracks.filter(t => t.folderId === f.id).length}</span>
          <button className="opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity" onClick={() => removeFolder(f.id)}><X size={11} /></button>
        </div>
      ))}

      {s.folders.length === 0 && (
        <button style={{ color: c.txt3, border: `1px dashed ${c.border}` }} className="w-full text-center py-4 rounded-lg text-xs hover:opacity-70 transition-opacity mt-1" onClick={() => setModal("folder")}>
          <FolderOpen size={18} className="mx-auto mb-1.5" style={{ color: c.txt4 }} />
          Add a folder
        </button>
      )}
    </>
  );
}
