/// <reference types='Cypress'/>
// <reference types="../support" />

describe("Commands", () => {
  before(() => {
    cy.visit(
      "https://magento.softwaretestingboard.com/"
    );
  });

  it("Interact with app using native Cypress commands", () => {
    cy.get('#search').type('Cypress').clear().blur();

    cy.get("#ui-id-2")
      .children()
      .eq(3)
      .find("span")
      .contains("Gear")
      .trigger("mouseover")
      .get("#ui-id-27")
      .invoke("hide");
    });

  it("Interact with app using user-created custom command", () => {
    cy.signinUserCustomCommand('test@t115.com', 'a1234567A')

    // Asert user is on My account page
    cy.get(':nth-child(2) > .greet > .logged-in').should('have.text', 'Welcome, Hello Cypress!')
    
  });
});
