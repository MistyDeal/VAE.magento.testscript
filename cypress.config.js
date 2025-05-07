const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1080, 
  viewportWidth: 1920,
  video: false,
  e2e: {
    baseUrl: "https://magento.softwaretestingboard.com",
    
    // Define environment variables for project metadata and test data
    env: {
      project_name: "VAE",
      sprint_number: "001",
      userstory_number: "US001",
      testcase_type: "UI",
      first_name: "Misty",
      last_name: "Deal",
      password: "StrongPass123!"
    },

    excludeSpecPattern: ['**/1-getting-started', '**/2-advanced-examples'],
    specPattern: '**/*.spec.js'
    ,

    // Retry settings to improve test stability
    retries: {
      runMode: 2, // Retries failed tests twice when using 'npx cypress run'
      openMode: 1 // Retries once when running 'npx cypress open'
    },

    // Cypress reporting setup for better debugging and tracking
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: true,
      json: true
    },

    setupNodeEvents(on, config) {
      // Implement node event listeners here if needed
    },
  },
});


