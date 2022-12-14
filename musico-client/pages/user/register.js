import { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import Link from "next/link";

import styles from "../../styles/Auth.module.css";
import UserContext from "../../lib/UserContext";

export default function Register() {
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const nameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const userdata = useContext(UserContext);

  const handleregister = async (e) => {
    e.preventDefault();
    const formdata = new URLSearchParams();
    formdata.append("name", name);
    formdata.append("username", username);
    formdata.append("email", email);
    formdata.append("password", password);

    try {
      await axios({
        method: "post",
        url: `http://${process.env.SERVER_URL}/user/register`,
        data: formdata,
      }).then((response) => {
        console.log(response.data);
        if (response.data.status === "success") {
          userdata.setUserId(response.data.user_id);
        }
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
