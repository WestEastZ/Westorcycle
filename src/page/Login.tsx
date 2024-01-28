// React
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// firebase
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

// ui
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/navBar/navBar";

export default function Login() {
  console.log("Sdsdsds");
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

  // 로그인
  const login: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();

    try {
      const userInfo = await signInWithEmailAndPassword(auth, email, password);
      console.log("sdsds", userInfo); // 여기서 데이터 불러 온거 뜨는데
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="w-full h-screen flex justify-center">
        <div className="w-1/2 min-w-96 m-auto p-20 flex flex-col ">
          {/* 안내 문구 */}
          <section className="mb-20">
            <h1 className="text-4xl mb-4">Login</h1>
            <p className="text-s">Login to your account</p>
          </section>

          {/* 입력 */}
          <section className="">
            <form className="flex flex-col gap-5 mb-12">
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
          </section>
          <div className="h-px bg-black mb-12"></div>
          {/* <section></section> */}
          {/* 회원가입 이동 */}
          <section className="">
            <p className="text-sm">Don't have an account?</p>
            <Link className="text-sm font-extrabold" to={"/signup"}>
              Sign Up
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
