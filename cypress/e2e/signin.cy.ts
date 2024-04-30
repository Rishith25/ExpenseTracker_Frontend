// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

/// <reference types="cypress" />

describe("SigninForm", () => {
  it("should sign in a user successfully", () => {
    cy.visit("https://expense-tracker-rishith.netlify.app/signin");

    // Fill in the email and password fields
    cy.get('input[name="email"]').type("admin@gmail.com");
    cy.get('input[name="password"]').type("admin");

    // Submit the form
    cy.get('button[type="submit"]').click();
    cy.wait(5000);

    // Check if redirected to the dashboard page after successful signin
    cy.url().should("include", "/home/dashboard");

    // Check if auth token is saved in localStorage
    cy.window().then((window) => {
      expect(window.localStorage.getItem("authToken")).to.exist;
    });

    // Check if user data is saved in localStorage
    cy.window().then((window) => {
      expect(window.localStorage.getItem("userData")).to.exist;
    });
  });

  it("should display an error message for invalid credentials", () => {
    cy.visit("https://expense-tracker-rishith.netlify.app/signin");

    // Fill in the email and password fields with invalid credentials
    cy.get('input[name="email"]').type("invalid@example.com");
    cy.get('input[name="password"]').type("invalidpassword");

    // Submit the form
    cy.get('button[type="submit"]').click();

    cy.wait(5000);

    // Check if error message is displayed
    cy.contains("Invalid email or password").should("be.visible");
  });
});
