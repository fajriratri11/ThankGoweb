"use client";

import { useEffect, useRef } from "react";

export default function AudioPlayer({ music }: { music: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const playAudio = () => {
      audioRef.current?.play();
      document.removeEventListener("click", playAudio);
    };
    document.addEventListener("click", playAudio);
    return () => document.removeEventListener("click", playAudio);
  }, []);

  return <audio ref={audioRef} src={music} loop hidden />;
}
