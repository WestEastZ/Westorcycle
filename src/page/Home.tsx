import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import SellerProfile from "./SellerProfile";
import ConsumerProfile from "./ConsumerProfile";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [loginUser, setLoginUser] = useState(null);
  const [sellerFlag, setSellerFlag] = useState<boolean>(false);

  useEffect(() => {
    const auth = getAuth();
    const checkLoginUser = onAuthStateChanged(auth, (user) => {
      setLoginUser(user);
      setLoading(false);
    });

    return checkLoginUser;
  }, []);

  // 사용자 정보 가져오기
  const fetchUserData = async () => {
    if (loginUser) {
      const docRef = doc(db, "user", loginUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        if (docSnap.get("isSeller") === true) {
          setSellerFlag(true);
        }
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [loginUser]);

  return (
    <>
      <h2>Home</h2>
      {loading ? (
        <div>Lodig...</div>
      ) : loginUser ? (
        sellerFlag ? (
          <SellerProfile />
        ) : (
          <ConsumerProfile />
        )
      ) : (
        <>
          <Link to="/login">로그인</Link>
          <Link to="/signup">회원가입</Link>
        </>
      )}
    </>
  );
}
