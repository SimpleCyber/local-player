"use client";
import { Music, Heart, List, ChevronRight, Sun, Moon, Plus } from "lucide-react";
import { usePlayer } from "../../context/PlayerContext";
import { getColors, ACCENT } from "../../lib/utils";
import PlaylistsArea from "./PlaylistsArea";
import FoldersArea from "./FoldersArea";

export default function Sidebar({ setModal, onPlPick }: any) {
  const { s, setS, sidebarCollapsed, setSidebarCollapsed } = usePlayer();
  const c = getColors(s.theme === "dark");

  const links = [
    { key: "library", icon: Music, label: "Library" },
    { key: "liked", icon: Heart, label: "Liked Songs" },
    { key: "queue", icon: List, label: "Queue" },
  ];

  return (
    <aside style={{ background: c.bgSub, borderRight: `1px solid ${c.border}`, width: sidebarCollapsed ? 72 : 240 }} className="flex flex-col flex-shrink-0 transition-all duration-300">
      <div className={`px-5 pt-5 pb-3 flex items-center ${sidebarCollapsed ? "justify-center px-0" : "gap-2.5"}`}>
        <div style={{ background: ACCENT }} className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0">
          <Music size={14} className="text-black" />
        </div>
        {!sidebarCollapsed && <span style={{ color: c.txt }} className="font-semibold text-[15px] tracking-tight">Melodia</span>}
        <button className={`opacity-50 hover:opacity-100 transition-opacity ${sidebarCollapsed ? "ml-0 mt-3 absolute" : "ml-auto"}`}
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
          <ChevronRight size={16} className={`transition-transform ${sidebarCollapsed ? "rotate-0" : "rotate-180"}`} />
        </button>
      </div>

      <nav className="px-3 mt-1 space-y-0.5">
        {links.map(({ key, icon: Icon, label }) => {
          const act = s.view === key && s.view !== "playlist";
          return (
            <button key={key}
              style={{ background: act ? (s.theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)") : "transparent",
                       color: act ? c.txt : c.txt2, justifyContent: sidebarCollapsed ? "center" : "flex-start" }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all"
              onClick={() => setS(p => ({ ...p, view: key as any, playlistId: null }))}
              title={sidebarCollapsed ? label : undefined}>
              <Icon size={16} className="flex-shrink-0" />
              {!sidebarCollapsed && label}
            </button>
          );
        })}
      </nav>

      <div style={{ borderTop: `1px solid ${c.border}` }} className="mx-5 my-3" />

      {!sidebarCollapsed ? (
        <div className="px-3 flex-1 overflow-y-auto scrollbar-none">
          <PlaylistsArea onPlPick={onPlPick} />
          <div style={{ borderTop: `1px solid ${c.border}` }} className="mx-2 my-3" />
          <FoldersArea setModal={setModal} />
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center gap-4 mt-2">
          <button style={{ color: c.txt3 }} className="p-2 hover:bg-white/5 rounded-lg group relative" title="Playlists"><List size={18} /></button>
          <button style={{ color: c.txt3 }} className="p-2 hover:bg-white/5 rounded-lg group relative" title="Folders" onClick={() => setModal("folder")}><List size={18} /></button>
        </div>
      )}

      <div style={{ borderTop: `1px solid ${c.border}` }} className="p-3 flex items-center justify-center gap-2">
        {!sidebarCollapsed && (
          <button style={{ background: c.bgEl, color: c.txt2 }}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium hover:brightness-95 transition-all"
            onClick={() => setModal("folder")}>
            <Plus size={13} /> Add Music
          </button>
        )}
        <button style={{ color: c.txt3 }} className="p-2 rounded-lg hover:opacity-70 transition-opacity"
          onClick={() => setS(p => ({ ...p, theme: p.theme === "dark" ? "light" : "dark" }))} title="Toggle Theme">
          {s.theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>
    </aside>
  );
}
