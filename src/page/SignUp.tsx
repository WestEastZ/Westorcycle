// React
import React, { useState } from "react";

// firebase
import { serverTimestamp } from "firebase/firestore";

// type
import { UserType } from "@/models/type";
import SEOHelmet from "@/utils/SEOHelmet";
import useSignup from "@/hook/user/useSignup";
import FormSignup from "@/components/form/FormSignup";

export default function SignUp() {
  const [errorEmail, setErrorEmail] = useState<string | null>(null);
  const [errorPassword, setErrorPassword] = useState<string | null>(null);
  // 유저 상태
  const [user, setUser] = useState<UserType>({
    id: "",
    email: "",
    isSeller: false,
    nickname: "",
    password: "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    profileImage: "",
  });

  // input value 변경
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    setUser({
      ...user,
      [name]: name === "isSeller" ? value === "true" : value,
    });
  };

  // 회원가입
  const signup = useSignup({ user, setErrorEmail, setErrorPassword });

  return (
    <>
      {/* header */}
      <SEOHelmet
        title="SignUp"
        description="This is the WESTORRYCLE Sign up page."
      />

      {/* body */}
      <main className="relative w-1/2 mt-20 m-auto bg-[url('./assets/image/signup.webp')] bg-cover bg-center bg-no-repeat">
        <div className="inset-0 w-full h-full z-20 bg-black bg-opacity-50"></div>
        <div className="w-full h-full m-auto flex justify-center z-30">
          <div className="w-full h-fit p-20 flex flex-col bg-black bg-opacity-80">
            {/* 안내문구 */}
            <section className="mb-20">
              <h1 className="text-5xl mb-4">Sign Up</h1>
              <p className="text-sm">Are you ready to be a real man?</p>
            </section>
            {/* 입력 */}
            <FormSignup
              user={user}
              onChange={onChange}
              errorEmail={errorEmail}
              errorPassword={errorPassword}
              setUser={setUser}
              signup={signup}
            />
          </div>
        </div>
      </main>
    </>
  );
}
