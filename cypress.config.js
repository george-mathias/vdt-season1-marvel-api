const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://marvel-qa-cademy.herokuapp.com',
    defaultCommandTimeout: 30000,
    viewportWidth: 1440,
    viewportHeight: 900,
    video: false,
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
