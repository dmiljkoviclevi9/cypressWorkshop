/// <reference types='Cypress'/>

describe("Assertions", () => {
  before(() => {
    cy.visit(
      "https://magento.softwaretestingboard.com/"
    );
  });

    it("Length", () => {
      cy.get('[id^="ui-id"]').should("have.length", 28);
    });

    it("Class", () => {
      cy.get('#search').should("have.class", "input-text");
    });

    it("Value", () => {
      cy.get('#search').type('Cypress').should("have.value", "Cypress");
    });

    it("Text", () => {
      cy.get('#ui-id-3').find('span').should("have.text", "What's New")
      .should("include.text", "New")
      .should("not.contain.text", "www")
      .invoke('text').should("match", /^Wh/)
    });

    it("Visibility", () => {
      cy.get('.home-main > img').should("be.visible");
      cy.get('.action.close').should("not.be.visible");
    });

    it("Existence", () => {
      cy.get('[data-role="dropdownDialog"]').should('exist')
    });

    it("State", () => {
      cy.get('.swatch-opt-1556').find('[aria-label="XS"]')
      .should('have.attr', 'aria-checked', 'false')
      .click()
      .should('have.attr', 'aria-checked', 'true')
    });

    it("CSS", () => {
       cy.get('#ui-id-8')
       .should('have.css', 'color', 'rgb(87, 87, 87)')
       .should('have.css', 'line-height', '47px')
       .should('have.css', 'font-size', '14px')
       .should('have.css', 'font-weight', '700')
       .should('have.css', 'font-family', '"open sans", "helvetica neue", Helvetica, Arial, sans-serif')
       .should('have.css', 'padding', '0px 12px')
       .should('have.css', 'display', 'inline-block')
    });
 });
