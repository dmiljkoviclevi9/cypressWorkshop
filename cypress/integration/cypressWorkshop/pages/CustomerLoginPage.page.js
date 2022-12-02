/// <reference types='Cypress'/>

export const CustomerLoginPage = {
    labels: {
        pageTitle: '[data-ui-id="page-title-wrapper"]'
    },

    fields: {
        email: '#email',
        password: '#pass'
    },

    buttons: {
        signIn: '#send2'
    },

    signInUser(email, password){
        cy.get(this.fields.email).clear().type(email)
        cy.get(this.fields.password).clear().type(password)
        cy.get(this.buttons.signIn).click()
        cy.wait(2000)
    }
}