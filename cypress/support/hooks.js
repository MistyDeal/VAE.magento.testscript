export class Hooks {
    static setupTestData() {
      cy.wrap({
        firstName: Cypress.env('first_name'),
        lastName: Cypress.env('last_name'),
        password: Cypress.env('password'),
      }).as('testData');
    }
  
    static logTestData() {
      cy.get('@testData').then((data) => {
        cy.log('Test Data:', JSON.stringify(data));
      });
    }
  
    static visitAccountCreationPage() {
      cy.visit('/customer/account/create'); // Uses baseUrl from cypress.config.js
    }
  }
  
