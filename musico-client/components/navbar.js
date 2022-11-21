import Link from "next/link";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";
import { useState, useEffect, useRef, useContext } from "react";
import MusicContext from "../lib/MusicContext";

import styles from "./Navbar.module.css";

export default function Navbar() {
  const isLoggedIn = true;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCurrent, setIsCurrent] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const musicPlayer = useRef();
  const musicProgress = useRef();
  const animationRef = useRef();

  const nowplaying = useContext(MusicContext);

  useEffect(() => {
    if (nowplaying.currentSong) {
      setIsCurrent(true);
      setIsPlaying(true);
    }
    // musicPlayer.current?.play();
    console.log(nowplaying.currentSong?.name);
  }, [nowplaying.currentSong]);

  useEffect(() => {
    const seconds = Math.floor(musicPlayer.current?.duration);
    if (musicProgress.current) {
      musicProgress.current.max = seconds;
    }
  }, [isCurrent]);

  useEffect(() => {
    if (isPlaying) {
      musicPlayer.current?.play();
      animationRef.current = requestAnimationFrame(whileplaying);
    } else {
      musicPlayer.current?.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }, [isPlaying]);

  const whileplaying = () => {
    musicProgress.current.value = musicPlayer.current.currentTime;
    musicProgress.current.style.setProperty(
      "--seek-before-width",
      `${(musicProgress.current.value / musicPlayer.current.duration) * 100}%`
    );
    setCurrentTime(musicProgress.current.value);
    animationRef.current = requestAnimationFrame(whileplaying);
  };

  const changeprogress = () => {
    musicPlayer.current.currentTime = musicProgress.current.value;
    musicProgress.current.style.setProperty(
      "--seek-before-width",
      `${(musicProgress.current.value / musicPlayer.current.duration) * 100}%`
    );
    setCurrentTime(musicProgress.current.value);
  };

  return (
    <div className={styles.playercontainer}>
      <div className={styles.navcontainer}>
        <div className={styles.navleft}>
          <Link href="/">
            <div className={styles.navlogo}>M</div>
          </Link>
          <div>
            <input
              className={styles.navsearch}
              type="text"
              placeholder="Search for music..."
            />
          </div>
          <div>
            <button className={styles.navsearchbtn}>Go</button>
          </div>
        </div>
        {isCurrent ? (
          <div className={`${styles.navcenter} ${styles.musicplayer}`}>
            <h1>
              {nowplaying.currentSong?.artist} - {nowplaying.currentSong?.title}
            </h1>
            <div className={styles.musiccontrols}>
              <div>
                <FaBackward />
              </div>
              {isPlaying ? (
                <div
                  onClick={() => {
                    setIsPlaying(false);
                  }}
                >
                  <FaPause />
                </div>
              ) : (
                <div
                  onClick={() => {
                    setIsPlaying(true);
                  }}
                >
                  <FaPlay />
                </div>
              )}
              <div>
                <FaForward />
              </div>
              <audio
                ref={musicPlayer}
                // src={`../../musico-server/public/nuumonelite.mp3`}
                src={nowplaying.currentSong?.link}
              ></audio>
            </div>
          </div>
        ) : (
          <>Play some music!</>
        )}
        <div className={styles.navbtncontainer}>
          {isLoggedIn ? (
            <>
              <button className={styles.navbtn}>Upload</button>
              <Link href="/user/profile">
                <button className={styles.navprofile}></button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/user/login">
                <button className={styles.navbtn}>Log in</button>
              </Link>
              <Link href="/user/register">
                <button className={styles.navbtn}>Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {isCurrent ? (
        <div className={styles.musicprogresscontainer}>
          <input
            className={styles.musicprogress}
            type="range"
            defaultValue="0"
            ref={musicProgress}
            onChange={changeprogress}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
