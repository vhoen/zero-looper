export default {
  e2e: {
    baseUrl: 'http://localhost:8181',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js'
  },
  component: {
    devServer: {
      framework: 'webpack',
      bundler: 'webpack',
    },
    specPattern: 'cypress/component/**/*.cy.js'
  }
};
