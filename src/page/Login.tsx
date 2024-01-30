// React
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// firebase
import { auth, db, signInWithGoogle } from "@/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

// ui
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/navBar/navBar";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { User } from "@/models/type";

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

  // google
  const googleLoginhandler = async () => {
    try {
      const { user: firebaseUser } = await signInWithGoogle();
      const docRef = doc(db, "user", firebaseUser.uid);
      const docSnap = await getDoc(docRef);

      // 회원 계정이 아니면 회원 가입
      if (!docSnap.exists()) {
        if (firebaseUser) {
          const user: User = {
            id: firebaseUser.uid,
            email: firebaseUser.email as string,
            isSeller: false,
            nickname: firebaseUser.displayName as string,
            password: "",
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            cartItems: [],
            favoriteItem: [],
            profileImage: "",
          };
          await setDoc(docRef, user);
        }
      }

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="w-full h-full flex justify-center border-2 pt-10">
        <div className="w-1/2 min-w-96 m-auto p-20 flex flex-col border-2">
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
          <section>
            <button onClick={googleLoginhandler}>구글 로그인</button>
          </section>
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
