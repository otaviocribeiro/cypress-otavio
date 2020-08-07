/// <reference types="cypress" />

context('Listagem', () => {
    it('Listagem sem registros', () => {
        cy.server();
        cy.route({
            method: 'GET',
            url: '**//api/1/databases/userdetails/collections/newtable?**',
            status: 200,
            response: 'fixture:webtable-get-vazio'
        }).as('getNewtable');

        cy.visit('WebTable.html')

        cy.get('div[role=row]').should('have.length', 1)
    });

    it('Listagem com apenas um registro', () => {
        cy.server();
        cy.route({
            method: 'GET',
            url: '**//api/1/databases/userdetails/collections/newtable?**',
            status: 200,
            response: 'fixture:webtable-get-unico'
        }).as('getNewtable');

        cy.visit('WebTable.html')

        cy.get('div[role=row] div[role=gridcell]').eq(4).find('div').as('gridCellPhone')
        cy.get('@gridCellPhone').should('contain.text', '9980161200')
    });
});