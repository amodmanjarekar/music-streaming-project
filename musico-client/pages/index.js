import Layout from "../components/layout";
import Link from "next/link";

import styles from "../styles/Home.module.css";

const allmusic = ["one", "two", "three", "four"];

export default function Home() {
  return (
    <Layout>
      <div className={styles.homelayout}>
        <div className={styles.musiclist}>
          {allmusic.map((i) => {
            return <>{i}</>;
          })}
        </div>
        <div>albums</div>
        <div>playlists</div>
      </div>
    </Layout>
  );
}
