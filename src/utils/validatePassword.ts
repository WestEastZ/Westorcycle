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
};

// 비밀번호 유효성 검사
export function validatePassword(
  password: string,
  nickname: string
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
  if (password.includes(nickname)) return "errorPasswordInclude";

  return null;
}

// 이메일 유효성 검사
export function validateEmail(email: string): string | null {
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

  // 중복 이메일
  if (!emailRegEx.test(email)) return "errorEmailConstruct";

  return null;
}
