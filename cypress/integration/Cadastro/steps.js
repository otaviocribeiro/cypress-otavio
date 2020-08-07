// implementação dos passos descritos na feature

/// <reference types="cypress" />

var Chance = require('chance');
var chance = new Chance();

When(/^informar meus dados$/, () => { 
    // type para campos de texto
    cy.get('input[placeholder="First Name"]').type(chance.first())
    cy.get('input[ng-model="LastName"]').type(chance.last())
    cy.get('input[ng-model="EmailAdress"]').type(chance.email())
    cy.get('input[ng-model="Phone"]').type(chance.phone({ formatted: false}))

    // check para radios e checkbox preenchedo com o value ou a string mesmo
    cy.get('input[value=FeMale]').check()
    cy.get('input[type=checkbox]').check('Cricket')
    cy.get('input[type=checkbox]').check('Hockey')

    // select para combos preenchendo com o value ou a string mesmo
    cy.get('select#Skills').select('Javascript')
    cy.get('select#countries').select('Australia')
    cy.get('select#country').select('Australia', {force: true}) // elemento esta oculto e forçamos o cypress a encontra-lo e pega-lo(get)
    cy.get('select#yearbox').select('1995')
    cy.get('select[ng-model="monthbox"]').select('March')
    cy.get('select#daybox').select('13')

    cy.get('input#firstpassword').type('123123As')
    cy.get('input#secondpassword').type('123123As')

    // attachFile para anexar arquivo
    cy.get('input#imagesrc').attachFile('imagemteste.png')
});

When(/^salvar$/, () => {
    cy.get('button#submitbtn').click()
});

Then(/^devo ser cadastrado com sucesso$/, () => {
    cy.wait('@postNewtable').then((resNewtable) => {
        // chai
        expect(resNewtable.status).to.eq(200)
    })

    cy.wait('@postUsertable').then((resUsertable) => {
        expect(resUsertable.status).to.eq(200)
    })

    cy.wait('@getNewtable').then((resNewtable) => {
        expect(resNewtable.status).to.eq(200)
    })

    cy.url().should('contain', 'WebTable')
});
