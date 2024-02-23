import { auth, db } from "@/firebase";
import { ERROR_MESSAGES, validateLoginEmail } from "@/utils/validation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";
import { useNavigate } from "react-router-dom";

interface useLoginPropType {
  setErrorEmail: (value: string | null) => void;
  email: string;
  password: string;
  errorEmail: string | null;
}

export default function useLogin({
  setErrorEmail,
  email,
  password,
  errorEmail,
}: useLoginPropType) {
  const navigte = useNavigate();
  const login = async (event: React.MouseEvent<HTMLButtonElement>) => {
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
      navigte("/");
    } catch (error) {
      console.error(error);
    }
  };
  return login;
}
