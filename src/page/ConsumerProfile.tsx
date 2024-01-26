import React from "react";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ConsumerProfile() {
  const navigate = useNavigate();
  const Logout: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    localStorage.removeItem("user");
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
