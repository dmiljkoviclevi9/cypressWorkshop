/// <reference types='Cypress'/>

import {util} from "../pages/util.js"

var randomEmail = ""

describe('Create new account for the user and update address using fixtures', () => {

    let dataJson
    before(function () {
        // Create random email
        randomEmail = 'test' + util.getRandomString('email', 5) + '@test.com'

        // Load fixture data
        cy.fixture('accountData').then(function(data) {
            data.email = randomEmail
            dataJson = data
        })       
    })

    beforeEach(() => {
        cy.visit("https://magento.softwaretestingboard.com/")

        // Assert user is on the main page
        cy.get('.blocks-promo').should('be.visible')
        cy.wait(1000)
    })

    afterEach(() => {
        // Sign out user
        cy.get(':nth-child(2) > .customer-welcome > .customer-name > .action').click()
        cy.get(':nth-child(2) > .customer-welcome > .customer-menu > .header > .authorization-link > a').click()
        cy.get('.base').should('contain', 'You are signed out')     
    })

    it('Create account', () => {
        // Create new account by clicking on create an account button and filling in new account form
        cy.get('.panel > .header > :nth-child(3) > a').click()
        cy.get('[data-ui-id="page-title-wrapper"]').should('have.text', 'Create New Customer Account')

        // Fill in create account form
        cy.get('#firstname').clear().type(dataJson.firstName)
        cy.get('#lastname').clear().type(dataJson.lastName)
        cy.get('#email_address').clear().type(dataJson.email)
        cy.get('[title="Password"]').clear().type(dataJson.pass)
        cy.get('#password-confirmation').clear().type(dataJson.pass)
        cy.get('[title="Create an Account"]').click()

        // Assert success acount creation message
        cy.get('.message-success > div')
            .should('contain', 'Thank you for registering with Fake Online Clothing Store.')

        // Check if user is automatically signed in
        cy.get(':nth-child(2) > .greet > .logged-in').should('contain.text', `Welcome, ${dataJson.firstName} ${dataJson.lastName}!`)        

    })

    it('Update users address', () => {
        // Sign in as previously created user
        cy.contains('Sign In').click()
        cy.get('.page-title').contains('Customer Login')
        cy.get('#email').clear().type(dataJson.email)
        cy.get('#pass').clear().type(dataJson.pass)
        cy.get('#send2').click()
        cy.wait(1000)

        // Assert user is signed in
        cy.get(':nth-child(2) > .greet > .logged-in').should('contain.text', `Welcome, ${dataJson.firstName} ${dataJson.lastName}!`)        

        // Go to My Account page
        cy.get(':nth-child(2) > .customer-welcome > .customer-name > .action').click()
        cy.get(':nth-child(2) > .customer-welcome > .customer-menu > .header > :nth-child(1) > a').click()
        cy.get('.page-title').should('contain.text', 'My Account')

        // Go to Address Book page
        cy.get('a').contains('Address Book').click()
        cy.get('.page-title').contains('Add New Address')

        // Assert already filled in data
        cy.get('#firstname').should('have.attr', 'value', dataJson.firstName)
        cy.get('#lastname').should('have.attr', 'value', dataJson.lastName)

        // Update address mandatory fields
        cy.get('[name="telephone"]').clear().type(dataJson.phoneNumber)
        cy.get('#street_1').clear().type(dataJson.streetAddress)
        cy.get('[title="City"]').clear().type(dataJson.city)
        cy.get('#zip').clear().type(dataJson.zipCode)
        cy.get('#country').select(dataJson.country)
        cy.get('[title="Save Address"]').click()

        // Assert address is saved
        cy.get('.message-success > div').should('contain', 'You saved the address.')
        
    })
})