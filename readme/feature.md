# 주요 기능

## 0. 목차

1. [회원가입 / 로그인 / 프로필 편집](feature.md#id-1)
2. [상품 CRUD](feature.md#id-2.-crud)
3. [장바구니 CRUD](feature.md#id-3.-crud)
4. [상품 구매](feature.md#id-4-2)
5. [SEO / 성능](feature.md#id-5.-seo)

## 1. 회원가입 / 로그인 / 프로필 편집

### (1) 회원가입 / 로그인

![로그인](https://github.com/WestEastZ/Westorcycle/assets/85664676/015e6ba8-986b-4dee-beb4-e7a294c209fe)
![회원가입](https://github.com/WestEastZ/Westorcycle/assets/85664676/544be637-8abf-438d-8a53-6884ddbc5dc1)

- `Firebase Authentication`을 통한 사용자 인증 및 회원가입 / 로그인 기능 구현
- `isSeller` 필드 값을 통한 판매자/구매자 분리
- `validation` 메서드로 이메일, 비밀번호 유효성 검사 실시

### (2) 소셜 로그인

![소셜 로그인](https://github.com/WestEastZ/Westorcycle/assets/85664676/0e72b51c-7a77-4d20-895b-4f39c6a76878)

- `signInWithPopup`을 활용한 구글 / 깃허브 소셜 로그인 기능 구현

### (3) 프로필 편집

![프로필 편집](https://github.com/WestEastZ/Westorcycle/assets/85664676/3a5552d5-dce8-4941-b2b5-bab0e0a22b26)

- `onSnapshot`으로 로그인한 사용자의 최신 정보를 `context API`에 반영
- `updatePassword()`, `currentUser.reload()`메서드로 `currentUser` 비밀번호 변경 및 최신화

## 2. 상품 CRUD

### (1) 상품 등록 및 최신 데이터 조회

![상품 등록 및 최신 데이터 조회](https://github.com/WestEastZ/Westorcycle/assets/85664676/d7fcf6eb-2b81-47b2-b4ec-af266766c862)

- `useQuery`로 상품 데이터 자동 업데이트 및 캐싱으로 최신 정보 제공
- `useMutation`, `onSuccess`로 상태관리 간결화
- `validation` 메서드로 필수 입력 내용 유효성 검사 실시

### (2) 상품 무한 스크롤

![상품 무한 스크롤](https://github.com/WestEastZ/Westorcycle/assets/85664676/7d88c5ca-8793-4f83-87dd-4006cafa1d45)

- `useInfiniteQuery`, `useInView` 를 활용하여 `ref` 속성 요소 뷰포트 진입 시 `fetchNextPage` 실행

### (3) Firebase Cloud Storage 최적화

![Storage 최적화](https://github.com/WestEastZ/Westorcycle/assets/85664676/2af34cac-dc50-41ae-90d8-546a2cebf8dc)

- 상품 수정 / 삭제 시 기존 이미지 자동 삭제로 `Cloud Storage` 관리 최적화
- `Promise.all()`로 다중 이미지 업로드를 위한 비동기 작업 병렬적으로 수행

### (4) 상품 이미지 위치 변경

![이미지 위치 변경](https://github.com/WestEastZ/Westorcycle/assets/85664676/233551c1-5dbe-428b-9220-9b1afa0d91ba)

- `mainImage`, `otherImage` 배열 형식의 타입 생성
- `imageChangeHandler` 이벤트 발생 시 배열의 `index` 수정
- `useCallback()`으로 `imageChangeHandler` 메서드 재사용

### (5) 상품 가격 / 최신순 필터

![필터](https://github.com/WestEastZ/Westorcycle/assets/85664676/b51b20b7-cfc8-493f-9365-25e145a78275)

- `Firebase data query` 복합 색인 설정으로 필터 기능 구현
- `sortOption` 메서드 `useCallback()`으로 매서드 재사용

## 3. 장바구니 CRUD

### (1) 장바구니 추가 및 수량 증감

![장바구니 추가 및 수량](https://github.com/WestEastZ/Westorcycle/assets/85664676/bdeab522-b475-4d94-8adb-92e6938aa745)

- 수량에 따른 장바구니 추가
- `useQuery`, `some()`을 활용하여 장바구니 내 존재 확인
- 잔여 수량, 판매자, 구매자, 추가 완료 등 조건에 따라 버튼 기능 분기

### (2) 장바구니 최신 데이터 조회

![장바구니 최신 데이터](https://github.com/WestEastZ/Westorcycle/assets/85664676/a29e7128-da3b-4e3c-a8c3-f943a0eac927)

- `useQuery` 쿼리 키에 동일한 값을 전달하여 장바구니, 모달 연동 및 최신 데이터 조회

### (3) 장바구니 모달

![장바구니 모달](https://github.com/WestEastZ/Westorcycle/assets/85664676/62e55352-bd48-4654-83db-7c269b07c359)

- 브라우저 우측 장바구니 모달을 활용하여 페이지 이동없이 장바구니 확인 가능

### (4) 장바구니 상품 선택 및 수량 증감

![장바구니 상품 선택 및 수량 증감](https://github.com/WestEastZ/Westorcycle/assets/85664676/60007dc4-3800-4313-803b-5b8cd1ec5aeb)

- Total Price 계산 메서드의 비용 절감을 위한 `useMemo` 사용
- 배열 형식의 선택 상품 `state` 생성 후 클라이언트, 서버 동시 데이터 변경
- `stopPropagation()`으로 이벤트 전파 차단

## 4. 상품 구매

### (1) 결제

![결제](https://github.com/WestEastZ/Westorcycle/assets/85664676/a3cc8e0b-ecfc-4df0-bb85-1f3887e132ee)

- iamport를 활용한 선택 상품 결제 기능 구현

### (2) 재고 감소 및 복구

![재고 감소 및 복구](https://github.com/WestEastZ/Westorcycle/assets/85664676/a619a3b1-048d-44a5-a077-03b63c8eb862)

- `payment` 이벤트 발생 시 `useDecreaseStock` 훅을 이용한 우선 재고감소
- 결제 중단 / 주문 취소 시 `useRecoverStock` 훅을 이용하여 해당 상품 재고복구

### (3) 판매자 페이지 주문 상세 내역 및 주문 상태

![판매자 페이지 주문 상세 내역 및 주문 상태](https://github.com/WestEastZ/Westorcycle/assets/85664676/fd89a768-9c60-4f8f-b201-2db09e5adbf4)

- `useQuery`를 활용한 주문 내역 데이터 자동 업데이트 및 캐싱으로 최신 정보 제공
- 해당 상품 주문 상태 변경
- `orderGroup` 필드의 값이 같은 문서끼리 그룹화하여 관리
- `orderItems`로 판매자의 전체 판매 상품 조회, `orderGroups`로 동일한 주문번호로 그룹화

### (4) 구매자 페이지 주문 상세 내역

![구매자 페이지 주문 상세 내역](https://github.com/WestEastZ/Westorcycle/assets/85664676/cd89e2a5-c849-4cac-98f6-b23c4fffc3f6)

- `useQuery`를 활용한 주문 내역 데이터 자동 업데이트 및 캐싱으로 최신 정보 제공
- `orderGroup` 필드의 값이 같은 문서끼리 그룹화하여 관리
- `orderItems`로 구매자의 전체 판매 상품 조회, `orderGroups`로 동일한 주문번호로 그룹화

## 5. SEO / 성능

### (1) Sitemap, robot, meta tag, semantic tag

### (2) React.lazy()와 Suspense

### (3) AWS의 S3 및 CloudFront 사용하여 배포

### (4) 이미지 최적화
