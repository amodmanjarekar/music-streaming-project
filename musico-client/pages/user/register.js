import Link from "next/link";

import styles from "../../styles/Auth.module.css";

export default function Register() {
  return (
    <div className={styles.authcontainer}>
      <div className={styles.authform}>
        <form>
          <input type="text" placeholder="Name" />
          <br />
          <input type="text" placeholder="Username" />
          <br />
          <input type="text" placeholder="Email ID" />
          <br />
          <input type="password" placeholder="Password" />
          <br />
          <input type="password" placeholder="Confirm Password" />
          <br />
          <button>Register</button>
          <p>
            Already have an account?&nbsp;
            <Link className={styles.authlink} href="/user/login">
              Log In.
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
