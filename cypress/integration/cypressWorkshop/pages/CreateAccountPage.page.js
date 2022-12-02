/// <reference types='Cypress'/>

export const CreateAccountPage = {
    labels: {
        pageTitle: '[data-ui-id="page-title-wrapper"]'
    },

    fields: {
        firstName: '#firstname',
        lastName: '#lastname',
        email: '#email_address',
        password: '[title="Password"]',
        confirmPassword: '#password-confirmation'
    },

    buttons: {
        createAccount: '[title="Create an Account"]'
    },

    checkboxes: {
        signUpForNewsletter: '#is_subscribed'
    },

    createNewAccount(firstName, lastName, email, password){
        cy.get(this.fields.firstName).clear().type(firstName)
        cy.get(this.fields.lastName).clear().type(lastName)
        cy.get(this.fields.email).clear().type(email)
        cy.get(this.fields.password).clear().type(password)
        cy.get(this.fields.confirmPassword).clear().type(password)
        cy.get(this.buttons.createAccount).click()
    }
}