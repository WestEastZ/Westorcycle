import { auth, db } from "@/firebase";
import { UserType } from "@/models/type";
import {
  ERROR_MESSAGES,
  validateEmail,
  validatePassword,
} from "@/utils/validation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

interface useSignupPropType {
  user: UserType;
  setErrorEmail: (value: string | null) => void;
  setErrorPassword: (value: string | null) => void;
}

export default function useSignup({
  user,
  setErrorEmail,
  setErrorPassword,
}: useSignupPropType) {
  const navigte = useNavigate();

  const signup = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

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

  return signup;
}
