describe('Sign in user and demonstrate switching between multiple config files', function() {

    before(() => {
        // Use env. variables
        cy.visit(Cypress.env('url'))
        cy.wait(1000)

        cy.log('Environment variables are:')
        cy.log(Cypress.env())
        cy.log(Cypress.env("environmentName"))
    })

    it('Sign in user by invoking custom command and switching between multiple config files', function() {

        cy.log('Username and pass environment variables are:')
        cy.log(Cypress.env("username"))
        cy.log(Cypress.env("password"))
        
        cy.signinUserCustomCommand(Cypress.env("username"), Cypress.env("password"))

        // Assert user is signed in
        cy.get(':nth-child(2) > .greet > .logged-in').should('contain.text', `Welcome`)  
 
    })
})