import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoutes";

import Home from "@/page/Home";
import Login from "@/page/Login";
import SignUp from "@/page/SignUp";
import { useUser } from "@/contexts/userContext";
import SellerProfile from "@/page/seller/SellerProfile";
import ConsumerProfile from "@/page/consumer/ConsumerProfile";
import AddProduct from "@/page/seller/AddProduct";
import ManageProduct from "@/page/seller/ManageProduct";

export default function AppRoute() {
  const user = useUser();

  return (
    <BrowserRouter>
      <Routes>
        {/* 모든 사용자 방문 가능 */}
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" />

        {/* 로그인 유무 */}
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

        {/* 판매자 전용  */}
        <Route
          path="/seller/:id"
          element={
            <ProtectedRoute condition={user && user.isSeller}>
              <SellerProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/:id/add-product"
          element={
            <ProtectedRoute condition={user && user.isSeller}>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/:id/manage-product/:productId"
          element={
            <ProtectedRoute condition={user && user.isSeller}>
              <ManageProduct />
            </ProtectedRoute>
          }
        />

        {/* 구매자 전용 */}
        <Route
          path="/consumer/:nickname"
          element={
            <ProtectedRoute condition={user && !user.isSeller}>
              <ConsumerProfile />
            </ProtectedRoute>
          }
        />

        {/* 접근 불가 */}
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
