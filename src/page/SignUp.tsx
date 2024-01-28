// React
import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

// firebase
import { auth, db } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

// utiles
import validatePassword, { ERROR_MESSAGES } from "@/utils/validatePassword";

// type
import { User } from "@/models/type";

export default function SignUp() {
  const navigte = useNavigate();
  // 유저 상태
  const [user, setUser] = useState<User>({
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

    // 비밀번호 유효성 검사
    const errorCode = validatePassword(user.password, user.nickname);

    if (errorCode) {
      console.log(ERROR_MESSAGES[errorCode]);
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
      console.log(error);
    }
  };

  return (
    <>
      Sign up
      <form>
        <div>
          <label>이메일 : </label>
          <input
            type="email"
            value={user.email}
            name="email"
            onChange={onChange}
          />
        </div>
        <div>
          <label>비밀번호 : </label>
          <input
            type="password"
            value={user.password}
            name="password"
            onChange={onChange}
          />
        </div>
        <div>
          <label>닉네임 : </label>
          <input
            type="text"
            value={user.nickname}
            name="nickname"
            onChange={onChange}
          />
        </div>
        <div>
          <label>판매자 여부 : </label>
          <input
            type="checkbox"
            checked={user.isSeller}
            name="isSeller"
            onChange={(e) => setUser({ ...user, isSeller: e.target.checked })}
          />
        </div>
        <button onClick={signup}>회원가입</button>
      </form>
    </>
  );
}
