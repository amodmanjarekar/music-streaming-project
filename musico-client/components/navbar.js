import Link from "next/link";
import axios from "axios";

import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";
import { useState, useEffect, useRef, useContext } from "react";
import { useRouter } from "next/router";
import styles from "./Navbar.module.css";

import MusicContext from "../lib/MusicContext";
import SearchContext from "../lib/SearchContext";
import UserContext from "../lib/UserContext";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isCurrent, setIsCurrent] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const searchRef = useRef();

  const musicPlayer = useRef();
  const musicProgress = useRef();
  const animationRef = useRef();

  const searchquery = useContext(SearchContext);

  const nowplaying = useContext(MusicContext);

  const userdata = useContext(UserContext);

  const router = useRouter();

  useEffect(() => {
    if (userdata.userId != 0) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    if (nowplaying.currentSong) {
      musicPlayer.current?.play();
      setIsCurrent(true);
      setIsPlaying(true);
    }
    // musicPlayer.current?.play();
    // console.log(nowplaying.currentSong?.name);
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
              ref={searchRef}
              className={styles.navsearch}
              type="text"
              placeholder="Search for music..."
              // onKeyUpCapture={() => {
              //   if (searchRef.current.value.length > 2) {
              //     // console.log(searchquery.query);
              //   }
              // }}
              onChange={() => {
                searchquery.setQuery(searchRef.current.value);
                if (searchRef.current.value.length > 1) {
                  router.push({
                    pathname: "/search",
                  });
                }
              }}
            />
          </div>
          <div>
            <button
              className={styles.navsearchbtn}
              onClick={() => {
                searchquery.setQuery(searchRef.current.value);
                router.push(`/search?${searchRef.current.value}`);
              }}
            >
              Go
            </button>
          </div>
        </div>
        {isCurrent ? (
          <div className={`${styles.navcenter} ${styles.musicplayer}`}>
            <h1>
              {nowplaying.currentSong?.artist} - {nowplaying.currentSong?.title}{" "}
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
              <Link href="/user/upload">
                <button className={styles.navbtn}>Upload</button>
              </Link>
              <Link href="/user/profile">
                <ProfileButton></ProfileButton>
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

const ProfileButton = () => {
  return (
    <div className={styles.navprofile}>
      <div className={styles.navprofilehead}></div>
      <div className={styles.navprofilebody}></div>
    </div>
  );
};
