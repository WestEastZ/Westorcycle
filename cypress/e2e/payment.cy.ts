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
