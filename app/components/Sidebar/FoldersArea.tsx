"use client";
import { useState } from "react";
import { FolderOpen, Folder, X, ChevronDown, ChevronUp } from "lucide-react";
import { usePlayer } from "../../context/PlayerContext";
import { getColors } from "../../lib/utils";
import ConfirmModal from "../Modals/ConfirmModal";

export default function FoldersArea({ setModal }: { setModal: (m: string) => void }) {
  const { s, setS } = usePlayer();
  const [collapsed, setCollapsed] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
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
        view: (p.view as any) === "folder" && (p as any).folderId === fId ? "library" : p.view,
      } as any;
    });
    setConfirmId(null);
  };

  const openFolder = (fId: string) => {
    setS(p => ({ ...p, view: "folder" as any, folderId: fId } as any));
  };

  return (
    <>
      <div className="flex items-center justify-between px-3 mb-1 cursor-pointer select-none" onClick={() => setCollapsed(c => !c)}>
        <span style={{ color: c.txt3 }} className="text-[11px] font-semibold tracking-wider uppercase">Folders</span>
        <div className="flex items-center gap-1">
          <button style={{ color: c.txt3 }} className="hover:opacity-70 transition-opacity p-0.5" onClick={e => { e.stopPropagation(); setModal("folder"); }}><FolderOpen size={13} /></button>
          {collapsed ? <ChevronDown size={13} style={{ color: c.txt3 }} /> : <ChevronUp size={13} style={{ color: c.txt3 }} />}
        </div>
      </div>

      {!collapsed && (
        <>
          {s.folders.map(f => {
            const act = (s as any).view === "folder" && (s as any).folderId === f.id;
            return (
              <div key={f.id}
                style={{ background: act ? (s.theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)") : "transparent", color: act ? c.txt : c.txt2 }}
                className="group flex items-center gap-2.5 px-3 py-1.5 rounded-lg cursor-pointer text-[13px] transition-all"
                onClick={() => openFolder(f.id)}>
                <Folder size={14} style={{ color: c.txt3 }} />
                <span className="truncate flex-1">{f.label}</span>
                <span style={{ color: c.txt4 }} className="text-xs">{s.tracks.filter(t => t.folderId === f.id).length}</span>
                <button className="opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity"
                  onClick={e => { e.stopPropagation(); setConfirmId(f.id); }}>
                  <X size={11} />
                </button>
              </div>
            );
          })}
          {s.folders.length === 0 && (
            <button style={{ color: c.txt3, border: `1px dashed ${c.border}` }} className="w-full text-center py-4 rounded-lg text-xs hover:opacity-70 transition-opacity mt-1" onClick={() => setModal("folder")}>
              <FolderOpen size={18} className="mx-auto mb-1.5" style={{ color: c.txt4 }} />
              Add a folder
            </button>
          )}
        </>
      )}

      {confirmId && (
        <ConfirmModal
          title="Remove Folder"
          message={`Remove folder "${s.folders.find(f => f.id === confirmId)?.label}" and all its tracks? This cannot be undone.`}
          onConfirm={() => removeFolder(confirmId)}
          onCancel={() => setConfirmId(null)}
        />
      )}
    </>
  );
}
