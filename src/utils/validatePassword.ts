// 비밀번호 유효성 검사
export type ErrorCode = {
  [key: string]: string;
};

export default function validatePassword(password: string): string | null {
  if (password.length < 10) return "errorLength";

  let count: number = 0;
  if (/[A-Z]/.test(password)) count++; // 대문자 포함
  if (/[a-z]/.test(password)) count++; // 소문자 포함
  if (/[0-9]/.test(password)) count++; // 숫자 포함
  if (/[^A-Za-z0-9]/.test(password)) count++; // 특수문자 포함

  if (count < 2) {
    return "errorComplexity";
  }

  return null;
}
