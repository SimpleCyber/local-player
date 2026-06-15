"use client";
import { getColors } from "../../lib/utils";
import { usePlayer } from "../../context/PlayerContext";
import Header from "./Header";
import TrackTable from "./TrackTable";

export default function MainArea({ setModal, query, setQuery, onPlPick }: any) {
  const { s } = usePlayer();
  const c = getColors(s.theme === "dark");

  const filtered = (() => {
    let t = s.tracks;
    const q = query.toLowerCase();
    if (q) t = t.filter((x: any) => x.title.toLowerCase().includes(q) || x.path.toLowerCase().includes(q));

    if (s.view === "liked") t = t.filter((x: any) => x.liked);
    else if (s.view === "playlist" && s.playlistId) {
      const pl = s.playlists.find((p: any) => p.id === s.playlistId);
      if (pl) t = pl.trackIds.map((id: any) => s.tracks.find((x: any) => x.id === id)).filter((x: any): x is any => !!x);
    } else if (s.view === "queue") {
      t = s.queue.map((id: any) => s.tracks.find((x: any) => x.id === id)).filter((x: any): x is any => !!x);
    } else if ((s as any).view === "folder" && (s as any).folderId) {
      t = t.filter((x: any) => x.folderId === (s as any).folderId);
    }
    return t;
  })();

  const activePl = s.playlists.find((p: any) => p.id === s.playlistId);
  const activeFolder = s.folders.find((f: any) => f.id === (s as any).folderId);
  const title =
    s.view === "liked" ? "Liked Songs" :
    s.view === "queue" ? "Play Queue" :
    s.view === "playlist" && activePl ? activePl.name :
    (s as any).view === "folder" && activeFolder ? activeFolder.label :
    "Your Library";

  return (
    <main style={{ background: c.bg }} className="flex-1 flex flex-col overflow-hidden">
      <Header title={title} filtered={filtered} query={query} setQuery={setQuery} isFolder={(s as any).view === "folder"} />
      <div className="flex-1 overflow-y-auto px-2 py-1">
        <TrackTable filtered={filtered} setModal={setModal} onPlPick={onPlPick} />
      </div>
    </main>
  );
}
