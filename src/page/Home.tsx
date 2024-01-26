import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetUser } from "@/contexts/userContext";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";

export default function Home() {
  const user = useGetUser();
  const navigate = useNavigate();

  const Logout: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    await signOut(auth);
    navigate("/");
  };

  return (
    <>
      <h2>Home</h2>
      {user ? (
        <>
          <div>hello {user.nickname}</div>
          <Button onClick={Logout}>로그아웃</Button>
        </>
      ) : (
        <>
          <Link to="/login">로그인</Link>
          <Link to="/signup">회원가입</Link>
        </>
      )}
    </>
  );
}
