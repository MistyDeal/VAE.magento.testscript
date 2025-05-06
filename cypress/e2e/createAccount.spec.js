/// <reference types="cypress" />

// Define constants for reusable test data
const FIRST_NAME = 'Misty';
const LAST_NAME = 'Deal';
const PASSWORD = 'StrongPass123!';

describe('Create Account Test Suite', () => {
  // Before each test, navigate to the account creation page
  beforeEach(() => {
    cy.visit('/customer/account/create'); // Uses baseUrl from cypress.config.js
  });

  it('Creates a new account with required fields', () => {
    // Click "Create an Account" link
    // Uses `cy.contains()` to find an <a> tag containing 'Create an Account'
    cy.contains('a', 'Create an Account').click();

    // Generate a dynamic email to ensure uniqueness
    const email = `mistytest${Date.now()}@email.com`;

    // Fill in the required fields for account creation
    cy.get('#firstname').type(FIRST_NAME); // Enter first name
    cy.get('#lastname').type(LAST_NAME); // Enter last name
    cy.get('#email_address').type(email); // Enter dynamic email
    cy.get('#password').type(PASSWORD); // Enter password
    cy.get('#password-confirmation').type(PASSWORD); // Confirm password

    // Click the 'Create an Account' button to submit the form
    cy.get('button[title="Create an Account"]').click();

    // Validate successful registration by checking URL and success message
    cy.url().should('include', '/customer/account'); // Ensure user is redirected to their account page
    cy.get('.message-success') // Locate the success message
      .should('be.visible') // Check if it's displayed
      .and('contain', 'Thank you for registering'); // Verify correct success message
  });
});
