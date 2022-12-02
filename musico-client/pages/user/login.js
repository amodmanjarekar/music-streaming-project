import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import qs from "qs";

import styles from "../../styles/Auth.module.css";

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handlelogin = (e) => {
    e.preventDefault();

    console.log(username, password);
    // try {
    //   let res = await axios({
    //     method: "post",
    //     url: "http://192.168.240.148:8888/user/login",
    //     data: qs.stringify({ username: username, password: password }),
    //     headers: {
    //       "content-type": "application/x-www-form-urlencoded;charset=utf-8",
    //     },
    //   });
    //   console.log(res.data);
    // } catch (err) {
    //   console.log(err);
    // }
    // fetch("", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //   body: new URLSearchParams({ username: username, password: password }),
    // });
    // await axios
    //   .post(
    //     "http://192.168.240.148:8888/user/login",
    //     {
    //       username: username,
    //       password: password,
    //     },
    //     { "content-type": "application/x-www-form-urlencoded" }
    //   )
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <div className={styles.authcontainer}>
      <div className={styles.authform}>
        <form action="http://192.168.86.148:8888/user/login" method="POST">
          <input
            name="username"
            type="text"
            placeholder="Username"
            ref={usernameRef}
            onChange={() => {
              setUsername(usernameRef.current?.value);
            }}
          />
          <br />
          <input
            name="password"
            type="password"
            placeholder="Password"
            ref={passwordRef}
            onChange={() => {
              setPassword(passwordRef.current?.value);
            }}
          />
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
