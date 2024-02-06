// React
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// firebase
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

// ui
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SocialLogin from "@/utils/SocialLogin";

import loginBg from "@/assets/image/login.jpeg";

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
      <div className="relative w-1/2 mt-20 m-auto bg-[url('./assets/image/login.jpeg')] bg-cover bg-center bg-no-repeat">
        <div className="inset-0 w-full h-full z-20 bg-black bg-opacity-50"></div>
        <div className="w-full h-full m-auto flex justify-center z-30">
          <div className="w-full h-fit p-20 flex flex-col bg-black bg-opacity-80">
            {/* 안내 문구 */}
            <section className="mb-10">
              <h1 className="text-5xl mb-4">Login</h1>
              <h1 className="text-sm">You're the man who's so confident</h1>
            </section>

            {/* 입력 */}
            <section className="">
              <form className="flex flex-col gap-5 mb-8">
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
            <div className="h-px mb-8 line-main"></div>
            <section>
              <SocialLogin />
            </section>
            {/* 회원가입 이동 */}
            <section className="">
              <p className="text-sm mb-2">Don't have an account?</p>
              <Link className="text-sm under-line" to={"/signup"}>
                Sign Up
              </Link>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
