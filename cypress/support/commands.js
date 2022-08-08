// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('setToken', () => {
    cy.api({
        method: "POST",
        url: '/sessions',
        headers: { 'Accept-Language': 'en-us' },
        body: {
            "email": "georgemathias@qacademy.io",
            "password": "qa-cademy"
        }
    }).then((response) => {
        expect(response.status).to.eql(200)
        Cypress.env('token', response.body.token)
    })
})

Cypress.Commands.add('back2ThePast', () => {
    cy.api({
        method: "DELETE",
        url: `/back2thepast/62efcc39dc6e23001604bcf1`
    }).then((response) => {
        expect(response.status).to.eql(200)
    })
})

Cypress.Commands.add('postCharacter', (payload) => {
    cy.api({
        method: "POST",
        url: "/characters",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': Cypress.env('token')
        },
        body: payload,
        failOnStatusCode: false
    })
})

Cypress.Commands.add('getCharacters', () => {
    cy.api({
        method: "GET",
        url: "/characters",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': Cypress.env('token')
        },
        failOnStatusCode: false
    })
})

Cypress.Commands.add('getCharacterById', (caracterId) => {
    cy.api({
        method: "GET",
        url: `/characters/${caracterId}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': Cypress.env('token')
        },
        failOnStatusCode: false
    })
})

Cypress.Commands.add('deleteCharacterById', (caracterId) => {
    cy.api({
        method: "DELETE",
        url: `/characters/${caracterId}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': Cypress.env('token')
        },
        failOnStatusCode: false
    })
})

Cypress.Commands.add('searchCharacterByName', (characterName) => {
    cy.api({
        method: "GET",
        url: '/characters',
        qs: { name: characterName },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': Cypress.env('token')
        },
        failOnStatusCode: false
    })
})

Cypress.Commands.add('populateCharacters', (characters) => {
    characters.forEach((character) => {
        cy.postCharacter(character)

    })
})