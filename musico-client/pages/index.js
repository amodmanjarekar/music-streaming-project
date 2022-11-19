import { useState, useEffect } from "react";
import Layout from "../components/layout";
import Link from "next/link";

import styles from "../styles/Home.module.css";
import axios from "axios";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  // const [musicList, setMusicList] = useState(["one", "two"]);

  const musiclist = {
    songs: [
      {
        song_id: 1,
        title: "son0",
        artist: 3,
        duration: null,
        album_id: 3,
        link: "path0",
      },
      {
        song_id: 2,
        title: "son1",
        artist: 1,
        duration: null,
        album_id: 2,
        link: "path1",
      },
      {
        song_id: 3,
        title: "son2",
        artist: 1,
        duration: null,
        album_id: 2,
        link: "path3",
      },
      {
        song_id: 4,
        title: "01 Sukoon Mila - Mary Kom (Arijit Singh) 160Kbps.mp3",
        artist: 16,
        duration: null,
        album_id: 2,
        link: "..\\musico-server\\public\\uploads\\music_files1668429457537.mp3",
      },
      {
        song_id: 5,
        title: "01 Sukoon Mila - Mary Kom (Arijit Singh) 160Kbps.mp3",
        artist: 16,
        duration: null,
        album_id: 2,
        link: "..musico-serverpublicuploadsmusic_files1668429676871.mp3",
      },
      {
        song_id: 6,
        title: "02.Bolna.mp3",
        artist: 16,
        duration: null,
        album_id: 2,
        link: "..musico-serverpublicuploadsmusic_files1668429676915.mp3",
      },
      {
        song_id: 7,
        title: "02.Bolna.mp3",
        artist: 16,
        duration: null,
        album_id: 2,
        link: "..musico-serverpublicuploadsmusic_files1668430200902.mp3",
      },
      {
        song_id: 8,
        title: "heelo",
        artist: 16,
        duration: null,
        album_id: 13,
        link: "..musico-serverpublicuploadsmusic_files1668431041568.mp3",
      },
    ],
    playlists: [
      { playlist_id: 1, pl_name: "playlist1", user_id: 1, public: 1 },
      { playlist_id: 2, pl_name: "playlist2", user_id: 2, public: 1 },
      { playlist_id: 3, pl_name: "playlist2.1", user_id: 2, public: 1 },
      { playlist_id: 4, pl_name: "newpalylistmine", user_id: 16, public: 1 },
    ],
    albums: [
      {
        album_id: 1,
        artist_id: 1,
        album_name: "myr_album",
        date_year: "2022-11-17T18:30:00.000Z",
      },
      {
        album_id: 2,
        artist_id: 1,
        album_name: "myr2_album",
        date_year: "2022-11-29T18:30:00.000Z",
      },
      {
        album_id: 3,
        artist_id: 2,
        album_name: "amod_album",
        date_year: "2021-01-17T18:30:00.000Z",
      },
      {
        album_id: 4,
        artist_id: 3,
        album_name: "dhan_album",
        date_year: "2020-04-07T18:30:00.000Z",
      },
      {
        album_id: 6,
        artist_id: 16,
        album_name: "nodejsAlbumHEELO",
        date_year: "2022-11-13T18:30:00.000Z",
      },
    ],
  };

  useEffect(() => {
    setIsLoading(true);
    // fetch("http://192.168.240.148:8888/").then((res) => {
    //   setMusicList(res);
    //   setLoading(false);
    // });
    // axios({
    //   method: "get",
    //   url: `http://192.168.240.148:8888/`,
    // }).then((response) => {
    //   setMusicList(response);
    //   console.log(response);
    // });
  }, []);

  return (
    <div className={styles.homelayout}>
      <div className={styles.musiclist}>
        <div className={styles.mlisttitle}>Music List:</div>
        {/* {allmusic.map((i) => {
          return <Musiccard name={i} />;
        })} */}
        <p>{musiclist.songs[0].title}</p>
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
