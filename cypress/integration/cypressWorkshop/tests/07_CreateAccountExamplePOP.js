/// <reference types='Cypress'/>

import {HeaderPage} from '../pages/HeaderPage.page'
import {CreateAccountPage} from '../pages/CreateAccountPage.page'
import { CustomerLoginPage } from '../pages/CustomerLoginPage.page'
import { MyAccountPage } from '../pages/MyAccountPage.page'
import { AddNewAddressPage } from '../pages/AddNewAddressPage.page'
import {util} from "../pages/util.js"

var randomEmail = ""

describe('Create account and update users address using fixtures and POP', () => {

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
        cy.wait(2000)
    })

    afterEach(() => {
        // Sign out user
        cy.get(HeaderPage.buttons.actionButton).click()
        cy.get(HeaderPage.buttons.signOut).click()
        cy.get('.base').should('contain', 'You are signed out')     
    })

    it('Create account', () => {
        // Create new account by clicking on create an account button and filling in new account form
        cy.get(HeaderPage.buttons.createAccount).click()
        cy.get(CreateAccountPage.labels.pageTitle).should('have.text', 'Create New Customer Account')

        CreateAccountPage.createNewAccount(dataJson.firstName, dataJson.lastName, dataJson.email, dataJson.pass)
        // Assert success acount creation message
        cy.get(MyAccountPage.messages.successMessage)
            .should('contain', 'Thank you for registering with Fake Online Clothing Store.')

        // Check if user is automatically signed in
        cy.get(HeaderPage.messages.greetingMessage)
            .should('contain.text', `Welcome, ${dataJson.firstName} ${dataJson.lastName}!`)          
    })

    it('Update users address', () => {
        // Sign in as previously created user
        cy.contains('Sign In').click()
        cy.get(CustomerLoginPage.labels.pageTitle).should('contain.text', 'Customer Login')
        CustomerLoginPage.signInUser(dataJson.email, dataJson.pass)

        // Assert user is signed in
        cy.get(HeaderPage.messages.greetingMessage)
            .should('contain.text', `Welcome, ${dataJson.firstName} ${dataJson.lastName}!`)   

        // Go to My Account page
        cy.get(HeaderPage.buttons.actionButton).click()
        cy.get(HeaderPage.buttons.myAccount).click()
        cy.get(MyAccountPage.labels.pageTitle).should('contain.text', 'My Account')

        // Go to Address Book page
        cy.get('a').contains('Address Book').click()

        // Assert already filled in data
        cy.get('#firstname').should('have.attr', 'value', dataJson.firstName)
        cy.get('#lastname').should('have.attr', 'value', dataJson.lastName)

        // Update address mandatory fields
        // First example:
        // AddNewAddressPage.updateAddress(dataJson.phoneNumber, dataJson.streetAddress, dataJson.city, dataJson.zipCode, dataJson.country)
        // Second example:
        AddNewAddressPage.updateAddressWithFixtureData(dataJson)

        // Assert address is saved
        cy.get(AddNewAddressPage.messages.successMessage).should('contain', 'You saved the address.')
    })
})