describe('prvi test', () => {
    it('Gooogle search', () => {
        cy.visit('https://www.google.com/')
        cy.get('[class="gLFyf"]').type('UI testing')
        cy.get('[class="gNO89b"]').first().click()
    })
})