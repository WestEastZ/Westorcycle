import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useUser } from "@/contexts/userContext";
import { Button } from "@/components/ui/button";

import ProductList from "./ProductList";
import NavBar from "@/components/navBar/navBar";

export default function SellerProfile() {
  const user = useUser();
  const navigate = useNavigate();

  // 로그아웃
  const Logout: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();

    await signOut(auth);
    navigate("/");
  };

  // 등록 상품 조회
  return (
    <>
      <NavBar />
      <Link to={`/seller/${user?.nickname}/add-product`}>
        상품등록 하러가기
      </Link>
      <div>구매자 전용입니다.{user?.nickname}</div>
      <Button onClick={Logout}>로그아웃</Button>
      <ProductList />
    </>
  );
}
