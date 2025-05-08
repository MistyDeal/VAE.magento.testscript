/// <reference types="cypress" />
import { Hooks } from '../support/hooks';

describe('Test Suite: VAE | Sprint 001 | US 001 | UI', () => {
  
  beforeEach(() => {
    Hooks.visitAccountCreationPage(); // Navigate to the account creation page
    Hooks.setupTestData(); // Store test data for reuse
    Hooks.logTestData(); // Log test data (optional for debugging)
  });

  describe('Valid Account Creation', () => {
    it('Creates a new account with required fields - US 001', () => {
      cy.contains('a', 'Create an Account').click();

      cy.get('@testData').then(({ firstName, lastName, password }) => {
        const email = `mistytest${Date.now()}@email.com`;

        expect(firstName).to.exist;
        expect(lastName).to.exist;
        expect(password).to.exist;
        
        // Fill out registration form
        cy.get('#firstname').type(firstName);
        cy.get('#lastname').type(lastName);
        cy.get('#email_address').type(email);
        cy.get('#password').type(password);
        cy.get('#password-confirmation').type(password);

        cy.get('button[title="Create an Account"]').click();

        // Validate registration success
        cy.url().should('include', '/customer/account');
        cy.get('.message-success')
          .should('be.visible')
          .and('contain', 'Thank you for registering');
      });
    });
  });

  describe('Invalid Account Creation', () => {
    it('Fails when required fields are missing - US 001', () => {
      cy.get('button[title="Create an Account"]').click();

      // Validate error messages for missing fields
      cy.contains('This is a required field.').should('be.visible');
    });
  });
});
