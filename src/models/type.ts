import { FieldValue, Timestamp } from "firebase/firestore";

// 사용자 타입 정의
export interface UserType {
  id: string;
  email: string;
  isSeller: boolean;
  nickname: string;
  password: string;
  createdAt: FieldValue | Timestamp;
  updatedAt: FieldValue | Timestamp;
  cartItems: number[];
  favoriteItem: number[];
  profileImage: string;
}

// 상품 타입 정의
export interface Product {
  id?: number;
  sellerId: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
  productDescription: string;
  productCategory: string;
  productImage: string[];
  createdAt: FieldValue | Timestamp;
  updatedAt: FieldValue | Timestamp;
}
