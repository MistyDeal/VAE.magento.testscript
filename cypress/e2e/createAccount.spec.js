/// <reference types="cypress" />

describe('Test Suite: VAE | Sprint 001 | US 001 | UI', () => {
  
  // Before each test, navigate to the account creation page
  beforeEach(() => {
    cy.visit('/customer/account/create'); // Uses baseUrl from cypress.config.js

    // Debug environment variables to ensure they're loaded correctly
    cy.log('Project Name:', Cypress.env('project_name'));
    cy.log('Sprint Number:', Cypress.env('sprint_number'));
    cy.log('User Story Number:', Cypress.env('userstory_number'));
    cy.log('Test Case Type:', Cypress.env('testcase_type'));
    cy.log('First Name:', Cypress.env('first_name'));
    cy.log('Last Name:', Cypress.env('last_name'));
    cy.log('Password:', Cypress.env('password'));
  });

  describe('Valid Account Creation', () => {
    it('Creates a new account with required fields - US 001', () => {
      // Click "Create an Account" link
      cy.contains('a', 'Create an Account').click();

      // Retrieve test data from environment variables
      const firstName = Cypress.env('first_name');
      const lastName = Cypress.env('last_name');
      const email = `mistytest${Date.now()}@email.com`;
      const password = Cypress.env('password');

      // Ensure environment variables are correctly populated
      expect(firstName, 'First Name').to.exist;
      expect(lastName, 'Last Name').to.exist;
      expect(password, 'Password').to.exist;

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
      cy.contains('This is a required field.').should('be.visible');


    });
  });
});



