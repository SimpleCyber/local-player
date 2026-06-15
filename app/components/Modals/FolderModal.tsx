"use client";
import { FolderOpen, X } from "lucide-react";
import { useState, useRef } from "react";
import { usePlayer } from "../../context/PlayerContext";
import { getColors, ACCENT } from "../../lib/utils";

export default function FolderModal({ setModal }: { setModal: (m: string | null) => void }) {
  const { s, processFiles, loading, setLoading } = usePlayer();
  const c = getColors(s.theme === "dark");
  const [folderLabel, setFolderLabel] = useState("");
  const ipt = useRef<HTMLInputElement>(null);

  const onAddFiles = (e: any) => {
    if (!e.target.files?.length) return;
    setLoading(true);
    setTimeout(() => {
      processFiles(e.target.files, folderLabel.trim() || null);
      setLoading(false);
      setModal(null);
    }, 50);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div style={{ background: c.bg, border: `1px solid ${c.border}` }} className="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col pt-4">
        <div className="flex items-center justify-between px-6 pb-4" style={{ borderBottom: `1px solid ${c.border}` }}>
          <h2 style={{ color: c.txt }} className="text-lg font-bold">Add Local Folder</h2>
          <button style={{ color: c.txt3 }} className="p-1 hover:opacity-80 transition-opacity" onClick={() => setModal(null)}><X size={20} /></button>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <label style={{ color: c.txt }} className="block text-[13px] font-semibold mb-1.5 ml-0.5">Folder Alias (Optional)</label>
            <input style={{ background: c.bgEl, color: c.txt, border: `1px solid ${c.border}` }} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[rgba(29,185,84,0.5)] transition-all" placeholder="e.g. My Favorites" value={folderLabel} onChange={e => setFolderLabel(e.target.value)} />
          </div>
          <div style={{ background: c.bgSub, border: `2px dashed ${c.border}` }} className="rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors" onDragOver={e => { e.preventDefault(); e.currentTarget.style.borderColor = ACCENT; }} onDragLeave={e => { e.preventDefault(); e.currentTarget.style.borderColor = c.border; }} onDrop={e => { e.preventDefault(); e.currentTarget.style.borderColor = c.border; if (e.dataTransfer.files.length) { setLoading(true); setTimeout(() => { processFiles(e.dataTransfer.files, folderLabel.trim() || null); setLoading(false); setModal(null); }, 50); } }} onClick={() => ipt.current?.click()}>
            <FolderOpen size={32} style={{ color: c.txt3 }} className="mb-3" />
            <p style={{ color: c.txt }} className="text-sm font-semibold mb-1">Click to browse or drop folder here</p>
            <p style={{ color: c.txt3 }} className="text-xs">Supports .mp3, .mp4, .mkv, .wav</p>
            <input type="file" {...{ webkitdirectory: "true", mozdirectory: "true" } as any} className="hidden" ref={ipt as any} onChange={onAddFiles} />
          </div>
        </div>
        <div className="px-6 py-4 flex justify-end gap-3" style={{ background: c.bgSub, borderTop: `1px solid ${c.border}` }}>
          <button style={{ color: c.txt2 }} className="px-5 py-2.5 text-sm font-semibold hover:opacity-80 transition-opacity" onClick={() => setModal(null)}>Cancel</button>
          <button style={{ background: ACCENT, color: "#000" }} className="px-6 py-2.5 rounded-full text-sm font-bold shadow-md hover:brightness-110 active:scale-95 transition-all" onClick={() => ipt.current?.click()}>
            {loading ? "Adding..." : "Select Folder"}
          </button>
        </div>
      </div>
    </div>
  );
}
