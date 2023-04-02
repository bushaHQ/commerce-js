import { CONTAINER_ID } from "../../src/constants/variables";

describe("Pay with commerce-js basic", () => {
  it("Visit example page", () => {
    cy.visitBasicExamplePage();

    cy.window().its("BushaCommerce");

    cy.get("#public_key")
      .type(Cypress.env("PUBLIC_KEY"))
      .should("have.value", Cypress.env("PUBLIC_KEY"));

    cy.findByRole("button", { name: /pay/i }).should("exist");
  });

  it("Opens popup on submit pay form", () => {
    cy.visitBasicExamplePage();

    cy.window().its("BushaCommerce");

    cy.get("#local_amount").clear().type("500");
    cy.get("#public_key").type(Cypress.env("PUBLIC_KEY"));

    cy.findByRole("button", { name: /pay/i }).click();

    cy.findByTestId(CONTAINER_ID)
      .should("exist")
      .find("form")
      .should("not.be.undefined")
      .should("not.be.visible");

    cy.iframe()
      .find("#root")
      .should("not.be.undefined")
      .contains(/Select the payment method you want to use/i);
  });

  it("Popup is notified when pay app initializes", () => {
    cy.visitBasicExamplePage({
      onBeforeLoad(win) {
        cy.spy(win, "postMessage").as("postMessage");
      },
    });

    cy.get("#local_amount").clear().type("500");
    cy.get("#public_key").type(Cypress.env("PUBLIC_KEY"));

    cy.findByRole("button", { name: /pay/i }).click();

    cy.findByTestId(CONTAINER_ID).should("exist");

    cy.get("@postMessage").should("have.been.called");

    cy.iframe().find("#root").should("not.be.undefined");
  });

  it("Closes popup when close button on pay widget is clicked", () => {
    cy.visitBasicExamplePage();

    cy.get("#local_amount").clear().type("500");
    cy.get("#public_key").type(Cypress.env("PUBLIC_KEY"));

    cy.findByRole("button", { name: /pay/i }).click();

    cy.iframe().find("#root .header button").should("exist").click();

    cy.iframe()
      .find("#root .content")
      .contains(
        "Your transaction is not completed yet. Are you sure you want to cancel?"
      )
      .should("be.visible");

    cy.iframe()
      .find("#root .content")
      .find("div button:last-of-type")
      .should("exist")
      .click();

    cy.findByTestId(CONTAINER_ID).should("not.exist");
  });
});
