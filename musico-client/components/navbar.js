import Link from "next/link";

import styles from "./Navbar.module.css";

export default function Navbar() {
  const isLoggedIn = true;

  return (
    <div className={styles.navcontainer}>
      <Link href="/">
        <div className={styles.navlogo}>M</div>
      </Link>
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
            <Link href="/user/profile">
              <button className={styles.navprofile}></button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/user/login">
              <button className={styles.navbtn}>Log in</button>
            </Link>
            <Link href="/user/register">
              <button className={styles.navbtn}>Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
