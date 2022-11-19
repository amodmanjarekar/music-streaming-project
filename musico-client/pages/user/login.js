import Link from "next/link";

import styles from "../../styles/Auth.module.css";

export default function Register() {
  return (
    <div className={styles.authcontainer}>
      <div className={styles.authform}>
        <form action="http://localhost:8888/user/login" method="POST">
          <input type="text" placeholder="Username" />
          <br />
          <input type="password" placeholder="Password" />
          <br />
          <button type="submit">Log In</button>
          <p>
            Or&nbsp;
            <Link className={styles.authlink} href="/user/register">
              Create an account.
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
