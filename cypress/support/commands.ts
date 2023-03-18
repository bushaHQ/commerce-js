import "@testing-library/cypress/add-commands";
import "cypress-iframe";

Cypress.Commands.add(
  "visitBasicExamplePage",
  (opts?: Partial<Cypress.VisitOptions>) => {
    cy.visit(Cypress.env("BASIC_EXAMPLE_PAGE"), opts);
  }
);
