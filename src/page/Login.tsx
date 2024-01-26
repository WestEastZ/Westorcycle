// React
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// firebase
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // input value 변경
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  // loign
  const login: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();

    try {
      const userInfo = await signInWithEmailAndPassword(auth, email, password);

      localStorage.setItem("userID", userInfo.user.uid);
      navigate("/");
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
