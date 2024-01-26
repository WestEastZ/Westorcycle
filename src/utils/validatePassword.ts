// 에러메세지 타입
export type ErrorCode = {
  [key: string]: string;
};
// 에러 메세지
export const ERROR_MESSAGES: ErrorCode = {
  errorLength: "비밀번호는 10자리 이상이어야 합니다.",
  errorComplexity:
    "비밀번호는 대문자, 소문자, 숫자, 특수문자 중 최소 2종류 이상 포함해야 합니다.",
  errorInclude: "비밀번호는 아이디를 포함할 수 없습니다. ",
};

// 유효성 검사
export default function validatePassword(
  password: string,
  nickname: string
): string | null {
  if (password.length < 10) return "errorLength";

  let count: number = 0;
  if (/[A-Z]/.test(password)) count++; // 대문자 포함
  if (/[a-z]/.test(password)) count++; // 소문자 포함
  if (/[0-9]/.test(password)) count++; // 숫자 포함
  if (/[^A-Za-z0-9]/.test(password)) count++; // 특수문자 포함

  if (count < 2) return "errorComplexity";

  if (password.includes(nickname)) return "errorInclude";

  return null;
}
