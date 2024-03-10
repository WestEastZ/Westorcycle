/// <reference types="cypress" />

describe("SignUp", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/signup");
    cy.get("#email-signup").type("test@test.com");
    cy.get("#nickname-signup").type("test");
    cy.get("#password-signup").type("Testtesttest1@");
  });

  // 이메일 확인
  it("should display an error message when email is too short", () => {
    cy.get("#email-signup").clear().type("t"); // 이메일 입력
    cy.get("#signUpButton").click(); // 회원가입 버튼 클릭
    cy.get(".email-error").should("be.visible"); // 에러메세지 확인
  });

  // 비밀번호 확인
  it("should display an error message when password too short", () => {
    cy.get("#password-signup").clear().type("1111"); // 비밀번 입력
    cy.get("#signUpButton").click(); // 회원가입 버튼 클릭
    cy.get(".password-error").should("be.visible"); // 에러메세지 확인
  });
});
