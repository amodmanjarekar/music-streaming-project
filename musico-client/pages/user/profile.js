import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout";
import UserContext from "../../lib/UserContext";
import MusicContext from "../../lib/MusicContext";

import styles from "../../styles/Profile.module.css";
import Router from "next/router";

export default function Profile() {
  const [currentUser, setCurrentUser] = useState({
    name: "Name",
    username: "username",
    email: "",
  });
  const [mySongs, setMySongs] = useState([]);
  const [myAlbums, setMyAlbums] = useState([]);

  const userdata = useContext(UserContext);

  useEffect(() => {
    axios({
      method: "post",
      url: `http://${process.env.SERVER_URL}/user/profile`,
      data: { userId: userdata.userId },
    }).then((res) => {
      setCurrentUser(res.data[0]);
    });

    axios({
      method: "post",
      url: `http://${process.env.SERVER_URL}/user/profile/songs`,
      data: { userId: userdata.userId },
    }).then((res) => {
      console.log(res.data);
      setMySongs(res.data);
    });

    axios({
      method: "post",
      url: `http://${process.env.SERVER_URL}/user/profile/albums`,
      data: { userId: userdata.userId },
    }).then((res) => {
      console.log(res.data);
      setMyAlbums(res.data);
    });
  }, []);

  return (
    <div className={styles.profilecontainer}>
      <div className={styles.profilecardcontainer}>
        <div className={styles.profilecard}>
          <div className={styles.profilephoto}></div>
          <div>{currentUser.name}</div>
          <div>{currentUser.username}</div>
          <div>{currentUser.email}</div>
          <div>ArtistID: {userdata.userId}</div>
        </div>
      </div>
      <div className={styles.profiledatacontainer}>
        <div className={styles.profiledata}>
          <div className={styles.profilemusic}>
            <h2>Your Music</h2>
            <div>
              {mySongs.map((i) => {
                return (
                  <SongListItem
                    title={i.title}
                    album={i.album_name}
                    artist={i.name}
                    id={i.id}
                    duration={i.duration}
                    link={i.link}
                  />
                );
              })}
            </div>
          </div>
          <div className={styles.profilegroups}>
            <h2>Your Albums</h2>
            <div>
              {myAlbums.map((i) => {
                return <AlbumListItem name={i.album_name} id={i.album_id} />;
              })}
            </div>
          </div>
          <div className={styles.profilegroups}>
            <h2>Your Playlists</h2>
          </div>
        </div>
      </div>
    </div>
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
    <div className={styles.songbox} onClick={changeCurrentSong}>
      {props.title}
    </div>
  );
};

const AlbumListItem = (props) => {
  return (
    <div
      className={styles.albumbox}
      onClick={() => {
        Router.push({
          pathname: "/discover/album",
          query: { album_id: props.id },
        });
      }}
    >
      {props.name}
    </div>
  );
};

Profile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
