import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoutes";

import Home from "@/page/Home";
import Login from "@/page/Login";
import SignUp from "@/page/SignUp";
import { useUser } from "@/contexts/userContext";
import SellerProfile from "@/page/Seller/SellerProfile";
import ConsumerProfile from "@/page/ConsumerProfile";
import AddProduct from "@/page/Seller/AddProduct";

export default function AppRoute() {
  const user = useUser();

  return (
    <BrowserRouter>
      <Routes>
        {/* 모든 사용자 방문 가능 */}
        <Route path="/" element={<Home />} />

        {/* 로그인 유무 ? 홈 : children */}
        <Route
          path="/login"
          element={
            <ProtectedRoute condition={!user}>
              <Login />
            </ProtectedRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <ProtectedRoute condition={!user}>
              <SignUp />
            </ProtectedRoute>
          }
        />

        {/* 로그인 유무 && 판매자 여부 ? 홈 : children  */}
        <Route
          path="/seller/:nickname"
          element={
            <ProtectedRoute condition={user && user.isSeller}>
              <SellerProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/consumer/"
          element={
            <ProtectedRoute condition={user && !user.isSeller}>
              <ConsumerProfile />
            </ProtectedRoute>
          }
        />

        <Route path="/seller/:nickname/add-product" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  );
}
