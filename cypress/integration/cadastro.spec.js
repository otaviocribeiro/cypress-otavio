/// <reference types="cypress" />

var Chance = require('chance');
var chance = new Chance();

context('Cadastro', () => {
    it('Cadastro de usuário no site', () => {
        // rotas
        // POST 200 /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
        // POST 200 /api/1/databases/userdetails/collections/usertable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
        // GET 200 /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
        cy.server()
        cy.route('POST', '**//api/1/databases/userdetails/collections/newtable?**').as('postNewtable');
        cy.route('POST', '**//api/1/databases/userdetails/collections/usertable?**').as('postUsertable');
        cy.route('GET', '**//api/1/databases/userdetails/collections/newtable?**').as('getNewtable');

        // baseUrl + Register.html
        cy.visit('Register.html');

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

        // click
        cy.get('button#submitbtn').click()

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
});

// elementos
// input[placeholder="First Name"]
// input[ng-model="LastName"]
// input[ng-model="EmailAdress"]
// input[ng-model="Phone"]
// input[value=FeMale]
// input[type=checkbox]
// select#Skills
// select#countries
// select#country
// select#yearbox
// select[ng-model="monthbox"]
// select#daybox
// input#firstpassword
// input#secondpassword