import { Button } from "@/components/ui/button";
import { db, signInWithGithub, signInWithGoogle } from "@/firebase";
import { UserType } from "@/models/type";
import { User } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function SocialLogin() {
  const navigate = useNavigate();

  // 소셜 로그인
  const socialLoginHandler = async (firebaseUser: User) => {
    try {
      const docRef = doc(db, "user", firebaseUser.uid);
      const docSnap = await getDoc(docRef);

      // 회원 계정이 아니면 회원 가입
      if (!docSnap.exists()) {
        if (firebaseUser) {
          const user: UserType = {
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

  // google
  const googleLoginhandler = async () => {
    try {
      const { user: firebaseUser } = await signInWithGoogle();
      socialLoginHandler(firebaseUser);
    } catch (error) {
      console.log(error);
    }
  };

  // github
  const githubLoginhandler = async () => {
    try {
      const { user: firebaseUser } = await signInWithGithub();
      socialLoginHandler(firebaseUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex flex-col gap-2 mb-4">
      <Button onClick={googleLoginhandler} className="">
        Google
      </Button>
      <Button onClick={githubLoginhandler} className="">
        Github
      </Button>
    </section>
  );
}
