import { Product } from "@/models/type";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

// 에러메세지 타입
export type ErrorCode = {
  [key: string]: string;
};
// 에러 메세지
export const ERROR_MESSAGES: ErrorCode = {
  errorPassowordLength: "비밀번호는 10자리 이상이어야 합니다.",
  errorPasswordComplexity:
    "비밀번호는 대문자, 소문자, 숫자, 특수문자 중 최소 2종류 이상 포함해야 합니다.",
  errorPasswordInclude: "비밀번호는 아이디를 포함할 수 없습니다. ",
  errorEmailConstruct: "이메일 형식이 맞지 않습니다.",
  errorProductName: "상품의 이름은 입력해주세요.",
  errorProdcutPrice: "상품의 가격을 입력해주세요.",
  errorProdcutQuantity: "상품의 수량을 입력해주세요.",
  errorProductDescription: "상품의 설명을 입력해주세요.",
  errorProductCategory: "상품의 카테고리를 입력해주세요",
  errorProductImage: "상품의 이미지를 첨부해주세요.",
  errorLogin: "이메일과 비밀번호를 확인해주세요.",
};

// 회원가입 이메일 유효성 검사
export function validateEmail(email: string): string | null {
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

  // 이메일 형식
  if (!emailRegEx.test(email)) return "errorEmailConstruct";

  // 중복 이메일

  return null;
}

// 회원가입 비밀번호 유효성 검사
export function validatePassword(
  password: string,
  nickname?: string
): string | null {
  // 10자리 미만
  if (password.length < 10) return "errorPassowordLength";

  let count: number = 0;
  if (/[A-Z]/.test(password)) count++; // 대문자 포함
  if (/[a-z]/.test(password)) count++; // 소문자 포함
  if (/[0-9]/.test(password)) count++; // 숫자 포함
  if (/[^A-Za-z0-9]/.test(password)) count++; // 특수문자 포함

  // 2가지 미포함
  if (count < 2) return "errorPasswordComplexity";

  // 닉네임 포함
  if (nickname) {
    if (password.includes(nickname)) return "errorPasswordInclude";
  }

  return null;
}

// 로그인 유효성 검사
export function validateLoginEmail(
  docs: QueryDocumentSnapshot<DocumentData, DocumentData>[]
) {
  // 이메일 유무
  if (docs.length === 0) return "errorLogin";

  return null;
}

// 상품 등록 유효성 검사
export function validateProduct(product: Product): string | null {
  if (product.productImage.length < 1) return "errorProductImage";
  if (product.productName === "") return "errorProductName";
  if (product.productPrice === 0) return "errorProdcutPrice";
  if (product.productQuantity === 0) return "errorProdcutQuantity";
  if (product.productDescription === "") return "errorProductDescription";
  if (product.productCategory === "") return "errorProductCategory";

  return null;
}
