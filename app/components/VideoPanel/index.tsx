"use client";
import { useState, useRef } from "react";
import { Maximize2, Minimize2, X } from "lucide-react";
import { usePlayer } from "../../context/PlayerContext";
import { getColors } from "../../lib/utils";
import HiddenMedia from "../HiddenMedia";

export default function VideoPanel() {
  const { s, track, showVideo, setShowVideo, videoFullscreen, setVideoFullscreen } = usePlayer();
  const c = getColors(s.theme === "dark");
  const dark = s.theme === "dark";
  const [videoWidth, setVideoWidth] = useState(420);
  const resizing = useRef(false);

  if (!showVideo || !track || track.type !== "video") return <HiddenMedia />;

  const startResize = (e: React.MouseEvent) => {
    e.preventDefault();
    resizing.current = true;
    const onMove = (evt: MouseEvent) => {
      if (!resizing.current) return;
      const w = window.innerWidth - evt.clientX;
      setVideoWidth(Math.max(280, Math.min(800, w)));
    };
    const onUp = () => { resizing.current = false; window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  if (videoFullscreen) return <HiddenMedia />;

  return (
    <div style={{ width: videoWidth, background: dark ? "#0a0a0a" : "#fafafa", borderLeft: `1px solid ${c.border}` }} className="flex flex-col flex-shrink-0 relative">
      <div className="resize-handle left-0" onMouseDown={startResize} />
      <div style={{ borderBottom: `1px solid ${c.border}` }} className="flex items-center justify-between px-4 py-3">
        <span style={{ color: c.txt }} className="text-sm font-medium">Video</span>
        <div className="flex gap-1">
          <button style={{ color: c.txt3 }} className="p-1 hover:opacity-70 transition-opacity" onClick={() => setVideoFullscreen(true)} title="Fullscreen">
            <Maximize2 size={14} />
          </button>
          <button style={{ color: c.txt3 }} className="p-1 hover:opacity-70 transition-opacity" onClick={() => setShowVideo(false)} title="Close">
            <X size={14} />
          </button>
        </div>
      </div>
      <HiddenMedia />
    </div>
  );
}
