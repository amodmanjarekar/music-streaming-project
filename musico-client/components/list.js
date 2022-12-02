import { useContext } from "react";
import { FaPlay } from "react-icons/fa";
import MusicContext from "../lib/MusicContext";
import styles from "./List.module.css";

export default function List(props) {
  const nowplaying = useContext(MusicContext);
  // console.log(props.list);
  function changeCurrentSong(i) {
    nowplaying.setCurrentSong({
      id: i.id,
      title: i.title,
      artist: i.name,
      duration: i.duration,
      album: i.album_name,
      link: i.link,
    });
  }

  return (
    <div className={styles.listcontainer}>
      <div className={styles.listhead}>
        <div></div>
        <div>TITLE</div>
        <div>ARTIST</div>
        <div>ALBUM</div>
      </div>
      {props.list.map((i) => {
        return (
          <div
            className={styles.listitem}
            onClick={() => {
              changeCurrentSong(i);
            }}
          >
            <div>
              <FaPlay />
            </div>
            <div>{i.title}</div>
            <div>{i.name}</div>
            <div>{i.album_name}</div>
          </div>
        );
      })}
    </div>
  );
}
