describe('The home page', () => {
    it('contains a header', () => {
        cy.visit('/')
        cy.get('h1').contains('Game of Bricks!')
    })

    it('contains a canvas to draw the game on', () => {
        cy.visit('/')

        cy.get('canvas#gameCanvas')
            .should('have.attr', 'width', '1600')
            .and('have.attr', 'height', '900')
    })

    it('contains assets for the canvas to use', () => {
        cy.visit('/')

        cy.get('img#paddle').should('be.hidden')
    });

    it('contains the game entry point script', () => {
        cy.visit('/')

        expect(cy.get("script#main")).to.exist
    });
})