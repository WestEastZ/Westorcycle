import { createContext, useContext } from "react";

// 사용자 타입 정의
export interface User {
  id: number;
  email: string;
  isSeller: boolean;
  nickname: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  cartItems: number[];
  favoriteItem: number[];
  profileImage: string;
}

export const userContext = createContext<User | null>(null);
export const useGetUser = () => useContext(userContext); // 여기 a를 말하고 있습니다.
