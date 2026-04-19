// Cypress E2E Support File
// This file runs before every test
// Docs: https://docs.cypress.io/api/support-files/hooks-api

// Ignore any cross-origin errors from YouTube
Cypress.on('uncaught:exception', (err, runnable) => {
  // Return false to prevent the error from failing the test
  return false;
});

// Custom commands
Cypress.Commands.add('encodeData', (data) => {
  return btoa(JSON.stringify(data));
});

Cypress.Commands.add('navigateWithHash', (url, data) => {
  const encoded = btoa(JSON.stringify(data));
  cy.visit(`${url}#${encoded}`);
});
