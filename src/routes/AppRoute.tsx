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
import ProductDetail from "@/page/product/ProductDetail";
import Category from "@/page/product/Category";
import Product from "@/page/product/Product";
import NavBar from "@/components/nav/NavBar";
import Cart from "@/page/consumer/Cart";
import OpenCartButton from "@/components/button/OpenCartButton";
import Payment from "@/page/consumer/Payment";
import PurchaseHistory from "@/page/consumer/PurchaseHistory";
import Order from "@/page/seller/Order";

export default function AppRoute() {
  const user = useUser();

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          {/* 모든 사용자 방문 가능 */}
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category/:category" element={<Product />} />
          <Route path="/cart/:id" element={<Cart />} />
          <Route path="/payment/:id" element={<Payment />} />

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
          <Route
            path="/seller/order/:id"
            element={
              <ProtectedRoute condition={user && user.isSeller}>
                <Order />
              </ProtectedRoute>
            }
          />

          {/* 구매자 전용 */}
          <Route
            path="/consumer/:id"
            element={
              <ProtectedRoute condition={user && !user.isSeller}>
                <ConsumerProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/purchase/:id"
            element={
              <ProtectedRoute condition={user && !user.isSeller}>
                <PurchaseHistory />
              </ProtectedRoute>
            }
          />

          {/* 접근 불가 */}
          <Route path="/*" element={<Home />} />
        </Routes>

        {/* 장바구니 */}
        <OpenCartButton />
      </BrowserRouter>
    </>
  );
}
