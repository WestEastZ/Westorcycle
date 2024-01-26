// React
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// firebase
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

// ui
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      console.log(userInfo);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="text-3xl">Login</h1>
      <p className="text-sm">Login to your account</p>
      <section>
        <form className="flex flex-col gap-3">
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              name="email"
              onChange={onChange}
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={onChange}
            />
          </div>
          <Button onClick={login}>Login</Button>
        </form>
        <div className="flex gap-3 justify-center">
          <p className="text-sm">Don't have an account?</p>
          <Link className="text-sm font-extrabold" to={"/signup"}>
            Sign Up
          </Link>
        </div>
      </section>
    </>
  );
}
