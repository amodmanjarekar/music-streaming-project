import axios from "axios";
import { useContext, useEffect, useState } from "react";

import Layout from "../components/layout";
import SearchContext from "../lib/SearchContext";

import styles from "../styles/Search.module.css";

export default function Search() {
  const [foundSongs, setFoundSongs] = useState([]);
  const [foundAlbums, setFoundAlbums] = useState([]);
  const [foundArtists, setFoundArtists] = useState([]);

  const sampleSongs = [
    { title: "Tum Saath Ho" },
    { title: "Hold On" },
    { title: "Thodi Der" },
  ];
  const sampleAlbums = [{ title: "Hold On" }];
  const sampleArtists = [];

  const searchquery = useContext(SearchContext);

  useEffect(() => {
    // axios({
    //   method: "get",
    //   url: `http://192.168.86.148:8888/search?search_query=${searchquery.query}`,
    // }).then((response) => {
    //   // console.log(response);
    //   setFoundSongs(response.data.songs);
    //   setFoundAlbums(response.data.albums);
    //   setFoundArtists(response.data.artists);
    // });
  }, [searchquery.query]);

  return (
    <>
      <div className={styles.searchgroup}>
        <h4>Songs containing {`'${searchquery.query}'`}:</h4>
        <div className={styles.listcontainer}>
          {sampleSongs.map((i) => {
            return <ListItem name={i.title} />;
          })}
        </div>
      </div>
      <div className={styles.searchgroup}>
        <h4>Albums containing {`'${searchquery.query}'`}:</h4>
        <div className={styles.listcontainer}>
          {sampleAlbums.map((i) => {
            return <ListItem name={i.title} />;
          })}
        </div>
      </div>
      <div className={styles.searchgroup}>
        <h4>Artists containing {`'${searchquery.query}'`}:</h4>
        <div className={styles.listcontainer}>
          {sampleArtists ? (
            <div style={{ width: "100%", textAlign: "center" }}>No results</div>
          ) : (
            sampleArtists.map((i) => {
              return <ListItem name={i.title} />;
            })
          )}
        </div>
      </div>
    </>
  );
}

const ListItem = (props) => {
  return <div className={styles.listitem}>{props.name}</div>;
};

Search.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
