# WESTORCYCLE

## 1. 🏍️ 서비스 소개

<figure><img src="https://github.com/WestEastZ/Westorcycle/assets/85664676/e5452e93-8360-4fdb-adf4-5c26054c6bc0" alt=""><figcaption></figcaption></figure>

&#x20;Westorcycle은 사용자 친화적인 인터페이스로 구매가 쉽고 편리한 오토바이 전문 커머스 웹사이트입니다.

배포 URL : https://westorcycle.shop/ <br>
Gitbook URL : https://west-s-organization.gitbook.io/westorcycle-commerce-website/ <br>

**⭐️ 프로젝트의 자세한 내용은 Gitbook 참고 부탁드립니다 ⭐️**

```
✋ Westorcycle 테스트 계정
ID : west@test.com (판매자)
PW : Rhkdans97!

ID : east2@test.com (구매자)
PW : Rhkdans97!
```

## 2. 📜 요구사항 명세

| **1주차**                 | **2주차**     | **3주차**                       | **4주차**          |
| ------------------------- | ------------- | ------------------------------- | ------------------ |
| 페이지 라우팅 설계        | 상품 CRUD     | 상품 구매                       | SEO 개선           |
| 로그인 / 회원가입         | 장바구니 CRUD | 구매 내역 페이지                | 번들 사이즈 줄이기 |
| 판매자 페이지 - 상품 CRUD | 이미지 최적화 | 상품 구매 취소                  | 렌더링 최적화      |
| 소셜 로그인 구현          |               | 주문정보 확인 및 주문 상태 변경 | 테스트 코드        |
| Lazy Loading              |               | Compound component              |                    |

## 3. 🔧 기술적 의사결정

![](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black) ![](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![](https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white) ![](https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black) ![](https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) ![](https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![](https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white) ![](https://img.shields.io/badge/amazons3-569A31?style=for-the-badge&logo=amazons3&logoColor=white) ![](https://img.shields.io/badge/cloudfront-764ABC?style=for-the-badge&logoColor=white)

## 4. ✨ 주요 기능

- 회원가입 로그인
- 상품 CRUD
- 장바구니 CRUD
- 상품 구매
- SEO / 성능 개선

## 5. 💥 트러블 슈팅

- 장바구니 선택 상품 수량 증감
- 비동기 함수 반복문
- Authentication 최신화

## 6. ♻️ 리팩토링 / 기능 추가

1.  대규모 데이터셋 렌더링 최적화 (예정)
    - [React-Window](https://github.com/bvaughn/react-window) 라이브러리 가상 리스트 구현
2.  E2E 테스트 - 유저 플로우 및 서비스 로직 테스트 (예정)
    - Cypress 라이브러리 E2E 테스트 적용
3.  커스텀 훅 재사용
