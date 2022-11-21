import { useState, useEffect, useContext } from "react";
import Layout from "../components/layout";
import Link from "next/link";

import { FaPlay } from "react-icons/fa";
import styles from "../styles/Home.module.css";
import axios from "axios";
import MusicContext from "../lib/MusicContext";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [musicList, setMusicList] = useState();

  useEffect(() => {
    setIsLoading(true);
    axios({
      method: "get",
      url: `http://localhost:8888/`,
    }).then((response) => {
      setMusicList(response.data.songs);
      setIsLoading(false);
      console.log(response.data.songs);
    });
  }, []);

  return (
    <div className={styles.homelayout}>
      <div className={styles.musiclist}>
        <div className={styles.mlisttitle}>Music List:</div>
        {isLoading ? (
          <>Now Loading</>
        ) : (
          musicList?.map((i) => {
            return (
              <Musiccard
                id={i.song_id}
                title={i.title}
                artist={i.artist}
                duration={i.duration}
                albumid={i.album_id}
                link={i.link}
              />
            );
          })
        )}

        {/* <Musiccard
          title="Sample1"
          artist="Man1"
          link="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        />
        <Musiccard
          title="Sample2"
          artist="Man2"
          link="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
        /> */}

        {"< Page 1/10 >"}
      </div>
      <div className={styles.alistcontainer}>
        Recent Albums:
        <br />
        <div className={styles.alist}>
          <div className={styles.samplebox}></div>
          <div className={styles.samplebox}></div>
          <div className={styles.samplebox}></div>
        </div>
      </div>
      <div className={styles.plistcontainer}>
        Recent Playlists:
        <br />
        <div className={styles.plist}>
          <div className={styles.samplebox}></div>
          <div className={styles.samplebox}></div>
          <div className={styles.samplebox}></div>
        </div>
      </div>
    </div>
  );
}

function Musiccard(props) {
  const nowplaying = useContext(MusicContext);

  function changeCurrentSong() {
    nowplaying.setCurrentSong({
      id: props.id,
      title: props.title,
      artist: props.artist,
      duration: props.duration,
      albumid: props.albumid,
      link: props.link,
    });
  }

  return (
    <div onClick={changeCurrentSong} className={styles.musiccard}>
      <div>
        <FaPlay />
      </div>
      <div>{props.title}</div>
      <div>{props.artist}</div>
      <div>{props.albumid}</div>
      <div>{props.duration}</div>
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
