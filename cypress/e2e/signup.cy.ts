/// <reference types="cypress" />

describe("SignupForm", () => {
  it("should sign up a new user successfully", () => {
    cy.intercept(
      "POST",
      "https://expense-tracker-rishith.netlify.app/signup"
    ).as("signupRequest");

    cy.visit("https://expense-tracker-rishith.netlify.app/signup");

    // Fill in the signup form fields
    const baseEmail = "test"; // Base email address
    const timestamp = new Date().getTime(); // Get current timestamp
    const uniqueEmail = `${baseEmail}_${timestamp}@example.com`; // Unique email address

    cy.get('input[name="email"]').type(uniqueEmail);
    cy.get('input[name="userFirstName"]').type("John");
    cy.get('input[name="userLastName"]').type("Doe");
    cy.get('input[name="userPhone"]').type("1234567890");
    cy.get('input[name="password"]').type("password123");

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Wait for the signup request to complete
    cy.wait(20000);

    // Check if redirected to the dashboard page after successful signup
    cy.url().should("include", "/home/dashboard");

    // Check if auth token is saved in localStorage
    // Check if auth token is saved in localStorage
    cy.window().then((window) => {
      const authToken = window.localStorage.getItem("authToken");
      expect(authToken).to.be.a("string"); // Check if authToken is a string
    });

    // Check if user data is saved in localStorage
    cy.window().then((window) => {
      const userDataString = window.localStorage.getItem("userData");
      expect(userDataString).to.be.a("string"); // Check if userDataString is a string
      if (typeof userDataString === "string") {
        const userData = JSON.parse(userDataString);
        expect(userData.email).to.equal(uniqueEmail);
        expect(userData.first_name).to.equal("John");
        expect(userData.last_name).to.equal("Doe");
        expect(userData.phone_number).to.equal("1234567890");
      } else {
        throw new Error("User data is not a string");
      }
    });
    cy.wait(20000);
  });
});
