import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useUser } from "@/contexts/userContext";
import { Button } from "@/components/ui/button";
import AddProduct from "@/page/Seller/AddProduct";

import ProductList from "./ProductList";

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
      <div>구매자 전용입니다.{user?.nickname}</div>
      <Button onClick={Logout}>로그아웃</Button>
      <AddProduct />
      <ProductList />
    </>
  );
}
