"use client";
import { useState, useRef } from "react";
import { FolderOpen } from "lucide-react";
import { PlayerProvider, usePlayer } from "./context/PlayerContext";
import Sidebar from "./components/Sidebar";
import MainArea from "./components/MainArea";
import VideoPanel from "./components/VideoPanel";
import PlayerBar from "./components/PlayerBar";
import Modals from "./components/Modals";

function PlayerLayout() {
  const { s, processFiles } = usePlayer();
  const [modal, setModal] = useState<string | null>(null);
  const [pickTrackId, setPickTrackId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [drag, setDrag] = useState(false);
  const dragCnt = useRef(0);

  const onDragEnter = (e: React.DragEvent) => { e.preventDefault(); dragCnt.current++; setDrag(true); };
  const onDragLeave = (e: React.DragEvent) => { e.preventDefault(); dragCnt.current--; if (dragCnt.current === 0) setDrag(false); };
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault(); dragCnt.current = 0; setDrag(false);
    if (e.dataTransfer.files?.length) processFiles(e.dataTransfer.files);
  };

  const onPlPick = (id: string) => { setPickTrackId(id); setModal("playlist"); };

  return (
    <div className={`fixed inset-0 flex flex-col font-sans transition-colors duration-200 ${s.theme === "dark" ? "dark" : "light"}`}
      style={{ background: s.theme === "dark" ? "#121212" : "#ffffff", color: s.theme === "dark" ? "#ffffff" : "#1a1a1a" }}
      onDragEnter={onDragEnter} onDragOver={e => e.preventDefault()} onDragLeave={onDragLeave} onDrop={onDrop}>
      
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar setModal={setModal} onPlPick={onPlPick} />
        <MainArea setModal={setModal} query={query} setQuery={setQuery} onPlPick={onPlPick} />
        <VideoPanel />
        
        {drag && (
          <div className="absolute inset-0 z-50 bg-[rgba(29,185,84,0.15)] flex items-center justify-center backdrop-blur-sm pointer-events-none transition-all">
            <div className="bg-[rgba(29,185,84,0.9)] text-white px-8 py-5 rounded-2xl shadow-2xl flex flex-col items-center gap-3 animate-in zoom-in-95">
              <FolderOpen size={36} />
              <p className="font-bold text-lg">Drop media here</p>
            </div>
          </div>
        )}
      </div>

      <PlayerBar />
      <Modals modal={modal} setModal={setModal} pickTrackId={pickTrackId} setPickTrackId={setPickTrackId} />

    </div>
  );
}

export default function Melodia() {
  return (
    <PlayerProvider>
      <PlayerLayout />
    </PlayerProvider>
  );
}
