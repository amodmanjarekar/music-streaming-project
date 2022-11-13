import Link from "next/link";

import styles from "../../styles/Auth.module.css";

export default function Register() {
  return (
    <div className={styles.authcontainer}>
      <div className={styles.authform}>
        <form>
          <input type="text" placeholder="Username" />
          <br />
          <input type="password" placeholder="Password" />
          <br />
          <button>Log In</button>
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
