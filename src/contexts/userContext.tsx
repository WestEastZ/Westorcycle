import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

// 사용자 타입 정의
export interface User {
  id: number;
  email: string;
  isSeller: boolean;
  nickname: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  cartItems: number[];
  favoriteItem: number[];
  profileImage: string;
}

interface UserProviderProps {
  children: React.ReactNode;
}

// 유저 정보가 필요한 거니까 로딩 합쳐놓은 거 뺌
export const UserContext = createContext<User | null>(null);
// useContext로 유저 정보를 가져올 수 있는 훅 함수 생성함
export const useUser = () => useContext(UserContext);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const docRef = doc(db, "user", firebaseUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const user: User = {
            id: data.id,
            email: data.email,
            isSeller: data.isSeller,
            nickname: data.nickname,
            password: data.password,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            cartItems: data.cartItems,
            favoriteItem: data.favoriteItem,
            profileImage: data.profileImage,
          };
          setUser(user);
        }
      }
      setLoading(false);
    });
  }, []);
  // 로딩처리
  if (loading) return <div>...</div>;
  //
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
