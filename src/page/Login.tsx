// React
import React, { useState } from "react";
import { Link } from "react-router-dom";

// ui
import SocialLogin from "@/utils/SocialLogin";

import SEOHelmet from "@/utils/SEOHelmet";
import useLogin from "@/hook/user/useLogin";
import FormLogin from "@/components/form/FormLogin";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<string | null>(null);

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
  const login = useLogin({ setErrorEmail, email, password, errorEmail });

  return (
    <>
      {/* header */}
      <SEOHelmet
        title="Login"
        description="This is the WESTORRYCLE login page."
      />

      {/* body */}
      <main className="relative w-1/2 mt-20 m-auto bg-[url('./assets/image/login.webp')] bg-cover bg-center bg-no-repeat">
        <div className="inset-0 w-full h-full z-20 bg-black bg-opacity-50"></div>
        <section className="w-full h-full m-auto flex justify-center z-30">
          <div className="w-full h-fit p-20 flex flex-col bg-black bg-opacity-80">
            {/* 안내 문구 */}
            <div className="mb-10">
              <h1 className="text-5xl mb-4">Login</h1>
              <h1 className="text-sm">You're the man who's so confident</h1>
            </div>

            {/* 입력 */}
            <FormLogin
              email={email}
              onChange={onChange}
              password={password}
              errorEmail={errorEmail}
              login={login}
            />
            <div className="h-px mb-8 line-main"></div>

            {/* 소셜 로그인ㄴ */}
            <SocialLogin />

            {/* 회원가입 이동 */}
            <section className="">
              <p className="text-sm mb-1">Don't have an account?</p>
              <Link className="text-sm under-line" to={"/signup"}>
                Sign Up
              </Link>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
