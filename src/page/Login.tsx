// React
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// firebase
import { auth, db } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

// ui
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SocialLogin from "@/utils/SocialLogin";

// import loginBg from "@/assets/image/login.webp";
import { ERROR_MESSAGES, validateLoginEmail } from "@/utils/validation";
import { collection, getDocs, query, where } from "firebase/firestore";
import SEOHelmet from "@/utils/SEOHelmet";

export default function Login() {
  const navigate = useNavigate();
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
  const login: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();

    setErrorEmail(null);

    // 로그인 아이디 유효성 검사
    let q = query(
      collection(db, "user"),
      where("email", "==", email),
      where("password", "==", password)
    );
    const qSnapshot = await getDocs(q);

    const checkLogin = validateLoginEmail(qSnapshot.docs);
    if (checkLogin) {
      setErrorEmail(ERROR_MESSAGES[checkLogin]);
      console.log(errorEmail);
      return;
    }

    // 로그인 비밀번호 유효성 검사

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

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
        <div className="w-full h-full m-auto flex justify-center z-30">
          <div className="w-full h-fit p-20 flex flex-col bg-black bg-opacity-80">
            {/* 안내 문구 */}
            <div className="mb-10">
              <h1 className="text-5xl mb-4">Login</h1>
              <h1 className="text-sm">You're the man who's so confident</h1>
            </div>

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
                  {errorEmail === null ? null : (
                    <div className="text-left mt-1 ml-2 text-xs text-red-500">
                      {errorEmail}
                    </div>
                  )}
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
      </main>
    </>
  );
}
