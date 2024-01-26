import { useEffect, useState } from "react";
import AppRoute from "./routes/AppRoute";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import "./App.css";
import { User, userContext } from "./contexts/userContext";

function App() {
  const [loginUserID, setloginUserID] = useState<string | null>(null);
  const [userData, setUserData] = useState<User | null>(null);

  // 현재 로그인한 유저 정보 얻기
  useEffect(() => {
    const auth = getAuth();
    const checkLoginUser = onAuthStateChanged(auth, (user) => {
      if (user) {
        setloginUserID(user.uid);
      }

      console.log("Sds");
    });
  }, [loginUserID]);

  useEffect(() => {
    const fetchLoginUserData = async () => {
      if (loginUserID) {
        const docRef = doc(db, "user", loginUserID);
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
          setUserData(user);
        }
      }
    };

    fetchLoginUserData();
  }, [loginUserID]);

  return (
    <>
      <userContext.Provider value={userData}>
        <AppRoute />
      </userContext.Provider>
    </>
  );
}

export default App;
