import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  const login = async (event) => {
    event.preventDefault();

    try {
      const userInfo = await signInWithEmailAndPassword(auth, email, password);
      console.log(userInfo.user.email);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      Login
      <form>
        <div>
          <label>이메일 : </label>
          <input type="email" value={email} name="email" onChange={onChange} />
        </div>
        <div>
          <label>비밀번호 : </label>
          <input
            type="password"
            value={password}
            name="password"
            onChange={onChange}
          />
        </div>
        <button onClick={login}>로그인</button>
      </form>
    </>
  );
}
