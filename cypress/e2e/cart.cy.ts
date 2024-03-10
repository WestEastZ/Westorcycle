/// <reference types="cypress" />

function initialize() {
  // 홈페이지 방문
  cy.visit("http://localhost:5173/");

  // 카테고리 페이지로 이동
  cy.contains("Classic").should("be.visible").click();

  cy.wait(2000);
  // 상품에 접근
  cy.contains("W800").should("be.visible").click();

  // 상품 페이지가 제대로 로드되었는지 확인
  cy.contains("W800");
}

describe("Add Cart Test", () => {
  beforeEach(initialize);

  // 로그인 진행
  it("로그인", () => {
    cy.get("body").then(($body) => {
      if ($body.text().includes("Login")) {
        cy.contains("Login").click();
        cy.wait(2000);
        cy.get("#email-login").type("east5@test.com");
        cy.get("#password-login").type("Rhkdans97!");
        cy.get("#loginButton").click();
        cy.wait(3000);
        initialize();
      }
    });
  });

  // 장바구니
  it("장바구니", () => {
    cy.get("body").then(($body) => {
      // 장바구니 추가일 경우
      if ($body.text().includes("Add to Cart")) {
        cy.contains("Add to Cart").click();
        cy.wait(3000);
        cy.contains("See the Cart").click();
        // 장바구니 보기일 경우
      } else if ($body.text().includes("See the Cart")) {
        cy.contains("See the Cart").click();
        // 품절
      } else {
        cy.visit("http://localhost:5173/");
      }
    });
  });
});
