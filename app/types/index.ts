export interface Track {
  id: string;
  path: string;
  title: string;
  folderId: string | null;
  objectUrl?: string;
  type: "audio" | "video";
  liked: boolean;
  size: number;
}
export interface Folder { id: string; label: string; count: number; }
export interface Playlist { id: string; name: string; trackIds: string[]; }
export interface AppState {
  folders: Folder[];
  tracks: Track[];
  playlists: Playlist[];
  queue: string[];
  currentTrackId: string | null;
  currentIndex: number;
  shuffle: boolean;
  repeat: "none" | "all" | "one";
  volume: number;
  theme: "light" | "dark";
  view: "library" | "liked" | "queue" | "playlist";
  playlistId: string | null;
}
export const STORAGE = "melodia_v3";
export const defaults: AppState = {
  folders: [], tracks: [], playlists: [], queue: [],
  currentTrackId: null, currentIndex: 0, shuffle: false,
  repeat: "none", volume: 0.75, theme: "dark",
  view: "library", playlistId: null,
};
