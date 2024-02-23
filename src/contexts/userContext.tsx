import { auth, db } from "@/firebase";
import { UserType } from "@/models/type";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

interface UserProviderProps {
  children: React.ReactNode;
}

interface UserContextType {
  user: UserType | null;
  logout: () => Promise<void>;
}

// 유저 정보가 필요한 거니까 로딩 합쳐놓은 거 뺌
export const UserContext = createContext<UserContextType | null>(null);
// useContext로 유저 정보를 가져올 수 있는 훅 함수 생성함
export const useUser = () => useContext(UserContext);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const docRef = doc(db, "user", firebaseUser.uid);
        onSnapshot(docRef, (doc) => {
          if (doc.exists()) {
            const data = doc.data();
            const user: UserType = {
              id: firebaseUser.uid,
              email: data.email,
              isSeller: data.isSeller,
              nickname: data.nickname,
              password: data.password,
              createdAt: data.createdAt,
              updatedAt: data.updatedAt,
              profileImage: data.profileImage,
            };
            setUser(user);
          }
        });
      }
      setLoading(false);
    });
  }, []);

  // 로딩처리
  if (loading) return null;
  //
  return (
    <UserContext.Provider value={{ user, logout }}>
      {children}
    </UserContext.Provider>
  );
}
