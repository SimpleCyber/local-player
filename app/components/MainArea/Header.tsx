"use client";
import { Play, Search, X, Shuffle } from "lucide-react";
import { usePlayer } from "../../context/PlayerContext";
import { getColors, ACCENT } from "../../lib/utils";
import { Track } from "../../types";

export default function Header({ title, filtered, query, setQuery }: { title: string; filtered: Track[]; query: string; setQuery: object }) {
  const { s, setS, playId } = usePlayer();
  const c = getColors(s.theme === "dark");

  return (
    <header style={{ borderBottom: `1px solid ${c.border}` }} className="flex items-center gap-4 px-6 py-4">
      <div className="flex-1 min-w-0">
        <h1 style={{ color: c.txt }} className="text-[22px] font-bold tracking-tight">{title}</h1>
        <p style={{ color: c.txt3 }} className="text-xs mt-0.5">
          {filtered.length} track{filtered.length !== 1 ? "s" : ""}
          {s.view === "library" && ` · ${s.folders.length} folder${s.folders.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      {filtered.length > 0 && (
        <button style={{ background: ACCENT, color: "#000" }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold hover:brightness-110 transition-all active:scale-95"
          onClick={() => {
            const ids = filtered.map(t => t.id);
            const q = s.shuffle ? [...ids].sort(() => Math.random() - 0.5) : ids;
            playId(q[0], q);
          }}>
          <Play size={14} fill="currentColor" /> Play
        </button>
      )}

      <div style={{ background: c.bgEl, border: `1px solid ${c.border}` }} className="flex items-center gap-2 px-3 py-2 rounded-lg w-52">
        <Search size={14} style={{ color: c.txt3 }} />
        <input style={{ color: c.txt }} className="bg-transparent outline-none text-sm w-full placeholder-gray-500" placeholder="Search tracks…" value={query} onChange={e => (setQuery as any)(e.target.value)} />
        {query && <button style={{ color: c.txt3 }} onClick={() => (setQuery as any)("")}><X size={13} /></button>}
      </div>

      <button style={{ background: s.shuffle ? ACCENT : "transparent", color: s.shuffle ? "#000" : c.txt3 }}
        className="p-2 rounded-lg transition-all hover:opacity-80"
        onClick={() => setS(p => ({ ...p, shuffle: !p.shuffle }))} title="Shuffle">
        <Shuffle size={15} />
      </button>
    </header>
  );
}
