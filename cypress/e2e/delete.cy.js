

describe('DELETE /characters/id', () => {

    const tochaHumana = {
        name: 'Jhonny Storm',
        alias: 'Tocha Humana',
        team: ['Quarteto Fantástico'],
        active: true
    }

    context('quando tenho um personagem cadastrado', () => {

        before(() => {
            cy.postCharacter(tochaHumana)
                .then((response) => {
                    Cypress.env('characterId', response.body.character_id)
                })
        });

        it('deve remover o personagem pelo id', () => {
            cy.deleteCharacterById(Cypress.env('characterId'))
                .then((response) => {
                    expect(response.status).to.eql(204)
                })

        });

        after(() => {
            cy.getCharacterById(Cypress.env('characterId'))
                .then((response) => {
                    expect(response.status).to.eql(404)
                })
        });
        
    });

    it('deve retornar 404 ao remover por um id não cadastrado', () => {
        const id = '62f065df027d7c0016c33a44'
        cy.deleteCharacterById(id)
            .then((response) => {
                expect(response.status).to.eql(404)
            })
    });
    
});