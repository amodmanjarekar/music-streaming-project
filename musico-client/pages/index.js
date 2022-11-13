import Layout from "../components/layout";
import Link from "next/link";

import styles from "../styles/Home.module.css";

const allmusic = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
];

export default function Home() {
  return (
    <Layout>
      <div className={styles.homelayout}>
        <div className={styles.musiclist}>
          <div className={styles.mlisttitle}>Recent Music:</div>
          {allmusic.map((i) => {
            return <Musiccard name={i} />;
          })}
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
    </Layout>
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
