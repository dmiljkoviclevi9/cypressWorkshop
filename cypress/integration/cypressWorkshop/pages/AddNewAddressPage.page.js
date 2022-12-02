/// <reference types='Cypress'/>

export const AddNewAddressPage = {
    fields: {
        firstName: '#firstname',
        lastName: '#lastname',
        phoneNumber: '[name="telephone"]',
        streetAddress: '#street_1',
        city: '[title="City"]',
        zipCode: '#zip'        
    },

    dropdowns: {
        country: '#country'
    },

    buttons: {
        saveAddress: '[title="Save Address"]'
    },

    messages: {
        successMessage: '.message-success > div'
    },

    // First example:
    updateAddress(phoneNumber, streetAddress, city, zipCode, country){
        cy.get(this.fields.phoneNumber).clear().type(phoneNumber)
        cy.get(this.fields.streetAddress).clear().type(streetAddress)
        cy.get(this.fields.city).clear().type(city)
        cy.get(this.fields.zipCode).clear().type(zipCode)
        cy.get(this.dropdowns.country).select(country)
        cy.get(this.buttons.saveAddress).click()
    },

    // Second example:
    updateAddressWithFixtureData(data){
        cy.get(this.fields.phoneNumber).clear().type(data.phoneNumber)
        cy.get(this.fields.streetAddress).clear().type(data.streetAddress)
        cy.get(this.fields.city).clear().type(data.city)
        cy.get(this.fields.zipCode).clear().type(data.zipCode)
        cy.get(this.dropdowns.country).select(data.country)
        cy.get(this.buttons.saveAddress).click()
    }

}