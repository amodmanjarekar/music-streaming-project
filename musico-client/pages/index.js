import { useState, useEffect } from "react";
import Layout from "../components/layout";
import Link from "next/link";

import styles from "../styles/Home.module.css";
import axios from "axios";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [musicList, setMusicList] = useState(["one", "two"]);

  useEffect(() => {
    setIsLoading(true);
    axios({
      method: "get",
      url: `http://localhost:8888/`,
    }).then((response) => {
      setMusicList(response.data.songs);
      console.log(response.data.songs);           // array of songs      // res..data.songs[0] gives the first song  // res...data.songs[0].song_id
    });
  }, []);

  return (
    <div className={styles.homelayout}>
      <div className={styles.musiclist}>
        <div className={styles.mlisttitle}>Music List:</div>
        {/* {allmusic.map((i) => {
          return <Musiccard name={i} />;
        })} */}

        <p>{musicList[1].title}</p>

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
  return (
    <div className={styles.musiccard}>
      <div>&#9658;</div>
      <div>{props.name}</div>
      <div>Album</div>
      <div>Date</div>
      <div>Duration</div>
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
