import React, { useEffect, useRef, useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Volume2,
  VolumeX,
  Play,
} from "lucide-react";
import { useSelector } from "react-redux";

export default function Home() {
  const { foods } = useSelector((state) => state.food);
  
  const containerRef = useRef(null);
  const videoRefs = useRef([]);
  const cardRefs = useRef([]);
  const [muted, setMuted] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [liked, setLiked] = useState(() => new Set());

  // IntersectionObserver to auto play/pause
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          const video = videoRefs.current[index];
          if (!video) return;

          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            // Pause others
            videoRefs.current.forEach((v, i) => {
              if (i !== index && v && !v.paused) v.pause();
            });
            video.muted = muted;
            video.play().catch(() => {});
            setActiveIndex(index);
          } else {
            if (!video.paused) video.pause();
          }
        });
      },
      { threshold: [0, 0.6, 1] }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [muted]);

  // Keyboard navigation (Up/Down like reels)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        goTo(activeIndex + 1);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        goTo(activeIndex - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex]);

  const goTo = (idx) => {
    if (idx < 0 || idx >= REELS.length) return;
    cardRefs.current[idx]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const toggleLike = (id) => {
    setLiked((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  };

  const toggleMute = () => {
    setMuted((m) => {
      const next = !m;
      // Apply to current playing video immediately
      const v = videoRefs.current[activeIndex];
      if (v) v.muted = next;
      return next;
    });
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black text-white overflow-y-scroll snap-y snap-mandatory"
      style={{ height: "100vh" }}
    >
      {/* Subtle animated background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl bg-purple-500/10" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full blur-3xl bg-fuchsia-500/10" />
      </div>

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3">
        <h1 className="text-xl font-semibold tracking-wide">Reels</h1>
        <button
          onClick={toggleMute}
          className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md px-3 py-2 text-sm hover:bg-white/10 transition"
        >
          {muted ? (
            <span className="inline-flex items-center gap-2">
              <VolumeX size={18} /> Muted
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <Volume2 size={18} /> Sound
            </span>
          )}
        </button>
      </div>

      {/* Reels list */}
      <div className="relative">
        {foods.map((item, i) => (
          <section
            key={item._id}
            ref={(el) => (cardRefs.current[i] = el)}
            data-index={i}
            className="snap-start h-screen w-full relative flex items-center justify-center"
          >
            {/* Video container with glass frame */}
            <div className="relative h-full w-full sm:h-[90vh] sm:w-[420px] sm:rounded-3xl sm:border sm:border-white/10 sm:bg-white/5 sm:backdrop-blur-xl overflow-hidden shadow-2xl">
              <video
                ref={(el) => (videoRefs.current[i] = el)}
                src={item.video}
                className="h-full w-full object-cover"
                playsInline
                loop
                muted={muted}
                preload="metadata"
                onClick={(e) => {
                  const v = e.currentTarget;
                  if (v.paused) v.play();
                  else v.pause();
                }}
              />

              {/* Tap-to-play icon */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                {/* show play icon when paused */}
                <PlayHint videoRef={videoRefs.current[i]} />
              </div>

              {/* Gradient overlays */}
              <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/70 to-transparent" />

              {/* Right action bar */}
              <div className="absolute right-3 bottom-28 flex flex-col items-center gap-5">
                <button
                  onClick={() => toggleLike(item.id)}
                  className="rounded-2xl bg-black/30 hover:bg-black/50 border border-white/10 p-3 backdrop-blur-md transition"
                >
                  <Heart className={liked.has(item.id) ? "fill-white" : ""} />
                </button>
                <button className="rounded-2xl bg-black/30 hover:bg-black/50 border border-white/10 p-3 backdrop-blur-md transition">
                  <MessageCircle />
                </button>
                <button className="rounded-2xl bg-black/30 hover:bg-black/50 border border-white/10 p-3 backdrop-blur-md transition">
                  <Share2 />
                </button>
              </div>

              {/* Bottom meta */}
              <div className="absolute left-4 right-20 bottom-6 space-y-1">
                <p className="text-sm text-white/90 font-medium">{item.user}</p>
                <p className="text-sm text-white/80">{item.caption}</p>
                <p className="text-xs text-white/60">
                  {Intl.NumberFormat().format(
                    item.likes + (liked.has(item.id) ? 1 : 0)
                  )}{" "}
                  likes • {item.comments} comments
                </p>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function PlayHint({ videoRef }) {
  const [paused, setPaused] = useState(true);
  useEffect(() => {
    if (!videoRef) return;
    const onPlay = () => setPaused(false);
    const onPause = () => setPaused(true);
    videoRef.addEventListener("play", onPlay);
    videoRef.addEventListener("pause", onPause);
    // initialize
    setPaused(videoRef.paused);
    return () => {
      videoRef.removeEventListener("play", onPlay);
      videoRef.removeEventListener("pause", onPause);
    };
  }, [videoRef]);

  if (!paused) return null;
  return (
    <div className="flex items-center justify-center">
      <div className="rounded-full bg-black/40 border border-white/20 p-4 backdrop-blur-md">
        <Play size={28} />
      </div>
    </div>
  );
}
