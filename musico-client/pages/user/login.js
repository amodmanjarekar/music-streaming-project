import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import Link from "next/link";

import styles from "../../styles/Auth.module.css";
import Router from "next/router";
import UserContext from "../../lib/UserContext";

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [errormsg, setErrormsg] = useState("");
  const usernameRef = useRef();
  const passwordRef = useRef();

  const userdata = useContext(UserContext);

  const handlelogin = async (e) => {
    e.preventDefault();

    const formdata = new URLSearchParams();
    formdata.append("username", username);
    formdata.append("password", password);
    // console.log(username, password);
    try {
      let res = await axios({
        method: "post",
        url: `http://${process.env.SERVER_URL}/user/login`,
        data: formdata,
      });
      if (res.data.status == "success") {
        setErrormsg("Success!");
        userdata.setUserId(res.data.user_id);
        Router.push("/");
      } else if (res.data.status == "invalid credentials") {
        setErrormsg("Invalid Credentials. Please try again.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.authcontainer}>
      <div className={styles.authform}>
        <form>
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
          <button type="submit" onClick={handlelogin}>
            Log In
          </button>
          <p style={{ color: "red" }}>{errormsg}</p>
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
