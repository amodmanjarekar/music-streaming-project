import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import Layout from "../components/layout";
import SearchContext from "../lib/SearchContext";
import MusicContext from "../lib/MusicContext";

import styles from "../styles/Search.module.css";

export default function Search() {
  const [foundSongs, setFoundSongs] = useState([]);
  const [foundAlbums, setFoundAlbums] = useState([]);
  const [foundArtists, setFoundArtists] = useState([]);

  const router = useRouter();

  // const sampleSongs = [
  //   { title: "Tum Saath Ho" },
  //   { title: "Hold On" },
  //   { title: "Thodi Der" },
  // ];
  // const sampleAlbums = [{ title: "Hold On" }];
  // const sampleArtists = [];

  const searchquery = useContext(SearchContext);

  useEffect(() => {
    if (searchquery.query.length > 1) {
      axios({
        method: "get",
        url: `http://${process.env.SERVER_URL}/search?search_query=${searchquery.query}`,
      }).then((response) => {
        // console.log(response);
        setFoundSongs(response.data.songs);
        setFoundAlbums(response.data.albums);
        setFoundArtists(response.data.artists);
      });
    } else {
      router.push("/");
    }
  }, [searchquery.query]);

  return (
    <>
      <div className={styles.searchgroup}>
        <h4>Songs containing {`'${searchquery.query}'`}:</h4>
        <div className={styles.listcontainer}>
          {foundSongs.map((i) => {
            return (
              <SongListItem
                album={i.album_name}
                dateyear={i.date_year}
                link={i.link}
                title={i.title}
                artist={i.name}
                duration={i.duration}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.searchgroup}>
        <h4>Albums containing {`'${searchquery.query}'`}:</h4>
        <div className={styles.listcontainer}>
          {foundAlbums.map((i) => {
            return <ListItem name={i.album_name} />;
          })}
        </div>
      </div>
      <div className={styles.searchgroup}>
        <h4>Artists containing {`'${searchquery.query}'`}:</h4>
        <div className={styles.listcontainer}>
          {foundArtists ? (
            foundArtists.map((i) => {
              return <ListItem name={i.name} />;
            })
          ) : (
            <div style={{ width: "100%", textAlign: "center" }}>No results</div>
          )}
        </div>
      </div>
    </>
  );
}

const SongListItem = (props) => {
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

  return (
    <div className={styles.listitem} onClick={changeCurrentSong}>
      {props.title}
    </div>
  );
};

const ListItem = (props) => {
  return <div className={styles.listitem}>{props.name}</div>;
};

Search.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
