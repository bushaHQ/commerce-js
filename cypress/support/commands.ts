import "@testing-library/cypress/add-commands";

import { IFRAME_ID } from "../../src/constants/variables";

Cypress.Commands.add("visitBasicExamplePage", () => {
  cy.visit(Cypress.env("BASIC_EXAMPLE_PAGE"));
});

Cypress.Commands.add("getPayAppIframeBody", () => {
  cy.log("getPayAppIframeBody");

  return cy
    .findByTestId(IFRAME_ID)
    .should("exist")
    .its("0.contentDocument.body")
    .should("not.be.empty")
    .then((body) => cy.wrap(body, { log: false }));
});
