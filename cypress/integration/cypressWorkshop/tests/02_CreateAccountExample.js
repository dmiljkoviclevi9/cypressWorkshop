/// <reference types='Cypress'/>

import {util} from "../pages/util.js"

var randomEmail = ""

const firstName = 'Tester1'
const lastName = 'Testeric1'
const email = 'test@t50.com' //needs to be unique
const password = 'a1234567A'

const phoneNumber = '123456789'
const streetAddress = 'Test address'
const city = 'Novi Sad'
const zipCode = '1234'
const country = 'Serbia'

describe('Create new account for the user and update users address', () => {

    before(() => {        
        // Generate random email
        randomEmail = 'test' + util.getRandomString('email', 5) + '@t.com'
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
    //    cy.visit('https://magento.softwaretestingboard.com/')
        
    //     // Assert user is on the main page
    //     cy.get('.blocks-promo').should('be.visible')
    //     cy.wait(1000) 

        // Create new account by clicking on create an account button and filling in new account form
        cy.get('.panel > .header > :nth-child(3) > a').click()
        cy.get('[data-ui-id="page-title-wrapper"]').should('have.text', 'Create New Customer Account')

        // Fill in create account form
        cy.get('#firstname').clear().type(firstName)
        cy.get('#lastname').clear().type(lastName)
        cy.get('#email_address').clear().type(randomEmail)
        cy.get('[title="Password"]').clear().type(password)
        cy.get('#password-confirmation').clear().type(password)
        cy.get('[title="Create an Account"]').click()

        // Assert success account creation message
        cy.get('.message-success > div')
            .should('contain', 'Thank you for registering with Fake Online Clothing Store.')

        // Check if user is automatically signed in
        cy.get(':nth-child(2) > .greet > .logged-in').should('contain.text', `Welcome, ${firstName} ${lastName}!`)        

        // Sign out user
        // cy.get(':nth-child(2) > .customer-welcome > .customer-name > .action').click()
        // cy.get(':nth-child(2) > .customer-welcome > .customer-menu > .header > .authorization-link > a').click()
        // cy.get('.base').should('contain', 'You are signed out')        
    })

    it('Update users address', () => {
    //    cy.visit('https://magento.softwaretestingboard.com/')
        
    //     // Assert user is on the main page
    //     cy.get('.blocks-promo').should('be.visible')
    //     cy.wait(1000) 

        // Sign in as previously created user
        cy.contains('Sign In').click()
        cy.get('.page-title').contains('Customer Login')
        cy.get('#email').clear().type(randomEmail)
        cy.get('#pass').clear().type(password)
        cy.get('#send2').click()
        cy.wait(1000)

        // Assert user is signed in
        cy.get(':nth-child(2) > .greet > .logged-in').should('contain.text', `Welcome, ${firstName} ${lastName}!`)        

        // Go to My Account page
        cy.get(':nth-child(2) > .customer-welcome > .customer-name > .action').click()
        cy.get(':nth-child(2) > .customer-welcome > .customer-menu > .header > :nth-child(1) > a').click()
        cy.get('.page-title').should('contain.text', 'My Account')

        // Go to Address Book page
        cy.get('a').contains('Address Book').click()
        cy.get('.page-title').contains('Add New Address')

        // Assert already filled in data
        cy.get('#firstname').should('have.attr', 'value', firstName)
        cy.get('#lastname').should('have.attr', 'value', lastName)

        // Update address mandatory fields
        cy.get('[name="telephone"]').clear().type(phoneNumber)
        cy.get('#street_1').clear().type(streetAddress)
        cy.get('[title="City"]').clear().type(city)
        cy.get('#zip').clear().type(zipCode)
        cy.get('#country').select(country)
        cy.get('[title="Save Address"]').click()

        // Assert address is saved
        cy.get('.message-success > div').should('contain', 'You saved the address.')

        // Sign out user
        // cy.get(':nth-child(2) > .customer-welcome > .customer-name > .action').click()
        // cy.get(':nth-child(2) > .customer-welcome > .customer-menu > .header > .authorization-link > a').click()
        // cy.get('.base').should('contain', 'You are signed out')
    })
})