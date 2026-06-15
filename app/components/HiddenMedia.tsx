"use client";
import { usePlayer } from "../context/PlayerContext";
import { isVid } from "../lib/utils";
import { Minimize2 } from "lucide-react";
import { useRef, useEffect } from "react";

export default function HiddenMedia() {
  const { track, media, setTime, setDur, playing, setPlaying, setLoading, next, prev, showVideo, videoFullscreen, setVideoFullscreen } = usePlayer();

  const handleTime = () => setTime(media.current?.currentTime || 0);
  const handleDur = () => setDur(media.current?.duration || 0);
  const lastPause = useRef(0);

  const handleEnd = () => next();
  const handlePlay = () => setPlaying(true);
  const handlePause = () => {
    lastPause.current = Date.now();
    setPlaying(false);
  };
  const handleWaiting = () => setLoading(true);
  const handleCanPlay = () => setLoading(false);
  
  const audioPipRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = media.current as any;
    const audEl = audioPipRef.current as any;
    const onLeave = () => {
      if (Date.now() - lastPause.current < 150) {
        setPlaying(true);
        el?.play().catch(()=>{});
      }
    };
    if (el) el.addEventListener('leavepictureinpicture', onLeave);
    if (audEl) audEl.addEventListener('leavepictureinpicture', onLeave);
    return () => {
      if (el) el.removeEventListener('leavepictureinpicture', onLeave);
      if (audEl) audEl.removeEventListener('leavepictureinpicture', onLeave);
    };
  }, [media, setPlaying]);

  useEffect(() => {
    if ('mediaSession' in navigator && track) {
      navigator.mediaSession.metadata = new window.MediaMetadata({ title: track.title, artist: 'Melodia Player' });
      navigator.mediaSession.setActionHandler('play', () => { media.current?.play(); setPlaying(true); });
      navigator.mediaSession.setActionHandler('pause', () => { media.current?.pause(); setPlaying(false); });
      navigator.mediaSession.setActionHandler('previoustrack', () => prev());
      navigator.mediaSession.setActionHandler('nexttrack', () => next());
    }
  }, [track, next, prev, setPlaying, media]);

  useEffect(() => {
    if (!track || isVid(track.path)) return;
    const cvs = document.createElement("canvas"); cvs.width = 400; cvs.height = 100;
    const ctx = cvs.getContext("2d")!; ctx.fillStyle = "#121212"; ctx.fillRect(0,0,400,100);
    ctx.fillStyle = "#1db954"; ctx.font = "bold 16px sans-serif"; ctx.textAlign = "center";
    ctx.fillText(track.title.substring(0, 45) + (track.title.length > 45 ? "..." : ""), 200, 55);
    const stream = cvs.captureStream();
    if (audioPipRef.current) {
        const pipEl = audioPipRef.current as any;
        pipEl.srcObject = stream;
        pipEl.play().catch(()=>{});
    }
  }, [track]);

  // Ensure auto Picture-in-Picture is enabled when supported by the browser.
  useEffect(() => {
    const tryEnableAutoPiP = (node: any) => {
      if (node && 'autoPictureInPicture' in node) {
        try {
          (node as any).autoPictureInPicture = true;
        } catch {
          // ignore if the property is readonly or not allowed
        }
      }
    };

    const mainEl = media.current as any;
    if (mainEl && mainEl.tagName === 'VIDEO') {
      tryEnableAutoPiP(mainEl);
    }
    if (audioPipRef.current) {
      tryEnableAutoPiP(audioPipRef.current);
    }
  }, [track, showVideo, media]);

  // Forcefully enable PIP via Visibility API (Override for when browsers secretly ignore autoPictureInPicture)
  useEffect(() => {
    const handleVis = () => {
      if (document.visibilityState === "hidden") {
        // Tab hidden -> Extract
        if (!document.pictureInPictureElement && playing) {
          const v = document.querySelector("video");
          if (v) v.requestPictureInPicture().catch(() => {});
        }
      } else {
        // Tab restored -> Pull it back optionally
        // if (document.pictureInPictureElement) document.exitPictureInPicture().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", handleVis);
    return () => document.removeEventListener("visibilitychange", handleVis);
  }, [playing]);

  if (!track) return <audio ref={media as any} className="hidden" />;

  const isVideo = isVid(track.path);
  
  if (isVideo && showVideo) {
    return (
      <div className={videoFullscreen ? "fixed inset-0 z-40 bg-black flex items-center justify-center p-8" : "flex-1 flex items-center justify-center p-4 bg-transparent w-full h-full"}>
        {videoFullscreen && (
          <button className="absolute top-4 right-4 z-50 text-white/60 hover:text-white transition-colors p-2" onClick={() => setVideoFullscreen(false)}>
            <Minimize2 size={24} />
          </button>
        )}
        <video ref={media as any} className={`w-full rounded-lg ${videoFullscreen ? "h-full object-contain" : ""}`} style={{ maxHeight: "100%" }}
          onTimeUpdate={handleTime} onDurationChange={handleDur} onEnded={handleEnd}
          onPlay={handlePlay} onPause={handlePause} onWaiting={handleWaiting} onCanPlay={handleCanPlay}
          onClick={() => { const el = media.current; if (el) el.paused ? el.play() : el.pause(); }}
        />
      </div>
    );
  }

  if (isVideo) {
    return <video ref={media as any} className="fixed -z-50 w-64 h-64 right-0 bottom-0 opacity-[0.01] pointer-events-none" onTimeUpdate={handleTime} onDurationChange={handleDur} onEnded={handleEnd} onPlay={handlePlay} onPause={handlePause} onWaiting={handleWaiting} onCanPlay={handleCanPlay} />;
  }

  return (
    <>
      <audio ref={media as any} className="hidden" onTimeUpdate={handleTime} onDurationChange={handleDur} onEnded={handleEnd} onPlay={handlePlay} onPause={handlePause} onWaiting={handleWaiting} onCanPlay={handleCanPlay} />
      {!isVideo && <video ref={audioPipRef} muted playsInline className="fixed -z-50 w-64 h-64 right-0 bottom-0 opacity-[0.01] pointer-events-none" />}
    </>
  );
}
