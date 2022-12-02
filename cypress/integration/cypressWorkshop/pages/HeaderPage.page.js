/// <reference types='Cypress'/>

export const HeaderPage = {
    buttons: {
        signIn: '.panel > .header > .authorization-link > a',
        actionButton: ':nth-child(2) > .customer-welcome > .customer-name > .action',
        signOut: ':nth-child(2) > .customer-welcome > .customer-menu > .header > .authorization-link > a',
        myAccount: ':nth-child(2) > .customer-welcome > .customer-menu > .header > :nth-child(1) > a',
        createAccount: '.panel > .header > :nth-child(3) > a'
    },

    messages: {
        greetingMessage: ':nth-child(2) > .greet > .logged-in'
    }
}