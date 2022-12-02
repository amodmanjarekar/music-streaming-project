import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import List from "../../components/list";
import Layout from "../../components/layout";
import styles from "../../styles/Album.module.css";
import axios from "axios";

export default function Album() {
  const [albumName, setAlbumName] = useState("Album Name");
  const [artistName, setArtistName] = useState("Artist Name");
  const [albumList, setAlbumList] = useState([]);
  // const samplelist = [
  //   { title: "Tum Saath Ho" },
  //   { title: "Hold On" },
  //   { title: "Thodi Der" },
  // ];

  const router = useRouter();

  useEffect(() => {
    try {
      axios
        .get(
          `http://${process.env.SERVER_URL}/discover/album?album_id=${router.query.album_id}`
        )
        .then((res) => {
          setAlbumList(res.data);
          setAlbumName(res.data[0].album_name);
          setArtistName(res.data[0].name);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <div className={styles.albumhead}>
        <h2>{albumName}</h2>
        <h4>{artistName}</h4>
      </div>
      <List list={albumList} />
    </>
  );
}

Album.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
