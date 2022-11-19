import Layout from "../../components/layout";

import styles from "../../styles/Profile.module.css";

export default function Profile() {
  return (
    <div className={styles.profilecontainer}>
      <div className={styles.profilecardcontainer}>
        <div className={styles.profilecard}>
          <div className={styles.profilephoto}></div>
          <div>Name</div>
          <div>username</div>
          <div>ID</div>
        </div>
      </div>
      <div className={styles.profiledatacontainer}>
        <div className={styles.profiledata}>
          <div className={styles.profilemusic}>
            <h2>Your Music</h2>
          </div>
          <div className={styles.profilegroups}>
            <h2>Your Albums</h2>
          </div>
          <div className={styles.profilegroups}>
            <h2>Your Playlists</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

Profile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
