import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useUser } from "@/contexts/userContext";
import { Button } from "@/components/ui/button";

import ProductList from "./ProductList";
import NavBar from "@/components/navBar/navBar";
import PageHeader from "@/components/header/PageHeader";
import { PlusCircle } from "lucide-react";

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
      <PageHeader
        title={`${user?.nickname}`}
        description={`Take care of your products`}
      />
      <div className="w-full h-px bg-slate-300 mb-20"></div>
      <Link
        to={`/seller/${user?.nickname}/add-product`}
        className="w-fit m-auto border flex justify-center items-center mb-10 gap-3 focus-custom "
      >
        <p>Add Proudct</p>
        <PlusCircle />
      </Link>
      <ProductList />
      <Button onClick={Logout}>로그아웃</Button>
    </>
  );
}
