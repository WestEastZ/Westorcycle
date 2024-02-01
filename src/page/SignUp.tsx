// React
import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// firebase
import { auth, db } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

// utiles
import {
  ERROR_MESSAGES,
  validateEmail,
  validatePassword,
} from "@/utils/validation";

// type
import { UserType } from "@/models/type";
import NavBar from "@/components/navBar/NavBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignUp() {
  const navigte = useNavigate();
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
    cartItems: [],
    favoriteItem: [],
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
  const signup = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setErrorEmail(null);
    setErrorPassword(null);

    // 이메일 형식 유효성 검사
    const checkEmail = validateEmail(user.email);

    if (checkEmail) {
      setErrorEmail(ERROR_MESSAGES[checkEmail]);
      return;
    }

    // 비밀번호 유효성 검사
    const checkPassword = validatePassword(user.password, user.nickname);

    if (checkPassword) {
      setErrorPassword(ERROR_MESSAGES[checkPassword]);
      return;
    }

    // 회원가입 Authentication
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      // 회원가입 성공
      if (firebaseUser) {
        const userRef = doc(db, "user", firebaseUser.uid);

        // FireStore 저장
        await setDoc(
          userRef,
          {
            ...user,
            id: firebaseUser.uid,
          },
          { merge: true }
        );
      }
      navigte("/login");
      console.log("user created");
    } catch (error) {
      // 중복된 이메일 걸러내는 함수
      if (typeof error === "object" && error !== null && "code" in error)
        if (error.code === "auth/email-already-in-use") {
          setErrorEmail("중복된 이메일입니다.");
        }
    }
  };

  useEffect(() => {}, [errorEmail, errorPassword]);

  return (
    <>
      <NavBar />
      <div className="w-full flex justify-center">
        <div className="w-1/2 min-w-96 m-auto p-20 flex flex-col">
          {/* 안내문구 */}
          <section className="mb-20">
            <h1 className="text-4xl mb-4">Sign Up</h1>
            <p className="text-s">Sign Up to your account</p>
          </section>
          {/* 입력 */}

          <section>
            <form className="flex flex-col gap-5 mb-12">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={user.email}
                  name="email"
                  onChange={onChange}
                />
                {errorEmail === null ? null : (
                  <div className="text-left mt-1 ml-4 text-red-500">
                    {errorEmail}
                  </div>
                )}
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={user.password}
                  name="password"
                  onChange={onChange}
                />
                {errorPassword === null ? null : (
                  <div className="text-left mt-1 ml-4 text-red-500">
                    {errorPassword}
                  </div>
                )}
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Nickname"
                  value={user.nickname}
                  name="nickname"
                  onChange={onChange}
                />
              </div>
              <div className="flex justify-center items-center gap-2">
                <input
                  type="checkbox"
                  id="checkSeller"
                  checked={user.isSeller}
                  name="isSeller"
                  onChange={(e) =>
                    setUser({ ...user, isSeller: e.target.checked })
                  }
                />
                <label htmlFor="checkSeller">Sales Account</label>
              </div>
              <Button onClick={signup}>Sign Up</Button>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}
