import { useState, useEffect } from "react";

export const useAudio = (url: string) => {
  const [audio, setAudio] = useState<any | null>(null);
  const [playing, setPlaying] = useState(false);

  // const toggle = () => setPlaying(!playing);

  useEffect(() => {
    setAudio(new Audio(url));
  }, []);

  useEffect(() => {
    if (audio) {
      playing ? audio.play() : audio.pause();
    }
  }, [playing, audio]);

  useEffect(() => {
    audio && audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio && audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return { playing, setPlaying };
};
