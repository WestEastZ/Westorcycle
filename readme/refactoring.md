# 리팩토링 / 기능 추가

## 0. 목차

1. [E2E 테스트](#1-e2e-테스트)

## 1. Cypress / E2E 테스트

> 첫 테스트 진행으로 정석적인 테스트를 진행하는 것이 아닌 경험을 목적으로 실시

### (1) Cypress 설치 및 셋팅

`npm i cypress`

```ts
// cypress.confif.ts
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "baseUrl", // baseUrl 설정
  },
});
```

### (2) E2E 테스트 실시

1. 회원가입
2. 로그인
3. 장바구니
4. 구매

> 구매 E2E 테스트

```ts
// payment.cy.ts
/// <reference types="cypress" />

function LoginSetUp() {
  cy.visit("http://localhost:5173/");

  cy.wait(2000);
  cy.get("body").then(($body) => {
    if ($body.text().includes("Login")) {
      // 로그인
      cy.wait(2000);
      cy.contains("Login").click();
      cy.wait(2000);
      cy.get("#email-login").type("east5@test.com");
      cy.get("#password-login").type("Rhkdans97!");
      cy.get("#loginButton").click();
      cy.wait(3000);
    }
  });
}
```

- 로그인 함수 생성 및 로그인
- page 로딩 및 비동기 작업을 위하여 `wait()` 사용

```ts
describe("payment", () => {
  before(LoginSetUp);

  it("payment", () => {
    // 장바구니 이동 및 구매 버튼 클릭
    cy.contains("Profile").click();
    cy.contains("My Cart").click();
    cy.contains("W800").click();
    cy.contains("Buy").click();

    // 결제 정보 입력 및 구매 버튼 클릭
    cy.get("#order-name").clear().type("west");
    cy.get("#order-tel").clear().type("01012345678");
    cy.get("#order-email").clear().type("test@test.com");
    cy.get("#order-addr").clear().type("seoul");
    cy.get("#checkPayment").check();
    cy.contains("Payment").click();
  });
});
```

- 로그인 상태 확인을 위하여 `before` 콜백함수로 `LoginSetUp` 사용
- 로그인 -> 프로필 -> 장바구니 -> 상품 선택 -> 결제 정보 입력 -> 결제 (성공)

> jest 혹은 vitest로 단위 테스트도 진행 예정
