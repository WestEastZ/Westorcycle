/// <reference types="cypress" />

describe("Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/login");
    cy.get("#email-login").type("test@test.com");
    cy.get("#password-login").type("Testtesttest1@");
  });

  // 로그인 확인
  it("should display an error message when email or password is not match", () => {
    cy.get("#email-login").clear().type("t"); // 이메일 입력
    cy.get("#password-login").clear().type("1111"); // 비밀번호 입력
    cy.get("#loginButton").click(); // 로그인 버튼 클릭
    cy.get(".error").should("be.visible"); // 에러메세지 확인
  });
});
