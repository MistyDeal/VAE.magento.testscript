/// <reference types="cypress" />

describe('Test Suite: VAE | Sprint 001 | US 001 | UI', () => {

  // Before each test, navigate to the account creation page
  beforeEach(() => {
    cy.visit('/customer/account/create'); // Uses baseUrl from cypress.config.js
  });

  describe('Valid Account Creation', () => {
    it('Creates a new account with required fields - US 001', () => {
      // Click "Create an Account" link
      cy.contains('a', 'Create an Account').click();

      // Hardcoded test data
      const firstName = 'Misty';
      const lastName = 'Deal';
      const email = `mistytest${Date.now()}@email.com`;
      const password = 'StrongPass123!';

      // Fill required fields
      cy.get('#firstname').type(firstName); // Enter first name
      cy.get('#lastname').type(lastName); // Enter last name
      cy.get('#email_address').type(email); // Enter dynamic email
      cy.get('#password').type(password); // Enter password
      cy.get('#password-confirmation').type(password); // Confirm password

      // Submit the form
      cy.get('button[title="Create an Account"]').click();

      // Validate successful registration
      cy.url().should('include', '/customer/account'); // Ensure user is redirected to their account page
      cy.get('.message-success') // Locate the success message
        .should('be.visible') // Check if it's displayed
        .and('contain', 'Thank you for registering'); // Verify correct success message
    });
  });

  describe('Invalid Account Creation', () => {
    it('Fails when required fields are missing - US 001', () => {
      // Attempt to submit without entering details
      cy.get('button[title="Create an Account"]').click();

      // Validate that error messages appear
      cy.get('.message-error').should('be.visible').and('contain', 'This is a required field.');
    });
  });
});


