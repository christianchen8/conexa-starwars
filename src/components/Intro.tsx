import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import { useAudio } from "@/hooks/useAudio";

// Assets
import logo from "../../public/sw_logo.png";
import soundOn from "../../public/icons/sound_on.svg";
import soundOff from "../../public/icons/sound_off.svg";

interface IntroProps {
  setHome: (value: string) => void;
}

export function Intro({ setHome }: IntroProps) {
  const introRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const url =
    "https://ia801501.us.archive.org/23/items/StarWars_20180709/Star%20Wars.mp3";

  const { playing, setPlaying } = useAudio(url);

  useEffect(() => {
    /* @ts-ignore */
    let tl = new gsap.timeline();

    tl.to(introRef.current, { opacity: 1, delay: 1, duration: 4.5 })
      .to(introRef.current, {
        opacity: 0,
        duration: 1.5,
        onComplete: () => {
          setPlaying(true);
        },
      })
      // add a short delay on the next step to sync better with the audio
      .set(titleRef.current, { opacity: 1, scale: 2.75, delay: 0.3 })
      .to(titleRef.current, { scale: 0.05, ease: "power2", duration: 8 })
      .to(titleRef.current, { opacity: 0, duration: 1.5 }, "-=1.5")
      .to(contentRef.current, {
        top: "-170%",
        duration: 200,
        onComplete: () => {
          setPlaying(false);
        },
      });
  }, [introRef, titleRef, contentRef]);

  useEffect(() => {
    setTimeout(() => {
      setPlaying(false);
      setHome("home");
    }, 90000);
  }, []);

  return (
    <div className="container bg-space">
      <section className="intro" ref={introRef}>
        <p>
          Not a long time ago, in a city
          <br /> not far away in Argentina....
        </p>
      </section>

      <section className="title" ref={titleRef}>
        <Image src={logo} alt="logo" height={100} width={150} />
      </section>

      <section className="crawl">
        <div className="content" ref={contentRef}>
          <h1 className="episode-number">Episode XXI</h1>
          <h2 className="episode-title">THE CHALLENGE BEGINS</h2>
          <p>
            The Development Team of Conexa is searching for a new Tech Lead.
            They will not rest until find the best tech lead to join the
            company.
          </p>
          <p>
            With the support of the HR Team, a new candidate has appear. He
            seems to be a good resource to incorpore the team. But first he will
            need to pass some challenges.
          </p>
          <p>
            The HR Team sent the candidate a challenge and he will need to prove
            he is worthy for the position....
          </p>
        </div>
      </section>

      <button
        className="volume"
        type="button"
        onClick={() => setPlaying(!playing)}
      >
        {playing ? (
          <Image src={soundOn} alt="Volume is on" width={20} height={20} />
        ) : (
          <Image src={soundOff} alt="Volume is on" width={20} height={20} />
        )}
      </button>
    </div>
  );
}
