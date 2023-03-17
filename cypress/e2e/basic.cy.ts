import { CONTAINER_ID, IFRAME_ID } from "../../src/constants/variables";

describe("Pay with commerce-js basic", async () => {
  it("Visit example page", () => {
    cy.visitBasicExamplePage();

    cy.window().should("have.property", "BushaCommerce");

    const busiessameField = cy.get("#business_id");

    busiessameField.type(Cypress.env("BUSINESS_ID"));
    busiessameField.should("have.value", Cypress.env("BUSINESS_ID"));

    cy.findByRole("button", { name: /pay/i }).should("exist");
  });

  it("Opens popup on submit pay form", () => {
    cy.visitBasicExamplePage();

    cy.window().should("have.property", "BushaCommerce");

    const amountField = cy.get("#local_amount");
    const busiessameField = cy.get("#business_id");

    amountField.clear().type("500");
    busiessameField.type(Cypress.env("BUSINESS_ID"));

    cy.findByRole("button", { name: /pay/i }).click();

    cy.findByTestId(CONTAINER_ID).should("exist");

    cy.getPayAppIframeBody()
      .find(`form[action="POST"]`)
      .should("not.be.undefined");

    cy.findByTestId(IFRAME_ID).should("be.visible")
      // .its("0.contentWindow.location")
      // .then((loc) => {
      //   console.log(loc.pathname);
      //   expect(loc.href).to.include("/pay")
      // })
      // .location("pathname")
      // .should("include", "/pay");
    // .its("0.contentWindow.location.href").should("include", "/pay");

    // cy.getPayAppIframeBody()
    //   .wait(1000)
    //   .find("#root")
    //   .should("not.be.undefined");

    // cy.getPayAppIframeBody()
    //   .wait(1000)
    //   .find("#root")
    //   .should("include.text", /Select the payment method you want to use/i);
  });
});
