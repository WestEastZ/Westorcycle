import React from "react";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoutes";
import { useUser } from "@/contexts/userContext";

// 동적 import

const Home = React.lazy(() => import("@/page/Home"));
const Login = React.lazy(() => import("@/page/Login"));
const SignUp = React.lazy(() => import("@/page/SignUp"));
const SellerProfile = React.lazy(() => import("@/page/seller/SellerProfile"));
const ConsumerProfile = React.lazy(
  () => import("@/page/consumer/ConsumerProfile")
);
const AddProduct = React.lazy(() => import("@/page/seller/AddProduct"));
const ManageProduct = React.lazy(() => import("@/page/seller/ManageProduct"));
const ProductDetail = React.lazy(() => import("@/page/product/ProductDetail"));
const Category = React.lazy(() => import("@/page/product/Category"));
const Product = React.lazy(() => import("@/page/product/Product"));
const NavBar = React.lazy(() => import("@/components/nav/NavBar"));
const Cart = React.lazy(() => import("@/page/consumer/Cart"));
const OpenCartButton = React.lazy(
  () => import("@/components/button/OpenCartButton")
);

const PurchaseHistory = React.lazy(
  () => import("@/page/consumer/PurchaseHistory")
);
const Order = React.lazy(() => import("@/page/consumer/PurchaseHistory"));

export default function AppRoute() {
  const user = useUser();

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          {/* 모든 사용자 방문 가능 */}
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/product/:productId"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProductDetail />
              </Suspense>
            }
          />
          <Route
            path="/category"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Category />
              </Suspense>
            }
          />
          <Route
            path="/category/:category"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Product />
              </Suspense>
            }
          />
          <Route
            path="/cart/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Cart />
              </Suspense>
            }
          />
          {/* <Route
            path="/payment/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Payment />
              </Suspense>
            }
          /> */}

          {/* 로그인 유무 */}
          <Route
            path="/login"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProtectedRoute condition={!user}>
                  <Login />
                </ProtectedRoute>
              </Suspense>
            }
          />

          <Route
            path="/signup"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProtectedRoute condition={!user}>
                  <SignUp />
                </ProtectedRoute>
              </Suspense>
            }
          />

          {/* 판매자 전용  */}
          <Route
            path="/seller/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProtectedRoute condition={user && user.isSeller}>
                  <SellerProfile />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/seller/:id/add-product"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProtectedRoute condition={user && user.isSeller}>
                  <AddProduct />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/seller/:id/manage-product/:productId"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProtectedRoute condition={user && user.isSeller}>
                  <ManageProduct />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/seller/order/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProtectedRoute condition={user && user.isSeller}>
                  <Order />
                </ProtectedRoute>
              </Suspense>
            }
          />

          {/* 구매자 전용 */}
          <Route
            path="/consumer/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProtectedRoute condition={user && !user.isSeller}>
                  <ConsumerProfile />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/purchase/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProtectedRoute condition={user && !user.isSeller}>
                  <PurchaseHistory />
                </ProtectedRoute>
              </Suspense>
            }
          />

          {/* 접근 불가 */}
          <Route
            path="/*"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Home />
              </Suspense>
            }
          />
        </Routes>

        {/* 장바구니 */}
        <OpenCartButton />
      </BrowserRouter>
    </>
  );
}
