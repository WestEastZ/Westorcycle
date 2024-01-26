import { Button } from "@/components/ui/button";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function SellerProfile() {
  const navigate = useNavigate();
  const Logout: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();

    localStorage.removeItem("userID");
    await signOut(auth);
    navigate("/");
  };

  return (
    <>
      <div>구매자 전용입니다.</div>
      <Button onClick={Logout}>로그아웃</Button>
    </>
  );
}
