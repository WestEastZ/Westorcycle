import { db } from "@/firebase";
import { UserType } from "@/models/type";
import { doc, getDoc, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useFetchUser(user: UserType | null) {
  const [curUser, setCurUser] = useState<UserType>({
    id: "",
    email: "",
    isSeller: false,
    nickname: "",
    password: "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    profileImage: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (user && user.id) {
          const docRef = doc(db, "user", user.id);
          const docSnapshot = await getDoc(docRef);

          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            const user: UserType = {
              id: data.id,
              email: data.email,
              isSeller: data.isSeller,
              nickname: data.nickname,
              password: data.password,
              createdAt: data.createdAt,
              updatedAt: data.updatedAt,
              profileImage: data.profileImage,
            };
            setCurUser(user);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [user]);
  return { curUser };
}
