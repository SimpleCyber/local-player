"use client";
import FolderModal from "./FolderModal";
import PlaylistModal from "./PlaylistModal";

export default function Modals({ modal, setModal, pickTrackId, setPickTrackId }: any) {
  if (modal === "folder") {
    return <FolderModal setModal={setModal} />;
  }
  
  if (modal === "playlist" && pickTrackId) {
    return <PlaylistModal setModal={setModal} pickTrackId={pickTrackId} setPickTrackId={setPickTrackId} />;
  }

  return null;
}
