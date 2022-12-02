import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

import styles from "../../styles/Auth.module.css";

export default function Register() {
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const nameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleregister = async (e) => {
    e.preventDefault();

    try {
      await axios({
        method: "post",
        url: "http://192.168.86.148:8888/user/register",
        data: { name, username, email, password },
      }).then((response) => {
        console.log(response.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.authcontainer}>
      <div className={styles.authform}>
        <form>
          <input
            ref={nameRef}
            name="name"
            type="text"
            placeholder="Name"
            onChange={() => {
              setName(nameRef.current.value);
            }}
          />
          <br />
          <input
            ref={usernameRef}
            name="username"
            type="text"
            placeholder="Username"
            onChange={() => {
              setUsername(usernameRef.current.value);
            }}
          />
          <br />
          <input
            ref={emailRef}
            name="email"
            type="text"
            placeholder="Email ID"
            onChange={() => {
              setEmail(emailRef.current.value);
            }}
          />
          <br />
          <input
            ref={passwordRef}
            name="password"
            type="password"
            placeholder="Password"
            onChange={() => {
              setPassword(passwordRef.current.value);
            }}
          />
          <br />
          <input type="password" placeholder="Confirm Password" />
          <br />
          <button onClick={handleregister}>Register</button>
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
