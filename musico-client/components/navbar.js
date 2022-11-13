import styles from "./Navbar.module.css";

export default function Navbar() {
  const isLoggedIn = true;

  return (
    <div className={styles.navcontainer}>
      <div className={styles.navlogo}>M</div>
      <div>
        <input
          className={styles.navsearch}
          type="text"
          placeholder="Search for music..."
        />
      </div>
      <div>
        <button className={styles.navsearchbtn}>Go</button>
      </div>
      <div className={styles.navbtncontainer}>
        {isLoggedIn ? (
          <>
            <button className={styles.navbtn}>Upload</button>
            <button className={styles.navprofile}></button>
          </>
        ) : (
          <>
            <button className={styles.navbtn}>Log in</button>
            <button className={styles.navbtn}>Sign Up</button>
          </>
        )}
      </div>
    </div>
  );
}
