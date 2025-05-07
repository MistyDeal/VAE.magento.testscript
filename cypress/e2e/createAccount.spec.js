/// <reference types="cypress" />

describe('Test Suite: VAE | Sprint 001 | US 001 | UI', () => {
  
  // Before each test, navigate to the account creation page and set up test data
  beforeEach(() => {
    cy.visit('/customer/account/create'); // Uses baseUrl from cypress.config.js

    // Store environment variables in an object for reuse
    cy.wrap({
      firstName: Cypress.env('first_name'),
      lastName: Cypress.env('last_name'),
      password: Cypress.env('password'),
    }).as('testData');

    // Debugging: Log test data for verification (optional)
    cy.get('@testData').then((data) => {
      cy.log('Test Data:', JSON.stringify(data));
    });
  });

  describe('Valid Account Creation', () => {
    it('Creates a new account with required fields - US 001', () => {
      // Click "Create an Account" link to start registration
      cy.contains('a', 'Create an Account').click();

      // Retrieve test data stored in the beforeEach hook
      cy.get('@testData').then(({ firstName, lastName, password }) => {
        const email = `mistytest${Date.now()}@email.com`; // Generate dynamic email

        // Ensure environment variables are correctly populated
        expect(firstName, 'First Name').to.exist;
        expect(lastName, 'Last Name').to.exist;
        expect(password, 'Password').to.exist;

        // Fill out registration form fields
        cy.get('#firstname').type(firstName);
        cy.get('#lastname').type(lastName);
        cy.get('#email_address').type(email);
        cy.get('#password').type(password);
        cy.get('#password-confirmation').type(password);

        // Submit the form
        cy.get('button[title="Create an Account"]').click();

        // Validate successful registration
        cy.url().should('include', '/customer/account'); // Ensure user is redirected to account page
        cy.get('.message-success') // Locate success message
          .should('be.visible')
          .and('contain', 'Thank you for registering'); // Verify correct success message
      });
    });
  });

  describe('Invalid Account Creation', () => {
    it('Fails when required fields are missing - US 001', () => {
      // Attempt to submit without entering details
      cy.get('button[title="Create an Account"]').click();

      // Validate that error messages appear for missing fields
      cy.contains('This is a required field.').should('be.visible');
    });
  });
});



