const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1080, 
  viewportWidth: 1920,
  video: false,
  e2e: {
    baseUrl: "https://magento.softwaretestingboard.com",
    excludeSpecPattern: ['**/1-getting-started', '**/2-advanced-examples'],
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    retries: {
      runMode: 2, //retries failed tests twice when using 'npx cypress run'
      openMode: 1 //retries once when running 'npx cypress open'
    },
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: true,
      json: true
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
