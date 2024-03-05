# 주요 기능

## 0. 목차

1. [회원가입 / 로그인 / 프로필 편집](feature.md#id-1)
2. [상품 CRUD](feature.md#id-2.-crud)
3. [장바구니 CRUD](feature.md#id-3.-crud)
4. [상품 구매](feature.md#id-4-2)
5. [SEO / 성능](feature.md#id-5.-seo)

## 1. 회원가입 / 로그인 / 프로필 편집

### (1) 회원가입 / 로그인

![login-ezgif com-video-to-gif-converter (1)](https://github.com/WestEastZ/Westorcycle/assets/85664676/015e6ba8-986b-4dee-beb4-e7a294c209fe)
![2024-03-052 01 21-ezgif com-video-to-gif-converter (1)](https://github.com/WestEastZ/Westorcycle/assets/85664676/544be637-8abf-438d-8a53-6884ddbc5dc1)

- `Firebase Authentication`을 통한 사용자 인증 및 회원가입 / 로그인 기능 구현
- `isSeller` 필드 값을 통한 판매자/구매자 분리
- `validation` 메서드로 이메일, 비밀번호 유효성 검사 실시

### (2) 소셜 로그인

![2024-03-052 23 11-ezgif com-video-to-gif-converter](https://github.com/WestEastZ/Westorcycle/assets/85664676/0e72b51c-7a77-4d20-895b-4f39c6a76878)

- `signInWithPopup`을 활용한 구글 / 깃허브 소셜 로그인 기능 구현

### (3) 프로필 편집

![2024-03-052 25 04-ezgif com-video-to-gif-converter](https://github.com/WestEastZ/Westorcycle/assets/85664676/3a5552d5-dce8-4941-b2b5-bab0e0a22b26)

- `onSnapshot`으로 로그인한 사용자의 최신 정보를 `context API`에 반영
- `updatePassword()`, `currentUser.reload()`메서드로 `currentUser` 비밀번호 변경 및 최신화

## 2. 상품 CRUD

### (1) 상품 최신 데이터 조회

### (2) 상품 무한 스크롤

### (3) Firebase Cloud Storage 최적화

### (4) 상품 이미지 위치 변경

### (5) 상품 가격 / 최신순 필터

\

## 3. 장바구니 CRUD

### (1) 장바구니 추가 및 수량 증감

### (2) 장바구니 최신 데이터 조회

### (3) 장바구니 모달

### (4) 장바구니 상품 선택 및 수량 증감

\

## 4. 상품 구매

### (1) 결제

### (2) 재고 감소 및 복구

### (3) 판매자 페이지 주문 상세 내역 및 주문 상태

### (4) 구매자 페이지 주문 상세 내역

\

## 5. SEO / 성능

### (1) Sitemap, robot, meta tag, semantic tag

### (2) React.lazy()와 Suspense

### (3) AWS의 S3 및 CloudFront 사용하여 배포

### (4) 이미지 최적화
