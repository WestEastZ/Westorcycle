import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import SellerProfile from "./SellerProfile";
import ConsumerProfile from "./ConsumerProfile";

export default function Home() {
  const userInfo = localStorage.getItem("userID");
  const [sellerFlag, setSellerFlag] = useState<boolean>(false);

  const fetchUserData = async () => {
    if (userInfo) {
      const docRef = doc(db, "user", userInfo);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        console.log(docSnap.get("isSeller"));
        if (docSnap.get("isSeller") === true) {
          setSellerFlag(true);
        }
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userInfo]);

  return (
    <>
      <h2>Home</h2>
      {userInfo ? (
        sellerFlag ? (
          <SellerProfile />
        ) : (
          <ConsumerProfile />
        )
      ) : (
        <Link to="/login">로그인 하기</Link>
      )}
    </>
  );
}
