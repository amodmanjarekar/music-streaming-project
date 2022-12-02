import { useState, useEffect, useContext } from "react";
import Layout from "../components/layout";
import Link from "next/link";

import { FaPlay } from "react-icons/fa";
import styles from "../styles/Home.module.css";
import axios from "axios";
import MusicContext from "../lib/MusicContext";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [musicList, setMusicList] = useState([]);
  const [albumList, setAlbumList] = useState([]);
  const [playlistList, setPlaylistList] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    console.log(process.env.SERVER_URL);
    axios({
      method: "get",
      url: `http://${process.env.SERVER_URL}`,
    }).then((response) => {
      setMusicList(response.data.songs);
      setAlbumList(response.data.albums);
      setPlaylistList(response.data.playlists);
      setIsLoading(false);
      console.log(response.data.songs);
      // console.log(playlistList);
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
                artist={i.name}
                duration={i.duration}
                album={i.album_name}
                dateyear={i.date_year}
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
          {!albumList.length ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p>Nothing to show here yet...</p>
              <h1>Add your own albums!</h1>
            </div>
          ) : (
            <>
              <div className={styles.samplebox}>{albumList[0].album_name}</div>
              <div className={styles.samplebox}>{albumList[2].album_name}</div>
              <div className={styles.samplebox}>View More &gt;</div>
            </>
          )}
        </div>
      </div>
      <div className={styles.plistcontainer}>
        Recent Playlists:
        <br />
        <div className={styles.plist}>
          {!playlistList.length ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p>Nothing to show here yet...</p>
              <h1>Add your own playlist!</h1>
            </div>
          ) : (
            <>
              <div className={styles.samplebox}>{playlistList[0].pl_name}</div>
              <div className={styles.samplebox}>{playlistList[1].pl_name}</div>
              <div className={styles.samplebox}>View More &gt;</div>
            </>
          )}
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
      album: props.album,
      link: props.link,
    });
  }

  const getYear = (dateyear) => {
    const time = new Date(dateyear);
    return time.getFullYear();
  };

  return (
    <div onClick={changeCurrentSong} className={styles.musiccard}>
      <div>
        <FaPlay />
      </div>
      <div style={{ flex: "1" }}>{props.title}</div>
      <div>{props.artist}</div>
      <div>{props.albumid}</div>
      <div>{getYear(props.dateyear)}</div>
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
