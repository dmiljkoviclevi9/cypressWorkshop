/// <reference types='Cypress'/>

describe('How to use .then() and .as() methods', () => {

    it('Usage of .then() and .as()', () => {
        // Go to website and login
        cy.visit("https://www.saucedemo.com/")
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        // Usage of .then()
        // cy.get('#item_4_title_link > .inventory_item_name').then(($link) => {   
        //   const linkText = $link.text()
        //   expect(linkText).is.eql('Sauce Labs Backpack')
        // }).click()

        // const linkText variable can only be accessed inside then() block.
        // But what if we want to access it outside of the then() block? => Solution is: aliases!

        // This block returns text from obtained DOM element and saves it in linkText variable
        // cy.get('#item_4_title_link > .inventory_item_name').then(($link) => {
        //     return $link.text()
        // }).as('linkText') // it's not possible to chain .click() here since it's returning text

        // //so, if we need to click on the element, we do it like this:
        // //cy.get('#item_4_title_link > .inventory_item_name').click()

        // // Check if linkText variable really contains specified text
        // cy.get("@linkText").then(($x) => {
        //   expect($x).is.eql('Sauce Labs Backpack')
        // })

        // Shorter defined .as() using .invoke()
        cy.get('#item_4_title_link > .inventory_item_name').invoke('text').as("linkText")

    })
})